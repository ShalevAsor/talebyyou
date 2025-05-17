// "use client";

// import Image from "next/image";
// import React from "react";
// import clsx from "clsx";
// import { PageType } from "@/types/book";
// import { Page } from "@/generated/prisma";
// interface PageThumbnailsProps {
//   pages: Page[];
//   currentPageIndex: number;
//   goToPage: (pageNumber: number) => void;
//   coverImage?: string;
// }

// const PageThumbnails: React.FC<PageThumbnailsProps> = ({
//   pages,
//   currentPageIndex,
//   goToPage,
// }) => {
//   // Find the dedication page if it exists
//   const dedicationPage = pages.find(
//     (page) => page.type === PageType.DEDICATION
//   );
//   const dedicationPageIndex = dedicationPage
//     ? pages.findIndex((p) => p.id === dedicationPage.id) + 1
//     : null;

//   return (
//     <div className="flex flex-row items-center justify-center pt-4">
//       <div className="flex overflow-x-auto">
//         {/* Cover Thumbnail */}
//         <div
//           className={clsx(
//             "p-2 border rounded cursor-pointer min-w-[100px] h-[100px] flex items-center justify-center",
//             currentPageIndex === 0
//               ? "bg-indigo-100 border-indigo-400"
//               : "bg-white border-gray-200"
//           )}
//           onClick={() => goToPage(0)}
//         >
//           <p className="text-xs text-center font-medium">Cover</p>
//         </div>

//         {/* Dedication Page Thumbnail */}
//         {dedicationPage && (
//           <div
//             className={clsx(
//               "p-2 border rounded cursor-pointer min-w-[100px] h-[100px] flex items-center justify-center",
//               currentPageIndex === dedicationPageIndex
//                 ? "bg-indigo-100 border-indigo-400"
//                 : "bg-white border-gray-200"
//             )}
//             onClick={() => goToPage(dedicationPageIndex!)}
//           >
//             <p className="text-xs text-center font-medium">Dedication</p>
//           </div>
//         )}

//         {/* Page Thumbnails */}
//         {pages
//           .filter((page) => page.type === PageType.IMAGE)
//           .map((page) => {
//             const pageIndex = pages.findIndex((p) => p.id === page.id);

//             return (
//               <div
//                 key={page.id}
//                 className={clsx(
//                   "p-2 border rounded cursor-pointer min-w-[100px] h-[100px] bg-white",
//                   currentPageIndex === pageIndex
//                     ? "bg-amber-50 border-indigo-400"
//                     : "border-gray-200"
//                 )}
//                 onClick={() => goToPage(pageIndex)}
//               >
//                 {page.imageUrl ? (
//                   <div className="h-full flex flex-col">
//                     <div className="flex-1 flex items-center justify-center overflow-hidden">
//                       <Image
//                         src={page.imageUrl}
//                         alt={`Thumbnail for page ${page.pageNumber}`}
//                         width={90}
//                         height={80}
//                         className="max-h-full max-w-full object-cover"
//                       />
//                     </div>
//                     <p className="text-[10px] text-center mt-1">
//                       Page {page.pageNumber}
//                     </p>
//                   </div>
//                 ) : (
//                   <div className="h-full flex flex-col items-center justify-center">
//                     <div className="w-full h-3/4 bg-gray-100 flex items-center justify-center">
//                       <span className="text-[10px] text-gray-400">
//                         No image
//                       </span>
//                     </div>
//                     <p className="text-[10px] text-center mt-1">
//                       Page {page.pageNumber}
//                     </p>
//                   </div>
//                 )}
//               </div>
//             );
//           })}

//         {/* Back Cover Thumbnail */}
//         <div
//           className={clsx(
//             "p-2 border rounded cursor-pointer min-w-[100px] h-[100px] flex items-center justify-center",
//             currentPageIndex === pages.length + 1
//               ? "bg-indigo-100 border-indigo-400"
//               : "bg-white border-gray-200"
//           )}
//           onClick={() => goToPage(pages.length + 1)}
//         >
//           <p className="text-xs text-center font-medium">Back Cover</p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default PageThumbnails;
"use client";
import Image from "next/image";
import React, { useMemo, memo } from "react";
import clsx from "clsx";
import { PageType } from "@/types/book";
import { Page } from "@/generated/prisma";

interface PageThumbnailsProps {
  pages: Page[];
  currentPageIndex: number;
  goToPage: (pageNumber: number) => void;
  coverImage?: string;
}

