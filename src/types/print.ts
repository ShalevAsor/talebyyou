import {
  ShippingLevel,
  FileValidationStatus,
  PrintJobStatus,
  Book,
  Order,
  PrintJob,
} from "@prisma/client";

// =====================
// TOKEN AND AUTHENTICATION
// =====================
export interface LuluTokenResponse {
  access_token: string;
  expires_in: number;
  refresh_token?: string;
  token_type: string;
  "not-before-policy"?: number;
  session_state?: string;
}

// =====================
// COMMON INTERFACES
// =====================

export interface CoverDimensions {
  width: string;
  height: string;
  unit: string;
}

export interface FileDetails {
  job_id: number | null;
  normalized_file: string | null;
  page_count: number | null;
  source_file: string | null;
  source_md5sum: string;
  source_url: string;
}
export interface LineItemStatus {
  messages: {
    info: string;
  };
  name: string;
}

// =====================
// SHIPPING INTERFACES
// =====================

// Basic Shipping address interface
export interface ShippingAddressForOptions {
  city: string;
  country: string;
  postcode: string;
  street1: string;
  street2?: string;
  state_code?: string;
}
export interface ShippingAddress {
  name: string; // customer name
  phone_number: string;
  city: string;
  country_code: string;
  postcode: string;
  street1: string;
  street2?: string;
  state_code?: string;
  is_business?: boolean;
}
export interface AddressWarning {
  type: string;
  path: string;
  code: string;
  message: string;
}

export interface SuggestedAddress {
  country_code: string;
  state_code: string | null;
  postcode: number | string;
  city: string;
  street1: string;
  street2: string | null;
}

export interface ShippingAddressWithValidation extends ShippingAddress {
  warnings?: AddressWarning[];
  suggested_address?: SuggestedAddress;
}

export interface EstimatedShippingDates {
  arrival_max: string;
  arrival_min: string;
  dispatch_max: string;
  dispatch_min: string;
}

export interface ShippingOption {
  business_only: boolean;
  cost_excl_tax: string | null;
  currency: string;
  home_only: boolean;
  id: number;
  level: ShippingLevel;
  max_delivery_date: string;
  max_dispatch_date: string;
  min_delivery_date: string;
  min_dispatch_date: string;
  postbox_ok: boolean;
  shipping_buffer: number;
  total_days_max: number;
  total_days_min: number;
  traceable: boolean;
  transit_time: number;
}

// =====================
// COST CALCULATION INTERFACES
// =====================
// Cost component with tax details
export interface CostComponent {
  tax_rate: string;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
  total_tax: string;
}

// Fee structure
export interface Fee {
  currency: string;
  fee_type: string;
  sku: string;
  tax_rate: string;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
  total_tax: string;
}

// Discount structure
export interface Discount {
  amount: string;
  description: string;
}

// Line item cost
export interface LineItemCost {
  cost_excl_discounts: string;
  discounts: Discount[];
  quantity: number;
  tax_rate: string;
  total_cost_excl_discounts: string;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
  total_tax: string;
  unit_tier_cost: string | null;
}
export interface ShippingCost {
  tax_rate: string;
  total_tax: string;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
}
export interface LineItemCostWebhook {
  line_item_id: string;
  quantity: number;
  tax_rate: string;
  discounts: Discount[];
  unit_tier_cost: string;
  cost_excl_discounts: string;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
  line_item_external_id: string;
  total_cost_excl_discounts: string;
}
export interface FulfillmentCost {
  tax_rate: string;
  total_tax: string;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
}

// =====================
// PRINT JOB INTERFACES
// =====================
export interface PrintableNormalization {
  cover: {
    source_url: string;
  };
  interior: {
    source_url: string;
  };
  pod_package_id: string;
}
export interface PrintJobLineItem {
  external_id?: string; // book id
  printable_normalization: PrintableNormalization;
  quantity: number;
  title: string; // book title
}
export interface PrintJobCosts {
  line_item_costs: LineItemCost[] | null;
  shipping_cost: CostComponent | null;
  total_cost_excl_tax: string | null;
  total_cost_incl_tax: string | null;
  total_tax: string | null;
}
export interface PrintJobStatusResponse {
  changed: string;
  message: string;
  name: string;
}

