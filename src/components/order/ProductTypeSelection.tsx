"use client";

import React, { memo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BOOK_PRICES } from "@/constants/bookConstants";
import { ProductType } from "@/generated/prisma";
import { useOrderStore } from "@/store/useOrderStore";
import { getTotalPrice } from "@/utils/orderUtils";
import { Book, Download } from "lucide-react";

interface ProductTypeSelectionProps {
  productType: ProductType;
  onProductTypeChange: (type: ProductType) => void;
}

/**
 * ProductTypeSelection component allows users to choose between physical and digital book formats
 * Displays pricing information for each option
 * The entire option card is clickable, not just the radio button
 */
export const ProductTypeSelection = memo(function ProductTypeSelection({
  productType,
  onProductTypeChange,
}: ProductTypeSelectionProps) {
  // Get quantity from the store
  const { quantity } = useOrderStore();

  // Calculate the price based on quantity for physical books
  const physicalPrice = Number(getTotalPrice("0", ProductType.BOOK, quantity));

  // Handle product type change - directly call the parent handler
  const handleChange = (value: string) => {
    const newType = value as ProductType;
    onProductTypeChange(newType);
  };

  // Handle clicking on the entire card area
  const handleCardClick = (type: ProductType) => {
    onProductTypeChange(type);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Choose Your Format</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={productType}
          onValueChange={handleChange}
          className="space-y-4"
          aria-label="Book format options"
        >
          <div
            className={`flex items-start space-x-3 p-4 border rounded-lg ${
              productType === ProductType.BOOK
                ? "border-blue-300 bg-blue-50"
                : "hover:bg-gray-50"
            } transition-colors duration-200 cursor-pointer`}
            onClick={() => handleCardClick(ProductType.BOOK)}
          >
            <RadioGroupItem
              value={ProductType.BOOK}
              id="physical"
              aria-labelledby="physical-label"
              checked={productType === ProductType.BOOK}
            />
            <div className="flex-1">
              <Label
                htmlFor="physical"
                className="flex items-center cursor-pointer"
                id="physical-label"
              >
                <Book
                  className="w-4 h-4 mr-2 text-blue-600"
                  aria-hidden="true"
                />
                <span className="font-medium">
                  Physical Book + Digital Copy
                </span>
              </Label>
              <div className="text-sm text-gray-500 mt-1 ml-6">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Premium hardcover book</li>
                  <li>Includes FREE digital copy</li>
                  <li>Multiple shipping options available</li>
                  <li>Delivery times vary by shipping method</li>
                </ul>
              </div>
              <div className="mt-2 font-semibold ml-6">
                ${physicalPrice.toFixed(2)}{" "}
                {quantity > 1 && `(${quantity} copies)`} + shipping
              </div>
            </div>
          </div>

          <div
            className={`flex items-start space-x-3 p-4 border rounded-lg ${
              productType === ProductType.EBOOK
                ? "border-green-300 bg-green-50"
                : "hover:bg-gray-50"
            } transition-colors duration-200 cursor-pointer`}
            onClick={() => handleCardClick(ProductType.EBOOK)}
          >
            <RadioGroupItem
              value={ProductType.EBOOK}
              id="digital"
              aria-labelledby="digital-label"
              checked={productType === ProductType.EBOOK}
            />
            <div className="flex-1">
              <Label
                htmlFor="digital"
                className="flex items-center cursor-pointer"
                id="digital-label"
              >
                <Download
                  className="w-4 h-4 mr-2 text-green-600"
                  aria-hidden="true"
                />
                <span className="font-medium">Digital Copy Only</span>
              </Label>
              <div className="text-sm text-gray-500 mt-1 ml-6">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Instant download</li>
                  <li>PDF format</li>
                  <li>Print at home option</li>
                </ul>
              </div>
              <div className="mt-2 font-semibold ml-6">
                ${BOOK_PRICES.digital.toFixed(2)}
              </div>
            </div>
          </div>
        </RadioGroup>
      </CardContent>
    </Card>
  );
});
