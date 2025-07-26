"use client";

import { AlertCircle } from "lucide-react";
import { useState } from "react";

import { searchBooks } from "@/actions/book-actions";
import { BookSearchCard } from "@/components/admin/books/BookSearchCard";
import {
  BooksSearch,
  SearchFilters,
} from "@/components/admin/books/BooksSearch";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookSearchFilters, BookSearchResult } from "@/types/book";

export function BooksClient() {
  const [searchResults, setSearchResults] = useState<BookSearchResult[] | null>(
    null
  );
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const handleSearch = async (filters: SearchFilters) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      // Convert SearchFilters to BookSearchFilters (handle "all" status)
      const searchFilters: BookSearchFilters = {
        searchType: filters.searchType,
        searchQuery: filters.searchQuery,
        status: filters.status === "all" ? undefined : filters.status,
        dateRange: filters.dateRange,
      };

      const result = await searchBooks(searchFilters);

      if (result.success) {
        setSearchResults(result.data);
      } else {
        setSearchError(result.error);
        setSearchResults(null);
      }
    } catch (_error) {
      setSearchError("An unexpected error occurred while searching");
      setSearchResults(null);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClear = () => {
    setSearchResults(null);
    setSearchError(null);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Book Search</CardTitle>
        </CardHeader>
        <CardContent>
          <BooksSearch
            onSearch={handleSearch}
            onClear={handleClear}
            isLoading={isSearching}
          />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search Results</CardTitle>
        </CardHeader>
        <CardContent>
          {searchError && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Search Error</AlertTitle>
              <AlertDescription>{searchError}</AlertDescription>
            </Alert>
          )}

          {searchResults ? (
            <div>
              {searchResults.length > 0 ? (
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground mb-4">
                    Found {searchResults.length} result
                    {searchResults.length !== 1 ? "s" : ""}
                  </p>

                  {/* Search results using the new component */}
                  <div className="space-y-3">
                    {searchResults.map((book) => (
                      <BookSearchCard key={book.id} book={book} />
                    ))}
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground">
                  No books found matching your search criteria.
                </p>
              )}
            </div>
          ) : (
            <p className="text-muted-foreground">
              No search performed yet. Use the search above to find books.
            </p>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
