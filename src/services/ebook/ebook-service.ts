import path from "path";
import fs from "fs";
import os from "os";
import { v4 as uuidv4 } from "uuid";
import PDFDocument from "pdfkit";
import { BookForEbook } from "@/types/ebook";
import { EbookGenerationResult } from "@/types/ebook";
import { fetchImageAsBuffer } from "@/utils/imageUtils";

// Helper type for common page operations
type PageDrawingContext = {
  doc: PDFKit.PDFDocument;
  pageWidth: number;
  pageHeight: number;
  pageNumber?: number;
};

/**
 * Centers text horizontally on the page
 */
function centerText(doc: PDFKit.PDFDocument, text: string, y: number): void {
  const textWidth = doc.widthOfString(text);
  const textX = (doc.page.width - textWidth) / 2;
  doc.text(text, textX, y, { lineBreak: false });
}

/**
 * Adds decorative background for text pages
 */
function addTextPageBackground(ctx: PageDrawingContext): void {
  const { doc, pageWidth, pageHeight } = ctx;

  // Fill the page with a light cream color for a book-like feel
  doc.rect(0, 0, pageWidth, pageHeight).fill("#fcfcf7");

  // Add subtle decorative corners
  doc.strokeColor("#e0e0d1").lineWidth(1);

  // Top-left corner
  doc.moveTo(30, 30).lineTo(60, 30).moveTo(30, 30).lineTo(30, 60).stroke();

  // Top-right corner
  doc
    .moveTo(pageWidth - 30, 30)
    .lineTo(pageWidth - 60, 30)
    .moveTo(pageWidth - 30, 30)
    .lineTo(pageWidth - 30, 60)
    .stroke();

  // Bottom-left corner
  doc
    .moveTo(30, pageHeight - 30)
    .lineTo(60, pageHeight - 30)
    .moveTo(30, pageHeight - 30)
    .lineTo(30, pageHeight - 60)
    .stroke();

  // Bottom-right corner
  doc
    .moveTo(pageWidth - 30, pageHeight - 30)
    .lineTo(pageWidth - 60, pageHeight - 30)
    .moveTo(pageWidth - 30, pageHeight - 30)
    .lineTo(pageWidth - 30, pageHeight - 60)
    .stroke();
}

/**
 * Adds decorative background for dedication page
 */
function addDedicationPageBackground(ctx: PageDrawingContext): void {
  const { doc, pageWidth, pageHeight } = ctx;

  // Fill with a light paper texture color
  doc.rect(0, 0, pageWidth, pageHeight).fill("#fafaf5");

  // Add a decorative border
  doc
    .strokeColor("#d9d9c3")
    .lineWidth(2)
    .rect(30, 30, pageWidth - 60, pageHeight - 60)
    .stroke();

  // Add decorative corner flourishes
  doc.strokeColor("#c9c9b6").lineWidth(1.5);

  // Top left flourish
  doc.moveTo(45, 45).bezierCurveTo(55, 40, 65, 40, 75, 50).stroke();

  // Top right flourish
  doc
    .moveTo(pageWidth - 45, 45)
    .bezierCurveTo(pageWidth - 55, 40, pageWidth - 65, 40, pageWidth - 75, 50)
    .stroke();

  // Bottom left flourish
  doc
    .moveTo(45, pageHeight - 45)
    .bezierCurveTo(
      55,
      pageHeight - 40,
      65,
      pageHeight - 40,
      75,
      pageHeight - 50
    )
    .stroke();

  // Bottom right flourish
  doc
    .moveTo(pageWidth - 45, pageHeight - 45)
    .bezierCurveTo(
      pageWidth - 55,
      pageHeight - 40,
      pageWidth - 65,
      pageHeight - 40,
      pageWidth - 75,
      pageHeight - 50
    )
    .stroke();

  // Add a subtle horizontal rule at top
  doc
    .strokeColor("#e6e6d9")
    .lineWidth(2)
    .moveTo(80, 80)
    .lineTo(pageWidth - 80, 80)
    .stroke();

  // Add a subtle horizontal rule at bottom
  doc
    .moveTo(80, pageHeight - 80)
    .lineTo(pageWidth - 80, pageHeight - 80)
    .stroke();
}

/**
 * Draws a page number at the bottom of the page
 */
function drawPageNumber(ctx: PageDrawingContext): void {
  const { doc, pageHeight, pageNumber } = ctx;

  if (!pageNumber) return;

  doc.font("Helvetica").fontSize(10).fillColor("#666666");
  centerText(doc, pageNumber.toString(), pageHeight - 30);
}

/**
 * Draws the cover page of the book
 */
