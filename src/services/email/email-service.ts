// // src/services/email/email-service.ts
// import nodemailer, {
//   Transporter,
//   SendMailOptions,
//   SentMessageInfo,
// } from "nodemailer";
// import { logger } from "@/lib/logger";
// import config from "@/lib/config";
// import {
//   getBookCompletionEmailTemplate,
//   getContactFormEmailTemplate,
//   getOrderConfirmationEmailTemplate,
//   getShippingConfirmationEmailTemplate,
//   getWelcomeEmailTemplate,
// } from "./email-templates";
// import { ProductType } from "@/generated/prisma";

// /**
//  * Interface for email options
//  */
// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
//   text?: string;
//   replyTo?: string;
// }

// /**
//  * Email service for sending emails to users
//  */
// class EmailService {
//   private transporter: Transporter | null = null;
//   private fromEmail: string;
//   private supportEmail: string;
//   private initialized: Promise<void> | null = null;

//   /**
//    * Creates an instance of the EmailService
//    */
//   constructor() {
//     this.fromEmail = config.EMAIL_FROM;
//     this.supportEmail = config.EMAIL_SUPPORT;
//   }

//   /**
//    * Get or create initialization promise
//    */
//   private getInitializePromise(): Promise<void> {
//     if (!this.initialized) {
//       this.initialized = this.initialize();
//     }
//     return this.initialized;
//   }

//   /**
//    * Initialize the email service
//    */
//   private async initialize(): Promise<void> {
//     const testMode = config.EMAIL_TEST_MODE || "development";

//     // Initialize the transporter based on the test mode
//     switch (testMode) {
//       case "development":
//         await this.setupDevelopmentTransporter();
//         break;
//       case "gmail":
//         this.setupGmailTransporter();
//         break;
//       case "production":
//         this.setupProductionTransporter();
//         break;
//       default:
//         await this.setupDevelopmentTransporter();
//     }
//   }

//   /**
//    * Set up email transporter for development environment
//    * Uses Ethereal email for testing without sending real emails
//    */
//   private async setupDevelopmentTransporter(): Promise<void> {
//     try {
//       // Create a test account on Ethereal
//       const testAccount = await nodemailer.createTestAccount();
//       // Create a transporter using Ethereal credentials
//       this.transporter = nodemailer.createTransport({
//         host: "smtp.ethereal.email",
//         port: 587,
//         secure: false, // true for 465, false for other ports
//         auth: {
//           user: testAccount.user,
//           pass: testAccount.pass,
//         },
//       });
//       logger.info("📧 Development email transporter set up with Ethereal");
//       logger.info(`📧 Ethereal email credentials: ${testAccount.user}`);
//     } catch (error) {
//       logger.error("Failed to set up development email transporter:", error);
//       throw new Error("Failed to set up email service for development");
//     }
//   }

//   /**
//    * Set up Gmail transporter for testing
//    */
//   private setupGmailTransporter(): void {
//     if (!config.EMAIL_USER || !config.EMAIL_PASSWORD) {
//       throw new Error(
//         "Gmail credentials not provided. Please set EMAIL_USER and EMAIL_PASSWORD."
//       );
//     }

//     this.transporter = nodemailer.createTransport({
//       host: "smtp.gmail.com",
//       port: 587,
//       secure: false,
//       auth: {
//         user: config.EMAIL_USER,
//         pass: config.EMAIL_PASSWORD,
//       },
//     });
//     logger.info("📧 Gmail test mode activated");
//     logger.info(`📧 Using Gmail account: ${config.EMAIL_USER}`);
//   }

//   /**
//    * Set up email transporter for production environment
//    */
//   private setupProductionTransporter(): void {
//     if (!config.EMAIL_HOST || !config.EMAIL_USER || !config.EMAIL_PASSWORD) {
//       throw new Error(
//         "Production email configuration incomplete. Please check your environment variables."
//       );
//     }

