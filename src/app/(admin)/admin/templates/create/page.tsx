// src/app/(admin)/admin/templates/create/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { getAllGenres } from "@/actions/template-actions";
import { CreateTemplateContent } from "@/components/admin/template/CreateTemplateContent";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

// Loading component
function CreateTemplateLoading() {
  return (
    <div className="flex justify-center py-8">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <span className="ml-2">Loading form...</span>
    </div>
  );
}

// Server component to fetch data
async function CreateTemplateWithData() {
  const genresResult = await getAllGenres();

  if (!genresResult) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{"Failed to load genres"}</AlertDescription>
      </Alert>
    );
  }

  return <CreateTemplateContent initialGenres={genresResult} />;
}

// Main page component (server component)
export default function CreateTemplatePage() {
  return (
    <div className="p-6">
      <Suspense fallback={<CreateTemplateLoading />}>
        <CreateTemplateWithData />
      </Suspense>
    </div>
  );
}
