"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, FileText, Edit3, Save, X } from "lucide-react";
import { BookAdmin } from "@/types/book";
import { PagesList } from "@/components/admin/books/PageList";
import { CoverPageCard } from "@/components/admin/books/CoverPageCard";
import {
  updateBookTitle,
  updateBookPageDedication,
} from "@/actions/book-actions";

interface AdminBookEditorProps {
  book: BookAdmin;
}

export const AdminBookEditor: React.FC<AdminBookEditorProps> = ({ book }) => {
  const [editingTitle, setEditingTitle] = useState(false);
  const [editingPage, setEditingPage] = useState(false);

  const [titleValue, setTitleValue] = useState(book.title);
  const [pageValue, setPageValue] = useState(book.pageDedication || "");

  const [loading, setLoading] = useState(false);

  const handleSaveTitle = async () => {
    setLoading(true);
    await updateBookTitle(book.id, titleValue);
    setLoading(false);
    setEditingTitle(false);
  };

  const handleSavePage = async () => {
    setLoading(true);
    await updateBookPageDedication(book.id, pageValue);
    setLoading(false);
    setEditingPage(false);
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Book Title
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingTitle ? (
            <div className="space-y-3">
              <Input
                value={titleValue}
                onChange={(e) => setTitleValue(e.target.value)}
                disabled={loading}
              />
              <div className="flex gap-2">
                <Button onClick={handleSaveTitle} disabled={loading} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingTitle(false)}
                  disabled={loading}
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-lg font-medium">{book.title}</p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingTitle(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Cover Page Management - NEW */}
      <CoverPageCard book={book} />

      {/* Page Dedication */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Page Dedication
          </CardTitle>
        </CardHeader>
        <CardContent>
          {editingPage ? (
            <div className="space-y-3">
              <Textarea
                value={pageValue}
                onChange={(e) => setPageValue(e.target.value)}
                disabled={loading}
                rows={3}
              />
              <div className="flex gap-2">
                <Button onClick={handleSavePage} disabled={loading} size="sm">
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setEditingPage(false)}
                  disabled={loading}
                  size="sm"
                >
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-between">
              <div className="flex-1">
                {book.pageDedication ? (
                  <p className="text-sm italic">"{book.pageDedication}"</p>
                ) : (
                  <p className="text-sm text-muted-foreground">
                    No page dedication
                  </p>
                )}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditingPage(true)}
              >
                <Edit3 className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pages Management */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Pages Management
          </CardTitle>
        </CardHeader>
        <CardContent>
          <PagesList book={book} />
        </CardContent>
      </Card>
    </div>
  );
};
