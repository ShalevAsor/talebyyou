// src/components/admin/template/TemplateEditor.tsx
"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Plus, Trash2, ChevronLeft, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { BookTemplateFull } from "@/types/book";
import { toast } from "react-toastify";
import {
  templateSchema,
  type TemplateFormData,
} from "@/schemas/template-schema";
import { updateBookTemplate } from "@/actions/template-actions";

interface TemplateEditorProps {
  template: BookTemplateFull;
}

export const TemplateEditor: React.FC<TemplateEditorProps> = ({ template }) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  // Convert template data to form format
  const defaultValues: TemplateFormData = {
    title: template.title,
    description: template.description,
    pageCount: template.pageCount,
    coverPrompt: template.coverPrompt,
    coverImage: template.coverImage,
    published: template.published,
    characterGender: template.characterGender as "boy" | "girl",
    minAge: template.minAge,
    maxAge: template.maxAge,
    consistentOutfit: template.consistentOutfit,
    genres: template.genres.map((g) => g.name),
    pages: template.pages.map((page) => ({
      pageNumber: page.pageNumber,
      content: page.content,
      imagePrompt: page.imagePrompt,
      imageUrl: page.imageUrl,
      pageOutfit: page.pageOutfit,
    })),
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
    setValue,
  } = useForm<TemplateFormData>({
    resolver: zodResolver(templateSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pages",
  });

  const watchPageCount = watch("pageCount");

  const syncPageCount = () => {
    const currentCount = fields.length;
    const targetCount = watchPageCount;

    if (targetCount > currentCount) {
      for (let i = currentCount + 1; i <= targetCount; i++) {
        append({
          pageNumber: i,
          content: "",
          imagePrompt: "",
          imageUrl: "/images/placeholders/book-template-placeholder.jpg",
        });
      }
    } else if (targetCount < currentCount) {
      for (let i = currentCount - 1; i >= targetCount; i--) {
        remove(i);
      }
    }
  };

  const onSubmit = async (data: TemplateFormData) => {
    setLoading(true);
    try {
      const result = await updateBookTemplate(template.id, data);

      if (result.success) {
        setMessage({
          text: "Template updated successfully!",
          type: "success",
        });
        toast.success("Template updated successfully!");
      } else {
        setMessage({
          text: result.error || "Failed to update template",
          type: "error",
        });
        toast.error(result.error || "Failed to update template");
      }
    } catch (error) {
      console.error("Error updating template:", error);
      toast.error("Failed to update template");
      setMessage({
        text: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/admin/templates");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Button variant="ghost" className="mr-2" onClick={handleBack}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Back
          </Button>
          <div>
            <h1 className="text-xl font-bold">Edit Template</h1>
            <p className="text-sm text-muted-foreground">{template.title}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isDirty && (
            <span className="text-sm text-orange-600 bg-orange-50 px-2 py-1 rounded">
              Unsaved changes
            </span>
          )}
          <Button
            onClick={handleSubmit(onSubmit)}
            disabled={loading || !isDirty}
            className="flex items-center gap-2"
          >
            {loading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      </div>

      {/* Alert Messages */}
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

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="pages">Pages Content</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" {...register("title")} />
                  {errors.title && (
                    <p className="text-sm text-red-500">
                      {errors.title.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" {...register("description")} />
                  {errors.description && (
                    <p className="text-sm text-red-500">
                      {errors.description.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pageCount">Page Count</Label>
                    <Input
                      id="pageCount"
                      type="number"
                      {...register("pageCount", { valueAsNumber: true })}
                      onBlur={syncPageCount}
                    />
                    {errors.pageCount && (
                      <p className="text-sm text-red-500">
                        {errors.pageCount.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="coverImage">Cover Image URL</Label>
                    <Input
                      id="coverImage"
                      {...register("coverImage")}
                      placeholder="Cover image managed separately"
                      disabled
                      className="bg-muted"
                    />
                    <p className="text-xs text-muted-foreground">
                      Cover image is managed via the separate image editor
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="coverPrompt">Cover Prompt</Label>
                  <Textarea id="coverPrompt" {...register("coverPrompt")} />
                  {errors.coverPrompt && (
                    <p className="text-sm text-red-500">
                      {errors.coverPrompt.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="consistentOutfit">
                    Consistent Outfit (Optional)
                  </Label>
                  <Input
                    id="consistentOutfit"
                    {...register("consistentOutfit")}
                    placeholder="e.g., colorful diving suit, space helmet, winter coat"
                  />
                  <p className="text-sm text-gray-500">
                    If specified, the character will wear this outfit throughout
                    the entire book. Leave empty to allow outfit variety based
                    on story context.
                  </p>
                  {errors.consistentOutfit && (
                    <p className="text-sm text-red-500">
                      {errors.consistentOutfit.message}
                    </p>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="minAge">Min Age</Label>
                    <Input
                      id="minAge"
                      type="number"
                      {...register("minAge", { valueAsNumber: true })}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="maxAge">Max Age</Label>
                    <Input
                      id="maxAge"
                      type="number"
                      {...register("maxAge", { valueAsNumber: true })}
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label className="text-base font-medium">
                    Character Gender
                  </Label>
                  <Controller
                    control={control}
                    name="characterGender"
                    render={({ field }) => (
                      <div className="flex flex-col space-y-3">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="gender-boy"
                            checked={field.value === "boy"}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange("boy");
                              }
                            }}
                          />
                          <Label
                            htmlFor="gender-boy"
                            className="cursor-pointer"
                          >
                            Boy
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="gender-girl"
                            checked={field.value === "girl"}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                field.onChange("girl");
                              }
                            }}
                          />
                          <Label
                            htmlFor="gender-girl"
                            className="cursor-pointer"
                          >
                            Girl
                          </Label>
                        </div>
                      </div>
                    )}
                  />
                  {errors.characterGender && (
                    <p className="text-sm text-red-500">
                      {errors.characterGender.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Genres</Label>
                  <div className="p-3 border rounded bg-muted">
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
                    <p className="text-xs text-muted-foreground mt-2">
                      Genres are managed via the separate genres editor
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Controller
                    control={control}
                    name="published"
                    render={({ field }) => (
                      <Checkbox
                        id="published"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    )}
                  />
                  <Label htmlFor="published">Published</Label>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pages" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Pages</CardTitle>
              </CardHeader>
              <CardContent>
                {fields.map((field, index) => (
                  <div key={field.id} className="border p-4 rounded-md mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="text-lg font-medium">Page {index + 1}</h3>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => remove(index)}
                        disabled={fields.length <= 1}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`pages.${index}.content`}>
                          Content
                        </Label>
                        <Textarea
                          id={`pages.${index}.content`}
                          {...register(`pages.${index}.content`)}
                          placeholder="Page content with [CHILD_NAME] placeholder"
                          rows={4}
                        />
                        {errors.pages?.[index]?.content && (
                          <p className="text-sm text-red-500">
                            {errors.pages[index]?.content?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`pages.${index}.imagePrompt`}>
                          Image Prompt
                        </Label>
                        <Textarea
                          id={`pages.${index}.imagePrompt`}
                          {...register(`pages.${index}.imagePrompt`)}
                          placeholder="Detailed description for image generation"
                          rows={3}
                        />
                        {errors.pages?.[index]?.imagePrompt && (
                          <p className="text-sm text-red-500">
                            {errors.pages[index]?.imagePrompt?.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor={`pages.${index}.pageOutfit`}>
                          Page-Specific Outfit (Optional)
                        </Label>
                        <Input
                          id={`pages.${index}.pageOutfit`}
                          {...register(`pages.${index}.pageOutfit`)}
                          placeholder="e.g., desert explorer outfit, winter coat (overrides template outfit)"
                        />
                        <p className="text-xs text-gray-500">
                          If specified, this page will use this outfit instead
                          of the template's consistent outfit.
                        </p>
                        {errors.pages?.[index]?.pageOutfit && (
                          <p className="text-sm text-red-500">
                            {errors.pages[index]?.pageOutfit?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                <div className="flex justify-between mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      append({
                        pageNumber: fields.length + 1,
                        content: "",
                        imagePrompt: "",
                        imageUrl:
                          "/images/placeholders/book-template-placeholder.jpg",
                      });
                      setValue("pageCount", fields.length + 1);
                    }}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Page
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="preview" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Template Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="border rounded-lg p-6">
                  <h2 className="text-2xl font-bold">{watch("title")}</h2>
                  <p className="text-gray-700 my-2">{watch("description")}</p>

                  <div className="text-sm text-gray-500 mb-4">
                    Ages {watch("minAge")}-{watch("maxAge")} •{" "}
                    {watch("pageCount")} pages • Character:{" "}
                    {watch("characterGender")}
                    {watch("consistentOutfit") && (
                      <> • Outfit: {watch("consistentOutfit")}</>
                    )}
                  </div>

                  <div className="mt-4 p-4 bg-gray-50 rounded">
                    <h3 className="font-medium">Sample Page Content</h3>
                    <p className="mt-2">{watch("pages.0.content")}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};
