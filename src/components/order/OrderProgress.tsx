"use client";

import { CheckCircle2 } from "lucide-react";

import { Progress } from "@/components/ui/progress";
import { OrderStep } from "@/types/order";

interface OrderProgressProps {
  currentStep: OrderStep;
}

/**
 * OrderProgress component displays the user's progress through the ordering process
 * Provides visual feedback about current step and completion status
 */
export function OrderProgress({ currentStep }: OrderProgressProps) {
  // Map order steps to numeric values for progress calculation
  const stepValues = {
    details: 1,
    shipping: 2,
    payment: 3,
  };

  // Calculate progress percentage
  const progressValue = (stepValues[currentStep] / 3) * 100;

  // Determine if each step is active, completed, or upcoming
  const isShippingCompleted = currentStep === "payment";
  const isShippingActive = currentStep === "shipping";
  const isDetailsCompleted =
    currentStep === "shipping" || currentStep === "payment";
  const isDetailsActive = currentStep === "details";
  const isPaymentActive = currentStep === "payment";

  return (
    <nav className="mb-8" aria-label="Order process">
      <div className="flex justify-between mb-2" role="list">
        <div
          className={`flex items-center ${
            isDetailsActive
              ? "text-blue-600 font-medium"
              : isDetailsCompleted
              ? "text-green-600 font-medium"
              : "text-gray-500"
          }`}
          role="listitem"
          aria-current={isDetailsActive ? "step" : undefined}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
              isDetailsActive
                ? "bg-blue-100 text-blue-600"
                : isDetailsCompleted
                ? "bg-green-100 text-green-600"
                : "bg-gray-200"
            }`}
          >
            {isDetailsCompleted ? (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              <span>1</span>
            )}
          </div>
          <span>Book Details</span>
        </div>

        <div
          className={`flex items-center ${
            isShippingActive
              ? "text-blue-600 font-medium"
              : isShippingCompleted
              ? "text-green-600 font-medium"
              : "text-gray-500"
          }`}
          role="listitem"
          aria-current={isShippingActive ? "step" : undefined}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
              isShippingActive
                ? "bg-blue-100 text-blue-600"
                : isShippingCompleted
                ? "bg-green-100 text-green-600"
                : "bg-gray-200"
            }`}
          >
            {isShippingCompleted ? (
              <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
            ) : (
              <span>2</span>
            )}
          </div>
          <span>Shipping Options</span>
        </div>

        <div
          className={`flex items-center ${
            isPaymentActive ? "text-blue-600 font-medium" : "text-gray-500"
          }`}
          role="listitem"
          aria-current={isPaymentActive ? "step" : undefined}
        >
          <div
            className={`flex items-center justify-center w-8 h-8 rounded-full mr-2 ${
              isPaymentActive ? "bg-blue-100 text-blue-600" : "bg-gray-200"
            }`}
          >
            <span>3</span>
          </div>
          <span>Payment</span>
        </div>
      </div>

      <Progress
        value={progressValue}
        className="h-2"
        aria-label={`Order process is at step ${currentStep}, ${Math.round(
          progressValue
        )}% complete`}
        aria-valuenow={progressValue}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </nav>
  );
}
