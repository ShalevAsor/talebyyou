import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { FiArrowLeft } from "react-icons/fi";

import { getBookById } from "@/actions/book-actions";
import { ErrorAlert, Loading } from "@/components/common";
import PageHeader from "@/components/layout/PageHeader";
import BookPreviewClient from "@/components/preview/BookPreviewClient";
import { Button } from "@/components/ui/button";
import {
  createMetadata,
  generateStructuredData,
  siteConfig,
} from "@/config/site";
import { logger } from "@/lib/logger";

/**
 * Props for the BookPreviewPage component
 */
interface BookPreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Page component for previewing a customized book
 * Fetches book data and renders the preview component
 */
export default async function BookPreviewPage({
  params,
}: BookPreviewPageProps) {
  // Get the ID from params
  const { id } = await params;

  try {
    // Fetch the book data from our action
    const bookResult = await getBookById(id);

    // Handle errors and not-found states
    if (!bookResult.success) {
      // If book doesn't exist, show 404 page
      if (bookResult.error === "Book not found") {
        logger.debug({ bookId: id }, "Book not found, showing 404 page");
        notFound();
      }

      // For other errors, show error message
      logger.error(
        { bookId: id, error: bookResult.error },
        "Error loading book preview"
      );
      return <ErrorAlert message={bookResult.error} />;
    }

    // We have our book data
    const book = bookResult.data;

    // Generate structured data for the book
    const bookStructuredData = generateStructuredData("Product", {
      name: book.title,
      description: book.template?.description || "Personalized children's book",
      image: book.coverImage || "",
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "29.99", // You might want to fetch this from your pricing constants
        priceCurrency: "USD",
      },
    });

    return (
      <>
        {/* Inject structured data for rich search results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bookStructuredData),
          }}
        />

        {/* Page Header with semantic heading */}
        <PageHeader
          title="Book Preview & Edit"
          description="Preview and edit your book in real time. Make adjustments to the content and see the updates instantly"
          actions={[
            {
              label: "Back to Library",
              href: "/library",
              variant: "outline",
              size: "sm",
              icon: <FiArrowLeft />,
              ariaLabel: "Return to book library",
            },
          ]}
          id="book-preview-title"
        />

        {/* Book preview with Suspense boundary and proper accessibility */}
        <section
          aria-labelledby="book-preview-content"
          className="book-preview-container my-8"
        >
          <h2 id="book-preview-content" className="sr-only">
            Preview of {book.title}
          </h2>
          <Suspense
            fallback={<Loading message={`Loading ${book.title} preview...`} />}
          >
            <BookPreviewClient initialBook={book} />
          </Suspense>
        </section>
      </>
    );
  } catch (error) {
    // Handle unexpected errors
    logger.error({ bookId: id, error }, "Unexpected error in BookPreviewPage");
    return (
      <div className="error-container py-8">
        <ErrorAlert message="Sorry, we encountered an error loading the book preview. Please try again later." />
        <div className="mt-4">
          <Button variant="outline" size="sm" asChild>
            <Link href="/library" aria-label="Return to library">
              <FiArrowLeft className="mr-2" />
              Return to Library
            </Link>
          </Button>
        </div>
      </div>
    );
  }
}

/**
 * Generate metadata for the page using the centralized config
 */
export async function generateMetadata({ params }: BookPreviewPageProps) {
  const { id } = await params;

  try {
    const bookResult = await getBookById(id);

    if (!bookResult.success) {
      return createMetadata({
        title: "Book Not Found",
        description: "The requested book could not be found",
        noIndex: true, // Don't index error pages
      });
    }

    const book = bookResult.data;

    // Create rich metadata for the book with canonical URL
    return createMetadata({
      title: `${book.title} - Preview & Edit`,
      description:
        book.template?.description ||
        `Edit and customize your personalized children's book "${book.title}" in real-time`,
      image: book.coverImage || "",
      alternates: {
        canonical: `${siteConfig.url}/library/preview/${id}`,
      },
    });
  } catch (error) {
    logger.error(
      { bookId: id, error },
      "Error generating metadata for BookPreviewPage"
    );

    return createMetadata({
      title: "Book Preview",
      description: "Preview and customize your children's book",
    });
  }
}
