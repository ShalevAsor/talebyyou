// import { ProductType } from "@/generated/prisma";
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

// // Mock config
// jest.mock("@/lib/config", () => ({
//   EMAIL_FROM: "test@example.com",
//   EMAIL_HOST: "smtp.example.com",
//   EMAIL_PORT: "587",
//   EMAIL_SECURE: "false",
//   EMAIL_USER: "testuser",
//   EMAIL_PASSWORD: "testpass",
//   AWS: {
//     REGION: "us-east-1",
//     ACCESS_KEY_ID: "mock-key",
//     SECRET_ACCESS_KEY: "mock-secret",
//     S3_BUCKET_NAME: "mock-bucket",
//   },
// }));

// // Store original NODE_ENV

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
//     it("should send welcome email correctly", async () => {
//       await emailService.sendWelcomeEmail("user@example.com", "John Doe");

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: "test@example.com",
//           to: "user@example.com",
//           subject: "Welcome to Custom Books Store!",
//           html: "<p>Welcome template</p>",
//         })
//       );
//     });

//     it("should send order confirmation email correctly", async () => {
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
//           from: "test@example.com",
//           to: "user@example.com",
//           subject: "Order Confirmation #ORD12345",
//           html: "<p>Order confirmation template</p>",
//         })
//       );
//     });

//     it("should send book completion email correctly for ebook", async () => {
//       await emailService.sendBookCompletionEmail(
//         "user@example.com",
//         "John Doe",
//         "Adventure Book",
//         ProductType.EBOOK,
//         "https://example.com/download/123"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: "test@example.com",
//           to: "user@example.com",
//           subject: 'Your eBook "Adventure Book" is Ready to Download!',
//           html: "<p>Book completion template</p>",
//         })
//       );
//     });

//     it("should send book completion email correctly for physical book", async () => {
//       await emailService.sendBookCompletionEmail(
//         "user@example.com",
//         "John Doe",
//         "Adventure Book",
//         ProductType.BOOK,
//         "https://example.com/download/123"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: "test@example.com",
//           to: "user@example.com",
//           subject: 'Your Book "Adventure Book" is Ready!',
//           html: "<p>Book completion template</p>",
//         })
//       );
//     });

//     it("should send shipping confirmation email correctly", async () => {
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
//           from: "test@example.com",
//           to: "user@example.com",
//           subject: 'Your Book "Adventure Book" Has Shipped!',
//           html: "<p>Shipping confirmation template</p>",
//         })
//       );
//     });

//     it("should send contact form email correctly", async () => {
//       await emailService.sendContactFormEmail(
//         "John Doe",
//         "user@example.com",
//         "Support",
//         "Need help with my order",
//         "I have a question about my order.",
//         "ORD12345"
//       );

//       expect(mockSendMail).toHaveBeenCalledWith(
//         expect.objectContaining({
//           from: "test@example.com",
//           to: "test@example.com", // Note: for contact form emails, the 'to' is the FROM email
//           subject: "Contact Form: Need help with my order",
//           html: "<p>Contact form template</p>",
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
//   });

//   describe("Singleton Pattern", () => {
//     it("should return the same instance when getEmailService is called multiple times", () => {
//       const instance1 = getEmailService();
//       const instance2 = getEmailService();

//       expect(instance1).toBe(instance2);
//     });
//   });
// });
import { ProductType } from "@/generated/prisma";
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

// Mock email templates
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
}));

// Mock config
jest.mock("@/lib/config", () => ({
  EMAIL_FROM: "test@example.com",
  EMAIL_SUPPORT: "support@example.com",
  EMAIL_HOST: "smtp.example.com",
  EMAIL_PORT: "587",
  EMAIL_SECURE: "false",
  EMAIL_USER: "testuser",
  EMAIL_PASSWORD: "testpass",
  AWS: {
    REGION: "us-east-1",
    ACCESS_KEY_ID: "mock-key",
    SECRET_ACCESS_KEY: "mock-secret",
    S3_BUCKET_NAME: "mock-bucket",
  },
}));

describe("EmailService", () => {
  let emailService: ReturnType<typeof getEmailService>;

  // Force initialization
  beforeAll(async () => {
    // Get email service
    emailService = getEmailService();

    // Execute a method to force initialization
    await emailService.sendWelcomeEmail("test@example.com", "Test User");
    mockSendMail.mockClear();
  });

  beforeEach(() => {
    jest.clearAllMocks();

    // Reset mockSendMail for each test
    mockSendMail = jest.fn().mockResolvedValue({
      messageId: "test-message-id",
      envelope: {},
    });

    // Update the transporter's sendMail method
    transporterMock.sendMail = mockSendMail;
  });

  describe("Email Sending Methods", () => {
    it("should send welcome email correctly", async () => {
      await emailService.sendWelcomeEmail("user@example.com", "John Doe");

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <test@example.com>',
          to: "user@example.com",
          subject: "Welcome to TaleByYou!",
          html: "<p>Welcome template</p>",
        })
      );
    });

    it("should send order confirmation email correctly", async () => {
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
          from: '"TaleByYou" <test@example.com>',
          to: "user@example.com",
          subject: "Order Confirmation #ORD12345",
          html: "<p>Order confirmation template</p>",
        })
      );
    });

    it("should send book completion email correctly for ebook", async () => {
      await emailService.sendBookCompletionEmail(
        "user@example.com",
        "John Doe",
        "Adventure Book",
        ProductType.EBOOK,
        "https://example.com/download/123"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <test@example.com>',
          to: "user@example.com",
          subject: 'Your eBook "Adventure Book" is Ready to Download!',
          html: "<p>Book completion template</p>",
        })
      );
    });

    it("should send book completion email correctly for physical book", async () => {
      await emailService.sendBookCompletionEmail(
        "user@example.com",
        "John Doe",
        "Adventure Book",
        ProductType.BOOK,
        "https://example.com/download/123"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <test@example.com>',
          to: "user@example.com",
          subject: 'Your Book "Adventure Book" is Ready!',
          html: "<p>Book completion template</p>",
        })
      );
    });

    it("should send shipping confirmation email correctly", async () => {
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
          from: '"TaleByYou" <test@example.com>',
          to: "user@example.com",
          subject: 'Your Book "Adventure Book" Has Shipped!',
          html: "<p>Shipping confirmation template</p>",
        })
      );
    });

    it("should send contact form email correctly", async () => {
      await emailService.sendContactFormEmail(
        "John Doe",
        "user@example.com",
        "Support",
        "Need help with my order",
        "I have a question about my order.",
        "ORD12345"
      );

      expect(mockSendMail).toHaveBeenCalledWith(
        expect.objectContaining({
          from: '"TaleByYou" <test@example.com>',
          to: "support@example.com", // Note: for contact form emails, goes to support email
          subject: "Contact Form: Need help with my order",
          html: "<p>Contact form template</p>",
          replyTo: "user@example.com", // Customer's email for easy reply
        })
      );
    });
  });

  describe("Error Handling", () => {
    it("should throw an error if transporter fails to send email", async () => {
      // Override the mock implementation for this specific test call
      mockSendMail.mockRejectedValueOnce(new Error("SMTP error"));

      await expect(
        emailService.sendWelcomeEmail("user@example.com", "John Doe")
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
