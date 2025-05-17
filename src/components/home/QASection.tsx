"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faqData";

export default function QASection() {
  // Schema.org structured data for FAQs
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <section
      id="faq"
      className="py-16 px-4 md:px-6 lg:px-8 bg-indigo-50 rounded-md"
      aria-labelledby="faq-title"
    >
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2
            id="faq-title"
            className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4"
          >
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-indigo-600 max-w-2xl mx-auto">
            {
              " Everything you need to know about our magical world of children's books"
            }
          </p>
        </div>

        <Accordion
          type="single"
          collapsible
          className="w-full"
          // Add these for better accessibility
          defaultValue={undefined}
        >
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className="bg-white rounded-lg mb-4 shadow-sm border border-indigo-100"
            >
              <AccordionTrigger className="px-6 py-4 text-indigo-900 hover:text-indigo-700 font-medium text-left">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-indigo-700">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
