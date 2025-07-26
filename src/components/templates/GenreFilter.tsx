"use client";

import { Genre } from "@prisma/client";
import React, { useState } from "react";
import { FiCheck, FiX } from "react-icons/fi";

interface GenreFilterProps {
  genres: Genre[];
  selectedGenres: string[];
  onFilterChange: (selectedGenreNames: string[]) => void;
}

/**
 * Client component for filtering books by genre
 * - Displays a list of genres as clickable items
 * - Tracks which genres are selected
 * - Communicates changes to parent component
 * - Optimized for accessibility and keyboard navigation
 */
export const GenreFilter: React.FC<GenreFilterProps> = ({
  genres,
  selectedGenres,
  onFilterChange,
}) => {
  // Local state to track checked genres (initialized with selectedGenres from props)
  const [checkedGenres, setCheckedGenres] = useState<string[]>(selectedGenres);

  const handleGenreChange = (genreName: string) => {
    let updatedGenres: string[];

    if (checkedGenres.includes(genreName)) {
      // Remove genre if already selected
      updatedGenres = checkedGenres.filter((name) => name !== genreName);
    } else {
      // Add genre if not already selected
      updatedGenres = [...checkedGenres, genreName];
    }

    // Update local state
    setCheckedGenres(updatedGenres);

    // Notify parent component
    onFilterChange(updatedGenres);
  };

  const clearFilters = () => {
    setCheckedGenres([]);
    onFilterChange([]);
  };

  // Handle keyboard interactions
  const handleKeyDown = (event: React.KeyboardEvent, genreName: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleGenreChange(genreName);
    }
  };

  return (
    <div className="w-full" role="region" aria-label="Genre filters">
      {/* Selected genres count and clear button - always visible */}
      <div
        className="flex items-center justify-between mb-4 h-10"
        aria-live="polite"
      >
        <span className="text-sm font-medium text-gray-600">
          {checkedGenres.length > 0
            ? `${checkedGenres.length} selected`
            : "No filters applied"}
        </span>
        <button
          onClick={clearFilters}
          disabled={checkedGenres.length === 0}
          aria-label="Clear all genre filters"
          className={`inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-full transition-colors
            ${
              checkedGenres.length > 0
                ? "text-gray-700 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                : "text-gray-400 bg-gray-50 cursor-not-allowed"
            }`}
        >
          <FiX className="w-4 h-4 mr-1" aria-hidden="true" />
          Clear all
        </button>
      </div>

      {/* Genre checkboxes */}
      <div
        className="space-y-1"
        role="group"
        aria-label="Filter books by genre"
      >
        {genres.map((genre) => {
          const isChecked = checkedGenres.includes(genre.name);
          const checkboxId = `genre-${genre.id}`;

          return (
            <div
              key={genre.id}
              className={`relative flex items-center p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:bg-gray-50 
                ${
                  isChecked
                    ? "bg-blue-50 border-blue-200 hover:bg-blue-100"
                    : "bg-white border-gray-200"
                }`}
              onClick={() => handleGenreChange(genre.name)}
              onKeyDown={(e) => handleKeyDown(e, genre.name)}
              tabIndex={0}
              role="checkbox"
              aria-checked={isChecked}
              aria-labelledby={checkboxId}
            >
              <div className="flex items-center h-5">
                <input
                  type="checkbox"
                  id={checkboxId}
                  checked={isChecked}
                  onChange={() => handleGenreChange(genre.name)}
                  className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 cursor-pointer"
                  onClick={(e) => e.stopPropagation()}
                  aria-label={`Filter by genre: ${genre.name}`}
                />
              </div>
              <label
                id={checkboxId}
                htmlFor={checkboxId}
                className="ml-3 flex-1 cursor-pointer"
                onClick={(e) => e.preventDefault()}
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`text-sm font-medium ${
                      isChecked ? "text-blue-900" : "text-gray-900"
                    }`}
                  >
                    {genre.name}
                  </span>
                  {isChecked && (
                    <FiCheck
                      className="h-4 w-4 text-blue-600"
                      aria-hidden="true"
                    />
                  )}
                </div>
              </label>
            </div>
          );
        })}
      </div>

      {genres.length === 0 && (
        <div className="text-center py-6" role="status" aria-live="polite">
          <p className="text-sm text-gray-500">No genres available</p>
        </div>
      )}
    </div>
  );
};
