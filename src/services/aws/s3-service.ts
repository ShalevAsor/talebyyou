// services/storage/s3-service.ts
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  DeleteObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import fs from "fs";
import config from "@/lib/config";
import { S3EbookResult } from "@/types/ebook";

// Initialize S3 client
const s3Client = new S3Client({
  region: config.AWS.REGION,
  credentials: {
    accessKeyId: config.AWS.ACCESS_KEY_ID,
    secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
  },
});

const BUCKET_NAME = config.AWS.S3_BUCKET_NAME;
const DOWNLOAD_URL_EXPIRY = 24 * 60 * 60; // 24 hours in seconds

/**
 * Uploads a file to S3 and returns a pre-signed URL
 */
export async function uploadFileToS3(
  filePath: string,
  fileName: string,
  mimeType: string
): Promise<S3EbookResult | null> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    // Read file
    const fileContent = fs.readFileSync(filePath);

    // Create S3 key with date-based folder structure
    const datePrefix = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const key = `ebooks/${datePrefix}/${fileName}`;

    // Upload to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: mimeType,
      })
    );

    // Generate pre-signed URL
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: DOWNLOAD_URL_EXPIRY }
    );

    // Calculate expiry date
    const expiresAt = new Date();
    expiresAt.setSeconds(expiresAt.getSeconds() + DOWNLOAD_URL_EXPIRY);

    return {
      key,
      downloadUrl: url,
      expiresAt,
    };
  } catch (error) {
    console.error("Error uploading file to S3:", error);
    return null;
  }
}

/**
 * Deletes a file from S3 by its key
 */
export async function deleteFileFromS3(s3Key: string): Promise<boolean> {
  try {
    // Initialize S3 client
    const s3Client = new S3Client({
      region: config.AWS.REGION,
      credentials: {
        accessKeyId: config.AWS.ACCESS_KEY_ID,
        secretAccessKey: config.AWS.SECRET_ACCESS_KEY,
      },
    });

    // Create delete command
    const deleteCommand = new DeleteObjectCommand({
      Bucket: config.AWS.S3_BUCKET_NAME || "",
      Key: s3Key,
    });

    // Execute delete command
    await s3Client.send(deleteCommand);
    console.log(`Successfully deleted file from S3: ${s3Key}`);
    return true;
  } catch (error) {
    console.error("Error deleting file from S3:", error);
    return false;
  }
}
/**
 * Uploads a PDF file to S3 for Lulu printing and returns a pre-signed URL with long expiration
 * This provides Lulu access to the file without making it permanently public
 */
export async function uploadPrintingPdfToS3(
  filePath: string,
  fileName: string,
  bookId: string,
  pdfType: "interior" | "cover"
): Promise<string | null> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    // Read file
    const fileContent = fs.readFileSync(filePath);

    // Create S3 key with proper folder structure
    const datePrefix = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const key = `printing/${datePrefix}/${bookId}/${pdfType}_${fileName}`;

    // Upload to S3 - note we're no longer using ACL: "public-read"
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: "application/pdf",
        // No ACL here, keeping the file private
      })
    );

    // Create a pre-signed URL with long expiration (7 days = 604800 seconds)
    // Lulu should be able to access this URL during this time window
    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: 604800 } // 7 days in seconds
    );

    // Clean up local temp file after successful upload
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return url;
  } catch (error) {
    console.error(`Error uploading ${pdfType} PDF to S3:`, error);
    return null;
  }
}

export async function cleanupPrintingFiles(bookId: string): Promise<void> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    // First, list all objects with the prefix for this book
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `printing/${bookId}/`,
    });

    const { Contents } = await s3Client.send(listCommand);

    if (!Contents || Contents.length === 0) {
      return;
    }

    // Delete each object
    for (const object of Contents) {
      if (object.Key) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: object.Key,
          })
        );
        console.log(`Deleted printing file: ${object.Key}`);
      }
    }
  } catch (error) {
    console.error("Error cleaning up printing files:", error);
  }
}

/**
 * Generates a fresh pre-signed URL for an existing S3 object
 */
export async function getDownloadUrl(key: string): Promise<string | null> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    const url = await getSignedUrl(
      s3Client,
      new GetObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
      }),
      { expiresIn: DOWNLOAD_URL_EXPIRY }
    );

    return url;
  } catch (error) {
    console.error("Error generating download URL:", error);
    return null;
  }
}

/**
 * Uploads a template image to S3 and returns the URL
 * @param file - File buffer or path to upload
 * @param templateSlug - Slug of the template
 * @param imageName - Name of the image (e.g., 'cover.jpg', 'page1.jpg')
 * @param mimeType - MIME type of the image
 * @returns URL of the uploaded image or null if upload fails
 */
// export async function uploadTemplateImageToS3(
//   file: Buffer | string,
//   templateSlug: string,
//   imageName: string,
//   mimeType?: string // Make this optional
// ): Promise<string | null> {
//   try {
//     if (!BUCKET_NAME) {
//       throw new Error("S3 bucket name not configured");
//     }

