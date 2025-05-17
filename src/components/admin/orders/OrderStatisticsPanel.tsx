// src/components/admin/orders/OrderStatisticsPanel.tsx
"use client";

import { useCallback, useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { OrderFull, OrderStatus } from "@/types/order";
import { FileText, CreditCard, Package, Calendar } from "lucide-react";
import { Decimal } from "@prisma/client/runtime/library";

type OrderStatistics = {
  totalOrders: number;
  totalRevenue: number;
  statusCounts: Record<OrderStatus, number>;
  avgFulfillmentDays: number | null;
  recentOrdersCount: number;
};

interface OrderStatisticsPanelProps {
  orders: OrderFull[];
}

export function OrderStatisticsPanel({ orders }: OrderStatisticsPanelProps) {
  const [statistics, setStatistics] = useState<OrderStatistics>({
    totalOrders: 0,
    totalRevenue: 0,
    statusCounts: {
      PENDING: 0,
      PAID: 0,
      PRINTING: 0,
      SHIPPED: 0,
      FULFILLED: 0,
      CANCELLED: 0,
      REFUNDED: 0,
      ERROR: 0,
    },
    avgFulfillmentDays: null,
    recentOrdersCount: 0,
  });

  const calculateStatistics = useCallback(() => {
    // Count orders by status
    const statusCounts = orders.reduce((counts, order) => {
      counts[order.status] = (counts[order.status] || 0) + 1;
      return counts;
    }, {} as Record<OrderStatus, number>);

    // Calculate total revenue (from paid orders)
    const totalRevenue = orders
      .filter(
        (order) =>
          order.status === "PAID" ||
          order.status === "PRINTING" ||
          order.status === "SHIPPED" ||
          order.status === "FULFILLED"
      )
      .reduce((sum, order) => sum + Number(order.totalPrice), 0);

    // Calculate average fulfillment time
    const fulfilledOrders = orders.filter(
      (order) =>
        order.status === "FULFILLED" && order.fulfilledAt && order.paidAt
    );

    let avgFulfillmentDays = null;
    if (fulfilledOrders.length > 0) {
      const totalDays = fulfilledOrders.reduce((sum, order) => {
        const paidDate = new Date(order.paidAt!);
        const fulfilledDate = new Date(order.fulfilledAt!);
        const diffTime = Math.abs(fulfilledDate.getTime() - paidDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return sum + diffDays;
      }, 0);
      avgFulfillmentDays = totalDays / fulfilledOrders.length;
    }

    // Recent orders count (last 7 days)
    const dateThreshold = new Date();
    dateThreshold.setDate(dateThreshold.getDate() - 7);
    const recentOrdersCount = orders.filter(
      (order) => new Date(order.createdAt) >= dateThreshold
    ).length;

    setStatistics({
      totalOrders: orders.length,
      totalRevenue,
      statusCounts: {
        PENDING: statusCounts.PENDING || 0,
        PAID: statusCounts.PAID || 0,
        PRINTING: statusCounts.PRINTING || 0,
        SHIPPED: statusCounts.SHIPPED || 0,
        FULFILLED: statusCounts.FULFILLED || 0,
        CANCELLED: statusCounts.CANCELLED || 0,
        REFUNDED: statusCounts.REFUNDED || 0,
        ERROR: statusCounts.ERROR || 0,
      },
      avgFulfillmentDays,
      recentOrdersCount,
    });
  }, [orders]);

  // Calculate statistics when orders change
  useEffect(() => {
    if (orders.length > 0) {
      calculateStatistics();
    }
  }, [orders, calculateStatistics]);

  const formatCurrency = (amount: number | string | Decimal) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Number(amount));
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Order Statistics</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Total Orders */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium">Total Orders</span>
            </div>
            <p className="text-2xl font-bold mt-2">{statistics.totalOrders}</p>
            <p className="text-xs text-muted-foreground mt-1">
              {statistics.recentOrdersCount} in the last 7 days
            </p>
          </div>

          {/* Total Revenue */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <CreditCard className="h-5 w-5 text-green-500" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {formatCurrency(statistics.totalRevenue)}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              From{" "}
              {statistics.statusCounts.PAID +
                statistics.statusCounts.PRINTING +
                statistics.statusCounts.SHIPPED +
                statistics.statusCounts.FULFILLED}{" "}
              paid orders
            </p>
          </div>

          {/* Orders By Status */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <Package className="h-5 w-5 text-purple-500" />
              <span className="text-sm font-medium">Orders By Status</span>
            </div>
            <div className="grid grid-cols-2 gap-1 mt-2">
              <div className="text-xs">
                <span className="font-medium">Pending:</span>{" "}
                {statistics.statusCounts.PENDING}
              </div>
              <div className="text-xs">
                <span className="font-medium">Paid:</span>{" "}
                {statistics.statusCounts.PAID}
              </div>
              <div className="text-xs">
                <span className="font-medium">Printing:</span>{" "}
                {statistics.statusCounts.PRINTING}
              </div>
              <div className="text-xs">
                <span className="font-medium">Shipped:</span>{" "}
                {statistics.statusCounts.SHIPPED}
              </div>
              <div className="text-xs">
                <span className="font-medium">Fulfilled:</span>{" "}
                {statistics.statusCounts.FULFILLED}
              </div>
            </div>
          </div>

          {/* Fulfillment Time */}
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <div className="flex items-center space-x-2">
              <Calendar className="h-5 w-5 text-amber-500" />
              <span className="text-sm font-medium">Avg. Fulfillment Time</span>
            </div>
            <p className="text-2xl font-bold mt-2">
              {statistics.avgFulfillmentDays !== null
                ? `${statistics.avgFulfillmentDays.toFixed(1)} days`
                : "N/A"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Based on {statistics.statusCounts.FULFILLED} fulfilled orders
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
