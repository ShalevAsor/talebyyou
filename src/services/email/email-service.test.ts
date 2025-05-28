// import { ProductType } from "@prisma/client";
// import { getEmailService } from "./email-service";

// // Setup mocks
// let mockSendMail = jest.fn().mockResolvedValue({
//   messageId: "test-message-id",
//   envelope: {},
// });

// // Store the transporter mock so we can change sendMail implementation
// const transporterMock = {
//   sendMail: mockSendMail,
//   verify: jest.fn().mockResolvedValue(true),
// };

// // Mock nodemailer
// jest.mock("nodemailer", () => ({
//   createTransport: jest.fn(() => transporterMock),
//   createTestAccount: jest.fn().mockResolvedValue({
//     user: "ethereal-test-user",
//     pass: "ethereal-test-pass",
//   }),
//   getTestMessageUrl: jest
//     .fn()
//     .mockReturnValue("https://ethereal.email/test-url"),
// }));

// // Mock logger
// jest.mock("@/lib/logger", () => ({
//   logger: {
//     info: jest.fn(),
//     error: jest.fn(),
//     debug: jest.fn(),
//   },
// }));

// // Mock email templates
// jest.mock("./email-templates", () => ({
//   getWelcomeEmailTemplate: jest.fn(() => "<p>Welcome template</p>"),
//   getOrderConfirmationEmailTemplate: jest.fn(
//     () => "<p>Order confirmation template</p>"
//   ),
//   getBookCompletionEmailTemplate: jest.fn(
//     () => "<p>Book completion template</p>"
//   ),
//   getShippingConfirmationEmailTemplate: jest.fn(
//     () => "<p>Shipping confirmation template</p>"
//   ),
//   getContactFormEmailTemplate: jest.fn(() => "<p>Contact form template</p>"),
// }));

// // Mock config with new structure - Alternative approach
// jest.mock("@/lib/config", () => {
//   const mockConfig = {
//     APP: {
//       NODE_ENV: "development",
//       IS_DEVELOPMENT: true,
//       IS_PRODUCTION: false,
//     },
//     EMAIL: {
//       TEST_MODE: "development",
//       HOST: "smtp.gmail.com",
//       PORT: "587",
//       USER: "admin@talebyyou.com",
//       PASSWORD: "test-app-password",
//       SECURE: false,
//       FROM: "noreply@talebyyou.com", // EmailType.AUTOMATED
//       SUPPORT: "support@talebyyou.com", // EmailType.SUPPORT
//       ORDER: "orders@talebyyou.com", // EmailType.ORDER
//       INFO: "info@talebyyou.com", // EmailType.INFO
//     },
//     AWS: {
//       REGION: "us-east-1",
//       ACCESS_KEY_ID: "mock-key",
//       SECRET_ACCESS_KEY: "mock-secret",
//       S3_BUCKET_NAME: "mock-bucket",
//     },
//   };

//   // Return both default export and named exports
//   return {
//     __esModule: true,
//     default: mockConfig,
//     ...mockConfig,
//   };
// });

// // Mock the EmailType enum
// jest.mock("@/types/email", () => ({
//   EmailType: {
//     AUTOMATED: "automated",
//     SUPPORT: "support",
//     ORDER: "order",
//     INFO: "info",
//   },
// }));

// describe("EmailService", () => {
//   let emailService: ReturnType<typeof getEmailService>;

//   // Force initialization
//   beforeAll(async () => {
//     // Get email service
//     emailService = getEmailService();

//     // Execute a method to force initialization
//     await emailService.sendWelcomeEmail("test@example.com", "Test User");
//     mockSendMail.mockClear();
//   });

//   beforeEach(() => {
//     jest.clearAllMocks();

//     // Reset mockSendMail for each test
//     mockSendMail = jest.fn().mockResolvedValue({
//       messageId: "test-message-id",
//       envelope: {},
//     });

//     // Update the transporter's sendMail method
//     transporterMock.sendMail = mockSendMail;
//   });

