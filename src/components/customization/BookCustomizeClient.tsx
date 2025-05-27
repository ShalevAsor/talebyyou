"use client";
import React from "react";
import CharacterCustomizationForm from "@/components/form/CharacterCustomizationForm";
import { BookTemplateFull } from "@/types/book";
import BookCreationLoader from "@/components/customization/BookCreationLoader";
import { useBookCreation } from "@/hooks/useBookCreation";
import { ErrorAlert } from "@/components/common";
import Link from "next/link";
import { useBookLimit } from "@/hooks/useBookLimit";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BookIcon } from "lucide-react";

interface BookCustomizeClientProps {
  template: BookTemplateFull;
}

/**
 * Client component for book customization and creation
 */
const BookCustomizeClient: React.FC<BookCustomizeClientProps> = React.memo(
  ({ template }) => {
    // Use the custom hook to handle the book creation process
    const { createBook, isCreating, error, creationStage } = useBookCreation(
      template.id
    );

    // Use the book limit hook
    const {
      canCreate,
      remainingBooks,
      message: limitMessage,
      isLoading: isLoadingLimit,
    } = useBookLimit();

    // Determine if form is submittable
    const isFormDisabled = !canCreate || isLoadingLimit || isCreating;

    return (
      <div
        aria-live="polite"
        aria-busy={isCreating || isLoadingLimit}
        className="book-customization-container"
      >
        {/* Error alerts */}
        {error && (
          <div role="alert" aria-live="assertive" className="mb-4">
            <ErrorAlert
              message={error}
              subMessage={
                creationStage === "uploading"
                  ? "Try using a smaller photo or check your internet connection."
                  : creationStage === "creating"
                  ? "Please wait a moment and try creating your book again."
                  : creationStage === "generating"
                  ? "Your book was created successfully - you can try generating images again from the preview page."
                  : undefined
              }
              showSupportMessage={true}
            />
          </div>
        )}

        {/* Book limit alerts */}
        {!isLoadingLimit && (
          <>
            {/* Cannot create more books alert */}
            {!canCreate && (
              <Alert variant="destructive" className="mb-6">
                <AlertTitle>Book Limit Reached</AlertTitle>
                <AlertDescription className="flex flex-col space-y-2">
                  <p>{limitMessage}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="self-start mt-2"
                    asChild
                  >
                    <Link href="/my-books">
                      <BookIcon className="mr-2 h-4 w-4" aria-hidden="true" />
                      <span>View your existing books</span>
                    </Link>
                  </Button>
                </AlertDescription>
              </Alert>
            )}

            {/* Only one book remaining alert */}
            {remainingBooks === 1 && canCreate && (
              <Alert className="mb-6 border-yellow-200 bg-yellow-50">
                <AlertTitle className="text-yellow-800">
                  Almost at Book Limit
                </AlertTitle>
                <AlertDescription className="text-yellow-700">
                  You can create {remainingBooks} more book before needing to
                  place an order.
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        {/* Main content - conditionally show loader or form */}
        {creationStage ? (
          // Show the loading state UI during book creation
          <div
            className="bg-white p-6 rounded-lg shadow-lg"
            aria-label="Creating your book"
          >
            <BookCreationLoader
              stage={creationStage}
              bookTitle={template.title}
            />
          </div>
        ) : (
          // Show the customization form when not processing
          <div
            className="bg-indigo-50/50 p-6 rounded-lg shadow-lg"
            aria-labelledby="customization-heading"
          >
            <CharacterCustomizationForm
              onSubmit={createBook}
              isSubmitting={isCreating}
              disabled={isFormDisabled}
            />
          </div>
        )}

        {/* Accessibility information for screen readers */}
        <div className="sr-only">
          {isFormDisabled
            ? "Form is currently disabled while we check your book limit or process your request."
            : "You can create a personalized book by completing the form and uploading a photo."}
        </div>
      </div>
    );
  }
);

// Display name for debugging
BookCustomizeClient.displayName = "BookCustomizeClient";

export default BookCustomizeClient;
