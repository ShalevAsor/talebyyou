import { createMetadata, generateStructuredData } from "@/config/site";
import TaleByYouLogo from "@/components/layout/Logo";

// Generate metadata using the centralized function
export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about TaleByYou's mission to create personalized AI-powered stories where every child becomes the hero of their own adventure.",
});

export default function AboutPage() {
  // Generate structured data as JSON string
  const structuredData = JSON.stringify(
    generateStructuredData("Organization", {
      foundingDate: "2025",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Tel Aviv",
          addressCountry: "Israel",
        },
      },
    })
  );

  return (
    <section
      id="about-us"
      className="py-12 overflow-hidden"
      aria-labelledby="about-us-title"
    >
      <div className="container px-4 md:px-6 max-w-4xl mx-auto">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: structuredData }}
        />

        {/* Page Header */}
        <div className="text-center mb-12">
          <div className="mb-6">
            <TaleByYouLogo size={120} />
          </div>
          <h1
            id="about-us-title"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            About TaleByYou
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Creating personalized AI-powered stories where every child becomes
            the hero of their own adventure.
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {/* Our Story */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-slate-600">
                <p>
                  TaleByYou was created by combining technical expertise with
                  creative storytelling. As a Computer Science graduate with
                  expertise in AI and fullstack development, I saw an
                  opportunity to revolutionize children's literature using
                  modern technology.
                </p>
                <p>
                  Our stories are crafted by a talented children's book author
                  who brings years of experience in creating engaging,
                  age-appropriate content. Together, we've built a platform that
                  uses AI to generate personalized illustrations while
                  maintaining the heart and soul of great storytelling.
                </p>
                <p>
                  What makes TaleByYou special is this unique blend of
                  cutting-edge AI technology and authentic children's literature
                  expertise, creating books that are both technically advanced
                  and emotionally engaging.
                </p>
              </div>
            </div>
          </div>

          {/* Our Mission */}
          <div className="bg-indigo-50 rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Our Mission
              </h2>
              <div className="space-y-4 text-slate-700">
                <p>
                  At TaleByYou, we believe every child deserves to see
                  themselves as the hero of their own story. Our mission is to
                  inspire a love of reading by creating personalized books where
                  children become the main character of exciting adventures.
                </p>
                <p>
                  Using AI technology, we generate custom illustrations that
                  reflect each child's appearance, making every book truly
                  unique. We're committed to making high-quality, personalized
                  stories accessible to families everywhere.
                </p>
              </div>
            </div>
          </div>

          {/* What Makes Us Different */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                What Makes Us Different
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    AI-Powered Personalization
                  </h3>
                  <p className="text-slate-600">
                    Advanced AI technology creates custom illustrations that
                    match your child's features, making them the true star of
                    every story.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Expert-Crafted Stories
                  </h3>
                  <p className="text-slate-600">
                    Our story templates are written by experienced children's
                    book authors, ensuring engaging, age-appropriate content.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Easy Customization
                  </h3>
                  <p className="text-slate-600">
                    Simple tools let you personalize character details, edit
                    text, and choose from multiple image options for each page.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Digital & Print Options
                  </h3>
                  <p className="text-slate-600">
                    Get instant digital access plus beautiful printed books
                    delivered to your door. Perfect for bedtime stories and
                    keepsakes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Join Us CTA */}
          <div className="bg-indigo-600 text-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-8 md:p-10 text-center">
              <h2 className="text-2xl font-bold mb-4">
                Create Your Child's Adventure Today
              </h2>
              <p className="text-indigo-100 mb-6 max-w-xl mx-auto">
                Ready to make your child the hero of their own story? Explore
                our library of templates and start your personalized adventure
                now.
              </p>
              <a
                href="/library"
                className="inline-flex items-center justify-center h-12 px-8 font-medium tracking-wide text-white transition duration-200 bg-indigo-700 rounded-lg hover:bg-indigo-800 focus:shadow-outline focus:outline-none"
              >
                Explore Our Library
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
