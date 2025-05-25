// import React, { useState, useRef } from "react";
// import { Button } from "@/components/common/Button";
// import NextImage from "next/image";
// import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/formConstants";

// interface SimpleImageUploadProps {
//   onImageSelected: (file: File) => void;
//   onError?: (error: string) => void;
//   className?: string;
// }

// const SimpleImageUpload: React.FC<SimpleImageUploadProps> = ({
//   onImageSelected,
//   onError,
//   className = "",
// }) => {
//   // State for the image
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [previewUrl, setPreviewUrl] = useState<string | null>(null);

//   // Reference to the file input
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   // Handle file selection
//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       const file = e.target.files[0];

//       // Validate file size
//       if (file.size > MAX_FILE_SIZE) {
//         const error = `Image size should be less than ${
//           MAX_FILE_SIZE / (1024 * 1024)
//         }MB`;
//         if (onError) onError(error);
//         return;
//       }

//       // Validate file type
//       if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
//         const error = `Only .jpg, .jpeg, .png and .webp files are accepted`;
//         if (onError) onError(error);
//         return;
//       }

//       // Store the file
//       setSelectedFile(file);

//       // Create a preview URL
//       const objectUrl = URL.createObjectURL(file);
//       setPreviewUrl(objectUrl);

//       // Call the callback with the selected file
//       onImageSelected(file);
//     }
//   };

//   // Trigger file input click
//   const handleSelectClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     }
//   };

//   // Reset image
//   const handleRemoveClick = () => {
//     setSelectedFile(null);
//     setPreviewUrl(null);
//   };

//   return (
//     <div className={`simple-image-upload ${className}`}>
//       {/* Hidden file input */}
//       <input
//         type="file"
//         ref={fileInputRef}
//         accept="image/jpeg,image/jpg,image/png,image/webp"
//         onChange={handleFileChange}
//         className="hidden"
//         id="image-upload"
//       />

//       {/* Main container */}
//       <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
//         <div className="p-4">
//           {/* Preview the selected image if available */}
//           {previewUrl ? (
//             <div className="flex flex-col items-center space-y-4">
//               <div className="relative w-40 h-40 overflow-hidden rounded-md border border-gray-300">
//                 <NextImage
//                   src={previewUrl}
//                   alt="Image preview"
//                   fill
//                   sizes="160px"
//                   style={{ objectFit: "cover" }}
//                   unoptimized={true} // Required for blob URLs
//                 />
//               </div>
//               <div className="flex gap-2 w-full">
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   fullWidth
//                   onClick={handleSelectClick}
//                 >
//                   Change Photo
//                 </Button>
//                 <Button
//                   type="button"
//                   variant="outline"
//                   size="sm"
//                   fullWidth
//                   onClick={handleRemoveClick}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </div>
//           ) : (
//             /* Upload prompt if no image is selected */
//             <div className="text-center py-8">
//               <div className="mx-auto w-24 h-24 mb-4 flex items-center justify-center rounded-full bg-gray-100">
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   className="h-12 w-12 text-gray-400"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={1.5}
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
//                   />
//                 </svg>
//               </div>
//               <p className="text-sm text-gray-500 mb-4">
//                 Upload a clear photo of your child's face
//               </p>
//               <p className="text-xs text-gray-400 mb-2">
//                 Accepted formats: JPG, PNG, WEBP (Max: 4MB)
//               </p>

//               <Button
//                 type="button"
//                 variant="primary"
//                 size="md"
//                 onClick={handleSelectClick}
//                 className="mx-auto"
//               >
//                 Select Photo
//               </Button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SimpleImageUpload;
import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/common/Button";
import NextImage from "next/image";
import { ACCEPTED_IMAGE_TYPES, MAX_FILE_SIZE } from "@/constants/formConstants";

interface ImageUploadProps {
  onImageSelected: (file: File) => void;
  onError?: (error: string) => void;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageSelected,
  onError,
  className = "",
}) => {
  // State for the preview URL
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Reference to the file input
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Clean up object URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  // Handle file selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];

      // Validate file size
      if (file.size > MAX_FILE_SIZE) {
        const error = `Image size should be less than ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`;
        if (onError) onError(error);
        return;
      }

      // Validate file type
      if (!ACCEPTED_IMAGE_TYPES.includes(file.type)) {
        const error = `Only .jpg, .jpeg, .png and .webp files are accepted`;
        if (onError) onError(error);
        return;
      }

      // Create a preview URL
      const objectUrl = URL.createObjectURL(file);

      // Clean up previous preview URL if exists
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }

      setPreviewUrl(objectUrl);

      // Call the callback with the selected file
      onImageSelected(file);
    }
  };

  // Trigger file input click
  const handleSelectClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Reset image
  const handleRemoveClick = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);

    // Reset the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`simple-image-upload ${className}`}>
      {/* Hidden file input */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
        id="image-upload"
      />

      {/* Main container */}
      <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
        <div className="p-4">
          {/* Preview the selected image if available */}
          {previewUrl ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-40 h-40 overflow-hidden rounded-md border border-gray-300">
                <NextImage
                  src={previewUrl}
                  alt="Image preview"
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
                  onClick={handleRemoveClick}
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
              <p className="text-xs text-gray-400 mb-2">
                Accepted formats: JPG, PNG, WEBP (Max: 4MB)
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
      </div>
    </div>
  );
};

export default ImageUpload;
