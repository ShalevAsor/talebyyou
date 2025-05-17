import { leonardoImageService } from "./image-generation-service";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import { GenerationOptions, ImageMetadata } from "@/types/image";
import {
  InitImageType,
  StrengthType,
} from "@leonardo-ai/sdk/sdk/models/shared";
import { DEFAULT_MODEL_ID } from "@/constants/image";

// Mock dependencies
jest.mock("@/lib/leonardo-ai", () => ({
  getLeonardoClient: jest.fn(),
}));

jest.mock("@/lib/logger", () => ({
  logger: {
    debug: jest.fn(),
    info: jest.fn(),
    error: jest.fn(),
    warn: jest.fn(),
  },
}));

jest.mock("@/constants/image", () => ({
  DEFAULT_MODEL_ID: "fantasy-model-id",
  STYLE_IMAGE_REFERENCE_ID: "style-ref-123",
  STYLE_IMAGE_REFERENCE_URL: "/images/style/styleImageAnime.jpg",
}));

// Mock global fetch
global.fetch = jest.fn();

describe("Leonardo Image Service", () => {
  // Create a simplified mock client object
  const mockLeonardoClient = {
    initImages: {
      uploadInitImage: jest.fn(),
      deleteInitImageById: jest.fn(),
    },
    image: {
      createGeneration: jest.fn(),
    },
  };

  // Reset all mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
    // Setup the mock return value without type assertions
    (getLeonardoClient as jest.Mock).mockReturnValue(mockLeonardoClient);

    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      blob: jest.fn().mockResolvedValue(new Blob(["mocked image data"])),
      status: 200,
      statusText: "OK",
    });
  });

  describe("uploadImage", () => {
    test("should successfully upload an image URL", async () => {
      // Arrange
      const mockImageUrl = "https://example.com/image.jpg";
      const mockUploadResponse = {
        object: {
          uploadInitImage: {
            id: "upload-123",
            url: "https://upload.leonardo.ai/upload",
            fields: JSON.stringify({
              key: "uploads/image-123.jpg",
              policy: "policy-string",
              "x-amz-signature": "signature-string",
            }),
          },
        },
      };

      mockLeonardoClient.initImages.uploadInitImage.mockResolvedValue(
        mockUploadResponse
      );

      // Act
      const imageId = await leonardoImageService.uploadImage(
        mockImageUrl,
        "jpg",
        "test-image.jpg"
      );

      // Assert
      expect(
        mockLeonardoClient.initImages.uploadInitImage
      ).toHaveBeenCalledWith({
        extension: "jpg",
      });
      expect(global.fetch).toHaveBeenCalledTimes(2); // First to fetch the image, second to upload it
      expect(imageId).toBe("image-123");
    });

    test("should successfully upload a Blob image", async () => {
      // Arrange
      const mockImageBlob = new Blob(["image data"], { type: "image/jpeg" });
      const mockUploadResponse = {
        object: {
          uploadInitImage: {
            id: "upload-456",
            url: "https://upload.leonardo.ai/upload",
            fields: JSON.stringify({
              key: "uploads/image-456.jpg",
              policy: "policy-string",
              "x-amz-signature": "signature-string",
            }),
          },
        },
      };

      mockLeonardoClient.initImages.uploadInitImage.mockResolvedValue(
        mockUploadResponse
      );

      // Act
      const imageId = await leonardoImageService.uploadImage(
        mockImageBlob,
        "jpg",
        "blob-image.jpg"
      );

      // Assert
      expect(
        mockLeonardoClient.initImages.uploadInitImage
      ).toHaveBeenCalledWith({
        extension: "jpg",
      });
      expect(global.fetch).toHaveBeenCalledTimes(1); // Only for upload, not for fetching the image
      expect(imageId).toBe("image-456");
    });

    test("should handle errors from Leonardo API", async () => {
      // Arrange
      mockLeonardoClient.initImages.uploadInitImage.mockResolvedValue({
        object: null, // No upload data returned
      });

      // Act & Assert
      await expect(
        leonardoImageService.uploadImage("https://example.com/image.jpg")
      ).rejects.toThrow("Failed to get presigned URL for image upload");
    });

    test("should handle fetch errors", async () => {
      // Arrange
      const mockUploadResponse = {
        object: {
          uploadInitImage: {
            id: "upload-789",
            url: "https://upload.leonardo.ai/upload",
            fields: JSON.stringify({
              key: "uploads/image-789.jpg",
            }),
          },
        },
      };

      mockLeonardoClient.initImages.uploadInitImage.mockResolvedValue(
        mockUploadResponse
      );

      // Mock fetch failure for the image download
      (global.fetch as jest.Mock).mockImplementationOnce(() =>
        Promise.resolve({
          ok: false,
          status: 404,
          statusText: "Not Found",
        })
      );

      // Act & Assert
      await expect(
        leonardoImageService.uploadImage("https://example.com/not-found.jpg")
      ).rejects.toThrow("Failed to fetch image: Not Found");
    });
  });

  describe("uploadCharacterImage", () => {
    test("should successfully upload a character image", async () => {
      // Arrange
      const mockBlob = new Blob(["character image"], { type: "image/jpeg" });
      const mockMetadata: ImageMetadata = {
        filename: "character.jpg",
        contentType: "image/jpeg",
        purpose: "character-reference",
      };

      // Mock the internal uploadImage method
      jest
        .spyOn(leonardoImageService, "uploadImage")
        .mockResolvedValue("char-img-123");

      // Act
      const result = await leonardoImageService.uploadCharacterImage(
        mockBlob,
        mockMetadata
      );

      // Assert
      expect(leonardoImageService.uploadImage).toHaveBeenCalledWith(
        mockBlob,
        "jpg",
        "character.jpg"
      );
      expect(result).toEqual({
        success: true,
        imageId: "char-img-123",
      });
    });

    test("should handle upload errors gracefully", async () => {
      // Arrange
      const mockBlob = new Blob(["character image"], { type: "image/jpeg" });

      // Mock the internal uploadImage method to throw an error
      jest
        .spyOn(leonardoImageService, "uploadImage")
        .mockRejectedValue(new Error("Upload failed"));

      // Act
      const result = await leonardoImageService.uploadCharacterImage(mockBlob);

      // Assert
      expect(result).toEqual({
        success: false,
        error: "Upload failed",
      });
    });

    test("should determine extension from mime type if not provided", async () => {
      // Arrange
      const mockBlob = new Blob(["character image"], { type: "image/png" });

      // Mock the internal uploadImage method
      jest
        .spyOn(leonardoImageService, "uploadImage")
        .mockResolvedValue("char-img-456");

      // Act
      await leonardoImageService.uploadCharacterImage(mockBlob);

      // Assert
      expect(leonardoImageService.uploadImage).toHaveBeenCalledWith(
        mockBlob,
        "png",
        expect.any(String)
      );
    });
  });

  describe("getStyleReferenceId", () => {
    test("should return the predefined style reference ID if available", async () => {
      // Act
      const styleId = await leonardoImageService.getStyleReferenceId();

      // Assert
      expect(styleId).toBe("style-ref-123"); // From mocked constants
      expect(
        jest.spyOn(leonardoImageService, "uploadImage")
      ).not.toHaveBeenCalled();
    });

    test("should upload a new style reference if no IDs are available", async () => {
      // Temporarily mock the constant with a different value
      const originalModule = jest.requireMock("@/constants/image");
      const originalStyleId = originalModule.STYLE_IMAGE_REFERENCE_ID;
      originalModule.STYLE_IMAGE_REFERENCE_ID = "";

      // Set environment variables
      const originalAppUrl = process.env.NEXT_PUBLIC_APP_URL;
      process.env.NEXT_PUBLIC_APP_URL = "https://bookapp.test";

      // Mock uploadImage
      jest
        .spyOn(leonardoImageService, "uploadImage")
        .mockResolvedValue("new-style-123");

      try {
        // Act
        const styleId = await leonardoImageService.getStyleReferenceId();

        // Assert
        expect(leonardoImageService.uploadImage).toHaveBeenCalled();
        expect(styleId).toBe("new-style-123");
      } finally {
        // Restore original values
        originalModule.STYLE_IMAGE_REFERENCE_ID = originalStyleId;
        process.env.NEXT_PUBLIC_APP_URL = originalAppUrl;
      }
    });
  });

  describe("deleteImage", () => {
    test("should successfully delete an image", async () => {
      // Arrange
      mockLeonardoClient.initImages.deleteInitImageById.mockResolvedValue({
        object: { success: true },
      });

      // Act
      const result = await leonardoImageService.deleteImage(
        "img-to-delete-123"
      );

      // Assert
      expect(
        mockLeonardoClient.initImages.deleteInitImageById
      ).toHaveBeenCalledWith("img-to-delete-123");
      expect(result).toBe(true);
    });

    test("should handle deletion errors gracefully", async () => {
      // Arrange
      mockLeonardoClient.initImages.deleteInitImageById.mockRejectedValue(
        new Error("Deletion failed")
      );

      // Act
      const result = await leonardoImageService.deleteImage(
        "img-to-delete-456"
      );

      // Assert
      expect(
        mockLeonardoClient.initImages.deleteInitImageById
      ).toHaveBeenCalledWith("img-to-delete-456");
      expect(result).toBe(false);
    });
  });

  describe("generateImage", () => {
    test("should generate an image with default options", async () => {
      // Arrange
      const prompt = "A dragon in a magical forest";
      const mockGenerationResponse = {
        object: {
          sdGenerationJob: {
            generationId: "gen-123",
            apiCreditCost: 2.5,
          },
        },
      };

      mockLeonardoClient.image.createGeneration.mockResolvedValue(
        mockGenerationResponse
      );

      // Act
      const result = await leonardoImageService.generateImage(prompt);

      // Assert
      expect(mockLeonardoClient.image.createGeneration).toHaveBeenCalledWith({
        height: 1024,
        width: 768,
        modelId: DEFAULT_MODEL_ID,
        prompt,
        numImages: 3,
        public: false,
        alchemy: true,
        seed: undefined,
        controlnets: [], // No references provided
      });

      expect(result).toEqual({
        success: true,
        generationId: "gen-123",
        estimatedTime: 20,
        apiCreditCost: 2.5,
      });
    });

    test("should include character reference when provided", async () => {
      // Arrange
      const prompt = "A wizard casting a spell";
      const options: GenerationOptions = {
        characterImageId: "char-ref-456",
        characterStrength: "Mid",
        width: 512,
        height: 512,
        numImages: 1,
      };

      const mockGenerationResponse = {
        object: {
          sdGenerationJob: {
            generationId: "gen-456",
            apiCreditCost: 1.5,
          },
        },
      };

      mockLeonardoClient.image.createGeneration.mockResolvedValue(
        mockGenerationResponse
      );

      // Act
      const result = await leonardoImageService.generateImage(prompt, options);

      // Assert
      expect(mockLeonardoClient.image.createGeneration).toHaveBeenCalledWith({
        height: 512,
        width: 512,
        modelId: DEFAULT_MODEL_ID,
        prompt,
        numImages: 1,
        public: false,
        alchemy: true,
        seed: undefined,
        controlnets: [
          {
            initImageId: "char-ref-456",
            initImageType: InitImageType.Uploaded,
            preprocessorId: 133, // Character Reference preprocessor ID
            strengthType: StrengthType.Mid,
          },
        ],
      });

      expect(result).toEqual({
        success: true,
        generationId: "gen-456",
        estimatedTime: 20,
        apiCreditCost: 1.5,
      });
    });

    test("should handle API errors gracefully", async () => {
      // Arrange
      const prompt = "A failed generation";
      mockLeonardoClient.image.createGeneration.mockRejectedValue(
        new Error("Generation failed: Invalid model ID")
      );

      // Act
      const result = await leonardoImageService.generateImage(prompt);

      // Assert
      expect(result).toEqual({
        success: false,
        error: "Generation failed: Invalid model ID",
      });
    });

    test("should handle missing generation ID in response", async () => {
      // Arrange
      const prompt = "A generation with missing ID";
      const mockGenerationResponse = {
        object: {
          sdGenerationJob: {
            // No generationId provided
            apiCreditCost: 1.0,
          },
        },
      };

      mockLeonardoClient.image.createGeneration.mockResolvedValue(
        mockGenerationResponse
      );

      // Act
      const result = await leonardoImageService.generateImage(prompt);

      // Assert
      expect(result).toEqual({
        success: false,
        error: "Failed to get generation ID from Leonardo API",
      });
    });
  });
});
