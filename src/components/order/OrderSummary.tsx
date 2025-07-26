"use client";

import { Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCallback } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useOrderStore } from "@/store/useOrderStore";
import { BookFull } from "@/types/book";
import { ProductType } from "@/types/order";

interface OrderSummaryProps {
  book: BookFull;
}

/**
 * OrderSummary component displays the book details and quantity selector
 * Provides a summary of what's being ordered
 */
export function OrderSummary({ book }: OrderSummaryProps) {
  // Get quantity and product type from store
  const { quantity, setQuantity, productType } = useOrderStore();

  // Only show quantity selector for physical books
  const showQuantitySelector = productType === ProductType.BOOK;

  // Memoize increment/decrement handlers to prevent unnecessary rerenders
  const handleDecrement = useCallback(() => {
    setQuantity(Math.max(1, quantity - 1));
  }, [quantity, setQuantity]);

  const handleIncrement = useCallback(() => {
    setQuantity(Math.min(10, quantity + 1));
  }, [quantity, setQuantity]);

  return (
    <Card className="border border-gray-200" aria-label="Book summary">
      <CardContent className="p-4">
        <div className="flex items-center gap-4">
          {/* Book Cover */}
          <div className="relative w-20 h-28 flex-shrink-0 rounded overflow-hidden">
            {book.coverImage ? (
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                sizes="80px"
                className="object-cover"
                priority={false}
                loading="lazy"
              />
            ) : (
              <div
                className="w-full h-full bg-gray-100 flex items-center justify-center"
                aria-label="No cover image available"
              >
                <span className="text-xs text-gray-400">No cover</span>
              </div>
            )}
          </div>

          {/* Book Details */}
          <div className="flex-grow">
            <h3 className="font-medium text-gray-900">{book.title}</h3>
            {book.character && (
              <p className="text-sm text-gray-600 mt-1">
                Personalized for {book.character.name}
              </p>
            )}
            <p className="text-sm text-gray-600 mt-1">{book.pageCount} Pages</p>
          </div>

          {/* Quantity Selector - only for physical books */}
          {showQuantitySelector && (
            <div className="flex flex-col items-center">
              <span className="text-sm text-gray-600 mb-1">Quantity</span>
              <div
                className="flex items-center"
                role="group"
                aria-label="Quantity selector"
              >
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleDecrement}
                  disabled={quantity <= 1}
                  aria-label="Decrease quantity"
                  title="Decrease quantity"
                >
                  <Minus className="h-3 w-3" aria-hidden="true" />
                </Button>
                <span
                  className="mx-2 text-sm font-medium w-5 text-center"
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {quantity}
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="h-8 w-8 p-0"
                  onClick={handleIncrement}
                  disabled={quantity >= 10}
                  aria-label="Increase quantity"
                  title="Increase quantity"
                >
                  <Plus className="h-3 w-3" aria-hidden="true" />
                </Button>
              </div>
              <span className="sr-only">Selected quantity: {quantity}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
