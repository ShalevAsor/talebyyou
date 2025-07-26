"use client";

import { Star } from "lucide-react";
import { useCallback, useState } from "react";

import { testimonials } from "@/data/testimonials";

export default function Testimonials() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  // Use useCallback to improve performance
  const handleMouseEnter = useCallback((index: number) => {
    setHoveredIndex(index);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setHoveredIndex(null);
  }, []);

  // Schema.org structured data for reviews
  const reviewsSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: "Custom Children's Books",
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5.0",
      reviewCount: testimonials.length,
    },
    review: testimonials.map((testimonial) => ({
      "@type": "Review",
      reviewRating: {
        "@type": "Rating",
        ratingValue: testimonial.rating,
      },
      author: {
        "@type": "Person",
        name: testimonial.name,
      },
      reviewBody: testimonial.quote,
    })),
  };

  return (
    <section
      className="py-16 px-4 md:px-6 lg:px-8 relative overflow-hidden"
      aria-labelledby="testimonials-title"
    >
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewsSchema) }}
      />

      <div className="container mx-auto relative">
        <div className="text-center mb-12 relative">
          <div className="inline-block">
            <h2
              id="testimonials-title"
              className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-4 relative"
            >
              <span
                className="absolute -top-6 -left-6 text-6xl text-indigo-300 dark:text-indigo-700 opacity-50 font-serif"
                aria-hidden="true"
              >
                &ldquo;
              </span>
              Customer Stories
              <span
                className="absolute -bottom-12 -right-6 text-6xl text-indigo-300 dark:text-indigo-700 opacity-50 font-serif"
                aria-hidden="true"
              >
                &rdquo;
              </span>
            </h2>
          </div>
          <p className="text-lg text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto">
            See how others have transformed their images into stunning custom
            illustrations
          </p>
        </div>

        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto"
          role="list"
          aria-label="Customer testimonials"
        >
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
              role="listitem"
            >
              <div
                className={`relative z-10 bg-white dark:bg-indigo-950/50 p-6 md:p-8 rounded-lg shadow-lg
                  border-2 border-transparent transition-all duration-300
                  ${
                    hoveredIndex === index
                      ? "border-indigo-400 dark:border-indigo-600 -translate-y-2"
                      : ""
                  }`}
              >
                {/* Rating stars with animation */}
                <div
                  className="flex mb-4"
                  aria-label={`Rating: ${testimonial.rating} out of 5 stars`}
                >
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300"
                      } ${
                        hoveredIndex === index && i < testimonial.rating
                          ? "animate-pulse"
                          : ""
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-indigo-900 dark:text-indigo-100 mb-6 relative">
                  <span
                    className="font-serif text-4xl text-indigo-300 dark:text-indigo-700 absolute -top-3 -left-1"
                    aria-hidden="true"
                  >
                    &ldquo;
                  </span>
                  <p>{testimonial.quote}</p>
                  <span
                    className="font-serif text-4xl text-indigo-300 dark:text-indigo-700 absolute -bottom-6 right-0"
                    aria-hidden="true"
                  >
                    &rdquo;
                  </span>
                </blockquote>

                {/* Unique divider */}
                <div className="flex items-center my-4" aria-hidden="true">
                  <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
                  <div className="mx-2 w-2 h-2 rounded-full bg-indigo-500 dark:bg-indigo-600"></div>
                  <div className="h-0.5 flex-grow bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"></div>
                </div>

                {/* Customer info with creative layout */}
                <div className="flex flex-col items-center text-center">
                  <p className="font-bold text-indigo-900 dark:text-indigo-100">
                    {testimonial.name}
                  </p>
                  <div className="mt-2 px-4 py-1 bg-indigo-100 dark:bg-indigo-800 rounded-full">
                    <span className="text-sm text-indigo-700 dark:text-indigo-300">
                      <span className="sr-only">Child: </span>
                      {testimonial.childName}, age {testimonial.childAge} •{" "}
                      {testimonial.productType}
                    </span>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div
                className={`absolute inset-0 bg-gradient-to-br from-indigo-200 to-indigo-400 
                  dark:from-indigo-800 dark:to-indigo-600 rounded-lg -z-10 
                  transition-all duration-300
                  ${
                    hoveredIndex === index ? "opacity-50 blur-md" : "opacity-0"
                  }`}
                aria-hidden="true"
              ></div>
            </div>
          ))}
        </div>

        {/* Call to Action with unique design */}
        <div className="text-center mt-16 relative">
          <div
            className="absolute inset-x-0 top-1/2 transform -translate-y-1/2 h-0.5 bg-gradient-to-r from-transparent via-indigo-300 dark:via-indigo-700 to-transparent"
            aria-hidden="true"
          ></div>
        </div>
      </div>
    </section>
  );
}
