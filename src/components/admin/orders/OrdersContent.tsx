// src/components/admin/orders/OrdersContent.tsx
"use client";

import { useState, useCallback, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Loader2, Printer } from "lucide-react";
import { OrderFull } from "@/types/order";

// Component imports
import { OrderStatisticsPanel } from "@/components/admin/orders/OrderStatisticsPanel";
import { OrdersTable } from "@/components/admin/orders/OrdersTable";
import { OrderFilters } from "@/components/admin/orders/OrderFilters";
import { OrderSearch } from "@/components/admin/orders/OrderSearch";
import { PrintQueueAction } from "@/components/admin/orders/PrintQueueAction";
import { getAllOrders } from "@/actions/order-actions";

interface OrdersContentProps {
  initialOrders: OrderFull[];
}

export function OrdersContent({ initialOrders }: OrdersContentProps) {
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [orders, setOrders] = useState<OrderFull[]>(initialOrders);
  const [filteredOrders, setFilteredOrders] =
    useState<OrderFull[]>(initialOrders);
  const [selectedOrder, setSelectedOrder] = useState<OrderFull | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [dateFilter, setDateFilter] = useState<string>("ALL");
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [showPrintQueue, setShowPrintQueue] = useState(false);

  // Define filter function with useCallback
  const applyFilters = useCallback(() => {
    let filtered = [...orders];

    // Filter by status
    if (statusFilter !== "ALL") {
      filtered = filtered.filter((order) => order.status === statusFilter);
    }

    // Filter by date
    if (dateFilter !== "ALL") {
      const daysAgo = parseInt(dateFilter);
      const dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - daysAgo);
      filtered = filtered.filter(
        (order) => new Date(order.createdAt) >= dateThreshold
      );
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (order) =>
          order.orderNumber.toLowerCase().includes(query) ||
          order.name?.toLowerCase().includes(query) ||
          order.customerEmail.toLowerCase().includes(query) ||
          order.book.title.toLowerCase().includes(query)
      );
    }
    // Filter for print queue if enabled
    if (showPrintQueue) {
      filtered = filtered.filter(
        (order) =>
          order.book.status === "READY_FOR_PRINTING" &&
          order.productType === "BOOK" &&
          order.status === "PAID"
      );
    }

    setFilteredOrders(filtered);
  }, [orders, searchQuery, statusFilter, dateFilter, showPrintQueue]);

  // Apply filters when filter states change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  const fetchOrders = async () => {
    setRefreshing(true);
    try {
      const result = await getAllOrders();
      if (result.success) {
        setOrders(result.data);
      } else {
        setMessage({
          type: "error",
          text: result.error || "Failed to load orders",
        });
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      setMessage({
        type: "error",
        text: "An error occurred while loading orders",
      });
    } finally {
      setRefreshing(false);
    }
  };

  // Get print queue orders - only physical books that are ready for printing
  const printQueueOrders = orders.filter(
    (order) =>
      order.book.status === "READY_FOR_PRINTING" &&
      order.productType === "BOOK" &&
      order.status === "PAID"
  );

  return (
    <>
      {/* Order Statistics Panel */}
      <OrderStatisticsPanel orders={orders} />

      <Card className="w-full">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>
            {showPrintQueue ? "Print Queue" : "Orders Management"}
          </CardTitle>
          <div className="flex space-x-2">
            <Button
              variant={showPrintQueue ? "default" : "outline"}
              onClick={() => setShowPrintQueue(!showPrintQueue)}
            >
              <Printer className="h-4 w-4 mr-2" />
              {showPrintQueue ? "View All Orders" : "Print Queue"}
              {!showPrintQueue && printQueueOrders.length > 0 && (
                <Badge className="ml-2 bg-red-500">
                  {printQueueOrders.length}
                </Badge>
              )}
            </Button>
            <Button
              onClick={fetchOrders}
              variant="outline"
              size="icon"
              title="Refresh orders"
            >
              <Loader2
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

          <div className="mb-6 flex flex-col sm:flex-row gap-4">
            <OrderSearch
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
            <OrderFilters
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              dateFilter={dateFilter}
              setDateFilter={setDateFilter}
            />
          </div>

          {/* Print Queue Action */}
          {showPrintQueue && printQueueOrders.length > 0 && (
            <PrintQueueAction
              printQueueOrders={printQueueOrders}
              setLoading={setLoading}
              loading={loading}
              setOrders={setOrders}
              fetchOrders={fetchOrders}
              setMessage={setMessage}
            />
          )}

          {refreshing ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredOrders.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">No orders found</p>
              {(searchQuery ||
                statusFilter !== "ALL" ||
                dateFilter !== "ALL" ||
                showPrintQueue) && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("ALL");
                    setDateFilter("ALL");
                    setShowPrintQueue(false);
                  }}
                >
                  Clear All Filters
                </Button>
              )}
            </div>
          ) : (
            <OrdersTable
              filteredOrders={filteredOrders}
              selectedOrder={selectedOrder}
              setSelectedOrder={setSelectedOrder}
              orders={orders}
              setOrders={setOrders}
            />
          )}
        </CardContent>
      </Card>
    </>
  );
}
