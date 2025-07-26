import fs from "fs";
import os from "os";
import path from "path";

import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { v4 as uuidv4 } from "uuid";

import { COVER_PDF, INTERIOR_PDF, inchesToPoints } from "@/constants/printing";
import config from "@/lib/config";
import { logger } from "@/lib/logger";
import { BookPrint } from "@/types/book";
import { CoverDimensions, PrintPdfGenerationResult } from "@/types/print";
import { fetchImageAsBuffer } from "@/utils/imageUtils";

// ==================== FONT CONFIGURATION ====================

// Define paths to our custom fonts relative to the project root
const FONT_PATHS = {
  REGULAR: path.join(process.cwd(), "fonts", "OpenSans-Regular.ttf"),
  BOLD: path.join(process.cwd(), "fonts", "OpenSans-Bold.ttf"),
  ITALIC: path.join(process.cwd(), "fonts", "OpenSans-Italic.ttf"),
  BOLD_ITALIC: path.join(process.cwd(), "fonts", "OpenSans-BoldItalic.ttf"),
};

/**
 * Verify font files exist and log their paths
 */
function verifyFonts() {
  const fonts = {
    Regular: FONT_PATHS.REGULAR,
    Bold: FONT_PATHS.BOLD,
    Italic: FONT_PATHS.ITALIC,
    "Bold Italic": FONT_PATHS.BOLD_ITALIC,
  };

  let allFontsExist = true;
  Object.entries(fonts).forEach(([name, path]) => {
    const exists = fs.existsSync(path);
    logger.info(`Font ${name}: ${path} - Exists: ${exists}`);
    if (!exists) allFontsExist = false;
  });

  return allFontsExist;
}

/**
 * Register fonts with the PDFKit document
 */
function registerFonts(doc: PDFKit.PDFDocument): boolean {
  try {
    doc.registerFont("Regular", FONT_PATHS.REGULAR);
    doc.registerFont("Bold", FONT_PATHS.BOLD);
    doc.registerFont("Italic", FONT_PATHS.ITALIC);
    doc.registerFont("BoldItalic", FONT_PATHS.BOLD_ITALIC);

    // Set default font
    doc.font("Regular");
    logger.info("Custom fonts registered successfully");
    return true;
  } catch (fontError) {
    logger.error("Error registering custom fonts:", fontError);
    logger.warn(
      "Falling back to standard fonts. Note: This may result in font embedding issues with Lulu."
    );
    return false;
  }
}

// ==================== DESIGN CONSTANTS ====================

const DESIGN = {
  DEEP_BLUE: "#1A365D", // Deep dark blue for borders and other decorative elements
  DARK_GREY: "#333333", // Dark grey for spine
  TEXT_COLOR: "#333333", // Dark shade for text content
  LIGHT_GREY: "#999999", // Light grey for placeholder text
  PAGE_NUMBER_BG: "#F5F5F5", // Light background for page numbers
};

// ==================== CALCULATION UTILITIES ====================

/**
 * Capitalizes the first letter of each word in a title
 * excluding articles, coordinating conjunctions & prepositions
 * unless they're the first or last word
 */
export function capitalizeTitle(title: string): string {
  if (!title) return "";

  // Words that shouldn't be capitalized (unless they're first or last)
  const minorWords = new Set([
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "for",
    "nor",
    "on",
    "at",
    "to",
    "by",
    "in",
    "of",
    "with",
    "from",
    "as",
  ]);

  const words = title.split(" ");

  return words
    .map((word, index) => {
      // Always capitalize first and last word
      if (index === 0 || index === words.length - 1) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }

      // Check if it's a minor word
      if (minorWords.has(word.toLowerCase())) {
        return word.toLowerCase();
      }

      // For all other words, capitalize the first letter
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" ");
}

/**
 * Calculates spine width in inches based on page count for hardcover books
 * Following Lulu's hardcover spine width table
 */
function calculateSpineWidth(pageCount: number): number {
  // Hardcover spine width table from Lulu
  if (pageCount < 24) return 0; // Not enough pages for hardcover
  if (pageCount <= 84) return 0.25; // 0.25" for 24-84 pages
  if (pageCount <= 140) return 0.5; // 0.5" for 85-140 pages
  if (pageCount <= 168) return 0.625; // 0.625" for 141-168 pages
  if (pageCount <= 194) return 0.688; // 0.688" for 169-194 pages
  if (pageCount <= 222) return 0.75; // 0.75" for 195-222 pages

  // Our books are limited to 32 pages, so we won't need the rest of the table
  // But it's good to have the function handle all cases
  return 0.25; // Default for our case (under 84 pages)
}

/**
 * Calculate gutter margin addition based on page count
 * Following Lulu's gutter margin guidelines
 */
function calculateGutterAddition(pageCount: number): number {
  if (pageCount < 60) return 0; // No additional gutter for less than 60 pages
  if (pageCount <= 150) return 0.125; // 0.125" additional for 61-150 pages
  if (pageCount <= 400) return 0.5; // 0.5" additional for 151-400 pages
  if (pageCount <= 600) return 0.625; // 0.625" additional for 401-600 pages
  return 0.75; // 0.75" additional for over 600 pages
}

/**
 * QR code generator
 */

