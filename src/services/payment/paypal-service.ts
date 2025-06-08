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

const base = PAYPAL_API_URL || "https://api-m.sandbox.paypal.com";

export const paypal = {
  createOrder: async function createOrder(orderData: {
    price: number;
    orderNumber: string;
    bookTitle?: string;
    productType?: string;
    quantity?: number;
  }) {
    const access_token = await generateAccessToken();

    const response = await fetch(base + "/v2/checkout/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${access_token}`,
      },
      body: JSON.stringify({
        intent: "CAPTURE",
        purchase_units: [
          {
            reference_id: orderData.orderNumber, // Your order number
            description: `Order #${orderData.orderNumber} - ${
              orderData.bookTitle || "Custom Book"
            }`,
            custom_id: orderData.orderNumber, // Also add as custom_id
            amount: {
              currency_code: "USD",
              value: orderData.price.toString(),
            },
          },
        ],
        payment_source: {
          paypal: {
            experience_context: {
              shipping_preference: "NO_SHIPPING",
              user_action: "PAY_NOW",
              brand_name: "TaleByYou", // Your actual brand name
            },
          },
        },
      }),
    });

    return handleResponse(response);
  },
  createPayment: async function createPayment(paypalOrderId: string) {
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
