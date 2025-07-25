"use server";
import {
  BookStatus,
  OrderStatus,
  PrintJobStatus,
  Prisma,
  ProductType,
} from "@prisma/client";
import { revalidatePath } from "next/cache";

import { PRODUCTION_DELAYED, SKU } from "@/constants/printing";
import config from "@/lib/config";
import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import { uploadPrintingPdfToS3 } from "@/services/aws/s3-service";
import {
  generateCoverPdf,
  generateInteriorPdf,
} from "@/services/printing/pdf-generator-service";
import { getLuluPrintingService } from "@/services/printing/print-service"; // 🎯 Updated import
import {
  ActionResult,
  createErrorResult,
  createSuccessResult,
} from "@/types/actions";
import { BookPrint } from "@/types/book";
import {
  AddressValidationResult,
  BookPrintPreparationResult,
  CalculatePrintJobCostRequest,
  CalculatePrintJobCostResponse,
  CreatePrintJobRequest,
  FileValidationStatus,
  PdfValidationResult,
  PrintJobFull,
  PrintJobLineItem,
  ShippingAddress,
  ShippingAddressForOptions,
  ShippingLevel,
  ShippingOption,
  ShippingOptionsRequest,
} from "@/types/print";
import {
  extractErrorMessage,
  getLuluErrorMessage,
  handleShippingAddressValidationError,
  isShippingOptionUnavailableError,
} from "@/utils/errorUtils";
import { mapLuluStatusToPrintJobStatus } from "@/utils/printUtils";
import { serializeData } from "@/utils/serializers";

/**
 * Validates a shipping address using Lulu's print job cost calculation API
 *
 * @param address The shipping address to validate
 * @param quantity The number of copies to print
 * @param pageCount The page count of the book being ordered
 * @param shippingOption The shipping option to use for validation
 *
 * @returns ActionResult with validation details including any warnings/suggestions
 */

export async function validateShippingAddress(
  address: ShippingAddress,
  quantity: number,
  pageCount: number,
  shippingOption: ShippingLevel
): Promise<ActionResult<AddressValidationResult>> {
  try {
    logger.info("Validating shipping address with Lulu", {
      city: address.city,
      country: address.country_code,
    });

    // Create a print job cost calculation request
    const costRequest: CalculatePrintJobCostRequest = {
      line_items: [
        {
          pod_package_id: SKU,
          quantity,
          page_count: pageCount,
        },
      ],
      shipping_address: address,
      shipping_option: shippingOption,
    };

    try {
      // Call the print job cost calculation endpoint
      const luluPrintingService = getLuluPrintingService();
      const response = await luluPrintingService.calculatePrintJobCost(
        costRequest
      );

      // Extract validation information
      const addressValidation: AddressValidationResult = {
        isValid: true,
        hasWarnings: false,
      };

      // Check if there are warnings in the shipping address
      if (
        response.shipping_address?.warnings &&
        response.shipping_address.warnings.length > 0
      ) {
        addressValidation.hasWarnings = true;
        addressValidation.warnings = response.shipping_address.warnings[0];
      }

      // Check if there's a suggested address
      if (response.shipping_address?.suggested_address) {
        addressValidation.suggestedAddress =
          response.shipping_address.suggested_address;
      }

      logger.info("Address validation complete", {
        hasWarnings: addressValidation.hasWarnings,
        hasSuggestion: !!addressValidation.suggestedAddress,
      });

      return createSuccessResult(addressValidation);
    } catch (error) {
      // Check if this is a shipping option unavailable error
      if (isShippingOptionUnavailableError(error)) {
        logger.info(
          "Shipping option not available, but address format appears valid",
          {
            country: address.country_code,
            shippingOption,
          }
        );

        // For address validation purposes, treat this as a valid address
        return createSuccessResult({
          isValid: true,
          hasWarnings: false, // No need to show a warning during address validation
          shippingOptionUnavailable: true, // Add a flag to indicate this specific case
        });
      }

      // Use our existing utility function to handle validation errors
      const validationResult = handleShippingAddressValidationError(error);

      if (validationResult) {
        logger.info("Address validation handled warning/error", {
          isValid: validationResult.isValid,
          hasWarnings: validationResult.hasWarnings,
          path: validationResult.warnings?.path,
          code: validationResult.warnings?.code,
        });

        return createSuccessResult(validationResult);
      }

      // If we get here, it's an error we can't handle as an address validation issue
      logger.error("Address validation failed", error);
      const errorMessage = getLuluErrorMessage(error);

      return createErrorResult(`Invalid shipping address: ${errorMessage}`);
    }
  } catch (error) {
    // Handle unexpected errors in our own code
    logger.error("Address validation failed", error);
    const errorMessage = extractErrorMessage(error);

    return createErrorResult(`Invalid shipping address: ${errorMessage}`);
  }
}

