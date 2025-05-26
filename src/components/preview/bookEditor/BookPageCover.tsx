"use client";
import React, { memo, useCallback } from "react";
import Image from "next/image";
import useBookPreviewStore from "@/store/useBookPreviewStore";
import { Pencil, Image as ImageIcon } from "lucide-react";
import { TbPencilHeart } from "react-icons/tb";
import { TooltipButton } from "@/components/common/TooltipButton";
import { BookStatus } from "@prisma/client";

interface BookPageCoverProps {
  children: React.ReactNode;
  isLastPage?: boolean;
  coverImage?: string | null;
  coverDedication?: string | null;
}

/**
 * BookPageCover component - Renders the front or back cover of the book
 * Used in the book editor for the first and last pages
 */
const BookPageCover = React.forwardRef<HTMLDivElement, BookPageCoverProps>(
  ({ children, isLastPage = false, coverImage, coverDedication }, ref) => {
    // Get state from the store - use destructuring for cleaner code
    const { isEditMode, setCurrentlyEditing, book } = useBookPreviewStore();

    // Ready for print status - Don't display edit buttons
    const bookStatus = book?.status;
    const isReadyForPrint = bookStatus === BookStatus.READY_FOR_PRINTING;

    // Handle edit button clicks - wrapped in useCallback
    const handleTitleEdit = useCallback(() => {
      setCurrentlyEditing("text", "cover-title");
    }, [setCurrentlyEditing]);

    const handleImageEdit = useCallback(() => {
      setCurrentlyEditing("image", "cover-image");
    }, [setCurrentlyEditing]);

    const handleDedicationEdit = useCallback(() => {
      setCurrentlyEditing("dedication", "cover-dedication");
    }, [setCurrentlyEditing]);

    // Memoize derived state
    const hasDedication = !!coverDedication;
    const shouldShowDedicationSection =
      !isLastPage && (hasDedication || (isEditMode && !isReadyForPrint));

    return (
      <div
        className="bg-white border border-gray-200 shadow-lg h-full relative"
        ref={ref}
        data-density="hard"
        role={isLastPage ? "presentation" : "img"}
        aria-label={isLastPage ? "Back cover" : "Book cover"}
      >
        {/* Cover image */}
        {coverImage && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={coverImage}
              alt="Book cover"
              fill
              style={{ objectFit: "fill" }}
              className="z-0"
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 500px"
              quality={85}
            />

            {/* Edit image button - only show in edit mode */}
            {isEditMode && !isReadyForPrint && !isLastPage && (
              <TooltipButton
                onClick={handleImageEdit}
                tooltip="Edit cover image"
                className="absolute bottom-4 right-4 z-20"
                ariaLabel="Edit cover image"
              >
                <ImageIcon className="w-5 h-5 text-indigo-500" />
              </TooltipButton>
            )}
          </div>
        )}

        {/* Title */}
        <div className="absolute top-0 left-0 right-0 p-8 z-10">
          <div className="bg-white/70 p-6 rounded-lg shadow-md relative">
            {/* Edit title button - only show in edit mode */}
            {isEditMode && !isReadyForPrint && !isLastPage && (
              <TooltipButton
                onClick={handleTitleEdit}
                tooltip="Edit title"
                className="absolute top-2 right-2 z-20"
                ariaLabel="Edit title"
              >
                <Pencil className="w-4 h-4 text-indigo-500" />
              </TooltipButton>
            )}

            <h2 className="text-2xl font-bold text-black text-center">
              {children}
            </h2>
          </div>
        </div>

        {/* Cover Dedication - Only render this section if needed */}
        {shouldShowDedicationSection && (
          <div className="absolute bottom-16 left-0 right-0 px-6 z-10">
            <div
              className={`bg-white/85 backdrop-blur-sm p-5 rounded-xl shadow-lg transition-all relative ${
                !coverDedication && "min-h-20"
              }`}
            >
              {/* Edit dedication button - only in edit mode */}
              {isEditMode && !isReadyForPrint && (
                <TooltipButton
                  onClick={handleDedicationEdit}
                  tooltip="Edit dedication"
                  className="absolute top-2 right-2 z-20"
                  ariaLabel="Edit dedication"
                >
                  <TbPencilHeart className="w-5 h-5 text-red-500" />
                </TooltipButton>
              )}

              {coverDedication ? (
                <div
                  className="text-center text-gray-800 italic text-base leading-relaxed fade-in max-h-[120px] overflow-y-auto break-words whitespace-pre-wrap"
                  aria-label="Book dedication"
                >
                  <p className="max-w-full overflow-hidden text-ellipsis">
                    {coverDedication}
                  </p>
                </div>
              ) : (
                !isReadyForPrint &&
                isEditMode && (
                  <div className="text-center text-gray-400 italic text-sm">
                    <p>Add a short dedication here...</p>
                    <p className="text-xs mt-1">
                      For a longer dedication, use the next page
                    </p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Back cover text */}
        {isLastPage && (
          <div className="absolute inset-0 flex items-center justify-center"></div>
        )}
      </div>
    );
  }
);

// Ensure the component has a display name for React DevTools
BookPageCover.displayName = "BookPageCover";

// Export a memoized version for better performance
export default memo(BookPageCover);
