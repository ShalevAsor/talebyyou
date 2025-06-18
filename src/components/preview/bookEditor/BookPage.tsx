"use client";
import React, { memo, useCallback } from "react";
import Image from "next/image";
import useBookPreviewStore from "@/store/useBookPreviewStore";
import { Pencil, Image as ImageIcon, Lock } from "lucide-react";
import { TooltipButton } from "@/components/common/TooltipButton";
import { BookStatus, PageType } from "@/types/book";

export interface BookPageProps {
  pageNumber: number;
  type: PageType;
  textContent?: string | null;
  imageUrl?: string | null;
  pageId: string; // Page identifier
}

/**
 * BookPage component - Renders individual pages within the book
 * Displays different content based on the page type (text, image, dedication, general)
 */
const BookPage = React.forwardRef<HTMLDivElement, BookPageProps>(
  ({ pageNumber, type, textContent, imageUrl, pageId }, ref) => {
    // Get edit mode state and actions from the store
    const { isEditMode, setCurrentlyEditing, book } = useBookPreviewStore();
    const bookStatus = book?.status;
    const isReadyForPrint = bookStatus === BookStatus.READY_FOR_PRINTING;

    // Handle edit button clicks - wrapped in useCallback for performance
    const handleTextEdit = useCallback(() => {
      setCurrentlyEditing("text", pageId);
    }, [setCurrentlyEditing, pageId]);

    const handleImageEdit = useCallback(() => {
      setCurrentlyEditing("image", pageId);
    }, [setCurrentlyEditing, pageId]);

    const handleDedicationEdit = useCallback(() => {
      setCurrentlyEditing("dedication", pageId);
    }, [setCurrentlyEditing, pageId]);

    // Specific page types with dedicated rendering
    // Dedication page
    if (type === PageType.DEDICATION) {
      return (
        <div
          className="bg-white border border-gray-200 h-full relative"
          ref={ref}
          role="region"
          aria-label={`Dedication page ${pageNumber}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center p-8 relative">
              {isEditMode && !isReadyForPrint && (
                <TooltipButton
                  onClick={handleDedicationEdit}
                  tooltip="Edit dedication"
                  className="absolute top-4 right-4 z-20"
                  ariaLabel="Edit dedication"
                >
                  <Pencil className="w-4 h-4 text-indigo-600" />
                </TooltipButton>
              )}

              <div className="text-center max-w-md mx-auto px-4">
                <p className="text-gray-700 leading-relaxed text-lg italic font-serif relative px-8 break-words whitespace-pre-wrap overflow-hidden">
                  <span
                    className="absolute left-0 top-0 text-2xl text-gray-300"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  {textContent || "Click to add your dedication"}
                  <span
                    className="absolute right-0 bottom-0 text-2xl text-gray-300"
                    aria-hidden="true"
                  >
                    &rdquo;
                  </span>
                </p>
              </div>
            </div>
            <div
              className="text-center text-xs text-gray-600 pb-3"
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </div>
          </div>
        </div>
      );
    }

    // General page (instruction page)
    if (type === PageType.GENERAL) {
      return (
        <div
          className="bg-white border border-gray-200 h-full relative"
          ref={ref}
          role="region"
          aria-label={`Instructions page ${pageNumber}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center p-8 relative">
              <p className="text-gray-400 italic text-center mx-auto max-w-md">
                Turn the page to continue customizing your story →
              </p>
            </div>
            <div
              className="text-center text-xs text-gray-600 pb-3"
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </div>
          </div>
        </div>
      );
    }

    // Text page rendering
    if (type === PageType.TEXT) {
      return (
        <div
          className="bg-white border border-gray-200 h-full relative"
          ref={ref}
          role="region"
          aria-label={`Story text page ${pageNumber}`}
        >
          <div className="flex flex-col h-full">
            <div className="flex-1 flex items-center justify-center p-8 relative">
              {/* Edit text button - only show in edit mode */}
              {isEditMode && !isReadyForPrint && (
                <TooltipButton
                  onClick={handleTextEdit}
                  tooltip="Edit text"
                  className="absolute top-4 right-4 z-20"
                  ariaLabel="Edit text"
                >
                  <Pencil className="w-4 h-4 text-indigo-600" />
                </TooltipButton>
              )}

              <div className="mx-auto max-w-md w-full">
                <p className="text-black leading-relaxed text-base break-words whitespace-pre-wrap">
                  {textContent}
                </p>
              </div>
            </div>
            <div
              className="text-center text-xs text-gray-600 pb-3"
              aria-label={`Page ${pageNumber}`}
            >
              {pageNumber}
            </div>
          </div>
        </div>
      );
    }
    // Image page rendering (default)
    return (
      <div
        className="bg-white border border-gray-200 h-full relative"
        ref={ref}
        role="region"
        aria-label={`Story illustration page ${pageNumber}`}
      >
        <div className="w-full h-full">
          {imageUrl ? (
            <div className="relative w-full h-full">
              <Image
                src={imageUrl}
                alt={`Illustration for page ${pageNumber}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 640px) 320px, (max-width: 1024px) 400px, 500px"
                quality={75}
                loading="lazy"
              />

              {/* Edit image button - only show in edit mode */}
              {isEditMode && !isReadyForPrint && (
                <TooltipButton
                  onClick={handleImageEdit}
                  tooltip="Edit image"
                  className="absolute bottom-16 right-4 z-20"
                  ariaLabel="Edit image"
                >
                  <ImageIcon className="w-4 h-4 text-indigo-600" />
                </TooltipButton>
              )}
            </div>
          ) : (
            <div
              className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100"
              aria-live="polite"
            >
              <div className="text-center p-6 max-w-xs">
                <div className="flex justify-center mb-4">
                  <Lock
                    className="w-8 h-8 text-indigo-500"
                    aria-hidden="true"
                  />
                </div>
                <h3 className="font-medium text-gray-800 mb-2">
                  Illustration Preview
                </h3>
                <p className="text-gray-600 mb-2">
                  {bookStatus === BookStatus.ORDERED
                    ? "Your illustrations are being generated."
                    : "Additional illustrations will be generated when you order your book."}
                </p>
                <p className="text-sm text-indigo-600 font-medium">
                  {bookStatus === BookStatus.ORDERED
                    ? "Please wait while we bring your story to life!"
                    : "Finalize your book to see all illustrations."}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="absolute bottom-3 w-full text-center z-10">
          <div
            className="inline-block bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs text-black"
            aria-label={`Page ${pageNumber}`}
          >
            {pageNumber}
          </div>
        </div>
      </div>
    );
  }
);

BookPage.displayName = "BookPage";

export default memo(BookPage);
