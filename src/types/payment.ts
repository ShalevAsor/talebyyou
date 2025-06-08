// types/payment.ts

import { ProductType } from "@prisma/client";

/**
 * Shipping address information for PayPal orders
 */
export interface PayPalShippingAddress {
  name: string;
  street1: string;
  street2?: string;
  city: string;
  state_code?: string;
  postcode: string;
  country: string;
}

/**
 * Input data for creating a PayPal order
 */
export interface CreatePayPalOrderData {
  price: number;
  orderNumber: string;
  bookTitle?: string;
  productType: ProductType;
  quantity?: number;
  shipping?: PayPalShippingAddress;
}

/**
 * PayPal API response types
 */
export interface PayPalOrderResponse {
  id: string;
  status: string;
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayPalCaptureResponse {
  id: string;
  status: string;
  payer: {
    email_address: string;
    payer_id: string;
  };
  purchase_units: Array<{
    reference_id?: string;
    payments: {
      captures: Array<{
        id: string;
        status: string;
        amount: {
          currency_code: string;
          value: string;
        };
      }>;
    };
  }>;
}
export interface PayPalPurchaseUnit {
  reference_id: string;
  description: string;
  custom_id: string;
  amount: {
    currency_code: string;
    value: string;
  };
  shipping?: {
    name: {
      full_name: string;
    };
    address: {
      address_line_1: string;
      address_line_2?: string;
      admin_area_2: string; // City
      admin_area_1?: string; // State/Province
      postal_code: string;
      country_code: string;
    };
  };
}
