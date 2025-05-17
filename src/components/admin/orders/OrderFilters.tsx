// src/components/admin/orders/OrderFilters.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface OrderFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

export function OrderFilters({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: OrderFiltersProps) {
  return (
    <div className="flex gap-2">
      <Select
        value={statusFilter}
        onValueChange={(value: string) => {
          setStatusFilter(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Statuses</SelectItem>
          <SelectItem value="PENDING">Pending</SelectItem>
          <SelectItem value="PAID">Paid</SelectItem>
          <SelectItem value="PRINTING">Printing</SelectItem>
          <SelectItem value="SHIPPED">Shipped</SelectItem>
          <SelectItem value="FULFILLED">Fulfilled</SelectItem>
          <SelectItem value="CANCELLED">Cancelled</SelectItem>
          <SelectItem value="REFUNDED">Refunded</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={dateFilter}
        onValueChange={(value: string) => {
          setDateFilter(value);
        }}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Filter by date" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="ALL">All Time</SelectItem>
          <SelectItem value="7">Last 7 Days</SelectItem>
          <SelectItem value="30">Last 30 Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
