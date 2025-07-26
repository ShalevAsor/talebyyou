import { useQueryClient } from "@tanstack/react-query";
import React from "react";

import { PricingStatusResult } from "@/types/pricing";

interface UsePricingMutationsReturn {
  invalidatePricing: () => Promise<void>;
  refetchPricing: () => Promise<void>;
  updatePricingCache: (
    updater: (oldData: PricingStatusResult | undefined) => PricingStatusResult
  ) => void;
}

/**
 * Hook for admin components to manage pricing cache after mutations
 * Ensures UI updates immediately when admin changes prices/discounts
 */
export function usePricingMutations(): UsePricingMutationsReturn {
  const queryClient = useQueryClient();

  /**
   * Invalidate pricing cache - triggers a fresh fetch
   * Use after updating pricing settings in admin
   */
  const invalidatePricing = async (): Promise<void> => {
    await queryClient.invalidateQueries({
      queryKey: ["pricing"],
    });
  };

  /**
   * Refetch pricing data immediately
   * Use when you need fresh data right away
   */
  const refetchPricing = async (): Promise<void> => {
    await queryClient.refetchQueries({
      queryKey: ["pricing"],
    });
  };

  /**
   * Optimistically update pricing cache without refetching
   * Use for immediate UI updates before server response
   */
  const updatePricingCache = (
    updater: (oldData: PricingStatusResult | undefined) => PricingStatusResult
  ): void => {
    queryClient.setQueryData(["pricing"], updater);
  };

  return {
    invalidatePricing,
    refetchPricing,
    updatePricingCache,
  };
}

/**
 * Helper hook for admin forms to handle pricing mutations with loading states
 * Combines mutations with loading/error states
 */
export function usePricingMutationWithState() {
  const { invalidatePricing } = usePricingMutations();
  const [isInvalidating, setIsInvalidating] = React.useState(false);

  const invalidateWithLoading = async (): Promise<void> => {
    setIsInvalidating(true);
    try {
      await invalidatePricing();
    } finally {
      setIsInvalidating(false);
    }
  };

  return {
    invalidatePricing: invalidateWithLoading,
    isInvalidating,
  };
}
