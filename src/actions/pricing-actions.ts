"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import {
  BOOK_PRICES,
  DiscountConfig,
  PRICING_KEYS,
  PricingConfig,
  PricingStatusResult,
} from "@/types/pricing";

/**
 * Get current pricing and discount configuration
 */
export async function getPricingStatus(): Promise<
  ActionResult<PricingStatusResult>
> {
  try {
    // Get all pricing-related configurations
    const configs = await prisma.configuration.findMany({
      where: {
        key: {
          in: Object.values(PRICING_KEYS),
        },
      },
    });

    // Convert array to object for easy access
    const configMap = configs.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {} as Record<string, string>);

    const pricingConfig: PricingConfig = {
      physicalBookPrice:
        configMap[PRICING_KEYS.PHYSICAL_BOOK_PRICE] || BOOK_PRICES.physical,
      digitalBookPrice:
        configMap[PRICING_KEYS.DIGITAL_BOOK_PRICE] || BOOK_PRICES.digital,
      additionalCopyPrice:
        configMap[PRICING_KEYS.ADDITIONAL_COPY_PRICE] || BOOK_PRICES.base,
    };

    const discountConfig: DiscountConfig = {
      active: configMap[PRICING_KEYS.DISCOUNT_ACTIVE] === "true",
      type:
        (configMap[PRICING_KEYS.DISCOUNT_TYPE] as "PERCENTAGE" | "FIXED") ||
        "PERCENTAGE",
      value: configMap[PRICING_KEYS.DISCOUNT_VALUE] || "0",
      name: configMap[PRICING_KEYS.DISCOUNT_NAME] || "",
      description: configMap[PRICING_KEYS.DISCOUNT_DESCRIPTION] || "",
      startDate: configMap[PRICING_KEYS.DISCOUNT_START_DATE] || null,
      endDate: configMap[PRICING_KEYS.DISCOUNT_END_DATE] || null,
      applicableProducts:
        (configMap[PRICING_KEYS.DISCOUNT_APPLICABLE_PRODUCTS] as
          | "ALL"
          | "PHYSICAL"
          | "DIGITAL") || "ALL",
      bannerEnabled: configMap[PRICING_KEYS.DISCOUNT_BANNER_ENABLED] === "true",
      bannerText: configMap[PRICING_KEYS.DISCOUNT_BANNER_TEXT] || "",
    };

    // Check if discount is currently active based on dates
    const now = new Date();
    let isDiscountActive = discountConfig.active;

    if (
      isDiscountActive &&
      discountConfig.startDate &&
      discountConfig.endDate
    ) {
      const startDate = new Date(discountConfig.startDate);
      const endDate = new Date(discountConfig.endDate);
      isDiscountActive = now >= startDate && now <= endDate;
    }

    return createSuccessResult({
      pricing: pricingConfig,
      discount: discountConfig,
      isDiscountActive,
    });
  } catch (error) {
    console.error("Failed to get pricing status:", error);
    return createErrorResult("Failed to get pricing status");
  }
}

/**
 * Update base prices for products
 */
export async function updateBasePrices({
  physicalBookPrice,
  digitalBookPrice,
  additionalCopyPrice,
}: {
  physicalBookPrice: string;
  digitalBookPrice: string;
  additionalCopyPrice: string;
}): Promise<ActionResult<{ updated: boolean }>> {
  try {
    // Validate prices are valid numbers
    const physicalPrice = parseFloat(physicalBookPrice);
    const digitalPrice = parseFloat(digitalBookPrice);
    const additionalPrice = parseFloat(additionalCopyPrice);
    if (isNaN(physicalPrice) || physicalPrice <= 0) {
      return createErrorResult(
        "Physical book price must be a valid positive number"
      );
    }

    if (isNaN(digitalPrice) || digitalPrice <= 0) {
      return createErrorResult(
        "Digital book price must be a valid positive number"
      );
    }
    if (isNaN(additionalPrice) || additionalPrice <= 0) {
      // ← Add validation
      return createErrorResult(
        "Additional copy price must be a valid positive number"
      );
    }
    const updates: Array<{
      key: string;
      value: string;
      description: string;
    }> = [
      {
        key: PRICING_KEYS.PHYSICAL_BOOK_PRICE,
        value: physicalPrice.toFixed(2),
        description: "Base price for physical books",
      },
      {
        key: PRICING_KEYS.DIGITAL_BOOK_PRICE,
        value: digitalPrice.toFixed(2),
        description: "Base price for digital books",
      },
      {
        key: PRICING_KEYS.ADDITIONAL_COPY_PRICE, // ← Add this
        value: additionalPrice.toFixed(2),
        description: "Base price for additional copies of physical books",
      },
    ];

    // Use Promise.all for efficient parallel updates
    await Promise.all(
      updates.map((update) =>
        prisma.configuration.upsert({
          where: { key: update.key },
          update: {
            value: update.value,
            updatedAt: new Date(),
          },
          create: update,
        })
      )
    );

    revalidatePath("/admin");
    revalidatePath("/"); // Revalidate home page for price changes

    return createSuccessResult(
      { updated: true },
      "Base prices updated successfully"
    );
  } catch (error) {
    console.error("Failed to update base prices:", error);
    return createErrorResult("Failed to update base prices");
  }
}

