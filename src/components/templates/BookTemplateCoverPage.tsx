// "use client";
// import React from "react";
// import Image from "next/image";

// interface BookTemplateCoverPageProps {
//   children: React.ReactNode;
//   isLastPage?: boolean;
//   coverImage?: string | null;
// }

// const BookTemplateCoverPage = React.forwardRef<
//   HTMLDivElement,
//   BookTemplateCoverPageProps
// >(({ children, isLastPage, coverImage }, ref) => {
//   return (
//     <div
//       className="bg-white border border-gray-200 shadow-lg h-full relative"
//       ref={ref}
//       data-density="hard"
//     >
//       {/* Cover image */}
//       {coverImage && (
//         <div className="absolute inset-0 w-full h-full">
//           <Image
//             src={coverImage}
//             alt="Book cover"
//             fill
//             style={{ objectFit: "fill" }}
//             className="z-0"
//             priority
//           />
//         </div>
//       )}

//       {/* Title */}
//       <div className="absolute top-0 left-0 right-0 p-8 z-10">
//         <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md relative">
//           <h2 className="text-2xl font-bold text-black text-center">
//             {children}
//           </h2>
//         </div>
//       </div>

//       {/* Back cover text */}
//       {isLastPage && (
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md">
//             <h2 className="text-2xl font-bold text-black text-center">
//               The End
//             </h2>
//             <div className="mt-4 text-center text-gray-800">
//               A custom children&apos;s book
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// });

// BookTemplateCoverPage.displayName = "PageCover";

// export default BookTemplateCoverPage;

"use client";
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils"; // Assuming you have this utility

interface BookTemplateCoverPageProps {
  children: React.ReactNode;
  isLastPage?: boolean;
  coverImage?: string | null;
}

const BookTemplateCoverPage = React.forwardRef<
  HTMLDivElement,
  BookTemplateCoverPageProps
>(({ children, isLastPage, coverImage }, ref) => {
  return (
    <div
      className="bg-white border border-gray-200 shadow-lg h-full relative"
      ref={ref}
      data-density="hard"
      role="img"
      aria-label={isLastPage ? "Book back cover" : "Book front cover"}
    >
      {/* Cover image */}
      {coverImage && (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={coverImage}
            alt="Book cover illustration"
            fill
            sizes="(max-width: 768px) 100vw, 400px"
            style={{ objectFit: "fill" }}
            className="z-0"
            priority
            loading="eager"
          />
        </div>
      )}

      {/* Title */}
      <div
        className={cn(
          "absolute z-10",
          isLastPage
            ? "inset-0 flex items-center justify-center"
            : "top-0 left-0 right-0 p-8"
        )}
      >
        <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md relative">
          <h2 className="text-2xl font-bold text-black text-center">
            {children}
          </h2>

          {/* Back cover additional content */}
          {isLastPage && (
            <div className="mt-4 text-center text-gray-800">
              A custom children&apos;s book
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

BookTemplateCoverPage.displayName = "BookTemplateCoverPage";

export default BookTemplateCoverPage;
