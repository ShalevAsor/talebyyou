// src/actions/__tests__/order-actions.test.ts

import {
  createOrderWithShipping,
  createOrRecoverOrder,
  getOrderById,
  getPendingOrderForBook,
  updateOrder,
  updateOrderWithShipping,
} from "../order-actions";
import { OrderStatus, ProductType, ShippingLevel } from "@prisma/client";
import { Decimal } from "@prisma/client/runtime/library";

// Mock dependencies
jest.mock("@/lib/prisma", () => ({
  __esModule: true,
  default: {
    order: {
      findUnique: jest.fn(),
      findFirst: jest.fn(),
      create: jest.fn(),
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
    debug: jest.fn(),
  },
}));

jest.mock("../user-actions", () => ({
  getCurrentUser: jest.fn(),
}));

jest.mock("next/cache", () => ({
  revalidatePath: jest.fn(),
}));

jest.mock("@/utils/orderUtils", () => ({
  generateOrderNumber: jest.fn(() => "TEST123456"),
}));

jest.mock("@/constants/bookConstants", () => ({
  BOOK_PRICES: {
    digital: 9.99,
    physical: 24.99,
    base: 19.99,
  },
}));

import prisma from "@/lib/prisma";
import { getCurrentUser } from "../user-actions";
import { revalidatePath } from "next/cache";
import { generateOrderNumber } from "@/utils/orderUtils";
import { CheckoutFormData } from "@/schemas/checkout-schema";

describe("Order Actions", () => {
  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test fixtures
  const mockUser = {
    id: "user123",
    email: "test@example.com",
    firstName: "Test",
    lastName: "User",
  };

  const mockBook = {
    id: "book123",
    title: "Test Book",
  };

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
    book: mockBook,
    user: mockUser,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockDigitalOrder = {
    ...mockOrder,
    id: "order456",
    productType: ProductType.EBOOK,
    totalPrice: new Decimal(9.99),
  };

  const mockEbookFormData: CheckoutFormData = {
    productType: ProductType.EBOOK,
    customerEmail: "customer@example.com",
  };

  const mockPhysicalFormData: CheckoutFormData = {
    productType: ProductType.BOOK,
    customerEmail: "customer@example.com",
    shippingAddress: {
      name: "Test Customer",
      street1: "123 Main St",
      street2: "Apt 4B",
      city: "Testville",
      state_code: "TS",
      postcode: "12345",
      country: "US",
      phone_number: "555-123-4567",
    },
  };

  describe("getOrderById", () => {
    test("should return an order when valid ID is provided", async () => {
      // Setup mocks
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);

      // Execute the function
      const result = await getOrderById("order123");
      const data = result.success ? result.data : null;
      // Verify the result
      expect(result.success).toBe(true);
      expect(data).toEqual(mockOrder);

      // Verify prisma was called correctly
      expect(prisma.order.findUnique).toHaveBeenCalledWith({
        where: { id: "order123" },
        include: {
          book: true,
          user: true,
        },
      });
    });

    test("should return error when order is not found", async () => {
      // Setup mocks to return null (order not found)
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      // Execute the function
      const result = await getOrderById("nonexistent");
      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;
      // Verify the result
      expect(result.success).toBe(false);
      expect(data).toBeNull();
      expect(error).toBe("Order not found");
    });

    test("should return error when user is not authorized", async () => {
      // Setup mocks for different user than order owner
      const differentUser = { ...mockUser, id: "different123" };
      (getCurrentUser as jest.Mock).mockResolvedValue(differentUser);
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);

      // Execute the function
      const result = await getOrderById("order123");
      const data = result.success ? result.data : null;
      const error = result.success ? null : result.error;
      // Verify the result
      expect(result.success).toBe(false);
      expect(data).toBeNull();
      expect(error).toBe("Not authorized to access this order");
    });
  });
  describe("getPendingOrderForBook", () => {
    test("should return pending order when one exists", async () => {
      // Setup mocks
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(mockOrder);

      // Execute the function
      const result = await getPendingOrderForBook("book123");
      const data = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(data).toBeTruthy();

      // Verify prisma was called correctly
      expect(prisma.order.findFirst).toHaveBeenCalledWith({
        where: {
          bookId: "book123",
          status: OrderStatus.PENDING,
        },
        include: {
          book: true,
          user: true,
        },
      });
    });

    test("should return null when no pending order exists", async () => {
      // Setup mocks
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);

      // Execute the function
      const result = await getPendingOrderForBook("book123");
      const data = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(data).toBeNull();
    });
  });

  describe("createOrRecoverOrder", () => {
    test("should recover existing pending order when one exists", async () => {
      // Setup mocks for existing order
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        customerEmail: "updated@example.com",
      });

      const updatedFormData = {
        ...mockPhysicalFormData,
        customerEmail: "updated@example.com",
      };

      // Execute the function
      const result = await createOrRecoverOrder(updatedFormData, "book123");
      const orderId = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(orderId).toBe("order123");

      // Verify prisma calls
      expect(prisma.order.findFirst).toHaveBeenCalled();
      expect(prisma.order.update).toHaveBeenCalled();
      // Should not create a new order
      expect(prisma.order.create).not.toHaveBeenCalled();
    });

    test("should create new physical book order when no pending order exists", async () => {
      // Setup mocks for no existing order
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue({
        ...mockBook,
        orderId: "order123",
      });

      // Execute the function
      const result = await createOrRecoverOrder(
        mockPhysicalFormData,
        "book123"
      );
      const orderId = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(orderId).toBe("order123");

      // Verify prisma calls
      expect(prisma.order.create).toHaveBeenCalled();
      expect(prisma.book.update).toHaveBeenCalledWith({
        where: { id: "book123" },
        data: { orderId: "order123" },
      });
      expect(generateOrderNumber).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalled();
    });

    test("should create new digital ebook order when no pending order exists", async () => {
      // Setup mocks for no existing order
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.create as jest.Mock).mockResolvedValue(mockDigitalOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue({
        ...mockBook,
        orderId: "order456",
      });

      // Execute the function
      const result = await createOrRecoverOrder(mockEbookFormData, "book123");
      const orderId = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(orderId).toBe("order456");

      // Verify prisma calls and check product type
      expect(prisma.order.create).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            productType: ProductType.EBOOK,
          }),
        })
      );
    });

    test("should handle error during order creation", async () => {
      // Setup mocks to throw error
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.create as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      // Execute the function
      const result = await createOrRecoverOrder(
        mockPhysicalFormData,
        "book123"
      );
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Database error");
    });
  });
  describe("updateOrderWithShipping", () => {
    test("should update physical order with shipping details", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        shippingLevel: ShippingLevel.PRIORITY_MAIL,
        shippingCost: new Decimal(5.99),
        totalPrice: new Decimal(30.98),
      });

      // Execute the function
      const result = await updateOrderWithShipping(
        "order123",
        mockPhysicalFormData,
        ShippingLevel.PRIORITY_MAIL,
        "5.99",
        "30.98",
        1 // quantity parameter
      );

      // Verify the result
      const updatedOrder = result.success ? result.data : null;
      expect(result.success).toBe(true);
      expect(updatedOrder).toBe("order123");

      // Verify prisma was called twice (once for updateOrder, once for shipping)
      expect(prisma.order.update).toHaveBeenCalledTimes(2);

      // Check the SECOND call for shipping details only
      expect(prisma.order.update).toHaveBeenNthCalledWith(
        2,
        expect.objectContaining({
          where: { id: "order123" },
          data: expect.objectContaining({
            shippingLevel: ShippingLevel.PRIORITY_MAIL,
            shippingCost: expect.any(Object), // Decimal
            totalPrice: expect.any(Object), // Decimal
            quantity: 1,
          }),
        })
      );

      expect(revalidatePath).toHaveBeenCalled();
    });

    test("should return error when order does not exist", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      // Execute the function
      const result = await updateOrderWithShipping(
        "nonexistent",
        mockPhysicalFormData,
        ShippingLevel.PRIORITY_MAIL,
        "5.99",
        "30.98"
      );
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Order not found");
    });

    test("should return error when order is not in PENDING status", async () => {
      // Setup mocks with completed order
      const completedOrder = {
        ...mockOrder,
        status: OrderStatus.FULFILLED,
      };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(completedOrder);

      // Execute the function
      const result = await updateOrderWithShipping(
        "order123",
        mockPhysicalFormData,
        ShippingLevel.PRIORITY_MAIL,
        "5.99",
        "30.98"
      );
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Order cannot be modified in its current state");
    });

    test("should return error when trying to add shipping to ebook order", async () => {
      // Setup mocks with ebook order
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(
        mockDigitalOrder
      );

      // Execute the function
      const result = await updateOrderWithShipping(
        "order456",
        mockEbookFormData,
        ShippingLevel.PRIORITY_MAIL,
        "5.99",
        "15.98"
      );
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Shipping can only be added to physical book orders");
    });
  });
  describe("updateOrder", () => {
    test("should update order with physical book details", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        customerEmail: "updated@example.com",
        quantity: 2,
        totalPrice: new Decimal(44.98), // 24.99 + 19.99
      });

      const updatedFormData = {
        ...mockPhysicalFormData,
        customerEmail: "updated@example.com",
      };

      // Execute the function
      const result = await updateOrder("order123", updatedFormData, 2);
      const orderId = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(orderId).toBe("order123");

      // Verify prisma calls
      expect(prisma.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "order123" },
          data: expect.objectContaining({
            customerEmail: "updated@example.com",
            quantity: 2,
            totalPrice: expect.any(Object), // Decimal
          }),
        })
      );
      expect(revalidatePath).toHaveBeenCalled();
    });

    test("should update order from physical to digital", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        productType: ProductType.EBOOK,
        totalPrice: new Decimal(9.99),
      });

      // Execute the function
      const result = await updateOrder("order123", mockEbookFormData);
      const orderId = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(orderId).toBe("order123");

      // Verify prisma calls with digital product type
      expect(prisma.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "order123" },
          data: expect.objectContaining({
            productType: ProductType.EBOOK,
            totalPrice: expect.any(Object), // Decimal
            // Should clear shipping fields
            name: null,
            street1: null,
            street2: null,
            city: null,
            state_code: null,
            postcode: null,
            country: null,
            phoneNumber: null,
            shippingLevel: null,
            shippingCost: null,
            printingCost: null,
          }),
        })
      );
    });

    test("should return error when order does not exist", async () => {
      // Setup mocks
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(null);

      // Execute the function
      const result = await updateOrder("nonexistent", mockPhysicalFormData);
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Order not found");
    });

    test("should return error when order is not in PENDING status", async () => {
      // Setup mocks with completed order
      const completedOrder = {
        ...mockOrder,
        status: OrderStatus.FULFILLED,
      };
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(completedOrder);

      // Execute the function
      const result = await updateOrder("order123", mockPhysicalFormData);
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Order cannot be modified in its current state");
    });
  });
  describe("createOrderWithShipping", () => {
    test("should create new order with shipping in one step", async () => {
      // Setup mocks for a successful order creation and shipping update
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.create as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.book.update as jest.Mock).mockResolvedValue({
        ...mockBook,
        orderId: "order123",
      });
      (prisma.order.findUnique as jest.Mock).mockResolvedValue(mockOrder);
      (prisma.order.update as jest.Mock).mockResolvedValue({
        ...mockOrder,
        shippingLevel: ShippingLevel.EXPRESS,
        shippingCost: new Decimal(12.99),
        totalPrice: new Decimal(37.98),
      });

      // Execute the function
      const result = await createOrderWithShipping(
        "book123",
        mockPhysicalFormData,
        ShippingLevel.EXPRESS,
        "12.99",
        "37.98",
        {
          printingCost: "15.00",
          imagesCost: "3.50",
        }
      );
      const orderId = result.success ? result.data : null;

      // Verify the result
      expect(result.success).toBe(true);
      expect(orderId).toBe("order123");

      // Verify the sequence of prisma calls
      expect(prisma.order.create).toHaveBeenCalled();
      expect(prisma.book.update).toHaveBeenCalled();
      expect(prisma.order.update).toHaveBeenCalledWith(
        expect.objectContaining({
          where: { id: "order123" },
          data: expect.objectContaining({
            shippingLevel: ShippingLevel.EXPRESS,
          }),
        })
      );
    });

    test("should return error when order creation fails", async () => {
      // Setup mocks to throw error during creation
      (prisma.order.findFirst as jest.Mock).mockResolvedValue(null);
      (getCurrentUser as jest.Mock).mockResolvedValue(mockUser);
      (prisma.order.create as jest.Mock).mockRejectedValue(
        new Error("Database error")
      );

      // Execute the function
      const result = await createOrderWithShipping(
        "book123",
        mockPhysicalFormData,
        ShippingLevel.EXPRESS,
        "12.99",
        "37.98"
      );
      const error = result.success ? null : result.error;

      // Verify the result
      expect(result.success).toBe(false);
      expect(error).toBe("Database error");
    });
  });
});
