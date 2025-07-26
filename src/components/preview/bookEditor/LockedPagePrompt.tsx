import Link from "next/link";
import { FiLock, FiShoppingCart } from "react-icons/fi";

import { Button } from "@/components/ui/button";

interface LockedPagePromptProps {
  pageNumber: number;
}

export const LockedPagePrompt: React.FC<LockedPagePromptProps> = ({
  pageNumber,
}) => {
  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
      <div className="mb-4">
        <FiLock className="w-12 h-12 text-gray-400" />
      </div>
      <h3 className="text-lg font-semibold text-gray-700 mb-2">
        Complete Your Book to See Page {pageNumber}
      </h3>
      <p className="text-gray-600 mb-6 max-w-md">
        This page will be generated after you place your order. Complete your
        purchase to unlock all beautiful illustrations for your personalized
        story.
      </p>
      <div className="flex flex-col space-y-2">
        <Button asChild>
          <Link
            href={`/library/order/${"bookId"}`}
            className="flex items-center justify-center"
          >
            <FiShoppingCart className="mr-2 h-4 w-4" />
            Order Now to Unlock
          </Link>
        </Button>
        <span className="text-sm text-gray-500">
          One-time payment, lifetime access
        </span>
      </div>
    </div>
  );
};
