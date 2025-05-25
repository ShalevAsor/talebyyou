import { notFound } from "next/navigation";
import { ErrorAlert } from "@/components/common";
import BookCustomizeClient from "@/components/customization/BookCustomizeClient";
import { getBookTemplateBySlug } from "@/actions/template-actions";
import { Suspense } from "react";
import { Loading } from "@/components/common";
import { logger } from "@/lib/logger";
import PageHeader from "@/components/layout/PageHeader";
import { FiArrowLeft } from "react-icons/fi";
import { createMetadata, siteConfig } from "@/config/site";

interface BookCustomizePageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BookCustomizePageProps) {
  const { slug } = await params;

  try {
    const templateResult = await getBookTemplateBySlug(slug);

    if (templateResult.success) {
      const template = templateResult.data;
      return createMetadata({
        title: `Customize "${template.title}"`,
        description: `Create a personalized version of "${template.title}" with your child as the main character.`,
        image: template.coverImage || "",
        alternates: {
          canonical: `${siteConfig.url}/library/customize/${slug}`,
        },
      });
    }
  } catch (error) {
    logger.error(
      { error, templateSlug: slug },
      "Error generating metadata for customize page"
    );
  }

  // Fallback metadata
  return createMetadata({
    title: "Customize Your Book",
    description:
      "Create a personalized story with your child as the main character",
  });
}

export default async function BookCustomizePage({
  params,
}: BookCustomizePageProps) {
  // Get the ID from params
  const { slug } = await params;

  try {
    // Fetch the book data from our action
    const bookTemplateResult = await getBookTemplateBySlug(slug);

    // Handle errors and not-found states
    if (!bookTemplateResult.success) {
      if (bookTemplateResult.error.includes("not found")) {
        logger.warn(
          { templateSlug: slug },
          "Template not found, showing 404 page"
        );
        notFound();
      }

      logger.error(
        { error: bookTemplateResult.error, templateSlug: slug },
        "Error loading book template for customization"
      );

      return (
        <div role="alert" aria-live="assertive" className="mb-4">
          <ErrorAlert message={bookTemplateResult.error} />
        </div>
      );
    }

    const template = bookTemplateResult.data;

    return (
      <>
        {/* Page Header */}
        <PageHeader
          title={template.title}
          description="Fill out the information below to customize your book and create a personalized story experience"
          actions={[
            {
              label: "Cancel & return to Library",
              href: "/library",
              variant: "outline",
              size: "sm",
              icon: <FiArrowLeft />,
              ariaLabel: "Cancel customization and return to library",
            },
          ]}
          className="mb-2"
          id="customize-page-title"
        />

        {/* Book customization client with Suspense boundary */}
        <section aria-labelledby="customize-section" className="mb-8">
          <h2 id="customize-section" className="sr-only">
            Book Customization Form
          </h2>
          <Suspense
            fallback={
              <div className="p-8 bg-white/50 rounded-lg shadow-sm">
                <Loading
                  message={`Loading customization options for "${template.title}"...`}
                />
              </div>
            }
          >
            <BookCustomizeClient template={template} />
          </Suspense>
        </section>
      </>
    );
  } catch (error) {
    // Handle unexpected errors
    logger.error(
      { templateSlug: slug, error },
      "Unexpected error in BookCustomizePage"
    );

    return (
      <div role="alert" aria-live="assertive" className="py-8">
        <ErrorAlert message="Sorry, we encountered an error loading the customization form. Please try again later." />
        <div className="mt-4">
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
