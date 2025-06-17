"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  BookOpen,
  Heart,
  Palette,
  Image as ImageIcon,
  Save,
  X,
  Loader2,
} from "lucide-react";
import { BookAdmin } from "@/types/book";
import {
  updateBookCoverDedication,
  updateCoverImagePrompt,
} from "@/actions/book-actions";
import Image from "next/image";
import ImageEditorModal from "./ImageEditorModal"; // NEW: Import the modal

interface CoverPageCardProps {
  book: BookAdmin;
}

export const CoverPageCard: React.FC<CoverPageCardProps> = ({ book }) => {
  // Cover dedication editing state
  const [editingDedication, setEditingDedication] = useState(false);
  const [dedicationValue, setDedicationValue] = useState(
    book.coverDedication || ""
  );

  // Cover image prompt editing state
  const [editingPrompt, setEditingPrompt] = useState(false);
  const [promptValue, setPromptValue] = useState(book.coverPrompt || "");

  // NEW: Image editor modal state
  const [isImageEditorOpen, setIsImageEditorOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  // Cover dedication handlers
  const handleSaveDedication = async () => {
    setLoading(true);
    const result = await updateBookCoverDedication(book.id, dedicationValue);
    setLoading(false);

    if (result.success) {
      setEditingDedication(false);
    }
  };

  const handleCancelDedication = () => {
    setDedicationValue(book.coverDedication || "");
    setEditingDedication(false);
  };

  // Cover image prompt handlers
  const handleSavePrompt = async () => {
    setLoading(true);
    const result = await updateCoverImagePrompt(book.id, promptValue);
    setLoading(false);

    if (result.success) {
      setEditingPrompt(false);
    }
  };

  const handleCancelPrompt = () => {
    setPromptValue(book.coverPrompt || "");
    setEditingPrompt(false);
  };

  // NEW: Image editor handlers
  const handleImageUpdated = () => {
    // Force a refresh of the parent component if needed
    // You might want to pass this callback from the parent
    window.location.reload(); // Simple refresh for now
  };

  const truncateText = (text: string, maxLength: number = 100) => {
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + "...";
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Cover Page Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Cover Image Preview */}
          {book.coverImage && (
            <div className="space-y-3">
              <h4 className="text-sm font-medium text-gray-700">Cover Image</h4>
              <div className="flex justify-center">
                <div className="relative w-48 h-64 bg-gray-100 rounded-md overflow-hidden border">
                  <Image
                    src={book.coverImage}
                    alt="Book Cover"
                    fill
                    className="object-contain"
                    sizes="(max-width: 768px) 100vw, 192px"
                  />
                </div>
              </div>

              {/* Cover Image Actions */}
              <div className="flex justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsImageEditorOpen(true)} // CHANGED: Enable button and open modal
                  disabled={loading}
                >
                  <ImageIcon className="h-4 w-4 mr-1" />
                  Edit Cover Image
                </Button>
              </div>
            </div>
          )}

          {/* Cover Image Prompt */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Cover Image Prompt
            </h4>

            {editingPrompt ? (
              <div className="space-y-3">
                <Textarea
                  value={promptValue}
                  onChange={(e) => setPromptValue(e.target.value)}
                  disabled={loading}
                  rows={3}
                  placeholder="Enter cover image generation prompt..."
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
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {book.coverPrompt ? (
                      <div className="p-3 bg-blue-50 rounded-md">
                        <p className="text-sm text-gray-700">
                          {truncateText(book.coverPrompt, 200)}
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500 italic">
                          No cover image prompt set
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingPrompt(true)}
                    disabled={loading}
                  >
                    <Palette className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* Cover Dedication */}
          <div className="space-y-3">
            <h4 className="text-sm font-medium text-gray-700">
              Cover Dedication
            </h4>

            {editingDedication ? (
              <div className="space-y-3">
                <Textarea
                  value={dedicationValue}
                  onChange={(e) => setDedicationValue(e.target.value)}
                  disabled={loading}
                  rows={3}
                  placeholder="Enter cover dedication (optional)..."
                />
                <div className="flex gap-2">
                  <Button
                    onClick={handleSaveDedication}
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
                    onClick={handleCancelDedication}
                    disabled={loading}
                    size="sm"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    {book.coverDedication ? (
                      <div className="p-3 bg-pink-50 rounded-md">
                        <p className="text-sm text-gray-700 italic">
                          "{book.coverDedication}"
                        </p>
                      </div>
                    ) : (
                      <div className="p-3 bg-gray-50 rounded-md">
                        <p className="text-sm text-gray-500 italic">
                          No cover dedication set
                        </p>
                      </div>
                    )}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setEditingDedication(true)}
                    disabled={loading}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* NEW: Image Editor Modal */}
      <ImageEditorModal
        isOpen={isImageEditorOpen}
        onClose={() => setIsImageEditorOpen(false)}
        type="cover"
        bookId={book.id}
        bookTitle={book.title}
        currentImageUrl={book.coverImage}
        imageOptions={book.coverImageOptions}
        currentPrompt={book.coverPrompt || ""}
        onImageUpdated={handleImageUpdated}
      />
    </>
  );
};
