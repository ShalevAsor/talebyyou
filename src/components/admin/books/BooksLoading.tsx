// src/components/admin/books/BooksLoading.tsx
import { Loader2 } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

export function BooksLoading() {
  return (
    <Card className="w-full mx-auto">
      <CardContent className="pt-6">
        <div className="flex justify-center py-8">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading books...</span>
        </div>
      </CardContent>
    </Card>
  );
}
