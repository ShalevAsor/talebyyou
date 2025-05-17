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
import { OrderFull, ProductType } from "@/types/order";
import { Decimal } from "@prisma/client/runtime/library";
import OrderDetailSheet from "@/components/admin/orders/OrderDetailSheet";
import {
  calculateTotalCost,
  getStatusBadgeColor,
  getTotalApiCredits,
} from "@/utils/orderUtils";

interface OrdersTableProps {
  filteredOrders: OrderFull[];
  selectedOrder: OrderFull | null;
  setSelectedOrder: (order: OrderFull | null) => void;
  orders: OrderFull[];
  setOrders: (orders: OrderFull[]) => void;
}

export function OrdersTable({
  filteredOrders,
  selectedOrder,
  setSelectedOrder,
  orders,
  setOrders,
}: OrdersTableProps) {
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

  const getProductTypeBadge = (type: ProductType) => {
    return type === "EBOOK" ? (
      <Badge
        variant="outline"
        className="bg-sky-50 text-sky-700 border-sky-200"
      >
        eBook
      </Badge>
    ) : (
      <Badge
        variant="outline"
        className="bg-amber-50 text-amber-700 border-amber-200"
      >
        Physical Book
      </Badge>
    );
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order #</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Book Title</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Cost</TableHead>
            <TableHead>ApiCredits</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.orderNumber}</TableCell>
              <TableCell>{formatDate(order.createdAt)}</TableCell>
              <TableCell>
                <div className="font-medium">{order.name || "N/A"}</div>
                <div className="text-xs text-muted-foreground">
                  {order.customerEmail}
                </div>
              </TableCell>
              <TableCell>
                <div className="max-w-[200px] truncate">{order.book.title}</div>
              </TableCell>
              <TableCell>{getProductTypeBadge(order.productType)}</TableCell>
              <TableCell>{formatCurrency(order.totalPrice)}</TableCell>
              <TableCell>{formatCurrency(calculateTotalCost(order))}</TableCell>
              <TableCell>
                {getTotalApiCredits(order.book.imageGenerations)}
              </TableCell>
              <TableCell>
                <Badge className={getStatusBadgeColor(order.status)}>
                  {order.status}
                </Badge>
                {order.book.status === "READY_FOR_PRINTING" &&
                  order.productType === "BOOK" &&
                  order.status === "PAID" && (
                    <Badge className="ml-1 bg-blue-700 text-white">
                      Ready to Print
                    </Badge>
                  )}
              </TableCell>
              <TableCell className="text-right">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSelectedOrder(order)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </SheetTrigger>

                  {/* Order detail sheet component is conditionally rendered here when this specific order is selected */}
                  {selectedOrder && selectedOrder.id === order.id && (
                    <OrderDetailSheet
                      selectedOrder={selectedOrder}
                      setSelectedOrder={setSelectedOrder}
                      orders={orders}
                      setOrders={setOrders}
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
