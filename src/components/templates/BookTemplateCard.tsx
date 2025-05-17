import React from "react";
import Image from "next/image";
import Link from "next/link";
import { BookTemplateFull } from "@/types/book";

// Import shadcn UI components
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface BookTemplateCardProps {
  template: BookTemplateFull;
}

/**
 * Component for displaying a single book template card
 * - Shows cover image, title, description, and genres
 * - Provides action buttons for preview and customize
 * - Optimized for accessibility and SEO
 */
export const BookTemplateCard: React.FC<BookTemplateCardProps> = ({
  template,
}) => {
  const defaultImage = "/images/placeholders/book-template-placeholder.jpg";
  const imageUrl = template.coverImage || defaultImage;
  const titleId = `template-title-${template.id}`;
  const descriptionId = `template-desc-${template.id}`;

  // Construct a proper age range description
  const ageRange = `${template.minAge}–${template.maxAge}`;

  return (
    <article
      className="bg-white rounded-lg shadow-sm overflow-hidden border hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
      aria-labelledby={titleId}
      aria-describedby={descriptionId}
    >
      {/* Cover Image */}
      <div className="relative h-56 w-full">
        <Image
          src={imageUrl}
          alt={`Cover for ${template.title}`}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          priority={false}
          className="transition-transform duration-300 hover:scale-105 object-cover"
          placeholder="blur"
          blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIj48L3JlY3Q+PC9zdmc+"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <h3
          id={titleId}
          className="text-lg font-semibold line-clamp-1 text-gray-900"
        >
          {template.title}
        </h3>

        {/* Description */}
        <p
          id={descriptionId}
          className="text-sm text-gray-600 mt-1 line-clamp-2"
        >
          {template.description}
        </p>

        {/* Book details - grouped for better screen reader experience */}
        <dl className="mt-2 text-xs text-gray-500 space-y-1">
          <div className="flex">
            <dt className="font-medium mr-1">Ages:</dt>
            <dd>{ageRange}</dd>
          </div>

          <div className="flex">
            <dt className="font-medium mr-1">Pages:</dt>
            <dd>{template.pageCount}</dd>
          </div>
        </dl>

        {/* Genres */}
        {template.genres?.length > 0 && (
          <div
            className="flex flex-wrap gap-1 mt-3"
            aria-label={`Genres: ${template.genres
              .map((g) => g.name)
              .join(", ")}`}
          >
            {template.genres.map((genre) => (
              <Badge
                key={genre.id}
                variant="secondary"
                className="px-2 py-0.5 bg-gray-100 text-xs rounded-full text-gray-700 hover:bg-gray-100"
              >
                {genre.name}
              </Badge>
            ))}
          </div>
        )}

        {/* Action Button */}
        <div className="mt-auto pt-4">
          <Button asChild variant="default" className="w-full">
            <Link
              href={`/library/template-preview/${template.id}`}
              aria-label={`View details for ${template.title}`}
            >
              Preview Book
            </Link>
          </Button>
        </div>
      </div>

      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            name: template.title,
            description: template.description,
            image: template.coverImage,
            offers: {
              "@type": "Offer",
              availability: "https://schema.org/InStock",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </article>
  );
};
