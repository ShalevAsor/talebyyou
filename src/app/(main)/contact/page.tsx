// src/app/(main)/contact/page.tsx
import { Suspense } from "react";
import { ContactContent } from "@/components/contact/ContactContent";
import PageHeader from "@/components/layout/PageHeader";
import { createMetadata, generateStructuredData } from "@/config/site";
import { Loading } from "@/components/common";
import appConfig from "@/lib/config";
import { siteConfig } from "@/config/site";
// Generate metadata using your centralized function
export const metadata = createMetadata({
  title: "Contact Us - Custom Books Store",
  description:
    "Get in touch with our team for any questions or support with your custom children's books. We're here to help with your inquiries.",
});

/**
 * Contact page component that displays the contact form and information
 * Server component that handles layout and page structure
 */
export default async function ContactPage() {
  // Generate structured data for contact page
  const structuredData = generateStructuredData("ContactPage", {
    mainEntity: {
      "@type": "Organization",
      name: siteConfig.name,
      contactPoint: {
        "@type": "ContactPoint",
        email: appConfig.EMAIL.SUPPORT,
        contactType: "customer service",
      },
    },
  });

  return (
    <>
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Page Header */}
      <PageHeader
        title="Contact Us"
        description="Have questions or need help? We're here for you."
      />

      {/* Main content with Suspense boundary */}
      <section aria-labelledby="contact-section" className="my-8">
        <h2 id="contact-section" className="sr-only">
          Contact Form
        </h2>
        <Suspense fallback={<Loading message="Loading Contact Form..." />}>
          <ContactContent />
        </Suspense>
      </section>
    </>
  );
}