//     this.transporter = nodemailer.createTransport({
//       host: config.EMAIL_HOST,
//       port: parseInt(config.EMAIL_PORT || "587"),
//       secure: config.EMAIL_SECURE === "true",
//       auth: {
//         user: config.EMAIL_USER,
//         pass: config.EMAIL_PASSWORD,
//       },
//       // Add this for better debugging if needed
//       logger: process.env.NODE_ENV !== "production",
//       debug: process.env.NODE_ENV !== "production",
//     });
//     logger.info("📧 Production email transporter set up");
//   }

//   /**
//    * Send a welcome email to a new user
//    * @param to Recipient email address
//    * @param name Recipient's name
//    * @returns Promise resolving to the nodemailer info object
//    */
//   async sendWelcomeEmail(to: string, name: string): Promise<SentMessageInfo> {
//     // Wait for initialization to complete before sending
//     await this.getInitializePromise();
//     const html = getWelcomeEmailTemplate(name);
//     return this.sendEmail({
//       to,
//       subject: "Welcome to Custom Books Store!",
//       html,
//       replyTo: this.supportEmail,
//     });
//   }

//   /**
//    * Send an order confirmation email
//    * @param to Recipient email address
//    * @param orderNumber The human-readable order number
//    * @param productType The type of product ordered
//    * @param bookTitle The title of the book
//    * @param price The price of the product
//    * @param fullName Recipient's full name
//    * @returns Promise resolving to the nodemailer info object
//    */
//   async sendOrderConfirmationEmail(
//     to: string,
//     orderNumber: string,
//     productType: ProductType,
//     bookTitle: string,
//     price: number,
//     fullName?: string
//   ): Promise<SentMessageInfo> {
//     // Wait for initialization to complete before sending
//     await this.getInitializePromise();
//     const html = getOrderConfirmationEmailTemplate(
//       orderNumber,
//       productType,
//       bookTitle,
//       price,
//       fullName
//     );
//     return this.sendEmail({
//       to,
//       subject: `Order Confirmation #${orderNumber}`,
//       html,
//       replyTo: this.supportEmail,
//     });
//   }

//   /**
//    * Send a book completion email with download link
//    * @param to Recipient email address
//    * @param fullName Recipient's full name
//    * @param bookTitle The title of the completed book
//    * @param productType The type of product ordered
//    * @param downloadLink The download link for the ebook
//    * @returns Promise resolving to the nodemailer info object
//    */
//   async sendBookCompletionEmail(
//     to: string,
//     fullName: string,
//     bookTitle: string,
//     productType: ProductType,
//     downloadLink: string
//   ): Promise<SentMessageInfo> {
//     // Wait for initialization to complete before sending
//     await this.getInitializePromise();
//     const html = getBookCompletionEmailTemplate(
//       fullName,
//       bookTitle,
//       productType,
//       downloadLink
//     );
//     const subject =
//       productType === ProductType.EBOOK
//         ? `Your eBook "${bookTitle}" is Ready to Download!`
//         : `Your Book "${bookTitle}" is Ready!`;
//     return this.sendEmail({
//       to,
//       subject,
//       html,
//       replyTo: this.supportEmail,
//     });
//   }

//   /**
//    * Send a shipping confirmation email when a physical book is shipped
//    * @param to Recipient email address
//    * @param fullName Recipient's full name
//    * @param orderNumber The human-readable order number
//    * @param bookTitle The title of the shipped book
//    * @param trackingNumber The shipping tracking number
//    * @param trackingUrl The URL to track the shipment
//    * @param carrierName The name of the shipping carrier
//    * @param estimatedDelivery The estimated delivery date
//    * @returns Promise resolving to the nodemailer info object
//    */
//   async sendShippingConfirmationEmail(
//     to: string,
//     fullName: string,
//     orderNumber: string,
//     bookTitle: string,
//     trackingNumber: string,
//     trackingUrl: string,
//     carrierName: string,
//     estimatedDelivery: string
//   ): Promise<SentMessageInfo> {
//     // Wait for initialization to complete before sending
//     await this.getInitializePromise();
//     const html = getShippingConfirmationEmailTemplate(
//       fullName,
//       orderNumber,
//       bookTitle,
//       trackingNumber,
//       trackingUrl,
//       carrierName,
//       estimatedDelivery
//     );
//     return this.sendEmail({
//       to,
//       subject: `Your Book "${bookTitle}" Has Shipped!`,
//       html,
//       replyTo: this.supportEmail,
//     });
//   }

