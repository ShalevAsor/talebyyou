import { Leonardo } from "@leonardo-ai/sdk";

// Leonardo AI client singleton
let leonardoClient: Leonardo | null = null;

export function getLeonardoClient(): Leonardo {
  if (!leonardoClient) {
    const apiKey = process.env.LEONARDO_API_KEY;

    if (!apiKey) {
      throw new Error(
        "LEONARDO_API_KEY is not defined in environment variables"
      );
    }

    leonardoClient = new Leonardo({
      bearerAuth: apiKey,
    });
  }

  return leonardoClient;
}
