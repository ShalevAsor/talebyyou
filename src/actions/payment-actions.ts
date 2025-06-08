// "use server";

// import prisma from "@/lib/prisma";
// import { logger } from "@/lib/logger";
// import {
//   ActionResult,
//   createSuccessResult,
//   createErrorResult,
// } from "@/types/actions";
// import { OrderStatus, ProductType } from "@prisma/client";
// import { paypal } from "@/services/payment/paypal-service";
// import { revalidatePath } from "next/cache";
// import { generateRemainingPageImages } from "./image-actions";
// import { sendOrderConfirmationEmail } from "./email-actions";

// /**
//  * Create a PayPal order for a given order in our system
//  */
// export async function createPayPalOrder(orderId: string): Promise<string> {
//   try {
//     logger.info({ orderId }, "Creating PayPal order");

//     // Get the order with book details
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//     });

//     if (!order) {
//       logger.error({ orderId }, "Order not found when creating PayPal order");
//       throw new Error("Order not found");
//     }
//     // Ensure order is in PENDING status
//     if (order.status !== OrderStatus.PENDING) {
//       logger.error(
//         { orderId, status: order.status },
//         "Cannot create PayPal order for non-PENDING order"
//       );
//       throw new Error("Order is not in PENDING status");
//     }
//     // const paypalOrder = await paypal.createOrder(Number(order.totalPrice));
//     const paypalOrder = await paypal.createOrder(Number(2.69));

//     // Save the PayPal order ID to our order
//     await prisma.order.update({
//       where: { id: orderId },
//       data: {
//         paymentId: paypalOrder.id,
//       },
//     });
//     logger.info(
//       { orderId, paypalOrderId: paypalOrder.id },
//       "PayPal order created successfully"
//     );
//     return paypalOrder.id;
//   } catch (error) {
//     logger.error({ error, orderId }, "Error creating PayPal order");
//     throw new Error(
//       error instanceof Error ? error.message : "Unknown error occurred"
//     );
//   }
// }

// /**
//  * Capture a PayPal payment for an order
//  */

// export async function capturePayPalOrder(
//   orderId: string,
//   paypalOrderId: string
// ): Promise<string> {
//   try {
//     logger.info({ orderId, paypalOrderId }, "Capturing PayPal payment");

//     // Verify the order exists and has the correct PayPal order ID
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//     });

//     if (!order) {
//       logger.error({ orderId }, "Order not found when capturing payment");
//       throw new Error("Order not found");
//     }
//     const captureData = await paypal.createPayment(paypalOrderId);

//     if (!captureData) {
//       logger.error({ paypalOrderId }, "No capture data returned from PayPal");
//       throw new Error("Failed to capture payment - no data returned");
//     }

//     if (captureData.status !== "COMPLETED") {
//       logger.error({ status: captureData.status }, "Payment not completed");
//       throw new Error(`Payment not completed. Status: ${captureData.status}`);
//     }

//     if (
//       order.paymentId !== paypalOrderId ||
//       order.paymentId !== captureData.id
//     ) {
//       logger.error(
//         {
//           orderPaymentId: order.paymentId,
//           paypalOrderId,
//         },
//         "PayPal order ID mismatch"
//       );
//       throw new Error("Order ID mismatch");
//     }
//     // Extract
//     const pricePaid = Number(
//       captureData.purchase_units[0]?.payments.captures[0]?.amount?.value
//     );
//     const payerEmail = captureData.payer.email_address;
//     const transactionId =
//       captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
//       captureData.id;

//     const processResult = await processPayment(
//       order.id,
//       payerEmail,
//       pricePaid,
//       transactionId
//     );
//     if (!processResult.success) {
//       logger.error(
//         { orderId, error: processResult.error },
//         "Payment processing failed after successful capture"
//       );
//       throw new Error(processResult.error);
//     }
//     return processResult.message || "Your order has been paid";
//   } catch (error) {
//     logger.error(
//       { error, orderId, paypalOrderId },
//       "Error capturing PayPal payment"
//     );

//     throw new Error(
//       error instanceof Error ? error.message : "Unknown error occurred"
//     );
//   }
// }

// /**
//  * Process payment after successful PayPal capture
//  * This handles all post-payment processing like updating order status,
//  * updating book status, and generating images
//  */
// export async function processPayment(
//   orderId: string,
//   payerEmail: string,
//   pricePaid: number,
//   transactionId: string
// ): Promise<ActionResult<{ orderId: string }>> {
//   try {
//     logger.info({ orderId }, "Processing payment");

