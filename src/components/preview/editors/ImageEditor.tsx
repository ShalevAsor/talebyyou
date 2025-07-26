"use client";
import { Check, X } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

interface ImageOption {
  imageUrl: string;
  index: number;
}

interface ImageEditorProps {
  currentImageUrl: string;
  imageOptions: ImageOption[]; // Array of image options with imageUrl and index
  onSave: (imageUrl: string) => void;
  onCancel: () => void;
  title?: string;
}

const ImageEditor: React.FC<ImageEditorProps> = ({
  currentImageUrl,
  imageOptions,
  onSave,
  onCancel,
  title = "Select an Image",
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(currentImageUrl);

  const handleSave = () => {
    onSave(selectedImage);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-xl p-6 border border-gray-200 w-[800px] max-w-[90vw]"
      role="dialog"
      aria-modal="true"
    >
      <h3 className="text-lg font-semibold mb-4">{title}</h3>

      {/* Image options grid - improved display */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {imageOptions.map((option) => (
          <div
            key={option.index}
            className={`relative rounded-lg overflow-hidden cursor-pointer border-2 transition-all bg-gray-50 ${
              selectedImage === option.imageUrl
                ? "border-indigo-500 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(option.imageUrl)}
          >
            {/* Container with better sizing */}
            <div className="relative w-full h-56 p-2">
              <div
                className="w-full h-full bg-center bg-no-repeat rounded"
                style={{
                  backgroundImage: `url(${option.imageUrl})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              />

              {selectedImage === option.imageUrl && (
                <div className="absolute inset-2 bg-indigo-500/20 flex items-center justify-center rounded">
                  <div className="bg-indigo-500 rounded-full p-1">
                    <Check className="text-white w-6 h-6" />
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Fallback message if no images available */}
      {imageOptions.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No image options available.
        </div>
      )}

      {/* Action buttons */}
      <div className="flex justify-end items-center">
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            <X className="mr-1 h-4 w-4" />
            Cancel
          </Button>

          <Button
            variant="default"
            onClick={handleSave}
            disabled={imageOptions.length === 0}
          >
            <Check className="mr-1 h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ImageEditor);
