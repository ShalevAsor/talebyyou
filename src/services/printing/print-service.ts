// import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
// import { logger } from "@/lib/logger";
// import config from "@/lib/config";
// import {
//   CalculatePrintJobCostRequest,
//   CalculatePrintJobCostResponse,
//   CancelPrintJobRequest,
//   CoverDimensions,
//   CoverDimensionsRequest,
//   CoverPdfValidationRequest,
//   CoverPdfValidationResponse,
//   CreatePrintJobRequest,
//   CreatePrintJobResponse,
//   CreateWebhookRequest,
//   InteriorPdfValidationRequest,
//   InteriorPdfValidationResponse,
//   LuluTokenResponse,
//   PrintJobsListResponse,
//   PrintJobStatusResponse,
//   RequestData,
//   ShippingOption,
//   ShippingOptionsRequest,
//   SinglePrintJobResponse,
//   UpdateWebhookRequest,
//   WebhookResponse,
//   WebhookSubmissionsResponse,
//   WebhookTopic,
//   PrintJobStatusInfo,
// } from "@/types/print";
// import { SKU } from "@/constants/printing";

// export class LuluPrintingService {
//   private baseUrl: string;
//   private clientKey: string;
//   private clientSecret: string;
//   private base64Auth: string;
//   private accessToken: string | null = null;
//   private tokenExpiry: Date | null = null;

//   constructor(useSandbox = config.APP.NODE_ENV !== "production") {
//     this.baseUrl = config.PRINTING.LULU.API_URL;
//     this.clientKey = config.PRINTING.LULU.CLIENT_KEY;
//     this.clientSecret = config.PRINTING.LULU.CLIENT_SECRET;

//     // Generate the base64Auth correctly instead of using the stored one
//     // This ensures the proper format of clientKey:clientSecret
//     this.base64Auth = this.generateBase64Auth(
//       this.clientKey,
//       this.clientSecret
//     );

//     if (!this.clientKey || !this.clientSecret) {
//       throw new Error("Lulu API credentials not configured");
//     }

//     logger.info(
//       `LuluPrintingService initialized with ${
//         useSandbox ? "sandbox" : "production"
//       } environment`
//     );
//   }

//   /**
//    * Generate the correct Base64 auth string from client key and secret
//    */
//   private generateBase64Auth(clientKey: string, clientSecret: string): string {
//     const authString = `${clientKey}:${clientSecret}`;
//     return Buffer.from(authString).toString("base64");
//   }

//   /**
//    * Get a valid OAuth token, requesting a new one if necessary
//    */
//   async getAccessToken(): Promise<string> {
//     // Check if we have a valid token already
//     if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
//       return this.accessToken;
//     }
//     try {
//       // Request a new token
//       const tokenUrl = `${this.baseUrl}/auth/realms/glasstree/protocol/openid-connect/token`;

//       // Create proper form data
//       const formData = new URLSearchParams();
//       formData.append("grant_type", "client_credentials");

//       logger.debug(`Using base64Auth: ${this.base64Auth.substring(0, 10)}...`);
//       logger.debug(`Token URL: ${tokenUrl}`);

//       const response = await axios.post<LuluTokenResponse>(tokenUrl, formData, {
//         headers: {
//           "Content-Type": "application/x-www-form-urlencoded",
//           Authorization: `Basic ${this.base64Auth}`,
//         },
//       });

//       // Store the new token and calculate expiry
//       this.accessToken = response.data.access_token;

//       // Token expires in X seconds, convert to Date and subtract a minute for safety margin
//       const expiresInSeconds = response.data.expires_in || 3600;
//       this.tokenExpiry = new Date(Date.now() + (expiresInSeconds - 60) * 1000);

//       logger.debug("Successfully obtained new Lulu API access token");
//       // If we have no token at this point, it's an error
//       if (!this.accessToken) {
//         throw new Error("Failed to obtain access token from Lulu API");
//       }
//       return this.accessToken;
//     } catch (error) {
//       // Log more detailed error information for debugging
//       if (axios.isAxiosError(error) && error.response) {
//         logger.error(
//           `Failed to get Lulu API access token. Status: ${error.response.status}, Data:`,
//           error.response.data
//         );
//       } else {
//         logger.error("Failed to get Lulu API access token", error);
//       }
//       throw new Error("Failed to authenticate with Lulu API");
//     }
//   }

//   /**
//    * Make an authenticated API request to Lulu
//    */
//   async makeAuthenticatedRequest<T>(
//     method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
//     endpoint: string,
//     data?: RequestData
//   ): Promise<T> {
//     try {
//       const token = await this.getAccessToken();

//       const config: AxiosRequestConfig = {
//         method,
//         url: `${this.baseUrl}${endpoint}`,
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       };

//       if (data) {
//         config.data = data;

//         // Log the request data for debugging
//         logger.info(`Request to ${endpoint}:`, JSON.stringify(data, null, 2));
//       }

