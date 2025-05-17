// src/app/(admin)/admin/print-jobs/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { PrintJobsContent } from "@/components/admin/print-jobs/PrintJobsContent";
import { getAllPrintJobs } from "@/actions/print-actions";
import { Card, CardContent } from "@/components/ui/card";

// Loading component
function PrintJobsLoading() {
  return (
    <Card className="w-full">
      <CardContent className="py-8">
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading print jobs...</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Server component to fetch data
async function PrintJobsWithData() {
  // Server-side data fetching
  const result = await getAllPrintJobs();

  if (!result.success) {
    return (
      <div className="p-6 bg-destructive/10 rounded-md">
        <p className="text-destructive font-medium">Error loading print jobs</p>
        <p className="text-sm text-destructive/80">{result.error}</p>
      </div>
    );
  }

  return <PrintJobsContent initialPrintJobs={result.data} />;
}

// Main page component (server component)
export default function PrintJobsPage() {
  return (
    <div className="p-6 space-y-6">
      <Suspense fallback={<PrintJobsLoading />}>
        <PrintJobsWithData />
      </Suspense>
    </div>
  );
}
