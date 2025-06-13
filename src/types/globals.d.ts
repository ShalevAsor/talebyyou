export {};

// Create a type for the roles
export type Roles = "store_admin" | "Member";

// Google Ads gtag function type
type GtagFunction = (
  command: "event",
  action: string,
  parameters: {
    send_to: string;
    value?: number;
    currency?: string;
    transaction_id?: string;
  }
) => void;

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }

  // Add Google Ads gtag to window
  interface Window {
    gtag?: GtagFunction;
  }
}
