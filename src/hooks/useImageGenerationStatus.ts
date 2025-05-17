// import { useQuery } from "@tanstack/react-query";
// import { getBookImageGenerationsStatus } from "@/actions/image-actions";
// import { GenerationStatus } from "@/generated/prisma";

// export function useImageGenerationStatus(bookId: string | null) {
//   return useQuery({
//     queryKey: ["imageGenerations", bookId],
//     queryFn: async () => {
//       if (!bookId) throw new Error("Book ID is required");

//       const result = await getBookImageGenerationsStatus(bookId);

//       if (!result.success) {
//         throw new Error(result.error);
//       }

//       return result.data;
//     },
//     enabled: !!bookId,
//     refetchInterval: (query) => {
//       const data = query.state.data;
//       if (!data) return false;

//       // Only poll if there are pending generations
//       const hasPending =
//         data.coverGeneration?.coverStatus === GenerationStatus.PENDING ||
//         data.pageGenerations?.some(
//           (gen) => gen.status === GenerationStatus.PENDING
//         );

//       return hasPending ? 5000 : false;
//     },
//     refetchIntervalInBackground: false,
//     refetchOnWindowFocus: false,
//     refetchOnMount: true, // Always check on mount
//     staleTime: 1000, // Consider data stale after 1 second
//   });
// }
import { useQuery } from "@tanstack/react-query";
import { getBookImageGenerationsStatus } from "@/actions/image-actions";
import { useCallback } from "react";
import { BookImageGenerationsStatus, GenerationStatus } from "@/types/image";

/**
 * Hook to fetch and monitor the status of image generation for a book
 * Automatically polls when images are being generated
 *
 * @param bookId - The ID of the book to check image generation status for
 * @returns Query object containing image generation status
 */
export function useImageGenerationStatus(bookId: string | null) {
  // Memoize query function to prevent unnecessary recreations
  const fetchGenerationStatus =
    useCallback(async (): Promise<BookImageGenerationsStatus> => {
      if (!bookId) throw new Error("Book ID is required");

      const result = await getBookImageGenerationsStatus(bookId);

      if (!result.success) {
        throw new Error(result.error);
      }

      return result.data;
    }, [bookId]);

  // Calculate if any generation is pending (memoized for performance)
  const isGenerationPending = useCallback(
    (data: BookImageGenerationsStatus | undefined): boolean => {
      if (!data) return false;

      // Check if cover generation is pending
      const isCoverPending = data.coverGeneration
        ? data.coverGeneration.coverStatus === GenerationStatus.PENDING
        : false;

      // Check if any page generation is pending
      const isAnyPagePending = data.pageGenerations
        ? data.pageGenerations.some(
            (gen) => gen.status === GenerationStatus.PENDING
          )
        : false;

      return isCoverPending || isAnyPagePending;
    },
    []
  );

  return useQuery<
    BookImageGenerationsStatus,
    Error,
    BookImageGenerationsStatus & { isGenerationComplete: boolean }
  >({
    queryKey: ["imageGenerations", bookId],
    queryFn: fetchGenerationStatus,
    enabled: !!bookId,
    refetchInterval: (query) => {
      return isGenerationPending(query.state.data) ? 5000 : false;
    },
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true, // Always check on mount
    staleTime: 1000, // Consider data stale after 1 second
    retry: 2, // Retry failed requests twice

    // Transform the data with proper types, adding the convenience property
    select: (data: BookImageGenerationsStatus) => {
      return {
        ...data,
        isGenerationComplete: !isGenerationPending(data),
      };
    },
  });
}
