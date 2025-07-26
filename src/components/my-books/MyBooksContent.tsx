"use client";

import { SignUpButton } from "@clerk/nextjs";
import Link from "next/link";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { BookFull } from "@/types/book";

import { BookCard } from "./BookCard";

interface MyBooksContentProps {
  initialBooks: BookFull[];
  limitInfo: {
    canCreate: boolean;
    remainingBooks: number;
    totalCreated: number;
    message?: string;
  };
  isGuest: boolean;
}

/**
 * Component to display user's book collection with limiting information
 */
export function MyBooksContent({
  initialBooks,
  limitInfo,
  isGuest,
}: MyBooksContentProps) {
  // Show limit warning if approaching limit
  const showLimitWarning =
    limitInfo.remainingBooks === 1 || !limitInfo.canCreate;

  return (
    <div className="flex flex-col min-h-full bg-indigo-50/50 p-8 rounded-lg shadow-lg">
      <div className="flex flex-col gap-8 flex-grow">
        {/* Limit Warning */}
        {showLimitWarning && (
          <Alert
            variant={limitInfo.canCreate ? "default" : "destructive"}
            className="mb-6"
          >
            <AlertDescription>
              {limitInfo.message ||
                `You have ${limitInfo.remainingBooks} book${
                  limitInfo.remainingBooks === 1 ? "" : "s"
                } remaining before reaching your limit. Order existing books to create more.`}
            </AlertDescription>
          </Alert>
        )}

        {/* Guest Account Notice */}
        {isGuest && (
          <div className="">
            <p className="mt-2 text-md text-gray-600">
              <SignUpButton>
                <Button variant="link" size="sm" className="m-0 p-0 ">
                  Sign Up
                </Button>
              </SignUpButton>{" "}
              to save your books permanently
            </p>
          </div>
        )}

        {/* Books Grid or Empty State */}
        {initialBooks.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {initialBooks.map((book) => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {"You haven't created any books yet"}
            </h3>
            <p className="text-gray-500 mb-4">
              Start by browsing our templates and creating your first
              personalized book
            </p>
            <Button asChild>
              <Link href="/library">{"Browse Collection"}</Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
