// src/app/(main)/blog/[slug]/page.tsx
import { Suspense, lazy } from "react";
import { notFound } from "next/navigation";
import { Loader2 } from "lucide-react";
import {
  createMetadata,
  generateStructuredData,
  generateBreadcrumbSchema,
} from "@/config/site";
import { getPostBySlug, getRelatedPosts } from "@/data/blogData";
import BlogPostHeader from "@/components/blog/BlogPostHeader";

// Lazy load components below the fold
const BlogPostContent = lazy(() => import("@/components/blog/BlogPostContent"));
const RelatedPosts = lazy(() => import("@/components/blog/RelatedPosts"));
const BlogPostShare = lazy(() => import("@/components/blog/BlogPostShare"));

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Generate metadata for each blog post
export async function generateMetadata({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return createMetadata({
      title: "Post Not Found",
      description: "The blog post you're looking for doesn't exist.",
      noIndex: true,
    });
  }

  return createMetadata({
    title: post.title,
    description: post.metaDescription || post.excerpt,
    type: "article",
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = getRelatedPosts(post, 3);

  // Generate structured data for the blog post
  const structuredData = JSON.stringify(
    generateStructuredData("BlogPosting", {
      headline: post.title,
      description: post.excerpt,
      datePublished: post.publishedAt,
      dateModified: post.updatedAt || post.publishedAt,
      author: {
        "@type": "Person",
        name: post.author,
      },
      publisher: {
        "@type": "Organization",
        name: "TaleByYou",
        logo: {
          "@type": "ImageObject",
          url: `${process.env.NEXT_PUBLIC_SITE_URL}/logo.png`,
        },
      },
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": `${process.env.NEXT_PUBLIC_SITE_URL}/blog/${post.slug}`,
      },
      image: post.image
        ? `${process.env.NEXT_PUBLIC_SITE_URL}${post.image}`
        : undefined,
      articleSection: post.category.name,
      keywords: post.tags.join(", "),
      wordCount: post.content.split(" ").length,
      timeRequired: `PT${post.readTime}M`,
    })
  );

  // Generate breadcrumb structured data
  const breadcrumbData = JSON.stringify(
    generateBreadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Blog", url: "/blog" },
      { name: post.title, url: `/blog/${post.slug}` },
    ])
  );

  return (
    <>
      {/* Structured data for search engines */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: structuredData }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: breadcrumbData }}
      />

      {/* Above the fold content */}
      <BlogPostHeader post={post} />

      {/* Below the fold content - lazy load */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Suspense
            fallback={
              <div className="flex justify-center items-center py-16">
                <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
                <span className="ml-2 text-gray-600">Loading article...</span>
              </div>
            }
          >
            <BlogPostContent content={post.content} />
          </Suspense>

          <Suspense
            fallback={
              <div className="flex justify-center items-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
              </div>
            }
          >
            <BlogPostShare post={post} />
          </Suspense>

          {relatedPosts.length > 0 && (
            <Suspense
              fallback={
                <div className="flex justify-center items-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                </div>
              }
            >
              <RelatedPosts posts={relatedPosts} />
            </Suspense>
          )}
        </div>
      </div>
    </>
  );
}
