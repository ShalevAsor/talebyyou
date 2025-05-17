"use server";

import {
  OrderStatus,
  Prisma,
  ProductType,
  ShippingLevel,
} from "@/generated/prisma";
import prisma from "@/lib/prisma";
import { logger } from "@/lib/logger";
import { getCurrentUser } from "./user-actions";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { CheckoutFormData } from "@/schemas/checkout-schema";
import { OrderCreateData, OrderFull } from "@/types/order";
import { revalidatePath } from "next/cache";
import { generateOrderNumber } from "@/utils/orderUtils";
import { BOOK_PRICES } from "@/constants/bookConstants";
import { serializeOrder, serializeOrders } from "@/utils/serializers";

/**
 * Get an order by ID with related data
 * Returns the order with book and user relations loaded (OrderFull type)
 */
export async function getOrderById(
  orderId: string
): Promise<ActionResult<OrderFull>> {
  try {
    // Log the request
    logger.info({ orderId }, "Fetching order by ID");

    // Get current user
    const currentUser = await getCurrentUser();

    // Fetch the order with related data (matching OrderFull type)
    const order = await prisma.order.findUnique({
      where: { id: orderId },
      include: {
        book: true,
        user: true,
      },
    });

    // If order doesn't exist, return error
    if (!order) {
      logger.error({ orderId }, "Order not found");
      return createErrorResult("Order not found");
    }

    // Security check: Ensure the user has access to this order
    // Allow access if:
    // 1. Order has no user (guest checkout) AND current user is null (also guest)
    // 2. Order belongs to current user
    if (currentUser && order.userId && order.userId !== currentUser.id) {
      logger.error(
        { orderId, userId: currentUser?.id },
        "User not authorized to access this order"
      );
      return createErrorResult("Not authorized to access this order");
    }

    // Only return PENDING orders for checkout
    if (order.status !== OrderStatus.PENDING) {
      logger.error(
        { orderId, status: order.status },
        "Order is not in PENDING status"
      );
      return createErrorResult("This order cannot be processed");
    }

    logger.info({ orderId }, "Successfully fetched order");
    return createSuccessResult(order as OrderFull);
  } catch (error) {
    logger.error({ error, orderId }, "Error fetching order");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Update an existing order with new form data
 */
export async function updateOrder(
  orderId: string,
  formData: CheckoutFormData,
  quantity: number = 1
): Promise<ActionResult<string>> {
  try {
    // Log debugging information about productType
    console.log("[Server] Product type before update:", {
      fromFormData: formData.productType,
      formDataType: typeof formData.productType,
      enumValueBOOK: ProductType.BOOK,
      enumValueEBOOK: ProductType.EBOOK,
      isEqual: formData.productType === ProductType.BOOK,
    });

    // Verify the order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { book: true },
    });

    if (!existingOrder) {
      logger.error({ orderId }, "Order not found for update");
      return createErrorResult("Order not found");
    }

    // Only allow updating orders in PENDING status
    if (existingOrder.status !== OrderStatus.PENDING) {
      logger.error(
        { orderId, status: existingOrder.status },
        "Cannot update order with non-PENDING status"
      );
      return createErrorResult("Order cannot be modified in its current state");
    }

    // Cast productType to ensure proper enum handling
    const productType = formData.productType as ProductType;
    // Calculate price based on product type (without shipping)
    const totalPrice = new Prisma.Decimal(
      productType === ProductType.BOOK
        ? BOOK_PRICES.physical + (quantity - 1) * BOOK_PRICES.base
        : BOOK_PRICES.digital
    );

    // Prepare update data
    const updateData: Prisma.OrderUpdateInput = {
      productType: productType,
      totalPrice,
      customerEmail: formData.customerEmail,
      quantity,
    };

    // Add shipping details only if it's a physical book
    if (productType === ProductType.BOOK && "shippingAddress" in formData) {
      // Add shipping address fields in the format required by our updated schema
      updateData.name = formData.shippingAddress.name;
      updateData.street1 = formData.shippingAddress.street1;
      updateData.street2 = formData.shippingAddress.street2;
      updateData.city = formData.shippingAddress.city;
      updateData.state_code = formData.shippingAddress.state_code;
      updateData.postcode = formData.shippingAddress.postcode;
      updateData.country = formData.shippingAddress.country;
      updateData.phoneNumber = formData.shippingAddress.phone_number;
    } else {
      // Clear shipping fields for digital orders
      updateData.name = null;
      updateData.street1 = null;
      updateData.street2 = null;
      updateData.city = null;
      updateData.state_code = null;
      updateData.postcode = null;
      updateData.country = null;
      updateData.phoneNumber = null;
      updateData.shippingLevel = null;
      updateData.shippingCost = null;
      updateData.printingCost = null;
    }

    // Update the order
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: updateData,
    });

    logger.info({ orderId: updatedOrder.id }, "Successfully updated order");

    // Revalidate relevant paths
    if (existingOrder.book) {
      revalidatePath(`/my-books/order/${existingOrder.book.id}`);
    }

    return createSuccessResult(updatedOrder.id);
  } catch (error) {
    console.error("[Server] Error updating order:", error);
    logger.error({ error, orderId }, "Error updating order");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Create or recover an order for a book
 * - If no pending order exists, create a new one
 * - If a pending order exists, update it with the new form data
 */
export async function createOrRecoverOrder(
  formData: CheckoutFormData,
  bookId: string,
  quantity: number = 1
): Promise<ActionResult<string>> {
  try {
    // Log received data
    console.log("[Server] Creating or recovering order:", {
      formData,
      bookId,
      quantity,
    });

    // First, check if there's a pending order for this book
    const pendingOrderResult = await getPendingOrderForBook(bookId);

    if (pendingOrderResult.success && pendingOrderResult.data) {
      // Found a pending order - update it with new form data
      logger.info(
        { orderId: pendingOrderResult.data.id, bookId },
        "Updating existing pending order"
      );

      // Update the existing order with new form data
      const updateResult = await updateOrder(
        pendingOrderResult.data.id,
        formData,
        quantity
      );
      return updateResult;
    }

    // No pending order found, create a new one (using existing implementation)
    const user = await getCurrentUser();

    // Convert form data to order data structure
    const orderData: OrderCreateData = {
      bookId: bookId,
      productType: formData.productType,
      customerEmail: formData.customerEmail,
      customerName: user
        ? `${user.firstName || ""} ${user.lastName || ""}`.trim()
        : "",
      quantity,
      // Include user ID if authenticated
      ...(user?.id && { userId: user.id }),
    };

    // Generate an order number
    const orderNumber = generateOrderNumber();

    // Create the order in the database with base fields
    const orderCreateData: Prisma.OrderCreateInput = {
      orderNumber,
      productType: orderData.productType,
      totalPrice: new Prisma.Decimal(
        orderData.productType === ProductType.BOOK
          ? BOOK_PRICES.physical
          : BOOK_PRICES.digital
      ),
      currency: "USD",
      status: OrderStatus.PENDING,
      paymentProvider: "PAYPAL",
      quantity: orderData.quantity,
      customerEmail: orderData.customerEmail,
      // Connect relationships
      book: { connect: { id: orderData.bookId } },
      ...(orderData.userId && {
        user: { connect: { id: orderData.userId } },
      }),
    };

    // Add shipping details only if it's a physical book
    if (
      formData.productType === ProductType.BOOK &&
      "shippingAddress" in formData
    ) {
      // Add shipping address fields in the format required by our updated schema
      orderCreateData.name = formData.shippingAddress.name;
      orderCreateData.street1 = formData.shippingAddress.street1;
      orderCreateData.street2 = formData.shippingAddress.street2;
      orderCreateData.city = formData.shippingAddress.city;
      orderCreateData.state_code = formData.shippingAddress.state_code;
      orderCreateData.postcode = formData.shippingAddress.postcode;
      orderCreateData.country = formData.shippingAddress.country;
      orderCreateData.phoneNumber = formData.shippingAddress.phone_number;
    }

    // Create the order in the database
    const order = await prisma.order.create({
      data: orderCreateData,
    });

    // Update the book with the orderId
    await prisma.book.update({
      where: { id: orderData.bookId },
      data: {
        orderId: order.id,
      },
    });
    logger.info(
      {
        orderId: order.id,
        orderNumber,
        bookId,
      },
      "Successfully created order from checkout"
    );

    // Revalidate paths
    revalidatePath(`/my-books/order/${bookId}`);

    return createSuccessResult(order.id);
  } catch (error) {
    console.error("[Server] Error creating or recovering order:", error);
    logger.error({ error }, "Error creating or recovering order");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Check if a book already has a pending order and return it if found
 */

export async function getPendingOrderForBook(
  bookId: string
): Promise<ActionResult<OrderFull | null>> {
  try {
    logger.info({ bookId }, "Checking for pending orders for book");

    const pendingOrder = await prisma.order.findFirst({
      where: {
        bookId: bookId,
        status: OrderStatus.PENDING,
      },
      include: {
        book: true,
        user: true,
      },
    });

    if (pendingOrder) {
      logger.info(
        { bookId, orderId: pendingOrder.id },
        "Found pending order for book"
      );
      const serializedOrder = serializeOrder(pendingOrder);
      return createSuccessResult(serializedOrder as OrderFull);
    }

    logger.info({ bookId }, "No pending order found for book");
    return createSuccessResult(null);
  } catch (error) {
    logger.error({ error, bookId }, "Error checking for pending order");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}
/**
 * Update an order with shipping details after shipping selection
 */
export async function updateOrderWithShipping(
  orderId: string,
  formData: CheckoutFormData,
  shippingLevel: ShippingLevel,
  shippingCost: string,
  totalPrice: string,
  costBreakdown?: {
    printingCost?: string;
    imagesCost?: string;
  }
): Promise<ActionResult<string>> {
  try {
    logger.info(
      { orderId, shippingLevel, shippingCost, totalPrice, costBreakdown },
      "Updating order with shipping details"
    );

    // Verify the order exists
    const existingOrder = await prisma.order.findUnique({
      where: { id: orderId },
      include: { book: true },
    });

    if (!existingOrder) {
      logger.error({ orderId }, "Order not found for shipping update");
      return createErrorResult("Order not found");
    }

    // Only allow updating orders in PENDING status
    if (existingOrder.status !== OrderStatus.PENDING) {
      logger.error(
        { orderId, status: existingOrder.status },
        "Cannot update shipping for non-PENDING order"
      );
      return createErrorResult("Order cannot be modified in its current state");
    }

    // Validate product type
    if (existingOrder.productType !== ProductType.BOOK) {
      logger.error(
        { orderId, productType: existingOrder.productType },
        "Cannot add shipping to non-physical book order"
      );
      return createErrorResult(
        "Shipping can only be added to physical book orders"
      );
    }

    // First update basic order details
    const updateResult = await updateOrder(orderId, formData);
    if (!updateResult.success) {
      return updateResult;
    }

    // Sanitize the decimal values to ensure they have the correct format
    const sanitizeDecimal = (value: string): string => {
      // If there are multiple dots, keep only the last one
      if ((value.match(/\./g) || []).length > 1) {
        const lastDotIndex = value.lastIndexOf(".");
        return (
          value.substring(0, lastDotIndex).replace(/\./g, "") +
          value.substring(lastDotIndex)
        );
      }
      return value;
    };

    const sanitizedShippingCost = sanitizeDecimal(shippingCost);
    const sanitizedTotalPrice = sanitizeDecimal(totalPrice);

    // Default printing cost if not explicitly provided
    const printingCostValue = costBreakdown?.printingCost
      ? sanitizeDecimal(costBreakdown.printingCost)
      : "0.00";

    // Default images cost if not explicitly provided
    const imagesCostValue = costBreakdown?.imagesCost
      ? sanitizeDecimal(costBreakdown.imagesCost)
      : "0.00";

    // Update the order with shipping details
    const updatedOrder = await prisma.order.update({
      where: { id: orderId },
      data: {
        shippingLevel: shippingLevel,
        shippingCost: new Prisma.Decimal(sanitizedShippingCost),
        printingCost: new Prisma.Decimal(printingCostValue),
        imagesCost: new Prisma.Decimal(imagesCostValue),
        totalPrice: new Prisma.Decimal(sanitizedTotalPrice),
      },
    });

    logger.info(
      {
        orderId: updatedOrder.id,
        shippingLevel,
        sanitizedShippingCost,
        printingCost: printingCostValue,
        imagesCost: imagesCostValue,
        sanitizedTotalPrice,
      },
      "Successfully updated order with shipping details"
    );

    // Revalidate paths
    if (existingOrder.book) {
      revalidatePath(`/my-books/order/${existingOrder.book.id}`);
    }

    return createSuccessResult(updatedOrder.id);
  } catch (error) {
    console.error("[Server] Error updating order with shipping:", error);
    logger.error({ error, orderId }, "Error updating order with shipping");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Create a new order with shipping details in one step
 */
export async function createOrderWithShipping(
  bookId: string,
  formData: CheckoutFormData,
  shippingLevel: ShippingLevel,
  shippingCost: string,
  totalPrice: string,
  costBreakdown?: {
    printingCost?: string;
    imagesCost?: string;
  }
): Promise<ActionResult<string>> {
  try {
    logger.info(
      { bookId, shippingLevel, shippingCost, totalPrice, costBreakdown },
      "Creating order with shipping details"
    );

    // First create the base order
    const createResult = await createOrRecoverOrder(formData, bookId);
    if (!createResult.success) {
      return createResult;
    }

    // Add shipping details
    const orderId = createResult.data;
    const shippingResult = await updateOrderWithShipping(
      orderId,
      formData,
      shippingLevel,
      shippingCost,
      totalPrice,
      costBreakdown
    );

    return shippingResult;
  } catch (error) {
    console.error("[Server] Error creating order with shipping:", error);
    logger.error({ error, bookId }, "Error creating order with shipping");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Get all orders with related data for admin
 * Returns all orders with book and user relations loaded
 */
export async function getAllOrders(): Promise<ActionResult<OrderFull[]>> {
  try {
    // Log the request
    logger.info("Admin fetching all orders");

    // Get current user and verify admin status
    const currentUser = await getCurrentUser();

    // Check if user is admin (you'll need to implement this based on your roles system)
    if (!currentUser?.id) {
      logger.error("Unauthorized access to getAllOrders");
      return createErrorResult("Not authorized");
    }

    // Fetch all orders with related data
    const orders = await prisma.order.findMany({
      include: {
        book: {
          include: {
            imageGenerations: true, // Include the image generations
          },
        },
        user: true,
        printJob: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    logger.info({ count: orders.length }, "Successfully fetched all orders");
    const serializedOrders = serializeOrders(orders);
    return createSuccessResult(serializedOrders as OrderFull[]);
  } catch (error) {
    logger.error({ error }, "Error fetching all orders");
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Get the total count of orders in the system
 * @returns ActionResult with the count of orders
 */
export async function getOrdersCount(): Promise<ActionResult<number>> {
  try {
    const count = await prisma.order.count();
    return createSuccessResult(count, "Order count retrieved successfully");
  } catch (error) {
    console.error("Error fetching orders count:", error);
    return createErrorResult("Failed to retrieve order count");
  }
}
