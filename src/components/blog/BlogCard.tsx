// src/components/blog/BlogCard.tsx
import Link from "next/link";
import Image from "next/image";
import { Clock, Calendar, ArrowRight } from "lucide-react";
import { BlogPostCard } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface BlogCardProps {
  post: BlogPostCard;
  featured?: boolean;
}

export default function BlogCard({ post, featured = false }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 border-0 shadow-md h-full">
      <Link
        href={`/blog/${post.slug}`}
        className="block h-full"
        aria-label={`Read article: ${post.title}`}
      >
        {/* Image */}
        <div
          className={`relative overflow-hidden ${featured ? "h-48" : "h-40"}`}
        >
          {post.image ? (
            <Image
              src={post.image}
              alt={`Featured image for ${post.title}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 768px) 320px, (max-width: 1200px) 400px, 350px" // More specific pixel values
              quality={75} // Add quality control
              loading="lazy" // Add lazy loading for blog cards
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
              <div className="text-indigo-400">
                <svg
                  className="w-12 h-12"
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
              variant="secondary"
              className={`${post.category.color} font-medium`}
            >
              {post.category.name}
            </Badge>
          </div>

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-3 right-3">
              <Badge className="bg-amber-500 hover:bg-amber-600 text-white">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6 flex flex-col h-full">
          {/* Meta Information */}
          <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" aria-hidden="true" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <h3
            className={`font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors line-clamp-2 ${
              featured ? "text-xl" : "text-lg"
            }`}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p className="text-gray-600 mb-4 line-clamp-3 flex-grow">
            {post.excerpt}
          </p>

          {/* Tags */}
          <div
            className="flex flex-wrap gap-2 mb-4"
            role="list"
            aria-label="Article tags"
          >
            {post.tags.slice(0, 3).map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-xs text-gray-500 hover:text-indigo-600"
                role="listitem"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* Author and Read More */}
          <div className="flex items-center justify-between mt-auto">
            <div className="text-sm text-gray-500">By {post.author}</div>
            <div className="flex items-center text-indigo-600 text-sm font-medium group-hover:text-indigo-700">
              <span>Read more</span>
              <ArrowRight
                className="h-3 w-3 ml-1 group-hover:translate-x-1 transition-transform"
                aria-hidden="true"
              />
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
