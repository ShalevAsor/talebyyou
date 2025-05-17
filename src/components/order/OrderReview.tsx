// import React from "react";
// import Image from "next/image";
// import { BookFull } from "@/types/book";
// import { ProductType } from "@/generated/prisma";
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
// import { getProductPrice } from "@/utils/orderUtils"; // Import the helper function

// interface OrderReviewProps {
//   book: BookFull;
//   productType: ProductType;
//   formData: CheckoutFormData;
//   shippingCost?: number;
//   shippingLevel?: ShippingLevel;
//   onBack: () => void;
// }

// export function OrderReview({
//   book,
//   productType,
//   formData,
//   shippingCost,
//   shippingLevel,
//   onBack,
// }: OrderReviewProps) {
//   const totalCost = useOrderStore((state) => state.totalCost);
//   const quantity = useOrderStore((state) => state.quantity);

//   // Type guard to check if we have physical order data with shipping address
//   const hasShippingAddress = (
//     data: CheckoutFormData
//   ): data is PhysicalOrderFormData => {
//     return productType === ProductType.BOOK && "shippingAddress" in data;
//   };

//   // Type guard to check if we have digital order data
//   const isDigitalOrder = (
//     data: CheckoutFormData
//   ): data is DigitalOrderFormData => {
//     return productType === ProductType.EBOOK;
//   };

//   // Use the helper function to calculate product price with quantity
//   const productPrice = getProductPrice(productType, quantity);

//   // Format shipping level display name
//   const formatShippingLevel = (level?: ShippingLevel) => {
//     if (!level) return "";
//     return level.replace("_", " ");
//   };

//   // Format the total cost properly
//   const formattedTotalCost =
//     typeof totalCost === "string"
//       ? parseFloat(totalCost).toFixed(2)
//       : (totalCost || 0).toFixed(2);

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
//                 alt={book.title}
//                 fill
//                 sizes="64px"
//                 className="object-cover"
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
//         <div className="space-y-2">
//           <div className="flex justify-between">
//             <span>
//               {quantity > 1 ? `Product (${quantity} copies):` : "Product:"}
//             </span>
//             <span>${productPrice.toFixed(2)}</span>
//           </div>
//           {productType === ProductType.BOOK && (
//             <div className="flex justify-between">
//               <span>Shipping ({formatShippingLevel(shippingLevel)}):</span>
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
//         {hasShippingAddress(formData) && (
//           <div className="mt-4">
//             <h3 className="font-medium mb-2">Shipping To:</h3>
//             <p className="text-sm">
//               {formData.shippingAddress.name}
//               <br />
//               {formData.shippingAddress.street1}
//               {formData.shippingAddress.street2 && (
//                 <>
//                   <br />
//                   {formData.shippingAddress.street2}
//                 </>
//               )}
//               <br />
//               {formData.shippingAddress.city},{" "}
//               {formData.shippingAddress.state_code}{" "}
//               {formData.shippingAddress.postcode}
//               <br />
//               {formData.shippingAddress.country}
//             </p>
//           </div>
//         )}

//         {/* Customer email for digital orders */}
//         {isDigitalOrder(formData) && (
//           <div className="mt-4">
//             <h3 className="font-medium mb-2">Digital Delivery:</h3>
//             <p className="text-sm">
//               Your ebook will be delivered to: {formData.customerEmail}
//             </p>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter>
//         <Button variant="outline" onClick={onBack}>
//           Back
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
import React, { memo, useMemo } from "react";
import Image from "next/image";
import { BookFull } from "@/types/book";
import { ProductType } from "@/generated/prisma";
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
import { ShippingLevel } from "@/types/print";
import { useOrderStore } from "@/store/useOrderStore";
import { getProductPrice } from "@/utils/orderUtils";
import { ArrowLeft } from "lucide-react";

interface OrderReviewProps {
  book: BookFull;
  productType: ProductType;
  formData: CheckoutFormData;
  shippingCost?: number;
  shippingLevel?: ShippingLevel;
  onBack: () => void;
}

/**
 * OrderReview component displays the order summary before payment
 * Shows product details, pricing, and shipping information
 */
export const OrderReview = memo(function OrderReview({
  book,
  productType,
  formData,
  shippingCost,
  shippingLevel,
  onBack,
}: OrderReviewProps) {
  const totalCost = useOrderStore((state) => state.totalCost);
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

  // Use the helper function to calculate product price with quantity
  const productPrice = useMemo(
    () => getProductPrice(productType, quantity),
    [productType, quantity]
  );

  // Format shipping level display name
  const formattedShippingLevel = useMemo(() => {
    if (!shippingLevel) return "";
    return shippingLevel.replace("_", " ");
  }, [shippingLevel]);

  // Format the total cost properly
  const formattedTotalCost = useMemo(() => {
    return typeof totalCost === "string"
      ? parseFloat(totalCost).toFixed(2)
      : (totalCost || 0).toFixed(2);
  }, [totalCost]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
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
          <div className="flex justify-between">
            <span>
              {quantity > 1 ? `Product (${quantity} copies):` : "Product:"}
            </span>
            <span>${productPrice.toFixed(2)}</span>
          </div>

          {productType === ProductType.BOOK && (
            <div className="flex justify-between">
              <span>Shipping ({formattedShippingLevel}):</span>
              <span>${shippingCost?.toFixed(2) || "0.00"}</span>
            </div>
          )}

          <Separator />

          <div className="flex justify-between font-medium">
            <span>Total:</span>
            <span>${formattedTotalCost}</span>
          </div>
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