/**
 * Get available shipping options for a book
 * @param bookId - The ID of the book
 * @param quantity - The quantity of books
 * @param shippingAddress - The shipping address
 * @returns An array of shipping options
 */
export async function getShippingOptions(
  bookId: string,
  quantity: number,
  shippingAddress: ShippingAddressForOptions
): Promise<ActionResult<ShippingOption[]>> {
  logger.info(`Getting shipping options for book: ${bookId}`);

  try {
    // 1. Validate inputs
    if (!bookId) {
      return createErrorResult("Book ID is required");
    }

    if (!shippingAddress) {
      return createErrorResult("Shipping address is required");
    }

    // 2. Fetch the book to get page count
    const book = await prisma.book.findUnique({
      where: { id: bookId },
      select: { pageCount: true },
    });

    if (!book) {
      return createErrorResult("Book not found");
    }
    // 3. Prepare shipping options request

    const request: ShippingOptionsRequest = {
      currency: "USD", // Add this line - explicitly set currency
      line_items: [
        {
          pod_package_id: SKU,
          quantity,
          page_count: book.pageCount,
        },
      ],
      shipping_address: shippingAddress,
    };
    // 3. Call the print service to get shipping options
    const luluPrintingService = getLuluPrintingService();
    const shippingResult = await luluPrintingService.getShippingOptions(
      request
    );
    console.log("Shipping result:", shippingResult);
    // 4. Return shipping options
    return createSuccessResult(shippingResult);
  } catch (error) {
    logger.error(
      `Unexpected error getting shipping options for book ${bookId}:`,
      error
    );
    return createErrorResult(
      `Failed to get shipping options: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Calculate print job costs using Lulu's API
 * This calculates costs based on book details and shipping information
 * Assumes the address has already been validated
 *
 * @param address The shipping address for the order
 * @param quantity The number of copies to print
 * @param pageCount The page count of the book being ordered
 * @param shippingOption The shipping option to use
 *
 * @returns ActionResult with cost breakdown
 */
export async function calculatePrintJobCost(
  address: ShippingAddress,
  quantity: number,
  pageCount: number,
  shippingOption: ShippingLevel
): Promise<ActionResult<CalculatePrintJobCostResponse>> {
  try {
    logger.info("Calculating print job cost", {
      quantity,
      pageCount,
      shippingOption,
      country: address.country_code,
    });

    // Create a print job cost calculation request
    const costRequest: CalculatePrintJobCostRequest = {
      line_items: [
        {
          pod_package_id: SKU,
          quantity,
          page_count: pageCount,
        },
      ],
      shipping_address: address,
      shipping_option: shippingOption,
    };

    // Call the print job cost calculation endpoint
    const luluPrintingService = getLuluPrintingService();
    const response = await luluPrintingService.calculatePrintJobCost(
      costRequest
    );

    logger.info("Print job cost calculated successfully", {
      totalCost: response.total_cost_incl_tax,
      currency: response.currency,
      shippingCost: response.shipping_cost?.total_cost_incl_tax,
    });

    return createSuccessResult(response);
  } catch (error) {
    // Handle errors
    logger.error("Print job cost calculation failed", error);
    const errorMessage = extractErrorMessage(error);

    return createErrorResult(
      `Failed to calculate print costs: ${errorMessage}`
    );
  }
}
/**
 * Prepare a book for printing by generating PDFs and uploading them to S3
 */

export async function prepareBookForPrinting(
  book: BookPrint
): Promise<BookPrintPreparationResult> {
  try {
    logger.info(`Starting print preparation for book ID: ${book.id}`);

    // 1. Generate interior PDF
    logger.info(`Generating interior PDF for book ID: ${book.id}`);
    const interiorResult = await generateInteriorPdf(book);

    if (!interiorResult || !interiorResult.filePath) {
      return {
        success: false,
        message: "Failed to generate interior PDF",
      };
    }

    // 2. Upload interior PDF to S3
    logger.info(`Uploading interior PDF to S3`);
    const interiorUrl = await uploadPrintingPdfToS3(
      interiorResult.filePath,
      interiorResult.fileName,
      book.id,
      "interior"
    );

    if (!interiorUrl) {
      return {
        success: false,
        message: "Failed to upload interior PDF to S3",
      };
    }

    // 3. Calculate cover dimensions using Lulu API
    logger.info(
      `Calculating cover dimensions for ${interiorResult.pageCount} pages`
    );
    const luluPrintingService = getLuluPrintingService();
    const coverDimensions = await luluPrintingService.calculateCoverDimensions(
      SKU,
      interiorResult.pageCount
    );

    // 4. Generate cover PDF with calculated dimensions
    logger.info(`Generating cover PDF for book ID: ${book.id}`);
    const coverResult = await generateCoverPdf(book, coverDimensions);

    if (!coverResult || !coverResult.filePath) {
      return {
        success: false,
        message: "Failed to generate cover PDF",
      };
    }

    // 5. Upload cover PDF to S3
    logger.info(`Uploading cover PDF to S3`);
    const coverUrl = await uploadPrintingPdfToS3(
      coverResult.filePath,
      coverResult.fileName,
      book.id,
      "cover"
    );

    if (!coverUrl) {
      return {
        success: false,
        message: "Failed to upload cover PDF to S3",
      };
    }

    logger.info(`Book ID: ${book.id} successfully prepared for printing`);

    return {
      success: true,
      interiorUrl,
      coverUrl,
      pageCount: interiorResult.pageCount,
      message: "Book successfully prepared for printing",
    };
  } catch (error) {
    logger.error(`Error preparing book ID: ${book.id} for printing:`, error);
    return {
      success: false,
      message: `Error preparing book for printing: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

/**
 * Validate PDFs with Lulu
 */
export async function validateBookPdfs(
  interiorUrl: string,
  coverUrl: string,
  pageCount: number
): Promise<PdfValidationResult> {
  try {
    logger.info(`Starting PDF validation for PDFs`);

    // 1. Submit interior PDF for validation
    logger.info(`Submitting interior PDF for validation: ${interiorUrl}`);
    const luluPrintingService = getLuluPrintingService();
    const interiorValidation = await luluPrintingService.validateInteriorPdf(
      interiorUrl,
      SKU
    );

    // 2. Wait for interior validation to complete
    let interiorResult = interiorValidation;
    let retries = 0;
    const maxRetries = 30;

    while (
      interiorResult.status !== FileValidationStatus.VALIDATED &&
      interiorResult.status !== FileValidationStatus.NORMALIZED &&
      interiorResult.status !== FileValidationStatus.ERROR &&
      retries < maxRetries
    ) {
      // Wait 2 seconds before checking again (poll interval)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check validation status
      interiorResult = await luluPrintingService.checkInteriorPdfValidation(
        interiorResult.id
      );

      retries++;
      logger.debug(
        `Interior validation status check ${retries}: ${interiorResult.status}`
      );
    }

    // If interior validation failed, return early
    if (
      interiorResult.status === FileValidationStatus.ERROR ||
      interiorResult.errors
    ) {
      logger.error(`Interior PDF validation failed:`, interiorResult.errors);

      return {
        success: true,
        isValid: false,
        validationId: interiorResult.id,
        status: interiorResult.status,
        errors: interiorResult.errors || ["Interior PDF validation failed"],
        message: "Interior PDF validation failed",
      };
    }

    // 3. Submit cover PDF for validation
    logger.info(`Submitting cover PDF for validation: ${coverUrl}`);
    const coverValidation = await luluPrintingService.validateCoverPdf(
      coverUrl,
      pageCount,
      SKU
    );

    // 4. Wait for cover validation to complete
    let coverResult = coverValidation;
    retries = 0;

    while (
      coverResult.status !== FileValidationStatus.NORMALIZED &&
      coverResult.status !== FileValidationStatus.ERROR &&
      retries < maxRetries
    ) {
      // Wait 2 seconds before checking again
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Check validation status
      coverResult = await luluPrintingService.checkCoverPdfValidation(
        coverResult.id
      );

      retries++;
      logger.debug(
        `Cover validation status check ${retries}: ${coverResult.status}`
      );
    }

    // If cover validation failed, return error
    if (
      coverResult.status === FileValidationStatus.ERROR ||
      coverResult.errors
    ) {
      logger.error(`Cover PDF validation failed:`, coverResult.errors);

      return {
        success: true,
        isValid: false,
        validationId: coverResult.id,
        status: coverResult.status,
        errors: coverResult.errors || ["Cover PDF validation failed"],
        message: "Cover PDF validation failed",
      };
    }

    // 5. Both validations were successful
    logger.info(`PDFs successfully validated`);

    return {
      success: true,
      isValid: true,
      validationId: coverResult.id, // Return the last ID for reference
      status: coverResult.status,
      message: "PDFs successfully validated",
    };
  } catch (error) {
    logger.error(`Error validating PDFs:`, error);
    return {
      success: false,
      isValid: false,
      message: `Error validating PDFs: ${
        error instanceof Error ? error.message : String(error)
      }`,
    };
  }
}

/**
 * Sends a book order to Lulu for printing
 *
 * This function handles the complete workflow of sending a book for printing:
 * 1. Validates the order and book status
 * 2. Creates a print job record for tracking
 * 3. Generates and uploads PDF files to S3
 * 4. Validates PDFs with Lulu's API
 * 5. Creates the print job with Lulu
 *
 * Note: Cost information is intentionally NOT set here as it will be
 * updated accurately via webhook when Lulu provides final pricing.
 *
 * @param orderId - The ID of the order to prepare for printing
 * @returns ActionResult containing the Lulu print job ID if successful
 */
export async function sendBookForPrinting(
  orderId: string
): Promise<ActionResult<{ printJobId: number | null }>> {
  try {
    logger.info({ orderId }, "Preparing book for printing");

    // ========================================
    // 1. VALIDATION AND DATA RETRIEVAL
    // ========================================

    // Get the order with all required related data
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        book: {
          include: {
            pages: true,
            character: true,
          },
        },
        printJob: true, // Check if print job already exists
      },
    });

    if (!order) {
      logger.error({ orderId }, "Order not found");
      return createErrorResult("Order not found");
    }

    // Check if a print job already exists for this order
    if (order.printJob) {
      logger.info(
        { orderId, printJobId: order.printJob.luluPrintJobId },
        "Print job already exists for this order"
      );
      return createSuccessResult({
        printJobId: order.printJob.luluPrintJobId || null,
      });
    }

    // Validate this is a physical book order
    if (order.productType !== ProductType.BOOK) {
      logger.error(
        { orderId, productType: order.productType },
        "Not a physical book order"
      );
      return createErrorResult(
        "Only physical books can be prepared for printing"
      );
    }

    // Validate book is ready for printing
    if (order.book.status !== BookStatus.READY_FOR_PRINTING) {
      logger.error(
        { orderId, bookStatus: order.book.status },
        "Book not ready to print"
      );
      return createErrorResult("Book not ready to print");
    }

    // Validate order has required shipping information
    if (
      !order.shippingLevel ||
      !order.name ||
      !order.street1 ||
      !order.city ||
      !order.phoneNumber ||
      !order.country ||
      !order.postcode
    ) {
      logger.error({ orderId }, "Order missing shipping information");
      return createErrorResult("Order missing required shipping information");
    }

    // ========================================
    // 2. CREATE PRINT JOB RECORD
    // ========================================

    // Create shipping address object from order data
    const shippingAddress: ShippingAddress = {
      name: order.name,
      street1: order.street1,
      street2: order.street2 || undefined,
      city: order.city,
      state_code: order.state_code ? order.state_code : undefined,
      country_code: order.country,
      postcode: order.postcode,
      phone_number: order.phoneNumber,
      is_business: false,
    };

    // Create print job record with basic information
    // Note: Cost fields are intentionally omitted - they will be set via webhook
    const printJobData: Prisma.PrintJobCreateInput = {
      order: { connect: { id: order.id } },
      book: { connect: { id: order.book.id } },
      podPackageId: SKU,
      pageCount: order.book.pageCount,
      status: PrintJobStatus.CREATED,
      statusMessage: "Starting print job creation",
      attempts: 1,
      currency: "USD",
    };

    const printJob = await prisma.printJob.create({
      data: printJobData,
    });

    // Link the print job to both book and order
    await prisma.book.update({
      where: { id: order.book.id },
      data: {
        printJobId: printJob.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: {
        printJobId: printJob.id,
      },
    });

    logger.info(
      { orderId, printJobId: printJob.id },
      "Print job record created successfully"
    );

    // ========================================
    // 3. PDF PREPARATION AND UPLOAD
    // ========================================

    // Generate PDF files and upload to S3
    const prepareResult = await prepareBookForPrinting(order.book);

    if (!prepareResult.success) {
      // Update print job record with error information
      await prisma.printJob.update({
        where: { id: printJob.id },
        data: {
          errorMessage: prepareResult.message,
          statusMessage: `PDF preparation failed: ${prepareResult.message}`,
        },
      });

      logger.error(
        { orderId, error: prepareResult.message },
        "Failed to prepare book PDF files"
      );
      return createErrorResult(
        `Failed to prepare book for printing: ${prepareResult.message}`
      );
    }

    // Update print job record with PDF information
    await prisma.printJob.update({
      where: { id: printJob.id },
      data: {
        interiorPdfUrl: prepareResult.interiorUrl,
        coverPdfUrl: prepareResult.coverUrl,
        interiorS3Key: prepareResult.interiorUrl?.split("/").pop(),
        coverS3Key: prepareResult.coverUrl?.split("/").pop(),
        statusMessage: "PDF files generated and uploaded successfully",
      },
    });

    logger.info(
      { orderId, printJobId: printJob.id },
      "PDF files prepared and uploaded successfully"
    );

    // ========================================
    // 4. PDF VALIDATION WITH LULU
    // ========================================

    // Validate PDFs with Lulu's validation service
    const validationResult = await validateBookPdfs(
      prepareResult.interiorUrl!,
      prepareResult.coverUrl!,
      prepareResult.pageCount!
    );

    // Handle validation failure
    if (!validationResult.success || !validationResult.isValid) {
      const errors =
        validationResult.errors?.join(", ") || "Unknown validation error";

      await prisma.printJob.update({
        where: { id: printJob.id },
        data: {
          interiorValidationStatus: FileValidationStatus.ERROR,
          coverValidationStatus: FileValidationStatus.ERROR,
          validationErrors: validationResult.errors || [
            "Unknown validation error",
          ],
          statusMessage: `PDF validation failed: ${errors}`,
        },
      });

      logger.error({ orderId, errors }, "PDF validation failed with Lulu");
      return createErrorResult(`PDF validation failed: ${errors}`);
    }

    // Update print job with successful validation results
    await prisma.printJob.update({
      where: { id: printJob.id },
      data: {
        interiorValidationId: validationResult.validationId,
        coverValidationId: validationResult.validationId,
        interiorValidationStatus: FileValidationStatus.NORMALIZED,
        coverValidationStatus: FileValidationStatus.NORMALIZED,
        statusMessage: "PDF validation completed successfully",
      },
    });

    logger.info(
      { orderId, printJobId: printJob.id },
      "PDF validation completed successfully"
    );

    // ========================================
    // 5. CREATE LULU PRINT JOB
    // ========================================

    // Prepare print job line item
    const printItem: PrintJobLineItem = {
      external_id: order.book.id,
      printable_normalization: {
        cover: {
          source_url: prepareResult.coverUrl!,
        },
        interior: {
          source_url: prepareResult.interiorUrl!,
        },
        pod_package_id: SKU,
      },
      quantity: order.quantity,
      title: order.book.title,
    };

    // Create print job request object
    const printJobRequest: CreatePrintJobRequest = {
      contact_email: config.PRINTING.LULU.CONTACT_EMAIL,
      external_id: order.id,
      line_items: [printItem],
      production_delay: PRODUCTION_DELAYED,
      shipping_address: shippingAddress,
      shipping_level: order.shippingLevel,
    };

    try {
      // Submit print job to Lulu
      const luluPrintingService = getLuluPrintingService();
      const printJobResponse = await luluPrintingService.createPrintJob(
        printJobRequest
      );

      // Update print job record with Lulu response
      const updateData: Prisma.PrintJobUpdateInput = {
        luluPrintJobId: printJobResponse.id,
        status: mapLuluStatusToPrintJobStatus(printJobResponse.status.name),
        statusMessage:
          printJobResponse.status.message || "Print job created successfully",
        sentToPrinterAt: new Date(),
        estimatedShipDate: printJobResponse.estimated_shipping_dates
          ?.dispatch_min
          ? new Date(printJobResponse.estimated_shipping_dates.dispatch_min)
          : null,
        estimatedDeliveryDate: printJobResponse.estimated_shipping_dates
          ?.arrival_max
          ? new Date(printJobResponse.estimated_shipping_dates.arrival_max)
          : null,
      };

      await prisma.printJob.update({
        where: { id: printJob.id },
        data: updateData,
      });

      // Update order status to printing
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.PRINTING,
        },
      });

      logger.info(
        {
          orderId,
          printJobId: printJobResponse.id,
          estimatedArrival:
            printJobResponse.estimated_shipping_dates?.arrival_max,
        },
        "Successfully submitted book for printing to Lulu"
      );

      // Revalidate admin pages
      revalidatePath("/admin/orders");
      revalidatePath(`/admin/orders/${orderId}`);
      revalidatePath("/admin/print-jobs");

      return createSuccessResult({
        printJobId: printJobResponse.id || null,
      });
    } catch (error) {
      // Handle Lulu API errors
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";

      await prisma.printJob.update({
        where: { id: printJob.id },
        data: {
          errorMessage,
          statusMessage: `Failed to create print job with Lulu: ${errorMessage}`,
        },
      });

      logger.error({ orderId, error }, "Failed to create print job with Lulu");
      return createErrorResult(`Failed to create print job: ${errorMessage}`);
    }
  } catch (error) {
    // Handle unexpected errors
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error occurred";
    logger.error({ error, orderId }, "Unexpected error in sendBookForPrinting");
    return createErrorResult(errorMessage);
  }
}
/**
 * Cancel a print job with Lulu and update the local record
 */
