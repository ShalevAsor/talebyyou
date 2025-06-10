import { BlogPost } from "@/types/blog";

// Calculate reading time
export const calculateReadingTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

export const getFeaturedPosts = (blogPosts: BlogPost[]): BlogPost[] => {
  return blogPosts.filter((post) => post.featured);
};

export const getPostsByCategory = (
  blogPosts: BlogPost[],
  categorySlug: string
): BlogPost[] => {
  return blogPosts.filter((post) => post.category.slug === categorySlug);
};

export const getRelatedPosts = (
  blogPosts: BlogPost[],
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] => {
  return blogPosts
    .filter(
      (post) =>
        post.slug !== currentPost.slug &&
        (post.category.slug === currentPost.category.slug ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .slice(0, limit);
};

export const getPostBySlug = (
  blogPosts: BlogPost[],
  slug: string
): BlogPost | undefined => {
  return blogPosts.find((post) => post.slug === slug);
};
