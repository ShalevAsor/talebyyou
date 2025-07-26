import { ImageGeneration, OrderStatus, ProductType } from "@prisma/client";

import { calculateApiCreditCost, LEONARDO_TIER } from "@/constants/image";
import { PhysicalOrderFormData } from "@/schemas/checkout-schema";
import { OrderFull } from "@/types/order";
import { DiscountConfig, PricingConfig } from "@/types/pricing";
import { ShippingAddress } from "@/types/print";
import {
  calculateTotalOrderPrice,
  getAdditionalCopyPrice,
  getBasePrice,
  getFinalPrice,
} from "@/utils/pricingUtils";

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

/**
 * Get total price including shipping and discounts
 * Updated to support dynamic pricing and discounts
 */
export const getTotalPrice = (
  shippingCost: string | number,
  productType: ProductType,
  quantity: number = 1,
  pricing?: PricingConfig,
  discount?: DiscountConfig | null
): string => {
  // Convert shipping cost to a number if it's a string
  const shippingCostNumber =
    typeof shippingCost === "string" ? parseFloat(shippingCost) : shippingCost;

  // Use new pricing system
  const actualShippingCost =
    productType === ProductType.EBOOK ? 0 : shippingCostNumber;
  const orderTotal = calculateTotalOrderPrice(
    productType,
    quantity,
    actualShippingCost,
    pricing,
    discount
  );

  return orderTotal.totalPrice.toFixed(2);
};

/**
 * Get product price with discount support
 * Updated to support dynamic pricing and discounts with configurable additional copy price
 */
export const getProductPrice = (
  productType: ProductType,
  quantity: number = 1,
  pricing?: PricingConfig,
  discount?: DiscountConfig | null
): number => {
  // For physical books, we need to handle the additional copies pricing
  if (productType === ProductType.BOOK) {
    const basePrice = getBasePrice(productType, pricing);
    const additionalCopyPrice = getAdditionalCopyPrice(pricing);
    const additionalCopiesCost = (quantity - 1) * additionalCopyPrice;
    const totalBasePrice = basePrice + additionalCopiesCost;

    // Apply discount if available
    const priceDetails = getFinalPrice(productType, 1, pricing, discount);
    const discountPercentage = priceDetails.hasDiscount
      ? (priceDetails.basePrice - priceDetails.finalPrice) /
        priceDetails.basePrice
      : 0;

    return totalBasePrice * (1 - discountPercentage);
  }

  // For digital books, always use quantity = 1 for pricing (no quantity multiplier)
  const priceDetails = getFinalPrice(productType, 1, pricing, discount);
  return priceDetails.finalPrice;
};

/**
 * Get pricing details with discount information
 * Updated to use configurable additional copy pricing
 */
export const getPricingDetails = (
  productType: ProductType,
  quantity: number = 1,
  shippingCost: number = 0,
  pricing?: PricingConfig,
  discount?: DiscountConfig | null
) => {
  // Handle physical books with additional copy pricing
  if (productType === ProductType.BOOK && quantity > 1) {
    const basePrice = getBasePrice(productType, pricing);
    const additionalCopyPrice = getAdditionalCopyPrice(pricing);
    const additionalCopiesCost = (quantity - 1) * additionalCopyPrice;
    const totalBasePrice = basePrice + additionalCopiesCost;

    // Calculate discount on the total
    const priceDetails = getFinalPrice(productType, 1, pricing, discount);
    const discountPercentage = priceDetails.hasDiscount
      ? (priceDetails.basePrice - priceDetails.finalPrice) /
        priceDetails.basePrice
      : 0;

    const finalProductPrice = totalBasePrice * (1 - discountPercentage);
    const discountAmount = totalBasePrice - finalProductPrice;

    return {
      basePrice: totalBasePrice,
      discountAmount: discountAmount,
      finalPrice: finalProductPrice,
      shippingCost: shippingCost, // Physical books have shipping
      totalPrice: finalProductPrice + shippingCost,
      hasDiscount: priceDetails.hasDiscount,
    };
  }

  // For digital books or single physical book, use the pricing system directly
  const actualShippingCost =
    productType === ProductType.EBOOK ? 0 : shippingCost;
  const orderTotal = calculateTotalOrderPrice(
    productType,
    quantity,
    actualShippingCost,
    pricing,
    discount
  );

  return {
    basePrice: orderTotal.subtotal,
    discountAmount: orderTotal.discountAmount,
    finalPrice: orderTotal.subtotal - orderTotal.discountAmount,
    shippingCost: orderTotal.shippingCost,
    totalPrice: orderTotal.totalPrice,
    hasDiscount: orderTotal.hasDiscount,
  };
};

/**
 * Legacy function for backward compatibility
 * @deprecated Use getPricingDetails instead
 */
export const getProductPriceLegacy = (
  productType: ProductType
): { toString: () => string } => {
  const basePrice = getBasePrice(productType);
  return {
    toString: () => basePrice.toFixed(2),
  };
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
