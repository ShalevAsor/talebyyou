"use client";

import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookAdmin } from "@/types/book";
import { PageCard } from "./PageCard";

interface PagesListProps {
  book: BookAdmin;
}

export const PagesList: React.FC<PagesListProps> = ({ book }) => {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleTextUpdate = () => {
    setRefreshKey((prev) => prev + 1);
  };

  // Sort pages by page number and filter out COVER pages (handled separately)
  const sortedPages = [...book.pages].sort(
    (a, b) => a.pageNumber - b.pageNumber
  );

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          Book Pages ({sortedPages.length} pages)
        </h3>
        <Badge variant="outline">Total: {sortedPages.length} pages</Badge>
      </div>

      <div className="space-y-4">
        {sortedPages.map((page) => (
          <PageCard
            key={`${page.id}-${refreshKey}`}
            page={page}
            onTextUpdate={handleTextUpdate}
          />
        ))}
      </div>

      {sortedPages.length === 0 && (
        <Card>
          <CardContent className="py-8 text-center">
            <p className="text-gray-500">No pages found for this book.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
