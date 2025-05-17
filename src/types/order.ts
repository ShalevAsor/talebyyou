import {
  Order,
  Book,
  User,
  OrderStatus,
  ProductType,
  PrintJob,
  ImageGeneration,
} from "@/generated/prisma";
import { Decimal } from "@prisma/client/runtime/library";

/***
 * Full types with relations
 *
 */

// Type for order with all relations
export type OrderFull = Order & {
  book: Book & {
    imageGenerations: ImageGeneration[];
  };
  user: User | null;
  printJob: PrintJob | null;
};

export interface OrderCreateData {
  productType: ProductType;
  quantity: number;
  customerEmail: string;
  customerName: string;
  bookId: string;
  userId?: string;
}

// For payment processing
export type PayPalOrderCreateParams = {
  orderId: string;
  orderNumber: string;
  totalAmount: Decimal;
  currency: string;
  description: string;
};

export type PayPalOrderResponseData = {
  id: string; // PayPal order ID
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
};

// For specific use cases
export type OrderBasic = Pick<
  Order,
  "id" | "orderNumber" | "status" | "totalPrice" | "createdAt"
>;

// For client side
export type OrderSummary = {
  id: string;
  orderNumber: string;
  productType: ProductType;
  totalAmount: Decimal;
  status: OrderStatus;
  bookTitle: string;
  coverImage?: string | null;
  paidAt?: Date | null;
};

export type OrderStep = "details" | "shipping" | "payment";

// Re-export enums for convenience
export { OrderStatus, ProductType };
