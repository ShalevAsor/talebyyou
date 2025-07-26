"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ProductType } from "@prisma/client";
import { useForm } from "react-hook-form";

import { TextField } from "@/components/common/TextField";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DigitalOrderFormData,
  digitalOrderSchema,
} from "@/schemas/checkout-schema";

interface DigitalCheckoutFormProps {
  isGuest: boolean;
  isProcessing: boolean;
  defaultValues?: Partial<DigitalOrderFormData>;
  onSuccess: (data: DigitalOrderFormData) => void;
}

export function DigitalCheckoutForm({
  isProcessing,
  defaultValues = {},
  onSuccess,
}: DigitalCheckoutFormProps) {
  // Initialize form with digital order schema and any default values for editing
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<DigitalOrderFormData>({
    resolver: zodResolver(digitalOrderSchema),
    defaultValues: {
      productType: ProductType.EBOOK,
      customerEmail: defaultValues.customerEmail || "",
    },
  });

  // Form submission handler
  const onSubmit = (data: DigitalOrderFormData) => {
    onSuccess(data);
  };

  // Determine button text based on whether we're updating or creating
  const buttonText =
    Object.keys(defaultValues).length > 0
      ? isProcessing
        ? "Updating..."
        : "Update Order"
      : isProcessing
      ? "Processing..."
      : "Continue to Payment";

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
              id="customerEmail"
              placeholder="your@email.com"
              {...register("customerEmail")}
              error={errors.customerEmail?.message}
            />
          </div>

          {/* Digital delivery note */}
          <div className="p-4 bg-blue-50 rounded-md">
            <p className="text-sm text-blue-800">
              Your digital book will be sent to this email address after you
              finish customizing it
            </p>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full" disabled={isProcessing}>
            {buttonText}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
