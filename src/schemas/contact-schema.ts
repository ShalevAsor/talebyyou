import { z } from "zod";

// Define the possible contact categories
export const contactCategoryEnum = z.enum(
  [
    "general_inquiry",
    "order_question",
    "technical_issue",
    "book_creation_help",
    "billing_question",
    "feature_request",
    "partnership",
    "other",
  ],
  {
    // This adds a custom error message for invalid enum values
    errorMap: (issue, ctx) => {
      if (issue.code === "invalid_enum_value") {
        return { message: "Please select a category for your inquiry" };
      }
      return { message: ctx.defaultError };
    },
  }
);

// Export type for use in TypeScript
export type ContactCategory = z.infer<typeof contactCategoryEnum>;

// Map enum values to human-readable labels
export const contactCategoryLabels: Record<ContactCategory, string> = {
  general_inquiry: "General",
  order_question: "Order Question",
  technical_issue: "Technical Issue",
  book_creation_help: "Book Creation Help",
  billing_question: "Billing Question",
  feature_request: "Feature Request",
  partnership: "Partnership",
  other: "Other",
};

// Schema for contact form
export const contactFormSchema = z.object({
  // Personal information
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long" })
    .max(100, { message: "Name cannot exceed 100 characters" }),

  email: z
    .string()
    .email({ message: "Please enter a valid email address" })
    .max(100, { message: "Email cannot exceed 100 characters" }),

  // Contact details - ensure this is not optional
  category: contactCategoryEnum,

  // Optional order number
  orderNumber: z
    .string()
    .max(50, { message: "Order number cannot exceed 50 characters" })
    .optional(),

  // Main message content
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters long" })
    .max(100, { message: "Subject cannot exceed 100 characters" }),

  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters long" })
    .max(3000, { message: "Message cannot exceed 3000 characters" }),
});

// Export the type for the form data
export type ContactFormData = z.infer<typeof contactFormSchema>;

// Create a conditional schema that changes requirements based on category
export const getContactFormSchema = (category?: string) => {
  const schema = contactFormSchema;

  if (category === "order_question") {
    // Make order number required for order questions
    return schema.refine(
      (data) => {
        if (data.category === "order_question") {
          return !!data.orderNumber;
        }
        return true;
      },
      {
        message: "Order number is required for order-related inquiries",
        path: ["orderNumber"],
      }
    );
  }

  return schema;
};
