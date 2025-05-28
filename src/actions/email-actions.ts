"use server";

import { ProductType } from "@prisma/client";
import { getEmailService } from "@/services/email/email-service";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import config from "@/lib/config";

/**
 * Sends a welcome email to a new user
 * @param email The user's email address
 * @param name The user's name
 * @returns ActionResult with success/error information
 */
export async function sendWelcomeEmail(
  email: string,
  name: string
): Promise<ActionResult<null>> {
  try {
    const emailService = getEmailService();
    await emailService.sendWelcomeEmail(email, name);
    return createSuccessResult(null, `Welcome email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send welcome email:", error);
    return createErrorResult(
      "Failed to send welcome email. Please try again later."
    );
  }
}
/**
 * Sends a book completion email to a user
 * @param email The user's email address
 * @param fullName The user's full name
 * @param bookTitle The title of the completed book
 * @param productType The type of product (EBOOK or PHYSICAL)
 * @param downloadLink The download link for the ebook
 * @returns ActionResult with success/error information
 */
export async function sendBookCompletionEmail(
  email: string,
  fullName: string,
  bookTitle: string,
  productType: ProductType,
  downloadLink: string
): Promise<ActionResult<null>> {
  try {
    const emailService = getEmailService();
    await emailService.sendBookCompletionEmail(
      email,
      fullName,
      bookTitle,
      productType,
      downloadLink
    );
    return createSuccessResult(null, `Book completion email sent to ${email}`);
  } catch (error) {
    console.error("Failed to send book completion email:", error);
    return createErrorResult(
      "Failed to send book completion email. Please try again later."
    );
  }
}

/**
 * Sends a shipping confirmation email when a physical book is shipped
 * @param email The user's email address
 * @param fullName The user's full name
 * @param orderNumber The human-readable order number
 * @param bookTitle The title of the shipped book
 * @param trackingNumber The shipping tracking number
 * @param trackingUrl The URL to track the shipment
 * @param carrierName The name of the shipping carrier
 * @param estimatedDelivery The estimated delivery date
 * @returns ActionResult with success/error information
 */
export async function sendShippingConfirmationEmail(
  email: string,
  fullName: string,
  orderNumber: string,
  bookTitle: string,
  trackingNumber: string,
  trackingUrl: string,
  carrierName: string,
  estimatedDelivery: string
): Promise<ActionResult<null>> {
  try {
    const emailService = getEmailService();
    await emailService.sendShippingConfirmationEmail(
      email,
      fullName,
      orderNumber,
      bookTitle,
      trackingNumber,
      trackingUrl,
      carrierName,
      estimatedDelivery
    );
    return createSuccessResult(
      null,
      `Shipping confirmation email sent to ${email}`
    );
  } catch (error) {
    console.error("Failed to send shipping confirmation email:", error);
    return createErrorResult(
      "Failed to send shipping confirmation email. Please try again later."
    );
  }
}

/**
 * Sends an order confirmation email
 * @param email The user's email address
 * @param orderNumber The human-readable order number
 * @param productType The type of product ordered
 * @param bookTitle The title of the book
 * @param price The price of the product
 * @param fullName Recipient's full name
 * @returns ActionResult with success/error information
 */
export async function sendOrderConfirmationEmail(
  email: string,
  orderNumber: string,
  productType: ProductType,
  bookTitle: string,
  price: number,
  fullName?: string,
  quantity?: number
): Promise<ActionResult<null>> {
  try {
    const emailService = getEmailService();
    await emailService.sendOrderConfirmationEmail(
      email,
      orderNumber,
      productType,
      bookTitle,
      price,
      fullName,
      quantity
    );
    return createSuccessResult(
      null,
      `Order confirmation email sent to ${email}`
    );
  } catch (error) {
    console.error("Failed to send order confirmation email:", error);
    return createErrorResult(
      "Failed to send order confirmation email. Please try again later."
    );
  }
}

/**
 * Sends a contact form submission email
 * @param name The sender's name
 * @param email The sender's email address
 * @param category The category of the inquiry
 * @param subject The subject of the message
 * @param message The message content
 * @param orderNumber Optional order number for order-related inquiries
 * @returns ActionResult with success/error information
 */
// export async function sendContactFormEmail(
//   name: string,
//   email: string,
//   category: string,
//   subject: string,
//   message: string,
//   orderNumber?: string
// ): Promise<ActionResult<null>> {
//   try {
//     console.log("EMAIL CONFIG:", {
//       SUPPORT: config.EMAIL.SUPPORT,
//       ORDER: config.EMAIL.ORDER,
//       TEST_MODE: config.EMAIL.TEST_MODE,
//     });
//     const emailService = getEmailService();
//     await emailService.sendContactFormEmail(
//       name,
//       email,
//       category,
//       subject,
//       message,
//       orderNumber
//     );
//     return createSuccessResult(
//       null,
//       `Contact form submission received from ${email}`
//     );
//   } catch (error) {
//     console.error("Failed to send contact form email:", error);
//     return createErrorResult(
//       "Failed to process your message. Please try again later."
//     );
//   }
// }
export async function sendContactFormEmail(
  name: string,
  email: string,
  category: string,
  subject: string,
  message: string,
  orderNumber?: string
): Promise<ActionResult<null>> {
  console.log("=== CONTACT FORM ACTION DEBUG START ===");
  console.log("📧 Contact form action called with:", {
    name,
    email,
    category,
    subject,
    messageLength: message.length,
    orderNumber,
  });

  try {
    console.log("EMAIL CONFIG:", {
      SUPPORT: config.EMAIL.SUPPORT,
      ORDER: config.EMAIL.ORDER,
      INFO: config.EMAIL.INFO,
      TEST_MODE: config.EMAIL.TEST_MODE,
    });

    console.log("📧 Getting email service...");
    const emailService = getEmailService();

    console.log("📧 Calling email service method...");
    await emailService.sendContactFormEmail(
      name,
      email,
      category,
      subject,
      message,
      orderNumber
    );

    console.log("✅ Contact form email action completed successfully");
    console.log("=== CONTACT FORM ACTION DEBUG END ===");

    return createSuccessResult(
      null,
      `Contact form submission received from ${email}`
    );
  } catch (error) {
    console.log("❌ Contact form email action failed:", error);
    console.log("=== CONTACT FORM ACTION DEBUG END ===");

    console.error("Failed to send contact form email:", error);
    return createErrorResult(
      "Failed to process your message. Please try again later."
    );
  }
}
