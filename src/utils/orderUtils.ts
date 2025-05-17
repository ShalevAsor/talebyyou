import { BOOK_PRICES } from "@/constants/bookConstants";
import { calculateApiCreditCost, LEONARDO_TIER } from "@/constants/image";
import { ImageGeneration, OrderStatus, ProductType } from "@/generated/prisma";
import { PhysicalOrderFormData } from "@/schemas/checkout-schema";
import { OrderFull } from "@/types/order";
import { ShippingAddress } from "@/types/print";

/**
 * Generates a human-readable order number
 */
export function generateOrderNumber(): string {
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, "0");
  return `ORD-${timestamp}-${random}`;
}
/**
 * Formats a number as currency
 * @param amount - The amount to format
 * @param currency - The currency code (default: USD)
 * @returns Formatted currency string
 */
export function formatCurrency(amount: number, currency = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  }).format(amount);
}

export const mapFormToShippingAddress = (
  formData: PhysicalOrderFormData
): ShippingAddress => {
  return {
    name: formData.shippingAddress.name,
    street1: formData.shippingAddress.street1,
    street2: formData.shippingAddress.street2,
    city: formData.shippingAddress.city,
    state_code: formData.shippingAddress.state_code?.toUpperCase(),
    country_code: formData.shippingAddress.country.toUpperCase(),
    postcode: formData.shippingAddress.postcode,
    phone_number: formData.shippingAddress.phone_number,
  };
};

export const getTotalPrice = (
  shippingCost: string | number,
  productType: ProductType,
  quantity: number = 1
): string => {
  // Handle digital products
  if (productType === ProductType.EBOOK) {
    return BOOK_PRICES.digital.toFixed(2);
  }

  // Convert shipping cost to a number if it's a string
  const shippingCostNumber =
    typeof shippingCost === "string" ? parseFloat(shippingCost) : shippingCost;

  // Calculate the price with quantity and shipping
  const basePrice = BOOK_PRICES.physical;
  const additionalCopiesCost = (quantity - 1) * BOOK_PRICES.base;
  const totalPrice = basePrice + additionalCopiesCost + shippingCostNumber;

  // Return as a properly formatted number with 2 decimal places
  return totalPrice.toFixed(2);
};

export const getProductPrice = (
  productType: ProductType,
  quantity: number = 1
): number => {
  if (productType === ProductType.EBOOK) {
    return BOOK_PRICES.digital;
  }

  return BOOK_PRICES.physical + (quantity - 1) * BOOK_PRICES.base;
};

export const getTotalApiCredits = (imageGenerations: ImageGeneration[]) => {
  const totalApiCredit = imageGenerations.reduce((total, generation) => {
    return total + (generation.apiCreditCost || 0);
  }, 0);
  return totalApiCredit;
};

export const calculateTotalCost = (order: OrderFull) => {
  const shipping = order.shippingCost ? Number(order.shippingCost) : 0;
  const printing = order.printingCost ? Number(order.printingCost) : 0;
  const totalApiCredits = getTotalApiCredits(order.book.imageGenerations);
  const imagesCost = calculateApiCreditCost(totalApiCredits, LEONARDO_TIER);
  const totalCost = shipping + printing + imagesCost;
  return totalCost;
};
export const getTotalImagesCost = (imageGenerations: ImageGeneration[]) => {
  const totalApiCredit = imageGenerations.reduce((total, generation) => {
    return total + (generation.apiCreditCost || 0);
  }, 0);
  return calculateApiCreditCost(totalApiCredit, LEONARDO_TIER);
};

export const getStatusBadgeColor = (status: OrderStatus) => {
  switch (status) {
    case "PENDING":
      return "bg-yellow-100 text-yellow-800";
    case "PAID":
      return "bg-green-100 text-green-800";
    case "PRINTING":
      return "bg-purple-100 text-purple-800";
    case "SHIPPED":
      return "bg-indigo-100 text-indigo-800";
    case "FULFILLED":
      return "bg-green-600 text-white";
    case "CANCELLED":
      return "bg-red-100 text-red-800";
    case "REFUNDED":
      return "bg-orange-100 text-orange-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};