//   describe("Email Sending Methods", () => {
//     it("should send welcome email with AUTOMATED email type (noreply)", async () => {
//       await emailService.sendWelcomeEmail("user@example.com", "John Doe");

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <noreply@talebyyou.com>', // AUTOMATED type
//           to: "user@example.com",
//           subject: "Welcome to TaleByYou!",
//           html: "<p>Welcome template</p>",
//           replyTo: "support@talebyyou.com", // Replies go to support
//         })
//       );
//     });

//     it("should send order confirmation email with ORDER email type", async () => {
//       await emailService.sendOrderConfirmationEmail(
//         "user@example.com",
//         "ORD12345",
//         ProductType.BOOK,
//         "Adventure Book",
//         24.99,
//         "John Doe"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <orders@talebyyou.com>', // ORDER type
//           to: "user@example.com",
//           subject: "Order Confirmation #ORD12345",
//           html: "<p>Order confirmation template</p>",
//           replyTo: "orders@talebyyou.com", // Order-related replies
//         })
//       );
//     });

//     it("should send book completion email with SUPPORT email type for ebook", async () => {
//       await emailService.sendBookCompletionEmail(
//         "user@example.com",
//         "John Doe",
//         "Adventure Book",
//         ProductType.EBOOK,
//         "https://example.com/download/123"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <support@talebyyou.com>', // SUPPORT type
//           to: "user@example.com",
//           subject: 'Your eBook "Adventure Book" is Ready to Download!',
//           html: "<p>Book completion template</p>",
//           replyTo: "support@talebyyou.com", // Support can handle replies
//         })
//       );
//     });

//     it("should send book completion email with SUPPORT email type for physical book", async () => {
//       await emailService.sendBookCompletionEmail(
//         "user@example.com",
//         "John Doe",
//         "Adventure Book",
//         ProductType.BOOK,
//         "https://example.com/download/123"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <support@talebyyou.com>', // SUPPORT type
//           to: "user@example.com",
//           subject: 'Your Book "Adventure Book" is Ready!',
//           html: "<p>Book completion template</p>",
//           replyTo: "support@talebyyou.com", // Support can handle replies
//         })
//       );
//     });

//     it("should send shipping confirmation email with ORDER email type", async () => {
//       await emailService.sendShippingConfirmationEmail(
//         "user@example.com",
//         "John Doe",
//         "ORD12345",
//         "Adventure Book",
//         "TRK123456",
//         "https://tracking.example.com/TRK123456",
//         "Test Carrier",
//         "2025-05-25"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <orders@talebyyou.com>', // ORDER type
//           to: "user@example.com",
//           subject: 'Your Book "Adventure Book" Has Shipped!',
//           html: "<p>Shipping confirmation template</p>",
//           replyTo: "orders@talebyyou.com", // Order-related replies
//         })
//       );
//     });

//     it("should send contact form email to support for general inquiries", async () => {
//       await emailService.sendContactFormEmail(
//         "John Doe",
//         "user@example.com",
//         "general",
//         "General question",
//         "I have a general question."
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <info@talebyyou.com>', // INFO type for general
//           to: "support@talebyyou.com", // Goes to support
//           subject: "Contact Form: General question",
//           html: "<p>Contact form template</p>",
//           replyTo: "user@example.com", // Customer's email for easy reply
//         })
//       );
//     });

//     it("should send contact form email to orders for order-related inquiries", async () => {
//       await emailService.sendContactFormEmail(
//         "John Doe",
//         "user@example.com",
//         "order_issue",
//         "Problem with my order",
//         "I have a question about my order.",
//         "ORD12345"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <orders@talebyyou.com>', // ORDER type
//           to: "orders@talebyyou.com", // Goes to orders team
//           subject: "Contact Form: Problem with my order",
//           html: "<p>Contact form template</p>",
//           replyTo: "user@example.com", // Customer's email for easy reply
//         })
//       );
//     });
//   });

//   describe("Email Type Logic", () => {
//     it("should use correct email addresses for each EmailType", async () => {
//       // Test that different email types use the correct from addresses

