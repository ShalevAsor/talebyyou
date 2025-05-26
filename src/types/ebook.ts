// types/ebook.ts

import { Book, Character, Order, Page } from "@prisma/client";

/**
 * Supported ebook file types
 */
export enum EbookFileType {
  PDF = "PDF",
}

/**
 * Result from generating an ebook file locally
 */
export type LocalEbookResult = {
  filePath: string; // Path to the temporary file
  fileName: string; // Name of the file (e.g., "my_book_123.pdf")
  mimeType: string; // Content type (e.g., "application/pdf")
};

/**
 * Result from uploading an ebook to S3
 */
export type S3EbookResult = {
  key: string; // S3 object key/path
  downloadUrl: string; // Pre-signed URL for downloading
  expiresAt: Date; // When the pre-signed URL expires
};

/**
 * Final result returned to the user
 */
export type EbookDownloadResult = {
  downloadUrl: string; // URL where the user can download the ebook
  fileName: string; // User-friendly filename
  fileType: EbookFileType; // PDF or EPUB
  expiresAt: Date; // When the download link expires
  key: string; // S3 object key/path
};

export type BookForEbook = Book & {
  pages: Page[];
  character: Character | null;
  order: Order;
};

export type EbookGenerationResult = {
  filePath: string;
  fileName: string;
  mimeType: string;
} | null;