async function generateQRCodeDataURL(url: string): Promise<string> {
  try {
    return await QRCode.toDataURL(url, {
      width: 80,
      margin: 1,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    });
  } catch (error) {
    console.error("Error generating QR code:", error);
    return "";
  }
}

// ==================== FILE AND DOCUMENT SETUP ====================

/**
 * Creates a unique filename and file path for a PDF
 */
function createPdfFilePath(
  bookId: string,
  filePrefix: string
): { fileName: string; filePath: string } {
  const tempDir = os.tmpdir();
  const fileName = `${filePrefix}_${bookId}_${uuidv4()}.pdf`;
  const filePath = path.join(tempDir, fileName);
  return { fileName, filePath };
}

/**
 * Creates a new PDFDocument for the interior pages
 */
function createInteriorPdfDocument(
  title: string,
  documentWidth: number,
  documentHeight: number
): PDFKit.PDFDocument {
  return new PDFDocument({
    size: [documentWidth, documentHeight],
    // Don't set margins here as we'll handle the safety margin manually
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    info: {
      Title: title,
      Creator: "TaleByYou",
      Producer: "TaleByYou",
    },
    // Use PDF 1.6 to ensure proper compatibility with Lulu's systems
    pdfVersion: "1.6",
    compress: true,
    autoFirstPage: true,
    // Use PDF/A-1b which handles color profiles better for printing
    subset: "PDF/A-1b",
    bufferPages: false,
  });
}

/**
 * Creates a new PDFDocument for the cover
 */
function createCoverPdfDocument(
  title: string,
  documentWidth: number,
  documentHeight: number
): PDFKit.PDFDocument {
  return new PDFDocument({
    size: [documentWidth, documentHeight],
    margins: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
    info: {
      Title: `Cover - ${title}`,
      Creator: "TaleByYou",
      Producer: "TaleByYou",
    },
    pdfVersion: "1.6",
    compress: true,
    autoFirstPage: true,
    subset: "PDF/A-1b",
    bufferPages: false,
  });
}

// ==================== INTERIOR PAGE DRAWING FUNCTIONS ====================

/**
 * Draws a white background for a page
 */
function drawWhiteBackground(doc: PDFKit.PDFDocument): void {
  doc.rect(0, 0, doc.page.width, doc.page.height).fill("#FFFFFF");
}

/**
 * Draws a title page with decorative elements and centered title
 */
export function drawTitlePage(
  doc: PDFKit.PDFDocument,
  title: string,
  characterName?: string,
  safetyMargin = 36 // Default safetyMargin in points (0.5")
): void {
  // Set white background extending to bleed area
  drawWhiteBackground(doc);

  // Draw title page decoration - simple border only, no squares outside
  drawTitleDecoration(doc, safetyMargin);

  // Calculate safe area for content
  const safeWidth = doc.page.width - safetyMargin * 2;

  // Calculate center point vertically for better positioning
  const centerY = doc.page.height / 2 - 50; // Offset a bit above true center

  // Add title
  doc.font("Bold");
  doc.fontSize(36);
  doc.fillColor(DESIGN.DEEP_BLUE);

  const capitalizedTitle = capitalizeTitle(title);

  // Ensure title is properly centered
  doc.text(capitalizedTitle, safetyMargin, centerY, {
    width: safeWidth,
    align: "center",
  });

  // Add an engaging opening text for kids and parents
  doc.moveDown(2);
  doc.font("Italic");
  doc.fontSize(24);

  // Create a more appealing opening text
  let openingText = "A magical adventure awaits inside...";

  // Customize if character name exists
  if (characterName) {
    openingText = `A special adventure created just for ${characterName}`;
  }

  doc.text(openingText, {
    width: safeWidth,
    align: "center",
  });

  logger.info("Title page drawn successfully");
}

/**
 * Draws decorative elements for the title page - only a simple border
 */
export function drawTitleDecoration(
  doc: PDFKit.PDFDocument,
  safetyMargin = 36 // Default safetyMargin in points (0.5")
): void {
  // Get document dimensions
  const { width, height } = doc.page;

  // Save the graphics state
  doc.save();

  // Set decoration styling
  doc.lineWidth(3); // Thicker line for title page
  doc.strokeColor(DESIGN.DEEP_BLUE);

  // Draw decorative frame with elegant rounded corners
  const frameMargin = safetyMargin + 20;
  const frameWidth = width - frameMargin * 2;
  const frameHeight = height - frameMargin * 2;
  const cornerRadius = 20;

  // Draw rounded rectangle frame - NO outside corner elements
  doc
    .roundedRect(
      frameMargin,
      frameMargin,
      frameWidth,
      frameHeight,
      cornerRadius
    )
    .stroke();

  // Restore the graphics state
  doc.restore();

  logger.info("Title page decoration drawn");
}

/**
 * Draws an empty page with no content or decoration
 */
export function drawEmptyPage(doc: PDFKit.PDFDocument): void {
  // Set white background extending to bleed area
  drawWhiteBackground(doc);

  logger.info("Empty page drawn");
}

/**
 * Draws a dedication page with decorative border and centered dedication text
 */