async function drawCoverPage(
  doc: PDFKit.PDFDocument,
  book: BookForEbook
): Promise<void> {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const ctx = { doc, pageWidth, pageHeight };

  if (book.coverImage) {
    try {
      // Fetch cover image from URL
      const imageBuffer = await fetchImageAsBuffer(book.coverImage);

      // Add the image as background covering the entire page
      doc.image(imageBuffer, 0, 0, {
        width: pageWidth,
        height: pageHeight,
      });

      // Draw title and dedication
      await drawCoverTitle(ctx, book.title);

      if (book.coverDedication) {
        await drawCoverDedication(ctx, book.coverDedication);
      }
    } catch (error) {
      console.error("Error adding cover image:", error);
      // Fallback - just add title if image fails
      doc.fontSize(30);
      centerText(doc, book.title, 200);

      if (book.coverDedication) {
        doc.fontSize(16);
        centerText(doc, book.coverDedication, 400);
      }
    }
  } else {
    // No cover image - just add title
    doc.fontSize(30);
    centerText(doc, book.title, 200);

    if (book.coverDedication) {
      doc.fontSize(16);
      centerText(doc, book.coverDedication, 400);
    }
  }
}

/**
 * Draws a page title (to be used when there is no dedication)
 */
/**
 * Draws a page title (to be used when there is no dedication)
 */
function drawPageTitle(
  doc: PDFKit.PDFDocument,
  book: BookForEbook,
  pageNumber: number
): void {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const ctx = { doc, pageWidth, pageHeight, pageNumber };
  const title = book.title;

  // Get the child's name from book.character if available
  const childName = book.character?.name || "";

  // Add enhanced page background similar to dedication page
  addDedicationPageBackground(ctx);

  // Create nicely styled title
  if (title) {
    // Calculate vertical center for title text
    const titleY = pageHeight / 2 - 80; // Moved up to make room for the personalization

    // Add decorative line above
    doc
      .strokeColor("#d0d0c0")
      .lineWidth(1.5)
      .moveTo(100, titleY - 20)
      .lineTo(pageWidth - 100, titleY - 20)
      .stroke();

    // Add the title text
    doc
      .font("Times-Bold")
      .fontSize(24)
      .fillColor("#333333")
      .text(title, 100, titleY, {
        width: pageWidth - 200,
        align: "center",
        lineGap: 4,
      });

    // Calculate height of title text to place line below
    const textHeight = doc.heightOfString(title, {
      width: pageWidth - 200,
      lineGap: 4,
    });

    // Add decorative line below
    doc
      .strokeColor("#d0d0c0")
      .lineWidth(1.5)
      .moveTo(100, titleY + textHeight + 20)
      .lineTo(pageWidth - 100, titleY + textHeight + 20)
      .stroke();

    // Add personalized message "Made with love for [child name]"
    if (childName) {
      const personalizationY = titleY + textHeight + 60;

      doc
        .font("Times-Italic")
        .fontSize(16)
        .fillColor("#666666")
        .text(`Made with love for`, 100, personalizationY, {
          width: pageWidth - 200,
          align: "center",
        });

      // Add the child's name in a more emphasized style
      doc
        .font("Times-BoldItalic")
        .fontSize(20)
        .fillColor("#333333")
        .text(childName, 100, personalizationY + 30, {
          width: pageWidth - 200,
          align: "center",
        });
    }
  }

  // Add page number
  drawPageNumber(ctx);
}

/**
 * Draws the title on the cover page
 */
async function drawCoverTitle(
  ctx: PageDrawingContext,
  title: string
): Promise<void> {
  const { doc, pageWidth } = ctx;

  // Set the font properties before calculating text dimensions
  doc.font("Helvetica-Bold").fontSize(24);

  // Calculate title dimensions
  const titleTextWidth = doc.widthOfString(title);
  const titleTextHeight = doc.heightOfString(title);

  // Add padding around text
  const padding = 20; // 20px padding on all sides
  const boxWidth = titleTextWidth + padding * 2;
  const boxHeight = titleTextHeight + padding * 2;

  // Calculate position to center the box
  const titleY = 30;
  const titleX = (pageWidth - boxWidth) / 2;

  // Draw background box for title
  doc
    .fillColor("white")
    .fillOpacity(0.8)
    .roundedRect(titleX, titleY, boxWidth, boxHeight, 10)
    .fill();

  // Reset opacity for text
  doc.fillOpacity(1).fillColor("black");

  // Place text centered in the box
  const textX = titleX + padding;
  const textY = titleY + padding;
  doc.text(title, textX, textY, { lineBreak: false });
}

/**
 * Draws the dedication on the cover page
 */
