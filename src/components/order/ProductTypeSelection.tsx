"use client";

import { ProductType } from "@prisma/client";
import { Book, Check, Download, Star, Tag, Zap } from "lucide-react";
import { memo, useMemo } from "react";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrderStore } from "@/store/useOrderStore";
import { DiscountConfig, PricingConfig } from "@/types/pricing";
import { getPricingDetails } from "@/utils/orderUtils";
import { formatPrice, getDiscountDisplayText } from "@/utils/pricingUtils";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface ProductTypeSelectionProps {
  productType: ProductType;
  onProductTypeChange: (type: ProductType) => void;
  pricing?: PricingConfig;
  discount?: DiscountConfig | null;
}

/**
 * ProductTypeSelection component allows users to choose between physical and digital book formats
 * Updated with dynamic pricing and discount support
 */
export const ProductTypeSelection = memo(function ProductTypeSelection({
  productType,
  onProductTypeChange,
  pricing,
  discount,
}: ProductTypeSelectionProps) {
  // Get quantity from the store
  const { quantity } = useOrderStore();

  // Calculate pricing for both product types
  const physicalPricing = useMemo(() => {
    if (!pricing) return null;
    return getPricingDetails(
      ProductType.BOOK,
      quantity,
      0, // No shipping cost for display
      pricing,
      discount
    );
  }, [pricing, discount, quantity]);

  const digitalPricing = useMemo(() => {
    if (!pricing) return null;
    return getPricingDetails(ProductType.EBOOK, 1, 0, pricing, discount);
  }, [pricing, discount]);

  // Handle product type change
  const handleChange = (value: string) => {
    const newType = value as ProductType;
    onProductTypeChange(newType);
  };

  // Handle clicking on the entire card area
  const handleCardClick = (type: ProductType) => {
    onProductTypeChange(type);
  };

  // Get discount display for each product type
  const getDiscountInfo = (productType: ProductType) => {
    if (!discount) return null;

    // Check if discount applies to this product type
    const isApplicable =
      discount.applicableProducts === "ALL" ||
      (discount.applicableProducts === "PHYSICAL" &&
        productType === ProductType.BOOK) ||
      (discount.applicableProducts === "DIGITAL" &&
        productType === ProductType.EBOOK);

    if (!isApplicable) return null;

    return {
      text: getDiscountDisplayText(discount),
      name: discount.name,
    };
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-indigo-50 to-purple-50 border-b">
        <CardTitle className="text-xl font-bold text-center text-gray-800">
          Choose Your Format
        </CardTitle>
        <p className="text-sm text-gray-600 text-center mt-1">
          Select the perfect option for your personalized book
        </p>
      </CardHeader>
      <CardContent className="p-6">
        <RadioGroup
          value={productType}
          onValueChange={handleChange}
          className="space-y-6"
          aria-label="Book format options"
        >
          {/* Premium Hardcover Book Option */}
          <div
            className={`relative flex items-start space-x-4 p-6 border-2 rounded-xl transition-all duration-300 cursor-pointer group ${
              productType === ProductType.BOOK
                ? "border-indigo-500 bg-indigo-50 shadow-md"
                : "border-gray-200 hover:border-indigo-300 hover:bg-indigo-25 hover:shadow-sm"
            }`}
            onClick={() => handleCardClick(ProductType.BOOK)}
          >
            {/* Most Popular Badge */}
            {productType === ProductType.BOOK && (
              <div className="absolute -top-3 left-6">
                <Badge className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-3 py-1 text-xs font-semibold">
                  <Star className="w-3 h-3 mr-1" />
                  Most Popular
                </Badge>
              </div>
            )}

            {/* Discount Badge for Physical Books */}
            {getDiscountInfo(ProductType.BOOK) && (
              <div className="absolute -top-3 right-6">
                <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 text-xs font-semibold">
                  <Tag className="w-3 h-3 mr-1" />
                  {getDiscountInfo(ProductType.BOOK)?.text}
                </Badge>
              </div>
            )}

            <RadioGroupItem
              value={ProductType.BOOK}
              id="physical"
              aria-labelledby="physical-label"
              checked={productType === ProductType.BOOK}
              className="mt-1"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="physical"
                  className="flex items-center cursor-pointer text-lg font-semibold"
                  id="physical-label"
                >
                  <Book
                    className="w-5 h-5 mr-3 text-indigo-600"
                    aria-hidden="true"
                  />
                  <span className="text-gray-800">Premium Hardcover Book</span>
                </Label>
                <div className="text-right">
                  {physicalPricing ? (
                    <>
                      {physicalPricing.hasDiscount && (
                        <div className="text-lg line-through text-gray-400">
                          {formatPrice(physicalPricing.basePrice)}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-gray-800">
                        {formatPrice(physicalPricing.finalPrice)}
                      </div>
                      {physicalPricing.hasDiscount && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {formatPrice(physicalPricing.discountAmount)}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-gray-800">
                      Loading...
                    </div>
                  )}
                  {quantity > 1 && (
                    <div className="text-sm text-gray-500">
                      {quantity} copies
                    </div>
                  )}
                  <div className="text-sm text-gray-500">+ shipping</div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>Premium hardcover binding</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>High-quality paper & printing</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>Professional gift packaging</span>
                  </div>
                  <div className="flex items-center text-sm text-green-700 font-medium">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>FREE eBook included</span>
                  </div>
                </div>

                {/* Discount name display */}
                {getDiscountInfo(ProductType.BOOK)?.name && (
                  <div className="pt-2 border-t border-indigo-200">
                    <p className="text-sm text-indigo-700 font-medium">
                      🎉 {getDiscountInfo(ProductType.BOOK)?.name}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Multiple shipping options available • Delivery times vary by
                    method
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* eBook Option */}
          <div
            className={`relative flex items-start space-x-4 p-6 border-2 rounded-xl transition-all duration-300 cursor-pointer group ${
              productType === ProductType.EBOOK
                ? "border-emerald-500 bg-emerald-50 shadow-md"
                : "border-gray-200 hover:border-emerald-300 hover:bg-emerald-25 hover:shadow-sm"
            }`}
            onClick={() => handleCardClick(ProductType.EBOOK)}
          >
            {/* Instant Access Badge */}
            {productType === ProductType.EBOOK && (
              <div className="absolute -top-3 left-6">
                <Badge className="bg-gradient-to-r from-emerald-600 to-green-600 text-white px-3 py-1 text-xs font-semibold">
                  <Zap className="w-3 h-3 mr-1" />
                  Instant Access
                </Badge>
              </div>
            )}

            {/* Discount Badge for Digital Books */}
            {getDiscountInfo(ProductType.EBOOK) && (
              <div className="absolute -top-3 right-6">
                <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white px-3 py-1 text-xs font-semibold">
                  <Tag className="w-3 h-3 mr-1" />
                  {getDiscountInfo(ProductType.EBOOK)?.text}
                </Badge>
              </div>
            )}

            <RadioGroupItem
              value={ProductType.EBOOK}
              id="digital"
              aria-labelledby="digital-label"
              checked={productType === ProductType.EBOOK}
              className="mt-1"
            />

            <div className="flex-1">
              <div className="flex items-center justify-between">
                <Label
                  htmlFor="digital"
                  className="flex items-center cursor-pointer text-lg font-semibold"
                  id="digital-label"
                >
                  <Download
                    className="w-5 h-5 mr-3 text-emerald-600"
                    aria-hidden="true"
                  />
                  <span className="text-gray-800">eBook</span>
                </Label>
                <div className="text-right">
                  {digitalPricing ? (
                    <>
                      {digitalPricing.hasDiscount && (
                        <div className="text-lg line-through text-gray-400">
                          {formatPrice(digitalPricing.basePrice)}
                        </div>
                      )}
                      <div className="text-2xl font-bold text-gray-800">
                        {formatPrice(digitalPricing.finalPrice)}
                      </div>
                      {digitalPricing.hasDiscount && (
                        <div className="text-sm text-green-600 font-medium">
                          Save {formatPrice(digitalPricing.discountAmount)}
                        </div>
                      )}
                    </>
                  ) : (
                    <div className="text-2xl font-bold text-gray-800">
                      Loading...
                    </div>
                  )}
                  <div className="text-sm text-emerald-600 font-medium">
                    Instant download
                  </div>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>Instant download after payment</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>High-resolution PDF format</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>Print at home option</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Check className="w-4 h-4 mr-2 text-green-600 flex-shrink-0" />
                    <span>Accessible on all devices</span>
                  </div>
                </div>

                {/* Discount name display */}
                {getDiscountInfo(ProductType.EBOOK)?.name && (
                  <div className="pt-2 border-t border-emerald-200">
                    <p className="text-sm text-emerald-700 font-medium">
                      🎉 {getDiscountInfo(ProductType.EBOOK)?.name}
                    </p>
                  </div>
                )}

                <div className="pt-2 border-t border-gray-200">
                  <p className="text-sm text-gray-500">
                    Perfect for immediate enjoyment • Environmentally friendly
                    option
                  </p>
                </div>
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Additional Information */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg border">
          <p className="text-sm text-gray-600 text-center">
            <span className="font-medium">Questions about formats?</span> Both
            options include the same personalized content and high-quality
            illustrations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