export function drawDedicationPage(
  doc: PDFKit.PDFDocument,
  dedicationText?: string,
  safetyMargin = 36 // Default safetyMargin in points (0.5")
): void {
  // Set white background extending to bleed area
  drawWhiteBackground(doc);

  // Draw dedication page decoration with stars (not dots)
  drawDedicationDecoration(doc, safetyMargin);

  // Calculate safe area for content
  const safeWidth = doc.page.width - safetyMargin * 2;

  // Position dedication exactly in the center of the page
  const centerY = doc.page.height / 2 - 80;

  if (dedicationText) {
    // Add large opening quotation mark
    doc.font("Bold");
    doc.fontSize(48);
    doc.fillColor(DESIGN.DEEP_BLUE);
    doc.text("", safetyMargin + 50, centerY, { align: "left" });

    // Add dedication text in italics and quotation marks
    doc.font("Italic");
    doc.fontSize(18); // Slightly larger font for better readability
    doc.fillColor(DESIGN.TEXT_COLOR);
    doc.text(dedicationText, safetyMargin + 80, centerY + 60, {
      align: "center",
      width: safeWidth - 160, // Make room for quotation marks
    });

    // Add large closing quotation mark
    doc.font("Bold");
    doc.fontSize(48);
    doc.fillColor(DESIGN.DEEP_BLUE);
    doc.text("", doc.page.width - safetyMargin - 50, doc.y + 20, {
      align: "right",
    });
  } else {
    // If no dedication, just add an empty page - decoration will still be visible
    logger.info("No dedication text provided, page will show only decoration");
  }

  logger.info("Dedication page drawn successfully");
}

/**
 * Draws a decorative border for the dedication page with stars in the corners
 */
export function drawDedicationDecoration(
  doc: PDFKit.PDFDocument,
  safetyMargin = 36 // Default safetyMargin in points (0.5")
): void {
  // Get document dimensions
  const { width, height } = doc.page;

  // Save the graphics state
  doc.save();

  // Set decoration styling
  doc.lineWidth(1.5);
  doc.strokeColor(DESIGN.DEEP_BLUE);

  // Calculate frame position (elegant inset from safety margin)
  const frameMargin = safetyMargin + 30;
  const frameWidth = width - frameMargin * 2;
  const frameHeight = height - frameMargin * 2;

  // Draw a simple, elegant rectangle with rounded corners
  const cornerRadius = 15;
  doc
    .roundedRect(
      frameMargin,
      frameMargin,
      frameWidth,
      frameHeight,
      cornerRadius
    )
    .stroke();

  // Draw stars in each corner (inside the border)
  drawStarsInCorners(doc, frameMargin, width, height);

  // Restore the graphics state
  doc.restore();

  logger.info("Dedication decoration drawn");
}

/**
 * Draw stars in the corners of the dedication page
 */
function drawStarsInCorners(
  doc: PDFKit.PDFDocument,
  frameMargin: number,
  width: number,
  height: number
): void {
  const starInset = 25; // Distance from the corner
  const starSize = 12; // Size of the star

  // Function to draw a star
  const drawStar = (x: number, y: number, size: number) => {
    // Star with 5 points
    const points = 5;
    const outerRadius = size;
    const innerRadius = size / 2;

    doc.save();
    doc.translate(x, y);

    // PDFKit doesn't have beginPath like Canvas API
    // Instead, we'll create the path by explicitly moving to first point
    // and then connecting lines to subsequent points

    // Calculate first point position (top point of the star)
    const firstAngle = -Math.PI / 2; // Start from top (270 degrees)
    const firstX = outerRadius * Math.cos(firstAngle);
    const firstY = outerRadius * Math.sin(firstAngle);

    // Start our path
    doc.moveTo(firstX, firstY);

    // Draw the star by alternating outer and inner points
    for (let i = 1; i < points * 2; i++) {
      // Alternating outer and inner points
      const radius = i % 2 === 0 ? outerRadius : innerRadius;
      // Calculate angle (starting from top)
      const angle = (Math.PI * 2 * i) / (points * 2) - Math.PI / 2;

      const pX = radius * Math.cos(angle);
      const pY = radius * Math.sin(angle);

      doc.lineTo(pX, pY);
    }

    // Close the path back to the first point
    doc.closePath();
    doc.fill(DESIGN.DEEP_BLUE);
    doc.restore();
  };

  // Draw stars at each corner (inside the frame)
  // Top left
  drawStar(frameMargin + starInset, frameMargin + starInset, starSize);
  // Top right
  drawStar(width - frameMargin - starInset, frameMargin + starInset, starSize);
  // Bottom left
  drawStar(frameMargin + starInset, height - frameMargin - starInset, starSize);
  // Bottom right
  drawStar(
    width - frameMargin - starInset,
    height - frameMargin - starInset,
    starSize
  );
}

/**
 * Draws a text page with decorative corners and formatted text
 */
export function drawTextPage(
  doc: PDFKit.PDFDocument,
  textContent: string,
  pageNumber: number,
  leftMargin: number,
  rightMargin: number,
  safetyMargin = 36 // Default safety margin in points (0.5")
): void {
  // Set white background extending to bleed area
  drawWhiteBackground(doc);

  // Draw text page decoration
  drawTextPageDecoration(doc, safetyMargin);

  // Available content width with adjusted margins
  const contentWidth = doc.page.width - leftMargin - rightMargin;

  // Set text formatting with embedded font - use child-friendly settings
  doc.font("Regular");
  doc.fontSize(16); // Larger size for children's books
  doc.fillColor(DESIGN.TEXT_COLOR);

  // Add text content within safety margins, respecting the gutter adjustment
  // Position text in the upper middle area for children's books
  const textY = doc.page.height / 2 - 70;

  doc.text(textContent, leftMargin + 20, textY, {
    width: contentWidth - 40,
    align: "center",
    lineGap: 4, // Increased line spacing for readability
  });

  // Add page number
  drawPageNumber(doc, pageNumber, leftMargin, rightMargin, safetyMargin);

  logger.info(`Text page ${pageNumber} drawn successfully`);
}

