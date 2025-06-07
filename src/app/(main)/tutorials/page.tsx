import { Suspense } from "react";
import { TutorialsContent } from "@/components/tutorials/TutorialsContent";
import PageHeader from "@/components/layout/PageHeader";
import { BookStoreLoading } from "@/components/common/BookStoreLoading";
import { createMetadata, generateStructuredData } from "@/config/site";
import { tutorialsData } from "@/data/tutorialsData";

export const metadata = createMetadata({
  title: "Tutorials - Learn How to Create Personalized Books",
  description:
    "Watch our step-by-step video tutorials to learn how to create, customize, and order personalized children's books. Easy guides for every step of the process.",
});

export default function TutorialsPage() {
  // Generate structured data for video tutorials
  const structuredData = generateStructuredData("CollectionPage", {
    mainEntity: {
      "@type": "ItemList",
      itemListElement: tutorialsData.map((tutorial, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: {
          "@type": "VideoObject",
          name: tutorial.title,
          description: tutorial.description,
          duration: `PT${tutorial.duration.replace(":", "M")}S`, // Convert to ISO 8601 duration
          thumbnailUrl: tutorial.thumbnail,
          uploadDate: new Date().toISOString(), // You can set actual upload dates later
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
        title="Tutorials"
        description="Learn how to create amazing personalized books with our easy-to-follow video guides"
      />

      <section aria-labelledby="tutorials-section">
        <h2 id="tutorials-section" className="sr-only">
          Video Tutorials
        </h2>
        <Suspense
          fallback={
            <BookStoreLoading
              message="Loading Tutorials..."
              subMessage="Preparing your learning experience"
              variant="pagesTurn"
              size="md"
              icon="library"
              className="min-h-[60vh]"
            />
          }
        >
          <TutorialsContent />
        </Suspense>
      </section>
    </>
  );
}
