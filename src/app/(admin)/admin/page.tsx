// src/app/(admin)/admin/page.tsx
import { AlertCircle } from "lucide-react";
import { Suspense } from "react";

import { getMaintenanceStatus } from "@/actions/maintenance-actions";
import { getOrdersCount } from "@/actions/order-actions";
import { getTemplatesCount } from "@/actions/template-actions";
import { getUsersCount } from "@/actions/user-actions";
import { AdminManagement } from "@/components/admin/AdminManagement"; // ADD THIS
import {
  DashboardMetrics,
  MetricCardSkeleton,
} from "@/components/admin/dashboard/DashboardMetrics";
import MaintenanceControl from "@/components/admin/MaintenanceControl";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// This component handles data fetching
async function DashboardContent() {
  // Server-side data fetching
  const usersResult = await getUsersCount();
  const templatesResult = await getTemplatesCount();
  const ordersResult = await getOrdersCount();
  const maintenanceResult = await getMaintenanceStatus();

  // Handle errors
  if (
    !usersResult.success ||
    !templatesResult.success ||
    !ordersResult.success ||
    !maintenanceResult.success
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
            : !maintenanceResult.success
            ? maintenanceResult.error
            : "Failed to load dashboard data"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <DashboardMetrics
        usersCount={usersResult.data}
        templatesCount={templatesResult.data}
        ordersCount={ordersResult.data}
      />

      {/* Two column layout for controls */}
      <div className="grid gap-6 md:grid-cols-2">
        <MaintenanceControl initialConfig={maintenanceResult.data.config} />
        <AdminManagement /> {/* ADD THIS */}
      </div>
    </div>
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
