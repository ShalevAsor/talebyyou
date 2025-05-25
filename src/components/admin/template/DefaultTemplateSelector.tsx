// src/components/admin/template/DefaultTemplateSelector.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Import, BookOpen } from "lucide-react";
import Image from "next/image";
import { defaultTemplates } from "@/data/default-templates";
import { BookTemplateCreateData } from "@/types/book";

interface DefaultTemplateSelectorProps {
  onTemplateSelect: (template: BookTemplateCreateData) => void;
}

export function DefaultTemplateSelector({
  onTemplateSelect,
}: DefaultTemplateSelectorProps) {
  const [open, setOpen] = useState(false);

  const handleTemplateSelect = (template: BookTemplateCreateData) => {
    onTemplateSelect(template);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full sm:w-auto">
          <Import className="mr-2 h-4 w-4" />
          Import Default Template
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <BookOpen className="h-5 w-5" />
            Select a Default Template
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {defaultTemplates.map((template, index) => (
            <Card
              key={index}
              className="cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-indigo-200"
              onClick={() => handleTemplateSelect(template)}
            >
              <CardContent className="p-4">
                {/* Template Cover Image */}
                <div className="relative aspect-[3/4] mb-3 overflow-hidden rounded-lg bg-gray-100">
                  <Image
                    src={template.coverImage}
                    alt={`${template.title} cover`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                {/* Template Info */}
                <div className="space-y-2">
                  <h3 className="font-semibold text-lg line-clamp-2">
                    {template.title}
                  </h3>

                  <p className="text-sm text-gray-600 line-clamp-3">
                    {template.description}
                  </p>

                  {/* Template Details */}
                  <div className="flex flex-wrap gap-1 mt-2">
                    <Badge variant="secondary" className="text-xs">
                      {template.pageCount} pages
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      Ages {template.minAge}-{template.maxAge}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {template.characterGender}
                    </Badge>
                  </div>

                  {/* Genres */}
                  <div className="flex flex-wrap gap-1">
                    {template.genres.slice(0, 2).map((genre, genreIndex) => (
                      <Badge
                        key={genreIndex}
                        variant="outline"
                        className="text-xs"
                      >
                        {genre}
                      </Badge>
                    ))}
                    {template.genres.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{template.genres.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {defaultTemplates.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No default templates available</p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
