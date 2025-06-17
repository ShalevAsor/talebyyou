"use server";
import { createBookFromTemplate } from "@/services/book/book-creation-service";
import { CharacterData } from "@/schemas/character-schema";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import prisma from "@/lib/prisma";
import { BookStatus, Prisma, ProductType } from "@prisma/client";
import { getCurrentUser } from "./user-actions";
import { logger } from "@/lib/logger";
import {
  BookAdmin,
  BookFull,
  BookSearchFilters,
  BookSearchResult,
  BooksStatsData,
} from "@/types/book";
import { revalidatePath } from "next/cache";
import { serializeBook, serializeBooks } from "@/utils/serializers";
import { getEbookDownloadUrl } from "./ebook-actions";
import { sendBookCompletionEmail } from "./email-actions";
import {
  clearCharacterImageReference,
  deleteCharacterImage,
} from "./image-actions";
import { checkGuestBookLimit } from "./guest-actions";
import { getTotalImagesCost } from "@/utils/orderUtils";

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
  characterImageReference?: string
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
    // ✅ ADD: If book is being marked as READY_FOR_PRINTING, calculate and set image costs
    if (book.status === BookStatus.READY_FOR_PRINTING) {
      // Get all image generations for this book
      const imageGenerations = await prisma.imageGeneration.findMany({
        where: { bookId: book.id },
      });

      // Calculate total image cost using your existing utility
      const totalImageCost = getTotalImagesCost(imageGenerations);

      // Find any existing order for this book and update with image costs
      const existingOrder = await prisma.order.findFirst({
        where: {
          bookId: book.id,
          status: { not: "CANCELLED" },
        },
      });

      if (existingOrder && totalImageCost > 0) {
        await prisma.order.update({
          where: { id: existingOrder.id },
          data: {
            imagesCost: new Prisma.Decimal(totalImageCost.toString()),
          },
        });

        logger.info(
          {
            bookId: book.id,
            orderId: existingOrder.id,
            imagesCost: totalImageCost,
          },
          "Updated order with image generation costs"
        );
      }
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

/**
 * Gets books statistics for admin dashboard
 * @returns ActionResult with books statistics data
 */
export async function getBooksStats(): Promise<ActionResult<BooksStatsData>> {
  try {
    logger.debug("Fetching books statistics");

    // Get total books count
    const totalBooks = await prisma.book.count();

    // Get books count by status
    const booksByStatus = await prisma.book.groupBy({
      by: ["status"],
      _count: {
        status: true,
      },
    });

    // Convert array to object for easier access
    const statusCounts = {
      customizing: 0,
      ordered: 0,
      readyForPrinting: 0,
      completed: 0,
    };

    booksByStatus.forEach((item) => {
      switch (item.status) {
        case BookStatus.CUSTOMIZING:
          statusCounts.customizing = item._count.status;
          break;
        case BookStatus.ORDERED:
          statusCounts.ordered = item._count.status;
          break;
        case BookStatus.READY_FOR_PRINTING:
          statusCounts.readyForPrinting = item._count.status;
          break;
        case BookStatus.COMPLETED:
          statusCounts.completed = item._count.status;
          break;
      }
    });

    // Get recent books (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentBooks = await prisma.book.count({
      where: {
        createdAt: {
          gte: sevenDaysAgo,
        },
      },
    });

    // Get guest vs user books
    const guestBooks = await prisma.book.count({
      where: {
        userId: null,
      },
    });

    const userBooks = await prisma.book.count({
      where: {
        userId: {
          not: null,
        },
      },
    });

    const statsData: BooksStatsData = {
      totalBooks,
      booksByStatus: statusCounts,
      recentBooks,
      guestBooks,
      userBooks,
    };

    logger.debug(
      {
        totalBooks,
        recentBooks,
        guestBooks,
        userBooks,
        statusCounts,
      },
      "Books statistics fetched successfully"
    );

    return createSuccessResult(statsData);
  } catch (error) {
    logger.error({ error }, "Error fetching books statistics");
    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Failed to fetch books statistics"
    );
  }
}

/**
 * Search books based on various criteria for admin use
 * @param filters - Search filters including type, query, status, and date range
 * @returns ActionResult with array of BookSearchResult
 */