//       // Welcome email should use AUTOMATED (noreply)
//       await emailService.sendWelcomeEmail("user@example.com", "John");
//       expect(mockSendMail).toHaveBeenLastCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <noreply@talebyyou.com>',
//           replyTo: "support@talebyyou.com",
//         })
//       );

//       // Order confirmation should use ORDER (orders)
//       await emailService.sendOrderConfirmationEmail(
//         "user@example.com",
//         "ORD123",
//         ProductType.EBOOK,
//         "Test Book",
//         19.99
//       );
//       expect(mockSendMail).toHaveBeenLastCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <orders@talebyyou.com>',
//           replyTo: "orders@talebyyou.com",
//         })
//       );

//       // Book completion should use SUPPORT (support)
//       await emailService.sendBookCompletionEmail(
//         "user@example.com",
//         "John",
//         "Test Book",
//         ProductType.EBOOK,
//         "http://download.com"
//       );
//       expect(mockSendMail).toHaveBeenLastCalledWith(
//         expect.objectContaining({
//           from: '"TaleByYou" <support@talebyyou.com>',
//           replyTo: "support@talebyyou.com",
//         })
//       );
//     });
//   });

//   describe("Error Handling", () => {
//     it("should throw an error if transporter fails to send email", async () => {
//       // Override the mock implementation for this specific test call
//       mockSendMail.mockRejectedValueOnce(new Error("SMTP error"));

//       await expect(
//         emailService.sendWelcomeEmail("user@example.com", "John Doe")
//       ).rejects.toThrow("Failed to send email");
//     });

//     it("should handle missing email configuration gracefully", async () => {
//       // This test would need the actual service to handle missing config
//       // For now, we're just ensuring the service throws the right error
//       expect(() => {
//         // If we were to create a service with missing config
//         // it should throw during initialization
//       }).not.toThrow(); // Current implementation handles this in initialize()
//     });
//   });

//   describe("Singleton Pattern", () => {
//     it("should return the same instance when getEmailService is called multiple times", () => {
//       const instance1 = getEmailService();
//       const instance2 = getEmailService();

//       expect(instance1).toBe(instance2);
//     });
//   });
// });
import { ProductType } from "@prisma/client";
import { getEmailService } from "./email-service";

// Setup mocks
let mockSendMail = jest.fn().mockResolvedValue({
  messageId: "test-message-id",
  envelope: {},
});

// Store the transporter mock so we can change sendMail implementation
const transporterMock = {
  sendMail: mockSendMail,
  verify: jest.fn().mockResolvedValue(true),
};

// Mock nodemailer
jest.mock("nodemailer", () => ({
  createTransport: jest.fn(() => transporterMock),
  createTestAccount: jest.fn().mockResolvedValue({
    user: "ethereal-test-user",
    pass: "ethereal-test-pass",
  }),
  getTestMessageUrl: jest
    .fn()
    .mockReturnValue("https://ethereal.email/test-url"),
}));

// Mock logger
jest.mock("@/lib/logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    debug: jest.fn(),
  },
}));

// Mock email templates - ADD THE NEW TEMPLATE
jest.mock("./email-templates", () => ({
  getWelcomeEmailTemplate: jest.fn(() => "<p>Welcome template</p>"),
  getOrderConfirmationEmailTemplate: jest.fn(
    () => "<p>Order confirmation template</p>"
  ),
  getBookCompletionEmailTemplate: jest.fn(
    () => "<p>Book completion template</p>"
  ),
  getShippingConfirmationEmailTemplate: jest.fn(
    () => "<p>Shipping confirmation template</p>"
  ),
  getContactFormEmailTemplate: jest.fn(() => "<p>Contact form template</p>"),
  getContactConfirmationTemplate: jest.fn(
    () => "<p>Contact confirmation template</p>"
  ), // NEW
}));