/**
 * Toggle discount active/inactive
 */
export async function toggleDiscount(
  enabled: boolean
): Promise<ActionResult<{ enabled: boolean }>> {
  try {
    await prisma.configuration.upsert({
      where: { key: PRICING_KEYS.DISCOUNT_ACTIVE },
      update: {
        value: enabled.toString(),
        updatedAt: new Date(),
      },
      create: {
        key: PRICING_KEYS.DISCOUNT_ACTIVE,
        value: enabled.toString(),
        description: "Controls whether discount is active",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/"); // Revalidate for price changes

    return createSuccessResult(
      { enabled },
      `Discount ${enabled ? "activated" : "deactivated"}`
    );
  } catch (error) {
    console.error("Failed to toggle discount:", error);
    return createErrorResult("Failed to toggle discount");
  }
}

/**
 * Update discount settings
 */
export async function updateDiscountSettings({
  type,
  value,
  name,
  description,
  startDate,
  endDate,
  applicableProducts,
}: {
  type: "PERCENTAGE" | "FIXED";
  value: string;
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  applicableProducts: "ALL" | "PHYSICAL" | "DIGITAL";
}): Promise<ActionResult<{ updated: boolean }>> {
  try {
    // Validate discount value
    const discountValue = parseFloat(value);
    if (isNaN(discountValue) || discountValue <= 0) {
      return createErrorResult(
        "Discount value must be a valid positive number"
      );
    }

    if (type === "PERCENTAGE" && discountValue >= 100) {
      return createErrorResult("Percentage discount must be less than 100%");
    }

    // Validate dates if provided
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (start >= end) {
        return createErrorResult("End date must be after start date");
      }
    }

    const updates: Array<{
      key: string;
      value: string;
      description: string;
    }> = [
      {
        key: PRICING_KEYS.DISCOUNT_TYPE,
        value: type,
        description: "Type of discount (PERCENTAGE or FIXED)",
      },
      {
        key: PRICING_KEYS.DISCOUNT_VALUE,
        value: discountValue.toString(),
        description: "Discount value (percentage or fixed amount)",
      },
      {
        key: PRICING_KEYS.DISCOUNT_NAME,
        value: name,
        description: "Display name for the discount",
      },
      {
        key: PRICING_KEYS.DISCOUNT_DESCRIPTION,
        value: description,
        description: "Description of the discount",
      },
      {
        key: PRICING_KEYS.DISCOUNT_START_DATE,
        value: startDate || "",
        description: "Discount start date (ISO string)",
      },
      {
        key: PRICING_KEYS.DISCOUNT_END_DATE,
        value: endDate || "",
        description: "Discount end date (ISO string)",
      },
      {
        key: PRICING_KEYS.DISCOUNT_APPLICABLE_PRODUCTS,
        value: applicableProducts,
        description: "Which products the discount applies to",
      },
    ];

    await Promise.all(
      updates.map((update) =>
        prisma.configuration.upsert({
          where: { key: update.key },
          update: {
            value: update.value,
            updatedAt: new Date(),
          },
          create: update,
        })
      )
    );

    revalidatePath("/admin");
    revalidatePath("/");

    return createSuccessResult(
      { updated: true },
      "Discount settings updated successfully"
    );
  } catch (error) {
    console.error("Failed to update discount settings:", error);
    return createErrorResult("Failed to update discount settings");
  }
}

/**
 * Update discount banner settings
 */
export async function updateDiscountBanner({
  enabled,
  text,
}: {
  enabled: boolean;
  text: string;
}): Promise<ActionResult<{ updated: boolean }>> {
  try {
    const updates: Array<{
      key: string;
      value: string;
      description: string;
    }> = [
      {
        key: PRICING_KEYS.DISCOUNT_BANNER_ENABLED,
        value: enabled.toString(),
        description: "Whether to show discount banner",
      },
      {
        key: PRICING_KEYS.DISCOUNT_BANNER_TEXT,
        value: text,
        description: "Text to display in discount banner",
      },
    ];

    await Promise.all(
      updates.map((update) =>
        prisma.configuration.upsert({
          where: { key: update.key },
          update: {
            value: update.value,
            updatedAt: new Date(),
          },
          create: update,
        })
      )
    );

    revalidatePath("/admin");
    revalidatePath("/");

    return createSuccessResult(
      { updated: true },
      "Banner settings updated successfully"
    );
  } catch (error) {
    console.error("Failed to update banner settings:", error);
    return createErrorResult("Failed to update banner settings");
  }
}

/**
 * Helper function to check if discount is currently active (for use in pricing calculations)
 */
export async function getActiveDiscount(): Promise<DiscountConfig | null> {
  try {
    const result = await getPricingStatus();
    if (result.success && result.data.isDiscountActive) {
      return result.data.discount;
    }
    return null;
  } catch (error) {
    console.error("Failed to get active discount:", error);
    return null;
  }
}
