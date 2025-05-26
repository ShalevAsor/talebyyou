import {
  Book,
  ImageGeneration,
  ImageType,
  GenerationStatus,
} from "@prisma/client";

/**
 * Optional parameters for image generation
 */
export interface GenerationOptions {
  characterImageId: string;
  characterStrength?: "Low" | "Mid" | "High";
  numImages?: number;
  width?: number;
  height?: number;
  imageType?: ImageType;
}

/**
 * Metadata for uploaded images
 */
export interface ImageMetadata {
  filename?: string;
  contentType?: string;
  purpose?: "character-reference" | "style-reference" | "custom";
}

/**
 * Result of image generation request
 */
export interface ImageGenerationResult {
  success: boolean;
  generationId?: string;
  error?: string;
  estimatedTime?: number;
  apiCreditCost?: number;
}

/**
 * Result of image upload
 */
export interface ImageUploadResult {
  success: boolean;
  imageId?: string;
  error?: string;
}

// Use Prisma's type for ImageGeneration with relations
export type ImageGenerationFull = ImageGeneration & {
  book: Book;
};

/**
 * Image option for UI selection (not stored in DB)
 */
export interface ImageOption {
  imageUrl: string;
  index: number; // Position in the imageUrls array
}

/**
 * Page generation status and options
 */
export interface PageGenerationInfo {
  generationId: string;
  status: GenerationStatus;
  pageId?: string | null;
}
export interface CoverGenerationInfo {
  coverGenerationId: string;
  coverStatus: GenerationStatus;
}

/**
 * Book image generations status
 */
export interface BookImageGenerationsStatus {
  coverGeneration?: CoverGenerationInfo;
  pageGenerations?: PageGenerationInfo[];
}

// Re-export enums for convenience
export { ImageType, GenerationStatus };
