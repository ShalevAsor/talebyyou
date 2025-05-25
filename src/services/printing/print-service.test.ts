import { LuluPrintingService } from "./print-service";
import axios from "axios";
import { logger } from "@/lib/logger";
import {
  CalculatePrintJobCostRequest,
  CreatePrintJobRequest,
} from "@/types/print";
import { SKU } from "@/constants/printing";

// Mock dependencies
jest.mock("axios");
jest.mock("@/lib/logger");
jest.mock("@/lib/config", () => ({
  APP: {
    NODE_ENV: "test",
    IS_DEVELOPMENT: false,
    IS_PRODUCTION: false,
    CLIENT_URL: "http://localhost:3000",
  },
  DATABASE: {
    URL: "test-database-url",
  },
  EMAIL: {
    TEST_MODE: "development",
    HOST: "smtp.gmail.com",
    PORT: "587",
    USER: "admin@talebyyou.com",
    PASSWORD: "test-app-password",
    SECURE: false,
    FROM: "noreply@talebyyou.com",
    SUPPORT: "support@talebyyou.com",
    ORDER: "orders@talebyyou.com",
    INFO: "info@talebyyou.com",
  },
  PRINTING: {
    LULU: {
      API_URL: "https://api.sandbox.lulu.com",
      CLIENT_KEY: "test-key",
      CLIENT_SECRET: "test-secret",
      BASE64_AUTH: "test-base64",
      CONTACT_EMAIL: "support@talebyyou.com",
      ENVIRONMENTS: {
        SANDBOX: {
          API_URL: "https://api.sandbox.lulu.com",
          CLIENT_KEY: "test-key",
          CLIENT_SECRET: "test-secret",
          BASE64_AUTH: "test-base64",
        },
        PRODUCTION: {
          API_URL: "https://api.lulu.com",
          CLIENT_KEY: "prod-key",
          CLIENT_SECRET: "prod-secret",
          BASE64_AUTH: "prod-base64",
        },
      },
    },
  },
  AWS: {
    REGION: "us-east-1",
    ACCESS_KEY_ID: "test-access-key",
    SECRET_ACCESS_KEY: "test-secret-key",
    S3_BUCKET_NAME: "test-bucket",
  },
  PAYMENT: {
    PAYPAL: {
      CLIENT_ID: "test-paypal-client-id",
      CLIENT_SECRET: "test-paypal-secret",
      API_URL: "https://api-m.sandbox.paypal.com",
    },
  },
  AUTH: {
    PUBLISHABLE_KEY: "test-clerk-publishable-key",
    SECRET_KEY: "test-clerk-secret",
    WEBHOOK_SECRET: "test-webhook-secret",
    SIGN_IN_URL: "/sign-in",
    SIGN_UP_URL: "/sign-up",
    SIGN_IN_FALLBACK: "/",
    SIGN_UP_FALLBACK: "/",
  },
  IMAGE_GENERATION: {
    LEONARDO: {
      API_KEY: "test-leonardo-key",
      WEBHOOK_SECRET: "test-leonardo-webhook",
    },
  },
}));

/**
 * 
 * PRINTING: {
    LULU: {
      // Current environment settings (automatically switches based on NODE_ENV)
      API_URL: isProduction
        ? process.env.LULU_API_URL || "https://api.lulu.com"
        : process.env.LULU_API_SANDBOX_URL || "https://api.sandbox.lulu.com",
      CLIENT_KEY: isProduction
        ? process.env.LULU_API_CLIENT_KEY || ""
        : process.env.LULU_API_SANDBOX_CLIENT_KEY || "",
      CLIENT_SECRET: isProduction
        ? process.env.LULU_API_CLIENT_SECRET || ""
        : process.env.LULU_API_SANDBOX_CLIENT_SECRET || "",
      BASE64_AUTH: isProduction
        ? process.env.LULU_API_BASE64 || ""
        : process.env.LULU_API_SANDBOX_BASE64 || "",
      CONTACT_EMAIL: process.env.LULU_CONTACT_EMAIL || "support@talebyyou.com",

      // Explicit environment configurations (for manual switching if needed)
      ENVIRONMENTS: {
        SANDBOX: {
          API_URL:
            process.env.LULU_API_SANDBOX_URL || "https://api.sandbox.lulu.com",
          CLIENT_KEY: process.env.LULU_API_SANDBOX_CLIENT_KEY || "",
          CLIENT_SECRET: process.env.LULU_API_SANDBOX_CLIENT_SECRET || "",
          BASE64_AUTH: process.env.LULU_API_SANDBOX_BASE64 || "",
        },
        PRODUCTION: {
          API_URL: process.env.LULU_API_URL || "https://api.lulu.com",
          CLIENT_KEY: process.env.LULU_API_CLIENT_KEY || "",
          CLIENT_SECRET: process.env.LULU_API_CLIENT_SECRET || "",
          BASE64_AUTH: process.env.LULU_API_BASE64 || "",
        },
      },
    },
  },
 */

