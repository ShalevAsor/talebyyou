import React, { useState, useCallback, useRef } from "react";
import Cropper, { Point, Area } from "react-easy-crop";
import { Button } from "@/components/common/Button";
import NextImage from "next/image";

interface ImageUploadCropProps {
  onImageCropped: (croppedImage: Blob) => void;
  aspectRatio?: number;
  cropShape?: "rect" | "round";
  initialImage?: string | null;
  className?: string;
}

const ImageUploadCrop: React.FC<ImageUploadCropProps> = ({
  onImageCropped,
  aspectRatio = 1, // Square by default (1:1)
  cropShape = "rect",
  initialImage = null,
  className = "",
}) => {
  // State for the image
  const [image, setImage] = useState<string | null>(initialImage);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [isCropping, setIsCropping] = useState(false);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // Reference to the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        if (reader.result) {
          setImage(reader.result.toString());
          setIsCropping(true);
          setPreviewImage(null); // Clear any previous preview
        }
      });

      reader.readAsDataURL(file);
    }
  };

  // Handle crop complete
  const onCropComplete = useCallback(
    (croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedAreaPixels(croppedAreaPixels);
    },
    []
  );

  // Create a cropped image using canvas
  const createCroppedImage = useCallback(async () => {
    if (!image || !croppedAreaPixels) return;

    try {
      const croppedImage = await getCroppedImg(image, croppedAreaPixels);
      // For Next.js Image, we'll need to use the blob URL
      const croppedImageUrl = URL.createObjectURL(croppedImage);
      setPreviewImage(croppedImageUrl);
      setIsCropping(false);
      onImageCropped(croppedImage);
    } catch (e) {
      console.error("Error creating cropped image:", e);
    }
  }, [image, croppedAreaPixels, onImageCropped]);

  // Function to convert cropped area to a Blob
  const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;

      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");

        if (!ctx) {
          reject(new Error("Could not create canvas context"));
          return;
        }

        // Set dimensions
        canvas.width = pixelCrop.width;
        canvas.height = pixelCrop.height;

        // Draw the cropped image
        ctx.drawImage(
          image,
          pixelCrop.x,
          pixelCrop.y,
          pixelCrop.width,
          pixelCrop.height,
          0,
          0,
          pixelCrop.width,
          pixelCrop.height
        );

        // As a Blob
        canvas.toBlob((blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          resolve(blob);
        }, "image/png");
      };

      image.onerror = () => reject(new Error("Could not load image"));
    });
  };

  // Trigger file input click
  const handleSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset cropping view
  const handleResetClick = () => {
    setIsCropping(false);
    setPreviewImage(null);
  };

  return (
    <div className={`image-upload-crop ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />

      {/* Main container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        {/* Show cropper when an image is selected and in cropping mode */}
        {image && isCropping ? (
          <div className="w-full">
            {/* Cropper container */}
            <div className="relative h-80 w-full">
              <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={aspectRatio}
                cropShape={cropShape}
                onCropChange={setCrop}
                onCropComplete={onCropComplete}
                onZoomChange={setZoom}
                objectFit="horizontal-cover"
              />
            </div>

            {/* Zoom control */}
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <div className="mb-3">
                <div className="flex items-center justify-between mb-1">
                  <label
                    htmlFor="zoom-slider"
                    className="text-sm font-medium text-gray-700"
                  >
                    Zoom
                  </label>
                  <span className="text-xs text-gray-500">
                    {zoom.toFixed(1)}x
                  </span>
                </div>
                <input
                  id="zoom-slider"
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(Number(e.target.value))}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
              </div>

              {/* Action buttons */}
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={() => setIsCropping(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={createCroppedImage}
                >
                  Crop Image
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Preview the cropped image if available */}
            {previewImage ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-md border border-gray-300">
                  <NextImage
                    src={previewImage}
                    alt="Cropped preview"
                    fill
                    sizes="160px"
                    style={{ objectFit: "cover" }}
                    unoptimized={true} // Required for blob URLs
                  />
                </div>
                <div className="flex gap-2 w-full">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={handleSelectClick}
                  >
                    Change Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    fullWidth
                    onClick={handleResetClick}
                  >
                    Remove
                  </Button>
                </div>
              </div>
            ) : (
              /* Upload prompt if no image is selected */
              <div className="text-center py-8">
                <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gray-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12 text-gray-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <p className="text-sm text-gray-500 mb-4">
                  Upload a clear photo of your child's face
                </p>

                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={handleSelectClick}
                  className="mx-auto"
                >
                  Select Photo
                </Button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUploadCrop;
