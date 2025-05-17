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