export interface PrintJobDetailedCosts extends PrintJobCosts {
  currency: string;
  fees: Fee[];
  total_discount_amount: string;
}
// =====================
// WEBHOOK INTERFACES
// =====================

/**
 * Webhook topics supported by Lulu API
 */
export type WebhookTopic = "PRINT_JOB_STATUS_CHANGED";

/**
 * Request to create a webhook with Lulu
 */
export interface CreateWebhookRequest {
  topics: WebhookTopic[];
  url: string;
}

/**
 * Response when creating or retrieving a webhook
 */
export interface WebhookResponse {
  id: string;
  is_active: boolean;
  topics: WebhookTopic[];
  url: string;
}

/**
 * Request to update an existing webhook
 */
export interface UpdateWebhookRequest {
  topics?: WebhookTopic[];
  url?: string;
  is_active?: boolean;
}
// /**
//  * Structure of the print job data in the webhook payload
//  */
// export interface LuluWebhookPrintJobData {
//   id: number; // Lulu's print job ID
//   external_id: string; // Our order ID
//   status: {
//     name: string; // Status name (e.g. "PRODUCTION_DELAYED")
//     changed: string; // Timestamp of status change
//     message: string; // Human-readable status message
//   };
//   order_id: string; // Lulu's order ID
//   costs?: {
//     currency: string;
//     total_tax: string;
//     shippingCost: ShippingCost;
//     line_item_costs: LineItemCostWebhook[];
//     fulfillment_cost: FulfillmentCost;
//     total_cost_excl_tax: string;
//     total_cost_incl_tax: string;
//   };
//   is_cancellable: boolean; // Whether the print job can be cancelled
//   line_items: Array<{
//     id: number;
//     title: string;
//     external_id: string; // Our book ID
//     status: {
//       name: string;
//       messages: {
//         info: string;
//       };
//     };
//     quantity: number;
//     tracking_id?: string;
//     tracking_urls?: string[] | null;
//   }>;
//   shipping_level: string; // Shipping level selected
//   shipping_option_level: string; // Actual shipping level used
//   estimated_shipping_dates: {
//     arrival_min: string;
//     arrival_max: string;
//     dispatch_min: string;
//     dispatch_max: string;
//   };
//   date_created: string;
//   date_modified: string;
// }
/**
 * Structure of the print job data in the webhook payload
 */
export interface LuluWebhookPrintJobData {
  id: number; // Lulu's print job ID
  external_id: string; // Our order ID
  status: {
    name: string; // Status name (e.g. "PRODUCTION_DELAYED")
    changed: string; // Timestamp of status change
    message: string; // Human-readable status message
  };
  order_id: string; // Lulu's order ID
  is_cancellable: boolean; // Whether the print job can be cancelled
  // Cost information
  costs?: {
    currency: string;
    total_tax: string;
    shipping_cost: ShippingCost;
    line_item_costs: LineItemCostWebhook[];
    fulfillment_cost: FulfillmentCost;
    total_cost_excl_tax: string;
    total_cost_incl_tax: string;
  };
  line_items: Array<{
    id: number;
    title: string;
    external_id: string; // Our book ID
    status: {
      name: string;
      messages: {
        info: string;
      };
    };
    quantity: number;
    tracking_id?: string;
    tracking_urls?: string[] | null;
    carrier_name?: string;
    // Additional fields from the log
    is_reprint?: boolean;
    printable_id?: string;
    thumbnail_url?: string;
    pod_package_id?: string;
    order_line_item_id?: string;
    printable_normalization?: PrintableNormalization;
  }>;

