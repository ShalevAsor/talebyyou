// "use client";

// import React from "react";
// import Image from "next/image";

// export interface BookTemplatePageProps {
//   pageNumber: number;
//   type: "text" | "image";
//   textContent?: string | null;
//   imageUrl?: string | null;
// }

// const BookTemplatePage = React.forwardRef<
//   HTMLDivElement,
//   BookTemplatePageProps
// >(({ pageNumber, type, textContent, imageUrl }, ref) => {
//   // Text page rendering
//   if (type === "text") {
//     return (
//       <div
//         className="bg-white border border-gray-200 h-full relative"
//         ref={ref}
//       >
//         <div className="flex flex-col h-full">
//           <div className="flex-1 flex items-center justify-center p-8 relative">
//             <p className="text-black leading-relaxed text-base mx-auto max-w-md">
//               {textContent}
//             </p>
//           </div>
//           <div className="text-center text-xs text-gray-600 pb-3">
//             {pageNumber}
//           </div>
//         </div>
//       </div>
//     );
//   }

//   // Image page rendering
//   return (
//     <div className="bg-white border border-gray-200 h-full relative" ref={ref}>
//       <div className="w-full h-full">
//         {imageUrl ? (
//           <div className="relative w-full h-full">
//             <Image
//               src={imageUrl}
//               alt={`Illustration for page ${pageNumber}`}
//               fill
//               style={{ objectFit: "fill" }}
//               priority
//             />
//           </div>
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
//             <p className="text-gray-500">Image not available</p>
//           </div>
//         )}
//       </div>

//       <div className="absolute bottom-3 w-full text-center z-10">
//         <div className="inline-block bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs text-black">
//           {pageNumber}
//         </div>
//       </div>
//     </div>
//   );
// });

// BookTemplatePage.displayName = "BookPage";

// export default BookTemplatePage;
"use client";

import React from "react";
import Image from "next/image";

export interface BookTemplatePageProps {
  pageNumber: number;
  type: "text" | "image";
  textContent?: string | null;
  imageUrl?: string | null;
}

const BookTemplatePage = React.forwardRef<
  HTMLDivElement,
  BookTemplatePageProps
>(({ pageNumber, type, textContent, imageUrl }, ref) => {
  const isTextPage = type === "text";
  const pageType = isTextPage ? "Text" : "Illustration";

  return (
    <div
      className="bg-white border border-gray-200 h-full relative"
      ref={ref}
      aria-label={`Book page ${pageNumber}: ${pageType}`}
    >
      {isTextPage ? (
        // Text page content
        <div className="flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center p-8 relative">
            <p className="text-black leading-relaxed text-base mx-auto max-w-md">
              {textContent || "No text content available"}
            </p>
          </div>
          <footer className="text-center text-xs text-gray-600 pb-3">
            <span aria-hidden="true">{pageNumber}</span>
            <span className="sr-only">Page {pageNumber}</span>
          </footer>
        </div>
      ) : (
        // Image page content
        <>
          <div className="w-full h-full">
            {imageUrl ? (
              <div className="relative w-full h-full">
                <Image
                  src={imageUrl}
                  alt={`Illustration for page ${pageNumber}`}
                  fill
                  sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 400px"
                  style={{ objectFit: "fill" }}
                  quality={75}
                  priority={pageNumber <= 1} // Only prioritize cover page
                />
              </div>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                <p className="text-gray-500">Image not available</p>
              </div>
            )}
          </div>

          <div className="absolute bottom-3 w-full text-center z-10">
            <div className="inline-block bg-white bg-opacity-70 px-3 py-1 rounded-full text-xs text-black">
              <span aria-hidden="true">{pageNumber}</span>
              <span className="sr-only">Page {pageNumber}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
});

BookTemplatePage.displayName = "BookTemplatePage";

export default BookTemplatePage;