//     // Read file content based on input type
//     const fileContent = typeof file === "string" ? fs.readFileSync(file) : file;

//     // Auto-detect MIME type if not provided
//     let contentType = mimeType;
//     if (!contentType) {
//       const extension = imageName.toLowerCase().split(".").pop();
//       switch (extension) {
//         case "jpg":
//         case "jpeg":
//           contentType = "image/jpeg";
//           break;
//         case "png":
//           contentType = "image/png";
//           break;
//         case "webp":
//           contentType = "image/webp";
//           break;
//         default:
//           contentType = "image/jpeg";
//       }
//     }

//     // Create organized path in S3
//     const key = `templates/${templateSlug}/${imageName}`;

//     // Upload to S3
//     await s3Client.send(
//       new PutObjectCommand({
//         Bucket: BUCKET_NAME,
//         Key: key,
//         Body: fileContent,
//         ContentType: contentType,
//       })
//     );

//     // Return the public URL
//     return `https://${BUCKET_NAME}.s3.${config.AWS.REGION}.amazonaws.com/${key}`;
//   } catch (error) {
//     console.error("Error uploading template image to S3:", error);
//     return null;
//   }
// }
/**
 * Uploads a template image to S3 and returns the URL
 * @param file - File buffer or path to upload
 * @param templateSlug - Slug of the template
 * @param imageName - Name of the image (e.g., 'cover.jpg', 'page1.jpg')
 * @param mimeType - MIME type of the image
 * @returns URL of the uploaded image or null if upload fails
 */
export async function uploadTemplateImageToS3(
  file: Buffer | string,
  templateSlug: string,
  imageName: string,
  mimeType?: string
): Promise<string | null> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    // Read file content based on input type
    let fileContent: Buffer;

    if (typeof file === "string") {
      // File path provided - check if file exists first
      if (!fs.existsSync(file)) {
        console.error(`File not found at path: ${file}`);
        throw new Error(`File not found: ${file}`);
      }

      try {
        fileContent = fs.readFileSync(file);
        console.log(`Successfully read file from: ${file}`);

        // Clean up temp file after reading
        fs.unlinkSync(file);
        console.log(`Cleaned up temp file: ${file}`);
      } catch (readError) {
        console.error(`Error reading file ${file}:`, readError);
        throw new Error(`Failed to read file: ${file}`);
      }
    } else {
      // Buffer provided
      fileContent = file;
    }

    // Auto-detect MIME type if not provided
    let contentType = mimeType;
    if (!contentType) {
      const extension = imageName.toLowerCase().split(".").pop();
      switch (extension) {
        case "jpg":
        case "jpeg":
          contentType = "image/jpeg";
          break;
        case "png":
          contentType = "image/png";
          break;
        case "webp":
          contentType = "image/webp";
          break;
        default:
          contentType = "image/jpeg";
      }
    }

    // Create organized path in S3
    const key = `templates/${templateSlug}/${imageName}`;

    // Upload to S3
    await s3Client.send(
      new PutObjectCommand({
        Bucket: BUCKET_NAME,
        Key: key,
        Body: fileContent,
        ContentType: contentType,
      })
    );

    // Return the public URL
    return `https://${BUCKET_NAME}.s3.${config.AWS.REGION}.amazonaws.com/${key}`;
  } catch (error) {
    console.error("Error uploading template image to S3:", error);
    return null;
  }
}
/**
 * Gets a list of all images for a template
 * @param templateSlug - Slug of the template
 * @returns Array of image URLs
 */
export async function getTemplateImagesFromS3(
  templateSlug: string
): Promise<string[]> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `templates/${templateSlug}/`,
    });

    const { Contents } = await s3Client.send(listCommand);

    if (!Contents || Contents.length === 0) {
      return [];
    }

    // Convert S3 keys to public URLs
    return Contents.map(
      (item) =>
        `https://${BUCKET_NAME}.s3.${config.AWS.REGION}.amazonaws.com/${item.Key}`
    );
  } catch (error) {
    console.error("Error listing template images:", error);
    return [];
  }
}

/**
 * Deletes all images for a template
 * @param templateSlug - Slug of the template
 * @returns Boolean indicating success
 */
export async function deleteTemplateImagesFromS3(
  templateSlug: string
): Promise<boolean> {
  try {
    if (!BUCKET_NAME) {
      throw new Error("S3 bucket name not configured");
    }

    // First list all objects with the template prefix
    const listCommand = new ListObjectsV2Command({
      Bucket: BUCKET_NAME,
      Prefix: `templates/${templateSlug}/`,
    });

    const { Contents } = await s3Client.send(listCommand);

    if (!Contents || Contents.length === 0) {
      return true; // Nothing to delete
    }

    // Delete each object
    for (const object of Contents) {
      if (object.Key) {
        await s3Client.send(
          new DeleteObjectCommand({
            Bucket: BUCKET_NAME,
            Key: object.Key,
          })
        );
        console.log(`Deleted template image: ${object.Key}`);
      }
    }

    return true;
  } catch (error) {
    console.error("Error deleting template images:", error);
    return false;
  }
}
