import { ProductType } from "@prisma/client";
import nodemailer, {
  SendMailOptions,
  SentMessageInfo,
  Transporter,
} from "nodemailer";

import config from "@/lib/config";
import { logger } from "@/lib/logger";
import { ContactCategory } from "@/schemas/contact-schema";
import { EmailType } from "@/types/email";

import {
  getBookCompletionEmailTemplate,
  getContactConfirmationTemplate,
  getContactFormEmailTemplate,
  getOrderConfirmationEmailTemplate,
  getShippingConfirmationEmailTemplate,
  getWelcomeEmailTemplate,
} from "./email-templates";

/**
 * Interface for email options
 */
interface EmailOptions {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
  emailType?: EmailType;
  cc?: string; // Add CC support
  bcc?: string; // Add BCC support
}

/**
 * Email service for sending emails to TaleByYou users
 *
 * EMAIL ROUTING SUMMARY:
 * =====================
 * sendWelcomeEmail()              → noreply@talebyyou.com  (automated)
 * sendOrderConfirmationEmail()    → orders@talebyyou.com   (order-related)
 * sendBookCompletionEmail()       → support@talebyyou.com  (can reply with questions)
 * sendShippingConfirmationEmail() → orders@talebyyou.com   (order-related)
 * sendContactFormEmail()          → DYNAMIC based on category:
 *   - order_question/billing      → orders@talebyyou.com
 *   - technical_issue/book_help   → support@talebyyou.com
 *   - partnership                 → info@talebyyou.com
 *   - general/feature/other       → support@talebyyou.com
 */
class EmailService {
  private transporter: Transporter | null = null;
  private initialized: Promise<void> | null = null;

  /**
   * Creates an instance of the EmailService
   */
  constructor() {}

  /**
   * Get the appropriate "from" email based on email type
   */
  private getFromEmail(emailType: EmailType): string {
    switch (emailType) {
      case EmailType.AUTOMATED:
        return config.EMAIL.FROM; // noreply@talebyyou.com
      case EmailType.SUPPORT:
        return config.EMAIL.SUPPORT; // support@talebyyou.com
      case EmailType.ORDER:
        return config.EMAIL.ORDER; // orders@talebyyou.com
      case EmailType.INFO:
        return config.EMAIL.INFO; // info@talebyyou.com
      default:
        return config.EMAIL.FROM; // Default to noreply
    }
  }
  /**
   * Get the appropriate "reply-to" email based on email type
   */
  private getReplyToEmail(emailType: EmailType): string {
    switch (emailType) {
      case EmailType.AUTOMATED:
        return config.EMAIL.SUPPORT; // Replies go to support
      case EmailType.SUPPORT:
        return config.EMAIL.SUPPORT; // Replies stay with support
      case EmailType.ORDER:
        return config.EMAIL.ORDER; // Order-related replies
      case EmailType.INFO:
        return config.EMAIL.INFO; // Info-related replies
      default:
        return config.EMAIL.SUPPORT; // Default to support
    }
  }

  /**
   * Map contact form category to appropriate email type
   */
  private getEmailTypeFromCategory(category: ContactCategory): EmailType {
    switch (category) {
      // Order & Billing → orders@talebyyou.com
      case "order_question":
      case "billing_question":
        return EmailType.ORDER;

      // Technical & Book Help → support@talebyyou.com
      case "technical_issue":
      case "book_creation_help":
        return EmailType.SUPPORT;

      // Business Inquiries → info@talebyyou.com
      case "partnership":
        return EmailType.INFO;

      // General Support → support@talebyyou.com
      case "general_inquiry":
      case "feature_request":
      case "other":
      default:
        return EmailType.SUPPORT;
    }
  }
  /**
   * Get or create initialization promise
   */
  private getInitializePromise(): Promise<void> {
    if (!this.initialized) {
      this.initialized = this.initialize();
    }
    return this.initialized;
  }

  /**
   * Initialize the email service
   */
  private async initialize(): Promise<void> {
    const testMode = config.EMAIL.TEST_MODE || "development";

    // Initialize the transporter based on the test mode
    switch (testMode) {
      case "development":
        await this.setupDevelopmentTransporter();
        break;
      case "gmail":
        this.setupGmailTransporter();
        break;
      case "production":
        this.setupProductionTransporter();
        break;
      default:
        await this.setupDevelopmentTransporter();
    }
  }

