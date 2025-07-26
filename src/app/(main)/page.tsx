import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";

import BestSellers from "@/components/home/BestSellers";
import Hero from "@/components/home/Hero";
import HowItWorks from "@/components/home/HowItWorks";
import { createMetadata, generateStructuredData } from "@/config/site";

// Lazy load components that are likely below the fold
const Example = lazy(() => import("@/components/home/Example"));
const Testimonials = lazy(() => import("@/components/home/Testimonials"));
const QASection = lazy(() => import("@/components/home/QASection"));
const CTASection = lazy(() => import("@/components/home/CTA"));

// Generate metadata using our centralized function
export const metadata = createMetadata();

export default function HomePage() {
  // Generate structured data as JSON string
  const structuredData = JSON.stringify(generateStructuredData("WebSite"));

  return (
    <>
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      {/* Above the fold content - load immediately */}
      <Hero />
      <HowItWorks />

      {/* Below the fold content - lazy load with Suspense */}
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <BestSellers />
      </Suspense>
      <Suspense
        fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <Example />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <Testimonials />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <QASection />
      </Suspense>

      <Suspense
        fallback={
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        }
      >
        <CTASection />
      </Suspense>
    </>
  );
}