describe("LuluPrintingService", () => {
  let printingService: LuluPrintingService;

  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();

    // Reset axios mock
    jest.mocked(axios).mockReset();

    // Create new instance of the service
    printingService = new LuluPrintingService(true); // Use sandbox for tests
  });

  describe("getAccessToken", () => {
    it("should return a valid access token", async () => {
      // Mock the axios post response for successful token request
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };

      // Setup axios.post mock to return the token response
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Call the method
      const token = await printingService.getAccessToken();

      // Assertions
      expect(token).toBe("mock-token-123");
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        "https://api.sandbox.lulu.com/auth/realms/glasstree/protocol/openid-connect/token",
        expect.any(URLSearchParams),
        expect.objectContaining({
          headers: expect.objectContaining({
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: expect.stringContaining("Basic "),
          }),
        })
      );
      expect(logger.debug).toHaveBeenCalledWith(
        "Successfully obtained new Lulu API access token"
      );
    });

    it("should throw error when authentication fails", async () => {
      // Mock the axios post to reject with an error
      const mockError = {
        response: {
          status: 401,
          data: {
            error: "invalid_client",
            error_description: "Invalid client credentials",
          },
        },
      };

      jest.mocked(axios.post).mockRejectedValueOnce(mockError);
      jest.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      // Call the method and expect it to throw
      await expect(printingService.getAccessToken()).rejects.toThrow(
        "Failed to authenticate with Lulu API"
      );

      // Verify error was logged
      expect(logger.error).toHaveBeenCalledWith(
        expect.stringContaining(
          "Failed to get Lulu API access token. Status: 401"
        ),
        expect.anything()
      );
    });

    it("should reuse existing token if it's not expired", async () => {
      // First, set up a successful token request
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };

      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Get token first time
      await printingService.getAccessToken();

      // Clear mocks to verify second call doesn't make any requests
      jest.clearAllMocks();

      // Get token second time
      const token = await printingService.getAccessToken();

      // Assertions - token should be returned but no HTTP request should be made
      expect(token).toBe("mock-token-123");
      expect(axios.post).not.toHaveBeenCalled();
    });
  });

  describe("getShippingOptions", () => {
    it("should retrieve shipping options successfully", async () => {
      // First we need to mock the token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Then we'll mock the shipping options response
      const mockShippingOptions = [
        {
          id: 1,
          level: "MAIL",
          currency: "USD",
          cost_excl_tax: "5.99",
          min_delivery_date: "2025-05-25",
          max_delivery_date: "2025-05-30",
          min_dispatch_date: "2025-05-20",
          max_dispatch_date: "2025-05-22",
          traceable: true,
          business_only: false,
          home_only: false,
          postbox_ok: true,
          shipping_buffer: 48,
          total_days_min: 5,
          total_days_max: 10,
          transit_time: 3,
        },
        {
          id: 2,
          level: "PRIORITY_MAIL",
          currency: "USD",
          cost_excl_tax: "12.99",
          min_delivery_date: "2025-05-22",
          max_delivery_date: "2025-05-25",
          min_dispatch_date: "2025-05-19",
          max_dispatch_date: "2025-05-20",
          traceable: true,
          business_only: false,
          home_only: false,
          postbox_ok: false,
          shipping_buffer: 24,
          total_days_min: 3,
          total_days_max: 6,
          transit_time: 2,
        },
      ];

      // Mock the axios call that happens in makeAuthenticatedRequest
      jest.mocked(axios).mockResolvedValueOnce({ data: mockShippingOptions });

      // Create test shipping options request
      const shippingRequest = {
        line_items: [
          {
            pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            quantity: 1,
            page_count: 40,
          },
        ],
        shipping_address: {
          city: "New York",
          country: "US",
          postcode: "10001",
          street1: "123 Test Street",
        },
      };

      // Call the method
      const result = await printingService.getShippingOptions(shippingRequest);

      // Assertions
      expect(result).toEqual(mockShippingOptions);
      expect(result.length).toBe(2);
      expect(result[0].level).toBe("MAIL");
      expect(result[1].level).toBe("PRIORITY_MAIL");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "https://api.sandbox.lulu.com/shipping-options/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
          data: shippingRequest,
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        "Getting available shipping options"
      );
      expect(logger.info).toHaveBeenCalledWith("Retrieved 2 shipping options");
    });

    it("should handle shipping options request error", async () => {
      // First we need to mock the token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock shipping options request failure
      const errorObj = new Error("API error");
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Create test shipping options request with invalid data
      const invalidRequest = {
        line_items: [
          {
            pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            quantity: 1,
            page_count: 40,
          },
        ],
        shipping_address: {
          city: "Invalid City",
          country: "INVALID",
          postcode: "INVALID",
          street1: "123 Test Street",
        },
      };

      // Call the method and expect it to throw
      await expect(
        printingService.getShippingOptions(invalidRequest)
      ).rejects.toThrow("Failed to get shipping options: API error");

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to get shipping options:",
        errorObj
      );
    });
  });
  describe("calculatePrintJobCost", () => {
    it("should calculate print job cost successfully", async () => {
      // First we need to mock the token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the cost calculation response
      const mockCostCalculation = {
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "US",
          postcode: "10001",
          street1: "123 Test Street",
        },
        currency: "USD",
        fees: [],
        fulfillment_cost: {
          tax_rate: "0.00",
          total_cost_excl_tax: "0.00",
          total_cost_incl_tax: "0.00",
          total_tax: "0.00",
        },
        line_item_costs: [
          {
            cost_excl_discounts: "9.99",
            discounts: [],
            quantity: 1,
            tax_rate: "0.10",
            total_cost_excl_discounts: "9.99",
            total_cost_excl_tax: "9.99",
            total_cost_incl_tax: "10.99",
            total_tax: "1.00",
            unit_tier_cost: null,
          },
        ],
        shipping_cost: {
          tax_rate: "0.10",
          total_cost_excl_tax: "5.99",
          total_cost_incl_tax: "6.59",
          total_tax: "0.60",
        },
        total_cost_excl_tax: "15.98",
        total_cost_incl_tax: "17.58",
        total_discount_amount: "0.00",
        total_tax: "1.60",
      };

      // Mock the axios call for cost calculation
      jest.mocked(axios).mockResolvedValueOnce({ data: mockCostCalculation });

      // Create test request
      const costRequest: CalculatePrintJobCostRequest = {
        line_items: [
          {
            pod_package_id: SKU,
            quantity: 1,
            page_count: 35,
          },
        ],
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "US",
          postcode: "10001",
          street1: "123 Test Street",
        },
        shipping_option: "MAIL",
      };

      // Call the method
      const result = await printingService.calculatePrintJobCost(costRequest);

      // Assertions
      expect(result).toEqual(mockCostCalculation);
      expect(result.currency).toBe("USD");
      expect(result.total_cost_incl_tax).toBe("17.58");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "https://api.sandbox.lulu.com/print-job-cost-calculations/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
          data: costRequest,
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith("Calculating print job cost");
      expect(logger.info).toHaveBeenCalledWith(
        "Print job cost calculated: 17.58 USD"
      );
    });

    it("should handle error when calculating print job cost", async () => {
      // First we need to mock the token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the error for cost calculation
      const errorObj = new Error("Cost calculation failed");
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Create test request
      const costRequest: CalculatePrintJobCostRequest = {
        line_items: [
          {
            pod_package_id: SKU,
            quantity: 1,
            page_count: 35,
          },
        ],
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "US",
          postcode: "10001",
          street1: "123 Test Street",
        },
        shipping_option: "MAIL",
      };

      // Call the method and expect it to throw
      await expect(
        printingService.calculatePrintJobCost(costRequest)
      ).rejects.toThrow("Cost calculation failed");

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to calculate print job cost:",
        errorObj
      );
    });
  });
  describe("calculateCoverDimensions", () => {
    it("should calculate cover dimensions successfully", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the cover dimensions response
      const mockDimensions = {
        width: "612.0",
        height: "792.0",
        unit: "pt",
      };

      // Mock the axios call for dimensions calculation
      jest.mocked(axios).mockResolvedValueOnce({ data: mockDimensions });

      // Call the method
      const result = await printingService.calculateCoverDimensions(
        "0600X0900BWSTDPB060UW444MXX",
        40,
        "pt"
      );

      // Assertions
      expect(result).toEqual(mockDimensions);
      expect(result.width).toBe("612.0");
      expect(result.height).toBe("792.0");
      expect(result.unit).toBe("pt");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "https://api.sandbox.lulu.com/cover-dimensions/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
          data: {
            pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            interior_page_count: 40,
            unit: "pt",
          },
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        "Calculating cover dimensions for book with 40 pages"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "Cover dimensions calculated: 612.0 x 792.0 pt"
      );
    });

    it("should use default product SKU when not provided", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the cover dimensions response
      const mockDimensions = {
        width: "612.0",
        height: "792.0",
        unit: "pt",
      };

      // Mock the axios call for dimensions calculation
      jest.mocked(axios).mockResolvedValueOnce({ data: mockDimensions });

      // Call the method with default SKU
      const result = await printingService.calculateCoverDimensions(
        undefined,
        40
      );

      // Assertions
      expect(result).toEqual(mockDimensions);

      // Check the request was made with the default SKU
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            pod_package_id: SKU, // Using the default SKU constant
          }),
        })
      );
    });

    it("should handle error when calculating cover dimensions", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the error for dimensions calculation
      const errorObj = new Error("Invalid page count");
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Call the method and expect it to throw
      await expect(
        printingService.calculateCoverDimensions(
          "0600X0900BWSTDPB060UW444MXX",
          0
        )
      ).rejects.toThrow(
        "Failed to calculate cover dimensions: Invalid page count"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to calculate cover dimensions:",
        errorObj
      );
    });

    it("should work with different unit types", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the cover dimensions response with mm units
      const mockDimensions = {
        width: "210.0",
        height: "297.0",
        unit: "mm",
      };

      // Mock the axios call for dimensions calculation
      jest.mocked(axios).mockResolvedValueOnce({ data: mockDimensions });

      // Call the method with mm units
      const result = await printingService.calculateCoverDimensions(
        "0600X0900BWSTDPB060UW444MXX",
        40,
        "mm"
      );

      // Assertions
      expect(result).toEqual(mockDimensions);
      expect(result.unit).toBe("mm");

      // Check that the axios request was made with mm units
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            unit: "mm",
          }),
        })
      );
    });
  });
  describe("validateInteriorPdf", () => {
    it("should validate interior PDF successfully", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the validation response
      const mockValidationResponse = {
        id: 12345,
        source_url: "https://example.com/document.pdf",
        page_count: 40,
        errors: null,
        status: "PENDING",
        valid_pod_package_ids: ["0600X0900BWSTDPB060UW444MXX"],
      };

      // Mock the axios call for PDF validation
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Test parameters
      const sourceUrl = "https://example.com/document.pdf";
      const podPackageId = "0600X0900BWSTDPB060UW444MXX";

      // Call the method
      const result = await printingService.validateInteriorPdf(
        sourceUrl,
        podPackageId
      );

      // Assertions
      expect(result).toEqual(mockValidationResponse);
      expect(result.id).toBe(12345);
      expect(result.status).toBe("PENDING");
      expect(result.page_count).toBe(40);

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "https://api.sandbox.lulu.com/validate-interior/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
          data: {
            source_url: sourceUrl,
            pod_package_id: podPackageId,
          },
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        `Validating interior PDF: ${sourceUrl}`
      );
      expect(logger.info).toHaveBeenCalledWith(
        `Interior PDF validation started, ID: ${result.id}`
      );
    });

    it("should use default SKU when not provided", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the validation response
      const mockValidationResponse = {
        id: 12345,
        source_url: "https://example.com/document.pdf",
        page_count: 40,
        errors: null,
        status: "PENDING",
        valid_pod_package_ids: ["0600X0900BWSTDPB060UW444MXX"],
      };

      // Mock the axios call for PDF validation
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Test parameters (only provide source URL)
      const sourceUrl = "https://example.com/document.pdf";

      // Call the method without providing a SKU
      const result = await printingService.validateInteriorPdf(sourceUrl);

      // Assertions
      expect(result).toEqual(mockValidationResponse);

      // Check the request was made with the default SKU
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            pod_package_id: SKU, // Using the default SKU constant
          }),
        })
      );
    });

    it("should handle validation with errors", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock validation response with errors
      const mockValidationWithErrors = {
        id: 12345,
        source_url: "https://example.com/invalid.pdf",
        page_count: 0,
        errors: ["Invalid PDF format", "Empty document"],
        status: "REJECTED",
        valid_pod_package_ids: null,
      };

      // Mock the axios call for PDF validation
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationWithErrors });

      // Call the method
      const result = await printingService.validateInteriorPdf(
        "https://example.com/invalid.pdf"
      );

      // Assertions
      expect(result).toEqual(mockValidationWithErrors);
      expect(result.status).toBe("REJECTED");
      expect(result.errors).toEqual(["Invalid PDF format", "Empty document"]);
    });

    it("should handle error when validating interior PDF", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the error for PDF validation
      const errorObj = new Error("Failed to access PDF file");
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Call the method and expect it to throw
      await expect(
        printingService.validateInteriorPdf(
          "https://example.com/unavailable.pdf"
        )
      ).rejects.toThrow(
        "Failed to validate interior PDF: Failed to access PDF file"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Error validating interior PDF:",
        errorObj
      );
    });

    it("should handle API service errors during validation", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create a proper Error object with Axios error properties
      const serviceError = new Error("Request failed with status code 503");
      // Add Axios error properties
      Object.assign(serviceError, {
        response: {
          status: 503,
          data: {
            detail: "Validation service temporarily unavailable",
          },
        },
        isAxiosError: true,
      });

      jest.mocked(axios).mockRejectedValueOnce(serviceError);
      jest.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      // Call the method and expect it to throw
      await expect(
        printingService.validateInteriorPdf("https://example.com/document.pdf")
      ).rejects.toThrow(
        "Failed to validate interior PDF: Request failed with status code 503"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Error validating interior PDF:",
        serviceError
      );
    });
  });
  describe("checkInteriorPdfValidation", () => {
    it("should check interior PDF validation status successfully", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the validation status response - showing an ACCEPTED status
      const mockValidationResponse = {
        id: 12345,
        source_url: "https://example.com/document.pdf",
        page_count: 40,
        errors: null,
        status: "ACCEPTED",
        valid_pod_package_ids: ["0600X0900BWSTDPB060UW444MXX"],
      };

      // Mock the axios call for checking validation status
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Call the method
      const result = await printingService.checkInteriorPdfValidation(12345);

      // Assertions
      expect(result).toEqual(mockValidationResponse);
      expect(result.status).toBe("ACCEPTED");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "https://api.sandbox.lulu.com/validate-interior/12345/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        "Checking interior PDF validation status for ID: 12345"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "Interior PDF validation status: ACCEPTED"
      );
    });

    it("should handle error when checking validation status", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create a proper Error object for the API error
      const errorObj = new Error("Validation ID not found");

      // Mock the axios call to throw an error
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Call the method and expect it to throw
      await expect(
        printingService.checkInteriorPdfValidation(99999)
      ).rejects.toThrow(
        "Failed to check interior PDF validation: Validation ID not found"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Error checking interior PDF validation status for ID 99999:",
        errorObj
      );
    });
  });
  describe("validateCoverPdf", () => {
    it("should validate cover PDF successfully", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the cover validation response
      const mockValidationResponse = {
        id: 54321,
        source_url: "https://example.com/cover.pdf",
        page_count: 1,
        errors: null,
        status: "PENDING",
      };

      // Mock the axios call for PDF validation
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Test parameters
      const sourceUrl = "https://example.com/cover.pdf";
      const interiorPageCount = 40;
      const podPackageId = "0600X0900BWSTDPB060UW444MXX";

      // Call the method
      const result = await printingService.validateCoverPdf(
        sourceUrl,
        interiorPageCount,
        podPackageId
      );

      // Assertions
      expect(result).toEqual(mockValidationResponse);
      expect(result.id).toBe(54321);
      expect(result.status).toBe("PENDING");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "https://api.sandbox.lulu.com/validate-cover/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
          data: {
            source_url: sourceUrl,
            pod_package_id: podPackageId,
            interior_page_count: interiorPageCount,
          },
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        `Validating cover PDF: ${sourceUrl}`
      );
      expect(logger.info).toHaveBeenCalledWith(
        `Cover PDF validation started, ID: ${result.id}`
      );
    });

    it("should use default SKU when not provided", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the validation response
      const mockValidationResponse = {
        id: 54321,
        source_url: "https://example.com/cover.pdf",
        page_count: 1,
        errors: null,
        status: "PENDING",
      };

      // Mock the axios call for PDF validation
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Call the method without providing a SKU
      await printingService.validateCoverPdf(
        "https://example.com/cover.pdf",
        40
      );

      // Check the request was made with the default SKU
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          data: expect.objectContaining({
            pod_package_id: SKU, // Using the default SKU constant
            interior_page_count: 40,
          }),
        })
      );
    });

    it("should handle error when validating cover PDF", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create a proper Error object for the API error
      const errorObj = new Error("Invalid cover dimensions");

      // Mock the axios call to throw an error
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Call the method and expect it to throw
      await expect(
        printingService.validateCoverPdf(
          "https://example.com/invalid-cover.pdf",
          40
        )
      ).rejects.toThrow(
        "Failed to validate cover PDF: Invalid cover dimensions"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Error validating cover PDF:",
        errorObj
      );
    });

    it("should handle validation response with errors", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock validation response with errors
      const mockValidationWithErrors = {
        id: 54321,
        source_url: "https://example.com/invalid-cover.pdf",
        page_count: 1,
        errors: ["Cover dimensions do not match book specifications"],
        status: "REJECTED",
      };

      // Mock the axios call
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationWithErrors });

      // Call the method
      const result = await printingService.validateCoverPdf(
        "https://example.com/invalid-cover.pdf",
        40
      );

      // Assertions
      expect(result).toEqual(mockValidationWithErrors);
      expect(result.status).toBe("REJECTED");
      expect(result.errors).toEqual([
        "Cover dimensions do not match book specifications",
      ]);
    });
  });
  describe("checkCoverPdfValidation", () => {
    it("should check cover PDF validation status successfully", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the validation status response - showing an ACCEPTED status
      const mockValidationResponse = {
        id: 54321,
        source_url: "https://example.com/cover.pdf",
        page_count: 1,
        errors: null,
        status: "ACCEPTED",
      };

      // Mock the axios call for checking validation status
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Call the method
      const result = await printingService.checkCoverPdfValidation(54321);

      // Assertions
      expect(result).toEqual(mockValidationResponse);
      expect(result.status).toBe("ACCEPTED");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "https://api.sandbox.lulu.com/validate-cover/54321/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        "Checking cover PDF validation status for ID: 54321"
      );
      expect(logger.info).toHaveBeenCalledWith(
        "Cover PDF validation status: ACCEPTED"
      );
    });

    it("should handle validation status showing errors", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the validation status response - showing a REJECTED status
      const mockValidationResponse = {
        id: 54321,
        source_url: "https://example.com/cover.pdf",
        page_count: 1,
        errors: ["Cover dimensions do not match specifications"],
        status: "REJECTED",
      };

      // Mock the axios call for checking validation status
      jest
        .mocked(axios)
        .mockResolvedValueOnce({ data: mockValidationResponse });

      // Call the method
      const result = await printingService.checkCoverPdfValidation(54321);

      // Assertions
      expect(result).toEqual(mockValidationResponse);
      expect(result.status).toBe("REJECTED");
      expect(result.errors).toEqual([
        "Cover dimensions do not match specifications",
      ]);

      // Check logging
      expect(logger.info).toHaveBeenCalledWith(
        "Cover PDF validation status: REJECTED"
      );
    });

    it("should handle error when checking validation status", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create a proper Error object for the API error
      const errorObj = new Error("Validation ID not found");

      // Mock the axios call to throw an error
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Call the method and expect it to throw
      await expect(
        printingService.checkCoverPdfValidation(99999)
      ).rejects.toThrow(
        "Failed to check cover PDF validation: Validation ID not found"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Error checking cover PDF validation status for ID 99999:",
        errorObj
      );
    });
  });
  describe("createPrintJob", () => {
    it("should create a print job successfully", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the print job creation response
      const mockPrintJobResponse = {
        contact_email: "support@example.com",
        costs: {
          line_item_costs: [
            {
              cost_excl_discounts: "9.99",
              discounts: [],
              quantity: 1,
              tax_rate: "0.10",
              total_cost_excl_discounts: "9.99",
              total_cost_excl_tax: "9.99",
              total_cost_incl_tax: "10.99",
              total_tax: "1.00",
              unit_tier_cost: null,
            },
          ],
          shipping_cost: {
            tax_rate: "0.10",
            total_cost_excl_tax: "5.99",
            total_cost_incl_tax: "6.59",
            total_tax: "0.60",
          },
          total_cost_excl_tax: "15.98",
          total_cost_incl_tax: "17.58",
          total_tax: "1.60",
        },
        date_created: "2025-05-17T10:00:00Z",
        date_modified: "2025-05-17T10:00:00Z",
        estimated_shipping_dates: {
          arrival_min: "2025-05-22",
          arrival_max: "2025-05-25",
          dispatch_min: "2025-05-19",
          dispatch_max: "2025-05-20",
        },
        external_id: "order-123",
        id: 9876,
        line_items: [
          {
            external_id: "book-123",
            id: 5432,
            printable_id: null,
            printable_normalization: {
              cover: {
                job_id: null,
                normalized_file: null,
                page_count: null,
                source_file: null,
                source_md5sum: "abcdef123456",
                source_url: "https://example.com/cover.pdf",
              },
              interior: {
                job_id: null,
                normalized_file: null,
                page_count: 40,
                source_file: null,
                source_md5sum: "123456abcdef",
                source_url: "https://example.com/interior.pdf",
              },
              pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            },
            quantity: 1,
            status: {
              name: "CREATED",
              messages: {
                info: "Print job created",
              },
            },
            title: "My Test Book",
          },
        ],
        production_delay: 60,
        production_due_time: null,
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "US",
          postcode: "10001",
          street1: "123 Test Street",
          state_code: "NY",
          is_business: false,
        },
        shipping_level: "MAIL",
        shipping_option_level: "MAIL",
        status: {
          name: "CREATED",
          message: "Print job created successfully",
          changed: "2025-05-17T10:00:00Z",
        },
      };

      // Mock the axios call for print job creation
      jest.mocked(axios).mockResolvedValueOnce({ data: mockPrintJobResponse });

      // Create test print job request
      const printJobRequest: CreatePrintJobRequest = {
        contact_email: "support@example.com",
        external_id: "order-123",
        line_items: [
          {
            external_id: "book-123",
            printable_normalization: {
              cover: {
                source_url: "https://example.com/cover.pdf",
              },
              interior: {
                source_url: "https://example.com/interior.pdf",
              },
              pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            },
            quantity: 1,
            title: "My Test Book",
          },
        ],
        production_delay: 60,
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "US",
          postcode: "10001",
          street1: "123 Test Street",
          state_code: "NY",
        },
        shipping_level: "MAIL",
      };

      // Call the method
      const result = await printingService.createPrintJob(printJobRequest);

      // Assertions
      expect(result).toEqual(mockPrintJobResponse);
      expect(result.id).toBe(9876);
      expect(result.status.name).toBe("CREATED");
      expect(result.line_items.length).toBe(1);
      expect(result.line_items[0].external_id).toBe("book-123");

      // Check that the axios request was made correctly
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "POST",
          url: "https://api.sandbox.lulu.com/print-jobs/",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
          data: printJobRequest,
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith("Creating new print job");
      expect(logger.info).toHaveBeenCalledWith(
        "Print job created with ID: 9876, status: [object Object]"
      );
    });

    it("should handle validation errors when creating a print job", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create an error object that represents a validation error
      const validationError = new Error("Validation failed");
      Object.assign(validationError, {
        response: {
          status: 400,
          data: {
            detail: "Invalid shipping address",
            shipping_address: {
              detail: {
                errors: [
                  {
                    path: "country_code",
                    code: "invalid_choice",
                    message: "Invalid country code",
                  },
                ],
              },
            },
          },
        },
        isAxiosError: true,
      });

      // Mock the axios call to throw a validation error
      jest.mocked(axios).mockRejectedValueOnce(validationError);
      jest.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      // Create an invalid print job request (with invalid country code)
      const invalidPrintJobRequest: CreatePrintJobRequest = {
        contact_email: "support@example.com",
        external_id: "order-123",
        line_items: [
          {
            external_id: "book-123",
            printable_normalization: {
              cover: {
                source_url: "https://example.com/cover.pdf",
              },
              interior: {
                source_url: "https://example.com/interior.pdf",
              },
              pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            },
            quantity: 1,
            title: "My Test Book",
          },
        ],
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "INVALID", // Invalid country code
          postcode: "10001",
          street1: "123 Test Street",
        },
        shipping_level: "MAIL",
      };

      // Call the method and expect it to throw
      await expect(
        printingService.createPrintJob(invalidPrintJobRequest)
      ).rejects.toThrow("Failed to create print job: Validation failed");

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to create print job:",
        validationError
      );
    });

    it("should handle server errors when creating a print job", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create a server error object
      const serverError = new Error("Internal Server Error");
      Object.assign(serverError, {
        response: {
          status: 500,
          data: {
            detail: "An unexpected error occurred",
          },
        },
        isAxiosError: true,
      });

      // Mock the axios call to throw a server error
      jest.mocked(axios).mockRejectedValueOnce(serverError);
      jest.mocked(axios.isAxiosError).mockReturnValueOnce(true);

      // Create a valid print job request
      const printJobRequest: CreatePrintJobRequest = {
        contact_email: "support@example.com",
        external_id: "order-123",
        line_items: [
          {
            external_id: "book-123",
            printable_normalization: {
              cover: {
                source_url: "https://example.com/cover.pdf",
              },
              interior: {
                source_url: "https://example.com/interior.pdf",
              },
              pod_package_id: "0600X0900BWSTDPB060UW444MXX",
            },
            quantity: 1,
            title: "My Test Book",
          },
        ],
        shipping_address: {
          name: "Test User",
          phone_number: "1234567890",
          city: "New York",
          country_code: "US",
          postcode: "10001",
          street1: "123 Test Street",
        },
        shipping_level: "MAIL",
      };

      // Call the method and expect it to throw
      await expect(
        printingService.createPrintJob(printJobRequest)
      ).rejects.toThrow("Failed to create print job: Internal Server Error");

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to create print job:",
        serverError
      );
    });
  });
  describe("getPrintJobs", () => {
    it("should retrieve print jobs list successfully with default parameters", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock the print jobs list response
      const mockPrintJobsResponse = {
        count: 2,
        next: null,
        previous: null,
        results: [
          {
            id: 9876,
            external_id: "order-123",
            status: {
              name: "SHIPPED",
              message: "Your order has been shipped",
              changed: "2025-05-16T15:30:00Z",
            },
            contact_email: "support@example.com",
            line_items: [
              {
                id: 5432,
                external_id: "book-123",
                title: "My Test Book",
                quantity: 1,
                printable_normalization: {
                  pod_package_id: "0600X0900BWSTDPB060UW444MXX",
                  cover: { source_url: "https://example.com/cover1.pdf" },
                  interior: { source_url: "https://example.com/interior1.pdf" },
                },
                status: { name: "SHIPPED", messages: { info: "Item shipped" } },
              },
            ],
            costs: {
              line_item_costs: [],
              shipping_cost: null,
              total_cost_excl_tax: "15.98",
              total_cost_incl_tax: "17.58",
              total_tax: "1.60",
            },
            shipping_level: "MAIL",
            shipping_option_level: "MAIL",
            date_created: "2025-05-15T10:00:00Z",
            date_modified: "2025-05-16T15:30:00Z",
          },
          {
            id: 9875,
            external_id: "order-122",
            status: {
              name: "CREATED",
              message: "Print job created successfully",
              changed: "2025-05-15T10:00:00Z",
            },
            contact_email: "support@example.com",
            line_items: [
              {
                id: 5431,
                external_id: "book-122",
                title: "Another Book",
                quantity: 1,
                printable_normalization: {
                  pod_package_id: "0600X0900BWSTDPB060UW444MXX",
                  cover: { source_url: "https://example.com/cover2.pdf" },
                  interior: { source_url: "https://example.com/interior2.pdf" },
                },
                status: {
                  name: "CREATED",
                  messages: { info: "Print job created" },
                },
              },
            ],
            costs: {
              line_item_costs: [],
              shipping_cost: null,
              total_cost_excl_tax: "15.98",
              total_cost_incl_tax: "17.58",
              total_tax: "1.60",
            },
            shipping_level: "MAIL",
            shipping_option_level: "MAIL",
            date_created: "2025-05-15T10:00:00Z",
            date_modified: "2025-05-15T10:00:00Z",
          },
        ],
      };

      // Mock the axios call
      jest.mocked(axios).mockResolvedValueOnce({ data: mockPrintJobsResponse });

      // Call the method with default parameters
      const result = await printingService.getPrintJobs();

      // Assertions
      expect(result).toEqual(mockPrintJobsResponse);
      expect(result.count).toBe(2);
      expect(result.results.length).toBe(2);
      expect(result.results[0].id).toBe(9876);
      expect(result.results[1].id).toBe(9875);

      // Check that the axios request was made correctly with default parameters
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: "https://api.sandbox.lulu.com/print-jobs/?page=1&page_size=10",
          headers: expect.objectContaining({
            Authorization: "Bearer mock-token-123",
            "Content-Type": "application/json",
          }),
        })
      );

      // Check that logger was called
      expect(logger.info).toHaveBeenCalledWith(
        "Getting print jobs list (page 1)"
      );
      expect(logger.info).toHaveBeenCalledWith("Retrieved 2 print jobs");
    });

    it("should use custom pagination and filters", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Mock a paginated response
      const mockPaginatedResponse = {
        count: 30,
        next: "https://api.sandbox.lulu.com/print-jobs/?page=3&page_size=5&status=SHIPPED",
        previous:
          "https://api.sandbox.lulu.com/print-jobs/?page=1&page_size=5&status=SHIPPED",
        results: [
          {
            id: 9870,
            external_id: "order-120",
            status: {
              name: "SHIPPED",
              message: "Your order has been shipped",
              changed: "2025-05-10T15:30:00Z",
            },
            // Other properties would be here but omitted for brevity
            date_created: "2025-05-09T10:00:00Z",
            date_modified: "2025-05-10T15:30:00Z",
          },
          // More results would be here, but omitted for brevity
        ],
      };

      // Mock the axios call
      jest.mocked(axios).mockResolvedValueOnce({ data: mockPaginatedResponse });

      // Custom pagination and filters
      const page = 2;
      const pageSize = 5;
      const filters = { status: "SHIPPED" };

      // Call the method with custom parameters
      const result = await printingService.getPrintJobs(
        page,
        pageSize,
        filters
      );

      // Assertions
      expect(result).toEqual(mockPaginatedResponse);

      // Check that the axios request was made with custom parameters
      const expectedUrl =
        "https://api.sandbox.lulu.com/print-jobs/?page=2&page_size=5&status=SHIPPED";
      expect(axios).toHaveBeenCalledWith(
        expect.objectContaining({
          method: "GET",
          url: expectedUrl,
        })
      );

      // Check logger
      expect(logger.info).toHaveBeenCalledWith(
        "Getting print jobs list (page 2)"
      );
    });

    it("should handle error when retrieving print jobs", async () => {
      // Mock token retrieval
      const mockTokenResponse = {
        data: {
          access_token: "mock-token-123",
          expires_in: 3600,
          token_type: "Bearer",
        },
      };
      jest.mocked(axios.post).mockResolvedValueOnce(mockTokenResponse);

      // Create an error for the API call
      const errorObj = new Error("API connection timeout");

      // Mock the axios call to fail
      jest.mocked(axios).mockRejectedValueOnce(errorObj);

      // Call the method and expect it to throw
      await expect(printingService.getPrintJobs()).rejects.toThrow(
        "Failed to get print jobs: API connection timeout"
      );

      // Check that error was logged
      expect(logger.error).toHaveBeenCalledWith(
        "Failed to get print jobs:",
        errorObj
      );
    });
  });
});
