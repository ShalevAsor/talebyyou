/**
 * Implementation of image generation service using Leonardo AI
 * Image generation using  reference approach
 * Character reference
 */

import {
  InitImageType,
  StrengthType,
} from "@leonardo-ai/sdk/sdk/models/shared";

import { DEFAULT_MODEL_ID, NUM_IMAGES } from "@/constants/image";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import { logger } from "@/lib/logger";
import {
  ImageGenerationResult,
  ImageMetadata,
  ImageUploadResult,
} from "@/types/image";

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
    extension: string = "png",
    filename: string = "image.png"
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

      // Add key field first (this was different in your test route)
      if (fields.key) {
        formData.append("key", fields.key);
      }

      // Add the rest of the fields in a specific order
      const fieldOrder = [
        "Content-Type",
        "bucket",
        "Policy",
        "X-Amz-Algorithm",
        "X-Amz-Credential",
        "X-Amz-Date",
        "X-Amz-Security-Token",
        "X-Amz-Signature",
      ];

      // Add fields in the specified order
      fieldOrder.forEach((fieldName) => {
        if (fields[fieldName]) {
          formData.append(fieldName, fields[fieldName]);
        }
      });

      // Add any remaining fields not in our order list
      Object.entries(fields).forEach(([key, value]) => {
        if (key !== "key" && !fieldOrder.includes(key)) {
          formData.append(key, value as string);
        }
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
      console.log("Image id in production flow is:");
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
    imageData: File,
    metadata?: ImageMetadata
  ): Promise<ImageUploadResult> {
    try {
      // Determine extension from mime type or metadata
      const extension = "png";

      const filename = metadata?.filename
        ? metadata.filename.includes(".")
          ? metadata.filename
          : `${metadata.filename}.png`
        : `character.png`;

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
    characterImageId: string
  ): Promise<ImageGenerationResult> {
    try {
      console.log("generate image with the prompt:", prompt);

      // Set up generation parameters
      const width = 768;
      const height = 1024;
      const modelId = DEFAULT_MODEL_ID;
      const numImages = NUM_IMAGES;
      const controlnets = [
        {
          initImageId: characterImageId,
          initImageType: InitImageType.Uploaded,
          preprocessorId: 133, // Character Reference preprocessor ID
          strengthType: StrengthType.Mid,
        },
      ];

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
        controlnets,
      });
      console.log("image generation result:", result);

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
