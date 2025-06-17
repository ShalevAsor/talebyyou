// src/components/admin/books/BookSearchCard.tsx
import React from "react";
import { BookSearchResult } from "@/types/book";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

interface BookSearchCardProps {
  book: BookSearchResult;
}

export const BookSearchCard: React.FC<BookSearchCardProps> = ({ book }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CUSTOMIZING":
        return "bg-yellow-50 text-yellow-700 ring-yellow-700/10";
      case "ORDERED":
        return "bg-blue-50 text-blue-700 ring-blue-700/10";
      case "READY_FOR_PRINTING":
        return "bg-purple-50 text-purple-700 ring-purple-700/10";
      case "COMPLETED":
        return "bg-green-50 text-green-700 ring-green-700/10";
      default:
        return "bg-gray-50 text-gray-700 ring-gray-700/10";
    }
  };

  return (
    <div className="border rounded-lg p-4 hover:bg-muted/50 transition-colors">
      <div className="flex justify-between items-start">
        <div className="space-y-2 flex-1">
          <div className="flex items-center gap-3">
            <h4 className="font-medium">{book.title}</h4>
            <span
              className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${getStatusColor(
                book.status
              )}`}
            >
              {book.status}
            </span>
          </div>

          <div className="space-y-1 text-sm text-muted-foreground">
            <p>ID: {book.id}</p>

            <p>
              {book.isGuest ? "Guest" : "User"}: {book.userEmail || "N/A"}
              {book.userName && ` (${book.userName})`}
            </p>

            {book.orderNumber && <p>Order: {book.orderNumber}</p>}

            {book.templateName && <p>Template: {book.templateName}</p>}

            <p>
              Created: {new Date(book.createdAt).toLocaleDateString()} |
              Updated: {new Date(book.updatedAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="ml-4">
          <Link href={`/admin/books/${book.id}`}>
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
              View
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
