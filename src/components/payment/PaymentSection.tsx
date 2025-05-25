// // src/components/payment/PaymentSection.tsx
// "use client";
// import React, { useState } from "react";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
// import { PayPalLoader } from "./PayPalLoader";
// import {
//   capturePayPalOrder,
//   createPayPalOrder,
// } from "@/actions/payment-actions";
// import { toast } from "react-toastify";
// import { useRouter } from "next/navigation";
// interface PaymentSectionProps {
//   orderId: string;
//   payPalClientId: string;
// }

// export function PaymentSection({
//   orderId,
//   payPalClientId,
// }: PaymentSectionProps) {
//   const router = useRouter();
//   const [isProcessingPayment, setIsProcessingPayment] = useState(false);
//   const [paymentError, setPaymentError] = useState<string | null>(null);

//   const handleCreatePaypalOrder = async () => {
//     try {
//       return await createPayPalOrder(orderId);
//     } catch (error) {
//       setPaymentError(
//         error instanceof Error ? error.message : "Failed to create order"
//       );
//       return "";
//     }
//   };
//   const handleApprovePaypalOrder = async (data: { orderID: string }) => {
//     try {
//       setIsProcessingPayment(true);
//       setPaymentError(null);

//       await capturePayPalOrder(orderId, data.orderID);
//       toast.success("Payment successful!");

//       // Navigate to my-books page
//       router.push("/my-books");
//     } catch (error) {
//       const errorMessage =
//         error instanceof Error ? error.message : "Payment processing failed";
//       setPaymentError(errorMessage);
//       toast.error(errorMessage);
//     } finally {
//       setIsProcessingPayment(false);
//     }
//   };
//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Payment</CardTitle>
//       </CardHeader>
//       <CardContent>
//         {!orderId ? (
//           <Alert variant="destructive">
//             <AlertDescription>
//               There was a problem creating your order. Please go back and try
//               again.
//             </AlertDescription>
//           </Alert>
//         ) : (
//           <>
//             {paymentError && (
//               <Alert variant="destructive" className="mb-4">
//                 <AlertDescription>{paymentError}</AlertDescription>
//               </Alert>
//             )}
//             {isProcessingPayment && (
//               <div className="flex items-center justify-center py-8 mb-4">
//                 <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
//                 <span className="ml-2">Processing payment...</span>
//               </div>
//             )}
//             <PayPalScriptProvider options={{ clientId: payPalClientId }}>
//               <PayPalLoader />
//               {!isProcessingPayment && (
//                 <PayPalButtons
//                   createOrder={handleCreatePaypalOrder}
//                   onApprove={handleApprovePaypalOrder}
//                   disabled={isProcessingPayment}
//                 />
//               )}
//             </PayPalScriptProvider>
//           </>
//         )}
//       </CardContent>
//       <CardFooter className="flex-col items-stretch">
//         <p className="mt-4 text-xs text-gray-500 text-center">
//           By placing your order, you agree to our{" "}
//           <a href="/terms" className="text-blue-600 hover:underline">
//             Terms of Service
//           </a>{" "}
//           and{" "}
//           <a href="/privacy" className="text-blue-600 hover:underline">
//             Privacy Policy
//           </a>
//         </p>
//       </CardFooter>
//     </Card>
//   );
// }
"use client";

import React, { useState, useCallback, memo } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { PayPalLoader } from "./PayPalLoader";
import {
  capturePayPalOrder,
  createPayPalOrder,
} from "@/actions/payment-actions";
import { toast } from "react-toastify";
import { Loader2, AlertCircle, ExternalLink } from "lucide-react";
import { useRouter } from "next/navigation";

interface PaymentSectionProps {
  orderId: string;
  payPalClientId: string;
}

/**
 * PaymentSection component handles payment processing via PayPal
 * Manages payment state and redirects users after successful payment
 */
export const PaymentSection = memo(function PaymentSection({
  orderId,
  payPalClientId,
}: PaymentSectionProps) {
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);
  const router = useRouter();
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
    [orderId, router]
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
          <PayPalScriptProvider options={{ clientId: payPalClientId }}>
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
              }}
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
