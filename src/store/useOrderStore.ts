import { ShippingLevel } from "@prisma/client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

import { CheckoutFormData } from "@/schemas/checkout-schema";
import { OrderStep, ProductType } from "@/types/order";

interface OrderState {
  // Current active order
  currentBookId: string | null;
  step: OrderStep;
  productType: ProductType;
  formData: CheckoutFormData | null;
  orderId: string | null;
  quantity: number;

  // Shipping details
  shippingLevel: ShippingLevel | null;
  shippingCost: string | null;
  totalCost: string | null;

  // Actions
  initializeOrder: (bookId: string) => void;
  setStep: (step: OrderStep) => void;
  setTotalCost: (cost: string) => void;
  setProductType: (type: ProductType) => void;
  setFormData: (data: CheckoutFormData | null) => void;
  setOrderId: (id: string | null) => void;
  setQuantity: (quantity: number) => void;
  setShippingDetails: (
    level: ShippingLevel,
    shippingCost: string,
    totalCost: string
  ) => void;
  resetOrder: () => void;

  // Book-specific order data cache
  bookOrderCache: Record<
    string,
    {
      step: OrderStep;
      productType: ProductType;
      formData: CheckoutFormData | null;
      orderId: string | null;
      shippingLevel: ShippingLevel | null;
      shippingCost: string | null;
      totalCost: string | null;
      quantity: number;
    }
  >;
}

// Create the store with persistence to localStorage
export const useOrderStore = create<OrderState>()(
  persist(
    (set, get) => ({
      // Default state
      currentBookId: null,
      step: "details",
      productType: ProductType.BOOK,
      formData: null,
      orderId: null,
      shippingLevel: null,
      shippingCost: null,
      totalCost: null,
      quantity: 1,
      bookOrderCache: {},

      // Initialize or restore an order for a specific book
      initializeOrder: (bookId: string) => {
        const { bookOrderCache } = get();

        // If we have cached data for this book, use it
        if (bookOrderCache[bookId]) {
          const cachedData = bookOrderCache[bookId];
          set({
            currentBookId: bookId,
            step: cachedData.step,
            productType: cachedData.productType,
            formData: cachedData.formData,
            orderId: cachedData.orderId,
            shippingLevel: cachedData.shippingLevel,
            shippingCost: cachedData.shippingCost,
            totalCost: cachedData.totalCost,
            quantity:
              cachedData.quantity && cachedData.quantity >= 1
                ? cachedData.quantity
                : 1,
          });
        } else {
          // Otherwise start fresh with this book
          set({
            currentBookId: bookId,
            step: "details",
            productType: ProductType.BOOK,
            formData: null,
            orderId: null,
            shippingLevel: null,
            shippingCost: null,
            totalCost: null,
            quantity: 1,
          });
        }
      },

      // Update step and cache it
      setStep: (step: OrderStep) => {
        const {
          currentBookId,
          bookOrderCache,
          productType,
          formData,
          orderId,
          shippingLevel,
          shippingCost,
          totalCost,
          quantity,
        } = get();

        if (!currentBookId) return;

        // Update state and cache
        set({
          step,
          bookOrderCache: {
            ...bookOrderCache,
            [currentBookId]: {
              step,
              productType,
              formData,
              orderId,
              shippingLevel,
              shippingCost,
              totalCost,
              quantity,
            },
          },
        });
      },
      setQuantity: (quantity: number) => {
        const {
          currentBookId,
          bookOrderCache,
          step,
          productType,
          formData,
          orderId,
          shippingLevel,
          shippingCost,
          totalCost,
        } = get();

        if (!currentBookId) return;

        // Update state and cache
        set({
          quantity,
          bookOrderCache: {
            ...bookOrderCache,
            [currentBookId]: {
              step,
              productType,
              formData,
              orderId,
              shippingLevel,
              shippingCost,
              totalCost,
              quantity, // Store quantity in cache
            },
          },
        });
      },
      setTotalCost: (cost: string) => {
        set({
          totalCost: cost,
        });
      },

      // Update product type and cache it
      setProductType: (productType: ProductType) => {
        const {
          currentBookId,
          bookOrderCache,
          step,
          formData,
          orderId,
          shippingLevel,
          shippingCost,
          totalCost,
          quantity,
        } = get();

        if (!currentBookId) return;

        // Update state and cache
        set({
          productType,
          bookOrderCache: {
            ...bookOrderCache,
            [currentBookId]: {
              step,
              productType,
              formData,
              orderId,
              shippingLevel,
              shippingCost,
              totalCost,
              quantity,
            },
          },
        });
      },

      // Update form data and cache it
      setFormData: (formData: CheckoutFormData | null) => {
        const {
          currentBookId,
          bookOrderCache,
          step,
          productType,
          orderId,
          shippingLevel,
          shippingCost,
          totalCost,
          quantity,
        } = get();

        if (!currentBookId) return;

        // Update state and cache
        set({
          formData,
          bookOrderCache: {
            ...bookOrderCache,
            [currentBookId]: {
              step,
              productType,
              formData,
              orderId,
              shippingLevel,
              shippingCost,
              totalCost,
              quantity,
            },
          },
        });
      },

      // Update order ID and cache it
      setOrderId: (orderId: string | null) => {
        const {
          currentBookId,
          bookOrderCache,
          step,
          productType,
          formData,
          shippingLevel,
          shippingCost,
          totalCost,
          quantity,
        } = get();

        if (!currentBookId) return;

        // Update state and cache
        set({
          orderId,
          bookOrderCache: {
            ...bookOrderCache,
            [currentBookId]: {
              step,
              productType,
              formData,
              orderId,
              shippingLevel,
              shippingCost,
              totalCost,
              quantity,
            },
          },
        });
      },

      // Set shipping details and cache them
      setShippingDetails: (shippingLevel, shippingCost, totalCost) => {
        const {
          currentBookId,
          bookOrderCache,
          step,
          productType,
          formData,
          orderId,
          quantity,
        } = get();

        if (!currentBookId) return;

        // Update state and cache
        set({
          shippingLevel,
          shippingCost,
          totalCost,
          bookOrderCache: {
            ...bookOrderCache,
            [currentBookId]: {
              step,
              productType,
              formData,
              orderId,
              shippingLevel,
              shippingCost,
              totalCost,
              quantity,
            },
          },
        });
      },

      // Reset everything for the current book
      resetOrder: () => {
        const { currentBookId, bookOrderCache } = get();

        if (!currentBookId) return;

        // Create a new cache without the current book
        const newCache = { ...bookOrderCache };
        delete newCache[currentBookId];

        set({
          step: "details",
          productType: ProductType.BOOK,
          formData: null,
          orderId: null,
          shippingLevel: null,
          shippingCost: null,
          totalCost: null,
          bookOrderCache: newCache,
        });
      },
    }),
    {
      name: "order-store", // localStorage key
      partialize: (state) => ({ bookOrderCache: state.bookOrderCache }), // Only persist the cache
    }
  )
);