//   /**
//    * Send a contact form submission email to the support team
//    * @param name Sender's name
//    * @param email Sender's email address
//    * @param category The category of the inquiry
//    * @param subject The subject of the message
//    * @param message The message content
//    * @param orderNumber Optional order number for order-related inquiries
//    * @returns Promise resolving to the nodemailer info object
//    */
//   async sendContactFormEmail(
//     name: string,
//     email: string,
//     category: string,
//     subject: string,
//     message: string,
//     orderNumber?: string
//   ): Promise<SentMessageInfo> {
//     // Wait for initialization to complete before sending
//     await this.getInitializePromise();

//     // Create HTML for the contact form email
//     const html = getContactFormEmailTemplate(
//       name,
//       email,
//       category,
//       subject,
//       message,
//       orderNumber
//     );

//     // Send email to the support team (yourself)
//     return this.sendEmail({
//       to: this.supportEmail, // FIXED: Now goes to support email
//       subject: `Contact Form: ${subject}`,
//       html,
//       replyTo: email, // Customer's email for easy reply
//     });
//   }

//   /**
//    * Generic method to send an email
//    * @param options Email options (to, subject, html)
//    * @returns Promise resolving to the nodemailer info object
//    */
//   private async sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
//     try {
//       // Ensure transporter is initialized
//       if (!this.transporter) {
//         throw new Error("Email transporter not initialized");
//       }

//       const { to, subject, html, text, replyTo } = options;

//       const mailOptions: SendMailOptions = {
//         from: `"Custom Books Store" <${this.fromEmail}>`,
//         to,
//         subject,
//         html,
//         text: text || "",
//         replyTo: replyTo || this.supportEmail,
//       };

//       const info = await this.transporter.sendMail(mailOptions);

//       if (process.env.NODE_ENV === "development") {
//         // Log Ethereal URL for development
//         const previewUrl = nodemailer.getTestMessageUrl(info);
//         if (previewUrl) {
//           logger.info(`📧 Email preview URL: ${previewUrl}`);
//         }
//       }

//       logger.info(`📧 Email sent to ${to}: ${subject}`);
//       return info;
//     } catch (error) {
//       logger.error("Failed to send email:", error);
//       throw new Error("Failed to send email");
//     }
//   }
// }

// // Use a private variable to hold the singleton instance
// let emailServiceInstance: EmailService | null = null;

