"use server";
import prisma from "@/lib/prisma";
import {
  generateAndStoreEbook,
  refreshDownloadUrl,
} from "@/services/ebook/ebook-manager-service";
import { EbookDownloadResult, EbookFileType } from "@/types/ebook";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { BookForEbook } from "@/types/ebook";

/**
 * Generate an ebook for a book and store it in S3
 */
export async function generateEbook(
  bookId: string,
  fileType: EbookFileType = EbookFileType.PDF
): Promise<ActionResult<EbookDownloadResult>> {
  try {
    // 1. Fetch the book with all necessary details
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        pages: {
          orderBy: { pageNumber: "asc" },
        },
        character: true,
        order: true,
      },
    });

    if (!book) {
      return createErrorResult(`Book with ID ${bookId} not found`);
    }

    // 2. Generate and upload the ebook
    const result = await generateAndStoreEbook(book as BookForEbook, fileType);

    if (!result) {
      return createErrorResult("Failed to generate or store ebook");
    }

    // 3. Update the book record with S3 information
    await prisma.book.update({
      where: { id: bookId },
      data: {
        ebookS3Key: result.key,
        ebookFileName: result.fileName,
        ebookFileType: fileType,
        ebookExpiresAt: result.expiresAt,
      },
    });

    return createSuccessResult(
      result,
      `PDF file generated successfully and ready for download`
    );
  } catch (error) {
    console.error("Error in generateEbook action:", error);
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error generating ebook"
    );
  }
}

/**
 * Get a download URL for a book's ebook
 */
export async function getEbookDownloadUrl(
  bookId: string
): Promise<ActionResult<string>> {
  try {
    // 1. Get the book
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: {
        pages: true,
        character: true,
        order: true,
      },
    });

    if (!book) {
      return createErrorResult(`Book with ID ${bookId} not found`);
    }

    // 2. Check if the book has an ebook
    if (!book.ebookS3Key) {
      // No ebook exists, generate a new one
      const generationResult = await generateEbook(bookId);

      if (!generationResult.success) {
        return createErrorResult(generationResult.error);
      }

      return createSuccessResult(
        generationResult.data.downloadUrl,
        `New PDF ebook generated and ready for download`
      );
    }

    // 3. Check if the existing URL has expired
    if (book.ebookExpiresAt && new Date() > book.ebookExpiresAt) {
      // URL has expired, generate a fresh one
      const newUrl = await refreshDownloadUrl(book.ebookS3Key);

      if (newUrl) {
        // Update the expiration date
        const newExpiresAt = new Date();
        newExpiresAt.setHours(newExpiresAt.getHours() + 24); // 24 hours from now

        await prisma.book.update({
          where: { id: bookId },
          data: {
            ebookExpiresAt: newExpiresAt,
          },
        });

        return createSuccessResult(newUrl, `PDF download URL refreshed`);
      } else {
        // Failed to refresh URL, generate a new ebook
        const generationResult = await generateEbook(bookId);

        if (!generationResult.success) {
          return createErrorResult(generationResult.error);
        }

        return createSuccessResult(
          generationResult.data.downloadUrl,
          `New PDF ebook generated after failed URL refresh`
        );
      }
    }

    // 4. Return the existing URL if it's still valid
    if (book.ebookS3Key) {
      const url = await refreshDownloadUrl(book.ebookS3Key);
      if (url) {
        return createSuccessResult(url, `PDF download URL retrieved`);
      } else {
        return createErrorResult(`Failed to get PDF download URL`);
      }
    }

    return createErrorResult(`No PDF ebook available for this book`);
  } catch (error) {
    console.error("Error in getEbookDownloadUrl action:", error);
    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Unknown error getting download URL"
    );
  }
}
