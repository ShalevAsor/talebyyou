// import { useState } from "react";
// import {
//   createOrRecoverOrder,
//   updateOrder,
//   createOrderWithShipping,
//   updateOrderWithShipping,
// } from "@/actions/order-actions";
// import { CheckoutFormData } from "@/schemas/checkout-schema";
// import { ShippingLevel } from "@prisma/client";
// import { toast } from "react-toastify";

// interface UseOrderMutationOptions {
//   onSuccess?: (order: { id: string }) => void;
//   onError?: (error: string) => void;
//   onUpdateSuccess?: (order: { id: string }) => void;
//   onUpdateError?: (error: string) => void;
//   onShippingSuccess?: (order: { id: string }) => void;
//   onShippingError?: (error: string) => void;
// }

// export function useOrderMutation(options?: UseOrderMutationOptions) {
//   const [isCreating, setIsCreating] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const [isProcessingShipping, setIsProcessingShipping] = useState(false);
//   const [createOrderError, setCreateOrderError] = useState<string | null>(null);
//   const [updateOrderError, setUpdateOrderError] = useState<string | null>(null);
//   const [shippingError, setShippingError] = useState<string | null>(null);

//   /**
//    * Create a new order or recover an existing pending order
//    */
//   const createOrder = async (
//     bookId: string,
//     formData: CheckoutFormData,
//     quantity: number = 1
//   ) => {
//     setIsCreating(true);
//     setCreateOrderError(null);

//     try {
//       // Make sure the product type is properly set in the form data
//       if (!formData.productType) {
//         throw new Error("Product type is missing from form data");
//       }

//       // Use the new function that handles both creating and recovering orders
//       const result = await createOrRecoverOrder(formData, bookId, quantity);

//       if (result.success) {
//         const orderId = result.data;

//         // Show success toast
//         toast.success(
//           "Your order information has been saved. Continue to shipping."
//         );

//         // Call success callback if provided
//         if (options?.onSuccess) {
//           options.onSuccess({ id: orderId });
//         }
//         return { id: orderId };
//       } else {
//         // Handle error
//         const errorMessage = result.error || "Failed to create order";
//         setCreateOrderError(errorMessage);

//         // Show error toast
//         toast.error(`Order creation failed: ${errorMessage}`);

//         // Call error callback if provided
//         if (options?.onError) {
//           options.onError(errorMessage);
//         }

//         return null;
//       }
//     } catch (error) {
//       // Handle unexpected errors
//       const errorMessage =
//         error instanceof Error ? error.message : "An unexpected error occurred";

//       setCreateOrderError(errorMessage);

//       // Show error toast
//       toast.error(`Order creation failed: ${errorMessage}`);

//       // Call error callback if provided
//       if (options?.onError) {
//         options.onError(errorMessage);
//       }

//       return null;
//     } finally {
//       setIsCreating(false);
//     }
//   };

//   /**
//    * Update an existing order with new form data
//    */
//   const updateExistingOrder = async (
//     orderId: string,
//     formData: CheckoutFormData,
//     quantity: number = 1
//   ) => {
//     if (!orderId) {
//       const errorMsg = "Cannot update order: No order ID provided";
//       setUpdateOrderError(errorMsg);
//       toast.error(errorMsg);
//       return null;
//     }

//     setIsUpdating(true);
//     setUpdateOrderError(null);

//     try {
//       const result = await updateOrder(orderId, formData, quantity);

//       if (result.success) {
//         // Show success toast
//         toast.success("Your order has been updated. Continue to shipping.");

//         // Call update success callback if provided
//         if (options?.onUpdateSuccess) {
//           options.onUpdateSuccess({ id: orderId });
//         }
//         return { id: orderId };
//       } else {
//         // Handle error
//         const errorMessage = result.error || "Failed to update order";
//         setUpdateOrderError(errorMessage);

//         // Show error toast
//         toast.error(`Order update failed: ${errorMessage}`);

//         // Call update error callback if provided
//         if (options?.onUpdateError) {
//           options.onUpdateError(errorMessage);
//         }

//         return null;
//       }
//     } catch (error) {
//       // Handle unexpected errors
//       const errorMessage =
//         error instanceof Error ? error.message : "An unexpected error occurred";

//       setUpdateOrderError(errorMessage);

//       // Show error toast
//       toast.error(`Order update failed: ${errorMessage}`);

