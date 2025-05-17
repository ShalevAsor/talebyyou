import { useMutation, useQueryClient } from "@tanstack/react-query";
import { generateEbook, getEbookDownloadUrl } from "@/actions/ebook-actions";
import { EbookFileType } from "@/types/ebook";
import { toast } from "react-toastify";

export function useEbookMutations() {
  const queryClient = useQueryClient();

  // Mutation for generating an ebook
  const generateEbookMutation = useMutation({
    mutationFn: ({ bookId }: { bookId: string }) =>
      generateEbook(bookId, EbookFileType.PDF),
    onSuccess: (result) => {
      if (result.success) {
        toast.success(result.message || "PDF generated successfully");
        // Invalidate any relevant queries
        queryClient.invalidateQueries({ queryKey: ["book"] });
      } else {
        toast.error(result.error || "Failed to generate PDF");
      }
    },
    onError: (error) => {
      console.error("Error generating PDF:", error);
      toast.error("An unexpected error occurred while generating the PDF");
    },
  });

  // Mutation for getting download URL
  const getDownloadUrlMutation = useMutation({
    mutationFn: ({ bookId }: { bookId: string }) => getEbookDownloadUrl(bookId),
    onSuccess: (result, variables) => {
      if (result.success) {
        queryClient.setQueryData(
          ["bookDownloadUrl", variables.bookId],
          result.data
        );
      } else {
        toast.error(result.error || "Failed to get download URL");
      }
    },
    onError: (error) => {
      console.error("Error getting download URL:", error);
      toast.error("An unexpected error occurred while preparing your download");
    },
  });

  return {
    generateEbookMutation,
    getDownloadUrlMutation,
    isGenerating: generateEbookMutation.isPending,
    isPreparingDownload: getDownloadUrlMutation.isPending,
  };
}
