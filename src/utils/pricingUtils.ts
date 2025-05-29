import { ProductType } from "@prisma/client";
import { PricingConfig, DiscountConfig, BOOK_PRICES } from "@/types/pricing";

/**
 * Convert price to number for calculations
 */
function toNumber(price: string | number): number {
  if (typeof price === "number") {
    return price;
  }
  const parsed = parseFloat(price);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Get base price for a product type
 */
export function getBasePrice(
  productType: ProductType,
  pricing?: PricingConfig
): number {
  if (!pricing) {
    return productType === ProductType.BOOK
      ? BOOK_PRICES.physical
      : BOOK_PRICES.digital;
  }

  const price =
    productType === ProductType.BOOK
      ? pricing.physicalBookPrice
      : pricing.digitalBookPrice;

  return toNumber(price);
}

/**
 * Get additional copy price from pricing config or fallback
 */
export function getAdditionalCopyPrice(pricing?: PricingConfig): number {
  if (!pricing?.additionalCopyPrice) {
    return BOOK_PRICES.base; // Fallback to constant
  }

  return toNumber(pricing.additionalCopyPrice);
}

/**
 * Check if discount applies to a specific product type
 */
export function isDiscountApplicable(
  productType: ProductType,
  discount: DiscountConfig
): boolean {
  if (!discount.active) {
    return false;
  }

  switch (discount.applicableProducts) {
    case "ALL":
      return true;
    case "PHYSICAL":
      return productType === ProductType.BOOK;
    case "DIGITAL":
      return productType === ProductType.EBOOK;
    default:
      return false;
  }
}

/**
 * Check if discount is currently within valid date range
 */
export function isDiscountDateValid(discount: DiscountConfig): boolean {
  if (!discount.startDate || !discount.endDate) {
    return true; // No date restrictions
  }

  const now = new Date();
  const startDate = new Date(discount.startDate);
  const endDate = new Date(discount.endDate);

  return now >= startDate && now <= endDate;
}

/**
 * Check if discount is currently active (combines all checks)
 */
export function isDiscountActive(
  productType: ProductType,
  discount: DiscountConfig
): boolean {
  return (
    discount.active &&
    isDiscountApplicable(productType, discount) &&
    isDiscountDateValid(discount)
  );
}

/**
 * Calculate discount amount for a given price
 */
export function calculateDiscountAmount(
  basePrice: number,
  discount: DiscountConfig
): number {
  const discountValue = toNumber(discount.value);

  if (discount.type === "PERCENTAGE") {
    return (basePrice * discountValue) / 100;
  } else {
    // FIXED discount
    return Math.min(discountValue, basePrice); // Can't discount more than the price
  }
}

/**
 * Apply discount to a price and return the discounted price
 */
export function applyDiscount(
  basePrice: number,
  discount: DiscountConfig | null,
  productType: ProductType
): number {
  if (!discount || !isDiscountActive(productType, discount)) {
    return basePrice;
  }

  const discountAmount = calculateDiscountAmount(basePrice, discount);
  const discountedPrice = basePrice - discountAmount;

  // Ensure price never goes below 0
  return Math.max(0, discountedPrice);
}

/**
 * Get the final price for a product (with discount applied if applicable)
 * Updated to handle physical books with multiple copies correctly
 */
export function getFinalPrice(
  productType: ProductType,
  quantity: number = 1,
  pricing?: PricingConfig,
  discount?: DiscountConfig | null
): {
  basePrice: number;
  discountAmount: number;
  finalPrice: number;
  hasDiscount: boolean;
} {
  if (productType === ProductType.BOOK) {
    // For physical books, handle complex pricing with additional copies
    const basePrice = getBasePrice(productType, pricing);
    const additionalCopyPrice = getAdditionalCopyPrice(pricing);
    const additionalCopiesCost = (quantity - 1) * additionalCopyPrice;
    const totalBasePrice = basePrice + additionalCopiesCost;

    const hasDiscount = discount
      ? isDiscountActive(productType, discount)
      : false;

    let discountAmount = 0;
    let finalPrice = totalBasePrice;

    if (hasDiscount && discount) {
      // Calculate discount percentage based on the first copy price
      const firstCopyDiscountAmount = calculateDiscountAmount(
        basePrice,
        discount
      );
      const discountPercentage = firstCopyDiscountAmount / basePrice;

      // Apply the same percentage to the total price
      discountAmount = totalBasePrice * discountPercentage;
      finalPrice = totalBasePrice - discountAmount;
    }

    return {
      basePrice: totalBasePrice,
      discountAmount,
      finalPrice,
      hasDiscount,
    };
  } else {
    // For digital books, use simple pricing (no quantity multiplier)
    const basePrice = getBasePrice(productType, pricing);
    const hasDiscount = discount
      ? isDiscountActive(productType, discount)
      : false;

    let discountAmount = 0;
    let finalPrice = basePrice;

    if (hasDiscount && discount) {
      discountAmount = calculateDiscountAmount(basePrice, discount);
      finalPrice = applyDiscount(basePrice, discount, productType);
    }

    return {
      basePrice,
      discountAmount,
      finalPrice,
      hasDiscount,
    };
  }
}

/**
 * Calculate total order price including shipping
 */
export function calculateTotalOrderPrice(
  productType: ProductType,
  quantity: number = 1,
  shippingCost: number = 0,
  pricing?: PricingConfig,
  discount?: DiscountConfig | null
): {
  subtotal: number;
  discountAmount: number;
  shippingCost: number;
  totalPrice: number;
  hasDiscount: boolean;
} {
  const priceDetails = getFinalPrice(productType, quantity, pricing, discount);
  const totalPrice = priceDetails.finalPrice + shippingCost;

  return {
    subtotal: priceDetails.basePrice,
    discountAmount: priceDetails.discountAmount,
    shippingCost,
    totalPrice,
    hasDiscount: priceDetails.hasDiscount,
  };
}

/**
 * Format price for display
 */
export function formatPrice(price: number, currency: string = "USD"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(price);
}

/**
 * Get discount display text for UI
 */
export function getDiscountDisplayText(discount: DiscountConfig): string {
  const value = toNumber(discount.value);

  if (discount.type === "PERCENTAGE") {
    return `${value}% OFF`;
  } else {
    return `$${value.toFixed(2)} OFF`;
  }
}

/**
 * Get savings text for display
 */
export function getSavingsText(
  basePrice: number,
  finalPrice: number,
  discount: DiscountConfig
): string {
  const savings = basePrice - finalPrice;

  if (discount.type === "PERCENTAGE") {
    const percentage = toNumber(discount.value);
    return `Save ${percentage}% (${formatPrice(savings)})`;
  } else {
    return `Save ${formatPrice(savings)}`;
  }
}

/**
 * Calculate time remaining for discount
 */
export function getDiscountTimeRemaining(discount: DiscountConfig): {
  isExpiring: boolean;
  timeRemaining: string | null;
  days: number;
  hours: number;
  minutes: number;
} | null {
  if (!discount.endDate) {
    return null;
  }

  const now = new Date();
  const endDate = new Date(discount.endDate);
  const timeDiff = endDate.getTime() - now.getTime();

  if (timeDiff <= 0) {
    return {
      isExpiring: true,
      timeRemaining: "Expired",
      days: 0,
      hours: 0,
      minutes: 0,
    };
  }

  const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));

  let timeRemaining = "";
  if (days > 0) {
    timeRemaining = `${days}d ${hours}h`;
  } else if (hours > 0) {
    timeRemaining = `${hours}h ${minutes}m`;
  } else {
    timeRemaining = `${minutes}m`;
  }

  return {
    isExpiring: days === 0 && hours < 24, // Less than 24 hours remaining
    timeRemaining,
    days,
    hours,
    minutes,
  };
}

/**
 * Legacy function to maintain compatibility with existing orderUtils
 * @deprecated Use getFinalPrice instead
 */
export function getProductPrice(productType: ProductType): {
  toString: () => string;
} {
  const basePrice = getBasePrice(productType);
  return {
    toString: () => basePrice.toFixed(2),
  };
}

/**
 * Legacy function to maintain compatibility with existing orderUtils
 * @deprecated Use calculateTotalOrderPrice instead
 */
export function getTotalPrice(
  shippingCost: number,
  productType: ProductType,
  quantity: number = 1
): string {
  const basePrice = getBasePrice(productType);
  const total = basePrice * quantity + shippingCost;
  return total.toFixed(2);
}
