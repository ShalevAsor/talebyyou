import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock, ArrowLeft, User } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface BlogPostHeaderProps {
  post: BlogPost;
}

export default function BlogPostHeader({ post }: BlogPostHeaderProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <header className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 lg:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Back to Blog Button */}
          <div className="mb-6">
            <Button
              variant="ghost"
              asChild
              className="text-indigo-600 hover:text-indigo-700"
            >
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Blog
              </Link>
            </Button>
          </div>

          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-500">
              <li>
                <Link
                  href="/"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-indigo-600 transition-colors"
                >
                  Blog
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-gray-900 font-medium" aria-current="page">
                {post.category.name}
              </li>
            </ol>
          </nav>

          {/* Category Badge */}
          <div className="mb-4">
            <Badge className={`${post.category.color} font-medium`}>
              {post.category.name}
            </Badge>
          </div>

          {/* Title */}
          <h1 className="text-3xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {post.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {post.excerpt}
          </p>

          {/* Meta Information */}
          <div className="flex flex-wrap items-center gap-6 text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4" aria-hidden="true" />
              <span>By {post.author}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              <time dateTime={post.publishedAt}>
                {formatDate(post.publishedAt)}
              </time>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" aria-hidden="true" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Featured Image */}
          {post.image && (
            <div className="relative rounded-xl overflow-hidden shadow-lg mb-8">
              <Image
                src={post.image}
                alt={`Featured image for ${post.title}`}
                width={1200}
                height={600}
                className="w-full h-64 lg:h-96 object-cover"
                sizes="(max-width: 768px) 100vw, 1200px" // Add responsive sizes
                quality={75} // Add quality control
                priority
              />
            </div>
          )}

          {/* Tags */}
          <div
            className="flex flex-wrap gap-2"
            role="list"
            aria-label="Article tags"
          >
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="text-sm text-gray-600 hover:text-indigo-600 transition-colors"
                role="listitem"
              >
                #{tag}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