// Mock config with new structure
jest.mock("@/lib/config", () => {
  const mockConfig = {
    APP: {
      NODE_ENV: "development",
      IS_DEVELOPMENT: true,
      IS_PRODUCTION: false,
    },
    EMAIL: {
      TEST_MODE: "development",
      HOST: "smtp.gmail.com",
      PORT: "587",
      USER: "admin@talebyyou.com",
      PASSWORD: "test-app-password",
      SECURE: false,
      FROM: "noreply@talebyyou.com",
      SUPPORT: "support@talebyyou.com",
      ORDER: "orders@talebyyou.com",
      INFO: "info@talebyyou.com",
    },
    AWS: {
      REGION: "us-east-1",
      ACCESS_KEY_ID: "mock-key",
      SECRET_ACCESS_KEY: "mock-secret",
      S3_BUCKET_NAME: "mock-bucket",
    },
  };

  return {
    __esModule: true,
    default: mockConfig,
    ...mockConfig,
  };
});

// Mock the EmailType enum
jest.mock("@/types/email", () => ({
  EmailType: {
    AUTOMATED: "automated",
    SUPPORT: "support",
    ORDER: "order",
    INFO: "info",
  },
}));

describe("EmailService", () => {
  let emailService: ReturnType<typeof getEmailService>;

  beforeAll(async () => {
    emailService = getEmailService();
    await emailService.sendWelcomeEmail("test@example.com", "Test User");
    mockSendMail.mockClear();
  });

  beforeEach(() => {
    jest.clearAllMocks();
    mockSendMail = jest.fn().mockResolvedValue({
      messageId: "test-message-id",
      envelope: {},
    });
    transporterMock.sendMail = mockSendMail;
  });

  describe("Email Sending Methods", () => {
    it("should send welcome email with AUTOMATED email type (noreply)", async () => {
      await emailService.sendWelcomeEmail("user@example.com", "John Doe");

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <noreply@talebyyou.com>',
          to: "user@example.com",
          subject: "Welcome to TaleByYou!",
          html: "<p>Welcome template</p>",
          replyTo: "support@talebyyou.com",
        })
      );
    });

    it("should send order confirmation email with ORDER email type", async () => {
      await emailService.sendOrderConfirmationEmail(
        "user@example.com",
        "ORD12345",
        ProductType.BOOK,
        "Adventure Book",
        24.99,
        "John Doe"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <orders@talebyyou.com>',
          to: "user@example.com",
          subject: "Order Confirmation #ORD12345",
          html: "<p>Order confirmation template</p>",
          replyTo: "orders@talebyyou.com",
        })
      );
    });

    it("should send book completion email with SUPPORT email type for ebook", async () => {
      await emailService.sendBookCompletionEmail(
        "user@example.com",
        "John Doe",
        "Adventure Book",
        ProductType.EBOOK,
        "https://example.com/download/123"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <support@talebyyou.com>',
          to: "user@example.com",
          subject: 'Your eBook "Adventure Book" is Ready to Download!',
          html: "<p>Book completion template</p>",
          replyTo: "support@talebyyou.com",
        })
      );
    });

    it("should send book completion email with SUPPORT email type for physical book", async () => {
      await emailService.sendBookCompletionEmail(
        "user@example.com",
        "John Doe",
        "Adventure Book",
        ProductType.BOOK,
        "https://example.com/download/123"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <support@talebyyou.com>',
          to: "user@example.com",
          subject: 'Your Book "Adventure Book" is Ready!',
          html: "<p>Book completion template</p>",
          replyTo: "support@talebyyou.com",
        })
      );
    });

    it("should send shipping confirmation email with ORDER email type", async () => {
      await emailService.sendShippingConfirmationEmail(
        "user@example.com",
        "John Doe",
        "ORD12345",
        "Adventure Book",
        "TRK123456",
        "https://tracking.example.com/TRK123456",
        "Test Carrier",
        "2025-05-25"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <orders@talebyyou.com>',
          to: "user@example.com",
          subject: 'Your Book "Adventure Book" Has Shipped!',
          html: "<p>Shipping confirmation template</p>",
          replyTo: "orders@talebyyou.com",
        })
      );
    });

    // UPDATED CONTACT FORM TESTS - Now expects 2 emails
    it("should send TWO emails for contact form - admin notification and customer confirmation", async () => {
      await emailService.sendContactFormEmail(
        "John Doe",
        "user@example.com",
        "general_inquiry",
        "General question",
        "I have a general question."
      );

      // Should send 2 emails
      expect(mockSendMail).toHaveBeenCalledTimes(2);

      // First email: Admin notification
      expect(mockSendMail).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          from: '"TaleByYou" <noreply@talebyyou.com>', // AUTOMATED type
          to: "admin@talebyyou.com", // To admin
          subject: "[ADMIN] Contact Form: General question",
          html: "<p>Contact form template</p>",
        })
      );

      // Second email: Customer confirmation with admin BCC
      expect(mockSendMail).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          from: '"TaleByYou" <support@talebyyou.com>', // SUPPORT type
          to: "user@example.com", // To customer
          bcc: "admin@talebyyou.com", // Admin gets copy
          subject: "General question", // Clean subject
          html: "<p>Contact confirmation template</p>",
        })
      );
    });

    it("should send TWO emails for order-related contact form", async () => {
      await emailService.sendContactFormEmail(
        "John Doe",
        "user@example.com",
        "order_question",
        "Problem with my order",
        "I have a question about my order.",
        "ORD12345"
      );

      expect(mockSendMail).toHaveBeenCalledTimes(2);

      // First email: Admin notification
      expect(mockSendMail).toHaveBeenNthCalledWith(
        1,
        expect.objectContaining({
          from: '"TaleByYou" <noreply@talebyyou.com>',
          to: "admin@talebyyou.com",
          subject: "[ADMIN] Contact Form: Problem with my order",
          html: "<p>Contact form template</p>",
        })
      );

      // Second email: Customer confirmation
      expect(mockSendMail).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          from: '"TaleByYou" <support@talebyyou.com>',
          to: "user@example.com",
          bcc: "admin@talebyyou.com",
          subject: "Problem with my order",
          html: "<p>Contact confirmation template</p>",
        })
      );
    });
  });

  describe("Email Type Logic", () => {
    it("should use correct email addresses for each EmailType", async () => {
      // Welcome email should use AUTOMATED (noreply)
      await emailService.sendWelcomeEmail("user@example.com", "John");
      expect(mockSendMail).toHaveBeenLastCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <noreply@talebyyou.com>',
          replyTo: "support@talebyyou.com",
        })
      );

      // Order confirmation should use ORDER (orders)
      await emailService.sendOrderConfirmationEmail(
        "user@example.com",
        "ORD123",
        ProductType.EBOOK,
        "Test Book",
        19.99
      );
      expect(mockSendMail).toHaveBeenLastCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <orders@talebyyou.com>',
          replyTo: "orders@talebyyou.com",
        })
      );

      // Book completion should use SUPPORT (support)
      await emailService.sendBookCompletionEmail(
        "user@example.com",
        "John",
        "Test Book",
        ProductType.EBOOK,
        "http://download.com"
      );
      expect(mockSendMail).toHaveBeenLastCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <support@talebyyou.com>',
          replyTo: "support@talebyyou.com",
        })
      );
    });
  });

  describe("Error Handling", () => {
    it("should throw an error if transporter fails to send email", async () => {
      mockSendMail.mockRejectedValueOnce(new Error("SMTP error"));

      await expect(
        emailService.sendWelcomeEmail("user@example.com", "John Doe")
      ).rejects.toThrow("Failed to send email");
    });

    it("should handle contact form email failure gracefully", async () => {
      // First email succeeds, second fails
      mockSendMail
        .mockResolvedValueOnce({ messageId: "success-1" })
        .mockRejectedValueOnce(new Error("SMTP error"));

      await expect(
        emailService.sendContactFormEmail(
          "John Doe",
          "user@example.com",
          "general_inquiry",
          "Test subject",
          "Test message"
        )
      ).rejects.toThrow("Failed to send email");
    });
  });

  describe("Singleton Pattern", () => {
    it("should return the same instance when getEmailService is called multiple times", () => {
      const instance1 = getEmailService();
      const instance2 = getEmailService();

      expect(instance1).toBe(instance2);
    });
  });
});
