/* Configuration keys for pricing and discounts */

export const PRICING_KEYS = {
  // Base prices
  PHYSICAL_BOOK_PRICE: "physical_book_base_price",
  DIGITAL_BOOK_PRICE: "digital_book_base_price",
  ADDITIONAL_COPY_PRICE: "additional_copy_base_price",
  // Discount settings
  DISCOUNT_ACTIVE: "discount_active",
  DISCOUNT_TYPE: "discount_type", // "PERCENTAGE" or "FIXED"
  DISCOUNT_VALUE: "discount_value", // "10" for 10% or "5.00" for $5
  DISCOUNT_NAME: "discount_name", // "Spring Sale"
  DISCOUNT_DESCRIPTION: "discount_description", // "Save 10% on all books"
  DISCOUNT_START_DATE: "discount_start_date", // ISO string
  DISCOUNT_END_DATE: "discount_end_date", // ISO string
  DISCOUNT_APPLICABLE_PRODUCTS: "discount_applicable_products", // "ALL", "PHYSICAL", "DIGITAL"

  // Banner settings
  DISCOUNT_BANNER_ENABLED: "discount_banner_enabled",
  DISCOUNT_BANNER_TEXT: "discount_banner_text",
} as const;

/* pricing configuration */

export type PricingConfig = {
  physicalBookPrice: string | number;
  digitalBookPrice: string | number;
  additionalCopyPrice: string | number;
};

export type DiscountConfig = {
  active: boolean;
  type: "PERCENTAGE" | "FIXED";
  value: string;
  name: string;
  description: string;
  startDate: string | null;
  endDate: string | null;
  applicableProducts: "ALL" | "PHYSICAL" | "DIGITAL";
  bannerEnabled: boolean;
  bannerText: string;
};

export type PricingStatusResult = {
  pricing: PricingConfig;
  discount: DiscountConfig;
  isDiscountActive: boolean;
};

/* Fallback prices */
export const BOOK_PRICES = {
  physical: 34.99,
  digital: 19.99,
  base: 25,
};

export interface PricingData {
  pricing: PricingConfig | undefined;
  discount: DiscountConfig | undefined;
  isDiscountActive: boolean;
  isLoading: boolean;
  error: string | null;
  refetch: () => void;
}