//       // Call update error callback if provided
//       if (options?.onUpdateError) {
//         options.onUpdateError(errorMessage);
//       }

//       return null;
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   /**
//    * Create or update an order with shipping details
//    */
//   const processOrderWithShipping = async (
//     bookId: string,
//     orderId: string | null,
//     formData: CheckoutFormData,
//     shippingLevel: ShippingLevel,
//     shippingCost: string,
//     totalPrice: string,
//     costBreakdown?: {
//       printingCost?: string;
//       imagesCost?: string;
//     }
//   ) => {
//     setIsProcessingShipping(true);
//     setShippingError(null);

//     try {
//       // Verify data
//       if (!formData || formData.productType !== "BOOK") {
//         throw new Error("Invalid form data for shipping");
//       }

//       let result;

//       if (orderId) {
//         // Update existing order with shipping
//         result = await updateOrderWithShipping(
//           orderId,
//           formData,
//           shippingLevel,
//           shippingCost,
//           totalPrice,
//           costBreakdown
//         );
//       } else {
//         // Create new order with shipping
//         // Note: createOrderWithShipping would need to be updated similarly
//         result = await createOrderWithShipping(
//           bookId,
//           formData,
//           shippingLevel,
//           shippingCost,
//           totalPrice,
//           costBreakdown
//         );
//       }

//       if (result.success) {
//         const resultOrderId = result.data;

//         // Show success toast
//         toast.success("Shipping details saved. Continue to payment.");

//         // Call shipping success callback
//         if (options?.onShippingSuccess) {
//           options.onShippingSuccess({ id: resultOrderId });
//         }

//         return { id: resultOrderId };
//       } else {
//         // Handle error
//         const errorMessage =
//           result.error || "Failed to process shipping details";
//         setShippingError(errorMessage);

//         // Show error toast
//         toast.error(`Shipping processing failed: ${errorMessage}`);

//         // Call shipping error callback
//         if (options?.onShippingError) {
//           options.onShippingError(errorMessage);
//         }

//         return null;
//       }
//     } catch (error) {
//       // Handle unexpected errors
//       const errorMessage =
//         error instanceof Error ? error.message : "An unexpected error occurred";

//       setShippingError(errorMessage);

//       // Show error toast
//       toast.error(`Shipping processing failed: ${errorMessage}`);

//       // Call shipping error callback
//       if (options?.onShippingError) {
//         options.onShippingError(errorMessage);
//       }

//       return null;
//     } finally {
//       setIsProcessingShipping(false);
//     }
//   };

//   return {
//     createOrder,
//     updateExistingOrder,
//     processOrderWithShipping,
//     isCreating,
//     isUpdating,
//     isProcessingShipping,
//     createOrderError,
//     updateOrderError,
//     shippingError,
//   };
// }
import { useState } from "react";
import {
  createOrRecoverOrder,
  updateOrder,
  createOrderWithShipping,
  updateOrderWithShipping,
} from "@/actions/order-actions";
import { CheckoutFormData } from "@/schemas/checkout-schema";
import { ShippingLevel } from "@prisma/client";
import { toast } from "react-toastify";

interface UseOrderMutationOptions {
  onSuccess?: (order: { id: string }) => void;
  onError?: (error: string) => void;
  onUpdateSuccess?: (order: { id: string }) => void;
  onUpdateError?: (error: string) => void;
  onShippingSuccess?: (order: { id: string }) => void;
  onShippingError?: (error: string) => void;
}

