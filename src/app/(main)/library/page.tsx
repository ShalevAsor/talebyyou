import { Suspense } from "react";

import { getGenres } from "@/actions/genre-actions";
import { getAllBookTemplates } from "@/actions/template-actions";
import { ErrorAlert } from "@/components/common";
import { BookStoreLoading } from "@/components/common/BookStoreLoading";
import PageHeader from "@/components/layout/PageHeader";
import { LibraryContent } from "@/components/library/LibraryContent";
import { createMetadata, generateStructuredData } from "@/config/site";

interface LibraryPageProps {
  searchParams: Promise<{
    genres?: string;
  }>;
}

export const metadata = createMetadata({
  title: "Book Library - Explore Customizable Children's Books",
  description:
    "Browse our collection of customizable children's book templates for kids. Create personalized stories featuring your child as the main character.",
});

export default async function LibraryPage({ searchParams }: LibraryPageProps) {
  // Parse genre filter from URL (handle both string and array cases)
  const params = await searchParams;
  const genreParam = params.genres;
  const genreNames = genreParam
    ? typeof genreParam === "string"
      ? genreParam.split(",")
      : genreParam
    : [];

  // Fetch ALL templates
  const [genresResult, booksResult] = await Promise.all([
    getGenres(),
    getAllBookTemplates({
      publishedOnly: true,
    }),
  ]);

  // Default values in case of fetch errors
  const allGenres = genresResult.success ? genresResult.data : [];
  const bookTemplates = booksResult.success ? booksResult.data : [];
  // Get any error messages
  const error = !booksResult.success
    ? booksResult.error
    : !genresResult.success
    ? genresResult.error
    : null;

  // Generate structured data for book collection
  const structuredData = generateStructuredData("CollectionPage", {
    mainEntity: {
      "@type": "ItemList",
      itemListElement: bookTemplates.map((template, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "Product",
          name: template.title,
          description: template.description,
          image: template.coverImage,
        },
      })),
    },
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      <PageHeader
        title="Library"
        description="Explore our collection of customizable books for kids"
      />

      {error && (
        <div role="alert" aria-live="assertive" className="mb-4">
          <ErrorAlert message={error} />
        </div>
      )}

      <section aria-labelledby="library-section">
        <h2 id="library-section" className="sr-only">
          Book Template Library
        </h2>
        <Suspense
          fallback={
            <BookStoreLoading
              message="Browsing our Collection..."
              subMessage="Finding the perfect books for your little one"
              variant="pagesTurn"
              size="md"
              icon="library"
              className="min-h-[60vh]"
            />
          }
        >
          <LibraryContent
            initialBookTemplates={bookTemplates}
            initialGenres={allGenres}
            initialSelectedGenres={genreNames}
          />
        </Suspense>
      </section>
    </>
  );
}
