/**
 * Implementation of image generation service using Leonardo AI
 * Image generation using dual reference approach
 * Character reference + style reference
 */

import {
  DEFAULT_MODEL_ID,
  STYLE_IMAGE_REFERENCE_ID,
  STYLE_IMAGE_REFERENCE_URL,
} from "@/constants/image";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import { logger } from "@/lib/logger";
import {
  GenerationOptions,
  ImageGenerationResult,
  ImageMetadata,
  ImageUploadResult,
} from "@/types/image";
import {
  InitImageType,
  StrengthType,
} from "@leonardo-ai/sdk/sdk/models/shared";

export const leonardoImageService = {
  /**
   * Uploads an image to Leonardo AI
   * @param image URL, path to the image, or image data as Blob
   * @param extension Image extension (jpg, png, etc.)
   * @param filename Optional filename to use
   * @returns Promise resolving to the uploaded image ID
   */
  async uploadImage(
    image: string | Blob,
    extension: string = "jpg",
    filename: string = "image.jpg"
  ): Promise<string> {
    try {
      logger.debug(
        {
          imageType: typeof image === "string" ? "url" : "blob",
          extension,
          filename,
        },
        "Starting image upload to Leonardo"
      );
      // Get Leonardo client (singleton)
      const leonardoClient = getLeonardoClient();

      // Get a presigned URL for upload
      const uploadResponse = await leonardoClient.initImages.uploadInitImage({
        extension,
      });

      if (!uploadResponse.object?.uploadInitImage) {
        throw new Error("Failed to get presigned URL for image upload");
      }

      const { uploadInitImage: uploadData } = uploadResponse.object;

      if (!uploadData.id || !uploadData.url || !uploadData.fields) {
        throw new Error("Missing required fields in upload response");
      }
      // Get image as Blob
      let imageBlob: Blob;

      if (typeof image === "string") {
        // It's a URL or path - fetch it
        const fullImageUrl = image.startsWith("http")
          ? image
          : `${process.env.NEXT_PUBLIC_APP_URL}${
              image.startsWith("/") ? "" : "/"
            }${image}`;

        const imageResponse = await fetch(fullImageUrl);
        if (!imageResponse.ok) {
          throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
        }
        imageBlob = await imageResponse.blob();
      } else {
        // It's already a Blob
        imageBlob = image;
      }
      // Prepare form data with ordered fields
      const formData = new FormData();
      const fields =
        typeof uploadData.fields === "string"
          ? JSON.parse(uploadData.fields)
          : uploadData.fields;

      // Add all form fields
      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value as string);
      });
      // Add the file last
      formData.append("file", imageBlob, filename);

      // Send the upload request
      const uploadResult = await fetch(uploadData.url, {
        method: "POST",
        body: formData,
      });

      if (!uploadResult.ok) {
        throw new Error(`Failed to upload image: ${uploadResult.statusText}`);
      }

      // Extract the image ID from response
      const imageId = fields.key.split("/").pop().split(".")[0];

      logger.info(
        { imageId, filename },
        "Image uploaded successfully to Leonardo"
      );
      return imageId;
    } catch (error) {
      logger.error(
        { error, imageType: typeof image },
        "Failed to upload image to Leonardo"
      );
      throw error;
    }
  },
  /**
   * Uploads a character image to be used as a reference
   * @param imageData The image data to upload
   * @param metadata Optional metadata about the image
   * @returns Promise resolving to the upload result
   */
  async uploadCharacterImage(
    imageData: Blob,
    metadata?: ImageMetadata
  ): Promise<ImageUploadResult> {
    try {
      // Determine extension from mime type or metadata
      const mimeTypeExtension =
        imageData.type === "image/jpeg"
          ? "jpg"
          : imageData.type === "image/png"
          ? "png"
          : "jpg"; // Default to jpg

      const extension = metadata?.filename?.includes(".")
        ? metadata.filename.split(".").pop() || mimeTypeExtension
        : mimeTypeExtension;

      const filename = metadata?.filename || `character.${extension}`;

      // Use uploadImage method
      const imageId = await this.uploadImage(imageData, extension, filename);

      logger.info(
        { imageId },
        "Character image successfully uploaded to Leonardo AI"
      );

      return {
        success: true,
        imageId: imageId,
      };
    } catch (error) {
      logger.error({ error }, "Error uploading character image");
      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
  /**
   * Gets the style reference image ID to use
   * @param customStyleId Optional custom style reference ID to use
   * @returns Promise resolving to the style reference image ID
   */
  async getStyleReferenceId(customStyleId?: string): Promise<string> {
    try {
      // First try the constant ID - just use it directly without verifying
      if (STYLE_IMAGE_REFERENCE_ID) {
        logger.info(
          { styleRefId: STYLE_IMAGE_REFERENCE_ID },
          "Using predefined style reference ID without verification"
        );
        return STYLE_IMAGE_REFERENCE_ID;
      }

      // Then try custom style ID if provided - without verification
      if (customStyleId) {
        logger.info(
          { styleRefId: customStyleId },
          "Using custom style reference ID without verification"
        );
        return customStyleId;
      }

      // Only reach here if no IDs are available
      logger.warn(
        "No style reference ID available, will try to upload new image"
      );

      // Use a fully qualified URL for uploading
      const styleRefUrl =
        STYLE_IMAGE_REFERENCE_URL && process.env.NEXT_PUBLIC_APP_URL
          ? `${process.env.NEXT_PUBLIC_APP_URL}${
              STYLE_IMAGE_REFERENCE_URL.startsWith("/") ? "" : "/"
            }${STYLE_IMAGE_REFERENCE_URL}`
          : `${process.env.NEXT_PUBLIC_APP_URL}/images/style/styleImageAnime.jpg`;

      logger.info({ styleRefUrl }, "Uploading new style reference image");

      // Upload the style reference image
      const timestamp = Date.now();
      const newStyleId = await this.uploadImage(
        styleRefUrl,
        "jpg",
        `style-reference-${timestamp}.jpg`
      );

      logger.info({ newStyleId }, "New style reference image uploaded");

      // Add a delay to ensure the image is processed by Leonardo
      logger.info("Waiting for image to be processed...");
      await new Promise((resolve) => setTimeout(resolve, 3000));

      return newStyleId;
    } catch (error) {
      logger.error({ error }, "Failed to get style reference image");
      throw new Error(
        `Style reference initialization failed: ${
          error instanceof Error ? error.message : String(error)
        }`
      );
    }
  },
  /**
   * Deletes an image from Leonardo AI
   * @param imageId The image ID to delete
   * @returns Promise resolving to a boolean indicating success
   */
  async deleteImage(imageId: string): Promise<boolean> {
    try {
      logger.debug({ imageId }, "Starting image deletion from Leonardo");

      // Get Leonardo client (singleton)
      const leonardoClient = getLeonardoClient();

      // Delete the image
      const result = await leonardoClient.initImages.deleteInitImageById(
        imageId
      );
      logger.debug({ result }, "Image deletion result from Leonardo");
      logger.debug({ imageId }, "Image successfully deleted from Leonardo AI");
      return true;
    } catch (error) {
      logger.error({ error, imageId }, "Failed to delete image from Leonardo");
      return false;
    }
  },
  /**
   * Generates an image using character and style references
   * @param prompt The text prompt for image generation
   * @param options Generation options including character reference, size, etc.
   * @returns Promise resolving to generation result
   */
  async generateImage(
    prompt: string,
    options: GenerationOptions = {}
  ): Promise<ImageGenerationResult> {
    try {
      console.log("generate image with the prompt:", prompt);

      // Set up generation parameters
      const width = options.width || 768;
      const height = options.height || 1024;
      const modelId = options.modelId || DEFAULT_MODEL_ID;
      const numImages = options.numImages || 3;

      // Default strength types
      const characterStrength =
        options.characterStrength === "Low"
          ? StrengthType.Low
          : options.characterStrength === "Mid"
          ? StrengthType.Mid
          : StrengthType.High; // Default to High

      // const styleStrength =
      //   options.styleStrength === "Low"
      //     ? StrengthType.Low
      //     : options.styleStrength === "Mid"
      //     ? StrengthType.Mid
      //     : StrengthType.High; // Default to High

      // Set up the controlnets array based on available references
      const controlnets = [];

      // Add character reference if provided
      if (options.characterImageId) {
        controlnets.push({
          initImageId: options.characterImageId,
          initImageType: InitImageType.Uploaded,
          preprocessorId: 133, // Character Reference preprocessor ID
          strengthType: characterStrength,
        });
      }

      const leonardoClient = getLeonardoClient();

      // Start the generation
      const result = await leonardoClient.image.createGeneration({
        height,
        width,
        modelId,
        prompt,
        numImages,
        public: false,
        alchemy: true, // Enable Alchemy for better quality
        seed: options.seed,
        controlnets,
      });

      // Extract generation ID
      const generationId = result.object?.sdGenerationJob?.generationId;
      // Extract API credit cost
      const apiCreditCost = result.object?.sdGenerationJob?.apiCreditCost;
      if (!generationId) {
        return {
          success: false,
          error: "Failed to get generation ID from Leonardo API",
        };
      }

      logger.info(
        {
          generationId,
        },
        "Image generation started successfully"
      );

      return {
        success: true,
        generationId,
        estimatedTime: 20, // Approximate time in seconds
        apiCreditCost: apiCreditCost || 0,
      };
    } catch (error) {
      logger.error(
        {
          error,
          prompt: prompt.substring(0, 100) + (prompt.length > 100 ? "..." : ""),
        },
        "Error generating image"
      );

      return {
        success: false,
        error:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  },
};
