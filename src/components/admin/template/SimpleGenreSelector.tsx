"use client";

import { Genre } from "@prisma/client";
import { Plus, X } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface SimpleGenreSelectorProps {
  initialGenres: Genre[];
  value: string[];
  onChange: (genres: string[]) => void;
}

export function SimpleGenreSelector({
  initialGenres,
  value,
  onChange,
}: SimpleGenreSelectorProps) {
  const [availableGenres, setAvailableGenres] = useState<string[]>(
    initialGenres.map((g) => g.name)
  );
  const [newGenreName, setNewGenreName] = useState("");
  const [showAddGenre, setShowAddGenre] = useState(false);

  const handleAddGenre = () => {
    if (newGenreName.trim() && !availableGenres.includes(newGenreName.trim())) {
      const trimmedName = newGenreName.trim();
      setAvailableGenres((prev) => [...prev, trimmedName]);
      // Automatically select the new genre
      onChange([...value, trimmedName]);
      setNewGenreName("");
      setShowAddGenre(false);
    }
  };

  const handleRemoveCustomGenre = (genreName: string) => {
    // Only allow removing genres that aren't in the original list
    const isOriginalGenre = initialGenres.some((g) => g.name === genreName);
    if (!isOriginalGenre) {
      setAvailableGenres((prev) => prev.filter((g) => g !== genreName));
      onChange(value.filter((g) => g !== genreName));
    }
  };

  const isOriginalGenre = (genreName: string) => {
    return initialGenres.some((g) => g.name === genreName);
  };

  const handleGenreToggle = (genreName: string, checked: boolean) => {
    const newValue = checked
      ? [...value, genreName]
      : value.filter((val) => val !== genreName);
    onChange(newValue);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label>Genres</Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setShowAddGenre(!showAddGenre)}
        >
          <Plus className="h-4 w-4 mr-1" />
          Add New Genre
        </Button>
      </div>

      {showAddGenre && (
        <div className="flex gap-2 p-3 border rounded-lg bg-gray-50">
          <Input
            placeholder="Enter new genre name"
            value={newGenreName}
            onChange={(e) => setNewGenreName(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddGenre();
              }
            }}
          />
          <Button type="button" onClick={handleAddGenre} size="sm">
            Add
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setShowAddGenre(false);
              setNewGenreName("");
            }}
          >
            Cancel
          </Button>
        </div>
      )}

      <div className="grid grid-cols-2 gap-3">
        {availableGenres.map((genreName) => (
          <div
            key={genreName}
            className="flex items-center justify-between space-x-2 p-2 border rounded"
          >
            <div className="flex items-center space-x-2 flex-1">
              <Checkbox
                id={`genre-${genreName}`}
                checked={value.includes(genreName)}
                onCheckedChange={(checked) =>
                  handleGenreToggle(genreName, checked as boolean)
                }
              />
              <Label htmlFor={`genre-${genreName}`} className="flex-1">
                {genreName}
              </Label>
            </div>
            {!isOriginalGenre(genreName) && (
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => handleRemoveCustomGenre(genreName)}
                className="h-6 w-6 p-0 text-red-500 hover:text-red-700"
              >
                <X className="h-3 w-3" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
