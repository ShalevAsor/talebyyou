// src/components/blog/BlogSidebar.tsx
import Link from "next/link";
import {
  BookOpen,
  Gift,
  Heart,
  Lightbulb,
  Sparkles,
  TrendingUp,
  Star,
} from "lucide-react";
import { BlogCategory, BlogPostCard } from "@/types/blog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import TaleByYouLogo from "@/components/layout/Logo"; // Adjust path as needed

interface BlogSidebarProps {
  categories: BlogCategory[];
  posts: BlogPostCard[];
  onCategorySelect?: (slug: string) => void;
}

const iconMap = {
  BookOpen,
  Gift,
  Heart,
  Lightbulb,
  Sparkles,
};

export default function BlogSidebar({
  categories,
  posts,
  onCategorySelect,
}: BlogSidebarProps) {
  // Get popular posts (featured posts + most recent)
  const popularPosts = posts
    .sort((a, b) => {
      // Prioritize featured posts
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      // Then sort by date
      return (
        new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
      );
    })
    .slice(0, 4);

  // Get post counts by category
  const categoryStats = categories.map((category) => ({
    ...category,
    count: posts.filter((post) => post.category.slug === category.slug).length,
  }));

  const handleCategoryClick = (slug: string) => {
    if (onCategorySelect) {
      onCategorySelect(slug);
    }
  };

  return (
    <div className="space-y-6">
      {/* Categories */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <TrendingUp
              className="h-5 w-5 text-indigo-600"
              aria-hidden="true"
            />
            Categories
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {categoryStats.map((category) => {
            const IconComponent =
              iconMap[category.icon as keyof typeof iconMap] || BookOpen;

            return (
              <button
                key={category.slug}
                onClick={() => handleCategoryClick(category.slug)}
                className="w-full text-left p-3 rounded-lg hover:bg-gray-50 transition-colors group cursor-pointer"
                aria-label={`Filter by ${category.name} category (${category.count} articles)`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      className={`p-2 rounded-lg ${category.color
                        .replace("text-", "text-")
                        .replace("bg-", "bg-")}`}
                    >
                      <IconComponent className="h-4 w-4" aria-hidden="true" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 group-hover:text-indigo-600">
                        {category.name}
                      </div>
                      <div className="text-xs text-gray-500">
                        {category.description}
                      </div>
                    </div>
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {category.count}
                  </Badge>
                </div>
              </button>
            );
          })}
        </CardContent>
      </Card>

      {/* Popular Posts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-gray-900 flex items-center gap-2">
            <Star className="h-5 w-5 text-amber-500" aria-hidden="true" />
            Popular Posts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {popularPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              aria-label={`Read popular article: ${post.title}`}
            >
              <div className="flex gap-3">
                <div
                  className="text-2xl font-bold text-indigo-200 min-w-[24px]"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 group-hover:text-indigo-600 line-clamp-2 text-sm mb-1">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Badge className={`${post.category.color} text-xs`}>
                      {post.category.name}
                    </Badge>
                    <span aria-hidden="true">•</span>
                    <span>{post.readTime} min</span>
                    {post.featured && (
                      <>
                        <span aria-hidden="true">•</span>
                        <Star
                          className="h-3 w-3 text-amber-500 fill-current"
                          aria-hidden="true"
                        />
                      </>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className="flex justify-center">
              <TaleByYouLogo size={60} showText={false} />
            </div>
          </div>
          <h3 className="font-semibold text-gray-900 mb-2">
            Ready to Create Magic?
          </h3>
          <p className="text-sm text-gray-600 mb-4">
            Turn your child into the hero of their own personalized story.
          </p>
          <Button asChild className="w-full">
            <Link href="/library">Browse Templates</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Newsletter Signup (Optional) */}
      <Card>
        <CardContent className="p-6 text-center">
          <h3 className="font-semibold text-gray-900 mb-2">Get Reading Tips</h3>
          <p className="text-sm text-gray-600 mb-4">
            Subscribe for weekly tips on encouraging reading and creating
            magical moments.
          </p>
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
