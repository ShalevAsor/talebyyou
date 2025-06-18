"use client";
import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { usePricing } from "@/hooks/usePricing";

interface PricingDisplayProps {
  variant: "hero" | "library";
  showDiscount?: boolean;
  compact?: boolean;
  className?: string;
}

export const PricingDisplay: React.FC<PricingDisplayProps> = ({
  variant,
  showDiscount = true,
  compact = false,
  className,
}) => {
  const { pricing, discount, isDiscountActive, isLoading } = usePricing();

  // Show loading state
  if (isLoading || !pricing) {
    return (
      <div className={cn("text-center", className)}>
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-24 mx-auto"></div>
        </div>
      </div>
    );
  }

  const physicalPrice =
    typeof pricing.physicalBookPrice === "string"
      ? parseFloat(pricing.physicalBookPrice)
      : pricing.physicalBookPrice;
  const ebookPrice =
    typeof pricing.digitalBookPrice === "string"
      ? parseFloat(pricing.digitalBookPrice)
      : pricing.digitalBookPrice;

  // Calculate discounted prices if discount is active
  let discountedPhysicalPrice = physicalPrice;
  let discountedEbookPrice = ebookPrice;
  let discountPercentage = 0;
  let discountAmount = 0;

  if (showDiscount && isDiscountActive && discount) {
    if (discount.type === "PERCENTAGE") {
      discountPercentage = parseFloat(discount.value);
      discountedPhysicalPrice = physicalPrice * (1 - discountPercentage / 100);
      discountedEbookPrice = ebookPrice * (1 - discountPercentage / 100);
    } else if (discount.type === "FIXED") {
      discountAmount = parseFloat(discount.value);
      discountedPhysicalPrice = Math.max(0, physicalPrice - discountAmount);
      discountedEbookPrice = Math.max(0, ebookPrice - discountAmount);
    }
  }

  if (variant === "hero") {
    return (
      <div className={cn("space-y-3", className)}>
        <div className="relative">
          {/* Pricing display with right-aligned badge */}
          <div className="inline-flex items-center justify-center gap-4 bg-white/80 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-200 shadow-sm">
            {/* Digital Book Option */}
            <div className="flex items-center gap-2">
              <div className="text-lg">📱</div>
              <div className="text-left">
                <div className="text-xs text-gray-600">Digital</div>
                <div className="flex items-center gap-1">
                  {showDiscount && isDiscountActive ? (
                    <>
                      <span className="text-xs line-through text-gray-400">
                        ${ebookPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-indigo-600">
                        ${discountedEbookPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-indigo-600">
                      ${ebookPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Separator */}
            <div className="w-px h-8 bg-gray-200"></div>

            {/* Physical Book Option */}
            <div className="flex items-center gap-2">
              <div className="text-lg">📚</div>
              <div className="text-left">
                <div className="text-xs text-gray-600">Printed</div>
                <div className="flex items-center gap-1">
                  {showDiscount && isDiscountActive ? (
                    <>
                      <span className="text-xs line-through text-gray-400">
                        ${physicalPrice.toFixed(2)}
                      </span>
                      <span className="text-sm font-bold text-emerald-600">
                        ${discountedPhysicalPrice.toFixed(2)}
                      </span>
                    </>
                  ) : (
                    <span className="text-sm font-bold text-emerald-600">
                      ${physicalPrice.toFixed(2)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Badge positioned above and to the right */}
          {showDiscount && isDiscountActive && discount && (
            <div className="absolute -top-7">
              <Badge
                variant="secondary"
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-purple-600 hover:to-pink-600 font-medium px-3 py-1 text-xs animate-pulse"
              >
                {discount.type === "PERCENTAGE"
                  ? `🎉 Save ${discountPercentage}% Today!`
                  : `🎉 Save ${discountAmount} Today!`}
              </Badge>
            </div>
          )}
        </div>

        <div className="text-xs text-gray-500">
          Printed books include digital copy • Instant download • Full
          customization
        </div>
      </div>
    );
  }

  if (variant === "library") {
    if (compact) {
      return (
        <div className={cn("flex items-center gap-2 text-sm", className)}>
          {showDiscount && isDiscountActive ? (
            <>
              <span className="line-through text-gray-400">
                ${ebookPrice.toFixed(2)}
              </span>
              <span className="font-semibold text-indigo-600">
                ${discountedEbookPrice.toFixed(2)}+
              </span>
            </>
          ) : (
            <span className="font-semibold text-indigo-600">
              ${ebookPrice.toFixed(2)}+
            </span>
          )}
        </div>
      );
    }

    return (
      <Card className={cn("border-indigo-100", className)}>
        <CardContent className="p-4">
          <div className="space-y-3">
            {showDiscount && isDiscountActive && discount && (
              <Badge
                variant="secondary"
                className="bg-purple-100 text-purple-700 hover:bg-purple-200"
              >
                {discount.type === "PERCENTAGE"
                  ? `${discountPercentage}% OFF`
                  : `$${discountAmount} OFF`}
              </Badge>
            )}

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Digital Book</span>
                <div className="flex items-center gap-2">
                  {showDiscount && isDiscountActive && (
                    <span className="text-xs line-through text-gray-400">
                      ${ebookPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="font-semibold text-indigo-600">
                    $
                    {showDiscount && isDiscountActive
                      ? discountedEbookPrice.toFixed(2)
                      : ebookPrice.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Printed Book</span>
                <div className="flex items-center gap-2">
                  {showDiscount && isDiscountActive && (
                    <span className="text-xs line-through text-gray-400">
                      ${physicalPrice.toFixed(2)}
                    </span>
                  )}
                  <span className="font-semibold text-indigo-600">
                    $
                    {showDiscount && isDiscountActive
                      ? discountedPhysicalPrice.toFixed(2)
                      : physicalPrice.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              Printed books include digital copy
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return null;
};

export default PricingDisplay;