async function drawCoverDedication(
  ctx: PageDrawingContext,
  dedication: string
): Promise<void> {
  const { doc, pageWidth, pageHeight } = ctx;

  // Set the font properties before calculating dimensions
  doc.font("Helvetica-Oblique").fontSize(14);

  // For multiline text, we need to determine a reasonable width
  // Let's limit to 60% of page width as maximum
  const maxWidth = pageWidth * 0.6;

  // Calculate optimal width for the text
  // For short dedications, it will be the text width
  // For longer ones, it will be capped at maxWidth
  const dedicationTextWidth = Math.min(doc.widthOfString(dedication), maxWidth);

  // Now calculate height based on this width
  const dedicationTextHeight = doc.heightOfString(dedication, {
    width: dedicationTextWidth,
  });

  // Add padding
  const padding = 20;
  const boxWidth = dedicationTextWidth + padding * 2;
  const boxHeight = dedicationTextHeight + padding * 2;

  // Calculate position to center box at bottom portion of page
  const dedicationY = pageHeight - 150;
  const dedicationX = (pageWidth - boxWidth) / 2;

  // Draw background box for dedication
  doc
    .fillColor("white")
    .fillOpacity(0.85)
    .roundedRect(dedicationX, dedicationY, boxWidth, boxHeight, 10)
    .fill();

  // Reset opacity for text
  doc.fillOpacity(1).fillColor("#333333");

  // Center the dedication text in the box
  doc.text(dedication, dedicationX + padding, dedicationY + padding, {
    width: dedicationTextWidth,
    align: "left",
  });
}

/**
 * Draws the dedication page
 */
function drawDedicationPage(
  doc: PDFKit.PDFDocument,
  dedication: string | null | undefined
): void {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const ctx = { doc, pageWidth, pageHeight, pageNumber: 1 };

  // Add enhanced dedication page background
  addDedicationPageBackground(ctx);

  // Create nicely styled dedication with quote marks
  if (dedication) {
    // Calculate vertical center for dedication text
    const dedicationY = pageHeight / 2 - 50;

    // Add opening quotation mark
    doc
      .font("Times-Italic")
      .fontSize(36)
      .fillColor("#cccccc")
      .text('"', 70, dedicationY, { lineBreak: false });

    // Add the dedication text
    doc
      .font("Times-Italic")
      .fontSize(16)
      .fillColor("#333333")
      .text(dedication, 100, dedicationY + 15, {
        width: pageWidth - 200,
        align: "center",
        lineGap: 4,
      });

    // Calculate height of dedication text to place closing quote
    const textHeight = doc.heightOfString(dedication, {
      width: pageWidth - 200,
      lineGap: 4,
    });

    // Add closing quotation mark
    doc
      .font("Times-Italic")
      .fontSize(36)
      .fillColor("#cccccc")
      .text('"', pageWidth - 100, dedicationY + textHeight + 15, {
        lineBreak: false,
      });
  }

  // Add page number
  drawPageNumber(ctx);
}

/**
 * Draws an image page
 */
/**
 * Draws an image page with full bleed (image covers the entire page)
 */
async function drawImagePage(
  doc: PDFKit.PDFDocument,
  imageUrl: string,
  pageNumber: number
): Promise<void> {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;

  try {
    const imageBuffer = await fetchImageAsBuffer(imageUrl);

    // Add the image covering the entire page
    doc.image(imageBuffer, 0, 0, {
      width: pageWidth,
      height: pageHeight,
    });

    // Add page number with background for better visibility
    const numberText = pageNumber.toString();
    const numberWidth = doc.widthOfString(numberText) + 16;
    const numberHeight = 22;

    // Draw background pill for page number with better visibility
    doc
      .fillColor("white")
      .fillOpacity(0.7)
      .roundedRect(
        (pageWidth - numberWidth) / 2,
        pageHeight - 30 - 5,
        numberWidth,
        numberHeight,
        8
      )
      .fill();

    // Reset opacity for text
    doc.fillOpacity(1).fillColor("#333333").fontSize(12);
    centerText(doc, numberText, pageHeight - 30);
  } catch (error) {
    console.error(`Error adding image for page ${pageNumber}:`, error);
  }
}

/**
 * Draws a text page
 */
function drawTextPage(
  doc: PDFKit.PDFDocument,
  text: string,
  pageNumber: number
): void {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const ctx = { doc, pageWidth, pageHeight, pageNumber };

  // Add nice background to text pages
  addTextPageBackground(ctx);

  // Text page
  doc
    .font("Helvetica")
    .fontSize(14)
    .fillColor("#333333")
    .text(text, 70, 70, {
      width: pageWidth - 140,
      align: "left",
      lineGap: 4,
    });

  // Add page number
  drawPageNumber(ctx);
}