  shipping_level: string; // Shipping level selected
  shipping_option_level: string; // Actual shipping level used

  // Additional fields from the log
  shipping_address?: {
    city: string;
    name: string;
    email: string | null;
    street1: string;
    street2: string | null;
    user_id: string;
    postcode: string;
    warnings: AddressWarning[];
    state_code: string;
    is_business: boolean;
    country_code: string;
    organization: string | null;
    phone_number: string;
    recipient_tax_id: string | null;
    suggested_address?: {
      city: string;
      street1: string;
      street2: string | null;
      postcode: string;
      state_code: string;
      country_code: string;
    };
  };

  estimated_shipping_dates?: {
    arrival_min: string;
    arrival_max: string;
    dispatch_min: string;
    dispatch_max: string;
  } | null;

  date_created: string;
  date_modified: string;

  // Other fields from the log
  tax_country?: string;
  child_job_ids?: number[];
  contact_email?: string;
  parent_job_id?: number | null;
  production_delay?: number;
  shipping_option_id?: string;
  dropship_profile_id?: string;
  production_due_time?: string | null;
  order_marked_as_paid?: string | null;
  payments?: number[];
  reprints?: string[] | number[];
  aggregated_payment_print_job?: boolean;
}

/**
 * Webhook payload for print job status changes
 * This is what Lulu sends to your webhook endpoint
 */
export interface PrintJobStatusChangedPayload {
  topic: "PRINT_JOB_STATUS_CHANGED";
  data: LuluWebhookPrintJobData; // Create a new interface for this
}

/**
 * Response format for webhook submissions list
 */
export interface WebhookSubmissionsResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: WebhookSubmission[];
}

/**
 * Structure of a webhook submission record
 */
export interface WebhookSubmission {
  date_created: string;
  date_modified: string;
  payload: PrintJobStatusChangedPayload;
  topic: WebhookTopic;
  is_success: boolean;
  response_code: number;
  attempts: number;
  webhook: WebhookResponse;
}

// =====================
// REQUESTS
// =====================
export interface CalculatePrintJobCostRequest {
  line_items: {
    pod_package_id: string;
    quantity: number;
    page_count: number;
  }[];
  shipping_address: ShippingAddress;
  shipping_option: ShippingLevel;
}

export interface CoverDimensionsRequest {
  pod_package_id: string;
  interior_page_count: number;
  unit?: "pt" | "mm" | "inch";
}

export interface InteriorPdfValidationRequest {
  source_url: string;
  pod_package_id?: string;
}

export interface CoverPdfValidationRequest {
  source_url: string;
  pod_package_id: string;
  interior_page_count: number;
}

export interface CreatePrintJobRequest {
  contact_email: string; // email of the store owner / support email
  external_id?: string; // order id
  line_items: PrintJobLineItem[];
  production_delay?: number;
  shipping_address: ShippingAddress;
  shipping_level: ShippingLevel;
}

export interface CancelPrintJobRequest {
  name: "CANCELED";
}

// Union type for all request data types
export type RequestData =
  | CalculatePrintJobCostRequest
  | CoverDimensionsRequest
  | InteriorPdfValidationRequest
  | CoverPdfValidationRequest
  | CreatePrintJobRequest
  | ShippingOptionsRequest
  | CancelPrintJobRequest
  | CreateWebhookRequest
  | UpdateWebhookRequest;

// =====================
// RESPONSES
// =====================

export interface ShippingOptionsRequest {
  currency?: string;
  line_items: {
    pod_package_id: string;
    quantity: number;
    page_count: number;
  }[];
  shipping_address: ShippingAddressForOptions;
}

