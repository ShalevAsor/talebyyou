// src/app/(admin)/admin/templates/[slug]/images/page.tsx
import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Loader2, AlertCircle } from "lucide-react";
import { getBookTemplateBySlug } from "@/actions/template-actions";
import { TemplateImageManager } from "@/components/admin/template/TemplateImageManager";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TemplateImagesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Loading component
function TemplateImagesLoading() {
  return (
    <div className="flex justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading template images...</span>
    </div>
  );
}

// Server component to fetch data
async function TemplateImagesContent({ slug }: { slug: string }) {
  const templateResult = await getBookTemplateBySlug(slug);

  if (!templateResult.success) {
    if (templateResult.error?.includes("not found")) {
      notFound();
    }

    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{templateResult.error}</AlertDescription>
      </Alert>
    );
  }

  return <TemplateImageManager template={templateResult.data} />;
}

// Main page component
export default async function TemplateImagesPage({
  params,
}: TemplateImagesPageProps) {
  const { slug } = await params;
  return (
    <div className="p-6">
      <Suspense fallback={<TemplateImagesLoading />}>
        <TemplateImagesContent slug={slug} />
      </Suspense>
    </div>
  );
}

// Metadata for the page
export async function generateMetadata({ params }: TemplateImagesPageProps) {
  const { slug } = await params;

  const templateResult = await getBookTemplateBySlug(slug);

  if (!templateResult.success) {
    return {
      title: "Template Not Found | Admin",
    };
  }

  return {
    title: `Manage Images - ${templateResult.data.title} | Admin`,
    description: `Upload and manage images for the ${templateResult.data.title} book template`,
  };
}
