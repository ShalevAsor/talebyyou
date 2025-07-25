// src/actions/webhook-actions.ts
"use server";

import { OrderStatus, PrintJobStatus, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { logger } from "@/lib/logger";
import prisma from "@/lib/prisma";
import {
  ActionResult,
  createErrorResult,
  createSuccessResult,
} from "@/types/actions";
import { PrintJobStatusChangedPayload } from "@/types/print";

import { sendShippingConfirmationEmail } from "./email-actions";

/**
 * Process a webhook notification from Lulu about print job status changes
 *
 * @param payload The webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function processWebhook(
  payload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ processed: boolean }>> {
  try {
    // Extract key information from the payload
    const luluPrintJobId = payload.data.id;
    const luluStatus = payload.data.status.name;
    const statusChanged = payload.data.status.changed;
    const externalId = payload.data.external_id; // Our order ID

    logger.info(
      `Processing webhook for Lulu print job ID: ${luluPrintJobId}, status: ${luluStatus}`
    );

    // Find our print job by Lulu's print job ID
    const printJob = await prisma.printJob.findFirst({
      where: { luluPrintJobId: luluPrintJobId },
    });

    if (!printJob) {
      logger.warn(
        `Could not find print job with Lulu ID: ${luluPrintJobId}. Order ID: ${externalId}`
      );
      // Return success even if we don't find it - we don't want Lulu to retry
      return createSuccessResult({ processed: false });
    }

    logger.info(
      `Found matching print job: ${printJob.id}, current status: ${printJob.status}`
    );

    // Check if this is a duplicate/older status update we already processed
    const webhookTime = new Date(statusChanged);
    if (printJob.updatedAt > webhookTime) {
      logger.info(
        `Ignoring webhook with older timestamp: ${statusChanged}, our last update: ${printJob.updatedAt}`
      );
      return createSuccessResult({ processed: false });
    }

    // Process based on status
    switch (luluStatus) {
      case "CREATED":
        logger.info(`Processing CREATED status for print job: ${printJob.id}`);
        // This is the initial status, we already set this
        break;

      case "UNPAID":
        logger.info(`Processing UNPAID status for print job: ${printJob.id}`);

        const unpaidResult = await handlePrintJobUnpaidStatus(
          printJob.id,
          payload
        );

        if (!unpaidResult.success) {
          logger.error(
            `Failed to process UNPAID status: ${unpaidResult.error}`
          );
        }
        break;

      case "PAYMENT_IN_PROGRESS":
        logger.info(
          `Processing PAYMENT_IN_PROGRESS status for print job: ${printJob.id}`
        );
        const paymentInProgressResult =
          await handlePrintJobPaymentInProgressStatus(printJob.id, payload);
        if (!paymentInProgressResult.success) {
          logger.error(
            `Failed to process PAYMENT_IN_PROGRESS status: ${paymentInProgressResult.error}`
          );
        }
        break;

      case "PRODUCTION_DELAYED":
        logger.info(
          `Processing PRODUCTION_DELAYED status for print job: ${printJob.id}`
        );
        const productionDelayedResult =
          await handlePrintJobProductionDelayedStatus(printJob.id, payload);
        if (!productionDelayedResult.success) {
          logger.error(
            `Failed to process PRODUCTION_DELAYED status: ${productionDelayedResult.error}`
          );
        }
        break;

      case "PRODUCTION_READY":
        logger.info(
          `Processing PRODUCTION_READY status for print job: ${printJob.id}`
        );
        // Print job is ready to go to production
        const productionReadyResult = await handlePrintJobProductionReadyStatus(
          printJob.id,
          payload
        );
        if (!productionReadyResult.success) {
          logger.error(
            `Failed to process PRODUCTION_READY status: ${productionReadyResult.error}`
          );
        }
        break;

      case "IN_PRODUCTION":
        logger.info(
          `Processing IN_PRODUCTION status for print job: ${printJob.id}`
        );
        const inProductionResult = await handlePrintJobInProductionStatus(
          printJob.id,
          payload
        );
        if (!inProductionResult.success) {
          logger.error(
            `Failed to process IN_PRODUCTION status: ${inProductionResult.error}`
          );
        }
        break;

      case "SHIPPED":
        logger.info(`Processing SHIPPED status for print job: ${printJob.id}`);

        const shippedResult = await handlePrintJobShippedStatus(
          printJob.id,
          payload
        );
        if (!shippedResult.success) {
          logger.error(
            `Failed to process SHIPPED status: ${shippedResult.error}`
          );
        }
        break;

      case "REJECTED":
        logger.info(`Processing REJECTED status for print job: ${printJob.id}`);
        const rejectedResult = await handlePrintJobRejectedStatus(
          printJob.id,
          payload
        );
        if (!rejectedResult.success) {
          logger.error(
            `Failed to process REJECTED status: ${rejectedResult.error}`
          );
        }
        break;

      case "CANCELED":
        logger.info(`Processing CANCELED status for print job: ${printJob.id}`);
        const canceledResult = await handlePrintJobCanceledStatus(
          printJob.id,
          payload
        );
        if (!canceledResult.success) {
          logger.error(
            `Failed to process CANCELED status: ${canceledResult.error}`
          );
        }
        break;

      default:
        logger.warn(`Unknown Lulu status received: ${luluStatus}`);
        // Basic status update for unknown statuses
        try {
          // Update the print job with the unknown status
          await prisma.printJob.update({
            where: { id: printJob.id },
            data: {
              // Store the raw status name from Lulu
              statusMessage: `Received unknown status from Lulu: ${luluStatus} - ${
                payload.data.status.message || "No additional information"
              }`,
            },
          });

          logger.info(
            `Updated print job ${printJob.id} with unknown status: ${luluStatus}`
          );

          // Revalidate admin pages to show the status change
          revalidatePath("/admin/print-jobs");
          revalidatePath(`/admin/print-jobs/${printJob.id}`);
        } catch (updateError) {
          logger.error(
            `Failed to update print job with unknown status: ${updateError}`
          );
        }
    }

    logger.info(`Successfully processed webhook for print job: ${printJob.id}`);
    return createSuccessResult({ processed: true });
  } catch (error) {
    logger.error("Error processing webhook:", error);

    // Always return success to Lulu even on errors
    // We don't want them to retry - we'll handle issues internally
    return createSuccessResult({
      processed: false,
      // Include this in the result for our internal tracking
      error: error instanceof Error ? error.message : String(error),
    });
  }
}

/**
 * Handle a print job transitioning to UNPAID status
 * This happens when the print job is created and validated by Lulu
 * and is ready to be paid
 * Update the print job status to UNPAID
 * Update the print job cost and currency
 * Update order with lulu order id
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobUnpaidStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;
    // extract order id
    const orderId = webhookPayload.data.external_id;

    logger.info(
      `Handling UNPAID status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for UNPAID status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // get cost data - use correct property names
    const lineItemCost = webhookPayload.data.costs?.line_item_costs[0];
    const shippingCost = webhookPayload.data.costs?.shipping_cost; // Fixed property name
    const totalCostExclTax = webhookPayload.data.costs?.total_cost_excl_tax;
    const totalCostInclTax = webhookPayload.data.costs?.total_cost_incl_tax;
    const totalTax = webhookPayload.data.costs?.total_tax;

    // get lulu order id
    const luluOrderId = webhookPayload.data.order_id;

    // Use transaction to ensure both updates succeed or fail together
    await prisma.$transaction(async (tx) => {
      // Update the print job status in our database
      await tx.printJob.update({
        where: { id: printJobId },
        data: {
          status: PrintJobStatus.UNPAID,
          currency: webhookPayload.data.costs?.currency || "USD",
          printingCostExclTax: lineItemCost?.total_cost_excl_tax
            ? new Prisma.Decimal(lineItemCost.total_cost_excl_tax)
            : undefined,
          printingCostInclTax: lineItemCost?.total_cost_incl_tax
            ? new Prisma.Decimal(lineItemCost.total_cost_incl_tax)
            : undefined,
          shippingCostExclTax: shippingCost?.total_cost_excl_tax
            ? new Prisma.Decimal(shippingCost.total_cost_excl_tax)
            : undefined,
          shippingCostInclTax: shippingCost?.total_cost_incl_tax
            ? new Prisma.Decimal(shippingCost.total_cost_incl_tax)
            : undefined,
          totalCostExclTax: totalCostExclTax
            ? new Prisma.Decimal(totalCostExclTax)
            : undefined,
          totalCostInclTax: totalCostInclTax
            ? new Prisma.Decimal(totalCostInclTax)
            : undefined,
          totalTax: totalTax ? new Prisma.Decimal(totalTax) : undefined,
          luluPrintJobId: webhookPayload.data.id,
          statusMessage: webhookPayload.data.status.message,
        },
      });

      // Update the order in our database with lulu order id and costs
      await tx.order.update({
        where: { id: orderId },
        data: {
          poProviderOrderId: luluOrderId,
          shippingCost: shippingCost?.total_cost_incl_tax
            ? new Prisma.Decimal(shippingCost.total_cost_incl_tax)
            : undefined,
          printingCost: lineItemCost?.total_cost_incl_tax
            ? new Prisma.Decimal(lineItemCost.total_cost_incl_tax)
            : undefined,
          fulfillmentCost: webhookPayload.data.costs?.fulfillment_cost
            ?.total_cost_incl_tax
            ? new Prisma.Decimal(
                webhookPayload.data.costs.fulfillment_cost.total_cost_incl_tax
              )
            : undefined,
        },
      });
    });

    logger.info(
      `Print job ${printJobId} updated to UNPAID status with costs and Lulu order ID ${luluOrderId}`
    );

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling UNPAID status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to PAYMENT_IN_PROGRESS status
 * This happens when Lulu is processing the payment for the print job
 * Currently not in use - Lulu does not send this status , they skip to production delayed
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobPaymentInProgressStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;

    logger.info(
      `Handling PAYMENT_IN_PROGRESS status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for PAYMENT_IN_PROGRESS status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Update the print job with the new status
    await prisma.printJob.update({
      where: { id: printJobId },
      data: {
        status: PrintJobStatus.PAYMENT_IN_PROGRESS,
        statusMessage:
          webhookPayload.data.status.message ||
          PrintJobStatus.PAYMENT_IN_PROGRESS,
      },
    });

    logger.info(
      `Print job ${printJobId} updated to PAYMENT_IN_PROGRESS status`
    );

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling PAYMENT_IN_PROGRESS status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to PRODUCTION_DELAYED status
 * This happens when the print job has been paid and is waiting for the production delay time to pass
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobProductionDelayedStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;

    logger.info(
      `Handling PRODUCTION_DELAYED status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for PRODUCTION_DELAYED status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Get data from the payload
    const paymentId = webhookPayload.data.payments?.[0];
    const estimatedShippingDates = webhookPayload.data.estimated_shipping_dates;

    // Prepare update data
    const updateData: Prisma.PrintJobUpdateInput = {
      status: PrintJobStatus.PRODUCTION_DELAYED,
      statusMessage:
        webhookPayload.data.status.message ||
        "Print job is waiting for production delay to pass",
      paidAt: new Date(), // Mark as paid since payment has completed
    };

    // Add payment ID if available
    if (paymentId) {
      updateData.paymentId = paymentId;
    }

    // Add estimated shipping dates if available
    if (estimatedShippingDates) {
      if (estimatedShippingDates.dispatch_min) {
        updateData.estimatedShipDate = new Date(
          estimatedShippingDates.dispatch_min
        );
      }

      if (estimatedShippingDates.arrival_max) {
        updateData.estimatedDeliveryDate = new Date(
          estimatedShippingDates.arrival_max
        );
      }
    }

    // Update the print job with the new status and details
    await prisma.printJob.update({
      where: { id: printJobId },
      data: updateData,
    });

    logger.info(
      `Print job ${printJobId} updated to PRODUCTION_DELAYED status with payment ID: ${
        paymentId || "not available"
      }`
    );

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling PRODUCTION_DELAYED status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to PRODUCTION_READY status
 * This happens when the production delay has ended and the print job
 * will move to "in production" shortly
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobProductionReadyStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;

    logger.info(
      `Handling PRODUCTION_READY status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for PRODUCTION_READY status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Update the print job with the new status
    await prisma.printJob.update({
      where: { id: printJobId },
      data: {
        status: PrintJobStatus.PRODUCTION_READY,
        statusMessage:
          webhookPayload.data.status.message ||
          "Print job is ready to move to production",
      },
    });

    logger.info(`Print job ${printJobId} updated to PRODUCTION_READY status`);

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling PRODUCTION_READY status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to IN_PRODUCTION status
 * This happens when the print job has been sent to the printer
 * and is actively being produced
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobInProductionStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;

    logger.info(
      `Handling IN_PRODUCTION status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for IN_PRODUCTION status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Update the print job with the new status and set inProductionAt timestamp
    await prisma.printJob.update({
      where: { id: printJobId },
      data: {
        status: PrintJobStatus.IN_PRODUCTION,
        statusMessage:
          webhookPayload.data.status.message || "Print job is in production",
        inProductionAt: new Date(), // Set the timestamp when it entered production
      },
    });

    logger.info(`Print job ${printJobId} updated to IN_PRODUCTION status`);

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling IN_PRODUCTION status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to SHIPPED status
 * This happens when the print job has been completed and shipped to the customer
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobShippedStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;
    const orderId = webhookPayload.data.external_id;

    logger.info(
      `Handling SHIPPED status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for SHIPPED status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Extract tracking information from the first line item
    const lineItem = webhookPayload.data.line_items?.[0];
    const trackingId = lineItem?.tracking_id;
    const trackingUrls = lineItem?.tracking_urls || [];
    const carrierName = lineItem?.carrier_name;

    // Get updated estimated shipping dates
    const estimatedShippingDates = webhookPayload.data.estimated_shipping_dates;

    // Use transaction to update both print job and order
    await prisma.$transaction(async (tx) => {
      // 1. Update the print job with the new status and shipping information
      await tx.printJob.update({
        where: { id: printJobId },
        data: {
          status: PrintJobStatus.SHIPPED,
          statusMessage:
            webhookPayload.data.status.message || "Print job has been shipped",
          shippedAt: new Date(),
          trackingNumber: trackingId || undefined,
          trackingUrls: trackingUrls,
          shippingCarrier: carrierName || undefined,
          // Update estimated shipping dates if available
          estimatedShipDate: estimatedShippingDates?.dispatch_min
            ? new Date(estimatedShippingDates.dispatch_min)
            : undefined,
          estimatedDeliveryDate: estimatedShippingDates?.arrival_max
            ? new Date(estimatedShippingDates.arrival_max)
            : undefined,
        },
      });

      // 2. Update the order status to SHIPPED
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.SHIPPED,
          trackingNumber: trackingId || undefined,
          fulfilledAt: new Date(),
        },
      });
    });

    // 3. Get order details for sending email
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        book: true,
        user: true,
      },
    });

    // 4. Send shipping notification email to customer
    if (order) {
      try {
        // Extract email information
        const customerEmail = order.customerEmail;
        const customerName =
          order.name || `${order.user?.firstName} ${order.user?.lastName}`;
        const orderNumber = order.orderNumber;
        const bookTitle = order.book.title;
        const trackingNumber = trackingId;
        const trackingUrl = trackingUrls ? trackingUrls[0] : "";
        const estimatedDelivery = estimatedShippingDates?.arrival_max;
        // Use your email service to send a notification
        await sendShippingConfirmationEmail(
          customerEmail,
          customerName,
          orderNumber,
          bookTitle,
          trackingNumber || "",
          trackingUrl,
          carrierName || "",
          estimatedDelivery || ""
        );

        logger.info(
          `Shipping notification email sent to ${order.customerEmail}`
        );
      } catch (emailError) {
        // Log email error but don't fail the whole process
        logger.error(
          `Failed to send shipping notification email: ${emailError}`
        );
      }
    }

    logger.info(
      `Print job ${printJobId} updated to SHIPPED status with tracking ${
        trackingId || "not available"
      }`
    );

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);

    // Also revalidate customer-facing pages
    if (order) {
      revalidatePath(`/my-books`);
      revalidatePath(`/my-books/order/${orderId}`);
    }

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling SHIPPED status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to REJECTED status
 * This happens when there's a problem with the file or input data
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobRejectedStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;
    const orderId = webhookPayload.data.external_id;

    logger.info(
      `Handling REJECTED status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for REJECTED status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Get rejection message/reason
    const rejectionMessage =
      webhookPayload.data.status.message || "Print job was rejected";

    // Use transaction to update both print job and order
    await prisma.$transaction(async (tx) => {
      // 1. Update the print job with the rejected status and error message
      await tx.printJob.update({
        where: { id: printJobId },
        data: {
          status: PrintJobStatus.REJECTED,
          statusMessage: rejectionMessage,
          errorMessage: rejectionMessage, // Store the detailed error message
        },
      });

      // 2. Update the order status to ERROR
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.ERROR,
        },
      });
    });

    logger.info(
      `Print job ${printJobId} updated to REJECTED status: ${rejectionMessage}`
    );

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling REJECTED status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Handle a print job transitioning to CANCELED status
 * This can happen when you requested cancellation or when Lulu cancels it due to a production issue
 *
 * @param printJobId The ID of our local print job record
 * @param webhookPayload The complete webhook payload from Lulu
 * @returns ActionResult indicating success or failure
 */
export async function handlePrintJobCanceledStatus(
  printJobId: string,
  webhookPayload: PrintJobStatusChangedPayload
): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const luluPrintJobId = webhookPayload.data.id;
    const orderId = webhookPayload.data.external_id;

    logger.info(
      `Handling CANCELED status for print job: ${printJobId}, Lulu ID: ${luluPrintJobId}`
    );

    // Log the complete webhook payload with full nested structure
    logger.info(
      `Complete webhook payload for CANCELED status: ${JSON.stringify(
        webhookPayload,
        null,
        2
      )}`
    );

    // Get cancellation message/reason
    const cancellationMessage =
      webhookPayload.data.status.message || "Print job was canceled";

    // Use transaction to update both print job and order
    await prisma.$transaction(async (tx) => {
      // 1. Update the print job with the canceled status
      await tx.printJob.update({
        where: { id: printJobId },
        data: {
          status: PrintJobStatus.CANCELED,
          statusMessage: cancellationMessage,
        },
      });

      // 2. Update the order status
      await tx.order.update({
        where: { id: orderId },
        data: {
          status: OrderStatus.CANCELLED,
        },
      });
    });

    logger.info(
      `Print job ${printJobId} updated to CANCELED status: ${cancellationMessage}`
    );

    // Revalidate the admin pages to show the updated status
    revalidatePath("/admin/print-jobs");
    revalidatePath(`/admin/print-jobs/${printJobId}`);
    revalidatePath("/admin/orders");
    revalidatePath(`/admin/orders/${orderId}`);

    return createSuccessResult({ updated: true });
  } catch (error) {
    logger.error(
      `Error handling CANCELED status for print job ${printJobId}:`,
      error
    );
    return createErrorResult(
      `Failed to update print job status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
