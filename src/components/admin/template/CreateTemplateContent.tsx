// src/components/admin/template/CreateTemplateContent.tsx
"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import BookTemplateForm from "@/components/admin/template/BookTemplateForm";
import { Genre } from "@/generated/prisma";

interface CreateTemplateContentProps {
  initialGenres: Genre[];
}

export function CreateTemplateContent({
  initialGenres,
}: CreateTemplateContentProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          className="mr-2"
          onClick={() => router.push("/admin/templates")}
        >
          <ChevronLeft className="h-4 w-4 mr-1" /> Back
        </Button>
        <h1 className="text-xl font-bold">Create New Book Template</h1>
      </div>

      <BookTemplateForm genres={initialGenres} />
    </div>
  );
}
