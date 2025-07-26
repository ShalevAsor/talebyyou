import { useQuery } from "@tanstack/react-query";

import { getPricingStatus } from "@/actions/pricing-actions";
import { PricingData } from "@/types/pricing";

/**
 * Custom hook to fetch and manage pricing data using React Query
 * Provides pricing configuration, discount information, and loading states
 */
export function usePricing(): PricingData {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const result = await getPricingStatus();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes - pricing doesn't change often
    gcTime: 10 * 60 * 1000, // 10 minutes - keep in cache longer
    retry: 2, // Retry failed requests twice
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000), // Exponential backoff
  });

  return {
    pricing: data?.pricing || undefined, // was: || null
    discount: data?.isDiscountActive ? data.discount : undefined, // was: || null
    isDiscountActive: data?.isDiscountActive || false,
    isLoading,
    error: error?.message || null,
    refetch,
  };
}

/**
 * Hook for components that only need to check if discount is active
 * Lighter version when you don't need full pricing data
 */
export function useDiscountStatus() {
  const { isDiscountActive, discount, isLoading } = usePricing();

  return {
    isDiscountActive,
    discount,
    isLoading,
  };
}

/**
 * Hook for admin components that need to invalidate pricing cache
 * Use after updating pricing settings
 */
export function usePricingMutations() {
  const { refetch } = usePricing();

  const invalidatePricing = () => {
    refetch();
  };

  return {
    invalidatePricing,
  };
}
