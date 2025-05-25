import fs from "fs";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const TEMP_UPLOAD_DIR = path.join(process.cwd(), "temp-uploads");

/**
 * Ensures the temp upload directory exists
 */
export function ensureTempUploadDir(): void {
  if (!fs.existsSync(TEMP_UPLOAD_DIR)) {
    fs.mkdirSync(TEMP_UPLOAD_DIR, { recursive: true });
  }
}

/**
 * Saves a file buffer to temp directory and returns the path
 */
export function saveToTempFile(buffer: Buffer, originalName: string): string {
  ensureTempUploadDir();

  const fileExtension = path.extname(originalName);
  const tempFileName = `${uuidv4()}${fileExtension}`;
  const tempFilePath = path.join(TEMP_UPLOAD_DIR, tempFileName);

  fs.writeFileSync(tempFilePath, buffer);
  return tempFilePath;
}

/**
 * Cleans up a temp file
 */
export function cleanupTempFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  } catch (error) {
    console.error("Error cleaning up temp file:", error);
  }
}
