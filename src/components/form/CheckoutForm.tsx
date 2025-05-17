"use client";

import React from "react";
import { TextField } from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckoutFormData } from "@/schemas/checkout-schema";
import { ProductType } from "@/generated/prisma";
import { useFormContext } from "react-hook-form";

interface CheckoutFormProps {
  productType: ProductType;
  total: number;
  isGuest: boolean;
  isProcessing: boolean;
  onSuccess: (data: CheckoutFormData) => void;
}

export function CheckoutForm({
  productType,
  total,
  isProcessing,
  onSuccess,
}: CheckoutFormProps) {
  // Use form context from the parent component
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useFormContext<CheckoutFormData>();

  // Form submission handler
  const onSubmit = () => {
    // Get the current form values
    const formData = getValues();

    // Ensure product type is correctly set
    formData.productType = productType;

    // Call the success handler with form data
    onSuccess(formData);
  };

  // Convert ProductType to form display logic
  const isPhysicalOrder = productType === ProductType.BOOK;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Complete Your Order</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Customer Information */}
          <div>
            <h3 className="text-lg font-medium mb-3">Customer Information</h3>

            <TextField
              label="Email Address"
              type="email"
              id="email"
              placeholder="your@email.com"
              {...register("email")}
              error={errors.email?.message}
            />
          </div>

          {/* Shipping Information (only for physical books) */}
          {isPhysicalOrder && (
            <div>
              <h3 className="text-lg font-medium mb-3">Shipping Information</h3>

              <TextField
                label="Full Name"
                id="fullName"
                placeholder="John Doe"
                {...register("shippingAddress.fullName")}
                error={errors.shippingAddress?.fullName?.message}
              />

              <TextField
                label="Address"
                id="address"
                placeholder="123 Main St"
                {...register("shippingAddress.address")}
                error={errors.shippingAddress?.address?.message}
              />

              <TextField
                label="City"
                id="city"
                placeholder="New York"
                {...register("shippingAddress.city")}
                error={errors.shippingAddress?.city?.message}
              />

              <div className="grid grid-cols-2 gap-3">
                <TextField
                  label="State/Province"
                  id="state"
                  placeholder="NY"
                  {...register("shippingAddress.state")}
                  error={errors.shippingAddress?.state?.message}
                />

                <TextField
                  label="ZIP/Postal Code"
                  id="zipCode"
                  placeholder="10001"
                  {...register("shippingAddress.zipCode")}
                  error={errors.shippingAddress?.zipCode?.message}
                />
              </div>

              <TextField
                label="Country"
                id="country"
                placeholder="United States"
                {...register("shippingAddress.country")}
                error={errors.shippingAddress?.country?.message}
              />
            </div>
          )}

          {/* Order Total Summary */}
          <div className="py-4 border-t border-b">
            <div className="flex justify-between font-medium">
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {isProcessing ? "Processing..." : "Continue to Payment"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
