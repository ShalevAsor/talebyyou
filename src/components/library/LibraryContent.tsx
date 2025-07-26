"use client";
import { Genre } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback, useMemo, useState } from "react";

import { getGenres } from "@/actions/genre-actions";
import { getAllBookTemplates } from "@/actions/template-actions";
import { ErrorAlert } from "@/components/common";
import ErrorBoundary from "@/components/error/ErrorBoundary";
import { BookTemplateGrid } from "@/components/templates/BookTemplateGrid";
import { BookTemplateFull } from "@/types/book";

import LibrarySidebar from "./LibrarySidebar";

interface LibraryContentProps {
  initialBookTemplates: BookTemplateFull[];
  initialGenres: Genre[];
  initialSelectedGenres: string[];
}

export const LibraryContent: React.FC<LibraryContentProps> = ({
  initialBookTemplates,
  initialGenres,
  initialSelectedGenres,
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State for selected genres
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    initialSelectedGenres
  );

  // Fetch genres with React Query
  const {
    data: genres,
    isLoading: isGenresLoading,
    error: genresError,
  } = useQuery({
    queryKey: ["genres"],
    queryFn: async () => {
      const result = await getGenres();
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    initialData: initialGenres,
    staleTime: 60 * 1000 * 60,
  });

  // Fetch ALL templates once (no filtering on server)
  const {
    data: allBookTemplates,
    isLoading: isBooksLoading,
    error: booksError,
  } = useQuery({
    queryKey: ["book-templates"], // Remove genres from key since we're not server-filtering
    queryFn: async () => {
      const result = await getAllBookTemplates({
        // Don't pass filterByGenre - get all templates
        publishedOnly: true,
      });
      if (!result.success) throw new Error(result.error);
      return result.data;
    },
    initialData: initialBookTemplates,
    staleTime: 60 * 1000 * 60, // Cache for 1 hour since templates don't change often
  });

  // Client-side filtering using useMemo
  const bookTemplates = useMemo(() => {
    if (!allBookTemplates) return [];

    // If no genres selected, return all templates
    if (selectedGenres.length === 0) {
      return allBookTemplates;
    }

    // Filter templates based on selected genres
    return allBookTemplates.filter((template) =>
      template.genres.some((genre) => selectedGenres.includes(genre.name))
    );
  }, [allBookTemplates, selectedGenres]);

  // Update URL to maintain filter state
  const updateUrl = useCallback(
    (selectedGenreIds: string[]) => {
      const params = new URLSearchParams(searchParams.toString());

      if (selectedGenreIds.length > 0) {
        params.set("genres", selectedGenreIds.join(","));
      } else {
        params.delete("genres");
      }

      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams]
  );

  // Handle genre filter changes
  const handleGenreFilterChange = useCallback(
    (newSelectedGenres: string[]) => {
      setSelectedGenres(newSelectedGenres);
      updateUrl(newSelectedGenres);
    },
    [updateUrl]
  );

  // Determine if there are active filters
  const hasActiveFilters = selectedGenres.length > 0;

  // Determine if we need to show the empty state
  const showEmptyState = !isBooksLoading && bookTemplates.length === 0;

  // Show error if any
  if (genresError || booksError) {
    const errorMessage = genresError
      ? String(genresError)
      : booksError
      ? String(booksError)
      : "An unexpected error occurred";

    return (
      <div role="alert" aria-live="assertive">
        <ErrorAlert message={errorMessage} />
      </div>
    );
  }

  return (
    <ErrorBoundary>
      <div className="bg-indigo-50/50 p-8 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar with filters */}
          <LibrarySidebar
            genres={genres}
            selectedGenres={selectedGenres}
            onFilterChange={handleGenreFilterChange}
            isLoading={isGenresLoading}
          />

          {/* Main content - Book grid */}
          <div
            className="flex-1"
            role="region"
            aria-label="Book templates"
            aria-busy={isBooksLoading}
          >
            {showEmptyState && hasActiveFilters && (
              <div
                className="bg-white p-6 rounded-lg shadow-sm text-center"
                aria-live="polite"
              >
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No books match your filters
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your genre selections to see more books
                </p>
                <button
                  onClick={() => handleGenreFilterChange([])}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  aria-label="Clear all filters"
                >
                  Clear filters
                </button>
              </div>
            )}

            {!showEmptyState && (
              <BookTemplateGrid
                bookTemplates={bookTemplates}
                isLoading={isBooksLoading}
                hasActiveFilters={hasActiveFilters}
              />
            )}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  );
};
