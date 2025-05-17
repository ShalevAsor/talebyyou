// components/home/BestSellers.tsx
import { getAllBookTemplates } from "@/actions/template-actions";
import { BookTemplateCard } from "@/components/templates/BookTemplateCard";
import { BookTemplate } from "@/generated/prisma";

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
          price: "44.99", // Replace with actual price if available
          priceCurrency: "USD", // Replace with actual currency if available
        },
      },
    })),
  };
}

export default async function BestSellers() {
  const templatesResult = await getAllBookTemplates({ limit: 3 });

  if (!templatesResult.success) {
    console.error("Error fetching templates", templatesResult.error);
    return (
      <section
        className="bg-white py-4 md:py-8"
        aria-labelledby="best-sellers-title"
      >
        <div className="container px-4 md:px-6">
          <h2
            id="best-sellers-title"
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-800"
          >
            Best Sellers
          </h2>
          <p className="text-center text-gray-500" role="status">
            {
              " We couldn't load the best sellers right now. Please check back later."
            }
          </p>
        </div>
      </section>
    );
  }

  const templates = templatesResult.data;

  if (templates.length === 0) {
    return (
      <section
        className="bg-white py-4 md:py-8"
        aria-labelledby="best-sellers-title"
      >
        <div className="container px-4 md:px-6">
          <h2
            id="best-sellers-title"
            className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-800"
          >
            Best Sellers
          </h2>
          <p className="text-center text-gray-500" role="status">
            No templates found. New books coming soon!
          </p>
        </div>
      </section>
    );
  }

  // Generate structured data for SEO
  const structuredData = generateBooksStructuredData(templates);

  return (
    <section
      className="bg-white py-4 md:py-8"
      aria-labelledby="best-sellers-title"
    >
      <div className="container px-4 md:px-6">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />

        <h2
          id="best-sellers-title"
          className="text-3xl md:text-4xl font-bold text-center mb-4 text-indigo-800"
        >
          Best Sellers
        </h2>

        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          role="list"
          aria-label="Best selling book templates"
        >
          {templates.map((template) => (
            <div key={template.id} role="listitem">
              <BookTemplateCard template={template} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
