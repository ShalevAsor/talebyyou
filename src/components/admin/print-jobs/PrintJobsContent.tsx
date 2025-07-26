// src/components/admin/print-jobs/PrintJobsContent.tsx
"use client";

import { Loader2, RefreshCw } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { getAllPrintJobs } from "@/actions/print-actions";
import { PrintJobSearch } from "@/components/admin/print-jobs/PrintJobSearch";
import { PrintJobsFilters } from "@/components/admin/print-jobs/PrintJobsFilters";
import { PrintJobsTable } from "@/components/admin/print-jobs/PrintJobsTable";
import { PrintJobStats } from "@/components/admin/print-jobs/PrintJobStats";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PrintJobFull } from "@/types/print";

interface PrintJobsContentProps {
  initialPrintJobs: PrintJobFull[];
}

export function PrintJobsContent({ initialPrintJobs }: PrintJobsContentProps) {
  // Basic state setup
  const [refreshing, setRefreshing] = useState(false);
  const [printJobs, setPrintJobs] = useState<PrintJobFull[]>(initialPrintJobs);
  const [filteredPrintJobs, setFilteredPrintJobs] =
    useState<PrintJobFull[]>(initialPrintJobs);
  const [selectedPrintJob, setSelectedPrintJob] = useState<PrintJobFull | null>(
    null
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("ALL");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Define filter function with useCallback
  const applyFilters = useCallback(() => {
    let filtered = [...printJobs];

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter(
        (printJob) => printJob.status === statusFilter
      );
    }

    // Filter by date
    if (dateFilter !== "ALL") {
      const daysAgo = parseInt(dateFilter);
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - daysAgo);
      filtered = filtered.filter(
        (printJob) => new Date(printJob.createdAt) >= dateThreshold
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (printJob) =>
          printJob.id.toLowerCase().includes(query) ||
          printJob.book.title.toLowerCase().includes(query) ||
          (printJob.order?.orderNumber &&
            printJob.order.orderNumber.toLowerCase().includes(query)) ||
          (printJob.luluPrintJobId &&
            printJob.luluPrintJobId.toString().includes(query))
      );
    }

    setFilteredPrintJobs(filtered);
  }, [printJobs, searchQuery, statusFilter, dateFilter]);

  // Apply filters when filter states change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Fetch print jobs function
  const fetchPrintJobs = async () => {
    setRefreshing(true);
    try {
      const result = await getAllPrintJobs();
      if (result.success) {
        setPrintJobs(result.data);
        // Filters will be reapplied automatically through the useEffect
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to load print jobs",
        });
      }
    } catch (error) {
      console.error("Error fetching print jobs:", error);
      setMessage({
        type: "error",
        text: "An error occurred while loading print jobs",
      });
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <>
      {/* Print Job Statistics Panel */}
      <PrintJobStats printJobs={printJobs} />

      <Card className="w-full mt-6">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Print Jobs Management</CardTitle>
          <div className="flex space-x-2">
            <Button
              variant="outline"
              size="icon"
              title="Refresh print jobs"
              onClick={fetchPrintJobs}
              disabled={refreshing}
            >
              <RefreshCw
                className={`h-4 w-4 ${refreshing ? "animate-spin" : ""}`}
              />
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {message && (
            <Alert
              variant={message.type === "success" ? "default" : "destructive"}
              className="mb-6"
            >
              <AlertTitle>
                {message.type === "success" ? "Success" : "Error"}
              </AlertTitle>
              <AlertDescription>{message.text}</AlertDescription>
            </Alert>
          )}

          {/* Search and Filters */}
          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <PrintJobSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <PrintJobsFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>

          {refreshing ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredPrintJobs.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No print jobs found</p>
              {(searchQuery ||
                statusFilter !== "ALL" ||
                dateFilter !== "ALL") && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("ALL");
                    setDateFilter("ALL");
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <PrintJobsTable
              filteredPrintJobs={filteredPrintJobs}
              selectedPrintJob={selectedPrintJob}
              setSelectedPrintJob={setSelectedPrintJob}
              printJobs={printJobs}
              setPrintJobs={setPrintJobs}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
