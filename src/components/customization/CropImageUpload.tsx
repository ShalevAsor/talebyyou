import React, { useState, useRef, useCallback } from "react";
import ReactCrop, {
  Crop,
  PixelCrop,
  centerCrop,
  makeAspectCrop,
} from "react-image-crop";
import { Button } from "@/components/common/Button";
import NextImage from "next/image";

// Import the CSS
import "react-image-crop/dist/ReactCrop.css";
import Image from "next/image";

interface CropImageUploadProps {
  onImageCropped: (croppedImage: Blob) => void;
  aspectRatio?: number;
  className?: string;
}

const CropImageUpload: React.FC<CropImageUploadProps> = ({
  onImageCropped,
  aspectRatio = 1, // Square by default (1:1)
  className = "",
}) => {
  // State for the image and crop
  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [isCropping, setIsCropping] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // References
  const imgRef = useRef<HTMLImageElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle image load and set initial crop
  const onImageLoad = useCallback(
    (e: React.SyntheticEvent<HTMLImageElement>) => {
      const { width, height } = e.currentTarget;

      // Create a centered crop with the specified aspect ratio
      const newCrop = centerCrop(
        makeAspectCrop(
          {
            unit: "%",
            width: 90,
          },
          aspectRatio,
          width,
          height
        ),
        width,
        height
      );

      setCrop(newCrop);
      setIsCropping(true);
    },
    [aspectRatio]
  );

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      const reader = new FileReader();

      // Clear any existing data
      setCrop(undefined);
      setCompletedCrop(null);
      setPreviewUrl(null);

      reader.addEventListener("load", () => {
        if (reader.result) {
          setImgSrc(reader.result.toString());
          setIsCropping(true);
        }
      });

      reader.readAsDataURL(file);
    }
  };

  // Generate cropped image from canvas
  const generateCroppedImage = useCallback(async () => {
    if (!imgRef.current || !completedCrop) return;

    const image = imgRef.current;
    const crop = completedCrop;

    const canvas = document.createElement("canvas");
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    // Set canvas dimensions to match cropped area
    canvas.width = crop.width;
    canvas.height = crop.height;

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("No 2d context");
    }

    // Draw the cropped image onto the canvas
    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    // Create a blob with maximum quality
    return new Promise<Blob>((resolve) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            throw new Error("Canvas is empty");
          }

          // Create URL for preview and set state
          const blobUrl = URL.createObjectURL(blob);
          setPreviewUrl(blobUrl);
          setIsCropping(false);

          // Pass the blob back to parent component
          onImageCropped(blob);
          resolve(blob);
        },
        "image/png",
        1.0 // Maximum quality
      );
    });
  }, [completedCrop, onImageCropped]);

  // Trigger file input click
  const handleSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset cropping view
  const handleResetClick = () => {
    setImgSrc(null);
    setCrop(undefined);
    setCompletedCrop(null);
    setPreviewUrl(null);
    setIsCropping(false);
  };

  return (
    <div className={`crop-image-upload ${className}`}>
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
        {imgSrc && isCropping ? (
          <div className="w-full">
            {/* Cropper container */}
            <div className="relative max-h-80 overflow-hidden">
              <ReactCrop
                crop={crop}
                onChange={(c) => setCrop(c)}
                onComplete={(c) => setCompletedCrop(c)}
                aspect={aspectRatio}
                circularCrop={false}
                ruleOfThirds
              >
                <Image
                  ref={imgRef}
                  src={imgSrc}
                  width={300}
                  height={300}
                  alt="Crop me"
                  onLoad={onImageLoad}
                  className="max-w-full"
                />
              </ReactCrop>
            </div>

            {/* Action buttons */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  fullWidth
                  onClick={handleResetClick}
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  fullWidth
                  onClick={generateCroppedImage}
                  disabled={!completedCrop?.width || !completedCrop?.height}
                >
                  Crop Image
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="p-4">
            {/* Preview the cropped image if available */}
            {previewUrl ? (
              <div className="flex flex-col items-center space-y-4">
                <div className="relative w-40 h-40 overflow-hidden rounded-md border border-gray-300">
                  <NextImage
                    src={previewUrl}
                    alt="Cropped preview"
                    width={160}
                    height={160}
                    style={{
                      objectFit: "cover",
                      width: "100%",
                      height: "100%",
                    }}
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

export default CropImageUpload;
