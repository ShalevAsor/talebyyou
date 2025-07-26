import { Genre } from "@prisma/client";
import React from "react";
import { FiFilter } from "react-icons/fi";

import { Loading } from "@/components/common";

import { PricingDisplay } from "../common/PricingDisplay";
import { GenreFilter } from "../templates/GenreFilter";

interface LibrarySidebarProps {
  genres: Genre[];
  selectedGenres: string[];
  onFilterChange: (genres: string[]) => void;
  isLoading: boolean;
}

/**
 * Component for library sidebar with filters
 * - Contains genre filters
 * - Handles loading states
 * - Provides semantic structure for the filter section
 */
const LibrarySidebar: React.FC<LibrarySidebarProps> = ({
  genres,
  selectedGenres,
  onFilterChange,
  isLoading,
}) => {
  if (isLoading) {
    return (
      <aside className="w-full md:w-72 flex-shrink-0" aria-label="Book filters">
        <div className="bg-white rounded-lg shadow-sm p-6 h-48 flex items-center justify-center">
          <Loading message="Loading genres..." aria-live="polite" />
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-72 flex-shrink-0" aria-label="Book filters">
      <div className="bg-white rounded-lg shadow-sm p-6 sticky top-6">
        {/* Filter header */}
        <div className="flex items-center gap-2 mb-6">
          <FiFilter
            className="h-5 w-5 text-muted-foreground"
            aria-hidden="true"
          />
          <h2 id="filter-heading" className="text-lg font-semibold">
            Filter by Genre
          </h2>
        </div>

        {/* Genre Filter List */}
        <GenreFilter
          genres={genres}
          selectedGenres={selectedGenres}
          onFilterChange={onFilterChange}
        />

        {/* Pricing Section */}
        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-sm font-medium text-gray-900 mb-3">
            Our Pricing
          </h3>
          <PricingDisplay variant="library" showDiscount={true} />
        </div>
      </div>
    </aside>
  );
};

export default LibrarySidebar;
