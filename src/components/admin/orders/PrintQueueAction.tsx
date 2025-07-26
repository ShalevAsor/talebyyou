// src/components/admin/orders/PrintQueueAction.tsx
"use client";

import { Printer } from "lucide-react";

import AdminActionDialog from "@/components/admin/AdminActionDialog";
import { OrderFull } from "@/types/order";

interface PrintQueueActionProps {
  printQueueOrders: OrderFull[];
  loading: boolean;
  setLoading: (loading: boolean) => void;
  setOrders: (orders: OrderFull[]) => void;
  fetchOrders: () => Promise<void>;
  setMessage: (
    message: { text: string; type: "success" | "error" } | null
  ) => void;
}

export function PrintQueueAction({
  printQueueOrders,
  loading,
  setLoading,
  fetchOrders,
  setMessage,
}: PrintQueueActionProps) {
  const handleSendToPrinting = async (orderIds: string[]) => {
    setLoading(true);
    try {
      // Implement batch processing here
      const successCount = 0;
      const errorCount = 0;

      for (const orderId of orderIds) {
        // Update the order status to PRINTING
        console.log("Updating order status to PRINTING:", orderId);
      }

      // Refresh the orders list
      await fetchOrders();

      setMessage({
        type: errorCount === 0 ? "success" : "error",
        text: `${successCount} orders sent to printing${
          errorCount > 0 ? `, ${errorCount} failed` : ""
        }`,
      });
    } catch (error) {
      console.error("Error sending orders to printing:", error);
      setMessage({
        type: "error",
        text: "An error occurred while processing print queue",
      });
    } finally {
      setLoading(false);
    }
  };

  // If no books to print, don't display anything
  if (printQueueOrders.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <AdminActionDialog
        title="Send Books to Printing"
        description={`This will mark ${printQueueOrders.length} books as being printed. This action will update the status of each order to PRINTING.`}
        actionLabel={`Send ${printQueueOrders.length} Books to Printing`}
        triggerLabel={`Process Print Queue (${printQueueOrders.length})`}
        triggerIcon={<Printer className="h-4 w-4" />}
        isLoading={loading}
        onAction={() => handleSendToPrinting(printQueueOrders.map((o) => o.id))}
        variant="default"
        actionVariant="default"
      />
    </div>
  );
}
