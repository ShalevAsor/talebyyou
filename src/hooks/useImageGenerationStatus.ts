import { useQuery } from "@tanstack/react-query";
import { useCallback } from "react";

import { getBookImageGenerationsStatus } from "@/actions/image-actions";
import { BookImageGenerationsStatus, GenerationStatus } from "@/types/image";

/**
 * Hook to fetch and monitor the status of image generation for a book
 * Automatically polls when images are being generated
 *
 * @param bookId - The ID of the book to check image generation status for
 * @returns Query object containing image generation status
 */
export function useImageGenerationStatus(bookId: string | null) {
  const fetchGenerationStatus =
    useCallback(async (): Promise<BookImageGenerationsStatus> => {
      if (!bookId) throw new Error("Book ID is required");
      const result = await getBookImageGenerationsStatus(bookId);
      if (!result.success) {
        throw new Error(result.error);
      }
      return result.data;
    }, [bookId]);

  const isGenerationPending = useCallback(
    (data: BookImageGenerationsStatus | undefined): boolean => {
      if (!data) return false;
      const isCoverPending = data.coverGeneration
        ? data.coverGeneration.coverStatus === GenerationStatus.PENDING
        : false;
      const isAnyPagePending = data.pageGenerations
        ? data.pageGenerations.some(
            (gen) => gen.status === GenerationStatus.PENDING
          )
        : false;
      return isCoverPending || isAnyPagePending;
    },
    []
  );

  return useQuery({
    queryKey: ["imageGenerations", bookId],
    queryFn: fetchGenerationStatus,
    enabled: !!bookId,
    refetchInterval: (query) => {
      return isGenerationPending(query.state.data) ? 2000 : false; // Faster polling
    },
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true, // ✅ CHANGED: Refetch when window gets focus
    refetchOnMount: true,
    staleTime: 0, // ✅ CHANGED: Always consider data stale - no caching
    gcTime: 0, // Keep in cache for 30 seconds
    retry: 2,

    select: (data: BookImageGenerationsStatus) => {
      return {
        ...data,
        isGenerationComplete: !isGenerationPending(data),
      };
    },
  });
}
