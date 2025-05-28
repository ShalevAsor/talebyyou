// import { z } from "zod";
// import { ProductType, ShippingLevel } from "@prisma/client";

// // Add phone number validation regex
// const PHONE_REGEX = /^\+?[0-9]{10,15}$/; // Basic international phone format

// // Schema for shipping address aligned with Lulu requirements
// export const shippingAddressSchema = z.object({
//   name: z.string().min(1, "Full name is required"),
//   street1: z.string().min(1, "Address is required"),
//   street2: z.string().optional(),
//   city: z.string().min(1, "City is required"),
//   state_code: z.string().optional(),
//   postcode: z.string().min(1, "Postal code is required"),
//   country: z.string().min(1, "Country code is required"),
//   phone_number: z
//     .string()
//     .min(10, "Phone number must be at least 10 digits")
//     .regex(PHONE_REGEX, "Please enter a valid phone number")
//     .refine((val) => val.length <= 15, "Phone number is too long"),
// });

// // Schema for physical book orders with shipping address
// export const physicalOrderSchema = z.object({
//   productType: z.literal(ProductType.BOOK),
//   customerEmail: z.string().email("Please enter a valid email address"),
//   shippingAddress: shippingAddressSchema,
// });

// // Schema for shipping selection (used after address is collected)
// export const shippingSelectionSchema = z.object({
//   shippingLevel: z.nativeEnum(ShippingLevel, {
//     errorMap: () => ({ message: "Please select a shipping option" }),
//   }),
//   shippingCost: z.string(),
//   printingCost: z.string(),
//   totalCost: z.string(),
// });

// // Schema for digital book orders (no shipping address)
// export const digitalOrderSchema = z.object({
//   productType: z.literal(ProductType.EBOOK),
//   customerEmail: z.string().email("Please enter a valid email address"),
// });

// // Export types
// export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;
// export type PhysicalOrderFormData = z.infer<typeof physicalOrderSchema>;
// export type ShippingSelectionData = z.infer<typeof shippingSelectionSchema>;
// export type DigitalOrderFormData = z.infer<typeof digitalOrderSchema>;

// // Combined type for use in components that handle both types
// export type CheckoutFormData = PhysicalOrderFormData | DigitalOrderFormData;

// // Form type when shipping is selected (for completed orders)
// export type CompletePhysicalOrderData = PhysicalOrderFormData &
//   ShippingSelectionData;
import { z } from "zod";
import { ProductType, ShippingLevel } from "@prisma/client";

// Flexible phone number validation - just check for minimum digits
const hasMinimumDigits = (phone: string) => {
  const digitsOnly = phone.replace(/\D/g, ""); // Remove all non-digits
  return digitsOnly.length >= 10; // At least 10 digits
};

// Schema for shipping address aligned with Lulu requirements
export const shippingAddressSchema = z.object({
  name: z.string().min(1, "Full name is required"),
  street1: z.string().min(1, "Address is required"),
  street2: z.string().optional(),
  city: z.string().min(1, "City is required"),
  state_code: z.string().optional(),
  postcode: z.string().min(1, "Postal code is required"),
  country: z.string().min(1, "Country code is required"),
  phone_number: z
    .string()
    .min(10, "Phone number must be at least 10 characters")
    .max(20, "Phone number is too long")
    .refine(hasMinimumDigits, "Phone number must contain at least 10 digits"),
});

// Schema for physical book orders with shipping address
export const physicalOrderSchema = z.object({
  productType: z.literal(ProductType.BOOK),
  customerEmail: z.string().email("Please enter a valid email address"),
  shippingAddress: shippingAddressSchema,
});

// Schema for shipping selection (used after address is collected)
export const shippingSelectionSchema = z.object({
  shippingLevel: z.nativeEnum(ShippingLevel, {
    errorMap: () => ({ message: "Please select a shipping option" }),
  }),
  shippingCost: z.string(),
  printingCost: z.string(),
  totalCost: z.string(),
});

// Schema for digital book orders (no shipping address)
export const digitalOrderSchema = z.object({
  productType: z.literal(ProductType.EBOOK),
  customerEmail: z.string().email("Please enter a valid email address"),
});

// Export types
export type ShippingAddressFormData = z.infer<typeof shippingAddressSchema>;
export type PhysicalOrderFormData = z.infer<typeof physicalOrderSchema>;
export type ShippingSelectionData = z.infer<typeof shippingSelectionSchema>;
export type DigitalOrderFormData = z.infer<typeof digitalOrderSchema>;

// Combined type for use in components that handle both types
export type CheckoutFormData = PhysicalOrderFormData | DigitalOrderFormData;

// Form type when shipping is selected (for completed orders)
export type CompletePhysicalOrderData = PhysicalOrderFormData &
  ShippingSelectionData;
