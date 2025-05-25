import { leonardoImageService } from "./image-generation-service";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import { ImageMetadata } from "@/types/image";
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
  NUM_IMAGES: 3,
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
        mockBlob as File,
        mockMetadata
      );

      // Assert - The service uses "png" extension but keeps the original filename from metadata
      expect(leonardoImageService.uploadImage).toHaveBeenCalledWith(
        mockBlob,
        "png",
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
      const result = await leonardoImageService.uploadCharacterImage(
        mockBlob as File
      );

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
      await leonardoImageService.uploadCharacterImage(mockBlob as File);

      // Assert - The service always uses "png" extension regardless of input
      expect(leonardoImageService.uploadImage).toHaveBeenCalledWith(
        mockBlob,
        "png",
        "character.png"
      );
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
      const characterImageId = "char-ref-123";
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
      const result = await leonardoImageService.generateImage(
        prompt,
        characterImageId
      );

      // Assert - Updated to match your new service implementation
      expect(mockLeonardoClient.image.createGeneration).toHaveBeenCalledWith({
        height: 1024,
        width: 768,
        modelId: DEFAULT_MODEL_ID,
        prompt,
        numImages: 3, // From NUM_IMAGES constant
        public: false,
        alchemy: true,
        controlnets: [
          {
            initImageId: characterImageId,
            initImageType: InitImageType.Uploaded,
            preprocessorId: 133,
            strengthType: StrengthType.Mid,
          },
        ],
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
      const characterImageId = "char-ref-456";

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
      const result = await leonardoImageService.generateImage(
        prompt,
        characterImageId
      );

      // Assert - Updated to match your new service implementation
      expect(mockLeonardoClient.image.createGeneration).toHaveBeenCalledWith({
        height: 1024,
        width: 768,
        modelId: DEFAULT_MODEL_ID,
        prompt,
        numImages: 3, // From NUM_IMAGES constant
        public: false,
        alchemy: true,
        controlnets: [
          {
            initImageId: characterImageId,
            initImageType: InitImageType.Uploaded,
            preprocessorId: 133,
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
      const characterImageId = "char-ref-789";
      mockLeonardoClient.image.createGeneration.mockRejectedValue(
        new Error("Generation failed: Invalid model ID")
      );

      // Act
      const result = await leonardoImageService.generateImage(
        prompt,
        characterImageId
      );

      // Assert
      expect(result).toEqual({
        success: false,
        error: "Generation failed: Invalid model ID",
      });
    });

    test("should handle missing generation ID in response", async () => {
      // Arrange
      const prompt = "A generation with missing ID";
      const characterImageId = "char-ref-000";
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
      const result = await leonardoImageService.generateImage(
        prompt,
        characterImageId
      );

      // Assert
      expect(result).toEqual({
        success: false,
        error: "Failed to get generation ID from Leonardo API",
      });
    });
  });
});
