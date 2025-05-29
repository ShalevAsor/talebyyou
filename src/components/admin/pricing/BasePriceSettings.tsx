"use client";

import { useState } from "react";
import { updateBasePrices } from "@/actions/pricing-actions";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { DollarSign, CheckCircle } from "lucide-react";
import { PricingConfig } from "@/types/pricing";
import { toast } from "react-toastify";
import { usePricingMutations } from "@/hooks/usePricingMutations";

interface BasePriceSettingsProps {
  initialPricing: PricingConfig;
}

export function BasePriceSettings({ initialPricing }: BasePriceSettingsProps) {
  const [physicalPrice, setPhysicalPrice] = useState(
    initialPricing.physicalBookPrice.toString()
  );
  const [digitalPrice, setDigitalPrice] = useState(
    initialPricing.digitalBookPrice.toString()
  );
  const [additionalCopyPrice, setAdditionalCopyPrice] = useState(
    initialPricing.additionalCopyPrice.toString()
  );
  const [isLoading, setIsLoading] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(null);

  // Use pricing mutations hook for cache management
  const { invalidatePricing } = usePricingMutations();

  const handleUpdatePrices = async () => {
    setIsLoading(true);
    try {
      const result = await updateBasePrices({
        physicalBookPrice: physicalPrice,
        digitalBookPrice: digitalPrice,
        additionalCopyPrice: additionalCopyPrice,
      });

      if (result.success) {
        setLastSaved(new Date());
        toast.success("Base prices updated successfully!");

        // Invalidate pricing cache to update all components immediately
        await invalidatePricing();
      } else {
        toast.error(result.error || "Failed to update prices");
      }
    } catch (error) {
      console.error("Failed to update base prices:", error);
      toast.error("An unexpected error occurred");
    }
    setIsLoading(false);
  };

  // Check if values have changed from initial
  const hasChanges =
    physicalPrice !== initialPricing.physicalBookPrice.toString() ||
    digitalPrice !== initialPricing.digitalBookPrice.toString() ||
    additionalCopyPrice !== initialPricing.additionalCopyPrice.toString();

  // Validate prices
  const physicalPriceNum = parseFloat(physicalPrice);
  const digitalPriceNum = parseFloat(digitalPrice);
  const additionalCopyPriceNum = parseFloat(additionalCopyPrice);
  const isValidPhysical = !isNaN(physicalPriceNum) && physicalPriceNum > 0;
  const isValidDigital = !isNaN(digitalPriceNum) && digitalPriceNum > 0;
  const isValidAdditional =
    !isNaN(additionalCopyPriceNum) && additionalCopyPriceNum > 0;
  const canSave =
    isValidPhysical && isValidDigital && isValidAdditional && hasChanges;

  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="flex items-center mb-6">
        <DollarSign className="w-5 h-5 text-green-600 mr-2" />
        <h2 className="text-lg font-semibold">Base Prices</h2>
      </div>

      {lastSaved && (
        <Alert className="mb-6 border-green-200 bg-green-50">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            Prices updated successfully at {lastSaved.toLocaleTimeString()}
          </AlertDescription>
        </Alert>
      )}

      <div className="space-y-6">
        {/* Physical Book Price */}
        <div>
          <Label htmlFor="physical-price">
            Physical Book Price (1st Copy) - USD
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              id="physical-price"
              type="number"
              step="0.01"
              min="0"
              value={physicalPrice}
              onChange={(e) => setPhysicalPrice(e.target.value)}
              placeholder="34.99"
              className="pl-8"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Base price for the first copy of a physical book
          </p>
          {!isValidPhysical && physicalPrice && (
            <p className="text-sm text-red-600 mt-1">
              Please enter a valid price greater than $0
            </p>
          )}
        </div>

        {/* Additional Copy Price */}
        <div>
          <Label htmlFor="additional-copy-price">
            Additional Copy Price (USD)
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              id="additional-copy-price"
              type="number"
              step="0.01"
              min="0"
              value={additionalCopyPrice}
              onChange={(e) => setAdditionalCopyPrice(e.target.value)}
              placeholder="25.00"
              className="pl-8"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Price for each additional copy when ordering multiple physical books
          </p>
          {!isValidAdditional && additionalCopyPrice && (
            <p className="text-sm text-red-600 mt-1">
              Please enter a valid price greater than $0
            </p>
          )}
        </div>

        {/* Digital Book Price */}
        <div>
          <Label htmlFor="digital-price">Digital Book Price (USD)</Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
            <Input
              id="digital-price"
              type="number"
              step="0.01"
              min="0"
              value={digitalPrice}
              onChange={(e) => setDigitalPrice(e.target.value)}
              placeholder="19.99"
              className="pl-8"
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">
            Price for digital book downloads (eBooks)
          </p>
          {!isValidDigital && digitalPrice && (
            <p className="text-sm text-red-600 mt-1">
              Please enter a valid price greater than $0
            </p>
          )}
        </div>

        {/* Price Preview */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="font-medium text-sm text-gray-700 mb-3">
            Current Pricing Structure
          </h3>
          <div className="text-sm space-y-2">
            <div className="flex justify-between">
              <span>Physical Book (1st copy):</span>
              <span className="font-medium">
                ${isValidPhysical ? physicalPriceNum.toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Additional Copies (each):</span>
              <span className="font-medium">
                $
                {isValidAdditional ? additionalCopyPriceNum.toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Digital Book:</span>
              <span className="font-medium">
                ${isValidDigital ? digitalPriceNum.toFixed(2) : "0.00"}
              </span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between text-sm text-gray-600">
                <span>Example: 3 Physical Books</span>
                <span>
                  $
                  {(
                    (isValidPhysical ? physicalPriceNum : 0) +
                    2 * (isValidAdditional ? additionalCopyPriceNum : 0)
                  ).toFixed(2)}{" "}
                  + shipping
                </span>
              </div>
            </div>
          </div>
        </div>

        <Button
          onClick={handleUpdatePrices}
          disabled={isLoading || !canSave}
          className="w-full"
        >
          {isLoading ? "Updating..." : "Update Base Prices"}
        </Button>

        {!hasChanges && (
          <p className="text-sm text-gray-500 text-center">
            No changes to save
          </p>
        )}
      </div>
    </div>
  );
}
