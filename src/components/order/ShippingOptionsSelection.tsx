// "use client";

// import React, { useState, useMemo } from "react";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Skeleton } from "@/components/ui/skeleton";
// import { AlertCircle, CheckCircle, Clock } from "lucide-react";
// import { useShippingOptions } from "@/hooks/useShippingOptions";
// import {
//   ShippingAddressForOptions,
//   ShippingLevel,
//   ShippingOption,
// } from "@/types/print";
// import { useOrderStore } from "@/store/useOrderStore";

// interface ShippingOptionsSelectionProps {
//   bookId: string;
//   shippingOptionsAddress: ShippingAddressForOptions;
//   onSelectShipping: (level: ShippingLevel) => void;
//   onBack: () => void;
//   isProcessing: boolean;
// }

// export function ShippingOptionsSelection({
//   bookId,
//   shippingOptionsAddress,
//   onSelectShipping,
//   onBack,
//   isProcessing,
// }: ShippingOptionsSelectionProps) {
//   // Get quantity from the OrderStore
//   const { quantity } = useOrderStore();

//   // Simple state for selected option
//   const [selectedOption, setSelectedOption] = useState<ShippingOption | null>(
//     null
//   );

//   // Use the custom hook for fetching shipping options
//   const {
//     data: shippingOptions,
//     isPending,
//     error,
//   } = useShippingOptions(bookId, quantity, shippingOptionsAddress);

//   // Sort options by price (lowest first) using useMemo
//   const sortedOptions = useMemo(() => {
//     if (!shippingOptions || !shippingOptions.length) return [];

//     return [...shippingOptions].sort((a, b) => {
//       const priceA = parseFloat(a.cost_excl_tax || "0");
//       const priceB = parseFloat(b.cost_excl_tax || "0");
//       return priceA - priceB;
//     });
//   }, [shippingOptions]);

//   // Handle shipping option selection
//   const handleSelectOption = (option: ShippingOption) => {
//     setSelectedOption(option);
//   };

//   // Handle continue button click
//   const handleContinue = () => {
//     if (!selectedOption) return;

//     // Just pass the shipping level to parent - parent will calculate costs
//     onSelectShipping(selectedOption.level);
//   };

//   // Format delivery dates to be more readable
//   const formatDeliveryDate = (dateString: string) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString("en-US", {
//       weekday: "short",
//       month: "short",
//       day: "numeric",
//     });
//   };

//   // Format currency
//   const formatCurrency = (amount: string | number | null) => {
//     if (!amount) return "$0.00";
//     const numericAmount =
//       typeof amount === "string" ? parseFloat(amount) : amount;
//     return new Intl.NumberFormat("en-US", {
//       style: "currency",
//       currency: "USD",
//     }).format(numericAmount);
//   };

//   // Generate a human-readable description for the shipping level
//   const getShippingLevelDescription = (level: ShippingLevel) => {
//     switch (level) {
//       case ShippingLevel.MAIL:
//         return "Standard mail delivery. Most economical shipping option.";
//       case ShippingLevel.PRIORITY_MAIL:
//         return "Priority mail shipping. Faster delivery than standard mail.";
//       case ShippingLevel.GROUND:
//         return "Courier-based ground shipping in the US with reliable delivery.";
//       case ShippingLevel.EXPEDITED:
//         return "Expedited delivery via air mail or equivalent. Faster than ground shipping.";
//       case ShippingLevel.EXPRESS:
//         return "Express delivery. Get your book as quickly as possible!";
//       default:
//         return "Standard shipping option.";
//     }
//   };

//   return (
//     <Card className="w-full">
//       <CardHeader>
//         <CardTitle>Shipping Options</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {isPending && (
//           <div className="space-y-2">
//             <Skeleton className="h-20 w-full rounded-md" />
//             <Skeleton className="h-20 w-full rounded-md" />
//             <Skeleton className="h-20 w-full rounded-md" />
//           </div>
//         )}

//         {error && (
//           <Alert variant="destructive" className="mb-4">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               Please check your shipping address or try again later.
//             </AlertDescription>
//           </Alert>
//         )}

//         {!isPending && !error && sortedOptions.length > 0 && (
//           <div className="space-y-4">
//             <div className="mb-4">
//               <p className="text-sm text-slate-500">
//                 Select a shipping option for your book. Printing will begin once
//                 your order is complete.
//               </p>
//               <p className="text-xs text-slate-400 mt-1">
//                 *Displayed shipping prices are estimates. Final price will be
//                 calculated at checkout.
//               </p>
//               {quantity > 1 && (
//                 <p className="text-sm font-medium mt-2">
//                   Order quantity: {quantity} copies
//                 </p>
//               )}
//             </div>

