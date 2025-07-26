// src/components/admin/print-jobs/PrintJobDetailSheet.tsx
import { Decimal } from "@prisma/client/runtime/library";
import { format } from "date-fns";
import { Calendar, CreditCard, FileText, Printer, Truck } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  FileValidationStatus,
  PrintJobFull,
  PrintJobStatus,
} from "@/types/print";
import { getStatusBadgeColor } from "@/utils/printUtils";

interface PrintJobDetailSheetProps {
  selectedPrintJob: PrintJobFull;
  setSelectedPrintJob: (printJob: PrintJobFull | null) => void;
  printJobs: PrintJobFull[];
  setPrintJobs: (printJobs: PrintJobFull[]) => void;
}

export default function PrintJobDetailSheet({
  selectedPrintJob,
  setSelectedPrintJob,
}: PrintJobDetailSheetProps) {
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
    return format(new Date(date), "MMM d, yyyy h:mm a");
  };

  const getValidationStatusBadge = (status: FileValidationStatus) => {
    switch (status) {
      case "NULL":
        return <Badge variant="outline">Not Started</Badge>;
      case "VALIDATING":
        return (
          <Badge className="bg-yellow-100 text-yellow-800">Validating</Badge>
        );
      case "VALIDATED":
        return <Badge className="bg-green-100 text-green-800">Validated</Badge>;
      case "NORMALIZING":
        return <Badge className="bg-blue-100 text-blue-800">Normalizing</Badge>;
      case "NORMALIZED":
        return <Badge className="bg-green-600 text-white">Normalized</Badge>;
      case "ERROR":
        return <Badge variant="destructive">Error</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Print Job Details</SheetTitle>
        <SheetDescription>
          Created on {formatDate(selectedPrintJob.createdAt)}
        </SheetDescription>
      </SheetHeader>

      <div className="py-4 space-y-6">
        {/* Status Badge */}
        <div className="flex gap-x-2 items-center">
          <span className="font-medium">Status:</span>
          <Badge className={getStatusBadgeColor(selectedPrintJob.status)}>
            {selectedPrintJob.status.replace(/_/g, " ")}
          </Badge>
        </div>

        {/* Basic Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Print Job Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Print Job ID:</span>{" "}
              {selectedPrintJob.id}
            </p>
            <p>
              <span className="font-medium">Lulu Print Job ID:</span>{" "}
              {selectedPrintJob.luluPrintJobId || "Not sent"}
            </p>
            <p>
              <span className="font-medium">Product ID (SKU):</span>{" "}
              {selectedPrintJob.podPackageId}
            </p>
            <p>
              <span className="font-medium">Page Count:</span>{" "}
              {selectedPrintJob.pageCount}
            </p>
            <p>
              <span className="font-medium">Status Message:</span>{" "}
              {selectedPrintJob.statusMessage || "N/A"}
            </p>
            <p>
              <span className="font-medium">Attempts:</span>{" "}
              {selectedPrintJob.attempts}
            </p>
          </div>
        </div>

        {/* Book Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Book Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Book Title:</span>{" "}
              {selectedPrintJob.book.title}
            </p>
            <p>
              <span className="font-medium">Book ID:</span>{" "}
              {selectedPrintJob.bookId}
            </p>
          </div>
        </div>

        {/* Order Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Order Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Order Number:</span>{" "}
              {selectedPrintJob.order?.orderNumber || "N/A"}
            </p>
            <p>
              <span className="font-medium">Customer:</span>{" "}
              {selectedPrintJob.order?.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {selectedPrintJob.order?.customerEmail || "N/A"}
            </p>
            <p>
              <span className="font-medium">Quantity:</span>{" "}
              {selectedPrintJob.order?.quantity || "N/A"}
            </p>
          </div>
        </div>

        {/* PDF Files */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">PDF Files</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            {selectedPrintJob.interiorPdfUrl && (
              <Button variant="link" asChild>
                <Link
                  href={selectedPrintJob.interiorPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Interior PDF
                </Link>
              </Button>
            )}
            {selectedPrintJob.coverPdfUrl && (
              <Button variant="link" asChild>
                <Link
                  href={selectedPrintJob.coverPdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Cover PDF
                </Link>
              </Button>
            )}
          </div>
        </div>

        {/* Validation Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Validation Status</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <div className="flex justify-between items-center mb-2">
              <span className="font-medium">Interior:</span>
              {getValidationStatusBadge(
                selectedPrintJob.interiorValidationStatus
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="font-medium">Cover:</span>
              {getValidationStatusBadge(selectedPrintJob.coverValidationStatus)}
            </div>

            {selectedPrintJob.validationErrors &&
              selectedPrintJob.validationErrors.length > 0 && (
                <div className="mt-2 pt-2 border-t border-gray-200">
                  <p className="font-medium text-red-600 mb-1">
                    Validation Errors:
                  </p>
                  <ul className="list-disc pl-4 text-xs">
                    {selectedPrintJob.validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}
          </div>
        </div>

        {/* Cost Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Cost Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Currency:</span>{" "}
              {selectedPrintJob.currency}
            </p>
            <p>
              <span className="font-medium">Printing Cost (excl. tax):</span>{" "}
              {formatCurrency(selectedPrintJob.printingCostExclTax)}
            </p>
            <p>
              <span className="font-medium">Printing Cost (incl. tax):</span>{" "}
              {formatCurrency(selectedPrintJob.printingCostInclTax)}
            </p>
            <p>
              <span className="font-medium">Shipping Cost (excl. tax):</span>{" "}
              {formatCurrency(selectedPrintJob.shippingCostExclTax)}
            </p>
            <p>
              <span className="font-medium">Shipping Cost (incl. tax):</span>{" "}
              {formatCurrency(selectedPrintJob.shippingCostInclTax)}
            </p>
            <p className="mt-2 pt-2 border-t border-gray-200">
              <span className="font-medium">Total Cost (excl. tax):</span>{" "}
              {formatCurrency(selectedPrintJob.totalCostExclTax)}
            </p>
            <p>
              <span className="font-medium">Total Cost (incl. tax):</span>{" "}
              {formatCurrency(selectedPrintJob.totalCostInclTax)}
            </p>
            <p>
              <span className="font-medium">Total Tax:</span>{" "}
              {formatCurrency(selectedPrintJob.totalTax)}
            </p>
          </div>
        </div>

        {/* Shipping Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Shipping Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Tracking Number:</span>{" "}
              {selectedPrintJob.trackingNumber || "Not shipped yet"}
            </p>
            <p>
              <span className="font-medium">Shipping Carrier:</span>{" "}
              {selectedPrintJob.shippingCarrier || "N/A"}
            </p>
            {selectedPrintJob.trackingUrls &&
              selectedPrintJob.trackingUrls.length > 0 && (
                <div className="mt-1">
                  <span className="font-medium">Tracking URLs:</span>
                  <ul className="list-disc pl-4 text-xs">
                    {selectedPrintJob.trackingUrls.map((url, index) => (
                      <li key={index} className="truncate text-blue-600">
                        <a href={url}>Tracking Page</a>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            <p>
              <span className="font-medium">Estimated Ship Date:</span>{" "}
              {selectedPrintJob.status === PrintJobStatus.SHIPPED
                ? "Shipped"
                : formatDate(selectedPrintJob.estimatedShipDate)}
            </p>
            <p>
              <span className="font-medium">Estimated Delivery Date:</span>{" "}
              {formatDate(selectedPrintJob.estimatedDeliveryDate)}
            </p>
          </div>
        </div>

        {/* Timeline / Important Dates */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Timeline</h3>
          <div className="bg-muted p-3 rounded-md text-sm space-y-2">
            <div className="flex items-center">
              <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center mr-2">
                <Calendar className="h-3 w-3 text-white" />
              </div>
              <div>
                <p className="font-medium">Created</p>
                <p className="text-xs text-muted-foreground">
                  {formatDate(selectedPrintJob.createdAt)}
                </p>
              </div>
            </div>

            {selectedPrintJob.sentToPrinterAt && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                  <FileText className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Sent to Printer</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedPrintJob.sentToPrinterAt)}
                  </p>
                </div>
              </div>
            )}

            {selectedPrintJob.paidAt && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <CreditCard className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Paid</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedPrintJob.paidAt)}
                  </p>
                </div>
              </div>
            )}

            {selectedPrintJob.inProductionAt && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                  <Printer className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">In Production</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedPrintJob.inProductionAt)}
                  </p>
                </div>
              </div>
            )}

            {selectedPrintJob.shippedAt && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-2">
                  <Truck className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Shipped</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedPrintJob.shippedAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Admin Notes (if present) */}
        {selectedPrintJob.adminNotes && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Admin Notes</h3>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p>{selectedPrintJob.adminNotes}</p>
            </div>
          </div>
        )}

        {/* Error Message (if present) */}
        {selectedPrintJob.errorMessage && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-red-600">Error Message</h3>
            <div className="bg-red-50 p-3 rounded-md text-sm text-red-800 border border-red-200">
              <p>{selectedPrintJob.errorMessage}</p>
            </div>
          </div>
        )}
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setSelectedPrintJob(null)}
          >
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
