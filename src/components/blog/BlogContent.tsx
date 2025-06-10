// src/components/blog/BlogContent.tsx
"use client";

import { useState, useMemo } from "react";
import { Search, Filter } from "lucide-react";
import { BlogPost, BlogCategory, BlogPostCard } from "@/types/blog";
import BlogCard from "./BlogCard";
import BlogSidebar from "./BlogSidebar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface BlogContentProps {
  posts: BlogPost[];
  categories: BlogCategory[];
}

export default function BlogContent({ posts, categories }: BlogContentProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [showSidebar, setShowSidebar] = useState(false);

  // Convert posts to BlogPostCard format (without content)
  const postCards: BlogPostCard[] = useMemo(
    () => posts.map(({ content: _, ...rest }) => rest),
    [posts]
  );

  // Filter posts based on search and category
  const filteredPosts = useMemo(() => {
    let filtered = postCards;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (post) => post.category.slug === selectedCategory
      );
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [postCards, selectedCategory, searchQuery]);

  // Get featured posts
  const featuredPosts = postCards.filter((post) => post.featured);

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 py-12">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8">
            {/* Search and Filter Bar */}
            <div className="mb-8">
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                {/* Search */}
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>

                {/* Category Filter */}
                <div className="w-full sm:w-48">
                  <Select
                    value={selectedCategory}
                    onValueChange={setSelectedCategory}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category.slug} value={category.slug}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Mobile Sidebar Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setShowSidebar(!showSidebar)}
                  className="lg:hidden"
                >
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </Button>
              </div>

              {/* Results count */}
              <div className="text-sm text-gray-600">
                {filteredPosts.length === postCards.length ? (
                  <span>Showing all {postCards.length} articles</span>
                ) : (
                  <span>
                    Showing {filteredPosts.length} of {postCards.length}{" "}
                    articles
                  </span>
                )}
              </div>
            </div>

            {/* Featured Posts Section */}
            {selectedCategory === "all" &&
              !searchQuery &&
              featuredPosts.length > 0 && (
                <div className="mb-12">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Featured Articles
                  </h2>
                  <div className="grid gap-8 md:grid-cols-2">
                    {featuredPosts.slice(0, 2).map((post) => (
                      <BlogCard key={post.slug} post={post} featured />
                    ))}
                  </div>
                </div>
              )}

            {/* All Posts Grid */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {selectedCategory === "all"
                  ? "Latest Articles"
                  : `${
                      categories.find((c) => c.slug === selectedCategory)?.name
                    } Articles`}
              </h2>

              {filteredPosts.length > 0 ? (
                <div className="grid gap-8 md:grid-cols-2">
                  {filteredPosts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <Search className="h-12 w-12 mx-auto" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    No articles found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your search terms or browse different
                    categories.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                    className="mt-4"
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div
            className={`lg:col-span-4 ${
              showSidebar ? "block" : "hidden lg:block"
            }`}
          >
            <BlogSidebar
              categories={categories}
              posts={postCards}
              onCategorySelect={(slug) => {
                setSelectedCategory(slug);
                setShowSidebar(false);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
