// src/components/admin/template/CreateTemplateContent.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ChevronLeft, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import BookTemplateForm from "@/components/admin/template/BookTemplateForm";
import { DefaultTemplateSelector } from "@/components/admin/template/DefaultTemplateSelector";
import AdminActionDialog from "@/components/admin/AdminActionDialog";
import { Genre } from "@/generated/prisma";
import { BookTemplateCreateData } from "@/types/book";

interface CreateTemplateContentProps {
  initialGenres: Genre[];
}

export function CreateTemplateContent({
  initialGenres,
}: CreateTemplateContentProps) {
  const router = useRouter();
  const [importedTemplateData, setImportedTemplateData] =
    useState<BookTemplateCreateData | null>(null);
  const [formKey, setFormKey] = useState(0); // Force re-render of form

  const handleTemplateImport = (templateData: BookTemplateCreateData) => {
    setImportedTemplateData(templateData);
    setFormKey((prev) => prev + 1); // Force form to re-render with new data
  };

  const handleClearForm = () => {
    setImportedTemplateData(null);
    setFormKey((prev) => prev + 1); // Force form to re-render with cleared data
  };

  const hasImportedData = importedTemplateData !== null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="mr-2"
            onClick={() => router.push("/admin/templates")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <h1 className="text-xl font-bold">Create New Book Template</h1>
        </div>
      </div>

      {/* Import Actions Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Template Creation Options</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-600 mb-4">
                {hasImportedData
                  ? `Currently editing: "${importedTemplateData.title}". You can modify any fields below and save as a new template.`
                  : "Start from scratch or import a default template to speed up the creation process."}
              </p>

              <div className="flex flex-col sm:flex-row gap-2">
                {!hasImportedData ? (
                  <DefaultTemplateSelector
                    onTemplateSelect={handleTemplateImport}
                  />
                ) : (
                  <>
                    <DefaultTemplateSelector
                      onTemplateSelect={handleTemplateImport}
                    />
                    <AdminActionDialog
                      title="Clear Template Data"
                      description="This will clear all imported template data and reset the form to start from scratch. Are you sure?"
                      actionLabel="Clear Form"
                      triggerLabel="Start from Scratch"
                      triggerIcon={<RotateCcw className="h-4 w-4" />}
                      onAction={handleClearForm}
                      actionVariant="destructive"
                    />
                  </>
                )}
              </div>
            </div>

            {hasImportedData && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-3 min-w-0">
                <div className="flex items-center gap-2 text-green-800">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm font-medium">Template Imported</span>
                </div>
                <p className="text-xs text-green-600 mt-1 truncate">
                  {importedTemplateData.title}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Template Form */}
      <BookTemplateForm
        key={formKey}
        genres={initialGenres}
        initialData={importedTemplateData || undefined}
      />
    </div>
  );
}
