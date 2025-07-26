import Link from "next/link";
import { FiShoppingCart } from "react-icons/fi";

import { Button } from "@/components/ui/button";
import { BookFull, PageType } from "@/types/book";

export const BookProgressIndicator: React.FC<{ book: BookFull }> = ({
  book,
}) => {
  const generatedPages = book.pages.filter(
    (p) => p.type === PageType.IMAGE && p.imageUrl
  ).length;
  const totalImagePages = book.pages.filter(
    (p) => p.type === PageType.IMAGE
  ).length;

  if (book.status === "ORDERED" || book.status === "COMPLETED") {
    return null; // Don't show for completed books
  }

  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-blue-800">Preview Mode</h4>
          <p className="text-sm text-blue-600">
            {generatedPages} of {totalImagePages} pages ready for preview
          </p>
        </div>
        <Button asChild size="sm">
          <Link
            href={`/library/order/${book.id}`}
            className="flex items-center"
          >
            <FiShoppingCart className="mr-2 h-4 w-4" />
            Complete Your Book
          </Link>
        </Button>
      </div>
      <div className="mt-2 w-full bg-blue-100 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
          style={{ width: `${(generatedPages / totalImagePages) * 100}%` }}
        />
      </div>
    </div>
  );
};
