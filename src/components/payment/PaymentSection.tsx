"use client";

import { PayPalButtons, PayPalScriptProvider } from "@paypal/react-paypal-js";
import { ProductType } from "@prisma/client";
import { AlertCircle, ExternalLink, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { memo, useCallback, useState } from "react";
import { toast } from "react-toastify";

import {
  capturePayPalOrder,
  createPayPalOrder,
} from "@/actions/payment-actions";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useOrderStore } from "@/store/useOrderStore";
import { trackPurchase } from "@/utils/metaTracking";

import { PayPalLoader } from "./PayPalLoader";

interface PaymentSectionProps {
  orderId: string;
  payPalClientId: string;
  bookTitle: string;
}

/**
 * PaymentSection component handles payment processing via PayPal
 * Manages payment state and redirects users after successful payment
 */
export const PaymentSection = memo(function PaymentSection({
  orderId,
  payPalClientId,
  bookTitle,
}: PaymentSectionProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const router = useRouter();
  const { productType, totalCost, currentBookId } = useOrderStore();

  // Create PayPal order when user clicks payment button
  const handleCreatePaypalOrder = useCallback(async () => {
    try {
      setPaymentError(null);
      return await createPayPalOrder(orderId);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Failed to create order";

      setPaymentError(errorMessage);
      return "";
    }
  }, [orderId]);

  // Process payment when user approves PayPal order
  const handleApprovePaypalOrder = useCallback(
    async (data: { orderID: string }) => {
      try {
        setIsProcessingPayment(true);
        setPaymentError(null);

        await capturePayPalOrder(orderId, data.orderID);
        // 🎯 Track Purchase event - we need book data for this
        // You'll need to pass book data as props or get it from store
        trackPurchase({
          orderId: orderId,
          bookId: currentBookId || "NoId",
          bookTitle,
          productType: productType || ProductType.BOOK,
          value: parseFloat(totalCost || "34.99"),
          quantity: 1,
        });
        toast.success(
          "Payment successful! You'll receive a confirmation email shortly."
        );
        router.push("/my-books");
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : "Payment processing failed";

        setPaymentError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setIsProcessingPayment(false);
      }
    },
    [orderId, router, currentBookId, productType, totalCost, bookTitle]
  );

  if (!orderId) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardContent>
          <Alert variant="destructive" role="alert">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>
              There was a problem creating your order. Please go back and try
              again.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    );
  }

  // Enhanced PayPal configuration to fix phone number country code issue
  const paypalOptions = {
    clientId: payPalClientId,
    currency: "USD",
    intent: "capture",
    "enable-funding": "card,venmo,paylater",
    "disable-funding": "",
    components: "buttons,funding-eligibility",
    // Don't set buyer-country or locale - let PayPal auto-detect based on user's actual location
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment</CardTitle>
      </CardHeader>
      <CardContent>
        {paymentError && (
          <Alert variant="destructive" className="mb-4" role="alert">
            <AlertCircle className="h-4 w-4 mr-2" />
            <AlertDescription>{paymentError}</AlertDescription>
          </Alert>
        )}

        {isProcessingPayment ? (
          <div
            className="flex items-center justify-center py-8 mb-4"
            aria-live="polite"
            aria-busy="true"
          >
            <Loader2
              className="animate-spin h-8 w-8 text-indigo-600 mr-2"
              aria-hidden="true"
            />
            <span className="text-indigo-800 font-medium">
              Processing payment...
            </span>
          </div>
        ) : (
          <PayPalScriptProvider options={paypalOptions}>
            <PayPalLoader />
            <PayPalButtons
              createOrder={handleCreatePaypalOrder}
              onApprove={handleApprovePaypalOrder}
              disabled={isProcessingPayment}
              aria-label="Pay with PayPal"
              style={{
                layout: "vertical",
                color: "gold",
                shape: "rect",
                label: "pay",
                height: 40,
              }}
              // Remove any funding source restrictions
              fundingSource={undefined}
            />
          </PayPalScriptProvider>
        )}
      </CardContent>

      <CardFooter className="flex-col items-stretch">
        <p className="mt-4 text-xs text-gray-500 text-center">
          By placing your order, you agree to our{" "}
          <a
            href="/terms"
            className="text-blue-600 hover:underline inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Terms of Service
            <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="text-blue-600 hover:underline inline-flex items-center"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
            <ExternalLink className="h-3 w-3 ml-0.5" aria-hidden="true" />
          </a>
        </p>
      </CardFooter>
    </Card>
  );
});