export async function cancelPrintJob(
  printJobId: string
): Promise<ActionResult<{ canceled: boolean }>> {
  try {
    logger.info(`Canceling print job ID: ${printJobId}`);

    // 1. Find the local print job record
    const printJob = await prisma.printJob.findUnique({
      where: { id: printJobId },
      include: {
        order: true,
      },
    });

    if (!printJob) {
      logger.error(`Print job not found: ${printJobId}`);
      return createErrorResult("Print job not found");
    }

    if (!printJob.luluPrintJobId) {
      logger.error(`Print job ${printJobId} has no Lulu print job ID`);
      return createErrorResult("Print job has no Lulu print job ID");
    }

    // 2. Cancel the print job with Lulu
    const luluPrintingService = getLuluPrintingService();
    const cancelResult = await luluPrintingService.cancelPrintJob(
      printJob.luluPrintJobId
    );
    // 3. Update local print job record
    await prisma.printJob.update({
      where: { id: printJobId },
      data: {
        status: PrintJobStatus.CANCELED,
        statusMessage: cancelResult.message || "Print job canceled",
      },
    });

    // 4. Update order status if applicable
    if (printJob.order) {
      await prisma.order.update({
        where: { id: printJob.order.id },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });
      revalidatePath(`/admin/orders/${printJob.order.id}`);
    }

    revalidatePath("/admin/orders");
    logger.info(`Print job ${printJobId} canceled successfully`);

    return createSuccessResult({
      canceled: true,
    });
  } catch (error) {
    logger.error(`Error canceling print job: ${error}`);
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Get all print jobs with related book and order data
 *
 * @returns ActionResult with array of PrintJobFull objects
 */
export async function getAllPrintJobs(): Promise<ActionResult<PrintJobFull[]>> {
  try {
    logger.info("Fetching all print jobs");

    // Fetch print jobs with related book and order information
    const printJobs = await prisma.printJob.findMany({
      include: {
        book: true,
        order: true,
      },
      orderBy: {
        createdAt: "desc", // Most recent first
      },
    });

    // Use the serializeData utility to handle Decimal values
    const serializedPrintJobs = serializeData(printJobs);

    logger.info(
      `Successfully fetched ${serializedPrintJobs.length} print jobs`
    );
    return createSuccessResult(serializedPrintJobs as PrintJobFull[]);
  } catch (error) {
    logger.error("Error fetching print jobs:", error);
    return createErrorResult(
      `Failed to fetch print jobs: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