export async function searchBooks(
  filters: BookSearchFilters
): Promise<ActionResult<BookSearchResult[]>> {
  try {
    logger.debug({ filters }, "Searching books with filters");

    const { searchType, searchQuery, status, dateRange } = filters;

    // Base where clause for common filters
    const baseWhere: Prisma.BookWhereInput = {};

    // Add status filter if provided
    if (status) {
      baseWhere.status = status;
    }

    // Add date range filter if provided
    if (dateRange) {
      baseWhere.createdAt = {
        gte: new Date(dateRange.from),
        lte: new Date(dateRange.to + "T23:59:59.999Z"), // End of day
      };
    }

    const whereClause: Prisma.BookWhereInput = { ...baseWhere };

    // Add search-specific filters
    switch (searchType) {
      case "bookId":
        whereClause.id = searchQuery;
        break;

      case "userEmail":
        whereClause.OR = [
          {
            user: {
              email: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
          {
            order: {
              customerEmail: {
                contains: searchQuery,
                mode: "insensitive",
              },
            },
          },
        ];
        break;

      case "orderNumber":
        whereClause.order = {
          orderNumber: {
            contains: searchQuery,
            mode: "insensitive",
          },
        };
        break;

      case "bookTitle":
        whereClause.title = {
          contains: searchQuery,
          mode: "insensitive",
        };
        break;

      default:
        return createErrorResult("Invalid search type");
    }

    // Execute the search
    const books = await prisma.book.findMany({
      where: whereClause,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        order: {
          select: {
            id: true,
            orderNumber: true,
            customerEmail: true,
            name: true,
          },
        },
        template: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
      ...(searchType === "bookTitle" ? { take: 50 } : {}), // Limit title searches
    });

    // Transform results to BookSearchResult format
    const searchResults: BookSearchResult[] = books.map((book) => {
      const isGuest = !book.user;

      return {
        id: book.id,
        title: book.title,
        status: book.status,
        createdAt: book.createdAt,
        updatedAt: book.updatedAt,
        userEmail: book.user?.email || book.order?.customerEmail || undefined,
        userName: book.user
          ? `${book.user.firstName || ""} ${book.user.lastName || ""}`.trim()
          : book.order?.name || undefined,
        userId: book.user?.id || undefined,
        isGuest,
        orderNumber: book.order?.orderNumber || undefined,
        orderId: book.order?.id || undefined,
        templateName: book.template?.title || undefined,
      };
    });

    logger.debug(
      {
        searchType,
        searchQuery,
        resultsCount: searchResults.length,
      },
      "Books search completed successfully"
    );

    return createSuccessResult(searchResults);
  } catch (error) {
    logger.error({ error, filters }, "Error searching books");
    return createErrorResult(
      error instanceof Error ? error.message : "Failed to search books"
    );
  }
}

/**
 * Get book by ID with ALL relations for admin use
 * @param id - Book ID
 * @returns ActionResult with BookAdmin (includes all relations)
 */
export async function getBookByIdAdmin(
  id: string
): Promise<ActionResult<BookAdmin>> {
  try {
    logger.debug({ bookId: id }, "Fetching book details for admin");

    // Fetch the book with ALL relations for admin
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
        printJob: true,
        imageGenerations: {
          orderBy: { createdAt: "desc" },
        },
        user: {
          select: {
            id: true,
            email: true,
            firstName: true,
            lastName: true,
          },
        },
        guestSession: {
          select: {
            id: true,
            sessionId: true,
            lastActive: true,
            createdAt: true,
            expiresAt: true,
          },
        },
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
        hasOrder: !!book.order,
        hasUser: !!book.user,
        isGuest: !!book.guestSession,
      },
      "Book found for admin"
    );

    // Serialize the book to handle Decimal and Date values
    const serializedBook = serializeBook(book);

    return createSuccessResult(serializedBook as BookAdmin);
  } catch (error) {
    logger.error({ error, bookId: id }, "Error fetching book for admin");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Updates only the book title
 * @param bookId - The ID of the book to update
 * @param title - The new title
 * @returns ActionResult indicating success or failure
 */
export async function updateBookTitle(
  bookId: string,
  title: string
): Promise<ActionResult<null>> {
  try {
    logger.debug({ bookId, title }, "Updating book title");

    // Validate input
    if (!title.trim()) {
      return createErrorResult("Title cannot be empty");
    }

    // Update only the title field
    await prisma.book.update({
      where: { id: bookId },
      data: { title: title.trim() },
    });

    // Revalidate relevant paths
    revalidatePath(`/admin/books/${bookId}`);
    revalidatePath(`/library/preview/${bookId}`);

    logger.info({ bookId, title }, "Book title updated successfully");
    return createSuccessResult(null, "Title updated successfully");
  } catch (error) {
    logger.error({ error, bookId }, "Error updating book title");
    return createErrorResult(
      error instanceof Error ? error.message : "Failed to update title"
    );
  }
}

/**
 * Updates only the book cover dedication
 * @param bookId - The ID of the book to update
 * @param coverDedication - The new cover dedication (can be null/empty)
 * @returns ActionResult indicating success or failure
 */
export async function updateBookCoverDedication(
  bookId: string,
  coverDedication: string | null
): Promise<ActionResult<null>> {
  try {
    logger.debug({ bookId, coverDedication }, "Updating book cover dedication");

    // Update only the cover dedication field
    await prisma.book.update({
      where: { id: bookId },
      data: { coverDedication: coverDedication?.trim() || null },
    });

    // Revalidate relevant paths
    revalidatePath(`/admin/books/${bookId}`);
    revalidatePath(`/library/preview/${bookId}`);

    logger.info({ bookId }, "Book cover dedication updated successfully");
    return createSuccessResult(null, "Cover dedication updated successfully");
  } catch (error) {
    logger.error({ error, bookId }, "Error updating book cover dedication");
    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Failed to update cover dedication"
    );
  }
}

/**
 * Updates only the book page dedication
 * @param bookId - The ID of the book to update
 * @param pageDedication - The new page dedication (can be null/empty)
 * @returns ActionResult indicating success or failure
 */
export async function updateBookPageDedication(
  bookId: string,
  pageDedication: string | null
): Promise<ActionResult<null>> {
  try {
    logger.debug({ bookId, pageDedication }, "Updating book page dedication");

    // Update only the page dedication field
    await prisma.book.update({
      where: { id: bookId },
      data: { pageDedication: pageDedication?.trim() || null },
    });

    // Revalidate relevant paths
    revalidatePath(`/admin/books/${bookId}`);
    revalidatePath(`/library/preview/${bookId}`);

    logger.info({ bookId }, "Book page dedication updated successfully");
    return createSuccessResult(null, "Page dedication updated successfully");
  } catch (error) {
    logger.error({ error, bookId }, "Error updating book page dedication");
    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Failed to update page dedication"
    );
  }
}