/**
 * PageThumbnails component - Displays navigation thumbnails for all pages in the book
 * Allows quick navigation between pages by clicking on thumbnails
 */
const PageThumbnails: React.FC<PageThumbnailsProps> = ({
  pages,
  currentPageIndex,
  goToPage,
}) => {
  // Memoize the dedication page calculation
  const dedicationPageInfo = useMemo(() => {
    const dedicationPage = pages.find(
      (page) => page.type === PageType.DEDICATION
    );

    return dedicationPage
      ? {
          page: dedicationPage,
          index: pages.findIndex((p) => p.id === dedicationPage.id) + 1,
        }
      : null;
  }, [pages]);

  // Memoize the image pages to avoid re-filtering on each render
  const imagePages = useMemo(() => {
    return pages.filter((page) => page.type === PageType.IMAGE);
  }, [pages]);

  return (
    <div
      className="flex flex-row items-center justify-center pt-4"
      role="navigation"
      aria-label="Book page navigation"
    >
      <div className="flex overflow-x-auto pb-2 gap-2 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        {/* Cover Thumbnail */}
        <ThumbnailButton
          isActive={currentPageIndex === 0}
          onClick={() => goToPage(0)}
          label="Cover"
          ariaLabel="Go to cover page"
        />

        {/* Dedication Page Thumbnail */}
        {dedicationPageInfo && (
          <ThumbnailButton
            isActive={currentPageIndex === dedicationPageInfo.index}
            onClick={() => goToPage(dedicationPageInfo.index)}
            label="Dedication"
            ariaLabel="Go to dedication page"
          />
        )}

        {/* Page Thumbnails */}
        {imagePages.map((page) => {
          const pageIndex = pages.findIndex((p) => p.id === page.id);

          return (
            <div
              key={page.id}
              className={clsx(
                "p-2 border rounded cursor-pointer min-w-[100px] h-[100px] bg-white transition-colors",
                currentPageIndex === pageIndex
                  ? "bg-amber-50 border-indigo-400"
                  : "border-gray-200 hover:border-indigo-200"
              )}
              onClick={() => goToPage(pageIndex)}
              role="button"
              aria-label={`Go to page ${page.pageNumber}`}
              aria-current={currentPageIndex === pageIndex ? "page" : undefined}
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  goToPage(pageIndex);
                  e.preventDefault();
                }
              }}
            >
              {page.imageUrl ? (
                <div className="h-full flex flex-col">
                  <div className="flex-1 flex items-center justify-center overflow-hidden">
                    <Image
                      src={page.imageUrl}
                      alt=""
                      width={90}
                      height={80}
                      className="max-h-full max-w-full object-cover"
                      loading="lazy"
                      aria-hidden="true"
                    />
                  </div>
                  <p className="text-[10px] text-center mt-1">
                    Page {page.pageNumber}
                  </p>
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center">
                  <div className="w-full h-3/4 bg-gray-100 flex items-center justify-center">
                    <span className="text-[10px] text-gray-400">No image</span>
                  </div>
                  <p className="text-[10px] text-center mt-1">
                    Page {page.pageNumber}
                  </p>
                </div>
              )}
            </div>
          );
        })}

        {/* Back Cover Thumbnail */}
        <ThumbnailButton
          isActive={currentPageIndex === pages.length + 1}
          onClick={() => goToPage(pages.length + 1)}
          label="Back Cover"
          ariaLabel="Go to back cover page"
        />
      </div>
    </div>
  );
};

// Extract the thumbnail button to a reusable component
interface ThumbnailButtonProps {
  isActive: boolean;
  onClick: () => void;
  label: string;
  ariaLabel: string;
}

const ThumbnailButton: React.FC<ThumbnailButtonProps> = ({
  isActive,
  onClick,
  label,
  ariaLabel,
}) => (
  <div
    className={clsx(
      "p-2 border rounded cursor-pointer min-w-[100px] h-[100px] flex items-center justify-center transition-colors",
      isActive
        ? "bg-indigo-100 border-indigo-400"
        : "bg-white border-gray-200 hover:border-indigo-200"
    )}
    onClick={onClick}
    role="button"
    aria-label={ariaLabel}
    aria-current={isActive ? "page" : undefined}
    tabIndex={0}
    onKeyDown={(e) => {
      if (e.key === "Enter" || e.key === " ") {
        onClick();
        e.preventDefault();
      }
    }}
  >
    <p className="text-xs text-center font-medium">{label}</p>
  </div>
);

export default memo(PageThumbnails);
