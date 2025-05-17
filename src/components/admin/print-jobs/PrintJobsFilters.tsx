// src/components/admin/print-jobs/PrintJobsFilters.tsx
"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface PrintJobsFiltersProps {
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  dateFilter: string;
  setDateFilter: (value: string) => void;
}

export function PrintJobsFilters({
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}: PrintJobsFiltersProps) {
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
          <SelectItem value="CREATED">Created</SelectItem>
          <SelectItem value="UNPAID">Unpaid</SelectItem>
          <SelectItem value="PAYMENT_IN_PROGRESS">
            Payment In Progress
          </SelectItem>
          <SelectItem value="PRODUCTION_DELAYED">Production Delayed</SelectItem>
          <SelectItem value="PRODUCTION_READY">Production Ready</SelectItem>
          <SelectItem value="IN_PRODUCTION">In Production</SelectItem>
          <SelectItem value="SHIPPED">Shipped</SelectItem>
          <SelectItem value="REJECTED">Rejected</SelectItem>
          <SelectItem value="CANCELED">Canceled</SelectItem>
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
          <SelectItem value="90">Last 90 Days</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
