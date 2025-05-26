// src/components/admin/template/TemplateList.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Eye, Trash2, BookImage, Edit } from "lucide-react";
import { PublishToggleButton } from "@/components/admin/template/PublishToggleButton";
import AdminActionDialog from "@/components/admin/AdminActionDialog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import {
  deleteBookTemplate,
  toggleTemplatePublished,
} from "@/actions/template-actions";
import Link from "next/link";
import { BookTemplateFull } from "@/types/book";

interface TemplateListProps {
  initialTemplates: BookTemplateFull[];
  onTemplateDeleted: (id: string) => void;
}

// Helper function to detect if template has real images or placeholders
function getImageStatus(template: BookTemplateFull): "real" | "placeholder" {
  // Check cover image
  const coverHasRealImage =
    template.coverImage &&
    (template.coverImage.startsWith("https://") ||
      !template.coverImage.includes("placeholder"));

  // Check if most pages have real images
  const pageImagesStatus = template.pages.map(
    (page) =>
      page.imageUrl &&
      (page.imageUrl.startsWith("https://") ||
        !page.imageUrl.includes("placeholder"))
  );

  const realImagesCount = pageImagesStatus.filter(Boolean).length;

  // If cover and more than 50% of pages have real images, consider it as having real images
  return coverHasRealImage && realImagesCount >= template.pages.length * 0.5
    ? "real"
    : "placeholder";
}

export function TemplateList({
  initialTemplates,
  onTemplateDeleted,
}: TemplateListProps) {
  const [templates, setTemplates] =
    useState<BookTemplateFull[]>(initialTemplates);
  const [deleteLoading, setDeleteLoading] = useState(false);

  const togglePublishMutation = useMutation({
    mutationFn: async (templateId: string) => {
      const result = await toggleTemplatePublished(templateId);
      if (!result.success) {
        throw new Error(result.error || "Failed to update template");
      }
      return result.data;
    },
    onSuccess: (data) => {
      toast.success(`Template ${data.published ? "published" : "unpublished"}`);
      // Update local state
      setTemplates((prevTemplates) =>
        prevTemplates.map((t) =>
          t.id === data.id ? { ...t, published: data.published } : t
        )
      );
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update template"
      );
    },
  });

  const handleDeleteTemplate = async (id: string, title: string) => {
    setDeleteLoading(true);
    try {
      const result = await deleteBookTemplate(id);
      if (result.success) {
        toast.success(`Successfully deleted template "${title}"`);
        // Remove from local state
        setTemplates(templates.filter((t) => t.id !== id));
        // Notify parent component
        onTemplateDeleted(id);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.error("Error deleting template:", error);
      toast.error("An error occurred while deleting the template");
    } finally {
      setDeleteLoading(false);
    }
  };

  const handleViewTemplate = (slug: string) => {
    window.open(`/library/template-preview/${slug}`, "_blank");
  };

  const handleManageImages = (id: string, slug: string) => {
    window.open(`/admin/templates/${slug}/images`, "_blank");
  };

  if (templates.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">No templates found</p>
        <Button asChild>
          <Link href="/admin/templates/create">Create Your First Template</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      <div className="grid grid-cols-12 font-medium text-sm p-2 border-b">
        <div className="col-span-3">Title</div>
        <div className="col-span-3">Genres</div>
        <div className="col-span-2">Pages</div>
        <div className="col-span-2">Status</div>
        <div className="col-span-2">Actions</div>
      </div>

      {templates.map((template) => {
        const imageStatus = getImageStatus(template);

        return (
          <div
            key={template.id}
            className="grid grid-cols-12 items-center p-2 border-b hover:bg-accent/10 rounded"
          >
            <div className="col-span-3 font-medium">
              {template.title}
              {!template.published && (
                <span className="ml-2 text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                  Draft
                </span>
              )}
            </div>
            <div className="col-span-3">
              <div className="flex flex-wrap gap-1">
                {template.genres.map((genre) => (
                  <span
                    key={genre.id}
                    className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded"
                  >
                    {genre.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="col-span-2">{template.pageCount} pages</div>
            <div className="col-span-2">
              <span
                className={`text-xs px-2 py-0.5 rounded flex items-center gap-1 w-fit ${
                  imageStatus === "real"
                    ? "bg-green-100 text-green-800"
                    : "bg-orange-100 text-orange-800"
                }`}
              >
                <BookImage className="h-3 w-3" />
                {imageStatus === "real" ? "Real Images" : "Placeholder Images"}
              </span>
            </div>
            <div className="col-span-2 flex space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleViewTemplate(template.slug)}
                title="View template preview"
              >
                <Eye className="h-4 w-4" />
              </Button>

              {/* FIXED: Always show Manage Images button, but with different styling */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleManageImages(template.id, template.slug)}
                title={
                  imageStatus === "real"
                    ? "Edit template images"
                    : "Upload template images"
                }
                className={
                  imageStatus === "real"
                    ? "text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                    : "text-orange-600 hover:text-orange-700 hover:bg-orange-50"
                }
              >
                {imageStatus === "real" ? (
                  <Edit className="h-4 w-4" />
                ) : (
                  <BookImage className="h-4 w-4" />
                )}
              </Button>

              <PublishToggleButton
                publish={template.published}
                isPending={togglePublishMutation.isPending}
                onToggle={() => togglePublishMutation.mutate(template.id)}
              />

              <AdminActionDialog
                title={`Delete Template: ${template.title}`}
                description="This will permanently delete this template. If any books are using this template, they may be affected."
                actionLabel="Delete Template"
                triggerLabel=""
                triggerIcon={<Trash2 className="h-4 w-4" />}
                isLoading={deleteLoading}
                onAction={() =>
                  handleDeleteTemplate(template.id, template.title)
                }
                variant="default"
                size="sm"
                actionVariant="destructive"
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
