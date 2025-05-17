// // components/preview/editor/ImageEditor.tsx
// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import { FiCheck, FiX } from "react-icons/fi";

// interface ImageOption {
//   imageUrl: string;
//   index: number;
// }

// interface ImageEditorProps {
//   currentImageUrl: string;
//   imageOptions: ImageOption[]; // Array of image options with imageUrl and index
//   onSave: (imageUrl: string) => void;
//   onCancel: () => void;
//   title?: string;
// }

// const ImageEditor: React.FC<ImageEditorProps> = ({
//   currentImageUrl,
//   imageOptions,
//   onSave,
//   onCancel,
//   title = "Select an Image",
// }) => {
//   const [selectedImage, setSelectedImage] = useState<string>(currentImageUrl);

//   const handleSave = () => {
//     onSave(selectedImage);
//   };

//   return (
//     <div className="bg-white rounded-lg shadow-xl p-6 border border-gray-200 w-[800px] max-w-[90vw]">
//       <h3 className="text-lg font-semibold mb-4">{title}</h3>

//       {/* Image options grid - made larger */}
//       <div className="grid grid-cols-3 gap-6 mb-6">
//         {imageOptions.map((option) => (
//           <div
//             key={option.index}
//             className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
//               selectedImage === option.imageUrl
//                 ? "border-indigo-500 shadow-md"
//                 : "border-gray-200 hover:border-gray-300"
//             }`}
//             onClick={() => setSelectedImage(option.imageUrl)}
//           >
//             <Image
//               src={option.imageUrl}
//               alt={`Option ${option.index + 1}`}
//               fill
//               className="object-cover"
//               sizes="(max-width: 800px) 33vw, 250px"
//               quality={90}
//             />
//             {selectedImage === option.imageUrl && (
//               <div className="absolute inset-0 bg-indigo-500/25 bg-opacity-10 flex items-center justify-center">
//                 <div className="bg-indigo-500 rounded-full p-1">
//                   <FiCheck className="text-white w-6 h-6" />
//                 </div>
//               </div>
//             )}
//           </div>
//         ))}
//       </div>

//       {/* Fallback message if no images available */}
//       {imageOptions.length === 0 && (
//         <div className="text-center py-8 text-gray-500">
//           No image options available.
//         </div>
//       )}

//       {/* Action buttons */}
//       <div className="flex justify-end items-center">
//         <div className="flex space-x-2">
//           <button
//             onClick={onCancel}
//             className="flex items-center px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors"
//           >
//             <FiX className="mr-1" />
//             Cancel
//           </button>

//           <button
//             onClick={handleSave}
//             disabled={imageOptions.length === 0}
//             className={`flex items-center px-4 py-2 rounded-md transition-colors ${
//               imageOptions.length === 0
//                 ? "bg-gray-300 text-gray-500 cursor-pointer"
//                 : "bg-indigo-500 text-white hover:bg-indigo-700"
//             }`}
//           >
//             <FiCheck className="mr-1" />
//             Save
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageEditor;
"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Check, X } from "lucide-react";
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

      {/* Image options grid - made larger */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-6">
        {imageOptions.map((option) => (
          <div
            key={option.index}
            className={`relative aspect-[4/3] rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
              selectedImage === option.imageUrl
                ? "border-indigo-500 shadow-md"
                : "border-gray-200 hover:border-gray-300"
            }`}
            onClick={() => setSelectedImage(option.imageUrl)}
          >
            <Image
              src={option.imageUrl}
              alt={`Option ${option.index + 1}`}
              fill
              className="object-center"
              sizes="(max-width: 800px) 33vw, 250px"
              quality={90}
            />
            {selectedImage === option.imageUrl && (
              <div className="absolute inset-0 bg-indigo-500/25 bg-opacity-10 flex items-center justify-center">
                <div className="bg-indigo-500 rounded-full p-1">
                  <Check className="text-white w-6 h-6" />
                </div>
              </div>
            )}
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
