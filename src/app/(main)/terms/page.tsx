import { Metadata } from "next";
import { createMetadata, generateStructuredData } from "@/config/site";
import {
  termsLastUpdated,
  termsOfUseSections,
  relatedLinks,
} from "@/data/termsOfUseData";

// Generate metadata using the centralized function
export const metadata: Metadata = createMetadata({
  title: "Terms of Use",
  description:
    "Read the Terms of Use for BookWizard. These terms govern your use of our platform for creating personalized children's books.",
});

export default function TermsOfUsePage() {
  // Generate structured data as JSON string
  const structuredData = JSON.stringify(
    generateStructuredData("WebPage", {
      mainContentOfPage: "Terms of Use for BookWizard",
      datePublished: termsLastUpdated,
    })
  );

  return (
    <section
      id="terms-of-use"
      className="py-12 overflow-hidden"
      aria-labelledby="terms-of-use-title"
    >
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1
            id="terms-of-use-title"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            Terms of Use
          </h1>
          <p className="text-slate-600">Last Updated: {termsLastUpdated}</p>
        </div>

        {/* Table of Contents */}
        <div className="bg-indigo-50 rounded-xl p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4 text-slate-800">
            Table of Contents
          </h2>
          <nav aria-label="Table of contents">
            <ul className="space-y-2">
              {termsOfUseSections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-indigo-600 hover:text-indigo-800 hover:underline"
                  >
                    {section.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Terms Content */}
        <div className="space-y-10">
          {termsOfUseSections.map((section) => (
            <div key={section.id} id={section.id} className="scroll-mt-20">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {section.title}
              </h2>
              <div className="prose prose-slate max-w-none">
                {section.content.split("\n\n").map((paragraph, idx) => (
                  <p key={idx} className="text-slate-600 mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Related Links */}
        <div className="mt-16 pt-8 border-t border-slate-200">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            Related Information
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {relatedLinks.map((link, idx) => (
              <a
                key={idx}
                href={link.href}
                className="block p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow"
              >
                <h3 className="text-lg font-semibold text-indigo-600 mb-2">
                  {link.title}
                </h3>
                <p className="text-sm text-slate-600">{link.description}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
