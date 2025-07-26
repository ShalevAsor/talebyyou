export const DEFAULT_MODEL_ID = "2067ae52-33fd-4a82-bb92-c2c55e7d2786";
export const NUM_IMAGES = 3;

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
