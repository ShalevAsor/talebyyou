// src/components/admin/books/BookDetails.tsx
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Calendar,
  User,
  FileText,
  Image as ImageIcon,
  Package,
} from "lucide-react";
import Image from "next/image";
import { BookAdmin } from "@/types/book";

interface BookDetailsProps {
  book: BookAdmin;
}

export const BookDetails: React.FC<BookDetailsProps> = ({ book }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "CUSTOMIZING":
        return "bg-yellow-50 text-yellow-700 border-yellow-200";
      case "ORDERED":
        return "bg-blue-50 text-blue-700 border-blue-200";
      case "READY_FOR_PRINTING":
        return "bg-purple-50 text-purple-700 border-purple-200";
      case "COMPLETED":
        return "bg-green-50 text-green-700 border-green-200";
      default:
        return "bg-gray-50 text-gray-700 border-gray-200";
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6">
      {/* Book Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Book Information
            </CardTitle>
            <Badge className={getStatusColor(book.status)}>
              {book.status.replace("_", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Title and ID */}
            <div>
              <h3 className="text-2xl font-semibold mb-2">{book.title}</h3>
              <p className="text-sm text-muted-foreground font-mono bg-muted px-2 py-1 rounded w-fit">
                ID: {book.id}
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <FileText className="h-4 w-4" />
                  Pages
                </div>
                <p className="text-2xl font-semibold">{book.pageCount}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Created
                </div>
                <p className="text-sm">{formatDate(book.createdAt)}</p>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  Last Updated
                </div>
                <p className="text-sm">{formatDate(book.updatedAt)}</p>
              </div>
            </div>

            {/* Template Information */}
            {book.template && (
              <div className="border-t pt-4">
                <h4 className="font-medium mb-2">Template</h4>
                <p className="text-sm text-muted-foreground">
                  {book.template.title}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* User/Customer Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Customer Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {book.user ? (
              // Registered User
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Registered User</Badge>
                </div>
                <div className="space-y-2">
                  <p className="font-medium">
                    {book.user.firstName} {book.user.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {book.user.email}
                  </p>
                  <p className="text-xs text-muted-foreground font-mono">
                    User ID: {book.user.id}
                  </p>
                </div>
              </div>
            ) : book.guestSession ? (
              // Guest User
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline">Guest User</Badge>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Session ID: {book.guestSession.id}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Last Active: {formatDate(book.guestSession.lastActive)}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-muted-foreground">
                No user information available
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Order Information */}
      {book.order && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-5 w-5" />
              Order Information
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Order Number
                  </label>
                  <p className="font-mono">{book.order.orderNumber}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Status
                  </label>
                  <p className="capitalize">
                    {book.order.status.toLowerCase().replace("_", " ")}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Customer Email
                  </label>
                  <p>{book.order.customerEmail}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Total Price
                  </label>
                  <p>
                    ${Number(book.order.totalPrice).toFixed(2)}{" "}
                    {book.order.currency}
                  </p>
                </div>
              </div>

              {book.order.name && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Customer Name
                  </label>
                  <p>{book.order.name}</p>
                </div>
              )}

              {(book.order.street1 || book.order.city) && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Shipping Address
                  </label>
                  <div className="text-sm">
                    {book.order.name && <p>{book.order.name}</p>}
                    {book.order.street1 && <p>{book.order.street1}</p>}
                    {book.order.street2 && <p>{book.order.street2}</p>}
                    {(book.order.city ||
                      book.order.state_code ||
                      book.order.postcode) && (
                      <p>
                        {book.order.city}
                        {book.order.state_code && `, ${book.order.state_code}`}
                        {book.order.postcode && ` ${book.order.postcode}`}
                      </p>
                    )}
                    {book.order.country && <p>{book.order.country}</p>}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Character Information */}
      {book.character && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Character Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Name
                </label>
                <p>{book.character.name}</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Age
                </label>
                <p>{book.character.age} years old</p>
              </div>
              <div>
                <label className="text-sm font-medium text-muted-foreground">
                  Gender
                </label>
                <p className="capitalize">{book.character.gender}</p>
              </div>
              {book.character.eyeColor && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Eye Color
                  </label>
                  <p className="capitalize">{book.character.eyeColor}</p>
                </div>
              )}
              {book.character.hairColor && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Hair Color
                  </label>
                  <p className="capitalize">{book.character.hairColor}</p>
                </div>
              )}
              {book.character.skinTone && (
                <div>
                  <label className="text-sm font-medium text-muted-foreground">
                    Skin Tone
                  </label>
                  <p className="capitalize">{book.character.skinTone}</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cover Image */}
      {book.coverImage && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Cover Image
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="relative w-32 h-40 rounded-lg border overflow-hidden">
                <Image
                  src={book.coverImage}
                  alt={`Cover for ${book.title}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 128px) 100vw, 128px"
                />
              </div>
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Cover image for this book
                </p>
                {book.coverPrompt && (
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">
                      Generated from prompt:
                    </label>
                    <p className="text-sm italic mt-1 p-2 bg-muted rounded">
                      "{book.coverPrompt}"
                    </p>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