export interface CalculatePrintJobCostResponse {
  shipping_address: ShippingAddressWithValidation;
  currency: string;
  fees: Fee[];
  fulfillment_cost: CostComponent;
  line_item_costs: LineItemCost[];
  shipping_cost: CostComponent;
  total_cost_excl_tax: string;
  total_cost_incl_tax: string;
  total_discount_amount: string;
  total_tax: string;
}
export interface InteriorPdfValidationResponse {
  id: number;
  source_url: string;
  page_count: number;
  errors: string[] | null;
  status: FileValidationStatus;
  valid_pod_package_ids: string[] | null;
}

export interface CoverPdfValidationResponse {
  id: number;
  source_url: string;
  page_count: number;
  errors: string[] | null;
  status: FileValidationStatus;
}

export interface PrintableNormalizationResponse extends PrintableNormalization {
  cover: FileDetails;
  interior: FileDetails;
  pod_package_id: string;
}

export interface LineItemResponse {
  external_id: string; // the book id
  id: number;
  printable_id: string | null;
  printable_normalization: PrintableNormalizationResponse;
  quantity: number;
  status: LineItemStatus;
  title: string;
}

export interface CreatePrintJobResponse {
  contact_email: string;
  costs: PrintJobCosts;
  date_created: string;
  date_modified: string;
  estimated_shipping_dates: EstimatedShippingDates;
  external_id: string; // the order id
  id: number; // the print job id (not our print job model id)
  line_items: LineItemResponse[];
  production_delay: number; // [60,2880] minutes
  production_due_time: string | null;
  shipping_address: ShippingAddressWithValidation;
  shipping_level: ShippingLevel; // requested when creating the print job
  shipping_option_level: ShippingLevel; //  Lulu actually assigned to the order after processing
  status: PrintJobStatusResponse;
}

export interface PrintJobsListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: CreatePrintJobResponse[];
}

export interface SinglePrintJobResponse
  extends Omit<CreatePrintJobResponse, "line_items"> {
  // New fields in single print job response
  child_job_ids: number[];
  parent_job_id?: number;
  order_id?: string;
  tax_country?: string;
  // Using the detailed line item response
  line_items: DetailedLineItemResponse[];
  // The costs object has additional fields in the single job response
  costs: PrintJobDetailedCosts;
}

export interface ReprintInfo {
  cost_center: string;
  defect: string;
  description: string;
  printer_at_fault: string;
}

export interface DetailedLineItemResponse extends LineItemResponse {
  reprint?: ReprintInfo;
}

export interface PrintJobStatusInfo {
  name: PrintJobStatus;
  message: string;
  changed: string;
  line_item_statuses?: LineItemStatus[];
  print_job_id?: number;
}

// =====================
// PDF GENERATION INTERFACES
// =====================
export interface PrintPdfGenerationResult {
  filePath: string;
  fileName: string;
  pageCount: number;
}

// =====================
// PRINT ACTIONS INTERFACES
// =====================
/**
 * Interface for the address validation response
 */
export interface AddressValidationResult {
  isValid: boolean;
  hasWarnings: boolean;
  warnings?: AddressWarning;
  suggestedAddress?: SuggestedAddress;
  shippingOptionUnavailable?: boolean;
}

export interface BookPrintPreparationResult {
  success: boolean;
  interiorUrl?: string;
  coverUrl?: string;
  pageCount?: number;
  validationErrors?: string[];
  message: string;
}

// PDF validation result type
export interface PdfValidationResult {
  success: boolean;
  isValid: boolean;
  validationId?: number;
  status?: FileValidationStatus;
  errors?: string[];
  message: string;
}

// =====================
// ERRORS
// =====================
export interface LuluValidationError {
  type: string;
  code: string;
  path: string;
  message: string;
}

// Error response structure when validation fails
export interface LuluValidationErrorResponse {
  shipping_address?: {
    detail?: {
      errors?: LuluValidationError[];
    };
    suggested_address?: SuggestedAddress;
  };
}

export type PrintJobFull = PrintJob & {
  book: Book;
  order: Order | null;
};

export { ShippingLevel, FileValidationStatus, PrintJobStatus };