  /**
   * Set up email transporter for development environment
   * Uses Ethereal email for testing without sending real emails
   */
  private async setupDevelopmentTransporter(): Promise<void> {
    try {
      // Create a test account on Ethereal
      const testAccount = await nodemailer.createTestAccount();
      // Create a transporter using Ethereal credentials
      this.transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
      logger.info("📧 Development email transporter set up with Ethereal");
    } catch (error) {
      logger.error("Failed to set up development email transporter:", error);
      throw new Error("Failed to set up email service for development");
    }
  }

  /**
   * Set up Gmail transporter for testing
   */
  private setupGmailTransporter(): void {
    if (!config.EMAIL.USER || !config.EMAIL.PASSWORD) {
      throw new Error(
        "Gmail credentials not provided. Please set EMAIL_USER and EMAIL_PASSWORD."
      );
    }

    this.transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASSWORD,
      },
    });
    logger.info("📧 Gmail test mode activated");
    logger.info(`📧 Using Gmail account: ${config.EMAIL.USER}`);
  }

  /**
   * Set up email transporter for production environment
   */
  private setupProductionTransporter(): void {
    if (!config.EMAIL.HOST || !config.EMAIL.USER || !config.EMAIL.PASSWORD) {
      throw new Error(
        "Production email configuration incomplete. Please check your environment variables."
      );
    }

    this.transporter = nodemailer.createTransport({
      host: config.EMAIL.HOST,
      port: parseInt(config.EMAIL.PORT || "587"),
      secure: config.EMAIL.SECURE,
      auth: {
        user: config.EMAIL.USER,
        pass: config.EMAIL.PASSWORD,
      },
      // Add this for better debugging if needed
      logger: config.APP.NODE_ENV !== "production",
      debug: config.APP.NODE_ENV !== "production",
    });
    logger.info("📧 Production email transporter set up");
  }

  // ============================================================================
  // PUBLIC EMAIL METHODS
  // ============================================================================

  /**
   * Send a welcome email to a new TaleByYou user
   * Uses: noreply@talebyyou.com (automated)
   */
  async sendWelcomeEmail(to: string, name: string): Promise<SentMessageInfo> {
    await this.getInitializePromise();
    const html = getWelcomeEmailTemplate(name);
    return this.sendEmail({
      to,
      subject: "Welcome to TaleByYou!",
      html,
      emailType: EmailType.AUTOMATED, // 🎯 Uses noreply@talebyyou.com
    });
  }

  /**
   * Send an order confirmation email
   * Uses: orders@talebyyou.com (order-related)
   */
  async sendOrderConfirmationEmail(
    to: string,
    orderNumber: string,
    productType: ProductType,
    bookTitle: string,
    price: number,
    fullName?: string,
    quality?: number
  ): Promise<SentMessageInfo> {
    await this.getInitializePromise();
    const html = getOrderConfirmationEmailTemplate(
      orderNumber,
      productType,
      bookTitle,
      price,
      fullName,
      quality
    );
    return this.sendEmail({
      to,
      subject: `Order Confirmation #${orderNumber}`,
      html,
      emailType: EmailType.ORDER, // 🎯 Uses orders@talebyyou.com
    });
  }

  /**
   * Send a book completion email with download link
   * Uses: support@talebyyou.com (customers can reply with questions)
   */
  async sendBookCompletionEmail(
    to: string,
    fullName: string,
    bookTitle: string,
    productType: ProductType,
    downloadLink: string
  ): Promise<SentMessageInfo> {
    await this.getInitializePromise();
    const html = getBookCompletionEmailTemplate(
      fullName,
      bookTitle,
      productType,
      downloadLink
    );
    const subject =
      productType === ProductType.EBOOK
        ? `Your eBook "${bookTitle}" is Ready to Download!`
        : `Your Book "${bookTitle}" is Ready!`;
    return this.sendEmail({
      to,
      subject,
      html,
      emailType: EmailType.SUPPORT, // 🎯 Uses support@talebyyou.com (can reply)
    });
  }

  /**
   * Send a shipping confirmation email when a physical book is shipped
   * Uses: orders@talebyyou.com (order-related)
   */
  async sendShippingConfirmationEmail(
    to: string,
    fullName: string,
    orderNumber: string,
    bookTitle: string,
    trackingNumber: string,
    trackingUrl: string,
    carrierName: string,
    estimatedDelivery: string
  ): Promise<SentMessageInfo> {
    await this.getInitializePromise();
    const html = getShippingConfirmationEmailTemplate(
      fullName,
      orderNumber,
      bookTitle,
      trackingNumber,
      trackingUrl,
      carrierName,
      estimatedDelivery
    );
    return this.sendEmail({
      to,
      subject: `Your Book "${bookTitle}" Has Shipped!`,
      html,
      emailType: EmailType.ORDER, // 🎯 Uses orders@talebyyou.com
    });
  }

  /**
   * Send contact form emails with dynamic routing based on category
   * SENDS FROM: Dynamic based on category:
   * - order_question/billing_question → orders@talebyyou.com
   * - technical_issue/book_creation_help → support@talebyyou.com
   * - partnership → info@talebyyou.com
   * - general_inquiry/feature_request/other → support@talebyyou.com
   */
  async sendContactFormEmail(
    name: string,
    email: string,
    category: ContactCategory,
    subject: string,
    message: string,
    orderNumber?: string
  ): Promise<SentMessageInfo> {
    await this.getInitializePromise();

    try {
      // Determine email type based on category
      const emailType = this.getEmailTypeFromCategory(category);

      // Email 1: Send form details to admin
      const adminHtml = getContactFormEmailTemplate(
        name,
        email,
        category,
        subject,
        message,
        orderNumber
      );

      await this.sendEmail({
        to: config.EMAIL.USER,
        subject: `[ADMIN] Contact Form: ${subject}`,
        html: adminHtml,
        emailType: EmailType.AUTOMATED,
      });

      // Email 2: Send confirmation to customer with dynamic routing
      const customerHtml = getContactConfirmationTemplate(name, subject);

      const result = await this.sendEmail({
        to: email,
        bcc: config.EMAIL.USER,
        subject: subject,
        html: customerHtml,
        emailType: emailType, // 🎯 Now dynamic based on category!
      });

      return result;
    } catch (error) {
      throw error;
    }
  }
  /**
   * Generic method to send an email
   * @param options Email options (to, subject, html, emailType)
   * @returns Promise resolving to the nodemailer info object
   */
  private async sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
    try {
      if (!this.transporter) {
        throw new Error("Email transporter not initialized");
      }

      const {
        to,
        subject,
        html,
        text,
        replyTo,
        emailType = EmailType.AUTOMATED,
        cc, // Add CC
        bcc, // Add BCC
      } = options;

      const fromEmail = this.getFromEmail(emailType);
      const replyToEmail = replyTo || this.getReplyToEmail(emailType);

      const mailOptions: SendMailOptions = {
        from: `"TaleByYou" <${fromEmail}>`,
        to,
        subject,
        html,
        text: text || "",
        replyTo: replyToEmail,
        ...(cc && { cc }), // Add CC if provided
        ...(bcc && { bcc }), // Add BCC if provided
      };

      const info = await this.transporter.sendMail(mailOptions);

      if (config.APP.NODE_ENV === "development") {
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          logger.info(`📧 Email preview URL: ${previewUrl}`);
        }
      }

      logger.info(`📧 Email sent from ${fromEmail} to ${to}: ${subject}`);
      return info;
    } catch (error) {
      logger.error("Failed to send email:", error);
      throw new Error("Failed to send email");
    }
  }
}

// Use a private variable to hold the singleton instance
let emailServiceInstance: EmailService | null = null;

/**
 * Get the singleton instance of the EmailService
 * This ensures lazy initialization - the service is only created
 * and initialized when it's actually needed
 */
export function getEmailService(): EmailService {
  if (!emailServiceInstance) {
    emailServiceInstance = new EmailService();
  }
  return emailServiceInstance;
}
