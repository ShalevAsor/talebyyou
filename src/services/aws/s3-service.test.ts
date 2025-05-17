import fs from "fs";

// Set up mocks BEFORE importing the module under test
// Mock the fs module
jest.mock("fs", () => {
  const original = jest.requireActual("fs");
  return {
    ...original,
    readFileSync: jest.fn(),
    existsSync: jest.fn(),
    unlinkSync: jest.fn(),
  };
});

// Mock AWS SDK modules
jest.mock("@aws-sdk/client-s3");
jest.mock("@aws-sdk/s3-request-presigner");

// Create a mock S3Client with a mocked send method
const mockSend = jest.fn();
jest.mock("@aws-sdk/client-s3", () => {
  const actual = jest.requireActual("@aws-sdk/client-s3");
  return {
    ...actual,
    S3Client: jest.fn(() => ({
      send: mockSend,
    })),
    PutObjectCommand: jest
      .fn()
      .mockImplementation((x) => ({ ...x, Command: "PutObjectCommand" })),
    GetObjectCommand: jest
      .fn()
      .mockImplementation((x) => ({ ...x, Command: "GetObjectCommand" })),
    DeleteObjectCommand: jest
      .fn()
      .mockImplementation((x) => ({ ...x, Command: "DeleteObjectCommand" })),
    ListObjectsV2Command: jest
      .fn()
      .mockImplementation((x) => ({ ...x, Command: "ListObjectsV2Command" })),
  };
});

// Mock getSignedUrl
const mockGetSignedUrl = jest.fn();
jest.mock("@aws-sdk/s3-request-presigner", () => ({
  getSignedUrl: jest
    .fn()
    .mockImplementation((...args) => mockGetSignedUrl(...args)),
}));

// Mock config - this must be before importing the service
jest.mock("@/lib/config", () => ({
  AWS: {
    REGION: "mock-region",
    ACCESS_KEY_ID: "mock-access-key",
    SECRET_ACCESS_KEY: "mock-secret-key",
    S3_BUCKET_NAME: "mock-bucket-name",
  },
}));

import {
  uploadFileToS3,
  deleteFileFromS3,
  uploadPrintingPdfToS3,
  cleanupPrintingFiles,
  getDownloadUrl,
} from "./s3-service";

// Typescript helper
const mockedFs = fs as jest.Mocked<typeof fs>;

describe("s3-service", () => {
  const dummyBuffer = Buffer.from("dummy file");
  const dummyFilePath = "path/to/file.pdf";
  const dummyFileName = "file.pdf";
  const dummyMimeType = "application/pdf";
  const dummyBookId = "book123";
  const dummyKey = "ebooks/2024-01-01/file.pdf";
  const dummyUrl = "https://s3-url.com/file.pdf";

  beforeEach(() => {
    jest.clearAllMocks();
    mockedFs.readFileSync.mockReturnValue(dummyBuffer);
    mockedFs.existsSync.mockReturnValue(true);
    mockGetSignedUrl.mockResolvedValue(dummyUrl);

    // Suppress console logs during tests
    jest.spyOn(console, "error").mockImplementation(() => {});
    jest.spyOn(console, "log").mockImplementation(() => {});
  });

  describe("uploadFileToS3", () => {
    it("uploads a file and returns result", async () => {
      // Setup mocks
      mockSend.mockResolvedValueOnce({});

      // Call the function
      const result = await uploadFileToS3(
        dummyFilePath,
        dummyFileName,
        dummyMimeType
      );

      // Assertions
      expect(result).not.toBeNull();
      expect(result?.downloadUrl).toBe(dummyUrl);
      expect(mockSend).toHaveBeenCalledTimes(1);
      expect(mockGetSignedUrl).toHaveBeenCalledTimes(1);
    });

    it("returns null on error", async () => {
      // Setup mock to fail
      mockSend.mockRejectedValueOnce(new Error("Upload failed"));

      // Call the function
      const result = await uploadFileToS3(
        dummyFilePath,
        dummyFileName,
        dummyMimeType
      );

      // Assertions
      expect(result).toBeNull();
    });
  });

  describe("deleteFileFromS3", () => {
    it("deletes a file successfully", async () => {
      // Setup mocks
      mockSend.mockResolvedValueOnce({});

      // Call the function
      const result = await deleteFileFromS3("some/key.pdf");

      // Assertions
      expect(result).toBe(true);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          Command: "DeleteObjectCommand",
        })
      );
    });

    it("returns false on failure", async () => {
      // Setup mock to fail
      mockSend.mockRejectedValueOnce(new Error("Delete failed"));

      // Call the function
      const result = await deleteFileFromS3("bad/key");

      // Assertions
      expect(result).toBe(false);
    });
  });

  describe("uploadPrintingPdfToS3", () => {
    it("uploads and returns signed URL", async () => {
      // Setup mocks
      mockSend.mockResolvedValueOnce({});

      // Call the function
      const url = await uploadPrintingPdfToS3(
        dummyFilePath,
        dummyFileName,
        dummyBookId,
        "cover"
      );

      // Assertions
      expect(url).toBe(dummyUrl);
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          Command: "PutObjectCommand",
        })
      );
      expect(mockedFs.unlinkSync).toHaveBeenCalledWith(dummyFilePath);
    });

    it("returns null on failure", async () => {
      // Setup mock to fail
      mockSend.mockRejectedValueOnce(new Error("Upload failed"));

      // Call the function
      const url = await uploadPrintingPdfToS3(
        dummyFilePath,
        dummyFileName,
        dummyBookId,
        "interior"
      );

      // Assertions
      expect(url).toBeNull();
    });
  });

  describe("cleanupPrintingFiles", () => {
    it("deletes files if found", async () => {
      // Setup mocks
      mockSend.mockResolvedValueOnce({
        Contents: [
          { Key: "printing/book123/file1.pdf" },
          { Key: "printing/book123/file2.pdf" },
        ],
      });
      mockSend.mockResolvedValueOnce({}); // Delete 1
      mockSend.mockResolvedValueOnce({}); // Delete 2

      // Call the function
      await cleanupPrintingFiles("book123");

      // Assertions
      expect(mockSend).toHaveBeenCalledWith(
        expect.objectContaining({
          Command: "ListObjectsV2Command",
        })
      );
      expect(mockSend).toHaveBeenCalledTimes(3); // List + 2 deletes
    });

    it("does nothing if no files found", async () => {
      // Setup mocks
      mockSend.mockResolvedValueOnce({ Contents: [] });

      // Call the function
      await cleanupPrintingFiles("book123");

      // Assertions
      expect(mockSend).toHaveBeenCalledTimes(1); // Just the list
    });
  });

  describe("getDownloadUrl", () => {
    it("returns signed URL", async () => {
      // Call the function
      const result = await getDownloadUrl(dummyKey);

      // Assertions
      expect(result).toBe(dummyUrl);
      expect(mockGetSignedUrl).toHaveBeenCalledTimes(1);
    });

    it("returns null on failure", async () => {
      // Setup mock to fail
      mockGetSignedUrl.mockRejectedValueOnce(new Error("Signed URL failed"));

      // Call the function
      const result = await getDownloadUrl(dummyKey);

      // Assertions
      expect(result).toBeNull();
    });
  });
});
