"use server";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { logger } from "@/lib/logger";

import prisma from "@/lib/prisma";
import {
  BookImageGenerationsStatus,
  ImageGenerationFull,
  ImageMetadata,
} from "@/types/image";
import { GenerationStatus, ImageType, PageType } from "@prisma/client";
import { leonardoImageService } from "@/services/image/image-generation-service";

/**
 * Get the image generation by id
 * @param generationId The image generation id
 * @returns ActionResult with the full image generation
 */
export async function getImageGenerationByGenerationId(
  generationId: string
): Promise<ActionResult<ImageGenerationFull>> {
  try {
    const imageGeneration = await prisma.imageGeneration.findUnique({
      where: { generationId },
      include: {
        book: true,
      },
    });

    if (!imageGeneration) {
      logger.debug("image generation not found");
      return createErrorResult("Image generation not found");
    }
    return createSuccessResult(imageGeneration);
  } catch (error) {
    logger.error({ error }, "Error in getImageGenerationByGenerationId");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Process a completed generation from Leonardo AI
 * @param generationId The generation ID from Leonardo
 * @param images Array of image URLs
 */
export async function processCompletedGeneration(
  generationId: string,
  images: string[]
): Promise<ActionResult<void>> {
  try {
    // 1. Get the image generation record
    const imageGenerationResult = await getImageGenerationByGenerationId(
      generationId
    );
    if (!imageGenerationResult.success) {
      return imageGenerationResult;
    }
    const imageGeneration = imageGenerationResult.data;

    // 2. Mark the generation as completed (no longer storing imageUrls here)
    await prisma.imageGeneration.update({
      where: { id: imageGeneration.id },
      data: {
        status: GenerationStatus.COMPLETE,
        completedAt: new Date(),
      },
    });

    // 3. Update the book or page with all generated images
    const selectedImageUrl = images[0]; // Default to first image

    if (imageGeneration.type === ImageType.COVER) {
      // Update book with cover image and all options
      await prisma.book.update({
        where: { id: imageGeneration.bookId },
        data: {
          coverImage: selectedImageUrl,
          coverImageOptions: images, // Store all options
        },
      });
    } else if (
      imageGeneration.type === ImageType.PAGE &&
      imageGeneration.pageId
    ) {
      // Update page with selected image and all options
      await prisma.page.update({
        where: { id: imageGeneration.pageId },
        data: {
          imageUrl: selectedImageUrl,
          imageOptions: images, // Store all options
        },
      });
    }

    logger.info(
      {
        generationId,
        bookId: imageGeneration.bookId,
        imageCount: images.length,
      },
      "Successfully processed completed generation"
    );
    return createSuccessResult(undefined);
  } catch (error) {
    logger.error(
      { error, generationId },
      "Error processing completed generation"
    );
    return createErrorResult(
      error instanceof Error ? error.message : "Failed to process images"
    );
  }
}

/**
 * Process a failed generation from Leonardo AI
 * @param generationId The generation ID from Leonardo
 * @param errorMessage Error message from Leonardo
 */
export async function processFailedGeneration(
  generationId: string,
  errorMessage: string
): Promise<ActionResult<void>> {
  try {
    // 1. Get the image generation record
    const imageGenerationResult = await getImageGenerationByGenerationId(
      generationId
    );

    if (!imageGenerationResult.success) {
      return imageGenerationResult;
    }

    const imageGeneration = imageGenerationResult.data;

    // 2. Update the generation record
    await prisma.imageGeneration.update({
      where: { id: imageGeneration.id },
      data: {
        status: GenerationStatus.FAILED,
        errorMessage,
        completedAt: new Date(),
      },
    });

    logger.error(
      {
        generationId,
        bookId: imageGeneration.bookId,
        error: errorMessage,
      },
      "Image generation failed"
    );

    return createSuccessResult(undefined);
  } catch (error) {
    logger.error({ error, generationId }, "Error processing failed generation");

    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Upload a character image to Leonardo AI
 *
 * @param imageData The character image blob
 * @param filename Optional filename
 * @returns ActionResult with the image ID from Leonardo
 */
export async function uploadCharacterImage(
  imageData: File,
  filename?: string
): Promise<ActionResult<string>> {
  try {
    logger.info(
      {
        fileSize: imageData.size,
        fileType: imageData.type,
        filename,
      },
      "Uploading character image"
    );

    // Create metadata for the image
    const metadata: ImageMetadata = {
      filename: filename || "character-image.png",
      contentType: imageData.type || "image/png",
      purpose: "character-reference",
    };

    // Use the service object directly
    const result = await leonardoImageService.uploadCharacterImage(
      imageData,
      metadata
    );

    if (!result.success || !result.imageId) {
      logger.error({ error: result.error }, "Failed to upload character image");
      return createErrorResult(result.error || "Unknown error uploading image");
    }

    logger.info(
      { imageId: result.imageId },
      "Character image uploaded successfully"
    );

    return createSuccessResult(result.imageId);
  } catch (error) {
    logger.error({ error }, "Error in uploadCharacterImage action");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Generates the cover image for a book
 * @param bookId The book ID
 * @param characterImageId Optional character image reference
 */
export async function generateBookCoverImage(
  bookId: string,
  characterImageId: string
): Promise<ActionResult<string>> {
  try {
    // Get the book
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        template: true,
      },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }

    // Use the pre-personalized prompt from the book
    const coverPrompt = book.coverPrompt;

    if (!coverPrompt) {
      return createErrorResult("Cover prompt not found for book");
    }

    const imageResult = await leonardoImageService.generateImage(
      coverPrompt,
      characterImageId
    );

    if (!imageResult.success) {
      return createErrorResult(
        imageResult.error || "Failed to start image generation"
      );
    }

    // Track the generation in the database
    await prisma.imageGeneration.create({
      data: {
        generationId: imageResult.generationId!,
        bookId: book.id,
        type: ImageType.COVER,
        prompt: coverPrompt,
        status: GenerationStatus.PENDING,
        apiCreditCost: imageResult.apiCreditCost,
      },
    });

    logger.info(
      { generationId: imageResult.generationId, bookId },
      "Cover image generation started"
    );

    return createSuccessResult(imageResult.generationId!);
  } catch (error) {
    logger.error({ error, bookId }, "Error generating book cover image");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Check the status of book image generations
 * @param bookId The book ID
 */
export async function getBookImageGenerationsStatus(
  bookId: string
): Promise<ActionResult<BookImageGenerationsStatus>> {
  try {
    const imageGenerations = await prisma.imageGeneration.findMany({
      where: { bookId },
      orderBy: { createdAt: "desc" },
    });

    const coverGen = imageGenerations.find(
      (gen) => gen.type === ImageType.COVER
    );

    const pageGens = imageGenerations
      .filter((gen) => gen.type === ImageType.PAGE)
      .map((gen) => ({
        generationId: gen.generationId,
        status: gen.status,
        pageId: gen.pageId,
      }));

    const result: BookImageGenerationsStatus = {
      ...(coverGen && {
        coverGeneration: {
          coverGenerationId: coverGen.generationId,
          coverStatus: coverGen.status,
          // No longer including options
        },
      }),
      pageGenerations: pageGens,
    };

    return createSuccessResult(result);
  } catch (error) {
    logger.error(
      { error, bookId },
      "Error getting book image generation status"
    );
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Generates an image for a single page
 * @param bookId The book ID
 * @param pageId The page ID
 * @param characterImageId Optional character image reference
 */
export async function generateBookPageImage(
  bookId: string,
  pageId: string,
  characterImageId: string
): Promise<ActionResult<string>> {
  try {
    // Get the book with the specific page
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        pages: {
          where: { id: pageId },
        },
      },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }

    if (book.pages.length === 0) {
      return createErrorResult("Page not found in this book");
    }

    const page = book.pages[0];

    if (page.type !== PageType.IMAGE) {
      return createErrorResult("Page is not an image type");
    }

    if (!page.imagePrompt) {
      return createErrorResult("Page has no image prompt");
    }

    const imageResult = await leonardoImageService.generateImage(
      page.imagePrompt,
      characterImageId
    );

    if (!imageResult.success) {
      return createErrorResult(
        imageResult.error || "Failed to start image generation"
      );
    }

    // Track the generation in the database
    await prisma.imageGeneration.create({
      data: {
        generationId: imageResult.generationId!,
        bookId: bookId,
        pageId: pageId,
        type: ImageType.PAGE,
        prompt: page.imagePrompt,
        status: GenerationStatus.PENDING,
        apiCreditCost: imageResult.apiCreditCost,
      },
    });

    logger.info(
      {
        generationId: imageResult.generationId,
        bookId,
        pageId,
        pageNumber: page.pageNumber,
      },
      "Page image generation started"
    );

    return createSuccessResult(imageResult.generationId!);
  } catch (error) {
    logger.error({ error, bookId, pageId }, "Error generating page image");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Generates the first page image for a book (used during initial creation)
 * @param bookId The book ID
 * @param characterImageId Optional character image reference
 */
export async function generateBookFirstPageImage(
  bookId: string,
  characterImageId: string
): Promise<ActionResult<string>> {
  try {
    // Get the book with the first image page
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        pages: {
          where: {
            type: PageType.IMAGE,
            imagePrompt: { not: null },
          },
          orderBy: {
            pageNumber: "asc",
          },
          take: 1,
        },
      },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }

    if (book.pages.length === 0) {
      return createErrorResult("No image page found for book");
    }

    const firstImagePage = book.pages[0];

    // Generate image for the first page
    return generateBookPageImage(bookId, firstImagePage.id, characterImageId);
  } catch (error) {
    logger.error({ error, bookId }, "Error generating first page image");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Generates remaining page images after order is placed
 * @param bookId The book ID
 */
export async function generateRemainingPageImages(
  bookId: string
): Promise<ActionResult<string[]>> {
  try {
    // Get the book with all pages that need images
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        pages: {
          where: {
            type: PageType.IMAGE,
            imagePrompt: { not: null },
            imageUrl: null, // Only pages without images
          },
          orderBy: {
            pageNumber: "asc",
          },
        },
      },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }

    if (book.pages.length === 0) {
      return createSuccessResult([]); // No pages need generation
    }

    if (!book.characterImageReference) {
      return createErrorResult("No character image reference found for book");
    }

    const generationIds: string[] = [];
    const errors: string[] = [];

    // Generate images for each page
    for (const page of book.pages) {
      const result = await generateBookPageImage(
        bookId,
        page.id,
        book.characterImageReference
      );

      if (result.success) {
        generationIds.push(result.data);
      } else {
        errors.push(`Page ${page.pageNumber}: ${result.error}`);
        logger.error(
          { pageId: page.id, pageNumber: page.pageNumber, error: result.error },
          "Failed to generate image for page"
        );
      }
    }

    // If some generations failed but others succeeded, we still return the successful ones
    if (generationIds.length > 0) {
      if (errors.length > 0) {
        logger.warn(
          {
            bookId,
            successCount: generationIds.length,
            errorCount: errors.length,
          },
          "Some page image generations failed"
        );
      }
      return createSuccessResult(generationIds);
    }

    // If all generations failed, return an error
    return createErrorResult(`Failed to generate images: ${errors.join("; ")}`);
  } catch (error) {
    logger.error({ error, bookId }, "Error generating remaining page images");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Deletes a character image from Leonardo AI
 * @param imageId The Leonardo AI image ID to delete
 */
export async function deleteCharacterImage(
  imageId: string
): Promise<ActionResult<void>> {
  try {
    logger.info({ imageId }, "Deleting character image from Leonardo AI");

    // Use the image service to delete the image
    const success = await leonardoImageService.deleteImage(imageId);

    if (!success) {
      return createErrorResult("Failed to delete image from Leonardo AI");
    }

    logger.info(
      { imageId },
      "Character image successfully deleted from Leonardo AI"
    );

    return createSuccessResult(undefined);
  } catch (error) {
    logger.error({ error, imageId }, "Error deleting character image");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Clears the character image reference from a book
 * @param bookId The book ID
 */
export async function clearCharacterImageReference(
  bookId: string
): Promise<ActionResult<void>> {
  try {
    // Update the book record to remove the character image reference
    await prisma.book.update({
      where: { id: bookId },
      data: {
        characterImageReference: null,
      },
    });

    logger.info({ bookId }, "Character image reference cleared from book");

    return createSuccessResult(undefined);
  } catch (error) {
    logger.error({ error, bookId }, "Error clearing character image reference");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}
