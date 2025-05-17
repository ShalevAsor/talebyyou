"use client";

import React, { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import BookTemplateCoverPage from "@/components/templates/BookTemplateCoverPage";
import { BookTemplateFull } from "@/types/book";
import BookTemplatePage from "@/components/templates/BookTemplatePage";
import { processBookTemplateForPreview } from "@/utils/templateUtils";

// Dynamic import HTMLFlipBook to avoid SSR issues
const HTMLFlipBook = dynamic(() => import("react-pageflip"), {
  ssr: false,
  loading: () => (
    <div className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border">
      <p className="text-gray-400">Loading book preview...</p>
    </div>
  ),
});

interface PageFlip {
  pageFlip: () => {
    flipNext: () => void;
    flipPrev: () => void;
    flip: (page: number) => void;
    turnToPrevPage: () => void;
    turnToNextPage: () => void;
    turnToPage: (page: number) => void;
    getCurrentPageIndex: () => number;
    getPageCount: () => number;
    getOrientation: () => string;
    getState: () => string;
  };
}

interface BookTemplatePreviewProps {
  bookTemplate: BookTemplateFull;
}

/**
 * Component that renders a book with page-flipping functionality
 */
const BookTemplatePreview: React.FC<BookTemplatePreviewProps> = ({
  bookTemplate,
}) => {
  // State for tracking pages
  const [page, setPage] = useState(0);
  // Reference to the flip book component
  const bookRef = useRef<PageFlip>(null);
  // State to track if the book is fully loaded
  const [isLoaded, setIsLoaded] = useState(false);

  // Ensure we only render on the client
  useEffect(() => {
    setIsLoaded(true);
  }, []);

  // If book isn't loaded yet, show a placeholder
  if (!bookTemplate) {
    return (
      <div
        className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border"
        role="status"
        aria-live="polite"
      >
        <p className="text-gray-400">Book data not available</p>
      </div>
    );
  }

  // Process the book template to replace [CHILD_NAME] with "Alex"
  const processedBookTemplate = processBookTemplateForPreview(bookTemplate);

  // Sort pages by page number to ensure correct order
  const sortedPages = [...processedBookTemplate.pages].sort(
    (a, b) => a.pageNumber - b.pageNumber
  );
  const totalPages = processedBookTemplate.pages.length * 2 + 2; // Each content page becomes 2 pages + cover + back cover

  // Handle page changes
  const handlePageChange = (e: { data: number }) => {
    setPage(e.data);
  };

  // Navigation functions
  const navigateToNextPage = () => {
    if (bookRef.current) {
      try {
        bookRef.current.pageFlip().flipNext();
      } catch (error) {
        console.error("Error flipping to next page:", error);
      }
    }
  };

  const navigateToPrevPage = () => {
    if (bookRef.current) {
      try {
        bookRef.current.pageFlip().flipPrev();
      } catch (error) {
        console.error("Error flipping to previous page:", error);
      }
    }
  };

  return (
    <div
      className="book-preview-container"
      aria-label="Interactive book preview"
    >
      {/* Book navigation and page indicator */}
      <div className="flex justify-between items-center mb-6">
        <div
          className="text-sm text-gray-600"
          aria-live="polite"
          aria-atomic="true"
        >
          Page {page + 1} of {totalPages}
        </div>
        <div className="flex space-x-2">
          <Button
            variant="outline"
            size="sm"
            disabled={page === 0}
            onClick={navigateToPrevPage}
            aria-label="Previous page"
            className="h-10 w-10 p-0 rounded-full"
          >
            <FiChevronLeft className="h-5 w-5" aria-hidden="true" />
          </Button>

          <Button
            variant="outline"
            size="sm"
            disabled={page >= totalPages - 1}
            onClick={navigateToNextPage}
            aria-label="Next page"
            className="h-10 w-10 p-0 rounded-full"
          >
            <FiChevronRight className="h-5 w-5" aria-hidden="true" />
          </Button>
        </div>
      </div>

      {/* Flip book container */}
      {isLoaded ? (
        <div
          className="flex justify-center"
          role="region"
          aria-roledescription="book"
        >
          <HTMLFlipBook
            width={300}
            height={450}
            size="stretch"
            minWidth={200}
            minHeight={300}
            maxWidth={400}
            maxHeight={600}
            maxShadowOpacity={0.3}
            showCover={true}
            mobileScrollSupport={true}
            onFlip={handlePageChange}
            className="mx-auto"
            ref={bookRef}
            usePortrait={true}
            startPage={page}
            drawShadow={true}
            flippingTime={1000}
            useMouseEvents={true}
            autoSize={true}
            clickEventForward={true}
            swipeDistance={10}
            showPageCorners={true}
            disableFlipByClick={true}
            startZIndex={10}
            style={{}}
          >
            {/* Front cover */}
            <BookTemplateCoverPage
              coverImage={processedBookTemplate.coverImage}
            >
              {processedBookTemplate.title}
            </BookTemplateCoverPage>

            {/* Book pages - rendered as text/image pairs */}
            {sortedPages
              .map((contentPage) => [
                <BookTemplatePage
                  key={`${contentPage.id}-text`}
                  pageNumber={contentPage.pageNumber * 2 - 1}
                  type="text"
                  textContent={contentPage.content}
                />,
                <BookTemplatePage
                  key={`${contentPage.id}-image`}
                  pageNumber={contentPage.pageNumber * 2}
                  type="image"
                  imageUrl={contentPage.imageUrl}
                />,
              ])
              .flat()}

            {/* Back cover */}
            <BookTemplateCoverPage isLastPage={true}>
              The End
            </BookTemplateCoverPage>
          </HTMLFlipBook>
        </div>
      ) : (
        <div
          className="flex justify-center items-center h-[600px] bg-gray-50 rounded-lg border"
          role="status"
          aria-live="polite"
        >
          <p className="text-gray-400">Loading book preview...</p>
        </div>
      )}

      {/* Screen reader instructions */}
      <div className="sr-only">
        Use the previous and next buttons to navigate through the book pages.
        This book contains {totalPages} pages, including a front cover,{" "}
        {processedBookTemplate.pages.length} story pages with text and
        illustrations, and a back cover.
      </div>
    </div>
  );
};

export default BookTemplatePreview;
