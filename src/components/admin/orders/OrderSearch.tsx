// src/components/admin/orders/OrderSearch.tsx
"use client";

import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

interface OrderSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function OrderSearch({ searchQuery, setSearchQuery }: OrderSearchProps) {
  return (
    <div className="relative flex-1">
      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search by order #, customer, or book title..."
        className="pl-8"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}
