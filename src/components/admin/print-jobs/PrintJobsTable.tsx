"use client";

import { Eye } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { PrintJobFull } from "@/types/print";
import { Decimal } from "@prisma/client/runtime/library";
import PrintJobDetailSheet from "@/components/admin/print-jobs/PrintJobDetailSheet";
import { getStatusBadgeColor } from "@/utils/printUtils";

interface PrintJobsTableProps {
  filteredPrintJobs: PrintJobFull[];
  selectedPrintJob: PrintJobFull | null;
  setSelectedPrintJob: (printJob: PrintJobFull | null) => void;
  printJobs: PrintJobFull[];
  setPrintJobs: (printJobs: PrintJobFull[]) => void;
}

export function PrintJobsTable({
  filteredPrintJobs,
  selectedPrintJob,
  setSelectedPrintJob,
  printJobs,
  setPrintJobs,
}: PrintJobsTableProps) {
  const formatCurrency = (
    amount: number | string | Decimal | null | undefined
  ) => {
    if (amount === null || amount === undefined) return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };

  const formatDate = (date: Date | string | null | undefined) => {
    if (!date) return "N/A";
    return format(new Date(date), "MMM d, yyyy");
  };

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table className="table-fixed">
        <TableHeader>
          <TableRow>
            <TableHead className="w-24 text-center">Print Job ID</TableHead>
            <TableHead className="w-48 text-center">Book Title</TableHead>
            <TableHead className="w-32 text-center">Order Number</TableHead>
            <TableHead className="w-32 text-center">Lulu PrintJob ID</TableHead>
            <TableHead className="w-40 text-center">Status</TableHead>
            <TableHead className="w-28 text-center">Created</TableHead>
            <TableHead className="w-20 text-center">Shipped</TableHead>
            <TableHead className="w-24 text-center">Cost</TableHead>
            <TableHead className="w-16 text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPrintJobs.map((printJob) => (
            <TableRow key={printJob.id}>
              <TableCell className="font-medium text-center">
                {printJob.id.slice(0, 8)}...
              </TableCell>
              <TableCell>
                <div className="max-w-[180px] truncate mx-auto text-center">
                  {printJob.book.title}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {printJob.order?.orderNumber || "N/A"}
              </TableCell>
              <TableCell className="text-center">
                {printJob.luluPrintJobId || "Not sent"}
              </TableCell>
              <TableCell>
                <div className="flex flex-col items-center">
                  <Badge className={getStatusBadgeColor(printJob.status)}>
                    {printJob.status.replace(/_/g, " ")}
                  </Badge>
                  {printJob.statusMessage && (
                    <div className="text-xs text-muted-foreground mt-1 max-w-[180px] truncate">
                      {printJob.statusMessage}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-center">
                {formatDate(printJob.createdAt)}
              </TableCell>
              <TableCell className="text-center">
                <p className="font-medium">
                  {printJob.trackingNumber ? "Yes" : "No"}
                </p>
              </TableCell>
              <TableCell className="text-center">
                {formatCurrency(
                  printJob.totalCostInclTax ||
                    (printJob.printingCostInclTax &&
                    printJob.shippingCostInclTax
                      ? Number(printJob.printingCostInclTax) +
                        Number(printJob.shippingCostInclTax)
                      : 0)
                )}
              </TableCell>
              <TableCell className="text-center">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedPrintJob(printJob)}
                      className="mx-auto"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>

                  {/* Print job detail sheet component is conditionally rendered here when this specific print job is selected */}
                  {selectedPrintJob && selectedPrintJob.id === printJob.id && (
                    <PrintJobDetailSheet
                      selectedPrintJob={selectedPrintJob}
                      setSelectedPrintJob={setSelectedPrintJob}
                      printJobs={printJobs}
                      setPrintJobs={setPrintJobs}
                    />
                  )}
                </Sheet>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default PrintJobsTable;
