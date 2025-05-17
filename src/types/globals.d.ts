export {};

// Create a type for the roles
export type Roles = "store_admin" | "Member";

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      role?: Roles;
    };
  }
}
