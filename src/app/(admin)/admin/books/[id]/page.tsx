import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getBookByIdAdmin } from "@/actions/book-actions";
import { AdminBookEditor } from "@/components/admin/books/AdminBookEditor";
import { BookDetails } from "@/components/admin/books/BookDetails";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface BookDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function BookDetailPage({ params }: BookDetailPageProps) {
  const { id } = await params;

  // Fetch the book with admin-level details
  const bookResult = await getBookByIdAdmin(id);

  // Handle error case
  if (!bookResult.success) {
    if (bookResult.error.includes("not found")) {
      notFound();
    }

    return (
      <div className="p-6">
        <div className="mb-6">
          <Link href="/admin/books">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Books
            </Button>
          </Link>
        </div>

        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{bookResult.error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  const book = bookResult.data;

  return (
    <div className="p-6">
      {/* Header with back button */}
      <div className="mb-6">
        <Link href="/admin/books">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Books
          </Button>
        </Link>
      </div>

      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Book Management
      </h2>

      {/* Tabs for View and Edit modes */}
      <Tabs defaultValue="details" className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="details">View Details</TabsTrigger>
          <TabsTrigger value="edit">Edit Book</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="space-y-6">
          <BookDetails book={book} />
        </TabsContent>

        <TabsContent value="edit" className="space-y-6">
          <AdminBookEditor book={book} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
