import { useQuery } from "@tanstack/react-query";
import { getPricingStatus } from "@/actions/pricing-actions";
import { DiscountConfig } from "@/types/pricing";

interface UseDiscountStatusReturn {
  isDiscountActive: boolean;
  discount: DiscountConfig | null;
  isLoading: boolean;
  error: string | null;
}

/**
 * Lightweight hook for components that only need discount information
 * Perfect for banners, badges, or simple discount displays
 * Uses the same React Query cache as usePricing for efficiency
 */
export function useDiscountStatus(): UseDiscountStatusReturn {
  const { data, isLoading, error } = useQuery({
    queryKey: ["pricing"],
    queryFn: async () => {
      const result = await getPricingStatus();
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
    retryDelay: (attemptIndex) => Math.min(1000 * 2 ** attemptIndex, 30000),
    // Only select the fields we need for discount status
    select: (data) => ({
      isDiscountActive: data.isDiscountActive,
      discount: data.isDiscountActive ? data.discount : null,
    }),
  });

  return {
    isDiscountActive: data?.isDiscountActive || false,
    discount: data?.discount || null,
    isLoading,
    error: error?.message || null,
  };
}