/**
 * Draws decorative corners for text pages
 */
export function drawTextPageDecoration(
  doc: PDFKit.PDFDocument,
  safetyMargin = 36, // Default safety margin in points (0.5")
  color = DESIGN.DEEP_BLUE,
  size = 30
): void {
  // Get document dimensions
  const { width, height } = doc.page;

  // Save the graphics state
  doc.save();

  // Set decoration styling
  doc.lineWidth(2);
  doc.strokeColor(color);

  // Top-left corner
  doc
    .moveTo(safetyMargin, safetyMargin + size)
    .lineTo(safetyMargin, safetyMargin)
    .lineTo(safetyMargin + size, safetyMargin)
    .stroke();

  // Top-right corner
  doc
    .moveTo(width - safetyMargin - size, safetyMargin)
    .lineTo(width - safetyMargin, safetyMargin)
    .lineTo(width - safetyMargin, safetyMargin + size)
    .stroke();

  // Bottom-left corner
  doc
    .moveTo(safetyMargin, height - safetyMargin - size)
    .lineTo(safetyMargin, height - safetyMargin)
    .lineTo(safetyMargin + size, height - safetyMargin)
    .stroke();

  // Bottom-right corner
  doc
    .moveTo(width - safetyMargin - size, height - safetyMargin)
    .lineTo(width - safetyMargin, height - safetyMargin)
    .lineTo(width - safetyMargin, height - safetyMargin - size)
    .stroke();

  // Restore the graphics state
  doc.restore();

  logger.info("Text page decoration drawn");
}

/**
 * Draws an image page with a full bleed image that extends to the edge of the page
 */
export async function drawImagePage(
  doc: PDFKit.PDFDocument,
  imageUrl: string,
  displayPageNumber: number, // The page number to display (starting from 1)
  leftMargin: number,
  rightMargin: number,
  safetyMargin = 36 // Default safety margin in points (0.5")
): Promise<boolean> {
  try {
    // Set white background extending to bleed area (in case image fails to load)
    drawWhiteBackground(doc);

    // Fetch image from URL
    const imageBuffer = await fetchImageAsBuffer(imageUrl);

    // For full bleed images, extend to cover the entire page without any scaling restrictions
    // This ensures the image extends beyond the trim line by 0.125" on all sides
    doc.image(imageBuffer, 0, 0, {
      width: doc.page.width, // Force the width to be the full page width
      height: doc.page.height, // Force the height to be the full page height
    });

    // Add page number on image pages (with more visible background)
    drawPageNumber(
      doc,
      displayPageNumber,
      leftMargin,
      rightMargin,
      safetyMargin,
      true
    );

    logger.info(`Image page ${displayPageNumber} drawn successfully`);
    return true;
  } catch (error) {
    logger.error(`Error adding image for page ${displayPageNumber}:`, error);

    // Add placeholder text if image fails
    doc.font("Regular");
    doc.fontSize(12);
    doc.fillColor("#FF0000");
    doc.text("Image could not be loaded", {
      align: "center",
      width: doc.page.width - leftMargin - rightMargin,
    });

    // Still add page number even if image fails
    drawPageNumber(
      doc,
      displayPageNumber,
      leftMargin,
      rightMargin,
      safetyMargin
    );

    return false;
  }
}

/**
 * Draws page number with a circular background at the center of the page bottom
 */
export function drawPageNumber(
  doc: PDFKit.PDFDocument,
  pageNumber: number, // The actual page number to display
  leftMargin: number,
  rightMargin: number,
  safetyMargin = 36, // Default safety margin in points (0.5")
  onImagePage = false // Whether the page number is on an image page
): void {
  // Do not add page numbers to special pages or if page number is 0 or negative
  if (pageNumber <= 0) return;

  // Save the graphics state
  doc.save();

  // Calculate page number position - centered at bottom
  const x = doc.page.width / 2;
  const y = doc.page.height - safetyMargin - 20;
  const radius = 14; // Size of the circle

  // Draw background circle
  doc.circle(x, y, radius).fill(onImagePage ? "#E6E6E6" : "#F2F2F2");

  // Reset fill opacity
  doc.fillOpacity(1);

  // Add page number - using the passed-in page number
  doc
    .font("Bold")
    .fontSize(12)
    .fillColor(DESIGN.TEXT_COLOR)
    .text(
      pageNumber.toString(), // Use the actual page number value
      x - radius + 5,
      y - 6,
      {
        width: radius * 2 - 10,
        align: "center",
      }
    );

  // Restore the graphics state
  doc.restore();
}

/**
 * Draws a copyright page with publisher information - friendly version
 */
