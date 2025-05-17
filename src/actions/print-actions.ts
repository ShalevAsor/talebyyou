"use server";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import {
  ShippingAddress,
  AddressValidationResult,
  CalculatePrintJobCostRequest,
  ShippingLevel,
  ShippingOption,
  ShippingOptionsRequest,
  ShippingAddressForOptions,
  CalculatePrintJobCostResponse,
  PdfValidationResult,
  FileValidationStatus,
  CreatePrintJobRequest,
  PrintJobLineItem,
  PrintJobFull,
  BookPrintPreparationResult,
} from "@/types/print";
import { logger } from "@/lib/logger";
import { PRODUCTION_DELAYED, SKU } from "@/constants/printing";
import { luluPrintingService } from "@/services/printing/print-service";
import prisma from "@/lib/prisma";
import {
  extractErrorMessage,
  getLuluErrorMessage,
  handleShippingAddressValidationError,
  isShippingOptionUnavailableError,
} from "@/utils/errorUtils";
import { BookPrint } from "@/types/book";
import {
  generateCoverPdf,
  generateInteriorPdf,
} from "@/services/printing/pdf-generator-service";
import { uploadPrintingPdfToS3 } from "@/services/aws/s3-service";
import {
  BookStatus,
  OrderStatus,
  PrintJobStatus,
  Prisma,
  ProductType,
} from "@/generated/prisma";
import config from "@/lib/config";
import { revalidatePath } from "next/cache";
import { mapLuluStatusToPrintJobStatus } from "@/utils/printUtils";
import { serializeData } from "@/utils/serializers";
/**
 * Validates a shipping address using Lulu's print job cost calculation API
 * This performs a lightweight call to check address validity without creating an order
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
 * Prepare book for printing after successful payment
 * This prepares PDFs, uploads them to S3, and validates them with Lulu
 * Then it sends the book to Lulu for printing
 * and returns the print job ID
 */
