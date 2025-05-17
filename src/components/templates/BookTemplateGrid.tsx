import React from "react";
import { BookTemplateCard } from "./BookTemplateCard";
import { BookTemplateFull } from "@/types/book";

interface BookTemplateGridProps {
  bookTemplates: BookTemplateFull[];
  isLoading?: boolean;
  hasActiveFilters?: boolean;
}

/**
 * Component for displaying a grid of book template cards
 * - Renders BookTemplateCard components in a responsive grid
 * - Handles loading states and empty results
 * - Provides context-aware empty states based on filter status
 */
export const BookTemplateGrid: React.FC<BookTemplateGridProps> = ({
  bookTemplates,
  isLoading = false,
  hasActiveFilters = false,
}) => {
  // Create loading skeletons
  if (isLoading) {
    return (
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
        aria-label="Loading book templates"
        aria-busy="true"
      >
        {/* Show loading skeletons */}
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="bg-gray-100 rounded-lg h-80 animate-pulse"
            aria-hidden="true"
          />
        ))}
      </div>
    );
  }

  // Show empty state when no books found
  if (bookTemplates.length === 0) {
    return (
      <div
        className="flex flex-col items-center justify-center py-16 text-center"
        aria-live="polite"
      >
        <p className="text-lg text-gray-600 mb-4">
          {hasActiveFilters
            ? "No books found matching your selected genres"
            : "No books found in our library"}
        </p>
        <p className="text-sm text-gray-500">
          {hasActiveFilters
            ? "Try selecting different genres or clear your filters"
            : "Please check back later for new additions to our library"}
        </p>
      </div>
    );
  }

  // Show the grid of book templates
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      aria-label={`${bookTemplates.length} book templates found`}
    >
      {bookTemplates.map((template) => (
        <BookTemplateCard key={template.id} template={template} />
      ))}
    </div>
  );
};
