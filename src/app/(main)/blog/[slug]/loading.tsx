// src/app/(main)/blog/[slug]/loading.tsx
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPostLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Skeleton */}
      <div className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <div className="container mx-auto px-4 py-8 lg:py-12">
          <div className="max-w-4xl mx-auto">
            {/* Back button */}
            <Skeleton className="h-10 w-32 mb-6" />

            {/* Breadcrumbs */}
            <div className="flex items-center gap-2 mb-6">
              <Skeleton className="h-4 w-12" />
              <span>/</span>
              <Skeleton className="h-4 w-16" />
              <span>/</span>
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Category badge */}
            <Skeleton className="h-6 w-24 mb-4" />

            {/* Title */}
            <Skeleton className="h-12 w-full mb-4" />
            <Skeleton className="h-12 w-3/4 mb-6" />

            {/* Excerpt */}
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-5/6 mb-8" />

            {/* Meta info */}
            <div className="flex gap-6 mb-8">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>

            {/* Featured image */}
            <Skeleton className="h-64 lg:h-96 w-full rounded-xl mb-8" />

            {/* Tags */}
            <div className="flex gap-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-18" />
              <Skeleton className="h-6 w-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Content Skeleton */}
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto py-12">
          {/* Article content */}
          <div className="space-y-6 mb-12">
            <Skeleton className="h-8 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />

            <div className="h-6" />

            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />

            <div className="h-6" />

            <Skeleton className="h-6 w-3/5" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* CTA section */}
          <div className="p-8 bg-gray-50 rounded-xl mb-8">
            <Skeleton className="h-8 w-2/3 mx-auto mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-3/4 mx-auto mb-6" />
            <div className="flex gap-4 justify-center">
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-12 w-32" />
            </div>
          </div>

          {/* Share section */}
          <Card className="bg-gray-50 mb-12">
            <CardContent className="p-6">
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-48" />
                <div className="flex gap-3">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-8 w-28" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Related posts */}
          <div className="pt-12 border-t border-gray-200">
            <Skeleton className="h-8 w-48 mb-4" />
            <Skeleton className="h-5 w-96 mb-8" />

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <Skeleton className="h-48 w-full" />
                  <CardContent className="p-6">
                    <Skeleton className="h-4 w-20 mb-3" />
                    <Skeleton className="h-5 w-full mb-2" />
                    <Skeleton className="h-5 w-3/4 mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-2/3 mb-4" />
                    <Skeleton className="h-4 w-24" />
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Skeleton className="h-12 w-40 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