export function drawCopyrightPage(
  doc: PDFKit.PDFDocument,
  publisherName = "TaleByYou",
  safetyMargin = 36 // Default safety margin in points (0.5")
): void {
  // Set white background extending to bleed area
  drawWhiteBackground(doc);

  // Add decorative corners for consistency with text pages
  drawTextPageDecoration(doc, safetyMargin);

  // Calculate safe area for content
  const safeWidth = doc.page.width - safetyMargin * 2;

  // Add "The End" at the top
  doc.font("Bold");
  doc.fontSize(28);
  doc.fillColor(DESIGN.DEEP_BLUE);
  doc.text("The End", safetyMargin, doc.page.height / 3, {
    align: "center",
    width: safeWidth,
  });

  // Add copyright text at the bottom of the page
  const bottomY = doc.page.height - safetyMargin - 60; // Position close to the bottom

  // Add copyright text at the bottom - with a warmer, friendlier message
  doc.font("Italic");
  doc.fontSize(12);
  doc.fillColor("#666666");
  doc.text("Created with love by", safetyMargin, bottomY, {
    align: "center",
    width: safeWidth,
  });

  doc.moveDown(0.5);
  doc.font("Bold");
  doc.text(publisherName, {
    align: "center",
    width: safeWidth,
  });

  logger.info("Copyright page drawn successfully");
}

// ==================== COVER PAGE DRAWING FUNCTIONS ====================

/**
 * Draws the back cover with blue background and text
 */
async function drawBackCover(
  doc: PDFKit.PDFDocument,
  backCoverX: number,
  backCoverWidth: number,
  verticalOffset: number,
  trimHeight: number,
  bleedMargin: number,
  safetyMargin: number
): Promise<void> {
  // BACK COVER - Deep blue background extending to the bleed area
  // This covers the white area and extends into the Dark Navy Blue Border in the template
  doc
    .rect(
      0, // Start at left edge of document
      verticalOffset - bleedMargin,
      backCoverX + backCoverWidth, // Extend to end of back cover area
      trimHeight + bleedMargin * 2
    )
    .fill(DESIGN.DEEP_BLUE);

  // Add publisher info at top of back cover (in white text)
  // Moved further down from the top edge as requested
  doc.font("Bold");
  doc.fontSize(14);
  doc.fillColor("#FFFFFF");

  // Position text within safety margin, but moved down a bit (added 40 points)
  doc.text(
    "TaleByYou",
    backCoverX + safetyMargin,
    verticalOffset + safetyMargin + 40, // Moved down by 40 points
    {
      width: backCoverWidth - safetyMargin * 2,
      align: "center",
    }
  );

  // Book description - properly positioned within safety margins
  doc.font("Regular");
  doc.fontSize(12);
  doc.fillColor("#FFFFFF");
  doc.text(
    "Every child is the hero of their own story. This personalized adventure book features your child as the main character, creating a magical reading experience that will become a treasured keepsake for years to come.",
    backCoverX + safetyMargin,
    verticalOffset + trimHeight / 3,
    {
      width: backCoverWidth - safetyMargin * 2,
      align: "center",
      lineGap: 3,
    }
  );

  // Copyright notice - ensure it stays within safety margin from bottom
  doc.font("Regular");
  doc.fontSize(10);
  doc.fillColor("#FFFFFF");
  doc.text(
    `© ${new Date().getFullYear()} TaleByYou All rights reserved.\n\nVisit talebyyou.com`,
    backCoverX + safetyMargin,
    verticalOffset + trimHeight - safetyMargin - 50, // Moved up slightly to fit website
    {
      width: backCoverWidth - safetyMargin * 2,
      align: "center",
    }
  );
  // Add QR Code in bottom right corner
  try {
    const qrCodeDataURL = await generateQRCodeDataURL("https://talebyyou.com");
    if (qrCodeDataURL) {
      const qrSize = 60; // Size of QR code
      const qrX = backCoverX + backCoverWidth - safetyMargin - qrSize;
      const qrY = verticalOffset + trimHeight - safetyMargin - qrSize - 10;

      doc.image(qrCodeDataURL, qrX, qrY, {
        width: qrSize,
        height: qrSize,
      });

      // Add text below QR code
      doc.fontSize(8);
      doc.text("talebyyou.com", qrX - 10, qrY + qrSize + 5, {
        width: qrSize + 20,
        align: "center",
      });
    }
  } catch (error) {
    console.error("Failed to add QR code:", error);
  }
}

/**
 * Draws the spine of the book
 */
function drawSpine(
  doc: PDFKit.PDFDocument,
  spineX: number,
  spineWidth: number,
  verticalOffset: number,
  trimHeight: number,
  bleedMargin: number
): void {
  // SPINE - Dark grey, following Lulu's guidelines to avoid text for thin books
  doc
    .rect(
      spineX, // Spine starts at spine X position
      verticalOffset - bleedMargin, // Extend top by bleed margin
      spineWidth, // Spine width based on page count
      trimHeight + bleedMargin * 2 // Extend top and bottom by bleed margin
    )
    .fill(DESIGN.DARK_GREY);
}

/**
 * Draw the front cover with image
 */
