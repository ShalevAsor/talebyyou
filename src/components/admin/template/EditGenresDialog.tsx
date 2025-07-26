"use client";

import { Genre } from "@prisma/client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChartColumnStacked } from "lucide-react";
import { useState } from "react";
import { toast } from "react-toastify";

import { getAllGenres, updateTemplateGenres } from "@/actions/template-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { BookTemplateFull } from "@/types/book";

import { SimpleGenreSelector } from "./SimpleGenreSelector";

interface EditGenresDialogProps {
  template: BookTemplateFull;
  onGenresUpdated: (templateId: string, newGenres: Genre[]) => void;
}

export function EditGenresDialog({
  template,
  onGenresUpdated,
}: EditGenresDialogProps) {
  const [open, setOpen] = useState(false);
  const [selectedGenres, setSelectedGenres] = useState<string[]>(
    template.genres.map((g) => g.name)
  );

  // Fetch all available genres
  const { data: allGenres = [], isLoading: genresLoading } = useQuery({
    queryKey: ["genres"],
    queryFn: getAllGenres,
  });

  // Mutation for updating genres
  const updateGenresMutation = useMutation({
    mutationFn: async (genreNames: string[]) => {
      const result = await updateTemplateGenres(template.id, genreNames);
      if (!result.success) {
        throw new Error(result.error || "Failed to update genres");
      }
      return result.data;
    },
    onSuccess: (data) => {
      toast.success("Genres updated successfully");
      onGenresUpdated(data.templateId, data.genres);
      setOpen(false);
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update genres"
      );
    },
  });

  const handleSave = () => {
    updateGenresMutation.mutate(selectedGenres);
  };

  const handleCancel = () => {
    setSelectedGenres(template.genres.map((g) => g.name));
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          title="Edit genres"
          className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
        >
          <ChartColumnStacked className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Genres</DialogTitle>
          <p className="text-sm text-gray-600">
            Update genres for "{template.title}"
          </p>
        </DialogHeader>

        <div className="py-4">
          {genresLoading ? (
            <div className="text-center py-4">Loading genres...</div>
          ) : (
            <SimpleGenreSelector
              initialGenres={allGenres}
              value={selectedGenres}
              onChange={setSelectedGenres}
            />
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={updateGenresMutation.isPending}
          >
            {updateGenresMutation.isPending ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
