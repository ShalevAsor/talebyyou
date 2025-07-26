import React from "react";

import { BookTemplateFull } from "@/types/book";

import { LibraryBookTemplateCard } from "../library/LibraryBookTemplateCard";

interface BookTemplateGridProps {
  bookTemplates: BookTemplateFull[];
  isLoading?: boolean;
  hasActiveFilters?: boolean;
}

/**
 * Component for displaying a grid of book template cards in the library
 * - Uses the new compact LibraryBookTemplateCard for better browsing experience
 * - Optimized grid layout for showing more books at once
 * - Enhanced loading states and empty results
 */
export const BookTemplateGrid: React.FC<BookTemplateGridProps> = ({
  bookTemplates,
  isLoading = false,
  hasActiveFilters = false,
}) => {
  // Create enhanced loading skeletons
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        aria-label="Loading book templates"
        aria-busy="true"
      >
        {/* Show loading skeletons with new card proportions */}
        {Array.from({ length: 8 }).map((_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-gray-200 overflow-hidden animate-pulse h-[400px] flex flex-col"
            aria-hidden="true"
          >
            {/* Image skeleton */}
            <div className="h-48 bg-gray-200" />
            {/* Content skeleton */}
            <div className="p-4 flex flex-col flex-1">
              <div className="h-5 bg-gray-200 rounded w-3/4 mb-2" />
              <div className="space-y-2 mb-3">
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-full" />
                <div className="h-4 bg-gray-100 rounded w-2/3" />
              </div>
              <div className="flex gap-2 mb-3">
                <div className="h-4 bg-gray-100 rounded w-16" />
                <div className="h-4 bg-gray-100 rounded w-12" />
              </div>
              <div className="flex gap-2 mb-4">
                <div className="h-6 bg-gray-100 rounded-full w-16" />
                <div className="h-6 bg-gray-100 rounded-full w-20" />
              </div>
              <div className="mt-auto">
                <div className="h-9 bg-gray-200 rounded-md w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Enhanced empty state
  if (bookTemplates.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-20 text-center"
        aria-live="polite"
      >
        <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          {hasActiveFilters ? "No matching books found" : "No books available"}
        </h3>

        <p className="text-gray-600 mb-4 max-w-md">
          {hasActiveFilters
            ? "Try adjusting your genre filters or browse all available books"
            : "Our library is growing! Check back soon for new story adventures"}
        </p>

        {hasActiveFilters && (
          <button
            onClick={() => (window.location.href = "/library")}
            className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            View All Books
          </button>
        )}
      </div>
    );
  }

  // Show the enhanced grid of book templates
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
      aria-label={`${bookTemplates.length} book template${
        bookTemplates.length !== 1 ? "s" : ""
      } found`}
    >
      {bookTemplates.map((template) => (
        <LibraryBookTemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};
