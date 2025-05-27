import {
  LuluValidationErrorResponse,
  AddressValidationResult,
} from "@/types/print";
import axios from "axios";

/**
 * Handles shipping address validation errors from Lulu API
 *
 * @param error - The error from the API call
 * @returns AddressValidationResult with appropriate error messages or null if not a validation error
 */
export function handleShippingAddressValidationError(
  error: unknown
): AddressValidationResult | null {
  // Only handle Axios errors with response data
  if (!axios.isAxiosError(error) || !error.response?.data) {
    return null;
  }

  // Handle 400 validation errors
  if (error.response.status === 400) {
    const responseData = error.response.data as LuluValidationErrorResponse;

    // Check if we have shipping address errors
    if (responseData?.shipping_address?.detail?.errors) {
      const errors = responseData.shipping_address.detail.errors;

      // Find the first validation error
      const validationError = errors.find(
        (e) => e.type === "validation_error" || !e.type
      );

      if (validationError) {
        // Create a validation result with clear error information
        return {
          isValid: false,
          hasWarnings: true,
          warnings: {
            type: validationError.type || "validation_error",
            path: validationError.path,
            code: validationError.code,
            message: formatAddressErrorMessage(
              validationError.message,
              validationError.path,
              validationError.code
            ),
          },
          suggestedAddress: responseData.shipping_address.suggested_address,
        };
      }

      // If no validation errors, check for warnings
      const warning = errors.find((e) => e.type === "validation_warning");
      if (warning) {
        return {
          isValid: false,
          hasWarnings: true,
          warnings: {
            type: warning.type,
            path: warning.path,
            code: warning.code,
            message: formatAddressErrorMessage(
              warning.message,
              warning.path,
              warning.code
            ),
          },
          suggestedAddress: responseData.shipping_address.suggested_address,
        };
      }
    }
  }

  return null;
}

/**
 * Format address error messages into user-friendly format
 */
export function formatAddressErrorMessage(
  message: string,
  path: string,
  code: string
): string {
  // Handle state validation errors for US addresses
  if (
    path === "state" &&
    code === "INVALID" &&
    message.includes("Valid choices are")
  ) {
    return "The state code you entered is invalid. Please use a standard two-letter state code (like NY for New York).";
  }
  if (code === "INCOMPLETE" && message.includes("not detailed enough")) {
    return "Your address is not detailed enough. Please add specific building information such as an apartment number, suite, or unit if applicable.";
  }

  // Handle postal code validation errors
  if (path === "postal_code" && code === "INVALID") {
    return "The postal/zip code you entered is not valid for the selected country. Please check and correct it.";
  }

  // Handle country code validation errors
  if (path === "country_code" && code === "INVALID") {
    return "The country code you entered is not supported. Please select a different country.";
  }

  // Handle missing required fields
  if (code === "REQUIRED") {
    const fieldMap: Record<string, string> = {
      name: "Full name",
      street1: "Street address",
      city: "City",
      state_code: "State/Province",
      country_code: "Country",
      postcode: "Postal/ZIP code",
      phone_number: "Phone number",
    };

    const fieldName = fieldMap[path] || path;
    return `${fieldName} is required. Please provide this information.`;
  }

  // For general validation errors, try to parse any list of valid options
  const validChoicesMatch = message.match(/Valid choices are \[(.*?)\]/);
  if (validChoicesMatch) {
    // If the list is too long, don't include all options
    const choicesList = validChoicesMatch[1];
    if (choicesList.split(",").length > 10) {
      return `The ${path} you entered is invalid. Please use a valid value.`;
    } else {
      return `The ${path} you entered is invalid. Valid options are: ${choicesList
        .replace(/'/g, "")
        .replace(/,/g, ", ")}.`;
    }
  }

  // Use existing formatter for warning messages
  return formatAddressWarningMessage(message);
}

/**
 * Converts technical address validation warnings into user-friendly messages
 */
