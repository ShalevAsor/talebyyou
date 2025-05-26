"use server";

import { ProductType } from "@prisma/client";
import { getEmailService } from "@/services/email/email-service";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";

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
  fullName?: string
): Promise<ActionResult<null>> {
  try {
    const emailService = getEmailService();
    await emailService.sendOrderConfirmationEmail(
      email,
      orderNumber,
      productType,
      bookTitle,
      price,
      fullName
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
export async function sendContactFormEmail(
  name: string,
  email: string,
  category: string,
  subject: string,
  message: string,
  orderNumber?: string
): Promise<ActionResult<null>> {
  try {
    const emailService = getEmailService();
    await emailService.sendContactFormEmail(
      name,
      email,
      category,
      subject,
      message,
      orderNumber
    );
    return createSuccessResult(
      null,
      `Contact form submission received from ${email}`
    );
  } catch (error) {
    console.error("Failed to send contact form email:", error);
    return createErrorResult(
      "Failed to process your message. Please try again later."
    );
  }
}