//             <RadioGroup
//               value={selectedOption?.id?.toString()}
//               className="space-y-3"
//             >
//               {sortedOptions.map((option) => (
//                 <div
//                   key={option.id}
//                   className={`border rounded-lg p-4 transition-colors cursor-pointer ${
//                     selectedOption?.id === option.id
//                       ? "border-blue-500 bg-blue-50"
//                       : "border-gray-200 hover:border-blue-200"
//                   }`}
//                   onClick={() => handleSelectOption(option)}
//                 >
//                   <div className="flex items-start">
//                     <RadioGroupItem
//                       value={option.id?.toString() || ""}
//                       id={`option-${option.id}`}
//                       className="mt-1 cursor-pointer"
//                       checked={selectedOption?.id === option.id}
//                     />
//                     <div className="ml-3 flex-1">
//                       <Label
//                         htmlFor={`option-${option.id}`}
//                         className="text-base font-medium flex items-center justify-between"
//                       >
//                         <span>{option.level.replace("_", " ")}</span>
//                         <span className="font-bold">
//                           {formatCurrency(option.cost_excl_tax)}
//                         </span>
//                       </Label>

//                       <div className="mt-1 text-sm text-gray-500">
//                         {getShippingLevelDescription(option.level)}
//                       </div>

//                       <div className="mt-2 flex items-center text-sm">
//                         <Clock className="h-4 w-4 mr-1 text-blue-500" />
//                         <span>
//                           Estimated delivery:{" "}
//                           {formatDeliveryDate(option.min_delivery_date)} -{" "}
//                           {formatDeliveryDate(option.max_delivery_date)}
//                         </span>
//                       </div>

//                       {option.traceable && (
//                         <div className="mt-1 text-xs text-green-600 flex items-center">
//                           <CheckCircle className="h-3 w-3 mr-1" />
//                           <span>Includes tracking</span>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </RadioGroup>
//           </div>
//         )}

//         {!isPending && !error && sortedOptions.length === 0 && (
//           <Alert className="mb-4">
//             <AlertCircle className="h-4 w-4" />
//             <AlertDescription>
//               No shipping options available for this address. Please check your
//               shipping address or try again later.
//             </AlertDescription>
//           </Alert>
//         )}
//       </CardContent>
//       <CardFooter className="flex justify-between">
//         <Button
//           variant="outline"
//           onClick={onBack}
//           disabled={isProcessing || isPending}
//         >
//           Back
//         </Button>
//         <Button
//           onClick={handleContinue}
//           disabled={isPending || isProcessing || !selectedOption}
//         >
//           {isProcessing ? "Processing..." : "Continue to Payment"}
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import React, { useState, useMemo, memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertCircle, CheckCircle, Clock } from "lucide-react";
import { useShippingOptions } from "@/hooks/useShippingOptions";
import {
  ShippingAddressForOptions,
  ShippingLevel,
  ShippingOption,
} from "@/types/print";
import { useOrderStore } from "@/store/useOrderStore";

interface ShippingOptionsSelectionProps {
  bookId: string;
  shippingOptionsAddress: ShippingAddressForOptions;
  onSelectShipping: (level: ShippingLevel) => void;
  onBack: () => void;
  isProcessing: boolean;
}

/**
 * ShippingOptionsSelection component displays available shipping options
 * Allows users to select a shipping method based on price and delivery time
 */
