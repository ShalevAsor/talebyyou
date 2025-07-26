"use client";

import { useEffect, useState } from "react";

import { getPendingOrderForBook } from "@/actions/order-actions";
import { calculatePrintJobCost } from "@/actions/print-actions";
import { DigitalCheckoutForm } from "@/components/form/DigitalCheckoutForm";
import { PhysicalCheckoutForm } from "@/components/form/PhysicalCheckoutForm";
import { ShippingOptionsSelection } from "@/components/order/ShippingOptionsSelection";
import { PaymentSection } from "@/components/payment/PaymentSection";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useOrderMutation } from "@/hooks/useOrderMutations";
import { usePricing } from "@/hooks/usePricing";
import {
  CheckoutFormData,
  DigitalOrderFormData,
  PhysicalOrderFormData,
} from "@/schemas/checkout-schema";
import { useOrderStore } from "@/store/useOrderStore";
import { BookFull } from "@/types/book";
import { ProductType } from "@/types/order";
import { ShippingAddressForOptions, ShippingLevel } from "@/types/print";
import { trackInitiateCheckout } from "@/utils/metaTracking";
import {
  getPricingDetails,
  mapFormToShippingAddress,
} from "@/utils/orderUtils";

import { OrderProgress } from "./OrderProgress";
import { OrderReview } from "./OrderReview";
import { OrderSummary } from "./OrderSummary";
import { ProductTypeSelection } from "./ProductTypeSelection";
import { TrustBadges } from "./TrustBadges";
import { WhatHappensNext } from "./WhatHappensNext";

interface OrderContentProps {
  book: BookFull;
  isGuest: boolean;
  payPalClientId: string;
}

