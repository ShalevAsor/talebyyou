import { z } from "zod";

import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/formConstants";

// Define character customization options
export const eyeColorOptions = [
  "blue",
  "brown",
  "green",
  "hazel",
  "black",
  "gray",
] as const;

export const hairColorOptions = [
  "blonde",
  "brown",
  "black",
  "red",
  "auburn",
  "white",
] as const;

export const hairStyleOptions = [
  "short",
  "medium",
  "long",
  "curly",
  "straight",
  "wavy",
  "braided",
  "ponytail",
] as const;

export const skinToneOptions = ["light", "medium", "tan", "dark"] as const;

// Create the unified character schema that includes both basic info and appearance
export const characterSchema = z.object({
  // Basic child info
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(25, "Name cannot exceed 25 characters"),
  age: z
    .number()
    .int()
    .min(0, "Age must be a positive number")
    .max(120, "Age cannot exceed 120"),
  gender: z.enum(["boy", "girl"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),

  // We'll handle the image separately in the component
  childPhoto: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
      message: `Image size should be less than 5MB`,
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
      message: `Only .jpg, .jpeg, .png and .webp files are accepted`,
    })
    .optional(),

  // Character appearance - all optional
  eyeColor: z.enum(eyeColorOptions).optional(),
  hairColor: z.enum(hairColorOptions).optional(),
  hairStyle: z.enum(hairStyleOptions).optional(),
  skinTone: z.enum(skinToneOptions).optional(),
  wearingGlasses: z.boolean().optional(),
});

// Create a schema for submission that includes the cropped image
export const characterSubmissionSchema = characterSchema
  .omit({ childPhoto: true })
  .extend({
    croppedImage: z.instanceof(Blob, {
      message: "Please upload a photo of your child",
    }),
  });

export type CharacterData = z.infer<typeof characterSchema>;
export type CharacterSubmissionData = z.infer<typeof characterSubmissionSchema>;
