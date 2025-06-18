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
            sizes="(max-width: 640px) 280px, (max-width: 768px) 300px, 400px" // More specific sizes
            style={{ objectFit: "fill" }}
            className="z-0"
            priority
            quality={75}
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
        <div className="relative">
          <h2 className="text-2xl font-bold text-white text-center text-stroke">
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
