// import {
//   PAYPAL_API_URL,
//   PAYPAL_CLIENT_ID,
//   PAYPAL_CLIENT_SECRET,
// } from "@/constants/payment";

// const base = PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

// export const paypal = {
//   createOrder: async function createOrder(price: number) {
//     const access_token = await generateAccessToken();

//     const response = await fetch(base + "/v2/checkout/orders", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${access_token}`,
//       },
//       body: JSON.stringify({
//         intent: "CAPTURE",
//         purchase_units: [
//           {
//             amount: {
//               currency_code: "USD",
//               value: price,
//             },
//           },
//         ],
//         payment_source: {
//           paypal: {
//             experience_context: {
//               shipping_preference: "NO_SHIPPING",
//               user_action: "PAY_NOW",
//               brand_name: "Your Book Store", // Replace with your store name
//             },
//           },
//         },
//       }),
//     });

//     return handleResponse(response);
//   },
//   createPayment: async function createPayment(paypalOrderId: string) {
//     const access_token = await generateAccessToken();
//     const response = await fetch(
//       `${base}/v2/checkout/orders/${paypalOrderId}/capture`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${access_token}`,
//         },
//       }
//     );

//     return handleResponse(response);
//   },
// };

// async function generateAccessToken() {
//   const auth = `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`;
//   const response = await fetch(base + "/v1/oauth2/token", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//       Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
//     },
//     body: "grant_type=client_credentials",
//   });
//   const jsonData = await handleResponse(response);
//   return jsonData.access_token;
// }

// async function handleResponse(response: Response) {
//   if (response.ok) {
//     return response.json();
//   } else {
//     const errorMessage = await response.text();
//     throw new Error(errorMessage);
//   }
// }
import {
  PAYPAL_API_URL,
  PAYPAL_CLIENT_ID,
  PAYPAL_CLIENT_SECRET,
} from "@/constants/payment";
import {
  CreatePayPalOrderData,
  PayPalOrderResponse,
  PayPalCaptureResponse,
  PayPalPurchaseUnit,
} from "@/types/payment";
import { ProductType } from "@prisma/client";
const base = PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

export const paypal = {
  createOrder: async function createOrder(
    orderData: CreatePayPalOrderData
  ): Promise<PayPalOrderResponse> {
    const access_token = await generateAccessToken();

    const purchaseUnit: PayPalPurchaseUnit = {
      reference_id: orderData.orderNumber,
      description: `Order #${orderData.orderNumber} - ${
        orderData.bookTitle || "Custom Book"
      }`,
      custom_id: orderData.orderNumber,
      amount: {
        currency_code: "USD",
        value: orderData.price.toString(),
      },
    };

    // Add shipping for physical books
    if (orderData.shipping && orderData.productType === ProductType.BOOK) {
      purchaseUnit.shipping = {
        name: { full_name: orderData.shipping.name },
        address: {
          address_line_1: orderData.shipping.street1,
          address_line_2: orderData.shipping.street2 || undefined,
          locality: orderData.shipping.city,
          region: orderData.shipping.state_code,
          postal_code: orderData.shipping.postcode,
          country_code: orderData.shipping.country,
        },
      };
    }

    const response = await fetch(base + "/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [purchaseUnit],
        payment_source: {
          paypal: {
            experience_context: {
              shipping_preference:
                orderData.productType === ProductType.BOOK
                  ? "SET_PROVIDED_ADDRESS"
                  : "NO_SHIPPING",
              user_action: "PAY_NOW",
              brand_name: "TaleByYou",
            },
          },
        },
      }),
    });

    return handleResponse(response);
  },
  createPayment: async function createPayment(
    paypalOrderId: string
  ): Promise<PayPalCaptureResponse> {
    const access_token = await generateAccessToken();
    const response = await fetch(
      `${base}/v2/checkout/orders/${paypalOrderId}/capture`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${access_token}`,
        },
      }
    );

    return handleResponse(response);
  },
};

async function generateAccessToken() {
  const auth = `${PAYPAL_CLIENT_ID}:${PAYPAL_CLIENT_SECRET}`;
  const response = await fetch(base + "/v1/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
    },
    body: "grant_type=client_credentials",
  });
  const jsonData = await handleResponse(response);
  return jsonData.access_token;
}

async function handleResponse(response: Response) {
  if (response.ok) {
    return response.json();
  } else {
    const errorMessage = await response.text();
    throw new Error(errorMessage);
  }
}
