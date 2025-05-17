// src/schemas/template-schema.ts
import { z } from "zod";
import { BookTemplatePageCreateData } from "@/types/book";

// Schema for template page content
export const templatePageSchema = z.object({
  pageNumber: z.number().min(1),
  content: z.string().min(5, "Content must be at least 5 characters"),
  imagePrompt: z
    .string()
    .min(10, "Image prompt must be at least 10 characters"),
  imageUrl: z.string().optional(),
});

// Main template schema
export const templateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pageCount: z.number().min(1, "Book must have at least 1 page"),
  coverPrompt: z
    .string()
    .min(10, "Cover prompt must be at least 10 characters"),
  coverImage: z.string(),
  published: z.boolean().default(false),
  minAge: z.number().min(0).default(0),
  maxAge: z.number().min(0).default(8),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  pages: z.array(templatePageSchema).min(1, "Add at least one page"),
});

export type TemplateFormValues = z.infer<typeof templateSchema>;
export type TemplatePageFormValues = z.infer<typeof templatePageSchema>;

// For creating a new page in the UI
export const defaultPage: BookTemplatePageCreateData = {
  pageNumber: 1,
  content: "",
  imagePrompt: "",
  imageUrl: "/images/style/styleImageCartoon.jpg",
};