export async function updatePageText(
  pageId: string,
  textContent: string
): Promise<ActionResult<null>> {
  try {
    await prisma.page.update({
      where: { id: pageId },
      data: { textContent: textContent.trim() || null },
    });

    // Revalidate the book page
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: { bookId: true },
    });

    if (page) {
      revalidatePath(`/admin/books/${page.bookId}`);
    }

    return createSuccessResult(null, "Page text updated successfully");
  } catch (error) {
    console.error("Error updating page text:", error);
    return createErrorResult("Failed to update page text");
  }
}

/**
 * Updates only the page image prompt
 * @param pageId - The ID of the page to update
 * @param imagePrompt - The new image prompt
 * @returns ActionResult indicating success or failure
 */
export async function updatePageImagePrompt(
  pageId: string,
  imagePrompt: string
): Promise<ActionResult<null>> {
  try {
    await prisma.page.update({
      where: { id: pageId },
      data: { imagePrompt: imagePrompt.trim() || null },
    });

    // Revalidate the book page
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: { bookId: true },
    });

    if (page) {
      revalidatePath(`/admin/books/${page.bookId}`);
    }

    return createSuccessResult(null, "Image prompt updated successfully");
  } catch (error) {
    console.error("Error updating image prompt:", error);
    return createErrorResult("Failed to update image prompt");
  }
}

/**
 * Updates the cover image prompt for a book
 * @param bookId - The ID of the book to update
 * @param imagePrompt - The new cover image prompt
 * @returns ActionResult indicating success or failure
 */
export async function updateCoverImagePrompt(
  bookId: string,
  imagePrompt: string
): Promise<ActionResult<null>> {
  try {
    const trimmedPrompt = imagePrompt.trim();

    await prisma.book.update({
      where: { id: bookId },
      data: {
        coverPrompt: trimmedPrompt || undefined, // Use undefined instead of null
      },
    });

    revalidatePath(`/admin/books/${bookId}`);
    return createSuccessResult(null, "Cover image prompt updated successfully");
  } catch (error) {
    console.error("Error updating cover image prompt:", error);
    return createErrorResult("Failed to update cover image prompt");
  }
}

/**
 * Selects a different image from existing page image options
 * @param pageId - The page ID
 * @param imageUrl - The image URL to set as the main image
 * @returns ActionResult indicating success or failure
 */
