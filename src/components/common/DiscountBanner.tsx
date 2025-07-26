"use client";
import { Clock, Tag } from "lucide-react";

import { useDiscountStatus } from "@/hooks/useDiscountStatus";
import {
  getDiscountDisplayText,
  getDiscountTimeRemaining,
} from "@/utils/pricingUtils";

/**
 * Simple server-rendered discount banner component
 * Shows when discount is active and banner is enabled
 * No dismiss functionality - appears/disappears based on admin settings
 */
export function DiscountBanner() {
  const { isDiscountActive, discount, isLoading } = useDiscountStatus();

  // Don't render anything while loading
  if (isLoading) {
    return null;
  }

  // Don't show banner if:
  // - Discount is not active
  // - Banner is disabled
  // - No discount data
  if (!isDiscountActive || !discount || !discount.bannerEnabled) {
    return null;
  }

  // Get countdown information if discount has an end date
  const timeRemaining = discount.endDate
    ? getDiscountTimeRemaining(discount)
    : null;

  // Determine banner text - use custom text or generate from discount data
  const bannerText =
    discount.bannerText ||
    `${discount.name} - ${getDiscountDisplayText(discount)}`;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center py-3">
          <div className="flex items-center space-x-3">
            <Tag className="w-5 h-5 flex-shrink-0" />

            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-4">
              <span className="font-semibold text-sm sm:text-base text-center sm:text-left">
                {bannerText}
              </span>

              {timeRemaining && timeRemaining.timeRemaining !== "Expired" && (
                <div className="flex items-center justify-center space-x-1 text-sm bg-white/20 px-2 py-1 rounded-full">
                  <Clock className="w-3 h-3" />
                  <span className="font-medium">
                    {timeRemaining.isExpiring ? "⚡ " : ""}
                    {timeRemaining.timeRemaining} left
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
