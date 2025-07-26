"use client";

import {
  BookOpen,
  Edit3,
  FileText,
  Image as ImageIcon,
  Loader2,
  Palette,
  Save,
  X,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

import { updatePageImagePrompt, updatePageText } from "@/actions/book-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { BookAdmin } from "@/types/book";

import ImageEditorModal from "./ImageEditorModal"; // NEW: Import the modal

interface PageCardProps {
  page: BookAdmin["pages"][0];
  onTextUpdate: () => void;
}

const getPageTypeIcon = (type: string) => {
  switch (type) {
    case "COVER":
      return <BookOpen className="h-4 w-4" />;
    case "TEXT":
      return <FileText className="h-4 w-4" />;
    case "IMAGE":
      return <ImageIcon className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const getPageTypeBadgeColor = (type: string) => {
  switch (type) {
    case "COVER":
      return "bg-blue-100 text-blue-800";
    case "TEXT":
      return "bg-green-100 text-green-800";
    case "IMAGE":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const PageCard: React.FC<PageCardProps> = ({ page, onTextUpdate }) => {
  // Text editing state
  const [editingText, setEditingText] = useState(false);
  const [textValue, setTextValue] = useState(page.textContent || "");

  // Image prompt editing state
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [promptValue, setPromptValue] = useState(page.imagePrompt || "");

  // NEW: Image editor modal state
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // Text editing handlers
  const handleSaveText = async () => {
    setLoading(true);
    const result = await updatePageText(page.id, textValue);
    setLoading(false);

    if (result.success) {
      setEditingText(false);
      onTextUpdate();
    }
  };

  const handleCancelText = () => {
    setTextValue(page.textContent || "");
    setEditingText(false);
  };

  // Image prompt editing handlers
  const handleSavePrompt = async () => {
    setLoading(true);
    const result = await updatePageImagePrompt(page.id, promptValue);
    setLoading(false);

    if (result.success) {
      setEditingPrompt(false);
      onTextUpdate(); // Refresh to show updated prompt
    }
  };

  const handleCancelPrompt = () => {
    setPromptValue(page.imagePrompt || "");
    setEditingPrompt(false);
  };

  // NEW: Image editor handlers
  const handleImageUpdated = () => {
    // Force a refresh of the parent component if needed
    // You might want to pass this callback from the parent
    onTextUpdate(); // Reuse existing callback
    // Alternative: window.location.reload(); // Simple refresh for now
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  // Determine which buttons to show based on page type
  const shouldShowTextEdit = () => {
    return page.type === "TEXT" && page.textContent;
  };

  const shouldShowImageEdit = () => {
    return page.type === "IMAGE" && page.imageUrl; // NEW: Only show if there's an image
  };

  const shouldShowPromptEdit = () => {
    return page.type === "IMAGE" && page.imagePrompt;
  };

  return (
    <>
      <Card className="mb-4">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                {getPageTypeIcon(page.type)}
                <span className="font-semibold">Page {page.pageNumber}</span>
              </div>
              <Badge className={getPageTypeBadgeColor(page.type)}>
                {page.type}
              </Badge>
            </div>

            {/* Conditional Action Buttons */}
            <div className="flex gap-2">
              {shouldShowTextEdit() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingText(true)}
                  disabled={loading}
                >
                  <Edit3 className="h-4 w-4 mr-1" />
                  Edit Text
                </Button>
              )}

              {shouldShowImageEdit() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsImageEditorOpen(true)} // CHANGED: Enable button and open modal
                  disabled={loading}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Edit Image
                </Button>
              )}

              {shouldShowPromptEdit() && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setEditingPrompt(true)}
                  disabled={loading}
                >
                  <Palette className="h-4 w-4 mr-1" />
                  Edit Prompt
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-4">
            {/* Image Preview */}
            {page.imageUrl && (
              <div className="flex justify-center">
                <div className="relative w-64 h-48 bg-gray-100 rounded-md overflow-hidden border">
                  <Image
                    src={page.imageUrl}
                    alt={`Page ${page.pageNumber}`}
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 256px"
                  />
                </div>
              </div>
            )}

            {/* Text Content Editing */}
            {editingText ? (
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">
                  Edit Text Content:
                </div>
                <Textarea
                  value={textValue}
                  onChange={(e) => setTextValue(e.target.value)}
                  disabled={loading}
                  rows={4}
                  placeholder="Enter page text content..."
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveText} disabled={loading} size="sm">
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelText}
                    disabled={loading}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              /* Text Content Display */
              page.textContent && (
                <div className="space-y-2">
                  <div className="p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700">
                      {truncateText(page.textContent)}
                    </p>
                  </div>
                </div>
              )
            )}

            {/* Image Prompt Editing */}
            {editingPrompt ? (
              <div className="space-y-3">
                <div className="text-sm font-medium text-gray-700">
                  Edit Image Prompt:
                </div>
                <Textarea
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  disabled={loading}
                  rows={3}
                  placeholder="Enter image generation prompt..."
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSavePrompt}
                    disabled={loading}
                    size="sm"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    Save
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancelPrompt}
                    disabled={loading}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              /* Image Prompt Display */
              page.imagePrompt &&
              !editingText && (
                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  <strong>Image Prompt:</strong>{" "}
                  {truncateText(page.imagePrompt, 150)}
                </div>
              )
            )}

            {/* Empty States */}
            {!page.textContent && !page.imageUrl && (
              <div className="p-3 bg-gray-50 rounded-md">
                <p className="text-sm text-gray-500 italic">
                  No content available
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* NEW: Image Editor Modal */}
      <ImageEditorModal
        isOpen={isImageEditorOpen}
        onClose={() => setIsImageEditorOpen(false)}
        type="page"
        pageId={page.id}
        pageNumber={page.pageNumber}
        currentImageUrl={page.imageUrl}
        imageOptions={page.imageOptions || []} // Assuming this field exists
        currentPrompt={page.imagePrompt || ""}
        onImageUpdated={handleImageUpdated}
      />
    </>
  );
};
