"use client";
import React, { useEffect } from "react";
import { BookFull } from "@/types/book";
import { ErrorAlert } from "@/components/common";
import { Loading } from "@/components/common";
import useBookStore from "@/store/useBookPreviewStore";
import { useBookData } from "@/hooks/useBookData";
import BookEditor from "@/components/preview/bookEditor/BookEditor";
import { useImageGenerationStatus } from "@/hooks/useImageGenerationStatus";
import { ActionBar } from "./ActionBar";
import ImageLoader from "./ImageLoader";
import { BookStatus, GenerationStatus } from "@/generated/prisma";
import { useBookUpdateMutation } from "@/hooks/useBookUpdateMutation";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

/**
 * Props for the BookPreviewClient component
 */

interface BookPreviewClientProps {
  initialBook: BookFull;
}

/**
 * Client component for book preview and editing functionality
 * Uses React Query hooks for data fetching and mutations
 */
const BookPreviewClient: React.FC<BookPreviewClientProps> = ({
  initialBook,
}) => {
  const router = useRouter();
  const {
    book: bookPreview,
    isEditMode,
    toggleEditMode,
    initializeStore,
    reset,
  } = useBookStore();

  // React Query manages server state
  const {
    data: serverBook,
    isLoading: isLoadingBook,
    error: bookError,
  } = useBookData(initialBook.id, initialBook);

  // Get image generation status
  const {
    data: imageGenerationStatus,
    isLoading: isLoadingGenerations,
    error: imageError,
  } = useImageGenerationStatus(serverBook?.id || null);

  // Book mutation hook
  const { updateBookAsync, isUpdating, completeBookAsync, isCompletingBook } =
    useBookUpdateMutation();

  // Initialize store only when server data changes
  useEffect(() => {
    if (serverBook) {
      initializeStore(serverBook);
    }
  }, [serverBook, initializeStore]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      reset();
    };
  }, [reset]);

  // Handle save and order with navigation in the component
  const handleSaveAndOrder = async () => {
    if (!bookPreview) {
      toast.error("No book data available");
      return;
    }

    try {
      // Save the book
      await updateBookAsync(bookPreview);

      // Navigate to order page after successful save
      router.push(`/my-books/order/${bookPreview.id}`);
    } catch (error) {
      console.error("Error saving book:", error);
      // Error already handled by mutation
    }
  };

  const handleSaveAndPrint = async () => {
    if (!bookPreview) {
      toast.error("No book data available");
      return;
    }
    try {
      // Create a copy of the book preview with updated status
      const bookToUpdate = {
        ...bookPreview,
        status: BookStatus.READY_FOR_PRINTING, // Update the status
      };

      // Save the book with the updated status
      const updatedBook = await updateBookAsync(bookToUpdate);

      // Send email book complete notification
      await completeBookAsync(updatedBook.id);
      // Show success toast

      toast.success("Book saved and email sent");
      // redirect to my-books page
      router.push(`/my-books`);
    } catch (error) {
      console.error("Error saving book for printing:", error);
      // Error already handled by mutation
    }
  };
  // Check if images are still generating
  const isGenerating =
    imageGenerationStatus &&
    (imageGenerationStatus.coverGeneration?.coverStatus ===
      GenerationStatus.PENDING ||
      imageGenerationStatus.pageGenerations?.some(
        (gen) => gen.status === GenerationStatus.PENDING
      ));

  if (isGenerating) {
    return <ImageLoader bookTitle={bookPreview?.title || initialBook.title} />;
  }

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 border border-indigo-500">
      <ActionBar
        toggleEditMode={toggleEditMode}
        isEditMode={isEditMode}
        title={bookPreview?.title || initialBook.title}
        isSaving={isUpdating}
        saveAndOrder={handleSaveAndOrder}
        saveAndPrint={handleSaveAndPrint}
        isCompletingBook={isCompletingBook || isUpdating}
      />

      {bookError && (
        <div className="p-4">
          <ErrorAlert message={bookError.message} />
        </div>
      )}

      {imageError && (
        <div className="p-4">
          <ErrorAlert message={imageError.message} />
        </div>
      )}

      {(isLoadingBook || isLoadingGenerations) && (
        <Loading message="Loading book data..." />
      )}

      {!isLoadingBook && !isLoadingGenerations && bookPreview && <BookEditor />}
    </div>
  );
};

export default BookPreviewClient;
