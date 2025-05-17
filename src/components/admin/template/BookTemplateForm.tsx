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
import { createBookTemplate } from "@/actions/template-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  BookTemplateCreateData,
  BookTemplatePageCreateData,
} from "@/types/book";
import { Genre } from "@/generated/prisma";
import { z } from "zod";

// Define the schema to exactly match BookTemplatePageCreateData
const templatePageSchema = z.object({
  pageNumber: z.number().min(1),
  content: z.string().min(5, "Content must be at least 5 characters"),
  imagePrompt: z
    .string()
    .min(10, "Image prompt must be at least 10 characters"),
  imageUrl: z.string(), // Required, not optional
});

// Define the schema to exactly match BookTemplateCreateData
const templateSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  pageCount: z.number().min(1, "Book must have at least 1 page"),
  coverPrompt: z
    .string()
    .min(10, "Cover prompt must be at least 10 characters"),
  coverImage: z.string(),
  published: z.boolean(),
  minAge: z.number().min(0),
  maxAge: z.number().min(0),
  genres: z.array(z.string()).min(1, "Select at least one genre"),
  pages: z.array(templatePageSchema).min(1, "Add at least one page"),
});

// Default page for form - make sure it matches BookTemplatePageCreateData
const defaultPage: BookTemplatePageCreateData = {
  pageNumber: 1,
  content: "",
  imagePrompt: "",
  imageUrl: "/images/style/styleImageCartoon.jpg", // Default value for required field
};

interface BookTemplateFormProps {
  genres: Genre[];
  initialData?: Partial<BookTemplateCreateData>;
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

  // Set defaults ensuring all required fields have values
  const defaultValues: BookTemplateCreateData = {
    title: initialData?.title || "",
    description: initialData?.description || "",
    pageCount: initialData?.pageCount || 1,
    coverPrompt: initialData?.coverPrompt || "",
    coverImage: initialData?.coverImage || "/images/style/styleImageAnime.jpg",
    published: initialData?.published || false,
    minAge: initialData?.minAge || 0,
    maxAge: initialData?.maxAge || 8,
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
    getValues,
  } = useForm<BookTemplateCreateData>({
    resolver: zodResolver(templateSchema),
    defaultValues,
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "pages",
  });

  const watchPageCount = watch("pageCount");

  // Sync page count with actual pages array
  const syncPageCount = () => {
    const currentCount = fields.length;
    const targetCount = watchPageCount;

    if (targetCount > currentCount) {
      // Add new pages
      for (let i = currentCount + 1; i <= targetCount; i++) {
        append({
          ...defaultPage,
          pageNumber: i,
        });
      }
    } else if (targetCount < currentCount) {
      // Remove excess pages
      for (let i = currentCount - 1; i >= targetCount; i--) {
        remove(i);
      }
    }
  };

  // Form submission handler
  const onSubmit = async () => {
    // Get values and ensure they match BookTemplateCreateData
    const formData = getValues();

    // Ensure imageUrl is not undefined for any page
    const validPages: BookTemplatePageCreateData[] = formData.pages.map(
      (page, index) => ({
        pageNumber: index + 1,
        content: page.content,
        imagePrompt: page.imagePrompt,
        imageUrl: page.imageUrl || "/images/style/styleImageCartoon.jpg", // Default if missing
      })
    );

    // Create properly typed data object
    const templateData: BookTemplateCreateData = {
      ...formData,
      pages: validPages,
    };

    setLoading(true);
    try {
      const result = await createBookTemplate(templateData);

      if (result.success) {
        setMessage({
          text: "Template created successfully!",
          type: "success",
        });

        // Navigate back to templates list after successful creation
        setTimeout(() => {
          router.push("/admin/templates");
          router.refresh();
        }, 2000);
      } else {
        setMessage({
          text: result.error || "Failed to create template",
          type: "error",
        });
      }
    } catch (error) {
      console.error("Error creating template:", error);
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

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="minAge">Min Age</Label>
                  <Input
                    id="minAge"
                    type="number"
                    {...register("minAge", { valueAsNumber: true })}
                  />
                  {errors.minAge && (
                    <p className="text-sm text-red-500">
                      {errors.minAge.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="maxAge">Max Age</Label>
                  <Input
                    id="maxAge"
                    type="number"
                    {...register("maxAge", { valueAsNumber: true })}
                  />
                  {errors.maxAge && (
                    <p className="text-sm text-red-500">
                      {errors.maxAge.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Genres</Label>
                <div className="grid grid-cols-3 gap-2">
                  {genres.map((genre) => (
                    <div key={genre.id} className="flex items-center space-x-2">
                      <Controller
                        control={control}
                        name="genres"
                        render={({ field }) => (
                          <Checkbox
                            id={`genre-${genre.id}`}
                            checked={field.value?.includes(genre.name)}
                            onCheckedChange={(checked) => {
                              const currentValue = field.value || [];
                              const newValue = checked
                                ? [...currentValue, genre.name]
                                : currentValue.filter(
                                    (val) => val !== genre.name
                                  );
                              field.onChange(newValue);
                            }}
                          />
                        )}
                      />
                      <Label htmlFor={`genre-${genre.id}`}>{genre.name}</Label>
                    </div>
                  ))}
                </div>
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
                      <Label htmlFor={`pages.${index}.imageUrl`}>
                        Image URL
                      </Label>
                      <Input
                        id={`pages.${index}.imageUrl`}
                        defaultValue="/images/style/styleImageCartoon.jpg"
                        {...register(`pages.${index}.imageUrl`)}
                      />
                      {errors.pages?.[index]?.imageUrl && (
                        <p className="text-sm text-red-500">
                          {errors.pages[index]?.imageUrl?.message}
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
                    {watch("pageCount")} pages
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </form>
  );
}
