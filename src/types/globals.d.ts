export {};

// Create a type for the roles
export type Roles = "store_admin" | "Member";

// Pinterest tracking function type
type PinterestTrack = (
  action: "track",
  event: "pagevisit" | "checkout",
  data: {
    event_id: string;
    property?: string;
    value?: number;
    order_quantity?: number;
    currency?: string;
  }
) => void;

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }

  // Add Pinterest to window
  interface Window {
    pintrk?: PinterestTrack;
  }
}
