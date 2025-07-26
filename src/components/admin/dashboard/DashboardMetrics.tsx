// src/components/admin/DashboardMetrics.tsx
import { BookIcon, ShoppingBagIcon, UserIcon } from "lucide-react"; // Added ShoppingBagIcon for orders

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

interface MetricCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
}

export function MetricCard({
  title,
  value,
  description,
  icon,
}: MetricCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
}

export function MetricCardSkeleton() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">Loading...</CardTitle>
        <div className="h-4 w-4" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-8 w-20" />
        <Skeleton className="h-4 w-40 mt-2" />
      </CardContent>
    </Card>
  );
}

interface DashboardMetricsProps {
  usersCount: number;
  templatesCount: number;
  ordersCount: number; // Added orders count
}

export function DashboardMetrics({
  usersCount,
  templatesCount,
  ordersCount,
}: DashboardMetricsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <MetricCard
        title="Total Users"
        value={usersCount}
        description="Registered users in the system"
        icon={<UserIcon className="h-4 w-4 text-muted-foreground" />}
      />

      <MetricCard
        title="Book Templates"
        value={templatesCount}
        description="Available book templates"
        icon={<BookIcon className="h-4 w-4 text-muted-foreground" />}
      />

      <MetricCard
        title="Total Orders"
        value={ordersCount}
        description="Orders placed in the system"
        icon={<ShoppingBagIcon className="h-4 w-4 text-muted-foreground" />}
      />
    </div>
  );
}
