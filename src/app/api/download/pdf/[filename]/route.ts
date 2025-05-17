import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import os from "os";
import { cleanupPDFFile } from "@/services/ebook/ebook-service";

/**
 * API route for handling PDF downloads
 * This route will find the generated PDF file and stream it to the client
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params;

    console.log("Received filename parameter:", filename);

    if (!filename) {
      console.error("Filename parameter is undefined");
      return NextResponse.json(
        { error: "Missing filename parameter" },
        { status: 400 }
      );
    }

    // Get rid of any potential path traversal
    const sanitizedFileName = path.basename(filename);

    // Check if filename is valid
    if (!sanitizedFileName || sanitizedFileName.includes("..")) {
      return NextResponse.json({ error: "Invalid file name" }, { status: 400 });
    }

    // Decode the URL-encoded filename
    const decodedFileName = decodeURIComponent(sanitizedFileName);
    console.log("Looking for file:", decodedFileName);

    // Construct the file path
    const tempDir = os.tmpdir();
    const filePath = path.join(tempDir, decodedFileName);
    console.log("Full file path:", filePath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      console.error(`File not found: ${filePath}`);

      // For debugging - list files in temp directory
      try {
        const files = fs.readdirSync(tempDir);
        const pdfFiles = files.filter((f) => f.endsWith(".pdf"));
        console.log("PDF files in temp directory:", pdfFiles.slice(0, 10)); // Show first 10 PDF files
      } catch (err) {
        console.error("Error listing temp directory:", err);
      }

      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    // Read the file
    const fileBuffer = fs.readFileSync(filePath);
    console.log(
      `Successfully read file: ${filePath}, size: ${fileBuffer.length} bytes`
    );

    // Set up cleanup (in a real implementation, you might use a worker or scheduled job)
    setTimeout(() => {
      cleanupPDFFile(filePath);
    }, 60000); // Clean up after 1 minute

    // Get a user-friendly file name for downloading
    const downloadFileName = decodedFileName.includes("_")
      ? decodedFileName.split("_")[0] + ".pdf"
      : decodedFileName;

    // Return the file
    return new NextResponse(fileBuffer, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${downloadFileName}"`,
        "Content-Length": String(fileBuffer.length),
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (error) {
    console.error("Error handling download:", error);
    return NextResponse.json(
      {
        error: "Server error",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