export const ShippingOptionsSelection = memo(function ShippingOptionsSelection({
  bookId,
  shippingOptionsAddress,
  onSelectShipping,
  onBack,
  isProcessing,
}: ShippingOptionsSelectionProps) {
  // Get quantity from the OrderStore
  const { quantity } = useOrderStore();

  // Track selected option ID as a string (or empty string) to avoid uncontrolled to controlled warning
  const [selectedOptionId, setSelectedOptionId] = useState<string>("");

  // Use the custom hook for fetching shipping options
  const {
    data: shippingOptions,
    isPending,
    error,
  } = useShippingOptions(bookId, quantity, shippingOptionsAddress);

  // Sort options by price (lowest first) using useMemo
  const sortedOptions = useMemo(() => {
    if (!shippingOptions || !shippingOptions.length) return [];

    return [...shippingOptions].sort((a, b) => {
      const priceA = parseFloat(a.cost_excl_tax || "0");
      const priceB = parseFloat(b.cost_excl_tax || "0");
      return priceA - priceB;
    });
  }, [shippingOptions]);

  // Find the selected option object based on the ID
  const selectedOption = useMemo(() => {
    if (!selectedOptionId || !sortedOptions.length) return null;
    return (
      sortedOptions.find((opt) => opt.id?.toString() === selectedOptionId) ||
      null
    );
  }, [selectedOptionId, sortedOptions]);

  // Handle shipping option selection - update the ID, not the object
  const handleSelectOption = (option: ShippingOption) => {
    const optionId = option.id?.toString() || "";
    setSelectedOptionId(optionId);
  };

  // Handle radio value change directly
  const handleRadioChange = (value: string) => {
    setSelectedOptionId(value);
  };

  // Handle continue button click
  const handleContinue = () => {
    if (!selectedOption) return;
    // Just pass the shipping level to parent - parent will calculate costs
    onSelectShipping(selectedOption.level);
  };

  // Format delivery dates to be more readable
  const formatDeliveryDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format currency
  const formatCurrency = (amount: string | number | null) => {
    if (!amount) return "$0.00";
    const numericAmount =
      typeof amount === "string" ? parseFloat(amount) : amount;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(numericAmount);
  };

  // Generate a human-readable description for the shipping level
  const getShippingLevelDescription = (level: ShippingLevel) => {
    switch (level) {
      case ShippingLevel.MAIL:
        return "Standard mail delivery. Most economical shipping option.";
      case ShippingLevel.PRIORITY_MAIL:
        return "Priority mail shipping. Faster delivery than standard mail.";
      case ShippingLevel.GROUND:
        return "Courier-based ground shipping in the US with reliable delivery.";
      case ShippingLevel.EXPEDITED:
        return "Expedited delivery via air mail or equivalent. Faster than ground shipping.";
      case ShippingLevel.EXPRESS:
        return "Express delivery. Get your book as quickly as possible!";
      default:
        return "Standard shipping option.";
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Shipping Options</CardTitle>
      </CardHeader>
      <CardContent>
        {isPending && (
          <div className="space-y-2" aria-label="Loading shipping options">
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
            <Skeleton className="h-20 w-full rounded-md" />
          </div>
        )}

        {error && (
          <Alert variant="destructive" className="mb-4" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              Please check your shipping address or try again later.
            </AlertDescription>
          </Alert>
        )}

        {!isPending && !error && sortedOptions.length > 0 && (
          <div className="space-y-4">
            <div className="mb-4">
              <p className="text-sm text-slate-500">
                Select a shipping option for your book. Printing will begin once
                your order is complete.
              </p>
              <p className="text-xs text-slate-400 mt-1">
                *Displayed shipping prices are estimates. Final price will be
                calculated at checkout.
              </p>
              {quantity > 1 && (
                <p className="text-sm font-medium mt-2">
                  Order quantity: {quantity} copies
                </p>
              )}
            </div>

            <RadioGroup
              value={selectedOptionId}
              onValueChange={handleRadioChange}
              className="space-y-3"
              aria-label="Shipping options"
            >
              {sortedOptions.map((option) => (
                <div
                  key={option.id}
                  className={`border rounded-lg p-4 transition-colors cursor-pointer ${
                    selectedOptionId === option.id?.toString()
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-200"
                  }`}
                  onClick={() => handleSelectOption(option)}
                  role="button"
                  aria-label={`Select ${option.level.replace(
                    "_",
                    " "
                  )} shipping`}
                >
                  <div className="flex items-start">
                    <RadioGroupItem
                      value={option.id?.toString() || ""}
                      id={`option-${option.id}`}
                      className="mt-1 cursor-pointer"
                    />
                    <div className="ml-3 flex-1">
                      <Label
                        htmlFor={`option-${option.id}`}
                        className="text-base font-medium flex items-center justify-between cursor-pointer"
                      >
                        <span>{option.level.replace("_", " ")}</span>
                        <span className="font-bold">
                          {formatCurrency(option.cost_excl_tax)}
                        </span>
                      </Label>

                      <div className="mt-1 text-sm text-gray-500">
                        {getShippingLevelDescription(option.level)}
                      </div>

                      <div className="mt-2 flex items-center text-sm">
                        <Clock
                          className="h-4 w-4 mr-1 text-blue-500"
                          aria-hidden="true"
                        />
                        <span>
                          Estimated delivery:{" "}
                          {formatDeliveryDate(option.min_delivery_date)} -{" "}
                          {formatDeliveryDate(option.max_delivery_date)}
                        </span>
                      </div>

                      {option.traceable && (
                        <div className="mt-1 text-xs text-green-600 flex items-center">
                          <CheckCircle
                            className="h-3 w-3 mr-1"
                            aria-hidden="true"
                          />
                          <span>Includes tracking</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {!isPending && !error && sortedOptions.length === 0 && (
          <Alert className="mb-4" role="alert">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <AlertDescription>
              No shipping options available for this address. Please check your
              shipping address or try again later.
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isProcessing || isPending}
        >
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={isPending || isProcessing || !selectedOption}
        >
          {isProcessing ? "Processing..." : "Continue to Payment"}
        </Button>
      </CardFooter>
    </Card>
  );
});
