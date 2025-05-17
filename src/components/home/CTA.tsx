"use client";

import { Button } from "@/components/ui/button";
import { BookOpen, Star, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

// Define feature items for better organization
const features = [
  {
    id: "books",
    icon: <BookOpen className="w-6 h-6 text-indigo-600" />,
    label: "5,000+ Books",
  },
  {
    id: "curated",
    icon: <Star className="w-6 h-6 text-indigo-600" />,
    label: "Curated Selection",
  },
  {
    id: "ages",
    icon: <Users className="w-6 h-6 text-indigo-600" />,
    label: "All Ages",
  },
];

export default function CTASection() {
  // Animation variants for consistent animations
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const buttonHover = {
    rest: { scale: 1 },
    hover: { scale: 1.05 },
    tap: { scale: 0.98 },
  };

  // Optional structured data for SEO
  const ctaSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#cta-heading", "#cta-description"],
    },
    mainEntity: {
      "@type": "Action",
      name: "Explore Our Library",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "/library",
      },
    },
  };

  return (
    <section
      className="py-8 px-4 md:px-6 lg:px-8 bg-white"
      aria-labelledby="cta-heading"
      role="region"
    >
      {/* Add structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(ctaSchema) }}
      />

      <div className="max-w-4xl mx-auto">
        <div className="bg-indigo-50 rounded-2xl overflow-hidden shadow-sm border border-indigo-100">
          <div className="p-8 md:p-12 flex flex-col items-center text-center">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mb-8"
            >
              <h2
                id="cta-heading"
                className="text-3xl md:text-4xl font-bold text-indigo-800 mb-4"
              >
                Discover Magical Stories
              </h2>
              <p
                id="cta-description"
                className="text-lg text-indigo-600 max-w-2xl mx-auto"
              >
                {
                  "Explore our collection of handpicked children's books for every age and interest"
                }
              </p>
            </motion.div>

            <div
              className="flex flex-wrap justify-center gap-12 mb-10"
              aria-label="Key features"
            >
              {features.map((feature) => (
                <div key={feature.id} className="flex flex-col items-center">
                  <div
                    className="bg-white p-3 rounded-full shadow-sm border border-indigo-100 mb-3"
                    aria-hidden="true" // Icon is decorative
                  >
                    {feature.icon}
                  </div>
                  <p className="font-medium text-indigo-800">{feature.label}</p>
                </div>
              ))}
            </div>

            <motion.div
              initial="rest"
              whileHover="hover"
              whileTap="tap"
              variants={buttonHover}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <Button
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
                asChild
              >
                <Link
                  href="/library"
                  aria-label="Explore our library of children's books"
                >
                  Explore Our Library
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