export function formatAddressWarningMessage(warningMessage: string): string {
  // Extract components from the warning message
  const postalCodeMatch = warningMessage.match(/postal_code = (\d+)/);
  const cityMatch = warningMessage.match(/city = ([^,]+)/);
  const stateMatch = warningMessage.match(/state = ([^,]+)/);
  const streetMatch = warningMessage.match(/street = ([^,]+)/);

  // Handle state validation errors for US addresses
  if (
    warningMessage.includes("state") &&
    warningMessage.includes("Valid choices are")
  ) {
    return "The state code you entered is invalid. Please use a standard two-letter state code (like NY for New York).";
  }

  // Handle specific types of warnings
  if (warningMessage.includes("unconfirmed component") && postalCodeMatch) {
    return `The postal code "${postalCodeMatch[1]}" couldn't be fully confirmed. Please verify it matches your address.`;
  }

  if (warningMessage.includes("unconfirmed component") && cityMatch) {
    return `The city "${cityMatch[1]}" couldn't be fully confirmed. Please verify it's spelled correctly.`;
  }

  if (warningMessage.includes("unconfirmed component") && stateMatch) {
    return `The state "${stateMatch[1]}" couldn't be fully confirmed. Please verify the state/province code is correct.`;
  }

  if (warningMessage.includes("unconfirmed component") && streetMatch) {
    return `The street address "${streetMatch[1]}" couldn't be fully confirmed. Please check that it's entered correctly.`;
  }

  if (warningMessage.includes("ADDRESS_NOT_FOUND")) {
    return "We couldn't find this address. Please check that all parts of your address are entered correctly.";
  }

  if (warningMessage.includes("UNDELIVERABLE")) {
    return "This address may not be deliverable. Please verify your address or consider using a different shipping address.";
  }

  if (warningMessage.includes("MULTIPLE_MATCHES")) {
    return "This address matches multiple locations. Please add more details to make it more specific.";
  }

  // Handle INVALID code for various fields
  if (warningMessage.includes("INVALID")) {
    if (warningMessage.includes("postal_code")) {
      return "The postal/zip code you entered is not valid. Please check and correct it.";
    }
    if (warningMessage.includes("country_code")) {
      return "The country code you entered is not supported. Please select a different country.";
    }
    if (warningMessage.includes("state_code")) {
      return "The state/province code you entered is not valid. Please use the correct code for your region.";
    }
    if (warningMessage.includes("phone_number")) {
      return "The phone number format is invalid. Please enter a valid phone number with country code.";
    }
  }

  // If no specific pattern is matched, provide a general user-friendly message
  return "There may be an issue with your address. Please review it carefully to ensure everything is correct.";
}

/**
 * Extract error message from an unknown error
 */
export function extractErrorMessage(error: unknown): string {
  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === "string") {
    return error;
  }

  return "An unknown error occurred";
}

/**
 * Gets a user-friendly error message for Lulu API errors
 */
export function getLuluErrorMessage(error: unknown): string {
  if (!axios.isAxiosError(error)) {
    return extractErrorMessage(error);
  }

  const status = error.response?.status;

  switch (status) {
    case 400:
      // Try to get validation error details
      const addressResult = handleShippingAddressValidationError(error);
      if (addressResult?.warnings?.message) {
        return addressResult.warnings.message;
      }
      return "Invalid request parameters. Please check your information and try again.";

    case 401:
      return "Authentication error with printing service. Please try again later.";

    case 403:
      return "Not authorized to perform this operation with the printing service.";

    case 404:
      return "The requested resource was not found on the printing service.";

    case 500:
    case 502:
    case 503:
    case 504:
      return "The printing service is currently experiencing issues. Please try again later.";

    default:
      return `Printing service error: ${extractErrorMessage(error)}`;
  }
}

/**
 * Checks if an error is specifically about shipping options being unavailable
 */
export function isShippingOptionUnavailableError(error: unknown): boolean {
  if (!axios.isAxiosError(error) || !error.response?.data) {
    return false;
  }

  // Check if it's a 400 error with an array response
  if (error.response.status === 400 && Array.isArray(error.response.data)) {
    const errorMessages = error.response.data;

    // Check if any error message mentions shipping option not found
    return errorMessages.some(
      (msg) =>
        typeof msg === "string" && msg.includes("No shipping option found")
    );
  }

  return false;
}

// Add these functions to the end of your existing errorUtils.ts file:

