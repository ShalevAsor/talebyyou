// src/components/admin/print-jobs/PrintJobStats.tsx
"use client";

import { Decimal } from "@prisma/client/runtime/library";
import { AlertCircle, Clock, Printer, Truck } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrintJobFull, PrintJobStatus } from "@/types/print";

type PrintJobStatistics = {
  totalPrintJobs: number;
  totalCost: number;
  statusCounts: Record<PrintJobStatus, number>;
  avgProductionDays: number | null;
  pendingJobs: number;
};

interface PrintJobStatsProps {
  printJobs: PrintJobFull[];
}

export function PrintJobStats({ printJobs }: PrintJobStatsProps) {
  const [statistics, setStatistics] = useState<PrintJobStatistics>({
    totalPrintJobs: 0,
    totalCost: 0,
    statusCounts: {
      CREATED: 0,
      UNPAID: 0,
      PAYMENT_IN_PROGRESS: 0,
      PRODUCTION_DELAYED: 0,
      PRODUCTION_READY: 0,
      IN_PRODUCTION: 0,
      SHIPPED: 0,
      REJECTED: 0,
      CANCELED: 0,
    },
    avgProductionDays: null,
    pendingJobs: 0,
  });

  const calculateStatistics = useCallback(() => {
    // Count print jobs by status
    const statusCounts = printJobs.reduce((counts, job) => {
      counts[job.status] = (counts[job.status] || 0) + 1;
      return counts;
    }, {} as Record<PrintJobStatus, number>);

    // Calculate total cost of all print jobs
    const totalCost = printJobs.reduce((sum, job) => {
      // Use totalCostInclTax if available, otherwise calculate from printing + shipping
      if (job.totalCostInclTax) {
        return sum + Number(job.totalCostInclTax);
      } else if (job.printingCostInclTax && job.shippingCostInclTax) {
        return (
          sum +
          Number(job.printingCostInclTax) +
          Number(job.shippingCostInclTax)
        );
      }
      return sum;
    }, 0);

    // Calculate average production time (from sent to printer to shipped)
    const shippedJobs = printJobs.filter(
      (job) => job.status === "SHIPPED" && job.sentToPrinterAt && job.shippedAt
    );

    let avgProductionDays = null;
    if (shippedJobs.length > 0) {
      const totalDays = shippedJobs.reduce((sum, job) => {
        const sentDate = new Date(job.sentToPrinterAt!);
        const shippedDate = new Date(job.shippedAt!);
        const diffTime = Math.abs(shippedDate.getTime() - sentDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);
      avgProductionDays = totalDays / shippedJobs.length;
    }

    // Calculate pending jobs (not shipped or canceled)
    const pendingJobs = printJobs.filter(
      (job) =>
        job.status !== "SHIPPED" &&
        job.status !== "CANCELED" &&
        job.status !== "REJECTED"
    ).length;

    setStatistics({
      totalPrintJobs: printJobs.length,
      totalCost,
      statusCounts: {
        CREATED: statusCounts.CREATED || 0,
        UNPAID: statusCounts.UNPAID || 0,
        PAYMENT_IN_PROGRESS: statusCounts.PAYMENT_IN_PROGRESS || 0,
        PRODUCTION_DELAYED: statusCounts.PRODUCTION_DELAYED || 0,
        PRODUCTION_READY: statusCounts.PRODUCTION_READY || 0,
        IN_PRODUCTION: statusCounts.IN_PRODUCTION || 0,
        SHIPPED: statusCounts.SHIPPED || 0,
        REJECTED: statusCounts.REJECTED || 0,
        CANCELED: statusCounts.CANCELED || 0,
      },
      avgProductionDays,
      pendingJobs,
    });
  }, [printJobs]);

  // Calculate statistics when print jobs change
  useEffect(() => {
    if (printJobs.length > 0) {
      calculateStatistics();
    }
  }, [printJobs, calculateStatistics]);

  const formatCurrency = (amount: number | string | Decimal) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Print Job Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Print Jobs */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <Printer className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Total Print Jobs</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {statistics.totalPrintJobs}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.pendingJobs} in progress
            </p>
          </div>

          {/* Total Cost */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Total Print Cost</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {formatCurrency(statistics.totalCost)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              For all {statistics.totalPrintJobs} print jobs
            </p>
          </div>

          {/* Jobs By Status */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <AlertCircle className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Jobs By Status</span>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="text-xs">
                <span className="font-medium">Created:</span>{" "}
                {statistics.statusCounts.CREATED}
              </div>
              <div className="text-xs">
                <span className="font-medium">Ready:</span>{" "}
                {statistics.statusCounts.PRODUCTION_READY}
              </div>
              <div className="text-xs">
                <span className="font-medium">In Production:</span>{" "}
                {statistics.statusCounts.IN_PRODUCTION}
              </div>
              <div className="text-xs">
                <span className="font-medium">Shipped:</span>{" "}
                {statistics.statusCounts.SHIPPED}
              </div>
              <div className="text-xs">
                <span className="font-medium">Canceled/Rejected:</span>{" "}
                {statistics.statusCounts.CANCELED +
                  statistics.statusCounts.REJECTED}
              </div>
            </div>
          </div>

          {/* Production Time */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <Truck className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">Avg. Production Time</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {statistics.avgProductionDays !== null
                ? `${statistics.avgProductionDays.toFixed(1)} days`
                : "N/A"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {statistics.statusCounts.SHIPPED} shipped jobs
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
