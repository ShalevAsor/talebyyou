"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Genre } from "@prisma/client";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { createBookTemplate } from "@/actions/template-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import {
  templateSchema,
  type TemplateFormData,
  type TemplatePageFormData,
} from "@/schemas/template-schema";
import {
  BookTemplateCreateData,
  BookTemplatePageCreateData,
} from "@/types/book";
import { generateSlug } from "@/utils/slugUtils";

import { GenreSelector } from "./GenreSelector";

// Default page template
const defaultPage: TemplatePageFormData = {
  pageNumber: 1,
  content: "",
  imagePrompt: "",
  imageUrl: "/images/placeholders/book-template-placeholder.jpg",
  pageOutfit: null,
};

interface BookTemplateFormProps {
  genres: Genre[];
  initialData?: Partial<TemplateFormData>;
}

export default function BookTemplateForm({
  genres,
  initialData,
}: BookTemplateFormProps) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("basic");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);

  const defaultValues: TemplateFormData = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    pageCount: initialData?.pageCount || 1,
    coverPrompt: initialData?.coverPrompt || "",
    coverImage:
      initialData?.coverImage ||
      "/images/placeholders/book-template-placeholder.jpg",
    published: initialData?.published || false,
    characterGender: initialData?.characterGender || "boy",
    minAge: initialData?.minAge || 0,
    maxAge: initialData?.maxAge || 8,
    consistentOutfit: initialData?.consistentOutfit || null,
    genres: initialData?.genres || [],
    pages: initialData?.pages || [{ ...defaultPage }],
  };

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
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
          ...defaultPage,
          pageNumber: i,
        });
      }
    } else if (targetCount < currentCount) {
      for (let i = currentCount - 1; i >= targetCount; i--) {
        remove(i);
      }
    }
  };

  const onSubmit = async (data: TemplateFormData) => {
    console.log("Form submitted!");

    // Convert TemplateFormData to BookTemplateCreateData for the action
    const validPages: BookTemplatePageCreateData[] = data.pages.map(
      (page, index) => ({
        pageNumber: index + 1,
        content: page.content,
        imagePrompt: page.imagePrompt,
        imageUrl:
          page.imageUrl || "/images/placeholders/book-template-placeholder.jpg",
        pageOutfit: page.pageOutfit || null,
      })
    );

    const templateData: BookTemplateCreateData = {
      title: data.title,
      description: data.description,
      pageCount: data.pageCount,
      coverPrompt: data.coverPrompt,
      coverImage: data.coverImage,
      published: data.published,
      characterGender: data.characterGender,
      consistentOutfit: data.consistentOutfit || null,
      minAge: data.minAge,
      maxAge: data.maxAge,
      genres: data.genres,
      pages: validPages,
    };

    setLoading(true);
    try {
      const result = await createBookTemplate(templateData);
      if (result.success) {
        const successMessage =
          "Template created successfully! Redirecting to upload images...";
        setMessage({
          text: successMessage,
          type: "success",
        });
        toast.success(successMessage);

        setTimeout(() => {
          const templateSlug = generateSlug(templateData.title);
          router.push(`/admin/templates/${templateSlug}/images`);
        }, 2000);
      } else {
        setMessage({
          text: result.error || "Failed to create template",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error creating template:", error);
      toast.error("Failed to create template");
      setMessage({
        text: "An unexpected error occurred",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
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

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
          <TabsTrigger value="preview">Preview</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Template Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" {...register("title")} />
                {errors.title && (
                  <p className="text-sm text-red-500">{errors.title.message}</p>
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
                  <Label htmlFor="coverImage">Cover Image</Label>
                  <Input id="coverImage" {...register("coverImage")} />
                  {errors.coverImage && (
                    <p className="text-sm text-red-500">
                      {errors.coverImage.message}
                    </p>
                  )}
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

              {/* NEW: Consistent Outfit Field */}
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
                  the entire book. Leave empty to allow outfit variety based on
                  story context.
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

              {/* Character Gender Selection */}
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
                        <Label htmlFor="gender-boy" className="cursor-pointer">
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
                        <Label htmlFor="gender-girl" className="cursor-pointer">
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
                <Controller
                  control={control}
                  name="genres"
                  render={({ field }) => (
                    <GenreSelector
                      control={control}
                      initialGenres={genres}
                      value={field.value || []}
                      onChange={field.onChange}
                    />
                  )}
                />
                {errors.genres && (
                  <p className="text-sm text-red-500">
                    {errors.genres.message}
                  </p>
                )}
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

              <Button type="button" onClick={() => setActiveTab("pages")}>
                Next: Pages Content
              </Button>
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
                      <Label htmlFor={`pages.${index}.content`}>Content</Label>
                      <Textarea
                        id={`pages.${index}.content`}
                        {...register(`pages.${index}.content`)}
                        placeholder="Page content with [CHILD_NAME] placeholder"
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
                        placeholder="e.g., desert explorer outfit (overrides template outfit)"
                      />
                      <p className="text-xs text-gray-500">
                        Leave empty to use template's consistent outfit
                      </p>
                      {errors.pages?.[index]?.pageOutfit && (
                        <p className="text-sm text-red-500">
                          {errors.pages[index]?.pageOutfit?.message}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor={`pages.${index}.imageUrl`}>
                        Image URL
                      </Label>
                      <Input
                        id={`pages.${index}.imageUrl`}
                        defaultValue="/images/placeholders/book-template-placeholder.jpg"
                        {...register(`pages.${index}.imageUrl`)}
                      />
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
                      ...defaultPage,
                      pageNumber: fields.length + 1,
                    });
                    setValue("pageCount", fields.length + 1);
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Page
                </Button>
                <Button type="button" onClick={() => setActiveTab("preview")}>
                  Next: Preview
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Preview & Submit</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-8">
                <h3 className="text-lg font-medium mb-2">Template Preview</h3>
                <p className="text-gray-500 mb-4">
                  This is how your template will appear to users.
                </p>

                <div className="border rounded-lg p-6">
                  <h2 className="text-2xl font-bold">{watch("title")}</h2>
                  <p className="text-gray-700 my-2">{watch("description")}</p>

                  <div className="flex gap-2 my-2">
                    {watch("genres").map((genre, i) => (
                      <span
                        key={i}
                        className="bg-gray-100 px-2 py-1 rounded text-sm"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>

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
              </div>

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setActiveTab("pages")}
                >
                  Back to Pages
                </Button>
                <Button type="submit" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating Template...
                    </>
                  ) : (
                    "Create Template"
                  )}
                </Button>
              </div>

              {/* Simple validation error display */}
              {Object.keys(errors).length > 0 && (
                <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">
                    Please fix these errors:
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-red-600">
                    {errors.title && <li>Title: {errors.title.message}</li>}
                    {errors.description && (
                      <li>Description: {errors.description.message}</li>
                    )}
                    {errors.coverPrompt && (
                      <li>Cover Prompt: {errors.coverPrompt.message}</li>
                    )}
                    {errors.characterGender && (
                      <li>
                        Character Gender: {errors.characterGender.message}
                      </li>
                    )}
                    {errors.consistentOutfit && (
                      <li>
                        Consistent Outfit: {errors.consistentOutfit.message}
                      </li>
                    )}
                    {errors.genres && <li>Genres: {errors.genres.message}</li>}
                    {errors.pages && (
                      <li>Check page content and image prompts</li>
                    )}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
