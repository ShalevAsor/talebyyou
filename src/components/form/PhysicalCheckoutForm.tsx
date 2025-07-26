"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType } from "@prisma/client";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { validateShippingAddress } from "@/actions/print-actions";
import { SelectField } from "@/components/common/SelectField";
import { TextField } from "@/components/common/TextField";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CA_PROVINCES, COUNTRY_OPTIONS, US_STATES } from "@/data/countries";
import {
  PhysicalOrderFormData,
  physicalOrderSchema,
} from "@/schemas/checkout-schema";
import {
  AddressValidationResult,
  ShippingLevel,
  SuggestedAddress,
} from "@/types/print";
import { mapFormToShippingAddress } from "@/utils/orderUtils";

interface PhysicalCheckoutFormProps {
  isGuest: boolean;
  isProcessing: boolean;
  defaultValues?: Partial<PhysicalOrderFormData>;
  onSuccess: (data: PhysicalOrderFormData) => void;
}

export function PhysicalCheckoutForm({
  isProcessing,
  defaultValues = {},
  onSuccess,
}: PhysicalCheckoutFormProps) {
  // State for address validation
  const [isValidatingAddress, setIsValidatingAddress] = useState(false);
  const [addressValidation, setAddressValidation] =
    useState<AddressValidationResult | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // State to track selected country for conditional rendering
  const [selectedCountry, setSelectedCountry] = useState(
    defaultValues.shippingAddress?.country || ""
  );

  // Get state/province options based on selected country
  const getStateOptions = () => {
    switch (selectedCountry) {
      case "US":
        return US_STATES;
      case "CA":
        return CA_PROVINCES;
      default:
        return [];
    }
  };

  // Initialize form with physical order schema and any default values for editing
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<PhysicalOrderFormData>({
    resolver: zodResolver(physicalOrderSchema),
    defaultValues: {
      productType: ProductType.BOOK,
      customerEmail: defaultValues.customerEmail || "",
      shippingAddress: {
        name: defaultValues.shippingAddress?.name || "",
        street1: defaultValues.shippingAddress?.street1 || "",
        street2: defaultValues.shippingAddress?.street2 || "",
        city: defaultValues.shippingAddress?.city || "",
        state_code: defaultValues.shippingAddress?.state_code || "",
        postcode: defaultValues.shippingAddress?.postcode || "",
        country: defaultValues.shippingAddress?.country || "",
        phone_number: defaultValues.shippingAddress?.phone_number || "",
      },
    },
  });

  // Watch country field to update UI
  const watchedCountry = watch("shippingAddress.country");
  if (watchedCountry !== selectedCountry) {
    setSelectedCountry(watchedCountry);
  }

  // Function to apply suggested address to the form
  const applyAddressSuggestion = (suggestion: SuggestedAddress) => {
    // reset validation state
    setAddressValidation(null);

    // Apply suggested address to the form
    if (suggestion) {
      setValue("shippingAddress.street1", suggestion.street1);
      if (suggestion.street2 !== null) {
        setValue("shippingAddress.street2", suggestion.street2);
      }
      setValue("shippingAddress.city", suggestion.city);
      if (suggestion.state_code !== null) {
        setValue("shippingAddress.state_code", suggestion.state_code);
      }
      setValue("shippingAddress.postcode", suggestion.postcode.toString());
      setValue("shippingAddress.country", suggestion.country_code);
      setSelectedCountry(suggestion.country_code);
    }

    // Clear validation state
    setAddressValidation(null);
  };

  // Form submission handler
  const onSubmit = async (data: PhysicalOrderFormData) => {
    setErrorMessage(null);
    setIsValidatingAddress(true);

    try {
      // First, validate the shipping address
      const shippingAddress = mapFormToShippingAddress(data);
      const validationResult = await validateShippingAddress(
        shippingAddress,
        1, // Assuming a single item for simplicity
        30, // 30 pages for a book
        ShippingLevel.MAIL // Default shipping level for validation
      );

      if (validationResult.success) {
        const addressValidation = validationResult.data;

        // Check if there are warnings or suggested address
        if (addressValidation.hasWarnings && !addressValidation.isValid) {
          // Store validation result to show warnings/suggestions
          setAddressValidation(addressValidation);
          setIsValidatingAddress(false);
          return; // Don't proceed until user confirms
        }

        // If the address is valid, proceed to the next step
        onSuccess(data);
      } else {
        // Handle validation error
        setErrorMessage(validationResult.error || "Address validation failed");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "An error occurred during address validation"
      );
    } finally {
      setIsValidatingAddress(false);
    }
  };

  // Determine button text based on state
  const buttonText = isValidatingAddress
    ? "Validating Address..."
    : isProcessing
    ? Object.keys(defaultValues).length > 0
      ? "Updating..."
      : "Processing..."
    : Object.keys(defaultValues).length > 0
    ? "Update Order"
    : "Continue to Shipping Options";

  return (
    <Card>
      <CardHeader>
        <CardTitle>Shipping Information</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Error message */}
          {errorMessage && (
            <Alert variant="destructive">
              <AlertDescription>{errorMessage}</AlertDescription>
            </Alert>
          )}

          {/* Address validation warnings/suggestions */}
          {addressValidation && addressValidation.hasWarnings && (
            <Alert variant="warning" className="mb-4">
              <AlertTitle>Address Warning</AlertTitle>
              <AlertDescription>
                {addressValidation.warnings?.message ||
                  "There may be an issue with your address."}
                {addressValidation.suggestedAddress && (
                  <div className="mt-4">
                    <p className="font-medium">Suggested Address:</p>
                    <div className="ml-2 mt-2">
                      <p>{addressValidation.suggestedAddress.street1}</p>
                      {addressValidation.suggestedAddress.street2 && (
                        <p>{addressValidation.suggestedAddress.street2}</p>
                      )}
                      <p>
                        {addressValidation.suggestedAddress.city},
                        {addressValidation.suggestedAddress.state_code &&
                          ` ${addressValidation.suggestedAddress.state_code}`}
                        {addressValidation.suggestedAddress.postcode}
                      </p>
                      <p>{addressValidation.suggestedAddress.country_code}</p>
                    </div>
                    <div className="flex space-x-2 mt-4">
                      <Button
                        type="button"
                        variant="default"
                        size="sm"
                        onClick={() =>
                          applyAddressSuggestion(
                            addressValidation.suggestedAddress!
                          )
                        }
                      >
                        Use Suggested Address
                      </Button>
                    </div>
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Customer Information</h3>
            <TextField
              label="Email Address"
              type="email"
              id="customerEmail"
              placeholder="your@email.com"
              {...register("customerEmail")}
              error={errors.customerEmail?.message}
            />
          </div>

          {/* Shipping Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Shipping Address</h3>
            <TextField
              label="Full Name"
              id="name"
              placeholder="John Doe"
              {...register("shippingAddress.name")}
              error={errors.shippingAddress?.name?.message}
            />

            <TextField
              label="Address Line 1"
              id="street1"
              placeholder="123 Main St"
              {...register("shippingAddress.street1")}
              error={errors.shippingAddress?.street1?.message}
            />

            <TextField
              label="Address Line 2 (Optional)"
              id="street2"
              placeholder="Apt 4B"
              {...register("shippingAddress.street2")}
              error={errors.shippingAddress?.street2?.message}
            />

            <TextField
              label="City"
              id="city"
              placeholder="New York"
              {...register("shippingAddress.city")}
              error={errors.shippingAddress?.city?.message}
            />

            {/* Country selection dropdown */}
            <SelectField
              label="Country"
              id="country"
              options={COUNTRY_OPTIONS}
              {...register("shippingAddress.country")}
              error={errors.shippingAddress?.country?.message}
              onChange={(e) => {
                setValue("shippingAddress.country", e.target.value);
                setValue("shippingAddress.state_code", ""); // Reset state when country changes
                setSelectedCountry(e.target.value);
              }}
            />

            <div className="grid grid-cols-2 gap-3">
              {/* State/Province field changes based on country */}
              {selectedCountry === "US" || selectedCountry === "CA" ? (
                <SelectField
                  label={selectedCountry === "US" ? "State" : "Province"}
                  id="state_code"
                  options={getStateOptions()}
                  {...register("shippingAddress.state_code")}
                  error={errors.shippingAddress?.state_code?.message}
                />
              ) : (
                <TextField
                  label="State/Province Code"
                  id="state_code"
                  placeholder="State/Province"
                  {...register("shippingAddress.state_code")}
                  error={errors.shippingAddress?.state_code?.message}
                  helperText="Use 2-letter code if applicable"
                />
              )}

              <TextField
                label="Postal Code"
                id="postcode"
                placeholder="10001"
                {...register("shippingAddress.postcode")}
                error={errors.shippingAddress?.postcode?.message}
              />
            </div>

            <TextField
              label="Phone Number"
              id="phone_number"
              placeholder="+1 555-123-4567"
              {...register("shippingAddress.phone_number")}
              error={errors.shippingAddress?.phone_number?.message}
              helperText="Required for shipping carriers"
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isProcessing || isValidatingAddress}
          >
            {buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
