// src/components/blog/BlogPostShare.tsx
"use client";

import { useState } from "react";
import { Share2, Facebook, Twitter, Linkedin, Link, Check } from "lucide-react";
import { BlogPost } from "@/types/blog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface BlogPostShareProps {
  post: BlogPost;
}

export default function BlogPostShare({ post }: BlogPostShareProps) {
  const [copied, setCopied] = useState(false);

  const postUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/blog/${post.slug}`
      : `${process.env.NEXT_PUBLIC_SITE_URL || "https://talebyyou.com"}/blog/${
          post.slug
        }`;
  const postTitle = encodeURIComponent(post.title);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      postUrl
    )}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      postUrl
    )}&text=${postTitle}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
      postUrl
    )}`,
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(postUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy link:", err);
    }
  };

  const handleShare = (platform: string) => {
    const url = shareLinks[platform as keyof typeof shareLinks];
    window.open(url, "_blank", "noopener,noreferrer,width=600,height=400");
  };

  return (
    <div className="py-8 border-t border-gray-200">
      <Card className="bg-gray-50 border-gray-200">
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <Share2 className="h-5 w-5 text-indigo-600" aria-hidden="true" />
              <span className="text-lg font-semibold text-gray-900">
                Found this helpful? Share it!
              </span>
            </div>

            <div className="flex items-center gap-3">
              {/* Facebook */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("facebook")}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                aria-label="Share on Facebook"
              >
                <Facebook className="h-4 w-4 text-blue-600" />
                <span className="hidden sm:inline">Facebook</span>
              </Button>

              {/* Twitter */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("twitter")}
                className="flex items-center gap-2 hover:bg-sky-50 hover:border-sky-300"
                aria-label="Share on Twitter"
              >
                <Twitter className="h-4 w-4 text-sky-500" />
                <span className="hidden sm:inline">Twitter</span>
              </Button>

              {/* LinkedIn */}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleShare("linkedin")}
                className="flex items-center gap-2 hover:bg-blue-50 hover:border-blue-300"
                aria-label="Share on LinkedIn"
              >
                <Linkedin className="h-4 w-4 text-blue-700" />
                <span className="hidden sm:inline">LinkedIn</span>
              </Button>

              {/* Copy Link */}
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
                className="flex items-center gap-2 hover:bg-gray-100"
                aria-label="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="hidden sm:inline text-green-600">
                      Copied!
                    </span>
                  </>
                ) : (
                  <>
                    <Link className="h-4 w-4 text-gray-600" />
                    <span className="hidden sm:inline">Copy Link</span>
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
