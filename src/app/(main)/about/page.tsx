import { createMetadata, generateStructuredData } from "@/config/site";

// Generate metadata using the centralized function
export const metadata = createMetadata({
  title: "About Us",
  description:
    "Learn about BookWizard's mission to create personalized stories where every child becomes the hero of their own adventure.",
});

export default function AboutPage() {
  // Generate structured data as JSON string
  const structuredData = JSON.stringify(
    generateStructuredData("Organization", {
      foundingDate: "2024",
      foundingLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "New York",
          addressCountry: "USA",
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
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              aria-hidden="true"
            >
              <path d="M12 21a9 9 0 0 0 0-18" />
              <path d="M3.6 9h16.8" />
              <path d="M3.6 15h16.8" />
              <path d="M12 3a9 9 0 0 1 0 18" />
            </svg>
          </div>
          <h1
            id="about-us-title"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            About BookWizard
          </h1>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            Creating personalized stories where every child becomes the hero of
            their own adventure.
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
                  BookWizard was born from a simple observation: children are
                  most engaged with stories when they can see themselves in
                  them. Our founder noticed how their own child lit up when
                  hearing stories featuring characters with their name and
                  traits similar to their own.
                </p>
                <p>
                  What began as a small project in 2024 quickly evolved into
                  something bigger. We assembled a team of children's literature
                  experts, illustrators, and developers to create a platform
                  where families could easily create truly personalized stories.
                </p>
                <p>
                  Today, BookWizard combines cutting-edge technology with
                  timeless storytelling to create books that children don't just
                  read—they experience. Each story is uniquely tailored to
                  reflect the child's appearance, name, and personal details,
                  making them the true hero of their adventure.
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
                  At BookWizard, our mission is to inspire a love of reading by
                  creating personalized stories that capture children's
                  imagination and boost their confidence. We believe that when
                  children see themselves as the protagonists of exciting
                  adventures, they develop a deeper connection to reading and
                  storytelling.
                </p>
                <p>
                  We're committed to making high-quality, personalized books
                  accessible to families everywhere. Whether through digital
                  ebooks or beautifully printed physical copies, we want every
                  child to experience the magic of being the hero in their own
                  story.
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
                    Personalized Adventures
                  </h3>
                  <p className="text-slate-600">
                    Our stories adapt to your child's appearance, name, and
                    preferences, creating a truly unique adventure where they
                    are the main character.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Advanced AI Illustrations
                  </h3>
                  <p className="text-slate-600">
                    We use state-of-the-art AI technology to generate custom
                    illustrations that match your child's features, making each
                    book visually unique.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Educational Value
                  </h3>
                  <p className="text-slate-600">
                    Each story is designed with child development experts to
                    encourage reading, build vocabulary, and teach valuable life
                    lessons.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Premium Quality
                  </h3>
                  <p className="text-slate-600">
                    Whether digital or physical, our books are crafted with the
                    highest quality standards. Physical books feature premium
                    paper and binding that will last for years.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Our Values */}
          <div className="bg-white rounded-2xl shadow-md overflow-hidden">
            <div className="p-8 md:p-10">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Our Values
              </h2>
              <div className="space-y-5">
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Imagination & Creativity
                  </h3>
                  <p className="text-slate-600">
                    We believe in the power of imagination to shape how children
                    see themselves and the world. Our books encourage creative
                    thinking and problem-solving through engaging narratives.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Inclusivity & Representation
                  </h3>
                  <p className="text-slate-600">
                    Every child deserves to see themselves as the hero. Our
                    personalization options embrace diversity in all forms,
                    allowing children of all backgrounds to be represented.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-indigo-700 mb-2">
                    Quality & Craftsmanship
                  </h3>
                  <p className="text-slate-600">
                    From the narratives we craft to the physical books we print,
                    quality is never compromised. We take pride in creating
                    keepsakes that families will treasure.
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
