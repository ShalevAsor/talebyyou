import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

import {
  completeBookAndSendEmail,
  updateBookDetails,
} from "@/actions/book-actions";
import { BookFull } from "@/types/book";

export function useBookUpdateMutation() {
  const queryClient = useQueryClient();

  // Mutation for updating book
  const updateBookMutation = useMutation({
    mutationFn: async (book: BookFull) => {
      const result = await updateBookDetails(book);
      if (!result.success) {
        throw new Error(result.error || "Failed to update book");
      }
      return result.data;
    },
    onSuccess: (data) => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["book", data?.id] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to save book"
      );
    },
  });

  // Mutation for completing book and sending email
  const completeBookMutation = useMutation({
    mutationFn: async (bookId: string) => {
      const result = await completeBookAndSendEmail(bookId);
      if (!result.success) {
        throw new Error(
          result.error || "Failed to complete book and send email"
        );
      }
      return result.data;
    },
    onSuccess: () => {
      // Invalidate and refetch books list
      queryClient.invalidateQueries({ queryKey: ["books"] });
    },
    onError: (error) => {
      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to send completion email"
      );
    },
  });

  return {
    updateBook: updateBookMutation.mutate,
    updateBookAsync: updateBookMutation.mutateAsync,
    isUpdating: updateBookMutation.isPending,
    completeBook: completeBookMutation.mutate,
    completeBookAsync: completeBookMutation.mutateAsync,
    isCompletingBook: completeBookMutation.isPending,
  };
}
