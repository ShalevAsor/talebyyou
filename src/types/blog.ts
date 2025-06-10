// src/types/blog.ts

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  publishedAt: string;
  updatedAt?: string;
  category: BlogCategory;
  tags: string[];
  readTime: number; // in minutes
  image?: string;
  featured?: boolean;
  metaDescription?: string;
  keywords?: string[];
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  color: string; // For UI theming
  icon?: string; // Lucide icon name
}

export type BlogPostCard = Omit<BlogPost, "content">;

export interface BlogSEO {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonicalUrl?: string;
}

export interface RelatedPost {
  slug: string;
  title: string;
  excerpt: string;
  category: BlogCategory;
  readTime: number;
  image?: string;
}

// For search functionality
export interface BlogSearchResult {
  post: BlogPostCard;
  score: number;
  matchedFields: string[];
}

// Filters for blog listing
export interface BlogFilters {
  category?: string;
  tags?: string[];
  featured?: boolean;
  search?: string;
}
