import { useState } from "react";
import { format } from "date-fns";
import { Decimal } from "@prisma/client/runtime/library";
import { OrderFull, OrderStatus } from "@/types/order";
import { sendBookForPrinting } from "@/actions/print-actions";
import {
  Calendar,
  CreditCard,
  Truck,
  CheckCircle,
  Printer,
  ExternalLink,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { toast } from "react-toastify";
import { getStatusBadgeColor, getTotalImagesCost } from "@/utils/orderUtils";

interface OrderDetailSheetProps {
  selectedOrder: OrderFull;
  setSelectedOrder: (order: OrderFull | null) => void;
  orders: OrderFull[];
  setOrders: (orders: OrderFull[]) => void;
}

export default function OrderDetailSheet({
  selectedOrder,
  setSelectedOrder,
  orders,
  setOrders,
}: OrderDetailSheetProps) {
  const [printingInProgress, setPrintingInProgress] = useState(false);

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

  const handleSendToPrint = async () => {
    setPrintingInProgress(true);
    try {
      const result = await sendBookForPrinting(selectedOrder.id);

      if (result.success) {
        // Update the order status to PRINTING if successful
        setOrders(
          orders.map((order) =>
            order.id === selectedOrder.id
              ? {
                  ...order,
                  status: OrderStatus.PRINTING,
                  poProviderOrderId:
                    result.data.printJobId?.toString() ||
                    order.poProviderOrderId,
                }
              : order
          )
        );
        setSelectedOrder({
          ...selectedOrder,
          status: OrderStatus.PRINTING,
          poProviderOrderId:
            result.data.printJobId?.toString() ||
            selectedOrder.poProviderOrderId,
        });

        toast.success("Book has been sent to the printer successfully");
      } else {
        toast.error(`Failed to send book to printer: ${result.error}`);
      }
    } catch (error) {
      console.error("Error sending book to print:", error);
      toast.error("An error occurred while sending the book to the printer");
    } finally {
      setPrintingInProgress(false);
    }
  };

  const imagesCost = getTotalImagesCost(selectedOrder.book.imageGenerations);

  return (
    <SheetContent className="sm:max-w-md overflow-y-auto">
      <SheetHeader>
        <SheetTitle>Order #{selectedOrder.orderNumber}</SheetTitle>
        <SheetDescription>
          Created on {formatDate(selectedOrder.createdAt)}
        </SheetDescription>
      </SheetHeader>

      <div className="py-4 space-y-6">
        {/* Status Badge */}
        <div className="flex  items-center gap-x-2">
          <span className="font-medium">Status:</span>
          <Badge className={getStatusBadgeColor(selectedOrder.status)}>
            {selectedOrder.status}
          </Badge>
        </div>

        {/* Customer Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Customer Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {selectedOrder.name || "N/A"}
            </p>
            <p>
              <span className="font-medium">Email:</span>{" "}
              {selectedOrder.customerEmail}
            </p>
            <p>
              <span className="font-medium">Registered User: </span>
              {selectedOrder.user ? "Yes" : "No"}
            </p>
          </div>
        </div>

        {/* Product Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Product Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Book Title:</span>{" "}
              {selectedOrder.book.title}
            </p>
            <p>
              <span className="font-medium">Type:</span>{" "}
              {selectedOrder.productType === "EBOOK"
                ? "eBook"
                : "Physical Book"}
            </p>
            <p>
              <span className="font-medium">Book Status:</span>{" "}
              {selectedOrder.book.status}
            </p>
            <p>
              <span className="font-medium">Quantity:</span>{" "}
              {selectedOrder.quantity}
            </p>
            <p>
              <span className="font-medium">Order Total:</span>{" "}
              {formatCurrency(selectedOrder.totalPrice)}
            </p>

            <div className="mt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  window.open(
                    `/library/preview/${selectedOrder.book.id}`,
                    "_blank"
                  )
                }
              >
                <ExternalLink className="h-3 w-3 mr-1" />
                View Book
              </Button>
            </div>
          </div>
        </div>

        {/* Cost Information - NEW SECTION */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Cost Breakdown</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Shipping Cost:</span>{" "}
              {formatCurrency(selectedOrder.shippingCost)}
            </p>
            <p>
              <span className="font-medium">Printing Cost:</span>{" "}
              {formatCurrency(selectedOrder.printingCost)}
            </p>
            <p>
              <span className="font-medium">Images Cost:</span>{" "}
              {formatCurrency(imagesCost)}
            </p>
            <p className="mt-2 pt-2 border-t border-gray-200">
              <span className="font-medium">Total Cost:</span>{" "}
              {formatCurrency(
                Number(selectedOrder.shippingCost || 0) +
                  Number(selectedOrder.printingCost || 0) +
                  imagesCost
              )}
            </p>
            {selectedOrder.totalPrice && (
              <p className="font-medium text-emerald-600">
                <span className="font-medium">Profit:</span>{" "}
                {formatCurrency(
                  Number(selectedOrder.pricePaid) -
                    (Number(selectedOrder.shippingCost || 0) +
                      Number(selectedOrder.printingCost || 0) +
                      imagesCost)
                )}
              </p>
            )}
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Payment Information</h3>
          <div className="bg-muted p-3 rounded-md text-sm">
            <p>
              <span className="font-medium">Payment ID:</span>{" "}
              {selectedOrder.paymentId || "Not paid yet"}
            </p>
            <p>
              <span className="font-medium">Transaction ID:</span>{" "}
              {selectedOrder.transactionId || "N/A"}
            </p>
            <p>
              <span className="font-medium">Payment Date:</span>{" "}
              {formatDate(selectedOrder.paidAt)}
            </p>
            <p>
              <span className="font-medium">Price Paid:</span>{" "}
              {selectedOrder.pricePaid
                ? formatCurrency(selectedOrder.pricePaid)
                : "Not paid yet"}
            </p>
          </div>
        </div>

        {/* Shipping Information (for physical books) */}
        {selectedOrder.productType === "BOOK" && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Shipping Information</h3>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p>
                <span className="font-medium">Recipient:</span>{" "}
                {selectedOrder.name || "N/A"}
              </p>
              <p>
                <span className="font-medium">Address:</span>{" "}
                {selectedOrder.street1 || "N/A"}
                {selectedOrder.street2 && `, ${selectedOrder.street2}`}
              </p>
              <p>
                <span className="font-medium">City/State/Zip:</span>{" "}
                {[
                  selectedOrder.city,
                  selectedOrder.state_code,
                  selectedOrder.postcode,
                ]
                  .filter(Boolean)
                  .join(", ") || "N/A"}
              </p>
              <p>
                <span className="font-medium">Country:</span>{" "}
                {selectedOrder.country || "N/A"}
              </p>
              <p>
                <span className="font-medium">Phone:</span>{" "}
                {selectedOrder.phoneNumber || "N/A"}
              </p>
              <p>
                <span className="font-medium">Shipping Method:</span>{" "}
                {selectedOrder.shippingLevel || "N/A"}
              </p>
            </div>
          </div>
        )}

        {/* Print Information */}
        {selectedOrder.productType === "BOOK" && (
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Print Information</h3>
            <div className="bg-muted p-3 rounded-md text-sm">
              <p>
                <span className="font-medium">Print Provider Order ID:</span>{" "}
                {selectedOrder.poProviderOrderId || "Not sent to printer yet"}
              </p>

              {/* Print Job Information */}
              {selectedOrder.printJob && (
                <>
                  <p>
                    <span className="font-medium">Lulu Print Job ID:</span>{" "}
                    {selectedOrder.printJob.luluPrintJobId?.toString() || "N/A"}
                  </p>
                  <p>
                    <span className="font-medium">Print Job Status:</span>{" "}
                    {selectedOrder.printJob.status}
                  </p>
                  {selectedOrder.printJob.statusMessage && (
                    <p>
                      <span className="font-medium">Status Message:</span>{" "}
                      {selectedOrder.printJob.statusMessage}
                    </p>
                  )}
                </>
              )}
            </div>
          </div>
        )}
        {/* Shipping tracking information */}
        {selectedOrder.productType === "BOOK" &&
          selectedOrder.status === OrderStatus.SHIPPED && (
            <div className="space-y-2">
              <h3 className="text-sm font-medium">Ship Tracking Information</h3>
              <div className="bg-muted p-3 rounded-md text-sm">
                <p>
                  <span className="font-medium">Tracking Number:</span>{" "}
                  {selectedOrder.trackingNumber || "Not shipped yet"}
                </p>
                <p>
                  <span className="font-medium">Estimated Ship Date:</span>{" "}
                  {selectedOrder.printJob?.estimatedShipDate
                    ? format(
                        new Date(selectedOrder.printJob.estimatedShipDate),
                        "MMM d, yyyy"
                      )
                    : "Not shipped yet"}
                </p>
                <p>
                  <span className="font-medium">Estimated Delivery Date:</span>{" "}
                  {selectedOrder.printJob?.estimatedDeliveryDate
                    ? format(
                        new Date(selectedOrder.printJob.estimatedDeliveryDate),
                        "MMM d, yyyy"
                      )
                    : "Not shipped yet"}
                </p>
                <p>
                  <span className="font-medium">Tracking Url:</span>{" "}
                  {selectedOrder.printJob?.trackingUrls[0] && (
                    <a
                      href={selectedOrder.printJob.trackingUrls[0]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      Tracking Page
                    </a>
                  )}
                </p>
                <p>
                  <span className="font-medium">Shipping Method:</span>{" "}
                  {selectedOrder.shippingLevel || "Not shipped yet"}
                </p>
              </div>
            </div>
          )}
        {/* Status Timeline */}
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
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
            </div>

            {selectedOrder.paidAt && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center mr-2">
                  <CreditCard className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Paid</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedOrder.paidAt)}
                  </p>
                </div>
              </div>
            )}

            {selectedOrder.status === "PRINTING" && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center mr-2">
                  <Printer className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Printing</p>
                  <p className="text-xs text-muted-foreground">In production</p>
                </div>
              </div>
            )}

            {selectedOrder.status === "SHIPPED" && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center mr-2">
                  <Truck className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Shipped</p>
                  <p className="text-xs text-muted-foreground">
                    {selectedOrder.trackingNumber && (
                      <>Tracking: {selectedOrder.trackingNumber}</>
                    )}
                  </p>
                </div>
              </div>
            )}

            {selectedOrder.status === "FULFILLED" && (
              <div className="flex items-center">
                <div className="w-6 h-6 rounded-full bg-green-600 flex items-center justify-center mr-2">
                  <CheckCircle className="h-3 w-3 text-white" />
                </div>
                <div>
                  <p className="font-medium">Fulfilled</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(selectedOrder.fulfilledAt)}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Send to Print button - only for physical books with PAID status */}
        {selectedOrder.productType === "BOOK" &&
          selectedOrder.status === "PAID" &&
          selectedOrder.book.status === "READY_FOR_PRINTING" && (
            <div className="mt-4">
              <Button
                onClick={handleSendToPrint}
                disabled={printingInProgress}
                className="w-full"
              >
                {printingInProgress ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Sending to Printer...
                  </>
                ) : (
                  <>
                    <Printer className="h-4 w-4 mr-2" />
                    Send to Print
                  </>
                )}
              </Button>
            </div>
          )}
      </div>

      <SheetFooter>
        <SheetClose asChild>
          <Button
            variant="secondary"
            type="button"
            onClick={() => setSelectedOrder(null)}
          >
            Close
          </Button>
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  );
}
