// src/app/(admin)/admin/webhooks/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { WebhookManagement } from "@/components/admin/webhooks/WebhookManagement";
import { getLuluWebhookStatus } from "@/actions/admin-actions";
import { Card, CardContent } from "@/components/ui/card";

// Loading component
function WebhookLoading() {
  return (
    <Card className="w-full">
      <CardContent className="py-8">
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading webhook status...</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Server component to fetch webhook status
async function WebhookWithData() {
  // Server-side data fetching
  const result = await getLuluWebhookStatus();

  if (!result.success) {
    return (
      <div className="p-6 bg-destructive/10 rounded-md">
        <p className="text-destructive font-medium">
          Error loading webhook status
        </p>
        <p className="text-sm text-destructive/80">{result.error}</p>
      </div>
    );
  }

  return <WebhookManagement initialWebhook={result.data} />;
}

// Main page component (server component)
export default function WebhooksPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Lulu Print API Webhook Management</h1>
      <p className="text-muted-foreground">
        Configure and manage the webhook that receives print job status updates
        from Lulu.
      </p>

      <Suspense fallback={<WebhookLoading />}>
        <WebhookWithData />
      </Suspense>
    </div>
  );
}
