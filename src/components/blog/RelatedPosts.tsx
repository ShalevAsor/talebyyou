// src/components/blog/RelatedPosts.tsx
import Link from "next/link";
import Image from "next/image";
import { Clock, ArrowRight } from "lucide-react";
import { RelatedPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface RelatedPostsProps {
  posts: RelatedPost[];
}

export default function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section
      className="py-12 border-t border-gray-200"
      aria-labelledby="related-posts-heading"
    >
      <div className="mb-8">
        <h2
          id="related-posts-heading"
          className="text-3xl font-bold text-gray-900 mb-4"
        >
          Related Articles
        </h2>
        <p className="text-gray-600 text-lg">
          Continue your reading journey with these related topics
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <Card
            key={post.slug}
            className="group hover:shadow-lg transition-all duration-300 h-full"
          >
            <Link href={`/blog/${post.slug}`} className="block h-full">
              {/* Image */}
              <div className="relative h-48 overflow-hidden rounded-t-lg">
                {post.image ? (
                  <Image
                    src={post.image}
                    alt={`Featured image for ${post.title}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                    <div className="text-indigo-400">
                      <svg
                        className="w-8 h-8"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z" />
                      </svg>
                    </div>
                  </div>
                )}

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                  <Badge
                    className={`${post.category.color} font-medium text-xs`}
                  >
                    {post.category.name}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col h-full">
                {/* Reading Time */}
                <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
                  <Clock className="h-3 w-3" aria-hidden="true" />
                  <span>{post.readTime} min read</span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 text-lg flex-grow">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 mb-4 line-clamp-2 text-sm">
                  {post.excerpt}
                </p>

                {/* Read More */}
                <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700 mt-auto">
                  <span>Read more</span>
                  <ArrowRight
                    className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {/* View All Posts Button */}
      <div className="mt-12 text-center">
        <Button asChild variant="outline" size="lg">
          <Link href="/blog" className="flex items-center gap-2">
            View All Articles
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </Button>
      </div>
    </section>
  );
}
