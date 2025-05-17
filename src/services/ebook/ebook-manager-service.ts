// services/ebook/ebook-manager-service.ts
import { generatePDF, cleanupTempFile } from "./ebook-service";
import { uploadFileToS3, getDownloadUrl } from "@/services/aws/s3-service";
import {
  BookForEbook,
  EbookDownloadResult,
  EbookFileType,
  LocalEbookResult,
} from "@/types/ebook";

/**
 * Generates an ebook for a book and uploads it to S3
 */
export async function generateAndStoreEbook(
  book: BookForEbook,
  fileType: EbookFileType = EbookFileType.PDF
): Promise<EbookDownloadResult | null> {
  try {
    // No need to check for existing ebook of different type
    // since we only support PDF now

    // Generate the PDF ebook
    const result = await generatePDF(book);
    if (!result) {
      throw new Error("Failed to generate PDF");
    }
    const generationResult: LocalEbookResult = result;

    // Upload to S3
    const uploadResult = await uploadFileToS3(
      generationResult.filePath,
      generationResult.fileName,
      generationResult.mimeType
    );

    if (!uploadResult) {
      throw new Error("Failed to upload ebook to S3");
    }

    // Clean up temporary file
    cleanupTempFile(generationResult.filePath);

    // Return the result
    return {
      downloadUrl: uploadResult.downloadUrl,
      fileName: generationResult.fileName,
      fileType: fileType,
      expiresAt: uploadResult.expiresAt,
      key: uploadResult.key,
    };
  } catch (error) {
    console.error("Error generating and storing ebook:", error);
    return null;
  }
}

/**
 * Gets a fresh download URL for an existing S3 object
 */
export async function refreshDownloadUrl(
  s3Key: string
): Promise<string | null> {
  try {
    return await getDownloadUrl(s3Key);
  } catch (error) {
    console.error("Error refreshing download URL:", error);
    return null;
  }
}