export async function selectPageImage(
  pageId: string,
  imageUrl: string
): Promise<ActionResult<null>> {
  try {
    // Get the page to validate the imageUrl exists in options
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      select: {
        imageOptions: true,
        bookId: true,
        pageNumber: true,
      },
    });

    if (!page) {
      return createErrorResult("Page not found");
    }

    // Validate that the imageUrl exists in the page's imageOptions
    if (!page.imageOptions.includes(imageUrl)) {
      logger.warn(
        {
          pageId,
          imageUrl: imageUrl.substring(0, 50) + "...",
          availableOptions: page.imageOptions.length,
        },
        "Attempted to select image URL that's not in page options"
      );
      return createErrorResult(
        "Invalid image selection - image not in options"
      );
    }

    // Update the page with the selected image
    await prisma.page.update({
      where: { id: pageId },
      data: { imageUrl },
    });

    // Revalidate the book page
    revalidatePath(`/admin/books/${page.bookId}`);

    logger.info(
      {
        pageId,
        pageNumber: page.pageNumber,
        bookId: page.bookId,
        imageUrl: imageUrl.substring(0, 50) + "...",
      },
      "Page image selected successfully"
    );

    return createSuccessResult(null, "Image selected successfully");
  } catch (error) {
    logger.error({ error, pageId }, "Failed to select page image");
    return createErrorResult("Failed to select image");
  }
}

/**
 * Selects a different cover image from existing cover image options
 * @param bookId - The book ID
 * @param imageUrl - The image URL to set as the main cover image
 * @returns ActionResult indicating success or failure
 */
export async function selectCoverImage(
  bookId: string,
  imageUrl: string
): Promise<ActionResult<null>> {
  try {
    // Get the book to validate the imageUrl exists in options
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        coverImageOptions: true,
        title: true,
      },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }

    // Validate that the imageUrl exists in the book's coverImageOptions
    if (!book.coverImageOptions.includes(imageUrl)) {
      logger.warn(
        {
          bookId,
          imageUrl: imageUrl.substring(0, 50) + "...",
          availableOptions: book.coverImageOptions.length,
        },
        "Attempted to select cover image URL that's not in options"
      );
      return createErrorResult(
        "Invalid image selection - image not in options"
      );
    }

    // Update the book with the selected cover image
    await prisma.book.update({
      where: { id: bookId },
      data: { coverImage: imageUrl },
    });

    // Revalidate the book page
    revalidatePath(`/admin/books/${bookId}`);

    logger.info(
      {
        bookId,
        bookTitle: book.title,
        imageUrl: imageUrl.substring(0, 50) + "...",
      },
      "Cover image selected successfully"
    );

    return createSuccessResult(null, "Cover image selected successfully");
  } catch (error) {
    logger.error({ error, bookId }, "Failed to select cover image");
    return createErrorResult("Failed to select cover image");
  }
}

/**
 * Regenerates page image with optional new prompt (adds to existing options)
 * @param pageId - The page ID
 * @param newPrompt - Optional new prompt (if not provided, uses existing imagePrompt)
 * @returns ActionResult with generation ID
 */
export async function regeneratePageImage(
  pageId: string,
  newPrompt?: string
): Promise<ActionResult<string>> {
  try {
    // Get page and book details
    const page = await prisma.page.findUnique({
      where: { id: pageId },
      include: {
        book: {
          select: {
            id: true,
            title: true,
            characterImageReference: true,
          },
        },
      },
    });

    if (!page) {
      return createErrorResult("Page not found");
    }

    if (!page.book.characterImageReference) {
      return createErrorResult(
        "No character image reference found for this book"
      );
    }

    // Determine the prompt to use
    const promptToUse = newPrompt?.trim() || page.imagePrompt;

    if (!promptToUse) {
      return createErrorResult("No image prompt available for regeneration");
    }

    // Update the page prompt if a new one was provided
    if (newPrompt?.trim() && newPrompt.trim() !== page.imagePrompt) {
      await prisma.page.update({
        where: { id: pageId },
        data: { imagePrompt: newPrompt.trim() },
      });
    }

    // Use your existing generateBookPageImage function
    const { generateBookPageImage } = await import("@/actions/image-actions");

    const generationResult = await generateBookPageImage(
      page.book.id,
      pageId,
      page.book.characterImageReference
    );

    if (!generationResult.success) {
      return createErrorResult(
        generationResult.error || "Failed to start image regeneration"
      );
    }

    logger.info(
      {
        pageId,
        pageNumber: page.pageNumber,
        bookId: page.book.id,
        generationId: generationResult.data,
        promptChanged: !!newPrompt?.trim(),
        promptLength: promptToUse.length,
      },
      "Page image regeneration started successfully"
    );

    return createSuccessResult(
      generationResult.data,
      "Image regeneration started successfully"
    );
  } catch (error) {
    logger.error({ error, pageId }, "Failed to regenerate page image");
    return createErrorResult("Failed to start image regeneration");
  }
}

