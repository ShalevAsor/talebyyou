"use client";

import {
  AlertCircle,
  Check,
  ChevronLeft,
  Image as ImageIcon,
  Upload,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookTemplateFull } from "@/types/book";

import { ImageUploadSection } from "./ImageUploadSection";
import { S3ImageSelector } from "./S3ImageSelector";

interface TemplateImageManagerProps {
  template: BookTemplateFull;
}

export function TemplateImageManager({ template }: TemplateImageManagerProps) {
  const router = useRouter();
  const [uploadingImages, setUploadingImages] = useState<Set<number>>(
    new Set()
  );

  // Helper function to check if an image is a placeholder
  const isPlaceholderImage = (imageUrl: string | null) => {
    if (!imageUrl) return true;
    return imageUrl.includes("placeholder") || imageUrl.startsWith("/images/");
  };

  // Calculate upload progress
  const totalImages = template.pages.length + 1; // pages + cover
  const placeholderCount = [
    template.coverImage,
    ...template.pages.map((p) => p.imageUrl),
  ].filter(isPlaceholderImage).length;
  const completedCount = [
    template.coverImage,
    ...template.pages.map((p) => p.imageUrl),
  ].filter((imageUrl) => !isPlaceholderImage(imageUrl)).length;
  const progressPercentage = Math.round((completedCount / totalImages) * 100);

  const handleImageUploadStart = (pageNumber: number) => {
    setUploadingImages((prev) => new Set([...prev, pageNumber]));
  };

  const handleImageUploadComplete = (pageNumber: number) => {
    setUploadingImages((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(pageNumber);
      return newSet;
    });
    toast.success(
      `Image ${
        pageNumber === 0 ? "cover" : `page ${pageNumber}`
      } uploaded successfully!`
    );

    // Refresh the page data to show updated image
    router.refresh();
  };

  const handleImageUploadError = (pageNumber: number, error: string) => {
    setUploadingImages((prev) => {
      const newSet = new Set([...prev]);
      newSet.delete(pageNumber);
      return newSet;
    });
    toast.error(
      `Failed to upload ${
        pageNumber === 0 ? "cover" : `page ${pageNumber}`
      } image: ${error}`
    );
  };

  const handleImageSelected = () => {
    router.refresh();
  };

  return (
    <div className="space-y-6">
      {/* Header with Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/templates")}
            className="flex items-center"
          >
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back to Templates
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Manage Template Images</h1>
            <p className="text-muted-foreground">{template.title}</p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-sm font-medium">
              {completedCount}/{totalImages} Complete
            </div>
            <div className="text-xs text-muted-foreground">
              {placeholderCount} remaining
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div className="w-32 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-blue-500 to-green-500 transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              />
            </div>
            <span className="text-sm font-bold mt-1">
              {progressPercentage}%
            </span>
          </div>
        </div>
      </div>

      {/* Status Alert */}
      {placeholderCount === 0 ? (
        <Card className="border-green-200 bg-green-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-green-800">
              <Check className="h-5 w-5" />
              <span className="font-medium">All images uploaded!</span>
              <span className="text-sm">This template is ready for use.</span>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="border-orange-200 bg-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2 text-orange-800">
              <AlertCircle className="h-5 w-5" />
              <span className="font-medium">
                {placeholderCount} image{placeholderCount !== 1 ? "s" : ""}{" "}
                still need to be uploaded
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cover Image Section - Special styling */}
      <Card className="border-2 border-purple-200 bg-purple-50/30">
        <CardHeader className="bg-purple-100">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ImageIcon className="h-5 w-5 text-purple-600" />
              <span className="text-purple-800">Cover Image</span>
            </div>
            <div className="flex items-center space-x-2">
              <Badge
                variant={
                  !isPlaceholderImage(template.coverImage)
                    ? "default"
                    : "secondary"
                }
              >
                {!isPlaceholderImage(template.coverImage)
                  ? "Uploaded"
                  : "Placeholder"}
              </Badge>
              {!isPlaceholderImage(template.coverImage) && (
                <Check className="h-4 w-4 text-green-600" />
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 pt-4">
          <ImageUploadSection
            templateId={template.id}
            pageNumber={0}
            title="Cover Image"
            currentImageUrl={template.coverImage}
            imagePrompt={template.coverPrompt}
            isUploading={uploadingImages.has(0)}
            onUploadStart={() => handleImageUploadStart(0)}
            onUploadComplete={() => handleImageUploadComplete(0)}
            onUploadError={(error) => handleImageUploadError(0, error)}
          />

          <div className="pt-2 border-t border-purple-200">
            <p className="text-sm text-muted-foreground mb-2">
              Or select an existing image from S3:
            </p>
            <S3ImageSelector
              templateSlug={template.slug}
              target="cover"
              targetLabel="Cover"
              onImageSelected={handleImageSelected}
            />
          </div>
        </CardContent>
      </Card>

      {/* Page Images Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Upload className="h-5 w-5" />
            <span>Page Images ({template.pages.length} pages)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {template.pages
              .sort((a, b) => a.pageNumber - b.pageNumber)
              .map((page) => {
                const isUploaded = !isPlaceholderImage(page.imageUrl);
                const isUploading = uploadingImages.has(page.pageNumber);

                return (
                  <Card
                    key={page.id}
                    className={`transition-all duration-200 ${
                      isUploaded
                        ? "border-green-200 bg-green-50/30 shadow-md"
                        : isUploading
                        ? "border-blue-200 bg-blue-50/30 shadow-md ring-2 ring-blue-200"
                        : "border-gray-200 hover:border-gray-300 hover:shadow-sm"
                    }`}
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="flex items-center justify-between text-lg">
                        <div className="flex items-center space-x-2">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                              isUploaded
                                ? "bg-green-100 text-green-700"
                                : "bg-gray-100 text-gray-600"
                            }`}
                          >
                            {page.pageNumber}
                          </div>
                          <span>Page {page.pageNumber}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            variant={isUploaded ? "default" : "secondary"}
                            className={
                              isUploaded ? "bg-green-100 text-green-800" : ""
                            }
                          >
                            {isUploading
                              ? "Uploading..."
                              : isUploaded
                              ? "Ready"
                              : "Needs Image"}
                          </Badge>
                          {isUploaded && (
                            <Check className="h-4 w-4 text-green-600" />
                          )}
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <ImageUploadSection
                        templateId={template.id}
                        pageNumber={page.pageNumber}
                        title={`Page ${page.pageNumber}`}
                        currentImageUrl={page.imageUrl}
                        imagePrompt={page.imagePrompt}
                        isUploading={isUploading}
                        onUploadStart={() =>
                          handleImageUploadStart(page.pageNumber)
                        }
                        onUploadComplete={() =>
                          handleImageUploadComplete(page.pageNumber)
                        }
                        onUploadError={(error) =>
                          handleImageUploadError(page.pageNumber, error)
                        }
                      />

                      <div className="pt-2 border-t">
                        <p className="text-xs text-muted-foreground mb-2">
                          Or select existing:
                        </p>
                        <S3ImageSelector
                          templateSlug={template.slug}
                          target={page.id}
                          targetLabel={`Page ${page.pageNumber}`}
                          onImageSelected={handleImageSelected}
                        />
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-between items-center pt-6 border-t">
        <Button
          variant="outline"
          onClick={() => router.push("/admin/templates")}
        >
          Back to Templates
        </Button>

        <div className="flex space-x-2">
          <Button
            variant="outline"
            onClick={() =>
              window.open(
                `/library/template-preview/${template.slug}`,
                "_blank"
              )
            }
          >
            Preview Template
          </Button>

          {placeholderCount === 0 && (
            <Button
              onClick={() => {
                toast.success("Template images are complete!");
                router.push("/admin/templates");
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              All Done! ✨
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
