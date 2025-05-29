// import React, { memo, useMemo } from "react";
// import Image from "next/image";
// import { BookFull } from "@/types/book";
// import { ProductType } from "@prisma/client";
// import {
//   CheckoutFormData,
//   PhysicalOrderFormData,
//   DigitalOrderFormData,
// } from "@/schemas/checkout-schema";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { ShippingLevel } from "@/types/print";
// import { useOrderStore } from "@/store/useOrderStore";
// import { getProductPrice } from "@/utils/orderUtils";
// import { ArrowLeft } from "lucide-react";

// interface OrderReviewProps {
//   book: BookFull;
//   productType: ProductType;
//   formData: CheckoutFormData;
//   shippingCost?: number;
//   shippingLevel?: ShippingLevel;
//   onBack: () => void;
// }

// /**
//  * OrderReview component displays the order summary before payment
//  * Shows product details, pricing, and shipping information
//  */
// export const OrderReview = memo(function OrderReview({
//   book,
//   productType,
//   formData,
//   shippingCost,
//   shippingLevel,
//   onBack,
// }: OrderReviewProps) {
//   const totalCost = useOrderStore((state) => state.totalCost);

//   const quantity = useOrderStore((state) => state.quantity);

//   // Type guards with proper memoization
//   const hasShippingAddress = useMemo(
//     () => productType === ProductType.BOOK && "shippingAddress" in formData,
//     [formData, productType]
//   );

//   const isDigitalOrder = useMemo(
//     () => productType === ProductType.EBOOK,
//     [productType]
//   );

//   // Use the helper function to calculate product price with quantity
//   const productPrice = useMemo(
//     () => getProductPrice(productType, quantity),
//     [productType, quantity]
//   );

//   // Format shipping level display name
//   const formattedShippingLevel = useMemo(() => {
//     if (!shippingLevel) return "";
//     return shippingLevel.replace("_", " ");
//   }, [shippingLevel]);

//   // Format the total cost properly
//   const formattedTotalCost = useMemo(() => {
//     return typeof totalCost === "string"
//       ? parseFloat(totalCost).toFixed(2)
//       : (totalCost || 0).toFixed(2);
//   }, [totalCost]);

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Order Summary</CardTitle>
//       </CardHeader>
//       <CardContent className="space-y-4">
//         {/* Book info */}
//         <div className="flex items-center">
//           <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden mr-3">
//             {book.coverImage && (
//               <Image
//                 src={book.coverImage}
//                 alt={`Cover of ${book.title}`}
//                 fill
//                 sizes="64px"
//                 className="object-cover"
//                 priority={false}
//                 loading="lazy"
//               />
//             )}
//           </div>
//           <div>
//             <h3 className="font-medium">{book.title}</h3>
//             <p className="text-sm text-gray-600">
//               {productType === ProductType.BOOK
//                 ? "Physical Book + Digital Copy"
//                 : "Digital Copy Only"}
//             </p>
//             {quantity > 1 && (
//               <p className="text-sm text-gray-600">Quantity: {quantity}</p>
//             )}
//           </div>
//         </div>

//         <Separator />

//         {/* Price breakdown */}
//         <div className="space-y-2" aria-label="Price breakdown">
//           <div className="flex justify-between">
//             <span>
//               {quantity > 1 ? `Product (${quantity} copies):` : "Product:"}
//             </span>
//             <span>${productPrice.toFixed(2)}</span>
//           </div>

//           {productType === ProductType.BOOK && (
//             <div className="flex justify-between">
//               <span>Shipping ({formattedShippingLevel}):</span>
//               <span>${shippingCost?.toFixed(2) || "0.00"}</span>
//             </div>
//           )}

//           <Separator />

//           <div className="flex justify-between font-medium">
//             <span>Total:</span>
//             <span>${formattedTotalCost}</span>
//           </div>
//         </div>

//         {/* Shipping details for physical books */}
//         {hasShippingAddress && (
//           <div className="mt-4">
//             <h3 className="font-medium mb-2">Shipping To:</h3>
//             <div className="text-sm bg-gray-50 p-3 rounded-md">
//               <p>{(formData as PhysicalOrderFormData).shippingAddress.name}</p>
//               <p>
//                 {(formData as PhysicalOrderFormData).shippingAddress.street1}
//               </p>
//               {(formData as PhysicalOrderFormData).shippingAddress.street2 && (
//                 <p>
//                   {(formData as PhysicalOrderFormData).shippingAddress.street2}
//                 </p>
//               )}
//               <p>
//                 {(formData as PhysicalOrderFormData).shippingAddress.city},{" "}
//                 {(formData as PhysicalOrderFormData).shippingAddress.state_code}{" "}
//                 {(formData as PhysicalOrderFormData).shippingAddress.postcode}
//               </p>
//               <p>
//                 {(formData as PhysicalOrderFormData).shippingAddress.country}
//               </p>
//             </div>
//           </div>
//         )}

