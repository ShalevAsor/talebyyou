// src/app/(main)/blog/[slug]/not-found.tsx
import { ArrowLeft, Home, SearchX } from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BlogPostNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <Card className="shadow-lg">
          <CardContent className="p-8 text-center">
            {/* Icon */}
            <div className="mb-6">
              <div className="bg-red-100 p-4 rounded-full w-fit mx-auto">
                <SearchX className="h-8 w-8 text-red-600" aria-hidden="true" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              Article Not Found
            </h1>

            {/* Description */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              Sorry, we couldn't find the blog post you're looking for. It may
              have been moved, deleted, or the URL might be incorrect.
            </p>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link
                  href="/blog"
                  className="flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                  Back to Blog
                </Link>
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="h-4 w-4" aria-hidden="true" />
                  Go Home
                </Link>
              </Button>
            </div>

            {/* Helpful Links */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500 mb-4">
                You might be interested in:
              </p>
              <div className="space-y-2 text-sm">
                <Link
                  href="/blog?category=reading-tips"
                  className="block text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Reading Tips for Parents
                </Link>
                <Link
                  href="/blog?category=gift-ideas"
                  className="block text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Personalized Gift Ideas
                </Link>
                <Link
                  href="/library"
                  className="block text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                  Browse Book Templates
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