async function drawFrontCover(
  doc: PDFKit.PDFDocument,
  frontCoverX: number,
  verticalOffset: number,
  trimHeight: number,
  bleedMargin: number,
  documentWidth: number,
  coverImage?: string
): Promise<void> {
  if (!coverImage) {
    throw new Error("Cover image is required but not provided");
  }

  try {
    const imageBuffer = await fetchImageAsBuffer(coverImage);

    // Draw image to fill the entire front cover INCLUDING bleed area
    doc.image(imageBuffer, frontCoverX, verticalOffset - bleedMargin, {
      width: documentWidth - frontCoverX, // Extend to right edge of document
      height: trimHeight + bleedMargin * 2,
    });
  } catch (error) {
    logger.error("Error loading cover image:", error);
    throw new Error(
      `Failed to load cover image: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Generate an interior PDF file for Lulu printing
 * Using modular functions for different page types
 * Following Lulu's specifications for US Letter books
 */
export async function generateInteriorPdf(
  book: BookPrint
): Promise<PrintPdfGenerationResult> {
  try {
    logger.info(`Starting interior PDF generation for book: ${book.id}`);

    // Verify fonts exist before proceeding
    const fontsExist = verifyFonts();
    if (!fontsExist) {
      logger.warn(
        "Some font files are missing. PDFs may not embed fonts correctly."
      );
    }

    // Create a unique filename and file path for the PDF
    const { fileName, filePath } = createPdfFilePath(book.id, "interior");

    // Calculate document dimensions
    const docWidth = inchesToPoints(INTERIOR_PDF.DOCUMENT_WIDTH);
    const docHeight = inchesToPoints(INTERIOR_PDF.DOCUMENT_HEIGHT);

    // Create a PDFKit document with proper dimensions
    const doc = createInteriorPdfDocument(book.title, docWidth, docHeight);

    // Pipe the PDF to a file
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Register fonts for the document
    registerFonts(doc);

    // Sort pages by page number to ensure correct order
    const sortedPages = [...book.pages].sort(
      (a, b) => a.pageNumber - b.pageNumber
    );

    // Track page count for return value
    let pageCount = 0;

    // Keep track of display page number (starting from 1 for content pages)
    let displayPageNumber = 0;

    // Calculate safety margin in points
    const safetyMargin = inchesToPoints(INTERIOR_PDF.SAFETY_MARGIN);

    // Calculate gutter addition based on page count
    const gutterAddition = inchesToPoints(
      calculateGutterAddition(book.pageCount)
    );

    // Add title page (first page, right-hand side)
    const characterName = book.character?.name;
    drawTitlePage(doc, book.title, characterName, safetyMargin);
    pageCount++;

    // Check if we have a dedication - only add dedication pages if we have content
    const dedicationText = book.pageDedication;
    const hasDedication = dedicationText && dedicationText.trim().length > 0;

    // Filter content pages (excluding special pages like dedication)
    const contentPages = sortedPages.filter(
      (page) =>
        page.pageNumber > 0 &&
        (page.textContent || page.imageUrl) &&
        page.type !== "DEDICATION"
    );

    if (hasDedication) {
      // If we have dedication, add empty page + dedication page
      doc.addPage();
      drawEmptyPage(doc);
      pageCount++;

      doc.addPage();
      drawDedicationPage(doc, dedicationText, safetyMargin);
      pageCount++;
    } else {
      // If no dedication, go straight to content - no empty page needed
      // We need to check if the first content page needs to be on an even page (text) or odd page (image)
      if (contentPages.length > 0) {
        const firstPage = contentPages[0];
        const shouldBeOnEvenPage = firstPage.type === "TEXT"; // Text pages should be on even pages (left)
        const currentIsEvenPage = (pageCount + 1) % 2 === 0; // Check if next page would be even

        // If the content type doesn't match the expected page parity, adjust by adding empty page
        if (shouldBeOnEvenPage !== currentIsEvenPage) {
          doc.addPage();
          drawEmptyPage(doc);
          pageCount++;
        }
      }
    }

    // Process all content pages
    for (let i = 0; i < contentPages.length; i++) {
      const page = contentPages[i];

      doc.addPage();
      pageCount++;
      displayPageNumber++; // Increment display page number for each content page

      // Adjust left margin for even/odd pages if gutter adjustment is needed
      // Even page numbers (left pages) - binding on right side
      // Odd page numbers (right pages) - binding on left side
      let leftMargin = safetyMargin;
      let rightMargin = safetyMargin;

      // Apply gutter addition if needed
      if (gutterAddition > 0) {
        // Even pages (left pages): add gutter to right margin
        if (pageCount % 2 === 0) {
          rightMargin += gutterAddition;
        }
        // Odd pages (right pages): add gutter to left margin
        else {
          leftMargin += gutterAddition;
        }
      }

      // Handle page based on type
      if (page.type === "TEXT") {
        // This is a text page (should be on left side, even page number)
        if (page.textContent) {
          drawTextPage(
            doc,
            page.textContent,
            displayPageNumber, // Use display page number starting from 1
            leftMargin,
            rightMargin,
            safetyMargin
          );
        } else {
          // If no text content, draw empty page with decorative corners
          drawTextPageDecoration(doc, safetyMargin);
          drawPageNumber(
            doc,
            displayPageNumber,
            leftMargin,
            rightMargin,
            safetyMargin
          );
        }
      } else if (page.type === "IMAGE") {
        // This is an image page (should be on right side, odd page number)
        if (page.imageUrl) {
          await drawImagePage(
            doc,
            page.imageUrl,
            displayPageNumber, // Use display page number starting from 1
            leftMargin,
            rightMargin,
            safetyMargin
          );
        } else {
          // If no image URL, draw empty page with decorative corners
          drawTextPageDecoration(doc, safetyMargin);
          drawPageNumber(
            doc,
            displayPageNumber,
            leftMargin,
            rightMargin,
            safetyMargin
          );
        }
      } else {
        // General page type - add decorative corners
        drawTextPageDecoration(doc, safetyMargin);

        // Add text if available
        if (page.textContent) {
          drawTextPage(
            doc,
            page.textContent,
            displayPageNumber, // Use display page number starting from 1
            leftMargin,
            rightMargin,
            safetyMargin
          );
        }

        // Add image if available (this branch is unlikely to be used with your structure)
        if (page.imageUrl && !page.textContent) {
          await drawImagePage(
            doc,
            page.imageUrl,
            displayPageNumber, // Use display page number starting from 1
            leftMargin,
            rightMargin,
            safetyMargin
          );
        }
      }
    }

    // For "The End" page, ensure it's on the right side (odd page)
    // First ensure we have an empty page on the left (even page)
    if (pageCount % 2 === 1) {
      // If current page count is odd, next page would be even - add empty page
      doc.addPage();
      drawEmptyPage(doc);
      pageCount++;
    }

    // Now add "The End" page on the right side (odd page)
    doc.addPage();
    drawCopyrightPage(doc, "TaleByYou", safetyMargin);
    pageCount++;

    // Ensure minimum page count requirement (24 for hardcover per Lulu's requirements)
    // But limit to 32 pages max as specified in your requirements
    while (pageCount < 24 && pageCount < 32) {
      doc.addPage();
      drawEmptyPage(doc);
      pageCount++;
    }

    // Ensure we end with an even total page count as required by Lulu
    if (pageCount % 2 !== 0 && pageCount < 32) {
      doc.addPage();
      drawEmptyPage(doc);
      pageCount++;
    }

    // Finalize the PDF
    doc.end();

    // Return a promise that resolves when the PDF is written to file
    return new Promise<PrintPdfGenerationResult>((resolve, reject) => {
      writeStream.on("finish", () => {
        logger.info(`Interior PDF generated successfully: ${filePath}`);
        resolve({
          filePath,
          fileName,
          pageCount,
        });
      });

      writeStream.on("error", (err) => {
        logger.error("Error writing interior PDF:", err);
        reject(err);
      });
    });
  } catch (error) {
    logger.error("Error generating interior PDF:", error);
    throw new Error(
      `Failed to generate interior PDF: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Generate a cover PDF file for Lulu printing
 * Following Lulu's exact specifications for cover layout with proper bleed and safety margins
 */
export async function generateCoverPdf(
  book: BookPrint,
  coverDimensions: CoverDimensions
): Promise<PrintPdfGenerationResult> {
  try {
    logger.info(`Starting cover PDF generation for book: ${book.id}`);

    // Create a unique filename and file path for the PDF
    const { fileName, filePath } = createPdfFilePath(book.id, "cover");

    // Use Lulu's dimensions from API when available, otherwise use our constants
    let documentWidth, documentHeight;

    if (coverDimensions && coverDimensions.width && coverDimensions.height) {
      documentWidth =
        typeof coverDimensions.width === "string"
          ? parseFloat(coverDimensions.width)
          : coverDimensions.width;

      documentHeight =
        typeof coverDimensions.height === "string"
          ? parseFloat(coverDimensions.height)
          : coverDimensions.height;

      logger.info(
        `Using Lulu API cover dimensions: ${documentWidth} x ${documentHeight}`
      );
    } else {
      // Fall back to our predefined constants
      documentWidth = inchesToPoints(COVER_PDF.DOCUMENT_WIDTH);
      documentHeight = inchesToPoints(COVER_PDF.DOCUMENT_HEIGHT);
      logger.info(
        `Using default cover dimensions: ${documentWidth} x ${documentHeight}`
      );
    }

    // Create a PDFKit document with the exact dimensions
    const doc = createCoverPdfDocument(
      book.title,
      documentWidth,
      documentHeight
    );

    // Pipe the PDF to a file
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Register fonts for the document
    registerFonts(doc);

    // Calculate dimensions for different parts of the cover
    // Convert all measurements to points for PDFKit
    const trimWidth = inchesToPoints(COVER_PDF.TRIM_WIDTH);
    const trimHeight = inchesToPoints(COVER_PDF.TRIM_HEIGHT);
    const bleedMargin = inchesToPoints(COVER_PDF.BLEED_MARGIN);
    const safetyMargin = inchesToPoints(COVER_PDF.SAFETY_MARGIN);

    // Calculate spine width based on page count (follows Lulu's specs)
    const spineWidth = inchesToPoints(calculateSpineWidth(book.pageCount));

    // Calculate dimensions for back cover and front cover
    const backCoverWidth = trimWidth;
    const frontCoverWidth = trimWidth;

    // Calculate positions for different cover parts
    // Center the entire cover layout within the document
    const totalPrintWidth = backCoverWidth + spineWidth + frontCoverWidth;
    const horizontalOffset = (documentWidth - totalPrintWidth) / 2;

    const backCoverX = horizontalOffset;
    const spineX = backCoverX + backCoverWidth;
    const frontCoverX = spineX + spineWidth;

    // Vertical offset to center the cover in the document
    const verticalOffset = (documentHeight - trimHeight) / 2;

    // Create a white background for the entire document
    drawWhiteBackground(doc);

    // Draw back cover with blue background and text
    await drawBackCover(
      doc,
      backCoverX,
      backCoverWidth,
      verticalOffset,
      trimHeight,
      bleedMargin,
      safetyMargin
    );

    // Draw spine
    drawSpine(doc, spineX, spineWidth, verticalOffset, trimHeight, bleedMargin);

    // Draw front cover with image
    await drawFrontCover(
      doc,
      frontCoverX,
      verticalOffset,
      trimHeight,
      bleedMargin,
      documentWidth,
      book.coverImage!
    );

    // FRONT COVER TEXT - Title with rounded background overlay
    const titlePadding = 15;
    const titleY = verticalOffset + safetyMargin + 20; // Position from top, respecting safety margin
    const titleFontSize = 28;
    // Define corner radius for rounded rectangles (tailwind md = 6px, lg = 8px)

    doc.font("Bold");
    doc.fontSize(titleFontSize);

    // Ensure title fits within safe area
    let displayTitle = capitalizeTitle(book.title);
    if (displayTitle.length > 50) {
      displayTitle = displayTitle.substring(0, 47) + "...";
    }

    // Calculate title box dimensions
    const titleWidth = doc.widthOfString(displayTitle) + titlePadding * 2;
    // Ensure title doesn't exceed safe area width
    const safeAreaWidth = frontCoverWidth - safetyMargin * 2;
    const finalTitleWidth = Math.min(titleWidth, safeAreaWidth);

    // Center the title box horizontally within the safe area
    const titleX = frontCoverX + (frontCoverWidth - finalTitleWidth) / 2;

    // Add title text with white stroke (outline) - NO background rectangle
    doc
      .font("Bold")
      .fontSize(titleFontSize)
      .fillColor("white") // Change to WHITE fill
      .strokeColor("#333333") // Change to DARK stroke
      .lineWidth(1.5); // Much thinner stroke

    doc.text(displayTitle, titleX + titlePadding, titleY + titlePadding, {
      width: finalTitleWidth - titlePadding * 2,
      align: "center",
      stroke: true,
      fill: true,
    });

    // Cover dedication or subtitle with rounded corners
    if (book.coverDedication) {
      const dedicationFontSize = 14;
      const dedicationPadding = 10;
      // Position from bottom, respecting safety margin
      const dedicationY = verticalOffset + trimHeight - safetyMargin - 60;

      doc.font("Italic");
      doc.fontSize(dedicationFontSize);

      // Ensure dedication fits within safe area
      let displayDedication = book.coverDedication;
      if (displayDedication.length > 150) {
        displayDedication = displayDedication.substring(0, 147) + "...";
      }

      // Calculate dedication dimensions within safe area
      const dedicationWidth = Math.min(
        doc.widthOfString(displayDedication) + dedicationPadding * 4,
        safeAreaWidth // Ensure it stays within safe area width
      );
      const dedicationHeight =
        doc.heightOfString(displayDedication, {
          width: dedicationWidth - dedicationPadding * 2,
        }) +
        dedicationPadding * 2;

      // Center horizontally within the front cover
      const dedicationX = frontCoverX + (frontCoverWidth - dedicationWidth) / 2;
      const cornerRadius = 8;
      // Draw dedication background with rounded corners
      doc
        .roundedRect(
          dedicationX,
          dedicationY,
          dedicationWidth,
          dedicationHeight,
          cornerRadius
        )
        .fill("#E6E6E6");

      // Reset opacity for text
      doc.fillOpacity(1);

      // Add dedication text
      doc.fillColor(DESIGN.DEEP_BLUE);
      doc.text(
        displayDedication,
        dedicationX + dedicationPadding,
        dedicationY + dedicationPadding,
        {
          width: dedicationWidth - dedicationPadding * 2,
          align: "center",
        }
      );
    }

    // Add debugging logs for development without visual elements
    if (config.APP.NODE_ENV === "development") {
      logger.info(`Cover PDF dimensions: ${documentWidth} x ${documentHeight}`);
      logger.info(
        `Back cover width: ${backCoverWidth}, Front cover width: ${frontCoverWidth}`
      );
      logger.info(`Spine width: ${spineWidth}`);
      logger.info(`Safety margin: ${safetyMargin}`);
      logger.info(`Bleed margin: ${bleedMargin}`);
      logger.info(
        `Horizontal offset: ${horizontalOffset}, Vertical offset: ${verticalOffset}`
      );
    }

    // Finalize the PDF
    doc.end();

    // Return a promise that resolves when the PDF is written to file
    return new Promise<PrintPdfGenerationResult>((resolve, reject) => {
      writeStream.on("finish", () => {
        logger.info(`Cover PDF generated successfully: ${filePath}`);
        resolve({
          filePath,
          fileName,
          pageCount: 1, // Cover is always 1 page
        });
      });

      writeStream.on("error", (err) => {
        logger.error("Error writing cover PDF:", err);
        reject(err);
      });
    });
  } catch (error) {
    logger.error("Error generating cover PDF:", error);
    throw new Error(
      `Failed to generate cover PDF: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
