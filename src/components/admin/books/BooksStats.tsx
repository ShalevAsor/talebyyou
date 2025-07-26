// src/components/admin/books/BooksStats.tsx
import {
  Book,
  CheckCircle,
  Clock,
  Package,
  Printer,
  Settings,
  UserCheck,
  Users,
} from "lucide-react";
import React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BooksStatsData } from "@/types/book";

interface BooksStatsProps {
  booksStatsData: BooksStatsData;
}

export const BooksStats: React.FC<BooksStatsProps> = ({ booksStatsData }) => {
  const { totalBooks, booksByStatus, recentBooks, guestBooks, userBooks } =
    booksStatsData;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {/* Total Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Books</CardTitle>
          <Book className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalBooks.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            All books in the system
          </p>
        </CardContent>
      </Card>

      {/* Recent Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recent Books</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {recentBooks.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Created in last 7 days
          </p>
        </CardContent>
      </Card>

      {/* User Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">User Books</CardTitle>
          <UserCheck className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{userBooks.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">By registered users</p>
        </CardContent>
      </Card>

      {/* Guest Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Guest Books</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {guestBooks.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">By guest users</p>
        </CardContent>
      </Card>

      {/* Customizing Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Customizing</CardTitle>
          <Settings className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {booksByStatus.customizing.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            In customization phase
          </p>
        </CardContent>
      </Card>

      {/* Ordered Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ordered</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {booksByStatus.ordered.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Payment completed</p>
        </CardContent>
      </Card>

      {/* Ready for Printing */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Ready for Print</CardTitle>
          <Printer className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {booksByStatus.readyForPrinting.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            Ready to send to printer
          </p>
        </CardContent>
      </Card>

      {/* Completed Books */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {booksByStatus.completed.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">Fully completed books</p>
        </CardContent>
      </Card>
    </div>
  );
};
