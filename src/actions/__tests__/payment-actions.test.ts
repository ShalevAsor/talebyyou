import { capturePayPalOrder, createPayPalOrder } from "../payment-actions";

import { OrderStatus, ProductType } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

// Mock entire payment-actions module
jest.mock("../payment-actions", () => {
  // Get the original module
  const originalModule = jest.requireActual("../payment-actions");

  // Return a modified version
  return {
    ...originalModule,
    // We'll selectively mock processPayment in the tests that need it
    processPayment: jest.fn(),
    // Keep other functions as they are
    createPayPalOrder: originalModule.createPayPalOrder,
    capturePayPalOrder: originalModule.capturePayPalOrder,
  };
});

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    order: {
      findUnique: jest.fn(),
      update: jest.fn(),
    },
    book: {
      update: jest.fn(),
    },
  },
}));

jest.mock("@/lib/logger", () => ({
  logger: {
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock("@/services/payment/paypal-service", () => ({
  paypal: {
    createOrder: jest.fn(),
    createPayment: jest.fn(),
  },
}));

jest.mock("../image-actions", () => ({
  generateRemainingPageImages: jest.fn(),
}));

jest.mock("../email-actions", () => ({
  sendOrderConfirmationEmail: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

// Import the modules AFTER mocking
import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import { paypal } from "@/services/payment/paypal-service";

import { sendOrderConfirmationEmail } from "../email-actions";
import { generateRemainingPageImages } from "../image-actions";

describe("Payment Actions", () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test fixtures
  const mockOrder = {
    id: "order123",
    orderNumber: "TEST123456",
    productType: ProductType.BOOK,
    totalPrice: new Decimal(24.99),
    currency: "USD",
    status: OrderStatus.PENDING,
    paymentProvider: "PAYPAL",
    quantity: 1,
    customerEmail: "customer@example.com",
    bookId: "book123",
    userId: "user123",
    name: "Test Customer",
    // Add shipping fields for physical books
    street1: "123 Main St",
    street2: null,
    city: "Test City",
    state_code: "NY",
    postcode: "12345",
    country: "US",
    book: {
      id: "book123",
      title: "Test Book",
      status: "CUSTOMIZING",
    },
  };

  const mockUpdatedOrder = {
    ...mockOrder,
    status: OrderStatus.PAID,
    payerEmail: "payer@example.com",
    pricePaid: 24.99,
    transactionId: "PAYPAL_TX_123",
    paidAt: expect.any(Date),
  };

  const mockBook = {
    id: "book123",
    title: "Test Book",
    status: "CUSTOMIZING",
  };

  const mockUpdatedBook = {
    ...mockBook,
    status: "ORDERED",
  };

  const mockPayPalOrderResponse = {
    id: "PAYPAL_ORDER_123",
    status: "CREATED",
    links: [
      {
        href: "https://www.paypal.com/checkoutnow?token=PAYPAL_ORDER_123",
        rel: "approve",
        method: "GET",
      },
    ],
  };

  const mockPayPalCaptureResponse = {
    id: "PAYPAL_ORDER_123",
    status: "COMPLETED",
    payer: {
      email_address: "payer@example.com",
    },
    purchase_units: [
      {
        payments: {
          captures: [
            {
              id: "PAYPAL_TX_123",
              amount: {
                value: "24.99",
                currency_code: "USD",
              },
              status: "COMPLETED",
            },
          ],
        },
      },
    ],
  };

  // Tests for createPayPalOrder
  describe("createPayPalOrder", () => {
    test("should create a PayPal order for a valid pending order", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (paypal.createOrder as jest.Mock).mockResolvedValue(
        mockPayPalOrderResponse
      );
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        paymentId: mockPayPalOrderResponse.id,
      });

      // Execute the function
      const result = await createPayPalOrder("order123");

      // Verify the result
      expect(result).toBe("PAYPAL_ORDER_123");

      // Verify prisma was called with include for book
      expect(prisma.order.findUnique).toHaveBeenCalledWith({
        where: { id: "order123" },
        include: {
          book: true,
        },
      });

      // Verify paypal service was called with order data object
      expect(paypal.createOrder).toHaveBeenCalledWith({
        price: 24.99, // Fixed price from the implementation
        orderNumber: "TEST123456",
        bookTitle: "Test Book",
        productType: ProductType.BOOK,
        quantity: 1,
        shipping: {
          name: "Test Customer",
          street1: "123 Main St",
          street2: undefined,
          city: "Test City",
          state_code: "NY",
          postcode: "12345",
          country: "US",
        },
      });

      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: "order123" },
        data: {
          paymentId: "PAYPAL_ORDER_123",
        },
      });
    });

    test("should create PayPal order for digital product without shipping", async () => {
      // Create a digital product order without shipping info
      const digitalOrder = {
        ...mockOrder,
        productType: ProductType.EBOOK,
        street1: null,
        city: null,
        postcode: null,
        country: null,
      };

      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(digitalOrder);
      (paypal.createOrder as jest.Mock).mockResolvedValue(
        mockPayPalOrderResponse
      );
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...digitalOrder,
        paymentId: mockPayPalOrderResponse.id,
      });

      // Execute the function
      const result = await createPayPalOrder("order123");

      // Verify the result
      expect(result).toBe("PAYPAL_ORDER_123");

      // Verify paypal service was called without shipping info
      expect(paypal.createOrder).toHaveBeenCalledWith({
        price: 24.99,
        orderNumber: "TEST123456",
        bookTitle: "Test Book",
        productType: ProductType.EBOOK,
        quantity: 1,
        // No shipping property for digital products
      });
    });

    test("should throw error when order is not found", async () => {
      // Setup mocks to return null (order not found)
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      // Execute and expect error
      await expect(createPayPalOrder("nonexistent")).rejects.toThrow(
        "Order not found"
      );

      // Verify paypal service was not called
      expect(paypal.createOrder).not.toHaveBeenCalled();
    });

    test("should throw error when order is not in PENDING status", async () => {
      // Setup mock for non-pending order
      const nonPendingOrder = { ...mockOrder, status: OrderStatus.PAID };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(nonPendingOrder);

      // Execute and expect error
      await expect(createPayPalOrder("order123")).rejects.toThrow(
        "Order is not in PENDING status"
      );

      // Verify paypal service was not called
      expect(paypal.createOrder).not.toHaveBeenCalled();
    });

    test("should handle PayPal service errors", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (paypal.createOrder as jest.Mock).mockRejectedValue(
        new Error("PayPal API error")
      );

      // Execute and expect error
      await expect(createPayPalOrder("order123")).rejects.toThrow(
        "PayPal API error"
      );
    });
  });

  // Tests for capturePayPalOrder
  describe("capturePayPalOrder", () => {
    test("should throw error when order is not found", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      // Execute and expect error
      await expect(
        capturePayPalOrder("nonexistent", "PAYPAL_ORDER_123")
      ).rejects.toThrow("Order not found");

      // Verify paypal service was not called
      expect(paypal.createPayment).not.toHaveBeenCalled();
    });

    test("should throw error when PayPal IDs don't match", async () => {
      // Setup mocks for order with different PayPal ID
      const orderWithDifferentId = {
        ...mockOrder,
        paymentId: "DIFFERENT_PAYPAL_ID",
      };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(
        orderWithDifferentId
      );
      (paypal.createPayment as jest.Mock).mockResolvedValue({
        ...mockPayPalCaptureResponse,
        id: "PAYPAL_ORDER_123", // This doesn't match the order's paymentId
      });

      // Execute and expect error
      await expect(
        capturePayPalOrder("order123", "PAYPAL_ORDER_123")
      ).rejects.toThrow("Order ID mismatch");
    });

    test("should throw error when payment is not completed", async () => {
      // Setup mocks
      const orderWithPaymentId = {
        ...mockOrder,
        paymentId: "PAYPAL_ORDER_123",
      };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(
        orderWithPaymentId
      );

      // Mock incomplete payment
      const incompletePayment = {
        ...mockPayPalCaptureResponse,
        status: "PENDING",
      };
      (paypal.createPayment as jest.Mock).mockResolvedValue(incompletePayment);

      // Execute and expect error
      await expect(
        capturePayPalOrder("order123", "PAYPAL_ORDER_123")
      ).rejects.toThrow("Payment not completed. Status: PENDING");
    });

    test("should throw error when no capture data is returned", async () => {
      // Setup mocks
      const orderWithPaymentId = {
        ...mockOrder,
        paymentId: "PAYPAL_ORDER_123",
      };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(
        orderWithPaymentId
      );
      (paypal.createPayment as jest.Mock).mockResolvedValue(null);

      // Execute and expect error
      await expect(
        capturePayPalOrder("order123", "PAYPAL_ORDER_123")
      ).rejects.toThrow("Failed to capture payment - no data returned");
    });
  });

  // For processPayment tests, we need to restore the actual implementation
  describe("processPayment", () => {
    test("should process payment and update order status", async () => {
      // Mock and restore the actual implementation just for this test
      const originalProcessPayment =
        jest.requireActual("../payment-actions").processPayment;

      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue(mockUpdatedOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue(mockUpdatedBook);
      (generateRemainingPageImages as jest.Mock).mockResolvedValue({
        success: true,
        data: ["image1", "image2"],
      });
      (sendOrderConfirmationEmail as jest.Mock).mockResolvedValue(undefined);

      // Execute the function with original implementation
      const result = await originalProcessPayment(
        "order123",
        "payer@example.com",
        24.99,
        "PAYPAL_TX_123"
      );

      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;

      // Verify success result
      expect(result.success).toBe(true);
      expect(data).toEqual({ orderId: "order123" });
      expect(error).toBeNull();

      // Verify order update was called correctly
      expect(prisma.order.update).toHaveBeenCalledWith({
        where: { id: "order123" },
        data: {
          status: OrderStatus.PAID,
          payerEmail: "payer@example.com",
          pricePaid: 24.99,
          transactionId: "PAYPAL_TX_123",
          paidAt: expect.any(Date),
        },
      });

      // Verify book update was called correctly
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: "book123" },
        data: {
          status: "ORDERED",
        },
      });

      // Verify image generation was called
      expect(generateRemainingPageImages).toHaveBeenCalledWith("book123");

      // Verify email was sent
      expect(sendOrderConfirmationEmail).toHaveBeenCalledWith(
        "customer@example.com",
        "TEST123456",
        ProductType.BOOK,
        "Test Book", // Book title comes before price
        24.99,
        "Test Customer",
        1
      );

      // Verify paths were revalidated
      expect(revalidatePath).toHaveBeenCalledWith("/my-books");
      expect(revalidatePath).toHaveBeenCalledWith("/library/preview/book123");
    });

    test("should return error when order is not found", async () => {
      const originalProcessPayment =
        jest.requireActual("../payment-actions").processPayment;

      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      // Execute the function
      const result = await originalProcessPayment(
        "nonexistent",
        "payer@example.com",
        24.99,
        "PAYPAL_TX_123"
      );

      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;

      // Verify error result
      expect(result.success).toBe(false);
      expect(data).toBeNull();
      expect(error).toBe("Order not found");

      // Verify no updates were made
      expect(prisma.order.update).not.toHaveBeenCalled();
      expect(prisma.book.update).not.toHaveBeenCalled();
    });

    test("should continue processing if image generation fails", async () => {
      const originalProcessPayment =
        jest.requireActual("../payment-actions").processPayment;

      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue(mockUpdatedOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue(mockUpdatedBook);

      // Mock image generation failure
      (generateRemainingPageImages as jest.Mock).mockRejectedValue(
        new Error("Image generation failed")
      );

      (sendOrderConfirmationEmail as jest.Mock).mockResolvedValue(undefined);

      // Execute the function
      const result = await originalProcessPayment(
        "order123",
        "payer@example.com",
        24.99,
        "PAYPAL_TX_123"
      );

      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;

      // Verify success result despite image generation error
      expect(result.success).toBe(true);
      expect(data).toEqual({ orderId: "order123" });
      expect(error).toBeNull();

      // Verify order and book updates were still made
      expect(prisma.order.update).toHaveBeenCalled();
      expect(prisma.book.update).toHaveBeenCalled();

      // Verify email was still sent
      expect(sendOrderConfirmationEmail).toHaveBeenCalled();
    });

    test("should continue processing if email sending fails", async () => {
      const originalProcessPayment =
        jest.requireActual("../payment-actions").processPayment;

      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue(mockUpdatedOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue(mockUpdatedBook);
      (generateRemainingPageImages as jest.Mock).mockResolvedValue({
        success: true,
        data: ["image1", "image2"],
      });

      // Mock email sending failure
      (sendOrderConfirmationEmail as jest.Mock).mockRejectedValue(
        new Error("Email sending failed")
      );

      // Execute the function
      const result = await originalProcessPayment(
        "order123",
        "payer@example.com",
        24.99,
        "PAYPAL_TX_123"
      );

      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;

      // Verify success result despite email sending error
      expect(result.success).toBe(true);
      expect(data).toEqual({ orderId: "order123" });
      expect(error).toBeNull();

      // Verify order and book updates were still made
      expect(prisma.order.update).toHaveBeenCalled();
      expect(prisma.book.update).toHaveBeenCalled();
    });

    test("should handle image generation warnings", async () => {
      const originalProcessPayment =
        jest.requireActual("../payment-actions").processPayment;

      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue(mockUpdatedOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue(mockUpdatedBook);

      // Mock image generation with warning
      (generateRemainingPageImages as jest.Mock).mockResolvedValue({
        success: false,
        error: "Some images failed to generate",
      });

      (sendOrderConfirmationEmail as jest.Mock).mockResolvedValue(undefined);

      // Execute the function
      const result = await originalProcessPayment(
        "order123",
        "payer@example.com",
        24.99,
        "PAYPAL_TX_123"
      );

      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;

      // Verify success result despite image generation warning
      expect(result.success).toBe(true);
      expect(data).toEqual({ orderId: "order123" });
      expect(error).toBeNull();

      // Verify order and book updates were still made
      expect(prisma.order.update).toHaveBeenCalled();
      expect(prisma.book.update).toHaveBeenCalled();

      // Verify email was still sent
      expect(sendOrderConfirmationEmail).toHaveBeenCalled();
    });
  });
});