export function OrderContent({
  book,
  isGuest,
  payPalClientId,
}: OrderContentProps) {
  // Get pricing data with discounts
  const {
    pricing,
    discount,
    isDiscountActive,
    isLoading: isPricingLoading,
  } = usePricing();

  // Get order state from Zustand store
  const {
    step,
    totalCost,
    productType,
    formData,
    orderId,
    shippingLevel,
    shippingCost,
    quantity,
    initializeOrder,
    setStep,
    setTotalCost,
    setProductType,
    setFormData,
    setOrderId,
    setShippingDetails,
  } = useOrderStore();
  const [isInitializing, setIsInitializing] = useState(true);

  // Order mutation hook with enhanced logging
  const {
    createOrder,
    updateExistingOrder,
    processOrderWithShipping,
    isCreating,
    isUpdating,
    isProcessingShipping,
    createOrderError,
    updateOrderError,
    shippingError,
  } = useOrderMutation({
    onSuccess: (data) => {
      setOrderId(data.id);

      // For digital products, go directly to payment
      // For physical products, go to shipping selection
      if (productType === ProductType.EBOOK) {
        setStep("payment");
      } else {
        setStep("shipping");
      }
    },
    onUpdateSuccess: () => {
      // For digital products, go directly to payment
      // For physical products, go to shipping selection
      if (productType === ProductType.EBOOK) {
        setStep("payment");
      } else {
        setStep("shipping");
      }
    },
    onShippingSuccess: (data) => {
      setOrderId(data.id);
      setStep("payment");
    },
    onError: (error) => {
      console.error("Order creation error:", error);
    },
    onUpdateError: (error) => {
      console.error("Order update error:", error);
    },
    onShippingError: (error) => {
      console.error("Shipping processing error:", error);
    },
  });

  // Initialize order state with the current book
  useEffect(() => {
    const loadOrderState = async () => {
      setIsInitializing(true);

      // Initialize order state from Zustand store
      initializeOrder(book.id);

      // Check if there's a pending order in the database
      if (!orderId) {
        try {
          const pendingOrderResult = await getPendingOrderForBook(book.id);
          if (pendingOrderResult.success && pendingOrderResult.data) {
            setOrderId(pendingOrderResult.data.id);
          }
        } catch (error) {
          console.error("Error checking for pending order:", error);
        }
      }

      setIsInitializing(false);
    };

    loadOrderState();
  }, [book.id, initializeOrder, orderId, setOrderId]);

  // Handle product type change and recalculate pricing
  const handleProductTypeChange = (newType: ProductType) => {
    setProductType(newType);
    // Clear form data when switching product types
    setFormData(null);

    // Recalculate pricing when product type changes
    if (pricing) {
      const pricingDetails = getPricingDetails(
        newType,
        quantity,
        0, // No shipping cost at this point
        pricing,
        isDiscountActive ? discount : null
      );
      setTotalCost(pricingDetails.totalPrice.toFixed(2));
    }
  };

  // Handle initial form submission (details step)
  const handleContinueToNextStep = (data: CheckoutFormData) => {
    // Save form data
    setFormData(data);

    // Calculate total cost with current pricing
    if (pricing) {
      const pricingDetails = getPricingDetails(
        data.productType,
        quantity,
        0, // Shipping will be calculated later for physical books
        pricing,
        isDiscountActive ? discount : null
      );
      setTotalCost(pricingDetails.totalPrice.toFixed(2));
    }
    // 🎯 Track InitiateCheckout event
    trackInitiateCheckout({
      bookId: book.id,
      bookTitle: book.title,
      productType: data.productType,
      value: Number(totalCost),
      quantity: quantity,
    });

    // Create or update the order, passing the quantity from the store
    if (orderId) {
      updateExistingOrder(orderId, data, quantity);
    } else {
      createOrder(book.id, data, quantity);
    }
  };

  // Map from form data to Lulu shipping address format
  const mapShippingAddressToLuluFormat = (
    formData: PhysicalOrderFormData
  ): ShippingAddressForOptions => {
    return {
      street1: formData.shippingAddress.street1,
      city: formData.shippingAddress.city,
      state_code: formData.shippingAddress.state_code,
      country: formData.shippingAddress.country,
      postcode: formData.shippingAddress.postcode,
    };
  };

  const handleShippingSelection = async (level: ShippingLevel) => {
    // First, use calculatePrintJobCost to get accurate pricing
    if (!formData || formData.productType !== ProductType.BOOK) {
      console.error("Invalid form data for shipping");
      return;
    }

    try {
      // Calculate the full cost using the print API
      const fullAddress = mapFormToShippingAddress(formData);
      const costResult = await calculatePrintJobCost(
        fullAddress,
        quantity,
        book.pageCount,
        level
      );

      if (!costResult.success) {
        console.error("Failed to calculate shipping costs:", costResult.error);
        return;
      }

      // Extract costs from the API response
      const shippingCostValue =
        costResult.data.shipping_cost.total_cost_incl_tax;

      // Calculate the total price with new pricing system
      const pricingDetails = getPricingDetails(
        productType,
        quantity,
        Number(shippingCostValue),
        pricing,
        isDiscountActive ? discount : null
      );

      // Save shipping details in store
      setShippingDetails(
        level,
        shippingCostValue,
        pricingDetails.totalPrice.toFixed(2)
      );

      // Process the order with shipping and cost breakdown
      await processOrderWithShipping(
        book.id,
        orderId,
        formData,
        level,
        shippingCostValue,
        pricingDetails.totalPrice.toFixed(2),
        quantity
      );
    } catch (error) {
      console.error("Error calculating shipping costs:", error);
    }
  };

  // Go back to details step from shipping
  const handleBackToDetails = () => {
    setStep("details");
  };

  // Go back to shipping step from payment
  const handleBackToShipping = () => {
    if (productType === ProductType.BOOK) {
      setStep("shipping");
    } else {
      setStep("details");
    }
  };

  // Get default values for the form when user comes back to edit
  const getPhysicalFormDefaultValues = (): Partial<PhysicalOrderFormData> => {
    if (
      formData &&
      formData.productType === ProductType.BOOK &&
      "shippingAddress" in formData
    ) {
      return {
        customerEmail: formData.customerEmail,
        shippingAddress: formData.shippingAddress,
      };
    }
    return {};
  };

  // Get default values for digital form when user comes back to edit
  const getDigitalFormDefaultValues = (): Partial<DigitalOrderFormData> => {
    if (formData && formData.productType === ProductType.EBOOK) {
      return {
        customerEmail: formData.customerEmail,
      };
    }
    return {};
  };

  // If still initializing or loading pricing, show a loading state
  if (isInitializing || isPricingLoading) {
    return (
      <div className="bg-indigo-50/50 p-8 rounded-lg shadow-lg">
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          <span className="ml-2">Loading order details...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-indigo-50/50 p-8 rounded-lg shadow-lg">
      {/* Step Indicator */}
      <OrderProgress currentStep={step} />

      {/* Error display */}
      {createOrderError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Error creating order: {createOrderError}
          </AlertDescription>
        </Alert>
      )}

      {updateOrderError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Error updating order: {updateOrderError}
          </AlertDescription>
        </Alert>
      )}

      {shippingError && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>
            Error with shipping selection: {shippingError}
          </AlertDescription>
        </Alert>
      )}

      {step === "details" ? (
        // Step 1: Information Collection
        <div className="flex flex-col md:flex-row gap-x-4">
          {/* Left Column - Order Details */}
          <div className="flex-1 space-y-4">
            {/* Book Preview */}
            <OrderSummary book={book} />

            {/* Format Selection with pricing */}
            <ProductTypeSelection
              productType={productType}
              onProductTypeChange={handleProductTypeChange}
              pricing={pricing}
              discount={isDiscountActive ? discount : null}
            />

            {/* What Happens Next */}
            <WhatHappensNext productType={productType} />
          </div>

          {/* Right Column - Checkout Form */}
          <div className="flex-1 mt-4 md:mt-0">
            {productType === ProductType.BOOK ? (
              <PhysicalCheckoutForm
                isGuest={isGuest}
                isProcessing={isCreating || isUpdating}
                onSuccess={handleContinueToNextStep}
                defaultValues={getPhysicalFormDefaultValues()}
              />
            ) : (
              <DigitalCheckoutForm
                isGuest={isGuest}
                isProcessing={isCreating || isUpdating}
                onSuccess={handleContinueToNextStep}
                defaultValues={getDigitalFormDefaultValues()}
              />
            )}
          </div>
        </div>
      ) : step === "shipping" ? (
        // Step 2: Shipping Options Selection (for physical books only)
        <div className="flex flex-col md:flex-row gap-x-4">
          {/* Left Column - Order Summary */}
          <div className="flex-1 space-y-4">
            {/* Book Preview */}
            <OrderSummary book={book} />

            {/* What Happens Next */}
            <WhatHappensNext productType={productType} />

            {/* Shipping Address Summary */}
            {formData &&
              formData.productType === ProductType.BOOK &&
              "shippingAddress" in formData && (
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm">
                      <p>{formData.shippingAddress.name}</p>
                      <p>{formData.shippingAddress.street1}</p>
                      {formData.shippingAddress.street2 && (
                        <p>{formData.shippingAddress.street2}</p>
                      )}
                      <p>
                        {formData.shippingAddress.city},{" "}
                        {formData.shippingAddress.state_code}{" "}
                        {formData.shippingAddress.postcode}
                      </p>
                      <p>{formData.shippingAddress.country}</p>
                      <p>{formData.shippingAddress.phone_number}</p>
                    </div>
                  </CardContent>
                </Card>
              )}
          </div>

          {/* Right Column - Shipping Options */}
          <div className="flex-1 mt-4 md:mt-0">
            {formData &&
              formData.productType === ProductType.BOOK &&
              "shippingAddress" in formData && (
                <ShippingOptionsSelection
                  bookId={book.id}
                  shippingOptionsAddress={mapShippingAddressToLuluFormat(
                    formData
                  )}
                  onSelectShipping={handleShippingSelection}
                  onBack={handleBackToDetails}
                  isProcessing={isProcessingShipping}
                />
              )}
          </div>
        </div>
      ) : (
        // Step 3: Payment & Confirmation
        <div className="flex flex-col md:flex-row gap-x-4">
          {/* Left Column - Order Summary */}
          <div className="flex-1">
            {formData && (
              <OrderReview
                book={book}
                productType={productType}
                formData={formData}
                shippingCost={
                  shippingCost ? parseFloat(shippingCost) : undefined
                }
                shippingLevel={shippingLevel || undefined}
                onBack={handleBackToShipping}
                pricing={pricing}
                discount={isDiscountActive ? discount : null}
              />
            )}
          </div>

          {/* Right Column - Payment */}
          {orderId && (
            <div className="flex-1 mt-4 md:mt-0">
              <PaymentSection
                orderId={orderId}
                payPalClientId={payPalClientId}
                bookTitle={book.title}
              />
            </div>
          )}
        </div>
      )}

      {/* Trust Badges - remain for all steps */}
      <div className="mt-8">
        <TrustBadges />
      </div>
    </div>
  );
}
