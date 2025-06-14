/**
 * Meta Pixel tracking functions for TaleByYou
 * These functions provide type-safe tracking for Facebook/Meta advertising
 */

// Check if Meta Pixel is available
const isMetaPixelAvailable = (): boolean => {
  return typeof window !== "undefined" && typeof window.fbq === "function";
};

/**
 * Track when user views a specific book template
 * Fire this when user clicks on a book template or views its details
 */
export const trackViewContent = (bookTemplate: {
  id: string;
  title: string;
  price?: number;
}) => {
  if (!isMetaPixelAvailable()) return;

  window.fbq!("track", "ViewContent", {
    content_type: "product",
    content_ids: [bookTemplate.id],
    content_name: bookTemplate.title,
    content_category: "Children Book Template",
    value: bookTemplate.price || 29.99,
    currency: "USD",
  });

  console.log("📊 Meta Pixel: ViewContent tracked for", bookTemplate.title);
};

/**
 * Track when user starts the checkout process
 * Fire this when user fills order form and clicks continue
 */
export const trackInitiateCheckout = (orderData: {
  bookId: string;
  bookTitle: string;
  productType: "BOOK" | "EBOOK";
  value: number;
  quantity?: number;
}) => {
  if (!isMetaPixelAvailable()) return;

  window.fbq!("track", "InitiateCheckout", {
    content_type: "product",
    content_ids: [orderData.bookId],
    content_name: orderData.bookTitle,
    content_category:
      orderData.productType === "BOOK" ? "Physical Book" : "Digital Book",
    value: orderData.value,
    currency: "USD",
    num_items: orderData.quantity || 1,
  });

  console.log(
    "📊 Meta Pixel: InitiateCheckout tracked for",
    orderData.bookTitle
  );
};

/**
 * Track successful purchase completion
 * Fire this after PayPal payment is successful
 */
export const trackPurchase = (purchaseData: {
  orderId: string;
  bookId: string;
  bookTitle: string;
  productType: "BOOK" | "EBOOK";
  value: number;
  quantity?: number;
}) => {
  if (!isMetaPixelAvailable()) return;

  window.fbq!("track", "Purchase", {
    content_type: "product",
    content_ids: [purchaseData.bookId],
    content_name: purchaseData.bookTitle,
    content_category:
      purchaseData.productType === "BOOK" ? "Physical Book" : "Digital Book",
    value: purchaseData.value,
    currency: "USD",
    num_items: purchaseData.quantity || 1,
    transaction_id: purchaseData.orderId,
  });

  console.log(
    "📊 Meta Pixel: Purchase tracked for",
    purchaseData.bookTitle,
    "Order:",
    purchaseData.orderId
  );
};

/**
 * Track when user completes lead form (for lead generation campaigns)
 * Optional - can be used for newsletter signups or contact forms
 */
export const trackLead = (leadData?: {
  content_name?: string;
  value?: number;
}) => {
  if (!isMetaPixelAvailable()) return;

  window.fbq!("track", "Lead", {
    content_name: leadData?.content_name || "Newsletter Signup",
    content_category: "Lead Generation",
    value: leadData?.value || 0,
    currency: "USD",
  });

  console.log("📊 Meta Pixel: Lead tracked");
};
