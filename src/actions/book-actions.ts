"use server";
import { createBookFromTemplate } from "@/services/book/book-creation-service";
import { CharacterData } from "@/schemas/character-schema";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import prisma from "@/lib/prisma";
import { BookStatus, ProductType } from "@/generated/prisma";
import { getCurrentUser } from "./user-actions";
import { logger } from "@/lib/logger";
import { BookFull } from "@/types/book";
import { revalidatePath } from "next/cache";
import { serializeBook, serializeBooks } from "@/utils/serializers";
import { getEbookDownloadUrl } from "./ebook-actions";
import { sendBookCompletionEmail } from "./email-actions";
import {
  clearCharacterImageReference,
  deleteCharacterImage,
} from "./image-actions";
import { checkGuestBookLimit } from "./guest-actions";

/**
 * Server action to create a personalized book from a template
 * Supports both authenticated and anonymous users
 *
 * @param templateId The ID of the book template to use
 * @param characterData The character customization data
 * @param characterImageReference Optional Leonardo image ID for character reference
 * @returns ActionResult with the created book ID or error
 */
export async function createPersonalizedBook(
  templateId: string,
  characterData: CharacterData,
  characterImageReference?: string,
  imageId?: string
): Promise<ActionResult<string>> {
  try {
    // Try to get the current user - will be null for anonymous users
    const user = await getCurrentUser();

    // Check book creation limit using the new guest session system
    // We only need to check this for anonymous users
    if (!user) {
      const limitCheck = await checkGuestBookLimit();

      if (!limitCheck.success) {
        return createErrorResult(limitCheck.error);
      }

      if (!limitCheck.data.canCreate) {
        logger.warn(
          {
            totalCreated: limitCheck.data.totalCreated,
            anonymous: true,
          },
          "Book creation limit exceeded"
        );
        return createErrorResult(
          limitCheck.data.message || "Book creation limit exceeded"
        );
      }
    }

    // Set userId - will be null for anonymous users
    const userId = user?.id || null;

    logger.info(
      {
        templateId,
        isAuthenticated: !!userId,
        characterName: characterData.name,
        hasCharacterImage: !!characterImageReference,
      },
      "Creating personalized book"
    );

    // Fetch the complete book template with its pages
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      include: {
        pages: {
          orderBy: { pageNumber: "asc" },
        },
        genres: true,
      },
    });

    if (!template) {
      logger.error({ templateId }, "Book template not found");
      return createErrorResult("Book template not found");
    }

    // Use the book creation service to generate the book data
    const bookData = createBookFromTemplate(
      template,
      characterData,
      userId || "",
      characterImageReference
    );

    logger.debug(
      {
        bookTitle: bookData.title,
        pageCount: bookData.pageCount,
        anonymous: !userId,
        hasCharacterImage: !!characterImageReference,
      },
      "Book data generated"
    );
    console.log("created book with ", bookData.pageCount);
    // Create the book record in the database using a transaction
    const book = await prisma.$transaction(async (tx) => {
      // Create the book record - importantly, userId can be null for anonymous users
      const newBook = await tx.book.create({
        data: {
          title: bookData.title,
          status: BookStatus.CUSTOMIZING,
          pageCount: bookData.pageCount,
          coverPrompt: bookData.coverPrompt,
          templateId: bookData.templateId,
          userId: userId, // This can be null for anonymous users
          characterImageReference: characterImageReference || null,
          coverImage: imageId || null,
        },
      });

      logger.debug(
        {
          bookId: newBook.id,
          anonymous: !userId,
        },
        "Created book record"
      );

      // Create the character record
      await tx.character.create({
        data: {
          name: characterData.name,
          age: characterData.age,
          gender: characterData.gender,
          eyeColor: characterData.eyeColor || null,
          hairColor: characterData.hairColor || null,
          hairStyle: characterData.hairStyle || null,
          skinTone: characterData.skinTone || null,
          wearingGlasses: characterData.wearingGlasses || null,
          bookId: newBook.id,
        },
      });

      logger.debug(
        {
          bookId: newBook.id,
          characterName: characterData.name,
        },
        "Created character record"
      );

      // Create the page records with updated structure for text/image pages
      for (const page of bookData.pages) {
        await tx.page.create({
          data: {
            pageNumber: page.pageNumber,
            type: page.type,
            textContent: page.textContent || null,
            imagePrompt: page.imagePrompt || null,
            bookId: newBook.id,
          },
        });
      }

      logger.debug(
        {
          bookId: newBook.id,
          pageCount: bookData.pages.length,
        },
        "Created book pages"
      );

      return newBook;
    });

    logger.info(
      {
        bookId: book.id,
        anonymous: !userId,
        hasCharacterImage: !!book.characterImageReference,
      },
      "Successfully created personalized book"
    );

    return createSuccessResult(book.id);
  } catch (error) {
    logger.error({ error }, "Error creating personalized book");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Gets a book by its ID with all related data (pages, template, character)
 *
 * @param id The ID of the book to retrieve
 * @returns The book with its pages, template information, and character data
 */

export async function getBookById(id: string): Promise<ActionResult<BookFull>> {
  try {
    logger.debug({ bookId: id }, "Fetching book details");

    // Fetch the book with its pages, template, and character
    const book = await prisma.book.findUnique({
      where: { id },
      include: {
        pages: {
          orderBy: { pageNumber: "asc" },
        },
        template: {
          include: {
            genres: true,
          },
        },
        character: true,
        order: true,
      },
    });

    // If book not found, return an error
    if (!book) {
      logger.warn({ bookId: id }, "Book not found");
      return createErrorResult("Book not found");
    }

    logger.debug(
      {
        bookId: id,
        title: book.title,
        pageCount: book.pages.length,
        status: book.status,
        hasCharacter: !!book.character,
      },
      "Book found"
    );

    // Serialize the book to handle Decimal values
    const serializedBook = serializeBook(book);

    // Use an explicit type cast here to ensure correct typing
    return createSuccessResult(serializedBook as BookFull);
  } catch (error) {
    logger.error({ error, bookId: id }, "Error fetching book");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Gets all books for the current user
 * Returns books with their pages, character, and template info
 */
export async function getUserBooks(): Promise<ActionResult<BookFull[]>> {
  try {
    const user = await getCurrentUser();

    if (!user?.id) {
      return createErrorResult("User not authenticated");
    }

    const books = await prisma.book.findMany({
      where: {
        userId: user.id,
      },
      include: {
        order: true,
        printJob: true,
        pages: {
          orderBy: { pageNumber: "asc" },
        },
        template: {
          include: {
            genres: true,
          },
        },
        character: true,
        imageGenerations: {
          orderBy: { createdAt: "desc" },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    logger.debug(
      { userId: user.id, bookCount: books.length },
      "Retrieved user books"
    );
    const serializedBooks = serializeBooks(books);
    return createSuccessResult(serializedBooks as BookFull[]);
  } catch (error) {
    logger.error({ error }, "Error fetching user books");
    return createErrorResult(
      error instanceof Error ? error.message : "Failed to fetch user books"
    );
  }
}

/**
 * Updates all book details based on the BookFull object
 *
 * @param book The complete book object with all updates
 * @returns The updated book
 */
export async function updateBookDetails(
  book: BookFull
): Promise<ActionResult<BookFull>> {
  try {
    logger.debug({ bookId: book.id }, "Updating book details");

    // First update the main book record
    await prisma.book.update({
      where: { id: book.id },
      data: {
        title: book.title,
        coverImage: book.coverImage,
        coverImageOptions: book.coverImageOptions,
        coverDedication: book.coverDedication,
        pageDedication: book.pageDedication,
        status: book.status,
        // Only include character reference if it exists
        ...(book.characterImageReference && {
          characterImageReference: book.characterImageReference,
        }),
      },
    });

    // Update all pages
    for (const page of book.pages) {
      await prisma.page.update({
        where: { id: page.id },
        data: {
          textContent: page.textContent,
          imageUrl: page.imageUrl,
          imageOptions: page.imageOptions,
          // Only include these if they're defined
          ...(page.imagePrompt && { imagePrompt: page.imagePrompt }),
        },
      });
    }

    // If character data exists and needs to be updated
    if (book.character) {
      await prisma.character.update({
        where: { id: book.character.id },
        data: {
          name: book.character.name,
          age: book.character.age,
          gender: book.character.gender,
          eyeColor: book.character.eyeColor,
          hairColor: book.character.hairColor,
          hairStyle: book.character.hairStyle,
          skinTone: book.character.skinTone,
          wearingGlasses: book.character.wearingGlasses,
        },
      });
    }

    // Refetch the book with all its relations to return the updated version
    const refreshedBook = await prisma.book.findUnique({
      where: { id: book.id },
      include: {
        pages: {
          orderBy: { pageNumber: "asc" },
        },
        template: {
          include: {
            genres: true,
          },
        },
        character: true,
        imageGenerations: true,
      },
    });

    if (!refreshedBook) {
      return createErrorResult("Book not found after update");
    }

    // Revalidate the book pages
    revalidatePath(`/library/preview/${book.id}`);

    logger.debug(
      { bookId: book.id, title: refreshedBook.title },
      "Book updated successfully"
    );

    return createSuccessResult(refreshedBook as BookFull);
  } catch (error) {
    logger.error({ error, bookId: book.id }, "Error updating book");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Completes a book and sends a completion email with download link
 * @param bookId The ID of the book to mark as complete
 * @returns Action result with success/error information
 */
export async function completeBookAndSendEmail(
  bookId: string
): Promise<ActionResult<null>> {
  try {
    // 1. Fetch the book with user information
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        user: true,
        order: true,
      },
    });

    if (!book) {
      return createErrorResult(`Book with ID ${bookId} not found`);
    }

    // 2. Delete character image if it exists
    if (book.characterImageReference) {
      logger.info(
        { bookId, imageId: book.characterImageReference },
        "Deleting character image during book completion"
      );

      // Delete from Leonardo AI
      const deleteResult = await deleteCharacterImage(
        book.characterImageReference
      );

      if (deleteResult.success) {
        // Clear the reference from the database
        await clearCharacterImageReference(bookId);
        logger.info(
          { bookId },
          "Character image deleted and reference cleared"
        );
      } else {
        // Log the error but continue with the process
        logger.warn(
          { error: deleteResult.error, imageId: book.characterImageReference },
          "Failed to delete character image, continuing with book completion anyway"
        );
      }
    }

    // 2. Generate the download URL for the book
    const downloadResult = await getEbookDownloadUrl(bookId);

    if (!downloadResult.success) {
      return createErrorResult(
        downloadResult.error || "Failed to generate download URL"
      );
    }
    // 3. Extract user information
    const fullName = (
      book.order?.name || `${book.user?.firstName} ${book.user?.lastName}`
    ).trim();
    const email = book.order?.customerEmail;

    if (!email) {
      return createErrorResult("User email not found, cannot send email");
    }
    // 4. Send the completion email
    await sendBookCompletionEmail(
      email,
      fullName || "Valued Customer", // Fallback if name is blank
      book.title,
      book.order?.productType as ProductType,
      downloadResult.data
    );

    // 5. Return success
    return createSuccessResult(
      null,
      "Book marked as complete and notification email sent"
    );
  } catch (error) {
    console.error("Error in completeBookAndSendEmail:", error);
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error completing book"
    );
  }
}

/**
 * Deletes a book and all its related data
 * This is used when image generation fails and we need to clean up
 *
 * @param id The ID of the book to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteBook(id: string): Promise<ActionResult<null>> {
  try {
    logger.debug(
      { bookId: id },
      "Attempting to delete book due to image generation failure"
    );

    // Use a transaction to ensure all related records are deleted
    await prisma.$transaction(async (tx) => {
      // First, check if the book exists
      const book = await tx.book.findUnique({
        where: { id },
        include: {
          pages: true,
          character: true,
          imageGenerations: true,
        },
      });

      if (!book) {
        logger.warn({ bookId: id }, "Book not found during deletion attempt");
        return; // Exit the transaction without error
      }

      // Delete related imageGenerations
      if (book.imageGenerations.length > 0) {
        await tx.imageGeneration.deleteMany({
          where: { bookId: id },
        });
        logger.debug({ bookId: id }, "Deleted related image generations");
      }

      // Delete related pages
      if (book.pages.length > 0) {
        await tx.page.deleteMany({
          where: { bookId: id },
        });
        logger.debug({ bookId: id }, "Deleted related pages");
      }

      // Delete character if it exists
      if (book.character) {
        await tx.character.delete({
          where: { bookId: id },
        });
        logger.debug({ bookId: id }, "Deleted related character");
      }

      // Delete the book itself
      await tx.book.delete({
        where: { id },
      });

      logger.info({ bookId: id }, "Successfully deleted book");
    });

    return createSuccessResult(null, "Book successfully deleted");
  } catch (error) {
    logger.error({ error, bookId: id }, "Error deleting book");
    return createErrorResult(
      error instanceof Error ? error.message : "Failed to delete book"
    );
  }
}