/**
 * Regenerates cover image with optional new prompt (adds to existing options)
 * @param bookId - The book ID
 * @param newPrompt - Optional new prompt (if not provided, uses existing coverPrompt)
 * @returns ActionResult with generation ID
 */
export async function regenerateCoverImage(
  bookId: string,
  newPrompt?: string
): Promise<ActionResult<string>> {
  try {
    // Get book details
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: {
        id: true,
        title: true,
        coverPrompt: true,
        characterImageReference: true,
      },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }

    if (!book.characterImageReference) {
      return createErrorResult(
        "No character image reference found for this book"
      );
    }

    // Determine the prompt to use
    const promptToUse = newPrompt?.trim() || book.coverPrompt;

    if (!promptToUse) {
      return createErrorResult("No cover prompt available for regeneration");
    }

    // Update the book cover prompt if a new one was provided
    if (newPrompt?.trim() && newPrompt.trim() !== book.coverPrompt) {
      await prisma.book.update({
        where: { id: bookId },
        data: { coverPrompt: newPrompt.trim() },
      });
    }

    // Use your existing generateBookCoverImage function
    const { generateBookCoverImage } = await import("@/actions/image-actions");

    const generationResult = await generateBookCoverImage(
      bookId,
      book.characterImageReference
    );

    if (!generationResult.success) {
      return createErrorResult(
        generationResult.error || "Failed to start cover image regeneration"
      );
    }

    logger.info(
      {
        bookId,
        bookTitle: book.title,
        generationId: generationResult.data,
        promptChanged: !!newPrompt?.trim(),
        promptLength: promptToUse.length,
      },
      "Cover image regeneration started successfully"
    );

    return createSuccessResult(
      generationResult.data,
      "Cover image regeneration started successfully"
    );
  } catch (error) {
    logger.error({ error, bookId }, "Failed to regenerate cover image");
    return createErrorResult("Failed to start cover image regeneration");
  }
}

/**
 * Gets the current generation status for a page
 * @param pageId - The page ID
 * @returns ActionResult with generation status information
 */
export async function getPageGenerationStatus(pageId: string): Promise<
  ActionResult<{
    hasActiveGeneration: boolean;
    generationId?: string;
    status?: string;
  }>
> {
  try {
    // Find the most recent generation for this page
    const latestGeneration = await prisma.imageGeneration.findFirst({
      where: { pageId },
      orderBy: { createdAt: "desc" },
      select: {
        generationId: true,
        status: true,
        createdAt: true,
      },
    });

    if (!latestGeneration) {
      return createSuccessResult({
        hasActiveGeneration: false,
      });
    }

    const isActive = latestGeneration.status === "PENDING";

    return createSuccessResult({
      hasActiveGeneration: isActive,
      generationId: latestGeneration.generationId,
      status: latestGeneration.status,
    });
  } catch (error) {
    logger.error({ error, pageId }, "Failed to get page generation status");
    return createErrorResult("Failed to get generation status");
  }
}

/**
 * Gets the current generation status for a book cover
 * @param bookId - The book ID
 * @returns ActionResult with generation status information
 */
export async function getCoverGenerationStatus(bookId: string): Promise<
  ActionResult<{
    hasActiveGeneration: boolean;
    generationId?: string;
    status?: string;
  }>
> {
  try {
    // Find the most recent cover generation for this book
    const latestGeneration = await prisma.imageGeneration.findFirst({
      where: {
        bookId,
        type: "COVER",
      },
      orderBy: { createdAt: "desc" },
      select: {
        generationId: true,
        status: true,
        createdAt: true,
      },
    });

    if (!latestGeneration) {
      return createSuccessResult({
        hasActiveGeneration: false,
      });
    }

    const isActive = latestGeneration.status === "PENDING";

    return createSuccessResult({
      hasActiveGeneration: isActive,
      generationId: latestGeneration.generationId,
      status: latestGeneration.status,
    });
  } catch (error) {
    logger.error({ error, bookId }, "Failed to get cover generation status");
    return createErrorResult("Failed to get generation status");
  }
}
