import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookTemplateFull } from "@/types/book";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Clock, Users } from "lucide-react";

interface LibraryBookTemplateCardProps {
  template: BookTemplateFull;
}

/**
 * Clean, consistent library book template card
 * - Fixed height for uniform grid layout
 * - Clear, readable typography with proper contrast
 * - App-consistent color scheme (indigo primary)
 * - Improved image presentation and information hierarchy
 */
export const LibraryBookTemplateCard: React.FC<
  LibraryBookTemplateCardProps
> = ({ template }) => {
  const defaultImage = "/images/placeholders/book-template-placeholder.jpg";
  const imageUrl = template.coverImage || defaultImage;
  const titleId = `lib-template-title-${template.id}`;
  const descriptionId = `lib-template-desc-${template.id}`;
  const ageRange = `${template.minAge}–${template.maxAge}`;

  // Calculate if template is new (created within last 7 days)
  const daysSinceCreated = Math.floor(
    (Date.now() - new Date(template.createdAt).getTime()) /
      (1000 * 60 * 60 * 24)
  );
  const isNewTemplate = daysSinceCreated <= 7;

  return (
    <article
      className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:border-indigo-300 hover:shadow-lg transition-all duration-300 flex flex-col h-full group"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Image Section - Fixed Height */}
      <div className="relative h-48 bg-gray-50 flex items-center justify-center overflow-hidden">
        <Image
          src={imageUrl}
          alt={`Cover for ${template.title}`}
          width={120}
          height={160}
          className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-300"
          sizes="120px"
          priority={false}
        />

        {/* New Template Badge */}
        {isNewTemplate && (
          <div className="absolute top-2 right-2 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full text-xs font-medium shadow-sm">
            New
          </div>
        )}
      </div>

      {/* Content Section - Flex Grow */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3
          id={titleId}
          className="font-semibold text-gray-900 text-base leading-tight mb-2 line-clamp-2 min-h-[2.5rem]"
        >
          {template.title}
        </h3>

        {/* Description - Fixed Height */}
        <p
          id={descriptionId}
          className="text-sm text-gray-600 leading-relaxed mb-3 line-clamp-3 min-h-[3.75rem]"
        >
          {template.description}
        </p>

        {/* Stats Row */}
        <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
          <div className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            <span>Ages {ageRange}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{template.pageCount}p</span>
          </div>
        </div>

        {/* Genres - Fixed Height */}
        <div className="mb-4 min-h-[1.75rem] flex items-start">
          {template.genres?.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {template.genres.slice(0, 2).map((genre) => (
                <Badge
                  key={genre.id}
                  variant="secondary"
                  className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs border-indigo-200 hover:bg-indigo-100"
                >
                  {genre.name}
                </Badge>
              ))}
              {template.genres.length > 2 && (
                <Badge
                  variant="outline"
                  className="px-2 py-0.5 text-xs text-gray-500 border-gray-300"
                >
                  +{template.genres.length - 2}
                </Badge>
              )}
            </div>
          )}
        </div>

        {/* Action Button - Always at Bottom */}
        <div className="mt-auto">
          <Button
            asChild
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white h-9 rounded-md transition-colors duration-200"
          >
            <Link
              href={`/library/template-preview/${template.slug}`}
              aria-label={`Preview ${template.title}`}
              className="flex items-center justify-center gap-2"
            >
              <Eye className="w-4 h-4" />
              <span className="font-medium">Preview</span>
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
};
