// SKU for our book format (8.5" x 11" full color premium Case Wrap)

export const SKU = "0850X1100FCPRECW080CW444MXX";

export const INTERIOR_PDF = {
  // Total document size (with bleed) for US Letter
  DOCUMENT_WIDTH: 8.75, // in inches (222mm)
  DOCUMENT_HEIGHT: 11.25, // in inches (286mm)

  // Book trim size (US Letter)
  TRIM_WIDTH: 8.5, // in inches (216mm)
  TRIM_HEIGHT: 11, // in inches (279mm)

  // Safety margin (from trim edge)
  SAFETY_MARGIN: 0.5, // in inches (12.7mm)

  // Bleed area (from trim edge)
  BLEED_MARGIN: 0.125, // in inches (3.18mm)
};

export const COVER_PDF = {
  // Total document size (with wrap for case-wrap hardcover)
  DOCUMENT_WIDTH: 19, // in inches (482.6mm)
  DOCUMENT_HEIGHT: 12.75, // in inches (323.85mm)

  // Book trim size
  TRIM_WIDTH: 8.625, // in inches (219.07mm)
  TRIM_HEIGHT: 11.25, // in inches (285.75mm)

  // Safety margin (from wrap edge) - IMPORTANT: different from interior safety margin
  SAFETY_MARGIN: 0.625, // in inches (15.87mm)

  // Bleed area (from trim edge) - Added to fix the error
  BLEED_MARGIN: 0.125, // in inches (3.18mm)

  // Wrap area (from wrap edge)
  WRAP_AREA: 0.75, // in inches (19.05mm)

  // Barcode area (optional)
  BARCODE_WIDTH: 3.622, // in inches (92mm)
  BARCODE_HEIGHT: 1.25, // in inches (32mm)
  BARCODE_SPINE_MARGIN: 0.625, // in inches (15.87mm)

  // Spine width calculation constants
  // Using Lulu's hardcover spine width table
  // For 30 pages (approximate for our books):
  SPINE_WIDTH: 0.25, // in inches (6.35mm)
};

// To convert inches to points for PDFKit
export const inchesToPoints = (inches: number): number => inches * 72;

export const PRODUCTION_DELAYED = 5;
