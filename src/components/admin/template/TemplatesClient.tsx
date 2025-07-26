// src/components/admin/template/TemplatesClient.tsx
"use client";

import { Plus } from "lucide-react"; // Removed Loader2 since it's not used
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookTemplateFull } from "@/types/book";

import { TemplateList } from "./TemplateList";
import { TemplateManagementTools } from "./TemplateManagementTools";

interface TemplatesClientProps {
  initialTemplates: BookTemplateFull[];
}

export function TemplatesClient({ initialTemplates }: TemplatesClientProps) {
  const router = useRouter();
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [templates, setTemplates] =
    useState<BookTemplateFull[]>(initialTemplates);
  // Removed isLoading state since it's not being used

  const handleTemplateDeleted = (id: string) => {
    setTemplates(templates.filter((t) => t.id !== id));
    setMessage({
      text: "Template successfully deleted",
      type: "success",
    });
  };

  return (
    <Card className="w-full mx-auto">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Book Templates Management</CardTitle>
        <Button onClick={() => router.push("/admin/templates/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Template
        </Button>
      </CardHeader>
      <CardContent>
        {message && (
          <Alert
            variant={message.type === "success" ? "default" : "destructive"}
            className="mb-6"
          >
            <AlertTitle>
              {message.type === "success" ? "Success" : "Error"}
            </AlertTitle>
            <AlertDescription>{message.text}</AlertDescription>
          </Alert>
        )}

        {/* Removed the isLoading condition since it's not being used */}
        <TemplateList
          initialTemplates={templates}
          onTemplateDeleted={handleTemplateDeleted}
        />

        <TemplateManagementTools />
      </CardContent>
    </Card>
  );
}
