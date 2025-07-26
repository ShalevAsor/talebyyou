"use client";

import { Bookmark, BookOpen, BookOpenCheck, Library } from "lucide-react";
import React from "react";

import { cn } from "@/lib/utils";

interface BookStoreLoadingProps {
  message?: string;
  subMessage?: string;
  variant?: "default" | "minimal" | "bookFlip" | "pagesTurn";
  size?: "sm" | "md" | "lg";
  icon?: "book" | "bookOpen" | "library" | "bookmark" | "none";
  className?: string;
  iconClassName?: string;
  textClassName?: string;
}

/**
 * A customizable loading component for a bookstore application
 * Features multiple animation variants and book-related iconography
 */
export const BookStoreLoading: React.FC<BookStoreLoadingProps> = ({
  message = "Loading your books...",
  subMessage,
  variant = "default",
  size = "md",
  icon = "bookOpen",
  className = "",
  iconClassName = "",
  textClassName = "",
}) => {
  // Size mappings
  const sizeClasses = {
    sm: {
      container: "gap-3",
      icon: "h-6 w-6",
      text: "text-sm",
      subText: "text-xs",
      bookFlip: "w-12 h-10",
      pagesTurn: "w-16 h-12",
    },
    md: {
      container: "gap-4",
      icon: "h-10 w-10",
      text: "text-base",
      subText: "text-sm",
      bookFlip: "w-16 h-14",
      pagesTurn: "w-24 h-16",
    },
    lg: {
      container: "gap-6",
      icon: "h-16 w-16",
      text: "text-lg",
      subText: "text-base",
      bookFlip: "w-24 h-20",
      pagesTurn: "w-32 h-24",
    },
  };

  // Icon component mapping
  const IconComponent = {
    book: Library,
    bookOpen: BookOpen,
    library: BookOpenCheck,
    bookmark: Bookmark,
    none: null,
  }[icon];

  // Render different loading variants
  const renderLoadingIndicator = () => {
    switch (variant) {
      case "minimal":
        return (
          <div className="flex items-center justify-center relative">
            <div
              className={cn(
                "animate-pulse border-2 rounded-full",
                "border-primary border-t-transparent",
                sizeClasses[size].icon,
                iconClassName
              )}
            />
          </div>
        );

      case "bookFlip":
        return (
          <div
            className={cn(
              "relative perspective-500",
              sizeClasses[size].bookFlip,
              iconClassName
            )}
          >
            <div className="absolute w-full h-full book-spine bg-primary-600 rounded-l-sm" />
            <div className="absolute w-full h-full book-cover bg-primary rounded-r-sm origin-left animate-bookFlip" />
            <div className="absolute w-full h-full book-page bg-white rounded-r-sm origin-left animate-bookPage delay-100" />
            <div className="absolute w-full h-full book-page bg-white rounded-r-sm origin-left animate-bookPage delay-200" />
            <div className="absolute w-full h-full book-page bg-white rounded-r-sm origin-left animate-bookPage delay-300" />
          </div>
        );

      case "pagesTurn":
        return (
          <div
            className={cn(
              "relative book-container",
              sizeClasses[size].pagesTurn,
              iconClassName
            )}
          >
            <div className="book-page animate-pageTurn delay-0"></div>
            <div className="book-page animate-pageTurn delay-300"></div>
            <div className="book-page animate-pageTurn delay-600"></div>
            <div className="book-page animate-pageTurn delay-900"></div>
          </div>
        );

      case "default":
      default:
        return IconComponent ? (
          <IconComponent
            className={cn(
              "animate-pulse text-primary",
              sizeClasses[size].icon,
              iconClassName
            )}
          />
        ) : null;
    }
  };

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center min-h-[200px] py-8",
        sizeClasses[size].container,
        className
      )}
    >
      {renderLoadingIndicator()}

      {message && (
        <p
          className={cn(
            "text-gray-800 font-medium text-center",
            sizeClasses[size].text,
            textClassName
          )}
        >
          {message}
        </p>
      )}

      {subMessage && (
        <p
          className={cn(
            "text-gray-500 text-center",
            sizeClasses[size].subText,
            textClassName
          )}
        >
          {subMessage}
        </p>
      )}
    </div>
  );
};