//       const response: AxiosResponse<T> = await axios(config);
//       return response.data;
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response) {
//         // Log the detailed error response data
//         logger.error(
//           `Lulu API request failed: ${endpoint}. Status: ${error.response.status}, Response data:`,
//           JSON.stringify(error.response.data, null, 2)
//         );
//       } else {
//         logger.error(`Lulu API request failed: ${endpoint}`, error);
//       }
//       throw error;
//     }
//   }

//   /**
//    * Get shipping options for a print job
//    * @param request Shipping options request
//    * @returns Available shipping options
//    */
//   async getShippingOptions(
//     request: ShippingOptionsRequest
//   ): Promise<ShippingOption[]> {
//     try {
//       logger.info("Getting available shipping options");

//       const response = await this.makeAuthenticatedRequest<ShippingOption[]>(
//         "POST",
//         "/shipping-options/",
//         request
//       );

//       logger.info(`Retrieved ${response.length} shipping options`);
//       return response;
//     } catch (error) {
//       logger.error("Failed to get shipping options:", error);
//       throw new Error(
//         `Failed to get shipping options: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Calculate the cost of a print job before creation
//    * @param request Cost calculation request
//    * @returns Cost calculation result
//    */
//   async calculatePrintJobCost(
//     request: CalculatePrintJobCostRequest
//   ): Promise<CalculatePrintJobCostResponse> {
//     try {
//       logger.info("Calculating print job cost");

//       const response =
//         await this.makeAuthenticatedRequest<CalculatePrintJobCostResponse>(
//           "POST",
//           "/print-job-cost-calculations/",
//           request
//         );

//       logger.info(
//         `Print job cost calculated: ${response.total_cost_incl_tax} ${response.currency}`
//       );
//       return response;
//     } catch (error) {
//       logger.error("Failed to calculate print job cost:", error);
//       // Rethrow the original error instead of creating a new one
//       throw error;
//     }
//   }
//   /**
//    * Calculate cover dimensions from Lulu API based on interior page count
//    * @param podPackageId The product SKU (pod_package_id)
//    * @param interiorPageCount Number of pages in the interior PDF
//    * @param unit Optional unit for dimensions (pt, mm, inch). Defaults to print points (pt)
//    * @returns Cover dimensions including width, height, and unit
//    */
//   async calculateCoverDimensions(
//     podPackageId: string = SKU,
//     interiorPageCount: number,
//     unit: "pt" | "mm" | "inch" = "pt"
//   ): Promise<CoverDimensions> {
//     try {
//       logger.info(
//         `Calculating cover dimensions for book with ${interiorPageCount} pages`
//       );

//       const data: CoverDimensionsRequest = {
//         pod_package_id: podPackageId,
//         interior_page_count: interiorPageCount,
//         unit: unit,
//       };

//       // Call the Lulu API to calculate cover dimensions
//       const response = await this.makeAuthenticatedRequest<CoverDimensions>(
//         "POST",
//         "/cover-dimensions/",
//         data
//       );

//       logger.info(
//         `Cover dimensions calculated: ${response.width} x ${response.height} ${response.unit}`
//       );

//       return response;
//     } catch (error) {
//       logger.error("Failed to calculate cover dimensions:", error);
//       throw new Error(
//         `Failed to calculate cover dimensions: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }

//   /**
//    * Submit an interior PDF for validation
//    * @param sourceUrl Publicly accessible URL where Lulu can download the PDF
//    * @param podPackageId The product SKU (optional, providing it enables extended validation)
//    * @returns Validation record with ID for status checking
//    */
//   async validateInteriorPdf(
//     sourceUrl: string,
//     podPackageId: string = SKU
//   ): Promise<InteriorPdfValidationResponse> {
//     try {
//       logger.info(`Validating interior PDF: ${sourceUrl}`);

//       // Create the request data
//       const requestData: InteriorPdfValidationRequest = {
//         source_url: sourceUrl,
//         pod_package_id: podPackageId,
//       };

//       // Make the API call with type assertion
//       const response =
//         await this.makeAuthenticatedRequest<InteriorPdfValidationResponse>(
//           "POST",
//           "/validate-interior/",
//           requestData
//         );

//       logger.info(`Interior PDF validation started, ID: ${response.id}`);
//       return response;
//     } catch (error) {
//       logger.error("Error validating interior PDF:", error);
//       throw new Error(
//         `Failed to validate interior PDF: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Check the status of an interior PDF validation
//    * @param validationId The ID returned from validateInteriorPdf
//    * @returns Current validation status and details
//    */
//   async checkInteriorPdfValidation(
//     validationId: number
//   ): Promise<InteriorPdfValidationResponse> {
//     try {
//       logger.info(
//         `Checking interior PDF validation status for ID: ${validationId}`
//       );

//       const response =
//         await this.makeAuthenticatedRequest<InteriorPdfValidationResponse>(
//           "GET",
//           `/validate-interior/${validationId}/`
//         );

//       logger.info(`Interior PDF validation status: ${response.status}`);
//       return response;
//     } catch (error) {
//       logger.error(
//         `Error checking interior PDF validation status for ID ${validationId}:`,
//         error
//       );
//       throw new Error(
//         `Failed to check interior PDF validation: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }

//   /**
//    * Submit a cover PDF for validation
//    * @param sourceUrl Publicly accessible URL where Lulu can download the PDF
//    * @param interiorPageCount Number of pages in the interior PDF
//    * @param podPackageId The product SKU
//    * @returns Validation record with ID for status checking
//    */
//   async validateCoverPdf(
//     sourceUrl: string,
//     interiorPageCount: number,
//     podPackageId: string = SKU
//   ): Promise<CoverPdfValidationResponse> {
//     try {
//       logger.info(`Validating cover PDF: ${sourceUrl}`);

//       // Create the request data
//       const requestData: CoverPdfValidationRequest = {
//         source_url: sourceUrl,
//         pod_package_id: podPackageId,
//         interior_page_count: interiorPageCount,
//       };

//       // Make the API call with type assertion
//       const response =
//         await this.makeAuthenticatedRequest<CoverPdfValidationResponse>(
//           "POST",
//           "/validate-cover/",
//           requestData
//         );

//       logger.info(`Cover PDF validation started, ID: ${response.id}`);
//       return response;
//     } catch (error) {
//       logger.error("Error validating cover PDF:", error);
//       throw new Error(
//         `Failed to validate cover PDF: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Check the status of a cover PDF validation
//    * @param validationId The ID returned from validateCoverPdf
//    * @returns Current validation status and details
//    */
//   async checkCoverPdfValidation(
//     validationId: number
//   ): Promise<CoverPdfValidationResponse> {
//     try {
//       logger.info(
//         `Checking cover PDF validation status for ID: ${validationId}`
//       );

//       const response =
//         await this.makeAuthenticatedRequest<CoverPdfValidationResponse>(
//           "GET",
//           `/validate-cover/${validationId}/`
//         );

//       logger.info(`Cover PDF validation status: ${response.status}`);
//       return response;
//     } catch (error) {
//       logger.error(
//         `Error checking cover PDF validation status for ID ${validationId}:`,
//         error
//       );
//       throw new Error(
//         `Failed to check cover PDF validation: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Create a new print job
//    * @param request Print job creation request
//    * @returns Created print job information
//    */
//   async createPrintJob(
//     request: CreatePrintJobRequest
//   ): Promise<CreatePrintJobResponse> {
//     try {
//       logger.info("Creating new print job");

//       const response =
//         await this.makeAuthenticatedRequest<CreatePrintJobResponse>(
//           "POST",
//           "/print-jobs/",
//           request
//         );

//       logger.info(
//         `Print job created with ID: ${response.id}, status: ${response.status}`
//       );
//       return response;
//     } catch (error) {
//       logger.error("Failed to create print job:", error);
//       throw new Error(
//         `Failed to create print job: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Get a list of print jobs with optional filtering
//    * @param page Page number for pagination
//    * @param pageSize Number of results per page
//    * @param filters Optional filters (status, created_after, etc.)
//    * @returns List of print jobs
//    */
//   async getPrintJobs(
//     page: number = 1,
//     pageSize: number = 10,
//     filters: Record<string, string> = {}
//   ): Promise<PrintJobsListResponse> {
//     try {
//       logger.info(`Getting print jobs list (page ${page})`);

//       // Construct query parameters
//       const queryParams = new URLSearchParams({
//         page: page.toString(),
//         page_size: pageSize.toString(),
//         ...filters,
//       }).toString();

//       const response =
//         await this.makeAuthenticatedRequest<PrintJobsListResponse>(
//           "GET",
//           `/print-jobs/?${queryParams}`
//         );

//       logger.info(`Retrieved ${response.results.length} print jobs`);
//       return response;
//     } catch (error) {
//       logger.error("Failed to get print jobs:", error);
//       throw new Error(
//         `Failed to get print jobs: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Get details of a specific print job
//    * @param jobId Print job ID
//    * @returns Print job details
//    */
//   async getPrintJob(jobId: number): Promise<SinglePrintJobResponse> {
//     try {
//       logger.info(`Getting print job details for ID: ${jobId}`);

//       const response =
//         await this.makeAuthenticatedRequest<SinglePrintJobResponse>(
//           "GET",
//           `/print-jobs/${jobId}/`
//         );

//       logger.info(`Retrieved print job ${jobId}, status: ${response.status}`);
//       return response;
//     } catch (error) {
//       logger.error(`Failed to get print job ${jobId}:`, error);
//       throw new Error(
//         `Failed to get print job: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }

//   /**
//    * Get the status of a specific print job
//    * @param jobId Print job ID
//    * @returns Print job status information
//    */
//   async getPrintJobStatus(jobId: number): Promise<PrintJobStatusResponse> {
//     try {
//       logger.info(`Getting status for print job ID: ${jobId}`);

//       const response =
//         await this.makeAuthenticatedRequest<PrintJobStatusResponse>(
//           "GET",
//           `/print-jobs/${jobId}/status/`
//         );

//       logger.info(`Print job ${jobId} status: ${response.name}`);
//       return response;
//     } catch (error) {
//       logger.error(`Failed to get status for print job ${jobId}:`, error);
//       throw new Error(
//         `Failed to get print job status: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }

//   /**
//    * Cancel a print job
//    * @param jobId Print job ID
//    * @returns Updated print job status
//    */
//   async cancelPrintJob(jobId: number): Promise<PrintJobStatusInfo> {
//     try {
//       logger.info(`Canceling print job ID: ${jobId}`);

//       const data: CancelPrintJobRequest = {
//         name: "CANCELED",
//       };

//       const response = await this.makeAuthenticatedRequest<PrintJobStatusInfo>(
//         "PUT",
//         `/print-jobs/${jobId}/status/`,
//         data
//       );

//       logger.info(`Print job ${jobId} canceled successfully`);
//       return response;
//     } catch (error) {
//       logger.error(`Failed to cancel print job ${jobId}:`, error);
//       throw new Error(
//         `Failed to cancel print job: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Subscribe to Lulu webhooks - typically done once by an admin
//    */
//   async subscribeToWebhooks(): Promise<WebhookResponse> {
//     try {
//       logger.info(`Subscribing to Lulu webhooks`);

//       const webhookRequest: CreateWebhookRequest = {
//         topics: ["PRINT_JOB_STATUS_CHANGED"],
//         url: `${config.APP.CLIENT_URL}/api/webhooks/lulu`,
//       };

//       const response = await this.makeAuthenticatedRequest<WebhookResponse>(
//         "POST", // Use POST instead of PUT
//         `/webhooks/`,
//         webhookRequest
//       );

//       logger.info(
//         `Successfully subscribed to Lulu webhooks, ID: ${response.id}`
//       );
//       return response;
//     } catch (error) {
//       logger.error(`Failed to subscribe to webhooks`, error);
//       throw new Error(
//         `Failed to subscribe to webhooks: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Get all webhook subscriptions
//    */
//   async getWebhooks(): Promise<WebhookResponse[]> {
//     try {
//       logger.info(`Getting all webhook subscriptions`);

//       const response = await this.makeAuthenticatedRequest<{
//         results: WebhookResponse[];
//       }>("GET", `/webhooks/`);

//       logger.info(`Retrieved ${response.results.length} webhook subscriptions`);
//       return response.results;
//     } catch (error) {
//       logger.error(`Failed to get webhooks`, error);
//       throw new Error(
//         `Failed to get webhooks: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Get a specific webhook by ID
//    */
//   async getWebhook(webhookId: string): Promise<WebhookResponse> {
//     try {
//       logger.info(`Getting webhook with ID: ${webhookId}`);

//       const response = await this.makeAuthenticatedRequest<WebhookResponse>(
//         "GET",
//         `/webhooks/${webhookId}/`
//       );

//       logger.info(`Retrieved webhook ${webhookId}`);
//       return response;
//     } catch (error) {
//       logger.error(`Failed to get webhook ${webhookId}`, error);
//       throw new Error(
//         `Failed to get webhook: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Update an existing webhook
//    */
//   async updateWebhook(
//     webhookId: string,
//     data: UpdateWebhookRequest
//   ): Promise<WebhookResponse> {
//     try {
//       logger.info(`Updating webhook with ID: ${webhookId}`);

//       const response = await this.makeAuthenticatedRequest<WebhookResponse>(
//         "PATCH",
//         `/webhooks/${webhookId}/`,
//         data
//       );

//       logger.info(`Successfully updated webhook ${webhookId}`);
//       return response;
//     } catch (error) {
//       logger.error(`Failed to update webhook ${webhookId}`, error);
//       throw new Error(
//         `Failed to update webhook: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Delete a webhook subscription
//    */
//   async deleteWebhook(webhookId: string): Promise<void> {
//     try {
//       logger.info(`Deleting webhook with ID: ${webhookId}`);

//       await this.makeAuthenticatedRequest("DELETE", `/webhooks/${webhookId}/`);

//       logger.info(`Successfully deleted webhook ${webhookId}`);
//     } catch (error) {
//       logger.error(`Failed to delete webhook ${webhookId}`, error);
//       throw new Error(
//         `Failed to delete webhook: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
//   /**
//    * Test a webhook subscription by sending a test notification
//    */
//   async testWebhook(
//     webhookId: string,
//     topic: WebhookTopic = "PRINT_JOB_STATUS_CHANGED"
//   ): Promise<boolean> {
//     try {
//       logger.info(`Testing webhook ${webhookId} for topic ${topic}`);

//       await this.makeAuthenticatedRequest<string>(
//         "POST",
//         `/webhooks/${webhookId}/test-submission/${topic}/`
//       );

//       logger.info(`Test notification sent for webhook ${webhookId}`);
//       return true;
//     } catch (error) {
//       logger.error(`Failed to test webhook ${webhookId}`, error);
//       throw new Error(
//         `Failed to test webhook: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }

//   /**
//    * Get webhook submissions history
//    *
//    * @param page Page number for pagination
//    * @param pageSize Number of results per page
//    * @param filters Optional filters (created_after, created_before, is_success, etc.)
//    * @returns List of webhook submissions
//    */
//   async getWebhookSubmissions(
//     page: number = 1,
//     pageSize: number = 10,
//     filters: Record<string, string | boolean> = {}
//   ): Promise<WebhookSubmissionsResponse> {
//     try {
//       logger.info(`Getting webhook submissions (page ${page})`);

//       // Construct query parameters
//       const queryParams = new URLSearchParams({
//         page: page.toString(),
//         page_size: pageSize.toString(),
//         ...Object.fromEntries(
//           Object.entries(filters).map(([k, v]) => [k, String(v)])
//         ),
//       }).toString();

//       const response =
//         await this.makeAuthenticatedRequest<WebhookSubmissionsResponse>(
//           "GET",
//           `/webhook-submissions/?${queryParams}`
//         );

//       logger.info(`Retrieved ${response.results.length} webhook submissions`);
//       return response;
//     } catch (error) {
//       logger.error("Failed to get webhook submissions:", error);
//       throw new Error(
//         `Failed to get webhook submissions: ${
//           error instanceof Error ? error.message : String(error)
//         }`
//       );
//     }
//   }
// }

// // Create and export a singleton instance
// export const luluPrintingService = new LuluPrintingService();
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { logger } from "@/lib/logger";
import config from "@/lib/config";
import {
  CalculatePrintJobCostRequest,
  CalculatePrintJobCostResponse,
  CancelPrintJobRequest,
  CoverDimensions,
  CoverDimensionsRequest,
  CoverPdfValidationRequest,
  CoverPdfValidationResponse,
  CreatePrintJobRequest,
  CreatePrintJobResponse,
  CreateWebhookRequest,
  InteriorPdfValidationRequest,
  InteriorPdfValidationResponse,
  LuluTokenResponse,
  PrintJobsListResponse,
  PrintJobStatusResponse,
  RequestData,
  ShippingOption,
  ShippingOptionsRequest,
  SinglePrintJobResponse,
  UpdateWebhookRequest,
  WebhookResponse,
  WebhookSubmissionsResponse,
  WebhookTopic,
  PrintJobStatusInfo,
} from "@/types/print";
import { SKU } from "@/constants/printing";
export class LuluPrintingService {
  private base64Auth: string;
  private accessToken: string | null = null;
  private tokenExpiry: Date | null = null;

  constructor() {
    // Generate the base64Auth string from the client key and secret
    this.base64Auth = this.generateBase64Auth(
      config.PRINTING.LULU.CLIENT_KEY,
      config.PRINTING.LULU.CLIENT_SECRET
    );

    if (!this.base64Auth) {
      throw new Error("Lulu API credentials not configured");
    }
    logger.info(
      `LuluPrintingService initialized with ${
        config.APP.IS_PRODUCTION ? "production" : "sandbox"
      } environment`
    );
  }

  /**
   * Generate the correct Base64 auth string from client key and secret
   */
  private generateBase64Auth(clientKey: string, clientSecret: string): string {
    const authString = `${clientKey}:${clientSecret}`;
    return Buffer.from(authString).toString("base64");
  }

  /**
   * Get a valid OAuth token, requesting a new one if necessary
   */
  async getAccessToken(): Promise<string> {
    // Check if we have a valid token already
    if (this.accessToken && this.tokenExpiry && this.tokenExpiry > new Date()) {
      return this.accessToken;
    }
    try {
      // Request a new token
      const tokenUrl = `${config.PRINTING.LULU.API_URL}/auth/realms/glasstree/protocol/openid-connect/token`;

      // Create proper form data
      const formData = new URLSearchParams();
      formData.append("grant_type", "client_credentials");

      logger.debug(`Using base64Auth: ${this.base64Auth.substring(0, 10)}...`);
      logger.debug(`Token URL: ${tokenUrl}`);

      const response = await axios.post<LuluTokenResponse>(tokenUrl, formData, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Authorization: `Basic ${this.base64Auth}`,
        },
      });

      // Store the new token and calculate expiry
      this.accessToken = response.data.access_token;

      // Token expires in X seconds, convert to Date and subtract a minute for safety margin
      const expiresInSeconds = response.data.expires_in || 3600;
      this.tokenExpiry = new Date(Date.now() + (expiresInSeconds - 60) * 1000);

      logger.debug("Successfully obtained new Lulu API access token");
      // If we have no token at this point, it's an error
      if (!this.accessToken) {
        throw new Error("Failed to obtain access token from Lulu API");
      }
      return this.accessToken;
    } catch (error) {
      // Log more detailed error information for debugging
      if (axios.isAxiosError(error) && error.response) {
        logger.error(
          `Failed to get Lulu API access token. Status: ${error.response.status}, Data:`,
          error.response.data
        );
      } else {
        logger.error("Failed to get Lulu API access token", error);
      }
      throw new Error("Failed to authenticate with Lulu API");
    }
  }

  /**
   * Make an authenticated API request to Lulu
   */
  async makeAuthenticatedRequest<T>(
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH",
    endpoint: string,
    data?: RequestData
  ): Promise<T> {
    try {
      const token = await this.getAccessToken();

      const requestConfig: AxiosRequestConfig = {
        method,
        url: `${config.PRINTING.LULU.API_URL}${endpoint}`,
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      };

      if (data) {
        requestConfig.data = data;

        // Log the request data for debugging
        logger.info(`Request to ${endpoint}:`, JSON.stringify(data, null, 2));
      }

      const response: AxiosResponse<T> = await axios(requestConfig);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        // Log the detailed error response data
        logger.error(
          `Lulu API request failed: ${endpoint}. Status: ${error.response.status}, Response data:`,
          JSON.stringify(error.response.data, null, 2)
        );
      } else {
        logger.error(`Lulu API request failed: ${endpoint}`, error);
      }
      throw error;
    }
  }

  /**
   * Get shipping options for a print job
   * @param request Shipping options request
   * @returns Available shipping options
   */
  async getShippingOptions(
    request: ShippingOptionsRequest
  ): Promise<ShippingOption[]> {
    try {
      logger.info("Getting available shipping options");

      const response = await this.makeAuthenticatedRequest<ShippingOption[]>(
        "POST",
        "/shipping-options/",
        request
      );

      logger.info(`Retrieved ${response.length} shipping options`);
      return response;
    } catch (error) {
      logger.error("Failed to get shipping options:", error);
      throw new Error(
        `Failed to get shipping options: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Calculate the cost of a print job before creation
   * @param request Cost calculation request
   * @returns Cost calculation result
   */
  async calculatePrintJobCost(
    request: CalculatePrintJobCostRequest
  ): Promise<CalculatePrintJobCostResponse> {
    try {
      logger.info("Calculating print job cost");

      const response =
        await this.makeAuthenticatedRequest<CalculatePrintJobCostResponse>(
          "POST",
          "/print-job-cost-calculations/",
          request
        );

      logger.info(
        `Print job cost calculated: ${response.total_cost_incl_tax} ${response.currency}`
      );
      return response;
    } catch (error) {
      logger.error("Failed to calculate print job cost:", error);
      // Rethrow the original error instead of creating a new one
      throw error;
    }
  }
  /**
   * Calculate cover dimensions from Lulu API based on interior page count
   * @param podPackageId The product SKU (pod_package_id)
   * @param interiorPageCount Number of pages in the interior PDF
   * @param unit Optional unit for dimensions (pt, mm, inch). Defaults to print points (pt)
   * @returns Cover dimensions including width, height, and unit
   */
  async calculateCoverDimensions(
    podPackageId: string = SKU,
    interiorPageCount: number,
    unit: "pt" | "mm" | "inch" = "pt"
  ): Promise<CoverDimensions> {
    try {
      logger.info(
        `Calculating cover dimensions for book with ${interiorPageCount} pages`
      );

      const data: CoverDimensionsRequest = {
        pod_package_id: podPackageId,
        interior_page_count: interiorPageCount,
        unit: unit,
      };

      // Call the Lulu API to calculate cover dimensions
      const response = await this.makeAuthenticatedRequest<CoverDimensions>(
        "POST",
        "/cover-dimensions/",
        data
      );

      logger.info(
        `Cover dimensions calculated: ${response.width} x ${response.height} ${response.unit}`
      );

      return response;
    } catch (error) {
      logger.error("Failed to calculate cover dimensions:", error);
      throw new Error(
        `Failed to calculate cover dimensions: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Submit an interior PDF for validation
   * @param sourceUrl Publicly accessible URL where Lulu can download the PDF
   * @param podPackageId The product SKU (optional, providing it enables extended validation)
   * @returns Validation record with ID for status checking
   */
  async validateInteriorPdf(
    sourceUrl: string,
    podPackageId: string = SKU
  ): Promise<InteriorPdfValidationResponse> {
    try {
      logger.info(`Validating interior PDF: ${sourceUrl}`);

      // Create the request data
      const requestData: InteriorPdfValidationRequest = {
        source_url: sourceUrl,
        pod_package_id: podPackageId,
      };

      // Make the API call with type assertion
      const response =
        await this.makeAuthenticatedRequest<InteriorPdfValidationResponse>(
          "POST",
          "/validate-interior/",
          requestData
        );

      logger.info(`Interior PDF validation started, ID: ${response.id}`);
      return response;
    } catch (error) {
      logger.error("Error validating interior PDF:", error);
      throw new Error(
        `Failed to validate interior PDF: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Check the status of an interior PDF validation
   * @param validationId The ID returned from validateInteriorPdf
   * @returns Current validation status and details
   */
  async checkInteriorPdfValidation(
    validationId: number
  ): Promise<InteriorPdfValidationResponse> {
    try {
      logger.info(
        `Checking interior PDF validation status for ID: ${validationId}`
      );

      const response =
        await this.makeAuthenticatedRequest<InteriorPdfValidationResponse>(
          "GET",
          `/validate-interior/${validationId}/`
        );

      logger.info(`Interior PDF validation status: ${response.status}`);
      return response;
    } catch (error) {
      logger.error(
        `Error checking interior PDF validation status for ID ${validationId}:`,
        error
      );
      throw new Error(
        `Failed to check interior PDF validation: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Submit a cover PDF for validation
   * @param sourceUrl Publicly accessible URL where Lulu can download the PDF
   * @param interiorPageCount Number of pages in the interior PDF
   * @param podPackageId The product SKU
   * @returns Validation record with ID for status checking
   */
  async validateCoverPdf(
    sourceUrl: string,
    interiorPageCount: number,
    podPackageId: string = SKU
  ): Promise<CoverPdfValidationResponse> {
    try {
      logger.info(`Validating cover PDF: ${sourceUrl}`);

      // Create the request data
      const requestData: CoverPdfValidationRequest = {
        source_url: sourceUrl,
        pod_package_id: podPackageId,
        interior_page_count: interiorPageCount,
      };

      // Make the API call with type assertion
      const response =
        await this.makeAuthenticatedRequest<CoverPdfValidationResponse>(
          "POST",
          "/validate-cover/",
          requestData
        );

      logger.info(`Cover PDF validation started, ID: ${response.id}`);
      return response;
    } catch (error) {
      logger.error("Error validating cover PDF:", error);
      throw new Error(
        `Failed to validate cover PDF: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Check the status of a cover PDF validation
   * @param validationId The ID returned from validateCoverPdf
   * @returns Current validation status and details
   */
  async checkCoverPdfValidation(
    validationId: number
  ): Promise<CoverPdfValidationResponse> {
    try {
      logger.info(
        `Checking cover PDF validation status for ID: ${validationId}`
      );

      const response =
        await this.makeAuthenticatedRequest<CoverPdfValidationResponse>(
          "GET",
          `/validate-cover/${validationId}/`
        );

      logger.info(`Cover PDF validation status: ${response.status}`);
      return response;
    } catch (error) {
      logger.error(
        `Error checking cover PDF validation status for ID ${validationId}:`,
        error
      );
      throw new Error(
        `Failed to check cover PDF validation: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Create a new print job
   * @param request Print job creation request
   * @returns Created print job information
   */
  async createPrintJob(
    request: CreatePrintJobRequest
  ): Promise<CreatePrintJobResponse> {
    try {
      logger.info("Creating new print job");

      const response =
        await this.makeAuthenticatedRequest<CreatePrintJobResponse>(
          "POST",
          "/print-jobs/",
          request
        );

      logger.info(
        `Print job created with ID: ${response.id}, status: ${response.status}`
      );
      return response;
    } catch (error) {
      logger.error("Failed to create print job:", error);
      throw new Error(
        `Failed to create print job: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Get a list of print jobs with optional filtering
   * @param page Page number for pagination
   * @param pageSize Number of results per page
   * @param filters Optional filters (status, created_after, etc.)
   * @returns List of print jobs
   */
  async getPrintJobs(
    page: number = 1,
    pageSize: number = 10,
    filters: Record<string, string> = {}
  ): Promise<PrintJobsListResponse> {
    try {
      logger.info(`Getting print jobs list (page ${page})`);

      // Construct query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
        ...filters,
      }).toString();

      const response =
        await this.makeAuthenticatedRequest<PrintJobsListResponse>(
          "GET",
          `/print-jobs/?${queryParams}`
        );

      logger.info(`Retrieved ${response.results.length} print jobs`);
      return response;
    } catch (error) {
      logger.error("Failed to get print jobs:", error);
      throw new Error(
        `Failed to get print jobs: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Get details of a specific print job
   * @param jobId Print job ID
   * @returns Print job details
   */
  async getPrintJob(jobId: number): Promise<SinglePrintJobResponse> {
    try {
      logger.info(`Getting print job details for ID: ${jobId}`);

      const response =
        await this.makeAuthenticatedRequest<SinglePrintJobResponse>(
          "GET",
          `/print-jobs/${jobId}/`
        );

      logger.info(`Retrieved print job ${jobId}, status: ${response.status}`);
      return response;
    } catch (error) {
      logger.error(`Failed to get print job ${jobId}:`, error);
      throw new Error(
        `Failed to get print job: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Get the status of a specific print job
   * @param jobId Print job ID
   * @returns Print job status information
   */
  async getPrintJobStatus(jobId: number): Promise<PrintJobStatusResponse> {
    try {
      logger.info(`Getting status for print job ID: ${jobId}`);

      const response =
        await this.makeAuthenticatedRequest<PrintJobStatusResponse>(
          "GET",
          `/print-jobs/${jobId}/status/`
        );

      logger.info(`Print job ${jobId} status: ${response.name}`);
      return response;
    } catch (error) {
      logger.error(`Failed to get status for print job ${jobId}:`, error);
      throw new Error(
        `Failed to get print job status: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Cancel a print job
   * @param jobId Print job ID
   * @returns Updated print job status
   */
  async cancelPrintJob(jobId: number): Promise<PrintJobStatusInfo> {
    try {
      logger.info(`Canceling print job ID: ${jobId}`);

      const data: CancelPrintJobRequest = {
        name: "CANCELED",
      };

      const response = await this.makeAuthenticatedRequest<PrintJobStatusInfo>(
        "PUT",
        `/print-jobs/${jobId}/status/`,
        data
      );

      logger.info(`Print job ${jobId} canceled successfully`);
      return response;
    } catch (error) {
      logger.error(`Failed to cancel print job ${jobId}:`, error);
      throw new Error(
        `Failed to cancel print job: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Subscribe to Lulu webhooks - typically done once by an admin
   */
  async subscribeToWebhooks(): Promise<WebhookResponse> {
    try {
      logger.info(`Subscribing to Lulu webhooks`);

      const webhookRequest: CreateWebhookRequest = {
        topics: ["PRINT_JOB_STATUS_CHANGED"],
        url: `${config.APP.CLIENT_URL}/api/webhooks/lulu`,
      };

      const response = await this.makeAuthenticatedRequest<WebhookResponse>(
        "POST", // Use POST instead of PUT
        `/webhooks/`,
        webhookRequest
      );

      logger.info(
        `Successfully subscribed to Lulu webhooks, ID: ${response.id}`
      );
      return response;
    } catch (error) {
      logger.error(`Failed to subscribe to webhooks`, error);
      throw new Error(
        `Failed to subscribe to webhooks: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Get all webhook subscriptions
   */
  async getWebhooks(): Promise<WebhookResponse[]> {
    try {
      logger.info(`Getting all webhook subscriptions`);

      const response = await this.makeAuthenticatedRequest<{
        results: WebhookResponse[];
      }>("GET", `/webhooks/`);

      logger.info(`Retrieved ${response.results.length} webhook subscriptions`);
      return response.results;
    } catch (error) {
      logger.error(`Failed to get webhooks`, error);
      throw new Error(
        `Failed to get webhooks: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Get a specific webhook by ID
   */
  async getWebhook(webhookId: string): Promise<WebhookResponse> {
    try {
      logger.info(`Getting webhook with ID: ${webhookId}`);

      const response = await this.makeAuthenticatedRequest<WebhookResponse>(
        "GET",
        `/webhooks/${webhookId}/`
      );

      logger.info(`Retrieved webhook ${webhookId}`);
      return response;
    } catch (error) {
      logger.error(`Failed to get webhook ${webhookId}`, error);
      throw new Error(
        `Failed to get webhook: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Update an existing webhook
   */
  async updateWebhook(
    webhookId: string,
    data: UpdateWebhookRequest
  ): Promise<WebhookResponse> {
    try {
      logger.info(`Updating webhook with ID: ${webhookId}`);

      const response = await this.makeAuthenticatedRequest<WebhookResponse>(
        "PATCH",
        `/webhooks/${webhookId}/`,
        data
      );

      logger.info(`Successfully updated webhook ${webhookId}`);
      return response;
    } catch (error) {
      logger.error(`Failed to update webhook ${webhookId}`, error);
      throw new Error(
        `Failed to update webhook: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Delete a webhook subscription
   */
  async deleteWebhook(webhookId: string): Promise<void> {
    try {
      logger.info(`Deleting webhook with ID: ${webhookId}`);

      await this.makeAuthenticatedRequest("DELETE", `/webhooks/${webhookId}/`);

      logger.info(`Successfully deleted webhook ${webhookId}`);
    } catch (error) {
      logger.error(`Failed to delete webhook ${webhookId}`, error);
      throw new Error(
        `Failed to delete webhook: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
  /**
   * Test a webhook subscription by sending a test notification
   */
  async testWebhook(
    webhookId: string,
    topic: WebhookTopic = "PRINT_JOB_STATUS_CHANGED"
  ): Promise<boolean> {
    try {
      logger.info(`Testing webhook ${webhookId} for topic ${topic}`);

      await this.makeAuthenticatedRequest<string>(
        "POST",
        `/webhooks/${webhookId}/test-submission/${topic}/`
      );

      logger.info(`Test notification sent for webhook ${webhookId}`);
      return true;
    } catch (error) {
      logger.error(`Failed to test webhook ${webhookId}`, error);
      throw new Error(
        `Failed to test webhook: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }

  /**
   * Get webhook submissions history
   *
   * @param page Page number for pagination
   * @param pageSize Number of results per page
   * @param filters Optional filters (created_after, created_before, is_success, etc.)
   * @returns List of webhook submissions
   */
  async getWebhookSubmissions(
    page: number = 1,
    pageSize: number = 10,
    filters: Record<string, string | boolean> = {}
  ): Promise<WebhookSubmissionsResponse> {
    try {
      logger.info(`Getting webhook submissions (page ${page})`);

      // Construct query parameters
      const queryParams = new URLSearchParams({
        page: page.toString(),
        page_size: pageSize.toString(),
        ...Object.fromEntries(
          Object.entries(filters).map(([k, v]) => [k, String(v)])
        ),
      }).toString();

      const response =
        await this.makeAuthenticatedRequest<WebhookSubmissionsResponse>(
          "GET",
          `/webhook-submissions/?${queryParams}`
        );

      logger.info(`Retrieved ${response.results.length} webhook submissions`);
      return response;
    } catch (error) {
      logger.error("Failed to get webhook submissions:", error);
      throw new Error(
        `Failed to get webhook submissions: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  }
}

// Use a private variable to hold the singleton instance
let luluPrintingServiceInstance: LuluPrintingService | null = null;

/**
 * Get the singleton instance of the LuluPrintingService
 * This ensures lazy initialization - the service is only created
 * and initialized when it's actually needed
 */
export function getLuluPrintingService(): LuluPrintingService {
  if (!luluPrintingServiceInstance) {
    luluPrintingServiceInstance = new LuluPrintingService();
  }
  return luluPrintingServiceInstance;
}
