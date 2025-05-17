import { notFound } from "next/navigation";
import { ErrorAlert } from "@/components/common";
import { Suspense } from "react";
import { logger } from "@/lib/logger";
import { getBookTemplateById } from "@/actions/template-actions";
import { processBookTemplateForPreview } from "@/utils/templateUtils";
import {
  createMetadata,
  generateStructuredData,
  siteConfig,
} from "@/config/site";
import PageHeader from "@/components/layout/PageHeader";
import { FiArrowLeft, FiEdit3 } from "react-icons/fi";
import dynamic from "next/dynamic";
import TemplateDetails from "@/components/templates/template-preview/TemplateDetails";
import CustomizationOptions from "@/components/templates/template-preview/CustomizationOptions";
import CallToAction from "@/components/templates/template-preview/CTA";
import { Loader2 } from "lucide-react";

// Dynamic import for the heavy BookTemplatePreview component
const BookTemplatePreview = dynamic(
  () => import("@/components/templates/BookTemplatePreview"),
  { ssr: true } // Enable SSR but load the JS only when needed
);

// Revalidate this page once per day - templates don't change often
export const revalidate = 86400;

// REMOVED static metadata export since we're using generateMetadata

interface TemplatePreviewPageProps {
  params: Promise<{
    id: string;
  }>;
}

/**
 * Generate dynamic metadata for the template preview page
 */
export async function generateMetadata({ params }: TemplatePreviewPageProps) {
  const { id } = await params;

  try {
    const templateResult = await getBookTemplateById(id);

    if (!templateResult.success) {
      return createMetadata({
        title: "Template Not Found",
        description: "The requested book template could not be found",
        noIndex: true, // Don't index error pages
      });
    }

    const template = templateResult.data;

    // Create metadata with SEO optimizations including canonical URL
    return createMetadata({
      title: `${template.title} - Book Template Preview`,
      description:
        template.description ||
        `Preview "${template.title}" children's book template with customizable character and story`,
      image: template.coverImage || "",
      alternates: {
        canonical: `${siteConfig.url}/library/template-preview/${id}`,
      },
    });
  } catch (error) {
    logger.error(
      { templateId: id, error },
      "Error generating metadata for TemplatePreviewPage"
    );

    // Fallback to basic metadata
    return createMetadata({
      title: "Book Template Preview",
      description:
        "Preview and customize a children's book template with your child as the main character",
    });
  }
}

/**
 * Page Server component for previewing a book template
 * Fetches book template data and renders the preview component
 */
export default async function BookPreviewPage({
  params,
}: TemplatePreviewPageProps) {
  const { id } = await params;

  try {
    const templateResult = await getBookTemplateById(id);

    if (!templateResult.success) {
      if (templateResult.error.includes("not found")) {
        notFound();
      }

      logger.error(
        { templateId: id, error: templateResult.error },
        "Error loading book template preview"
      );

      return (
        <div role="alert" aria-live="assertive" className="mb-4">
          <ErrorAlert message={templateResult.error} />
        </div>
      );
    }

    // Fetched template from the database
    const originalTemplate = templateResult.data;

    // Process the template to replace all placeholders with the default generic values
    const processedTemplate = processBookTemplateForPreview(originalTemplate);

    // Generate structured data for this book template with more detailed attributes
    const structuredData = generateStructuredData("Book", {
      name: processedTemplate.title,
      description: processedTemplate.description,
      image: processedTemplate.coverImage,
      numberOfPages: processedTemplate.pageCount,
      audience: {
        "@type": "PeopleAudience",
        suggestedMinAge: processedTemplate.minAge,
        suggestedMaxAge: processedTemplate.maxAge,
      },
      genre: processedTemplate.genres.map((genre) => genre.name).join(", "),
      // Add more structured data for better SEO
      offers: {
        "@type": "Offer",
        availability: "https://schema.org/InStock",
        price: "29.99",
        priceCurrency: "USD",
      },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
      },
    });

    return (
      <>
        {/* Add structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        {/* Page Header with correct props */}
        <PageHeader
          title={processedTemplate.title}
          description={processedTemplate.description}
          actions={[
            {
              label: "Back to Library",
              href: "/library",
              variant: "outline",
              size: "sm",
              icon: <FiArrowLeft />,
              ariaLabel: "Return to library page",
            },
            {
              label: "Customize Book",
              href: `/library/customize/${processedTemplate.id}`,
              variant: "default",
              size: "sm",
              icon: <FiEdit3 />,
              ariaLabel: "Start customizing this book",
            },
          ]}
          id="template-preview-title"
        />

        {/* Book preview section */}
        <section
          aria-labelledby="preview-section"
          className="bg-indigo-50/50 rounded-lg shadow-lg overflow-hidden mb-8"
        >
          <h2 id="preview-section" className="sr-only">
            Book Preview
          </h2>
          <div className="p-6">
            <Suspense
              fallback={
                <div className="flex justify-center items-center p-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              }
            >
              <BookTemplatePreview bookTemplate={processedTemplate} />
            </Suspense>
          </div>
        </section>

        {/* Additional info section with responsive grid */}
        <section aria-labelledby="book-info-section">
          <h2 id="book-info-section" className="sr-only">
            Book Information
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <TemplateDetails
              pageCount={processedTemplate.pageCount}
              minAge={processedTemplate.minAge}
              maxAge={processedTemplate.maxAge}
              genres={processedTemplate.genres}
            />

            <CustomizationOptions />

            <CallToAction templateId={processedTemplate.id} />
          </div>
        </section>
      </>
    );
  } catch (error) {
    logger.error(
      { templateId: id, error },
      "Unexpected error in TemplatePreviewPage"
    );

    return (
      <div role="alert" aria-live="assertive" className="py-8">
        <ErrorAlert message="Sorry, we encountered an error loading the template preview. Please try again later." />
        <div className="mt-4 flex">
          <a
            href="/library"
            className="inline-flex items-center text-primary hover:underline"
          >
            <FiArrowLeft className="mr-2" />
            Return to Library
          </a>
        </div>
      </div>
    );
  }
}
