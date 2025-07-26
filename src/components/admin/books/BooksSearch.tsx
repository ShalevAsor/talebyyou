"use client";

import { Search, X } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BookStatus } from "@/types/book";

export type SearchType = "bookId" | "userEmail" | "orderNumber" | "bookTitle";

export interface SearchFilters {
  searchType: SearchType;
  searchQuery: string;
  status?: BookStatus | "all";
  dateRange?: {
    from: string;
    to: string;
  };
}

interface BooksSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClear: () => void;
  isLoading?: boolean;
}

export const BooksSearch: React.FC<BooksSearchProps> = ({
  onSearch,
  onClear,
  isLoading = false,
}) => {
  const [searchType, setSearchType] = useState<SearchType>("userEmail");
  const [searchQuery, setSearchQuery] = useState("");
  const [status, setStatus] = useState<BookStatus | "all">("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const handleSearch = () => {
    if (!searchQuery.trim()) return;

    const filters: SearchFilters = {
      searchType,
      searchQuery: searchQuery.trim(),
      status: status === "all" ? undefined : status,
      dateRange:
        dateFrom && dateTo
          ? {
              from: dateFrom,
              to: dateTo,
            }
          : undefined,
    };

    onSearch(filters);
  };

  const handleClear = () => {
    setSearchQuery("");
    setStatus("all");
    setDateFrom("");
    setDateTo("");
    onClear();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const getPlaceholderText = () => {
    switch (searchType) {
      case "bookId":
        return "Enter book ID (e.g., clxxx...)";
      case "userEmail":
        return "Enter customer email address";
      case "orderNumber":
        return "Enter order number";
      case "bookTitle":
        return "Enter book title or partial title";
      default:
        return "Enter search query";
    }
  };

  return (
    <div className="space-y-4">
      {/* Main Search Row */}
      <div className="flex gap-4">
        {/* Search Type Dropdown */}
        <div className="w-48">
          <Label htmlFor="searchType" className="text-sm font-medium">
            Search by
          </Label>
          <Select
            value={searchType}
            onValueChange={(value: SearchType) => setSearchType(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="userEmail">Customer Email</SelectItem>
              <SelectItem value="orderNumber">Order Number</SelectItem>
              <SelectItem value="bookId">Book ID</SelectItem>
              <SelectItem value="bookTitle">Book Title</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Search Input */}
        <div className="flex-1">
          <Label htmlFor="searchQuery" className="text-sm font-medium">
            Search query
          </Label>
          <Input
            id="searchQuery"
            type="text"
            placeholder={getPlaceholderText()}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full"
          />
        </div>

        {/* Search Button */}
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            disabled={!searchQuery.trim() || isLoading}
            className="px-6"
          >
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
        </div>
      </div>

      {/* Filters Row */}
      <div className="flex gap-4 items-end">
        {/* Status Filter */}
        <div className="w-48">
          <Label htmlFor="status" className="text-sm font-medium">
            Status
          </Label>
          <Select
            value={status}
            onValueChange={(value: BookStatus | "all") => setStatus(value)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="CUSTOMIZING">Customizing</SelectItem>
              <SelectItem value="ORDERED">Ordered</SelectItem>
              <SelectItem value="READY_FOR_PRINTING">
                Ready for Printing
              </SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div className="w-40">
          <Label htmlFor="dateFrom" className="text-sm font-medium">
            From Date
          </Label>
          <Input
            id="dateFrom"
            type="date"
            value={dateFrom}
            onChange={(e) => setDateFrom(e.target.value)}
          />
        </div>

        <div className="w-40">
          <Label htmlFor="dateTo" className="text-sm font-medium">
            To Date
          </Label>
          <Input
            id="dateTo"
            type="date"
            value={dateTo}
            onChange={(e) => setDateTo(e.target.value)}
            min={dateFrom}
          />
        </div>

        {/* Clear Button */}
        <Button variant="outline" onClick={handleClear} disabled={isLoading}>
          <X className="h-4 w-4 mr-2" />
          Clear
        </Button>
      </div>

      {/* Quick Date Filters */}
      <div className="flex gap-2">
        <span className="text-sm text-muted-foreground">Quick filters:</span>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-sm"
          onClick={() => {
            const today = new Date();
            const sevenDaysAgo = new Date(today);
            sevenDaysAgo.setDate(today.getDate() - 7);
            setDateFrom(sevenDaysAgo.toISOString().split("T")[0]);
            setDateTo(today.toISOString().split("T")[0]);
          }}
        >
          Last 7 days
        </Button>
        <span className="text-muted-foreground">•</span>
        <Button
          variant="link"
          size="sm"
          className="h-auto p-0 text-sm"
          onClick={() => {
            const today = new Date();
            const thirtyDaysAgo = new Date(today);
            thirtyDaysAgo.setDate(today.getDate() - 30);
            setDateFrom(thirtyDaysAgo.toISOString().split("T")[0]);
            setDateTo(today.toISOString().split("T")[0]);
          }}
        >
          Last 30 days
        </Button>
      </div>
    </div>
  );
};
