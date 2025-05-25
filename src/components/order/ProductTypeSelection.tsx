// "use client";

// import React, { memo } from "react";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { BOOK_PRICES } from "@/constants/bookConstants";
// import { ProductType } from "@/generated/prisma";
// import { useOrderStore } from "@/store/useOrderStore";
// import { getTotalPrice } from "@/utils/orderUtils";
// import { Book, Download } from "lucide-react";

// interface ProductTypeSelectionProps {
//   productType: ProductType;
//   onProductTypeChange: (type: ProductType) => void;
// }

// /**
//  * ProductTypeSelection component allows users to choose between physical and digital book formats
//  * Displays pricing information for each option
//  * The entire option card is clickable, not just the radio button
//  */
// export const ProductTypeSelection = memo(function ProductTypeSelection({
//   productType,
//   onProductTypeChange,
// }: ProductTypeSelectionProps) {
//   // Get quantity from the store
//   const { quantity } = useOrderStore();

//   // Calculate the price based on quantity for physical books
//   const physicalPrice = Number(getTotalPrice("0", ProductType.BOOK, quantity));

//   // Handle product type change - directly call the parent handler
//   const handleChange = (value: string) => {
//     const newType = value as ProductType;
//     onProductTypeChange(newType);
//   };

//   // Handle clicking on the entire card area
//   const handleCardClick = (type: ProductType) => {
//     onProductTypeChange(type);
//   };

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Choose Your Format</CardTitle>
//       </CardHeader>
//       <CardContent>
//         <RadioGroup
//           value={productType}
//           onValueChange={handleChange}
//           className="space-y-4"
//           aria-label="Book format options"
//         >
//           <div
//             className={`flex items-start space-x-3 p-4 border rounded-lg ${
//               productType === ProductType.BOOK
//                 ? "border-blue-300 bg-blue-50"
//                 : "hover:bg-gray-50"
//             } transition-colors duration-200 cursor-pointer`}
//             onClick={() => handleCardClick(ProductType.BOOK)}
//           >
//             <RadioGroupItem
//               value={ProductType.BOOK}
//               id="physical"
//               aria-labelledby="physical-label"
//               checked={productType === ProductType.BOOK}
//             />
//             <div className="flex-1">
//               <Label
//                 htmlFor="physical"
//                 className="flex items-center cursor-pointer"
//                 id="physical-label"
//               >
//                 <Book
//                   className="w-4 h-4 mr-2 text-blue-600"
//                   aria-hidden="true"
//                 />
//                 <span className="font-medium">
//                   Physical Book + Digital Copy
//                 </span>
//               </Label>
//               <div className="text-sm text-gray-500 mt-1 ml-6">
//                 <ul className="list-disc pl-4 space-y-1">
//                   <li>Premium hardcover book</li>
//                   <li>Includes FREE digital copy</li>
//                   <li>Multiple shipping options available</li>
//                   <li>Delivery times vary by shipping method</li>
//                 </ul>
//               </div>
//               <div className="mt-2 font-semibold ml-6">
//                 ${physicalPrice.toFixed(2)}{" "}
//                 {quantity > 1 && `(${quantity} copies)`} + shipping
//               </div>
//             </div>
//           </div>

//           <div
//             className={`flex items-start space-x-3 p-4 border rounded-lg ${
//               productType === ProductType.EBOOK
//                 ? "border-green-300 bg-green-50"
//                 : "hover:bg-gray-50"
//             } transition-colors duration-200 cursor-pointer`}
//             onClick={() => handleCardClick(ProductType.EBOOK)}
//           >
//             <RadioGroupItem
//               value={ProductType.EBOOK}
//               id="digital"
//               aria-labelledby="digital-label"
//               checked={productType === ProductType.EBOOK}
//             />
//             <div className="flex-1">
//               <Label
//                 htmlFor="digital"
//                 className="flex items-center cursor-pointer"
//                 id="digital-label"
//               >
//                 <Download
//                   className="w-4 h-4 mr-2 text-green-600"
//                   aria-hidden="true"
//                 />
//                 <span className="font-medium">Digital Copy Only</span>
//               </Label>
//               <div className="text-sm text-gray-500 mt-1 ml-6">
//                 <ul className="list-disc pl-4 space-y-1">
//                   <li>Instant download</li>
//                   <li>PDF format</li>
//                   <li>Print at home option</li>
//                 </ul>
//               </div>
//               <div className="mt-2 font-semibold ml-6">
//                 ${BOOK_PRICES.digital.toFixed(2)}
//               </div>
//             </div>
//           </div>
//         </RadioGroup>
//       </CardContent>
//     </Card>
//   );
// });
"use client";

import React, { memo } from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "@/components/ui/badge";
import { BOOK_PRICES } from "@/constants/bookConstants";
import { ProductType } from "@/generated/prisma";
import { useOrderStore } from "@/store/useOrderStore";
import { getTotalPrice } from "@/utils/orderUtils";
import { Book, Download, Check, Star, Zap } from "lucide-react";

interface ProductTypeSelectionProps {
  productType: ProductType;
  onProductTypeChange: (type: ProductType) => void;
}

/**
 * ProductTypeSelection component allows users to choose between physical and digital book formats
 * Updated with professional design and clearer labeling
 */
export const ProductTypeSelection = memo(function ProductTypeSelection({
  productType,
  onProductTypeChange,
}: ProductTypeSelectionProps) {
  // Get quantity from the store
  const { quantity } = useOrderStore();

  // Calculate the price based on quantity for physical books
  const physicalPrice = Number(getTotalPrice("0", ProductType.BOOK, quantity));

  // Handle product type change
  const handleChange = (value: string) => {
    const newType = value as ProductType;
    onProductTypeChange(newType);
  };

  // Handle clicking on the entire card area
  const handleCardClick = (type: ProductType) => {
    onProductTypeChange(type);
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
                  <div className="text-2xl font-bold text-gray-800">
                    ${physicalPrice.toFixed(2)}
                  </div>
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
                  <div className="text-2xl font-bold text-gray-800">
                    ${BOOK_PRICES.digital.toFixed(2)}
                  </div>
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