// /**
//  * Get the singleton instance of the EmailService
//  * This ensures lazy initialization - the service is only created
//  * and initialized when it's actually needed
//  */
// export function getEmailService(): EmailService {
//   if (!emailServiceInstance) {
//     emailServiceInstance = new EmailService();
//   }
//   return emailServiceInstance;
// }
// src/services/email/email-service.ts
import nodemailer, {
  Transporter,
  SendMailOptions,
  SentMessageInfo,
} from "nodemailer";
import { logger } from "@/lib/logger";
import config from "@/lib/config";
import {
  getBookCompletionEmailTemplate,
  getContactFormEmailTemplate,
  getCustomerConfirmationEmailTemplate,
  getOrderConfirmationEmailTemplate,
  getShippingConfirmationEmailTemplate,
  getWelcomeEmailTemplate,
} from "./email-templates";
import { ProductType } from "@prisma/client";
import { EmailType } from "@/types/email";

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
   * Send a contact form submission email to the support team
   * Uses: info@talebyyou.com (general inquiries)
   */
  // async sendContactFormEmail(
  //   name: string,
  //   email: string,
  //   category: string,
  //   subject: string,
  //   message: string,
  //   orderNumber?: string
  // ): Promise<SentMessageInfo> {
  //   await this.getInitializePromise();

  //   // Create HTML for the contact form email
  //   const html = getContactFormEmailTemplate(
  //     name,
  //     email,
  //     category,
  //     subject,
  //     message,
  //     orderNumber
  //   );

  //   // Determine email type based on category
  //   const emailType =
  //     orderNumber || category.includes("order")
  //       ? EmailType.ORDER // Order-related inquiries
  //       : EmailType.INFO; // General inquiries

  //   // Send email to the appropriate address
  //   return this.sendEmail({
  //     to:
  //       emailType === EmailType.ORDER
  //         ? config.EMAIL.ORDER
  //         : config.EMAIL.SUPPORT,
  //     subject: `Contact Form: ${subject}`,
  //     html,
  //     replyTo: email, // Customer's email for easy reply
  //     emailType: emailType, // 🎯 Uses orders@ or support@ based on type
  //   });
  // }
  // async sendContactFormEmail(
  //   name: string,
  //   email: string,
  //   category: string,
  //   subject: string,
  //   message: string,
  //   orderNumber?: string
  // ): Promise<SentMessageInfo> {
  //   await this.getInitializePromise();

  //   // Create HTML for the contact form email
  //   const html = getContactFormEmailTemplate(
  //     name,
  //     email,
  //     category,
  //     subject,
  //     message,
  //     orderNumber
  //   );

  //   // Determine email type based on category
  //   const emailType =
  //     orderNumber || category.includes("order")
  //       ? EmailType.ORDER // Order-related inquiries
  //       : EmailType.INFO; // General inquiries

  //   const recipientEmail = config.EMAIL.USER;
  //   try {
  //     // Send email to the appropriate address
  //     const result = await this.sendEmail({
  //       to: recipientEmail,
  //       subject: `Contact Form: ${subject}`,
  //       html,
  //       replyTo: email, // Customer's email for easy reply
  //       emailType: emailType,
  //     });

  //     console.log("✅ Contact form email sent successfully");
  //     console.log("=== CONTACT FORM EMAIL DEBUG END ===");
  //     return result;
  //   } catch (error) {
  //     console.log("❌ Contact form email failed:", error);
  //     console.log("=== CONTACT FORM EMAIL DEBUG END ===");
  //     throw error;
  //   }
  // }
  /**
   * Send a contact form submission email to the support team
   * AND send a confirmation email to the customer
   * Uses: Appropriate email based on category for internal email
   *       Support email for customer confirmation
   */
  // async sendContactFormEmail(
  //   name: string,
  //   email: string,
  //   category: string,
  //   subject: string,
  //   message: string,
  //   orderNumber?: string
  // ): Promise<SentMessageInfo> {
  //   await this.getInitializePromise();

  //   // Create HTML for the internal contact form email (to admin)
  //   const internalHtml = getContactFormEmailTemplate(
  //     name,
  //     email,
  //     category,
  //     subject,
  //     message,
  //     orderNumber
  //   );

  //   // Determine email type based on category
  //   const emailType =
  //     orderNumber || category.includes("order")
  //       ? EmailType.ORDER // Order-related inquiries
  //       : EmailType.INFO; // General inquiries

  //   const recipientEmail = config.EMAIL.USER;

  //   try {
  //     // 1. Send internal email to admin
  //     console.log("📧 Sending internal contact form email to admin...");
  //     const internalResult = await this.sendEmail({
  //       to: recipientEmail,
  //       subject: `Contact Form: ${subject}`,
  //       html: internalHtml,
  //       replyTo: email, // Customer's email for easy reply
  //       emailType: emailType,
  //     });

  //     // 2. Send confirmation email to customer
  //     console.log("📧 Sending confirmation email to customer...");
  //     await this.sendCustomerConfirmationEmail(name, email, subject, category);

  //     console.log("✅ Both contact form emails sent successfully");
  //     return internalResult;
  //   } catch (error) {
  //     console.log("❌ Contact form email failed:", error);
  //     throw error;
  //   }
  // }

  async sendContactFormEmail(
    name: string,
    email: string,
    category: string,
    subject: string,
    message: string,
    orderNumber?: string
  ): Promise<SentMessageInfo> {
    await this.getInitializePromise();

    // Create ONE clean email that looks professional for customer
    // BUT includes admin info at the bottom
    const cleanHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>${subject}</title>
      </head>
      <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        
        <!-- CUSTOMER SEES THIS PART (professional) -->
        <div style="padding: 30px;">
          <h2 style="color: #4f46e5;">Hi ${name},</h2>
          
          <p>Thank you for contacting TaleByYou!</p>
          
          <div style="background: #f8f9fa; padding: 20px; border-left: 4px solid #4f46e5; margin: 20px 0;">
            <strong>Your message:</strong><br>
            "${message}"
          </div>
          
          <p>We've received your inquiry and will get back to you within 24 hours.</p>
          
          <p>Best regards,<br>
          <strong>The TaleByYou Support Team</strong></p>
        </div>
  
        <!-- ADMIN INFO (at bottom - customer won't focus on this) -->
        <div style="border-top: 2px solid #eee; padding: 15px; background: #f5f5f5; font-size: 12px; color: #666;">
          <strong>Admin Details:</strong> ${email} | ${category}${
      orderNumber ? ` | Order: ${orderNumber}` : ""
    } | ${new Date().toLocaleString()}
        </div>
      </body>
      </html>
    `;

    try {
      // Send TO customer, BCC to yourself
      const result = await this.sendEmail({
        to: email, // TO: Customer gets the email
        bcc: config.EMAIL.USER, // BCC: You get a hidden copy
        subject: subject, // Clean subject
        html: cleanHtml,
        emailType: EmailType.SUPPORT, // From support@talebyyou.com
      });

      console.log("✅ Contact form email sent to customer with admin BCC");
      return result;
    } catch (error) {
      console.log("❌ Contact form email failed:", error);
      throw error;
    }
  }

  /**
   * Send a confirmation email to the customer after they submit the contact form
   * Uses: support@talebyyou.com (customers can reply with follow-up questions)
   */
  private async sendCustomerConfirmationEmail(
    customerName: string,
    customerEmail: string,
    originalSubject: string,
    category: string
  ): Promise<SentMessageInfo> {
    // Get appropriate response time based on category
    let estimatedResponseTime = "24 hours";
    if (category === "order_question") {
      estimatedResponseTime = "4-8 hours";
    } else if (category === "technical_support") {
      estimatedResponseTime = "12 hours";
    }

    // Create customer confirmation email HTML
    const html = getCustomerConfirmationEmailTemplate(
      customerName,
      originalSubject,
      category,
      estimatedResponseTime
    );

    return this.sendEmail({
      to: customerEmail,
      subject: `Message Received: ${originalSubject}`,
      html,
      emailType: EmailType.SUPPORT, // 🎯 Uses support@talebyyou.com
    });
  }
  /**
   * Generic method to send an email
   * @param options Email options (to, subject, html, emailType)
   * @returns Promise resolving to the nodemailer info object
   */
  // private async sendEmail(options: EmailOptions): Promise<SentMessageInfo> {
  //   try {
  //     // Ensure transporter is initialized
  //     if (!this.transporter) {
  //       throw new Error("Email transporter not initialized");
  //     }

  //     const {
  //       to,
  //       subject,
  //       html,
  //       text,
  //       replyTo,
  //       emailType = EmailType.AUTOMATED,
  //     } = options;

  //     // Get the appropriate from and reply-to emails
  //     const fromEmail = this.getFromEmail(emailType);
  //     const replyToEmail = replyTo || this.getReplyToEmail(emailType);

  //     const mailOptions: SendMailOptions = {
  //       from: `"TaleByYou" <${fromEmail}>`, // 🎯 Dynamic based on email type
  //       to,
  //       subject,
  //       html,
  //       text: text || "",
  //       replyTo: replyToEmail,
  //     };

  //     const info = await this.transporter.sendMail(mailOptions);

  //     if (config.APP.NODE_ENV === "development") {
  //       // Log Ethereal URL for development
  //       const previewUrl = nodemailer.getTestMessageUrl(info);
  //       if (previewUrl) {
  //         logger.info(`📧 Email preview URL: ${previewUrl}`);
  //       }
  //     }

  //     logger.info(`📧 Email sent from ${fromEmail} to ${to}: ${subject}`);
  //     return info;
  //   } catch (error) {
  //     logger.error("Failed to send email:", error);
  //     throw new Error("Failed to send email");
  //   }
  // }
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
