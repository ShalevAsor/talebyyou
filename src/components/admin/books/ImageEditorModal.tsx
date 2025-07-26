import { AlertCircle, Check, Loader2, RefreshCw, X } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useEffect, useState } from "react";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Types for the modal props
interface ImageEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  type: "page" | "cover";
  // For page images
  pageId?: string;
  pageNumber?: number;
  // For cover images
  bookId?: string;
  bookTitle?: string;
  // Current image data
  currentImageUrl: string | null;
  imageOptions: string[];
  currentPrompt: string;
  onImageUpdated?: () => void; // Callback to refresh parent data
}

interface GenerationStatus {
  hasActiveGeneration: boolean;
  generationId?: string;
  status?: string;
}

interface ImageLoadState {
  [key: string]: "loading" | "loaded" | "error";
}

const ImageEditorModal: React.FC<ImageEditorModalProps> = ({
  isOpen,
  onClose,
  type,
  pageId,
  pageNumber,
  bookId,
  bookTitle,
  currentImageUrl,
  imageOptions,
  currentPrompt,
  onImageUpdated,
}) => {
  // State management
  const [previewImageUrl, setPreviewImageUrl] = useState<string | null>(
    currentImageUrl
  );
  const [editedPrompt, setEditedPrompt] = useState(currentPrompt);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [imageLoadStates, setImageLoadStates] = useState<ImageLoadState>({});
  const [generationStatus, setGenerationStatus] = useState<GenerationStatus>({
    hasActiveGeneration: false,
  });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Handle image load states
  const handleImageLoad = (imageUrl: string) => {
    setImageLoadStates((prev) => ({ ...prev, [imageUrl]: "loaded" }));
  };

  const handleImageError = (imageUrl: string) => {
    setImageLoadStates((prev) => ({ ...prev, [imageUrl]: "error" }));
    console.error(`Failed to load image: ${imageUrl}`);
  };

  const handleImageLoadStart = (imageUrl: string) => {
    setImageLoadStates((prev) => ({ ...prev, [imageUrl]: "loading" }));
  };

  // Check for active generation status
  const checkGenerationStatus = useCallback(async () => {
    if (!isOpen) return;

    try {
      const response = await fetch("/api/admin/generation-status", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          pageId: type === "page" ? pageId : undefined,
          bookId: type === "cover" ? bookId : undefined,
        }),
      });

      if (response.ok) {
        const result = await response.json();
        setGenerationStatus(result.data || { hasActiveGeneration: false });
      }
    } catch (error) {
      console.error("Failed to check generation status:", error);
    }
  }, [isOpen, type, pageId, bookId]);

  // Reset state when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setPreviewImageUrl(currentImageUrl);
      setEditedPrompt(currentPrompt);
      setError(null);
      setSuccess(null);
      setImageLoadStates({});
      checkGenerationStatus();
    }
  }, [isOpen, currentImageUrl, currentPrompt, checkGenerationStatus]);

  // Poll for generation status when active
  useEffect(() => {
    if (!generationStatus.hasActiveGeneration || !isOpen) return;

    const interval = setInterval(checkGenerationStatus, 3000); // Check every 3 seconds
    return () => clearInterval(interval);
  }, [generationStatus.hasActiveGeneration, isOpen, checkGenerationStatus]);

  // Handle image preview selection
  const handlePreviewImage = (imageUrl: string) => {
    setPreviewImageUrl(imageUrl);
    setError(null);
    setSuccess(null);
  };

  // Handle image save
  const handleSaveImage = async () => {
    if (isSaving || !previewImageUrl || previewImageUrl === currentImageUrl)
      return;

    setIsSaving(true);
    setError(null);
    setSuccess(null);

    try {
      const action = type === "page" ? "selectPageImage" : "selectCoverImage";
      const payload =
        type === "page"
          ? { pageId, imageUrl: previewImageUrl }
          : { bookId, imageUrl: previewImageUrl };

      const response = await fetch("/api/admin/select-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Image saved successfully!");
        onImageUpdated?.();
        // Close modal after successful save (only for image selection, not generation)
        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        setError(result.error || "Failed to save image");
      }
    } catch (error) {
      setError("Failed to save image");
      console.error("Error saving image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Handle regeneration
  const handleRegenerate = async () => {
    if (isRegenerating) return;

    setIsRegenerating(true);
    setError(null);
    setSuccess(null);

    try {
      const action =
        type === "page" ? "regeneratePageImage" : "regenerateCoverImage";
      const payload =
        type === "page"
          ? {
              pageId,
              newPrompt:
                editedPrompt.trim() !== currentPrompt
                  ? editedPrompt
                  : undefined,
            }
          : {
              bookId,
              newPrompt:
                editedPrompt.trim() !== currentPrompt
                  ? editedPrompt
                  : undefined,
            };

      const response = await fetch("/api/admin/regenerate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action, ...payload }),
      });

      const result = await response.json();

      if (result.success) {
        setSuccess("Regeneration started! New images will appear when ready.");
        setGenerationStatus({
          hasActiveGeneration: true,
          generationId: result.data,
          status: "PENDING",
        });
        onImageUpdated?.();
        // DON'T close modal - let user see new images when they're ready
      } else {
        setError(result.error || "Failed to start regeneration");
      }
    } catch (error) {
      setError("Failed to start regeneration");
      console.error("Error regenerating image:", error);
    } finally {
      setIsRegenerating(false);
    }
  };

  if (!isOpen) return null;

  const hasChangedPrompt = editedPrompt.trim() !== currentPrompt;
  const hasImageOptions = imageOptions.length > 0;
  const hasUnsavedChanges = previewImageUrl !== currentImageUrl;

  if (isOpen) {
    console.log("=== IMAGE DEBUG ===");
    console.log("Current Image URL:", currentImageUrl);
    console.log("Image Options:", imageOptions);
    console.log("Image Options Length:", imageOptions.length);
    imageOptions.forEach((url, index) => {
      console.log(`Option ${index + 1}:`, url);
    });
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-semibold">
              Edit {type === "page" ? `Page ${pageNumber}` : "Cover"} Image
            </h2>
            {type === "cover" && bookTitle && (
              <Badge variant="secondary" className="text-sm">
                {bookTitle}
              </Badge>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Status Messages */}
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="border-green-200 bg-green-50">
              <Check className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {success}
              </AlertDescription>
            </Alert>
          )}

          {/* Active Generation Status */}
          {generationStatus.hasActiveGeneration && (
            <Alert className="border-blue-200 bg-blue-50">
              <Loader2 className="h-4 w-4 text-blue-600 animate-spin" />
              <AlertDescription className="text-blue-700">
                Generating new images... This may take 10-30 seconds.
              </AlertDescription>
            </Alert>
          )}

          {/* Current/Preview Image Section */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <h3 className="text-lg font-medium">
                {hasUnsavedChanges ? "Preview Image" : "Current Image"}
              </h3>
              {hasUnsavedChanges && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-600"
                >
                  Preview
                </Badge>
              )}
            </div>
            <Card>
              <CardContent className="p-4">
                {previewImageUrl ? (
                  <div className="relative w-full max-w-sm mx-auto h-64 bg-gray-100 rounded-lg overflow-hidden">
                    {imageLoadStates[previewImageUrl] === "loading" && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                      </div>
                    )}
                    {imageLoadStates[previewImageUrl] === "error" ? (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                        <div className="text-center text-gray-500">
                          <AlertCircle className="h-8 w-8 mx-auto mb-2" />
                          <p className="text-sm">Failed to load image</p>
                        </div>
                      </div>
                    ) : (
                      <Image
                        src={previewImageUrl}
                        alt={`${
                          hasUnsavedChanges ? "Preview" : "Current"
                        } ${type} image`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 768px) 100vw, 384px"
                        onLoadingComplete={() =>
                          handleImageLoad(previewImageUrl)
                        }
                        onError={() => handleImageError(previewImageUrl)}
                        onLoadStart={() =>
                          handleImageLoadStart(previewImageUrl)
                        }
                        priority
                      />
                    )}
                  </div>
                ) : (
                  <div className="w-full max-w-sm mx-auto h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-500">No image selected</span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Save Button */}
            {hasUnsavedChanges && (
              <div className="mt-4 flex justify-center">
                <Button
                  onClick={handleSaveImage}
                  disabled={isSaving}
                  className="bg-green-600 hover:bg-green-700"
                >
                  {isSaving ? (
                    <>
                      <Loader2 size={16} className="animate-spin mr-2" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Check size={16} className="mr-2" />
                      Save This Image
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Image Options Section */}
          {hasImageOptions && (
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-lg font-medium">Alternative Options</h3>
                <Badge variant="outline">{imageOptions.length}</Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {imageOptions.map((imageUrl, index) => {
                  const loadState = imageLoadStates[imageUrl];
                  const isCurrentImage = imageUrl === currentImageUrl;
                  const isPreviewSelected = imageUrl === previewImageUrl;

                  return (
                    <Card
                      key={`${imageUrl}-${index}`}
                      className={`relative cursor-pointer transition-all hover:shadow-md ${
                        isPreviewSelected && !isCurrentImage
                          ? "ring-2 ring-blue-500 border-blue-500"
                          : isCurrentImage
                          ? "ring-2 ring-green-500 border-green-500"
                          : "hover:border-gray-300"
                      }`}
                      onClick={() => handlePreviewImage(imageUrl)}
                    >
                      <CardContent className="p-0">
                        <div className="relative w-full h-40 bg-gray-100 rounded-t-lg overflow-hidden">
                          {/* Loading State */}
                          {(!loadState || loadState === "loading") && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <Loader2 className="h-6 w-6 animate-spin text-gray-400" />
                            </div>
                          )}

                          {/* Error State */}
                          {loadState === "error" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center text-gray-500">
                                <AlertCircle className="h-6 w-6 mx-auto mb-1" />
                                <p className="text-xs">Failed to load</p>
                              </div>
                            </div>
                          )}

                          {/* Image */}
                          <Image
                            src={imageUrl}
                            alt={`Option ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                            onLoadingComplete={() => handleImageLoad(imageUrl)}
                            onError={() => handleImageError(imageUrl)}
                            onLoadStart={() => handleImageLoadStart(imageUrl)}
                          />

                          {/* Status Indicators */}
                          {isCurrentImage && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-green-500 hover:bg-green-600">
                                <Check size={12} className="mr-1" />
                                Current
                              </Badge>
                            </div>
                          )}

                          {isPreviewSelected && !isCurrentImage && (
                            <div className="absolute top-2 right-2">
                              <Badge className="bg-blue-500 hover:bg-blue-600">
                                <Check size={12} className="mr-1" />
                                Previewing
                              </Badge>
                            </div>
                          )}

                          {/* Selection Overlay */}
                          {!isCurrentImage && loadState === "loaded" && (
                            <div className="absolute inset-0 bg-black/0 hover:bg-black/10 transition-all flex items-center justify-center">
                              <Badge
                                variant="secondary"
                                className="opacity-0 hover:opacity-100 transition-opacity bg-black/70 text-white border-none"
                              >
                                {isPreviewSelected
                                  ? "Previewing"
                                  : "Click to Preview"}
                              </Badge>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* Regeneration Section */}
          <div className="border-t pt-6">
            <h3 className="text-lg font-medium mb-4">Regenerate New Images</h3>

            {/* Prompt Editor */}
            <div className="space-y-3">
              <Label htmlFor="prompt-editor">Image Prompt</Label>
              <Textarea
                id="prompt-editor"
                value={editedPrompt}
                onChange={(e) => setEditedPrompt(e.target.value)}
                className="min-h-[100px]"
                placeholder="Describe the image you want to generate..."
              />

              {hasChangedPrompt && (
                <Alert className="border-amber-200 bg-amber-50">
                  <AlertCircle className="h-4 w-4 text-amber-600" />
                  <AlertDescription className="text-amber-700">
                    You've modified the prompt. Regenerating will use the new
                    prompt.
                  </AlertDescription>
                </Alert>
              )}
            </div>

            {/* Regenerate Button */}
            <div className="mt-4 space-y-2">
              <Button
                onClick={handleRegenerate}
                disabled={
                  isRegenerating ||
                  generationStatus.hasActiveGeneration ||
                  !editedPrompt.trim()
                }
                className="w-full sm:w-auto"
              >
                {isRegenerating || generationStatus.hasActiveGeneration ? (
                  <Loader2 size={16} className="animate-spin mr-2" />
                ) : (
                  <RefreshCw size={16} className="mr-2" />
                )}
                {isRegenerating
                  ? "Starting Generation..."
                  : generationStatus.hasActiveGeneration
                  ? "Generation In Progress..."
                  : "Generate New Images"}
              </Button>

              <p className="text-sm text-gray-600">
                New images will be added to your options when ready (10-30
                seconds). You'll be able to select from them without closing
                this modal.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-3 p-6 border-t bg-gray-50">
          <div className="flex items-center gap-2">
            {hasUnsavedChanges && (
              <div className="flex items-center gap-2 text-amber-600">
                <AlertCircle size={16} />
                <span className="text-sm font-medium">
                  You have unsaved changes
                </span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" onClick={onClose}>
              {hasUnsavedChanges ? "Cancel" : "Close"}
            </Button>
            {hasUnsavedChanges && (
              <Button
                onClick={handleSaveImage}
                disabled={isSaving}
                className="bg-green-600 hover:bg-green-700"
              >
                {isSaving ? (
                  <>
                    <Loader2 size={16} className="animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Check size={16} className="mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageEditorModal;
