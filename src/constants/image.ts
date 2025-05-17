export const STYLE_IMAGE_REFERENCE_URL = "/images/style/styleImageAnime.jpg";
// export const STYLE_IMAGE_REFERENCE_ID = "a67f7c0a-6691-45da-8277-7c901129cb2b";
export const DEFAULT_MODEL_ID = "2067ae52-33fd-4a82-bb92-c2c55e7d2786";
export const NUM_IMAGES = 3;
export const IMAGE_STYLE_PROMPT =
  "cartoon style, cel animation, vibrant pastel colors";

export const STYLE_IMAGE_REFERENCE_ID = "ec96b5c5-6af5-4a1c-84bb-59fc79dec597";

/**
 * Calculates the actual cost of API credits used for a specific book
 * @param apiCreditsUsed The number of API credits used for this specific book
 * @param plan The pricing plan you're on (BASIC or ADVANCED)
 * @returns The cost in dollars
 */
export function calculateApiCreditCost(
  apiCreditsUsed: number,
  plan: "BASIC" | "ADVANCED"
): number {
  const rates = {
    BASIC: 0.00257, // $9 ÷ 3,500 = $0.00257 per credit
    ADVANCED: 0.00196, // $49 ÷ 25,000 = $0.00196 per credit
  };

  // Simply multiply credits used by the per-credit rate
  return apiCreditsUsed * rates[plan];
}

export const LEONARDO_TIER = "BASIC";