/**
 * Draws the end page
 */
function drawEndPage(doc: PDFKit.PDFDocument, pageNumber: number): void {
  const pageWidth = doc.page.width;
  const pageHeight = doc.page.height;
  const ctx = { doc, pageWidth, pageHeight, pageNumber };

  // Fill with a light cream color
  doc.rect(0, 0, pageWidth, pageHeight).fill("#fcfcf7");

  // Add a decorative border
  doc
    .strokeColor("#d0d0c0")
    .lineWidth(2)
    .roundedRect(50, 50, pageWidth - 100, pageHeight - 100, 15)
    .stroke();

  // Add some decorative flourishes at corners
  doc.strokeColor("#e0e0d1").lineWidth(1.5);

  // Top left decorative element
  doc.moveTo(65, 65).bezierCurveTo(75, 55, 85, 55, 100, 65).stroke();

  // Top right decorative element
  doc
    .moveTo(pageWidth - 65, 65)
    .bezierCurveTo(pageWidth - 75, 55, pageWidth - 85, 55, pageWidth - 100, 65)
    .stroke();

  // Bottom left decorative element
  doc
    .moveTo(65, pageHeight - 65)
    .bezierCurveTo(
      75,
      pageHeight - 55,
      85,
      pageHeight - 55,
      100,
      pageHeight - 65
    )
    .stroke();

  // Bottom right decorative element
  doc
    .moveTo(pageWidth - 65, pageHeight - 65)
    .bezierCurveTo(
      pageWidth - 75,
      pageHeight - 55,
      pageWidth - 85,
      pageHeight - 55,
      pageWidth - 100,
      pageHeight - 65
    )
    .stroke();

  // Add "THE END" text centered horizontally and vertically
  doc.font("Helvetica-Bold").fontSize(30).fillColor("#333333");
  centerText(doc, "THE END", pageHeight / 2 - 15);

  // Add a footer line
  doc.fontSize(14).font("Helvetica-Oblique").fillColor("#666666");
  centerText(doc, "A custom children's book", pageHeight / 2 + 30);

  // Add page number
  drawPageNumber(ctx);
}

/**
 * Main function to generate a PDF version of the book
 */
export async function generatePDF(
  book: BookForEbook
): Promise<EbookGenerationResult> {
  try {
    // 1. Create a unique filename for the PDF
    const tempDir = os.tmpdir();
    const fileName = `${book.title.replace(/\s+/g, "_")}_${uuidv4()}.pdf`;
    const filePath = path.join(tempDir, fileName);

    // Get author name
    const authorName = book.order?.name || "";

    // 2. Create a PDFKit document
    const doc = new PDFDocument({
      size: "A4",
      margin: 50,
      info: {
        Title: book.title,
        Author: authorName,
        Creator: "Your Book Store",
      },
    });

    // 3. Pipe the PDF to a file
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // 4. Add the cover page
    await drawCoverPage(doc, book);

    // 5. Add the dedication page
    doc.addPage();
    if (book.pageDedication) {
      drawDedicationPage(doc, book.pageDedication);
    } else {
      // If there's no dedication, use a title page instead with personalization
      drawPageTitle(doc, book, 1);
    }

    // 6. Add the book's content pages
    let pageNumber = 2; // Start from 2 since we already have dedication page

    // Filter out pages without content
    const contentPages = book.pages.filter((page) => {
      return (
        (page.imageUrl || page.textContent) &&
        (!page.type || page.type !== "GENERAL") &&
        page.type !== "DEDICATION"
      );
    });

    for (const page of contentPages) {
      // Add a new page for each content page
      doc.addPage();

      // Different formatting based on content
      if (page.imageUrl) {
        await drawImagePage(doc, page.imageUrl, pageNumber);
      } else if (page.textContent) {
        drawTextPage(doc, page.textContent, pageNumber);
      }

      pageNumber++;
    }

    // 7. Add "THE END" page
    doc.addPage();
    drawEndPage(doc, pageNumber);

    // 8. Finalize the PDF
    doc.end();

    // 9. Wait for the PDF to be written to the file
    return new Promise<EbookGenerationResult>((resolve, reject) => {
      writeStream.on("finish", () => {
        resolve({
          filePath,
          fileName,
          mimeType: "application/pdf",
        });
      });

      writeStream.on("error", (err) => {
        reject(err);
      });
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
    return null;
  }
}

/**
 * Cleanup function to remove temporary files
 */
export function cleanupTempFile(filePath: string): void {
  try {
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("Cleaned up temporary file:", filePath);
    }
  } catch (error) {
    console.error("Error cleaning up file:", error);
  }
}