/**
 * Convert technical error messages to user-friendly ones for book creation
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  const errorMessage =
    typeof error === "string"
      ? error
      : error instanceof Error
      ? error.message
      : String(error);

  // Common API error patterns
  const errorPatterns = [
    {
      pattern: /400|bad request/i,
      message:
        "There was a problem with your request. Please check your information and try again.",
    },
    {
      pattern: /401|unauthorized/i,
      message: "Please sign in to continue creating your book.",
    },
    {
      pattern: /403|forbidden/i,
      message:
        "You don't have permission to perform this action. Please try signing in again.",
    },
    {
      pattern: /404|not found/i,
      message:
        "The book template you're trying to use couldn't be found. Please try selecting a different template.",
    },
    {
      pattern: /413|payload too large|file too large/i,
      message:
        "Your photo is too large. Please choose a smaller image (under 10MB) and try again.",
    },
    {
      pattern: /429|too many requests|rate limit/i,
      message:
        "You're creating books too quickly. Please wait a moment and try again.",
    },
    {
      pattern: /500|internal server error|server error/i,
      message:
        "We're experiencing technical difficulties. Please try again in a few minutes.",
    },
    {
      pattern: /502|503|504|gateway|service unavailable/i,
      message:
        "Our service is temporarily unavailable. Please try again in a few minutes.",
    },
    {
      pattern: /network error|connection error|fetch failed/i,
      message:
        "There's a connection problem. Please check your internet and try again.",
    },
    {
      pattern: /timeout|timed out/i,
      message:
        "The request took too long. Please try again with a smaller photo or better internet connection.",
    },

    // Specific book creation errors
    {
      pattern: /failed to upload character image/i,
      message:
        "We couldn't upload your photo. Please make sure it's a valid image file (JPG, PNG, WebP) and try again.",
    },
    {
      pattern: /failed to create book/i,
      message:
        "We couldn't create your book right now. Please try again in a moment.",
    },
    {
      pattern: /failed to generate.*image/i,
      message:
        "We're having trouble creating the illustrations for your book. Don't worry - you can try again or contact support.",
    },
    {
      pattern: /content moderated|content flagged/i,
      message:
        "Your photo couldn't be processed due to our safety guidelines. Please try a different photo.",
    },
    {
      pattern: /invalid file type|unsupported format/i,
      message: "Please upload a valid photo file (JPG, PNG, or WebP format).",
    },
    {
      pattern: /book limit|maximum books/i,
      message:
        "You've reached your book creation limit. Please complete an order for your existing books to create more.",
    },
    {
      pattern: /template.*not found/i,
      message:
        "This book template is no longer available. Please choose a different template from our library.",
    },
    {
      pattern: /leonardo.*api|image generation.*failed/i,
      message:
        "We're having trouble creating the artwork for your book. Please try again in a few minutes.",
    },
    {
      pattern: /prisma|database/i,
      message:
        "We're experiencing database issues. Please try again in a moment.",
    },

    // Character/form validation errors
    {
      pattern: /name.*required|invalid name/i,
      message: "Please enter a valid name for your character.",
    },
    {
      pattern: /age.*required|invalid age/i,
      message: "Please select a valid age for your character.",
    },
    {
      pattern: /image.*required/i,
      message: "Please upload a photo of your character to continue.",
    },
    {
      pattern: /email.*invalid/i,
      message: "Please enter a valid email address.",
    },
  ];

  // Check each pattern
  for (const { pattern, message } of errorPatterns) {
    if (pattern.test(errorMessage)) {
      return message;
    }
  }

  // Default user-friendly message for unknown errors
  return "Something went wrong. Please try again, and if the problem continues, contact our support team.";
}

/**
 * Get user-friendly error with suggestions based on creation stage
 */
export function getStageSpecificError(
  error: unknown,
  stage: string | null
): string {
  const baseMessage = getUserFriendlyErrorMessage(error);

  const stageSuggestions = {
    uploading: "Try using a smaller photo or check your internet connection.",
    creating: "Please wait a moment and try creating your book again.",
    generating:
      "The artwork generation is having issues. Your book was created successfully - you can try generating images again from the preview page.",
  };

  const suggestion = stage
    ? stageSuggestions[stage as keyof typeof stageSuggestions]
    : null;

  return suggestion ? `${baseMessage} ${suggestion}` : baseMessage;
}
