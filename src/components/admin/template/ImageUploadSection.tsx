"use client";

import { AlertCircle, Image as ImageIcon, Loader2, Upload } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface ImageUploadSectionProps {
  templateId: string;
  pageNumber: number; // 0 for cover, 1+ for pages
  title: string;
  currentImageUrl: string | null;
  imagePrompt: string;
  isUploading: boolean;
  onUploadStart: () => void;
  onUploadComplete: (newImageUrl?: string) => void; // Updated to pass new URL
  onUploadError: (error: string) => void;
}

export function ImageUploadSection({
  templateId,
  pageNumber,
  title,
  currentImageUrl,
  imagePrompt,
  isUploading,
  onUploadStart,
  onUploadComplete,
  onUploadError,
}: ImageUploadSectionProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Helper function to check if current image is placeholder
  const isPlaceholder =
    currentImageUrl &&
    (currentImageUrl.includes("placeholder") ||
      currentImageUrl.startsWith("/images/"));

  // File validation
  const validateFile = (file: File): string | null => {
    // Check file type
    if (!file.type.startsWith("image/")) {
      return "Please select an image file";
    }

    // Check file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      return "Image size must be less than 10MB";
    }

    // Check file format
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      return "Only JPEG, PNG, and WebP images are allowed";
    }

    return null;
  };

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file
    const error = validateFile(file);
    if (error) {
      setValidationError(error);
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    setValidationError(null);

    // Compress image if it's large
    const processedFile = file;

    setSelectedFile(processedFile);

    // Create preview URL from processed file
    const url = URL.createObjectURL(processedFile);
    setPreviewUrl(url);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;

    onUploadStart();

    try {
      console.log(
        "Starting upload for file:",
        selectedFile.name,
        "Size:",
        selectedFile.size
      );

      // Create FormData for the API route
      const formData = new FormData();
      formData.append("file", selectedFile);
      formData.append("templateId", templateId);
      formData.append("pageNumber", pageNumber.toString());

      // Call the API route instead of server action
      const response = await fetch("/api/admin/upload-template-image", {
        method: "POST",
        body: formData,
        // Don't set Content-Type header - let browser set it with boundary for multipart
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        // Handle different error statuses
        if (response.status === 413) {
          throw new Error(
            "File too large. Please reduce image size and try again."
          );
        }

        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.error || `HTTP ${response.status}: ${response.statusText}`
        );
      }

      const result = await response.json();
      console.log("Upload result:", result);

      if (result.success) {
        // Pass the new image URL to the parent component
        onUploadComplete(result.imageUrl);

        // Clean up
        setSelectedFile(null);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        if (fileInputRef.current) {
          fileInputRef.current.value = "";
        }
      } else {
        onUploadError(result.error || "Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      onUploadError(error instanceof Error ? error.message : "Upload failed");
    }
  };
  const handleClearSelection = () => {
    setSelectedFile(null);
    setValidationError(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="space-y-4">
      {/* Current Image Display */}
      <div className="space-y-2">
        <Label className="text-sm font-medium">Current Image</Label>
        <Card className="p-4">
          <div className="flex items-center space-x-4">
            <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
              {currentImageUrl ? (
                <Image
                  src={currentImageUrl}
                  alt={`${title} preview`}
                  width={96}
                  height={96}
                  className="object-cover"
                  sizes="96px"
                  priority={false}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <ImageIcon className="h-8 w-8 text-gray-400" />
                </div>
              )}
              {isPlaceholder && (
                <div className="absolute inset-0 bg-orange-500 bg-opacity-20 flex items-center justify-center">
                  <span className="text-xs text-orange-800 font-medium bg-orange-200 px-1 rounded">
                    Placeholder
                  </span>
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {isPlaceholder ? "Placeholder Image" : "Custom Image"}
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                <strong>Prompt:</strong> {imagePrompt}
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* File Selection */}
      <div className="space-y-2">
        <Label htmlFor={`file-${pageNumber}`} className="text-sm font-medium">
          {isPlaceholder ? "Upload New Image" : "Replace Image"}
        </Label>
        <Input
          ref={fileInputRef}
          id={`file-${pageNumber}`}
          type="file"
          accept="image/*"
          onChange={handleFileSelect}
          disabled={isUploading}
          className="cursor-pointer"
        />
        {validationError && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{validationError}</AlertDescription>
          </Alert>
        )}
      </div>

      {/* Preview Selected File */}
      {selectedFile && previewUrl && !validationError && (
        <div className="space-y-2">
          <Label className="text-sm font-medium">Preview</Label>
          <Card className="p-4">
            <div className="flex items-center space-x-4">
              <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                <Image
                  src={previewUrl}
                  alt="Preview"
                  width={96}
                  height={96}
                  className="object-cover"
                  sizes="96px"
                  priority={false}
                />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium">{selectedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-2">
        {selectedFile && !validationError && (
          <>
            <Button onClick={handleUpload} disabled={isUploading} size="sm">
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Image
                </>
              )}
            </Button>
            <Button
              variant="outline"
              onClick={handleClearSelection}
              disabled={isUploading}
              size="sm"
            >
              Clear
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