export async function sendBookForPrinting(
  orderId: string
): Promise<ActionResult<{ printJobId: number | null }>> {
  try {
    logger.info({ orderId }, "Preparing book for printing");

    // 1. Get the order with book data
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        book: {
          include: {
            pages: true,
            character: true,
          },
        },
        printJob: true, // Check if a print job already exists
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

    // 2. Check if this is a physical book order
    if (order.productType !== ProductType.BOOK) {
      logger.error(
        { orderId, productType: order.productType },
        "Not a physical book order"
      );
      return createErrorResult(
        "Only physical books can be prepared for printing"
      );
    }
    // check if the book is ready to print
    if (order.book.status !== BookStatus.READY_FOR_PRINTING) {
      logger.error(
        { orderId, bookStatus: order.book.status },
        "Book not ready to print"
      );
      return createErrorResult("Book not ready to print");
    }

    // 3. Check if order has required shipping info
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

    // 4. Create shipping address object from order
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

    // Calculate accurate costs using our existing function - this should happen BEFORE creating the PrintJob
    const costResult = await calculatePrintJobCost(
      shippingAddress,
      order.quantity,
      order.book.pageCount,
      order.shippingLevel
    );

    // Create print job data including cost information if available from the order
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

    // Use the pre-calculated costs if available
    if (costResult.success) {
      logger.info("Using pre-calculated costs for print job");

      // Set shipping costs
      if (costResult.data.shipping_cost) {
        if (costResult.data.shipping_cost.total_cost_excl_tax) {
          printJobData.shippingCostExclTax = new Prisma.Decimal(
            costResult.data.shipping_cost.total_cost_excl_tax
          );
        }

        if (costResult.data.shipping_cost.total_cost_incl_tax) {
          printJobData.shippingCostInclTax = new Prisma.Decimal(
            costResult.data.shipping_cost.total_cost_incl_tax
          );
        }
      }

      // Extract printing costs from line_item_costs and fees
      if (
        costResult.data.line_item_costs &&
        costResult.data.line_item_costs.length > 0
      ) {
        // Sum up all line items for the total book printing cost
        let totalPrintingCostExclTax = 0;
        let totalPrintingCostInclTax = 0;

        for (const lineItem of costResult.data.line_item_costs) {
          if (lineItem.total_cost_excl_tax) {
            totalPrintingCostExclTax += parseFloat(
              lineItem.total_cost_excl_tax
            );
          }

          if (lineItem.total_cost_incl_tax) {
            totalPrintingCostInclTax += parseFloat(
              lineItem.total_cost_incl_tax
            );
          }
        }

        // Store the summed line item costs as the printing cost
        printJobData.printingCostExclTax = new Prisma.Decimal(
          totalPrintingCostExclTax.toString()
        );
        printJobData.printingCostInclTax = new Prisma.Decimal(
          totalPrintingCostInclTax.toString()
        );

        logger.info(
          `Extracted printing costs from line items - Excl Tax: ${totalPrintingCostExclTax}, Incl Tax: ${totalPrintingCostInclTax}`
        );
      }

      // Check if we need to include fees in the printing cost
      // These are usually handling fees and fulfillment fees
      let totalFeesExclTax = 0;
      let totalFeesInclTax = 0;

      if (costResult.data.fees && costResult.data.fees.length > 0) {
        for (const fee of costResult.data.fees) {
          if (fee.total_cost_excl_tax) {
            totalFeesExclTax += parseFloat(fee.total_cost_excl_tax);
          }

          if (fee.total_cost_incl_tax) {
            totalFeesInclTax += parseFloat(fee.total_cost_incl_tax);
          }
        }

        logger.info(
          `Extracted fees - Excl Tax: ${totalFeesExclTax}, Incl Tax: ${totalFeesInclTax}`
        );

        // Add fees to the printing cost if we have them
        if (printJobData.printingCostExclTax && totalFeesExclTax > 0) {
          const newPrintingCostExclTax =
            parseFloat(printJobData.printingCostExclTax.toString()) +
            totalFeesExclTax;
          printJobData.printingCostExclTax = new Prisma.Decimal(
            newPrintingCostExclTax.toString()
          );
        }

        if (printJobData.printingCostInclTax && totalFeesInclTax > 0) {
          const newPrintingCostInclTax =
            parseFloat(printJobData.printingCostInclTax.toString()) +
            totalFeesInclTax;
          printJobData.printingCostInclTax = new Prisma.Decimal(
            newPrintingCostInclTax.toString()
          );
        }

        logger.info(
          `Printing costs with fees - Excl Tax: ${printJobData.printingCostExclTax}, Incl Tax: ${printJobData.printingCostInclTax}`
        );
      }

      // Check if we're still missing printing costs (unlikely, but just in case)
      if (
        !printJobData.printingCostExclTax ||
        !printJobData.printingCostInclTax
      ) {
        // Fall back to calculating printing cost from total - shipping
        if (
          costResult.data.total_cost_excl_tax &&
          printJobData.shippingCostExclTax
        ) {
          const totalCostExclTax = parseFloat(
            costResult.data.total_cost_excl_tax
          );
          const shippingCostExclTax = parseFloat(
            printJobData.shippingCostExclTax.toString()
          );
          const derivedPrintingCost = totalCostExclTax - shippingCostExclTax;

          printJobData.printingCostExclTax = new Prisma.Decimal(
            derivedPrintingCost.toString()
          );
          logger.info(
            `Derived printing cost (excl tax): ${derivedPrintingCost}`
          );
        }

        if (
          costResult.data.total_cost_incl_tax &&
          printJobData.shippingCostInclTax
        ) {
          const totalCostInclTax = parseFloat(
            costResult.data.total_cost_incl_tax
          );
          const shippingCostInclTax = parseFloat(
            printJobData.shippingCostInclTax.toString()
          );
          const derivedPrintingCostInclTax =
            totalCostInclTax - shippingCostInclTax;

          printJobData.printingCostInclTax = new Prisma.Decimal(
            derivedPrintingCostInclTax.toString()
          );
          logger.info(
            `Derived printing cost (incl tax): ${derivedPrintingCostInclTax}`
          );
        }
      }

      // Set total costs
      if (costResult.data.total_cost_excl_tax) {
        printJobData.totalCostExclTax = new Prisma.Decimal(
          costResult.data.total_cost_excl_tax
        );
      }

      if (costResult.data.total_cost_incl_tax) {
        printJobData.totalCostInclTax = new Prisma.Decimal(
          costResult.data.total_cost_incl_tax
        );
      }

      if (costResult.data.total_tax) {
        printJobData.totalTax = new Prisma.Decimal(costResult.data.total_tax);
      }

      // Validate that our costs make sense
      if (
        costResult.data.total_cost_excl_tax &&
        printJobData.printingCostExclTax &&
        printJobData.shippingCostExclTax
      ) {
        const totalCost = parseFloat(costResult.data.total_cost_excl_tax);
        const printingCost = parseFloat(
          printJobData.printingCostExclTax.toString()
        );
        const shippingCost = parseFloat(
          printJobData.shippingCostExclTax.toString()
        );

        const calculatedTotal = printingCost + shippingCost;
        const difference = Math.abs(totalCost - calculatedTotal);

        // If the difference is more than 1% of the total, log a warning
        if (difference > totalCost * 0.01) {
          logger.warn(
            `Cost discrepancy: API total cost (${totalCost}) differs from calculated total (${calculatedTotal}) by ${difference}`
          );
        } else {
          logger.info(
            `Cost validation: Printing (${printingCost}) + Shipping (${shippingCost}) ≈ Total (${totalCost})`
          );
        }
      }
    } else {
      // Fallback to order costs if pre-calculation fails
      logger.info("Using order costs as fallback (pre-calculation failed)");

      // If order has shipping cost, store it
      if (order.shippingCost) {
        printJobData.shippingCostInclTax = order.shippingCost;
      }

      // If order has printing cost, store it
      if (order.printingCost) {
        printJobData.printingCostInclTax = order.printingCost;
      }
    }

    // 5. Create a new PrintJob record to track the process
    const printJob = await prisma.printJob.create({
      data: printJobData,
    });

    // Update the book with the print job ID
    await prisma.book.update({
      where: { id: order.book.id },
      data: {
        printJobId: printJob.id,
      },
    });

    // Update the order with the print job ID
    await prisma.order.update({
      where: { id: order.id },
      data: {
        printJobId: printJob.id,
      },
    });

    // 6. Use print service to prepare book for printing
    // First, generate PDFs and upload to S3
    const prepareResult = await prepareBookForPrinting(order.book);

    if (!prepareResult.success) {
      // Update the print job record with error information
      await prisma.printJob.update({
        where: { id: printJob.id },
        data: {
          errorMessage: prepareResult.message,
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

    // Update the print job with PDF URLs and S3 keys
    await prisma.printJob.update({
      where: { id: printJob.id },
      data: {
        interiorPdfUrl: prepareResult.interiorUrl,
        coverPdfUrl: prepareResult.coverUrl,
        // Extract S3 keys from URLs if needed
        interiorS3Key: prepareResult.interiorUrl?.split("/").pop(),
        coverS3Key: prepareResult.coverUrl?.split("/").pop(),
      },
    });

    // 7. Validate PDFs with Lulu
    const validationResult = await validateBookPdfs(
      prepareResult.interiorUrl!,
      prepareResult.coverUrl!,
      prepareResult.pageCount!
    );

    // Update print job with validation results
    if (!validationResult.success || !validationResult.isValid) {
      const errors =
        validationResult.errors?.join(", ") || "Unknown validation error";

      // Update the print job record with validation failure
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

    // Update print job with successful validation
    await prisma.printJob.update({
      where: { id: printJob.id },
      data: {
        interiorValidationId: validationResult.validationId,
        coverValidationId: validationResult.validationId,
        interiorValidationStatus: FileValidationStatus.NORMALIZED,
        coverValidationStatus: FileValidationStatus.NORMALIZED,
        statusMessage: "PDF validation successful",
      },
    });

    // 8. Create print job with Lulu

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
    // Create a request object for the print job
    const printJobRequest: CreatePrintJobRequest = {
      contact_email:
        config.LULU[
          process.env.NODE_ENV === "production" ? "PRODUCTION" : "SANDBOX"
        ].CONTACT_EMAIL,
      external_id: order.id,
      line_items: [printItem],
      production_delay: PRODUCTION_DELAYED, // production delay in minutes - 2 hours by default
      shipping_address: shippingAddress,
      shipping_level: order.shippingLevel,
    };
    try {
      // Create the print job with Lulu
      const printJobResponse = await luluPrintingService.createPrintJob(
        printJobRequest
      );

      // Prepare data for updating the print job
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

      // 9. Update the print job record
      await prisma.printJob.update({
        where: { id: printJob.id },
        data: updateData,
      });

      // Update order status
      await prisma.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.PRINTING,
          printJobId: printJob.id,
        },
      });

      logger.info(
        {
          orderId,
          printJobId: printJobResponse.id,
          estimatedArrival:
            printJobResponse.estimated_shipping_dates?.arrival_max,
        },
        "Successfully prepared book for printing"
      );

      revalidatePath("/admin/orders");
      revalidatePath(`/admin/orders/${orderId}`);
      revalidatePath("/admin/print-jobs");

      return createSuccessResult({
        printJobId: printJobResponse.id || null,
      });
    } catch (error) {
      // Update the print job record with error
      await prisma.printJob.update({
        where: { id: printJob.id },
        data: {
          errorMessage:
            error instanceof Error ? error.message : "Unknown error",
          statusMessage: `Failed to create print job: ${
            error instanceof Error ? error.message : "Unknown error"
          }`,
        },
      });

      logger.error({ orderId, error }, "Failed to create print job with Lulu");
      return createErrorResult(
        `Failed to create print job: ${
          error instanceof Error ? error.message : "Unknown error"
        }`
      );
    }
  } catch (error) {
    logger.error({ error, orderId }, "Error preparing book for printing");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
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
 * Refresh a print job's status and cost information from Lulu
 * This gets the latest information from Lulu and updates our database
 */
export async function refreshPrintJobStatus(
  printJobId: string
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    logger.info(`Refreshing print job status for ID: ${printJobId}`);

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

    // 2. Get the latest status from Lulu
    const luluPrintJob = await luluPrintingService.getPrintJob(
      printJob.luluPrintJobId
    );

    // 3. Prepare data for updating the print job
    const updateData: Prisma.PrintJobUpdateInput = {
      status: mapLuluStatusToPrintJobStatus(luluPrintJob.status.name),
      statusMessage: luluPrintJob.status.message || "Status updated",
    };

    // Add tracking and shipping information if available
    if ("tracking_id" in luluPrintJob && luluPrintJob.tracking_id) {
      updateData.trackingNumber = luluPrintJob.tracking_id;
    }

    if ("tracking_urls" in luluPrintJob && luluPrintJob.tracking_urls) {
      updateData.trackingUrls = luluPrintJob.tracking_urls;
    }

    if ("shipping_carrier" in luluPrintJob && luluPrintJob.shipping_carrier) {
      updateData.shippingCarrier = luluPrintJob.shipping_carrier;
    }

    // Add cost information if available
    if (luluPrintJob.costs) {
      // Currency
      if ("currency" in luluPrintJob.costs) {
        updateData.currency = luluPrintJob.costs.currency;
      }

      // Shipping costs
      if (luluPrintJob.costs.shipping_cost) {
        updateData.shippingCostExclTax = new Prisma.Decimal(
          luluPrintJob.costs.shipping_cost.total_cost_excl_tax
        );
        updateData.shippingCostInclTax = new Prisma.Decimal(
          luluPrintJob.costs.shipping_cost.total_cost_incl_tax
        );
      }

      // Line item costs (printing costs)
      if (
        luluPrintJob.costs.line_item_costs &&
        luluPrintJob.costs.line_item_costs.length > 0
      ) {
        const firstItem = luluPrintJob.costs.line_item_costs[0];
        updateData.printingCostExclTax = new Prisma.Decimal(
          firstItem.total_cost_excl_tax
        );
        updateData.printingCostInclTax = new Prisma.Decimal(
          firstItem.total_cost_incl_tax
        );
      }

      // Total costs
      if (luluPrintJob.costs.total_cost_excl_tax) {
        updateData.totalCostExclTax = new Prisma.Decimal(
          luluPrintJob.costs.total_cost_excl_tax
        );
      }

      if (luluPrintJob.costs.total_cost_incl_tax) {
        updateData.totalCostInclTax = new Prisma.Decimal(
          luluPrintJob.costs.total_cost_incl_tax
        );
      }

      if (luluPrintJob.costs.total_tax) {
        updateData.totalTax = new Prisma.Decimal(luluPrintJob.costs.total_tax);
      }
    }

    // Update timestamps based on status changes
    const newStatus = mapLuluStatusToPrintJobStatus(luluPrintJob.status.name);
    const statusChanged = newStatus !== printJob.status;

    if (
      newStatus === PrintJobStatus.IN_PRODUCTION &&
      !printJob.inProductionAt
    ) {
      updateData.inProductionAt = new Date();
    }

    if (newStatus === PrintJobStatus.SHIPPED && !printJob.shippedAt) {
      updateData.shippedAt = new Date();
    }

    // 4. Update our local record with the latest information
    await prisma.printJob.update({
      where: { id: printJobId },
      data: updateData,
    });

    // 5. Update related order status if print job status changed
    if (statusChanged && printJob.order) {
      // Map print job status to order status
      let orderStatus = printJob.order.status;

      if (newStatus === PrintJobStatus.SHIPPED) {
        orderStatus = OrderStatus.SHIPPED;
      } else if (newStatus === PrintJobStatus.IN_PRODUCTION) {
        orderStatus = OrderStatus.PRINTING;
      } else if (newStatus === PrintJobStatus.CANCELED) {
        orderStatus = OrderStatus.CANCELLED;
      }

      // Only update if status actually changed
      if (orderStatus !== printJob.order.status) {
        await prisma.order.update({
          where: { id: printJob.order.id },
          data: {
            status: orderStatus,
          },
        });

        // Revalidate order path
        revalidatePath(`/admin/orders/${printJob.order.id}`);
      }
    }

    // Revalidate admin paths
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);
    revalidatePath("/admin/orders");

    logger.info(`Print job ${printJobId} status refreshed successfully`);

    return createSuccessResult({
      updated: true,
    });
  } catch (error) {
    logger.error(`Error refreshing print job status: ${error}`);
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
