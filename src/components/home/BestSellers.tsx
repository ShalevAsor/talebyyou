import { getAllBookTemplates } from "@/actions/template-actions";
import { BookTemplateCard } from "@/components/templates/BookTemplateCard";
import { BookTemplate } from "@prisma/client";

// Generate structured data for product listings (for SEO)
function generateBooksStructuredData(templates: BookTemplate[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: templates.map((template, index) => ({
      "@type": "ListItem",
      position: index + 1,
      item: {
        "@type": "Product",
        name: template.title,
        description: template.description,
        image: template.coverImage,
        url: `/library/template-preview/${template.id}`,
        offers: {
          "@type": "Offer",
          availability: "https://schema.org/InStock",
          price: "44.99",
          priceCurrency: "USD",
        },
      },
    })),
  };
}

export default async function BestSellers() {
  // Try with explicit parameters
  const templatesResult = await getAllBookTemplates({
    limit: 3,
    publishedOnly: true, // Explicitly set this
  });

  if (!templatesResult.success) {
    console.error("❌ Error fetching templates:", templatesResult.error);
    return (
      <section className="bg-white py-4 md:py-8">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-800">
            Best Sellers
          </h2>
          <p className="text-center text-gray-500">
            We couldn't load the best sellers right now. Please check back
            later.
          </p>
          <p className="text-center text-red-500 text-sm mt-2">
            Error: {templatesResult.error}
          </p>
        </div>
      </section>
    );
  }

  const templates = templatesResult.data;

  if (templates.length === 0) {
    return (
      <section className="bg-white py-4 md:py-8">
        <div className="container px-4 md:px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-800">
            Best Sellers
          </h2>
          <p className="text-center text-gray-500">
            No published templates found. New books coming soon!
          </p>
          <div className="text-center text-sm text-gray-400 mt-2">
            Debug: Check that templates are published and have real images
          </div>
        </div>
      </section>
    );
  }

  // Generate structured data for SEO
  const structuredData = generateBooksStructuredData(templates);

  return (
    <section className="bg-white py-4 md:py-8">
      <div className="container px-4 md:px-6">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-800">
          Best Sellers
        </h2>

        {/* Debug info */}
        <div className="text-center text-sm text-gray-500 mb-4">
          Showing {templates.length} template{templates.length !== 1 ? "s" : ""}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((template) => (
            <div key={template.id}>
              <BookTemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
