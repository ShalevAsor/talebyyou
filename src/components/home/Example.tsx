"use client";

import { ArrowRight, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { siteConfig } from "@/config/site";

export default function Example() {
  // For SEO - structured data for this example section
  const demoSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: siteConfig.images.homePage.example.after,
    description:
      "Example of AI-generated illustration from a child's photo for personalized children's books",
    name: "BookWizard AI Image Generation Example",
  };

  return (
    <section
      className="py-8 px-4 lg:px-6 bg-indigo-50 dark:bg-indigo-950/30 rounded-md"
      aria-labelledby="example-section-title"
    >
      {/* Structured data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(demoSchema) }}
      />

      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2
            id="example-section-title"
            className="text-3xl md:text-4xl font-bold text-indigo-900 dark:text-indigo-100 mb-4"
          >
            See the Magic Happen
          </h2>
          <p className="text-lg text-indigo-700 dark:text-indigo-300 max-w-2xl mx-auto">
            Upload a photo and our platform uses AI to turn it into a unique,
            illustrated story image.
          </p>
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 max-w-5xl mx-auto"
          aria-label="Image transformation demonstration"
        >
          {/* Original Image */}
          <div className="relative w-full md:w-2/5">
            <Card className="border-indigo-200 dark:border-indigo-800 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={siteConfig.images.homePage.example.before}
                    alt="Original photo of a child that will be transformed into a book illustration"
                    fill
                    sizes="(max-width: 768px) 320px, 300px" // More specific pixel values
                    quality={75} // Add explicit quality control
                    className="object-cover"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ij48L3JlY3Q+PC9zdmc+"
                  />
                </div>
              </CardContent>
            </Card>
            <div
              className="absolute top-4 left-4 bg-white dark:bg-indigo-950 text-indigo-900 dark:text-indigo-100 px-3 py-1 rounded-full text-sm font-medium shadow-md"
              aria-hidden="true" // This is decorative, the alt text on the image already describes this
            >
              Original Image
            </div>
          </div>

          {/* Arrow */}
          <div className="flex justify-center items-center" aria-hidden="true">
            <div
              className="bg-indigo-600 rounded-full p-3 shadow-lg"
              role="presentation"
            >
              <ArrowRight className="h-8 w-8 text-white" />
            </div>
          </div>

          {/* AI Generated Image */}
          <div className="relative w-full md:w-2/5">
            <Card className="border-indigo-200 dark:border-indigo-800 overflow-hidden shadow-lg">
              <CardContent className="p-0">
                <div className="aspect-square relative">
                  <Image
                    src={siteConfig.images.homePage.example.after}
                    alt="AI-generated book illustration transformed from the original photo"
                    fill
                    sizes="(max-width: 768px) 320px, 300px" // More specific pixel values
                    quality={75} // Add explicit quality control
                    className="object-center"
                    placeholder="blur"
                    blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZWRlOWZlIj48L3JlY3Q+PC9zdmc+"
                  />
                </div>
              </CardContent>
            </Card>
            <div
              className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow-md flex items-center"
              aria-hidden="true" // This is decorative, the alt text on the image already describes this
            >
              <Sparkles className="h-4 w-4 mr-1" />
              AI Generated Book
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="text-center mt-12">
          <p className="text-xl text-indigo-800 dark:text-indigo-200 font-medium mb-8">
            {
              "            Transform your child's photo into a magical adventure story"
            }
          </p>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-6 text-lg"
            asChild
          >
            <Link
              href="/library"
              aria-label="Create your custom book now - browse our library"
            >
              Create Your Custom Book Now
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