//         {/* Customer email for digital orders */}
//         {isDigitalOrder && (
//           <div className="mt-4">
//             <h3 className="font-medium mb-2">Digital Delivery:</h3>
//             <div className="text-sm bg-gray-50 p-3 rounded-md">
//               <p>
//                 Your ebook will be delivered to:{" "}
//                 {(formData as DigitalOrderFormData).customerEmail}
//               </p>
//             </div>
//           </div>
//         )}
//       </CardContent>

//       <CardFooter>
//         <Button
//           variant="outline"
//           onClick={onBack}
//           className="flex items-center"
//         >
//           <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
//           Back
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// });
import React, { memo, useMemo } from "react";
import Image from "next/image";
import { BookFull } from "@/types/book";
import { ProductType } from "@prisma/client";
import {
  CheckoutFormData,
  PhysicalOrderFormData,
  DigitalOrderFormData,
} from "@/schemas/checkout-schema";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ShippingLevel } from "@/types/print";
import { useOrderStore } from "@/store/useOrderStore";
import { getPricingDetails } from "@/utils/orderUtils";
import { formatPrice, getDiscountDisplayText } from "@/utils/pricingUtils";
import { PricingConfig, DiscountConfig } from "@/types/pricing";
import { ArrowLeft, Tag } from "lucide-react";

interface OrderReviewProps {
  book: BookFull;
  productType: ProductType;
  formData: CheckoutFormData;
  shippingCost?: number;
  shippingLevel?: ShippingLevel;
  onBack: () => void;
  pricing?: PricingConfig;
  discount?: DiscountConfig | null;
}

/**
 * OrderReview component displays the order summary before payment
 * Shows product details, pricing, shipping information, and discounts
 */