//     // Get the order
//     const order = await prisma.order.findUnique({
//       where: { id: orderId },
//       include: {
//         user: true,
//       },
//     });

//     if (!order) {
//       logger.error({ orderId }, "Order not found when processing payment");
//       return createErrorResult("Order not found");
//     }
//     // 1. Update order status to PAID
//     logger.info({ orderId }, "Updating order to PAID status");
//     await prisma.order.update({
//       where: { id: orderId },
//       data: {
//         status: OrderStatus.PAID,
//         payerEmail,
//         pricePaid,
//         transactionId,
//         paidAt: new Date(),
//       },
//     });

//     // 2. Update book status to ORDERED
//     logger.info({ bookId: order.bookId }, "Updating book status to ORDERED");
//     const updatedBook = await prisma.book.update({
//       where: { id: order.bookId },
//       data: {
//         status: "ORDERED",
//       },
//     });

//     // 3. Generate remaining page images after successful payment
//     try {
//       logger.info(
//         { bookId: order.bookId },
//         "Starting image generation for remaining pages"
//       );

//       const generationResult = await generateRemainingPageImages(order.bookId);

//       if (generationResult.success) {
//         logger.info(
//           {
//             bookId: order.bookId,
//             generationCount: generationResult.data.length,
//           },
//           "Successfully initiated image generation for remaining pages"
//         );
//       } else {
//         logger.warn(
//           { bookId: order.bookId, error: generationResult.error },
//           "Image generation initiated but encountered errors"
//         );
//       }
//     } catch (imageError) {
//       // We don't want image generation errors to break the payment flow
//       // Just log them and continue
//       logger.error(
//         { error: imageError, bookId: order.bookId },
//         "Error generating remaining page images after payment"
//       );
//     }

//     // 4. Send confirmation email to customer
//     try {
//       const userEmail = order.user?.email || order.customerEmail;
//       await sendOrderConfirmationEmail(
//         userEmail,
//         order.orderNumber,
//         order.productType,
//         updatedBook.title,
//         order.pricePaid || order.totalPrice.toNumber(),
//         order.name || "Customer",
//         order.productType === ProductType.BOOK ? order.quantity : undefined
//       );
//     } catch (emailError) {
//       logger.error(
//         { error: emailError, orderId: order.id },
//         "Error sending confirmation email"
//       );
//       // Don't fail the process if email sending fails
//     }

//     // 5. Refresh UI data
//     revalidatePath(`/my-books`);
//     revalidatePath(`/library/preview/${order.bookId}`);

//     return createSuccessResult({ orderId }, "Payment processed successfully");
//   } catch (error) {
//     logger.error({ error, orderId }, "Error processing payment");

//     return createErrorResult(
//       error instanceof Error
//         ? error.message
//         : "Unknown error processing payment"
//     );
//   }
// }
"use server";

import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { OrderStatus, ProductType } from "@prisma/client";
import { paypal } from "@/services/payment/paypal-service";
import { revalidatePath } from "next/cache";
import { generateRemainingPageImages } from "./image-actions";
import { sendOrderConfirmationEmail } from "./email-actions";

/**
 * Create a PayPal order for a given order in our system
 */
