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
    setIsCreating(true);
    setCreateOrderError(null);

    try {
      // Make sure the product type is properly set in the form data
      if (!formData.productType) {
        throw new Error("Product type is missing from form data");
      }

      // Use the new function that handles both creating and recovering orders
      const result = await createOrRecoverOrder(formData, bookId, quantity);

      if (result.success) {
        const orderId = result.data;

        // Show success toast
        toast.success(
          "Your order information has been saved. Continue to shipping."
        );

        // Call success callback if provided
        if (options?.onSuccess) {
          options.onSuccess({ id: orderId });
        }
        return { id: orderId };
      } else {
        // Handle error
        const errorMessage = result.error || "Failed to create order";
        setCreateOrderError(errorMessage);

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
    if (!orderId) {
      const errorMsg = "Cannot update order: No order ID provided";
      setUpdateOrderError(errorMsg);
      toast.error(errorMsg);
      return null;
    }

    setIsUpdating(true);
    setUpdateOrderError(null);

    try {
      const result = await updateOrder(orderId, formData, quantity);

      if (result.success) {
        // Show success toast
        toast.success("Your order has been updated. Continue to shipping.");

        // Call update success callback if provided
        if (options?.onUpdateSuccess) {
          options.onUpdateSuccess({ id: orderId });
        }
        return { id: orderId };
      } else {
        // Handle error
        const errorMessage = result.error || "Failed to update order";
        setUpdateOrderError(errorMessage);

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
    costBreakdown?: {
      printingCost?: string;
      imagesCost?: string;
    }
  ) => {
    setIsProcessingShipping(true);
    setShippingError(null);

    try {
      // Verify data
      if (!formData || formData.productType !== "BOOK") {
        throw new Error("Invalid form data for shipping");
      }

      let result;

      if (orderId) {
        // Update existing order with shipping
        result = await updateOrderWithShipping(
          orderId,
          formData,
          shippingLevel,
          shippingCost,
          totalPrice,
          costBreakdown
        );
      } else {
        // Create new order with shipping
        // Note: createOrderWithShipping would need to be updated similarly
        result = await createOrderWithShipping(
          bookId,
          formData,
          shippingLevel,
          shippingCost,
          totalPrice,
          costBreakdown
        );
      }

      if (result.success) {
        const resultOrderId = result.data;

        // Show success toast
        toast.success("Shipping details saved. Continue to payment.");

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
