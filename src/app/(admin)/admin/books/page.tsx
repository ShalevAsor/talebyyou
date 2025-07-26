// src/app/(admin)/admin/books/page.tsx
import { AlertCircle } from "lucide-react";

import { getBooksStats } from "@/actions/book-actions";
import { BooksClient } from "@/components/admin/books/BooksClient";
import { BooksStats } from "@/components/admin/books/BooksStats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function BooksPage() {
  // Fetch real books statistics
  const statsResult = await getBooksStats();

  // Handle error case
  if (!statsResult.success) {
    return (
      <div className="p-6">
        <h2 className="text-3xl font-bold tracking-tight mb-6">
          Books Management
        </h2>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{statsResult.error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Books Management
      </h2>

      <div className="space-y-6">
        {/* Books Stats */}
        <BooksStats booksStatsData={statsResult.data} />

        {/* Search and Results */}
        <BooksClient />
      </div>
    </div>
  );
}