export const OrderReview = memo(function OrderReview({
  book,
  productType,
  formData,
  shippingCost,
  shippingLevel,
  onBack,
  pricing,
  discount,
}: OrderReviewProps) {
  const quantity = useOrderStore((state) => state.quantity);

  // Type guards with proper memoization
  const hasShippingAddress = useMemo(
    () => productType === ProductType.BOOK && "shippingAddress" in formData,
    [formData, productType]
  );

  const isDigitalOrder = useMemo(
    () => productType === ProductType.EBOOK,
    [productType]
  );

  // Calculate pricing details with discounts
  const pricingDetails = useMemo(() => {
    if (!pricing) return null;

    return getPricingDetails(
      productType,
      quantity,
      shippingCost || 0,
      pricing,
      discount
    );
  }, [productType, quantity, shippingCost, pricing, discount]);

  // Format shipping level display name
  const formattedShippingLevel = useMemo(() => {
    if (!shippingLevel) return "";
    return shippingLevel.replace("_", " ");
  }, [shippingLevel]);

  // Check if discount applies to this product type
  const isDiscountApplicable = useMemo(() => {
    if (!discount) return false;

    return (
      discount.applicableProducts === "ALL" ||
      (discount.applicableProducts === "PHYSICAL" &&
        productType === ProductType.BOOK) ||
      (discount.applicableProducts === "DIGITAL" &&
        productType === ProductType.EBOOK)
    );
  }, [discount, productType]);

  // Fallback pricing if pricing details are not available
  const fallbackTotalCost = useOrderStore((state) => state.totalCost);
  const formattedTotalCost = useMemo(() => {
    if (pricingDetails) {
      return pricingDetails.totalPrice.toFixed(2);
    }
    return typeof fallbackTotalCost === "string"
      ? parseFloat(fallbackTotalCost).toFixed(2)
      : (fallbackTotalCost || 0).toFixed(2);
  }, [pricingDetails, fallbackTotalCost]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Order Summary</span>
          {isDiscountApplicable && discount && (
            <Badge className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
              <Tag className="w-3 h-3 mr-1" />
              {getDiscountDisplayText(discount)}
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Book info */}
        <div className="flex items-center">
          <div className="relative w-16 h-16 bg-gray-200 rounded overflow-hidden mr-3">
            {book.coverImage && (
              <Image
                src={book.coverImage}
                alt={`Cover of ${book.title}`}
                fill
                sizes="64px"
                className="object-cover"
                priority={false}
                loading="lazy"
              />
            )}
          </div>
          <div>
            <h3 className="font-medium">{book.title}</h3>
            <p className="text-sm text-gray-600">
              {productType === ProductType.BOOK
                ? "Physical Book + Digital Copy"
                : "Digital Copy Only"}
            </p>
            {quantity > 1 && (
              <p className="text-sm text-gray-600">Quantity: {quantity}</p>
            )}
          </div>
        </div>

        <Separator />

        {/* Price breakdown */}
        <div className="space-y-2" aria-label="Price breakdown">
          {pricingDetails ? (
            <>
              {/* Base price line */}
              <div className="flex justify-between">
                <span>
                  {quantity > 1 ? `Product (${quantity} copies):` : "Product:"}
                </span>
                <span>{formatPrice(pricingDetails.basePrice)}</span>
              </div>

              {/* Discount line (if applicable) */}
              {pricingDetails.hasDiscount && (
                <div className="flex justify-between text-green-600">
                  <span className="flex items-center">
                    <Tag className="w-4 h-4 mr-1" />
                    Discount ({discount?.name || "Sale"}):
                  </span>
                  <span>-{formatPrice(pricingDetails.discountAmount)}</span>
                </div>
              )}

              {/* Subtotal after discount */}
              {pricingDetails.hasDiscount && (
                <div className="flex justify-between font-medium">
                  <span>Subtotal:</span>
                  <span>{formatPrice(pricingDetails.finalPrice)}</span>
                </div>
              )}

              {/* Shipping for physical books */}
              {productType === ProductType.BOOK && (
                <div className="flex justify-between">
                  <span>Shipping ({formattedShippingLevel}):</span>
                  <span>{formatPrice(pricingDetails.shippingCost)}</span>
                </div>
              )}

              <Separator />

              {/* Final total */}
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span>{formatPrice(pricingDetails.totalPrice)}</span>
              </div>

              {/* Savings summary */}
              {pricingDetails.hasDiscount && (
                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 font-medium text-center">
                    🎉 You're saving{" "}
                    {formatPrice(pricingDetails.discountAmount)} with{" "}
                    {discount?.name}!
                  </p>
                </div>
              )}
            </>
          ) : (
            // Fallback pricing display
            <>
              <div className="flex justify-between">
                <span>
                  {quantity > 1 ? `Product (${quantity} copies):` : "Product:"}
                </span>
                <span>Calculating...</span>
              </div>

              {productType === ProductType.BOOK && (
                <div className="flex justify-between">
                  <span>Shipping ({formattedShippingLevel}):</span>
                  <span>
                    {shippingCost
                      ? formatPrice(shippingCost)
                      : "Calculating..."}
                  </span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between font-medium">
                <span>Total:</span>
                <span>${formattedTotalCost}</span>
              </div>
            </>
          )}
        </div>

        {/* Shipping details for physical books */}
        {hasShippingAddress && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Shipping To:</h3>
            <div className="text-sm bg-gray-50 p-3 rounded-md">
              <p>{(formData as PhysicalOrderFormData).shippingAddress.name}</p>
              <p>
                {(formData as PhysicalOrderFormData).shippingAddress.street1}
              </p>
              {(formData as PhysicalOrderFormData).shippingAddress.street2 && (
                <p>
                  {(formData as PhysicalOrderFormData).shippingAddress.street2}
                </p>
              )}
              <p>
                {(formData as PhysicalOrderFormData).shippingAddress.city},{" "}
                {(formData as PhysicalOrderFormData).shippingAddress.state_code}{" "}
                {(formData as PhysicalOrderFormData).shippingAddress.postcode}
              </p>
              <p>
                {(formData as PhysicalOrderFormData).shippingAddress.country}
              </p>
            </div>
          </div>
        )}

        {/* Customer email for digital orders */}
        {isDigitalOrder && (
          <div className="mt-4">
            <h3 className="font-medium mb-2">Digital Delivery:</h3>
            <div className="text-sm bg-gray-50 p-3 rounded-md">
              <p>
                Your ebook will be delivered to:{" "}
                {(formData as DigitalOrderFormData).customerEmail}
              </p>
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button
          variant="outline"
          onClick={onBack}
          className="flex items-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
          Back
        </Button>
      </CardFooter>
    </Card>
  );
});
