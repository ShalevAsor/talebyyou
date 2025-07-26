import { Loader2 } from "lucide-react";
import { Suspense, lazy } from "react";

import BlogHeader from "@/components/blog/BlogHeader";
import { createMetadata, generateStructuredData } from "@/config/site";
import { blogCategories, blogPosts } from "@/data/blogData";

// Lazy load components below the fold
const BlogContent = lazy(() => import("@/components/blog/BlogContent"));

// Generate metadata for the blog page
export const metadata = createMetadata({
  title: "Blog - Tips, Ideas & Inspiration for Personalized Children's Books",
  description:
    "Discover expert tips on reading, unique gift ideas, and parenting insights. Learn how personalized books can transform your child's reading experience.",
  type: "website",
});

export default function BlogPage() {
  // Generate structured data for the blog page
  const structuredData = JSON.stringify(
    generateStructuredData("Blog", {
      name: "TaleByYou Blog",
      description:
        "Expert tips, gift ideas, and parenting insights for creating magical reading experiences with personalized children's books.",
      blogPost: blogPosts.map((post) => ({
        "@type": "BlogPosting",
        headline: post.title,
        description: post.excerpt,
        datePublished: post.publishedAt,
        dateModified: post.updatedAt || post.publishedAt,
        author: {
          "@type": "Person",
          name: post.author,
        },
        url: `/blog/${post.slug}`,
        image: post.image
          ? `${process.env.NEXT_PUBLIC_SITE_URL}${post.image}`
          : undefined,
      })),
    })
  );

  return (
    <>
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />

      {/* Above the fold content */}
      <BlogHeader />

      {/* Below the fold content - lazy load */}
      <Suspense
        fallback={
          <div className="container mx-auto px-4 py-16">
            <div className="flex justify-center items-center">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
              <span className="ml-2 text-gray-600">Loading blog posts...</span>
            </div>
          </div>
        }
      >
        <BlogContent posts={blogPosts} categories={blogCategories} />
      </Suspense>
    </>
  );
}