export function useOrderMutation(options?: UseOrderMutationOptions) {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isProcessingShipping, setIsProcessingShipping] = useState(false);
  const [createOrderError, setCreateOrderError] = useState<string | null>(null);
  const [updateOrderError, setUpdateOrderError] = useState<string | null>(null);
  const [shippingError, setShippingError] = useState<string | null>(null);

  /**
   * Create a new order or recover an existing pending order
   */
  const createOrder = async (
    bookId: string,
    formData: CheckoutFormData,
    quantity: number = 1
  ) => {
    // 🐛 DEBUG: Log quantity at function entry
    console.log("🐛 [createOrder] Function called with:", {
      bookId,
      quantity,
      productType: formData.productType,
      timestamp: new Date().toISOString(),
    });

    setIsCreating(true);
    setCreateOrderError(null);

    try {
      // Make sure the product type is properly set in the form data
      if (!formData.productType) {
        throw new Error("Product type is missing from form data");
      }

      // 🐛 DEBUG: Log before calling createOrRecoverOrder
      console.log("🐛 [createOrder] About to call createOrRecoverOrder with:", {
        formData: {
          productType: formData.productType,
          customerEmail: formData.customerEmail,
          // Add other relevant form fields you want to see
        },
        bookId,
        quantity,
      });

      // Use the new function that handles both creating and recovering orders
      const result = await createOrRecoverOrder(formData, bookId, quantity);

      // 🐛 DEBUG: Log the result from createOrRecoverOrder
      console.log("🐛 [createOrder] createOrRecoverOrder result:", {
        success: result.success,
        data: result.success ? result.data : null,
        error: result.success ? null : result.error,
      });

      if (result.success) {
        const orderId = result.data;

        // Show success toast
        toast.success(
          "Your order information has been saved. Continue to shipping."
        );

        // 🐛 DEBUG: Log successful order creation
        console.log("🐛 [createOrder] Order created successfully:", {
          orderId,
          quantity,
        });

        // Call success callback if provided
        if (options?.onSuccess) {
          options.onSuccess({ id: orderId });
        }
        return { id: orderId };
      } else {
        // Handle error
        const errorMessage = result.error || "Failed to create order";
        setCreateOrderError(errorMessage);

        // 🐛 DEBUG: Log error
        console.error("🐛 [createOrder] Order creation failed:", {
          errorMessage,
          quantity,
        });

        // Show error toast
        toast.error(`Order creation failed: ${errorMessage}`);

        // Call error callback if provided
        if (options?.onError) {
          options.onError(errorMessage);
        }

        return null;
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setCreateOrderError(errorMessage);

      // 🐛 DEBUG: Log unexpected error
      console.error("🐛 [createOrder] Unexpected error:", {
        error,
        errorMessage,
        quantity,
      });

      // Show error toast
      toast.error(`Order creation failed: ${errorMessage}`);

      // Call error callback if provided
      if (options?.onError) {
        options.onError(errorMessage);
      }

      return null;
    } finally {
      setIsCreating(false);
    }
  };

  /**
   * Update an existing order with new form data
   */
  const updateExistingOrder = async (
    orderId: string,
    formData: CheckoutFormData,
    quantity: number = 1
  ) => {
    // 🐛 DEBUG: Log quantity at function entry
    console.log("🐛 [updateExistingOrder] Function called with:", {
      orderId,
      quantity,
      productType: formData.productType,
      timestamp: new Date().toISOString(),
    });

    if (!orderId) {
      const errorMsg = "Cannot update order: No order ID provided";
      setUpdateOrderError(errorMsg);
      toast.error(errorMsg);
      return null;
    }

    setIsUpdating(true);
    setUpdateOrderError(null);

    try {
      // 🐛 DEBUG: Log before calling updateOrder
      console.log("🐛 [updateExistingOrder] About to call updateOrder with:", {
        orderId,
        quantity,
        productType: formData.productType,
      });

      const result = await updateOrder(orderId, formData, quantity);

      // 🐛 DEBUG: Log the result from updateOrder
      console.log("🐛 [updateExistingOrder] updateOrder result:", {
        success: result.success,
        data: result.success ? result.data : null,
        error: result.success ? null : result.error,
      });

      if (result.success) {
        // Show success toast
        toast.success("Your order has been updated. Continue to shipping.");

        // 🐛 DEBUG: Log successful order update
        console.log("🐛 [updateExistingOrder] Order updated successfully:", {
          orderId,
          quantity,
        });

        // Call update success callback if provided
        if (options?.onUpdateSuccess) {
          options.onUpdateSuccess({ id: orderId });
        }
        return { id: orderId };
      } else {
        // Handle error
        const errorMessage = result.error || "Failed to update order";
        setUpdateOrderError(errorMessage);

        // 🐛 DEBUG: Log error
        console.error("🐛 [updateExistingOrder] Order update failed:", {
          errorMessage,
          orderId,
          quantity,
        });

        // Show error toast
        toast.error(`Order update failed: ${errorMessage}`);

        // Call update error callback if provided
        if (options?.onUpdateError) {
          options.onUpdateError(errorMessage);
        }

        return null;
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setUpdateOrderError(errorMessage);

      // 🐛 DEBUG: Log unexpected error
      console.error("🐛 [updateExistingOrder] Unexpected error:", {
        error,
        errorMessage,
        orderId,
        quantity,
      });

      // Show error toast
      toast.error(`Order update failed: ${errorMessage}`);

      // Call update error callback if provided
      if (options?.onUpdateError) {
        options.onUpdateError(errorMessage);
      }

      return null;
    } finally {
      setIsUpdating(false);
    }
  };

  /**
   * Create or update an order with shipping details
   */
  const processOrderWithShipping = async (
    bookId: string,
    orderId: string | null,
    formData: CheckoutFormData,
    shippingLevel: ShippingLevel,
    shippingCost: string,
    totalPrice: string,
    quantity: number = 1
  ) => {
    // 🐛 DEBUG: Log function entry
    console.log("🐛 [processOrderWithShipping] Function called with:", {
      bookId,
      orderId,
      shippingLevel,
      shippingCost,
      totalPrice,
      productType: formData.productType,
      timestamp: new Date().toISOString(),
    });

    setIsProcessingShipping(true);
    setShippingError(null);

    try {
      // Verify data
      if (!formData || formData.productType !== "BOOK") {
        throw new Error("Invalid form data for shipping");
      }

      let result;

      if (orderId) {
        // 🐛 DEBUG: Log before updating existing order
        console.log("🐛 [processOrderWithShipping] Updating existing order:", {
          orderId,
          shippingLevel,
          totalPrice,
        });

        // Update existing order with shipping
        result = await updateOrderWithShipping(
          orderId,
          formData,
          shippingLevel,
          shippingCost,
          totalPrice,
          quantity
        );
      } else {
        // 🐛 DEBUG: Log before creating new order
        console.log("🐛 [processOrderWithShipping] Creating new order:", {
          bookId,
          shippingLevel,
          totalPrice,
        });

        // Create new order with shipping
        // Note: createOrderWithShipping would need to be updated similarly
        result = await createOrderWithShipping(
          bookId,
          formData,
          shippingLevel,
          shippingCost,
          totalPrice,
          quantity
        );
      }

      // 🐛 DEBUG: Log shipping processing result
      console.log("🐛 [processOrderWithShipping] Shipping processing result:", {
        success: result.success,
        data: result.success ? result.data : null,
        error: result.success ? null : result.error,
      });

      if (result.success) {
        const resultOrderId = result.data;

        // Show success toast
        toast.success("Shipping details saved. Continue to payment.");

        // 🐛 DEBUG: Log successful shipping processing
        console.log(
          "🐛 [processOrderWithShipping] Shipping processed successfully:",
          {
            resultOrderId,
            shippingLevel,
            totalPrice,
          }
        );

        // Call shipping success callback
        if (options?.onShippingSuccess) {
          options.onShippingSuccess({ id: resultOrderId });
        }

        return { id: resultOrderId };
      } else {
        // Handle error
        const errorMessage =
          result.error || "Failed to process shipping details";
        setShippingError(errorMessage);

        // 🐛 DEBUG: Log shipping error
        console.error(
          "🐛 [processOrderWithShipping] Shipping processing failed:",
          {
            errorMessage,
            orderId,
            bookId,
          }
        );

        // Show error toast
        toast.error(`Shipping processing failed: ${errorMessage}`);

        // Call shipping error callback
        if (options?.onShippingError) {
          options.onShippingError(errorMessage);
        }

        return null;
      }
    } catch (error) {
      // Handle unexpected errors
      const errorMessage =
        error instanceof Error ? error.message : "An unexpected error occurred";

      setShippingError(errorMessage);

      // 🐛 DEBUG: Log unexpected error
      console.error("🐛 [processOrderWithShipping] Unexpected error:", {
        error,
        errorMessage,
        orderId,
        bookId,
      });

      // Show error toast
      toast.error(`Shipping processing failed: ${errorMessage}`);

      // Call shipping error callback
      if (options?.onShippingError) {
        options.onShippingError(errorMessage);
      }

      return null;
    } finally {
      setIsProcessingShipping(false);
    }
  };

  return {
    createOrder,
    updateExistingOrder,
    processOrderWithShipping,
    isCreating,
    isUpdating,
    isProcessingShipping,
    createOrderError,
    updateOrderError,
    shippingError,
  };
}
