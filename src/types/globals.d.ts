export {};

// Create a type for the roles
export type Roles = "store_admin" | "Member";

// Meta Pixel fbq function types
interface MetaPixelParameters {
  content_type?: string;
  content_ids?: string[];
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  num_items?: number;
  transaction_id?: string;
}

type MetaPixelFunction = {
  (
    command: "track",
    eventName: "ViewContent" | "InitiateCheckout" | "Purchase" | "Lead",
    parameters?: MetaPixelParameters
  ): void;
  (
    command: "trackCustom",
    eventName: string,
    parameters?: MetaPixelParameters
  ): void;
  (command: "init", pixelId: string): void;
};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }

  // Add Meta Pixel fbq to window
  interface Window {
    fbq?: MetaPixelFunction;
  }
}
