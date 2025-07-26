// src/app/(admin)/admin/templates/[slug]/edit/page.tsx
import { AlertCircle, Loader2 } from "lucide-react";
import { notFound } from "next/navigation";
import { Suspense } from "react";

import { getBookTemplateBySlug } from "@/actions/template-actions";
import { TemplateEditor } from "@/components/admin/template/TemplateEditor";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface TemplateImagesPageProps {
  params: Promise<{
    slug: string;
  }>;
}

// Loading component
function TemplateEditLoading() {
  return (
    <div className="flex justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading template...</span>
    </div>
  );
}

// Server component to fetch data
async function TemplateEditContent({ slug }: { slug: string }) {
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

  return <TemplateEditor template={templateResult.data} />;
}

// Main page component
export default async function TemplateEditPage({
  params,
}: TemplateImagesPageProps) {
  const { slug } = await params;
  return (
    <div className="p-6">
      <Suspense fallback={<TemplateEditLoading />}>
        <TemplateEditContent slug={slug} />
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
    title: `Edit template - ${templateResult.data.title} | Admin`,
    description: `Edit and manage template for the ${templateResult.data.title} book template`,
  };
}
