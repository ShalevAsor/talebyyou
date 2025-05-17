// import { useQuery } from "@tanstack/react-query";
// import { checkGuestBookLimit } from "@/actions/guest-actions";
// import { checkUserBookLimit } from "@/actions/user-actions";
// import { BOOK_CREATION_LIMIT } from "@/constants/bookConstants";
// import { useAuth } from "@clerk/nextjs";

// export function useBookLimit() {
//   const { userId } = useAuth();

//   const { data, isLoading, error } = useQuery({
//     queryKey: ["bookLimit", !!userId], // Include userId in the query key
//     queryFn: async () => {
//       // Call the appropriate limit check function based on authentication status
//       const result = userId
//         ? await checkUserBookLimit()
//         : await checkGuestBookLimit();

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       return result.data;
//     },
//     staleTime: 1000 * 60 * 5, // Cache for 5 minutes
//   });

//   return {
//     canCreate: data?.canCreate ?? true,
//     remainingBooks: data?.remainingBooks ?? BOOK_CREATION_LIMIT,
//     totalCreated: data?.totalCreated ?? 0,
//     message: data?.message,
//     isLoading,
//     error,
//   };
// }
import { useQuery } from "@tanstack/react-query";
import { checkGuestBookLimit } from "@/actions/guest-actions";
import { checkUserBookLimit } from "@/actions/user-actions";
import { BOOK_CREATION_LIMIT } from "@/constants/bookConstants";
import { useAuth } from "@clerk/nextjs";
import { logger } from "@/lib/logger";

// Define the return type for better type safety
interface BookLimitResult {
  canCreate: boolean;
  remainingBooks: number;
  totalCreated: number;
  message?: string;
}

/**
 * Hook to check book creation limits for the current user
 * Handles both authenticated users and guest sessions
 */
export function useBookLimit() {
  const { isSignedIn, isLoaded } = useAuth();

  const {
    data,
    isLoading: isLoadingQuery,
    error,
    refetch,
    isRefetching,
  } = useQuery({
    queryKey: ["bookLimit", isSignedIn], // Use isSignedIn to be more explicit
    queryFn: async () => {
      try {
        // Only proceed with the check if auth state is loaded
        if (!isLoaded) {
          throw new Error("Authentication state not loaded yet");
        }

        // Call the appropriate limit check function based on authentication status
        const result = isSignedIn
          ? await checkUserBookLimit()
          : await checkGuestBookLimit();

        if (!result.success) {
          throw new Error(result.error);
        }

        logger.debug(
          {
            isSignedIn,
            canCreate: result.data.canCreate,
            remainingBooks: result.data.remainingBooks,
          },
          "Book limit check completed"
        );

        return result.data;
      } catch (error) {
        logger.error({ error }, "Failed to check book limits");
        throw error;
      }
    },
    enabled: isLoaded, // Only run query when auth state is loaded
    staleTime: 1000 * 60 * 5, // Cache for 5 minutes
    retry: 2, // Retry failed requests up to 2 times
  });

  // Calculate loading state (either query loading or auth not loaded)
  const isLoading = isLoadingQuery || !isLoaded;

  // Default values with explicit types
  const defaultValues: BookLimitResult = {
    canCreate: true, // Default to allowing creation
    remainingBooks: BOOK_CREATION_LIMIT,
    totalCreated: 0,
  };

  // Return values with fallbacks
  return {
    // Book limit data
    canCreate: data?.canCreate ?? defaultValues.canCreate,
    remainingBooks: data?.remainingBooks ?? defaultValues.remainingBooks,
    totalCreated: data?.totalCreated ?? defaultValues.totalCreated,
    message: data?.message,

    // Status
    isLoading,
    isRefetching,
    error: error instanceof Error ? error.message : String(error || ""),

    // Actions
    checkAgain: refetch, // Provide a way to manually refresh
  };
}
