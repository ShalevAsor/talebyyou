// src/schemas/template-schema.ts
import { z } from "zod";

// Schema for individual template pages
export const templatePageSchema = z.object({
  pageNumber: z.number().min(1),
  content: z.string().min(5, "Content must be at least 5 characters"),
  imagePrompt: z
    .string()
    .min(10, "Image prompt must be at least 10 characters"),
  imageUrl: z.string(),
  pageOutfit: z.string().nullable().optional(),
});

// Main template schema for creation/editing
export const templateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pageCount: z.number().min(1, "Book must have at least 1 page"),
  coverPrompt: z
    .string()
    .min(10, "Cover prompt must be at least 10 characters"),
  coverImage: z.string(),
  published: z.boolean(),
  minAge: z.number().min(0),
  maxAge: z.number().min(0),
  characterGender: z.enum(["boy", "girl"], {
    required_error: "Please select a character gender",
    invalid_type_error: "Character gender must be either 'boy' or 'girl'",
  }),
  consistentOutfit: z.string().optional().nullable(),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  pages: z.array(templatePageSchema).min(1, "Add at least one page"),
});

// Export the inferred types
export type TemplatePageFormData = z.infer<typeof templatePageSchema>;
export type TemplateFormData = z.infer<typeof templateSchema>;
