// src/app/(admin)/admin/templates/page.tsx
import { Loader2 } from "lucide-react";
import { Suspense } from "react";

import { getAllBookTemplates } from "@/actions/template-actions";
import { TemplatesClient } from "@/components/admin/template/TemplatesClient";
import { Card, CardContent } from "@/components/ui/card";

// Loading component
function TemplatesLoading() {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading templates...</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Server component to fetch data
async function TemplatesContent() {
  const templates = await getAllBookTemplates({
    publishedOnly: false, // CHANGE THIS: Show all templates in admin
    orderBy: "newest",
  });
  if (!templates.success) {
    return <div>Error: {templates.error}</div>;
  }
  return <TemplatesClient initialTemplates={templates.data} />;
}

// Main page component (server component)
export default function TemplatesPage() {
  return (
    <div className="p-6">
      <Suspense fallback={<TemplatesLoading />}>
        <TemplatesContent />
      </Suspense>
    </div>
  );
}
