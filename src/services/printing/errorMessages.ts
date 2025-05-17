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