export async function createPayPalOrder(orderId: string): Promise<string> {
  try {
    logger.info({ orderId }, "Creating PayPal order");

    // Get the order with book details
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        book: true,
      },
    });

    if (!order) {
      logger.error({ orderId }, "Order not found when creating PayPal order");
      throw new Error("Order not found");
    }
    // Ensure order is in PENDING status
    if (order.status !== OrderStatus.PENDING) {
      logger.error(
        { orderId, status: order.status },
        "Cannot create PayPal order for non-PENDING order"
      );
      throw new Error("Order is not in PENDING status");
    }
    // const paypalOrder = await paypal.createOrder(Number(order.totalPrice));
    const paypalOrder = await paypal.createOrder({
      price: Number(2.69),
      orderNumber: order.orderNumber,
      bookTitle: order.book.title,
      productType: order.productType,
      quantity: order.quantity,
    });

    // Save the PayPal order ID to our order
    await prisma.order.update({
      where: { id: orderId },
      data: {
        paymentId: paypalOrder.id,
      },
    });
    logger.info(
      { orderId, paypalOrderId: paypalOrder.id },
      "PayPal order created successfully"
    );
    return paypalOrder.id;
  } catch (error) {
    logger.error({ error, orderId }, "Error creating PayPal order");
    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Capture a PayPal payment for an order
 */

export async function capturePayPalOrder(
  orderId: string,
  paypalOrderId: string
): Promise<string> {
  try {
    logger.info({ orderId, paypalOrderId }, "Capturing PayPal payment");

    // Verify the order exists and has the correct PayPal order ID
    const order = await prisma.order.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      logger.error({ orderId }, "Order not found when capturing payment");
      throw new Error("Order not found");
    }
    const captureData = await paypal.createPayment(paypalOrderId);

    if (!captureData) {
      logger.error({ paypalOrderId }, "No capture data returned from PayPal");
      throw new Error("Failed to capture payment - no data returned");
    }

    if (captureData.status !== "COMPLETED") {
      logger.error({ status: captureData.status }, "Payment not completed");
      throw new Error(`Payment not completed. Status: ${captureData.status}`);
    }

    if (
      order.paymentId !== paypalOrderId ||
      order.paymentId !== captureData.id
    ) {
      logger.error(
        {
          orderPaymentId: order.paymentId,
          paypalOrderId,
        },
        "PayPal order ID mismatch"
      );
      throw new Error("Order ID mismatch");
    }
    // Extract
    const pricePaid = Number(
      captureData.purchase_units[0]?.payments.captures[0]?.amount?.value
    );
    const payerEmail = captureData.payer.email_address;
    const transactionId =
      captureData.purchase_units?.[0]?.payments?.captures?.[0]?.id ||
      captureData.id;

    const processResult = await processPayment(
      order.id,
      payerEmail,
      pricePaid,
      transactionId
    );
    if (!processResult.success) {
      logger.error(
        { orderId, error: processResult.error },
        "Payment processing failed after successful capture"
      );
      throw new Error(processResult.error);
    }
    return processResult.message || "Your order has been paid";
  } catch (error) {
    logger.error(
      { error, orderId, paypalOrderId },
      "Error capturing PayPal payment"
    );

    throw new Error(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Process payment after successful PayPal capture
 * This handles all post-payment processing like updating order status,
 * updating book status, and generating images
 */
export async function processPayment(
  orderId: string,
  payerEmail: string,
  pricePaid: number,
  transactionId: string
): Promise<ActionResult<{ orderId: string }>> {
  try {
    logger.info({ orderId }, "Processing payment");

    // Get the order
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        user: true,
      },
    });

    if (!order) {
      logger.error({ orderId }, "Order not found when processing payment");
      return createErrorResult("Order not found");
    }
    // 1. Update order status to PAID
    logger.info({ orderId }, "Updating order to PAID status");
    await prisma.order.update({
      where: { id: orderId },
      data: {
        status: OrderStatus.PAID,
        payerEmail,
        pricePaid,
        transactionId,
        paidAt: new Date(),
      },
    });

    // 2. Update book status to ORDERED
    logger.info({ bookId: order.bookId }, "Updating book status to ORDERED");
    const updatedBook = await prisma.book.update({
      where: { id: order.bookId },
      data: {
        status: "ORDERED",
      },
    });

    // 3. Generate remaining page images after successful payment
    try {
      logger.info(
        { bookId: order.bookId },
        "Starting image generation for remaining pages"
      );

      const generationResult = await generateRemainingPageImages(order.bookId);

      if (generationResult.success) {
        logger.info(
          {
            bookId: order.bookId,
            generationCount: generationResult.data.length,
          },
          "Successfully initiated image generation for remaining pages"
        );
      } else {
        logger.warn(
          { bookId: order.bookId, error: generationResult.error },
          "Image generation initiated but encountered errors"
        );
      }
    } catch (imageError) {
      // We don't want image generation errors to break the payment flow
      // Just log them and continue
      logger.error(
        { error: imageError, bookId: order.bookId },
        "Error generating remaining page images after payment"
      );
    }

    // 4. Send confirmation email to customer
    try {
      const userEmail = order.user?.email || order.customerEmail;
      await sendOrderConfirmationEmail(
        userEmail,
        order.orderNumber,
        order.productType,
        updatedBook.title,
        order.pricePaid || order.totalPrice.toNumber(),
        order.name || "Customer",
        order.productType === ProductType.BOOK ? order.quantity : undefined
      );
    } catch (emailError) {
      logger.error(
        { error: emailError, orderId: order.id },
        "Error sending confirmation email"
      );
      // Don't fail the process if email sending fails
    }

    // 5. Refresh UI data
    revalidatePath(`/my-books`);
    revalidatePath(`/library/preview/${order.bookId}`);

    return createSuccessResult({ orderId }, "Payment processed successfully");
  } catch (error) {
    logger.error({ error, orderId }, "Error processing payment");

    return createErrorResult(
      error instanceof Error
        ? error.message
        : "Unknown error processing payment"
    );
  }
}
