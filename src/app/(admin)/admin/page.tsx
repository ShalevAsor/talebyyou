// src/app/(admin)/admin/page.tsx
import { Suspense } from "react";
import {
  DashboardMetrics,
  MetricCardSkeleton,
} from "@/components/admin/dashboard/DashboardMetrics";
import { getUsersCount } from "@/actions/user-actions";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { getTemplatesCount } from "@/actions/template-actions";
import { getOrdersCount } from "@/actions/order-actions";

// This component handles data fetching
async function DashboardContent() {
  // Server-side data fetching
  const usersResult = await getUsersCount();
  const templatesResult = await getTemplatesCount();
  const ordersResult = await getOrdersCount(); // Added orders count fetching

  // Handle errors
  if (
    !usersResult.success ||
    !templatesResult.success ||
    !ordersResult.success
  ) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {!usersResult.success
            ? usersResult.error
            : !templatesResult.success
            ? templatesResult.error
            : !ordersResult.success
            ? ordersResult.error
            : "Failed to load dashboard data"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <DashboardMetrics
      usersCount={usersResult.data}
      templatesCount={templatesResult.data}
      ordersCount={ordersResult.data}
    />
  );
}

export default async function AdminDashboard() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>

      <Suspense
        fallback={
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <MetricCardSkeleton />
            <MetricCardSkeleton />
            <MetricCardSkeleton />
          </div>
        }
      >
        <DashboardContent />
      </Suspense>
    </div>
  );
}
