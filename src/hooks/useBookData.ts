import { GenerationStatus } from "@prisma/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect } from "react";

import { getBookById } from "@/actions/book-actions";
import { BookFull } from "@/types/book";

import { useImageGenerationStatus } from "./useImageGenerationStatus";

/**
 * Hook to fetch and manage book data
 * Automatically refetches when image generation completes
 */
export function useBookData(bookId: string, initialData?: BookFull) {
  const queryClient = useQueryClient();

  // Get image generation status
  const { data: imageGenerationStatus } = useImageGenerationStatus(bookId);

  // Memoize the query function to prevent unnecessary recreation
  const fetchBook = useCallback(async () => {
    const result = await getBookById(bookId);
    if (!result.success) {
      throw new Error(result.error);
    }
    return result.data;
  }, [bookId]);

  // Book query with optimized settings
  const query = useQuery({
    queryKey: ["book", bookId],
    queryFn: fetchBook,
    initialData,
    staleTime: 30000, // Data is fresh for 30 seconds
    refetchInterval: false, // Don't automatically refetch
    refetchOnWindowFocus: false, // Don't refetch on window focus
    retry: 1, // Only retry failed requests once
  });

  // Refetch book data when image generation is complete
  useEffect(() => {
    if (!imageGenerationStatus) return;

    const allGenerationsComplete =
      imageGenerationStatus.coverGeneration?.coverStatus ===
        GenerationStatus.COMPLETE &&
      imageGenerationStatus.pageGenerations?.every(
        (gen) =>
          gen.status === GenerationStatus.COMPLETE ||
          gen.status === GenerationStatus.FAILED
      );

    if (allGenerationsComplete) {
      // Invalidate and refetch the book data
      queryClient.invalidateQueries({ queryKey: ["book", bookId] });
    }
  }, [imageGenerationStatus, bookId, queryClient]);

  return query;
}
