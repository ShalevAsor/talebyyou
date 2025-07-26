// src/components/admin/template/S3ImageSelector.tsx
"use client";

import { Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

import {
  getTemplateS3Images,
  updateTemplateImageUrl,
} from "@/actions/template-actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface S3ImageSelectorProps {
  templateSlug: string;
  target: "cover" | string; // "cover" or page ID
  targetLabel: string; // "Cover" or "Page 1", "Page 2", etc.
  onImageSelected: (imageUrl: string) => void;
}

export function S3ImageSelector({
  templateSlug,
  target,
  targetLabel,
  onImageSelected,
}: S3ImageSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [s3Images, setS3Images] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [selecting, setSelecting] = useState<string | null>(null);

  const loadS3Images = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTemplateS3Images(templateSlug);
      if (result.success) {
        setS3Images(result.data);
      } else {
        console.error("Failed to load S3 images:", result.error);
        toast.error("Failed to load existing images");
      }
    } catch (error) {
      console.error("Failed to load S3 images:", error);
      toast.error("Failed to load existing images");
    } finally {
      setLoading(false);
    }
  }, [templateSlug]);

  const handleDialogOpenChange = useCallback(
    (open: boolean) => {
      setIsOpen(open);
      if (open) {
        loadS3Images();
      }
    },
    [loadS3Images]
  );

  const handleImageSelect = async (imageUrl: string) => {
    setSelecting(imageUrl);
    try {
      const result = await updateTemplateImageUrl(
        templateSlug,
        imageUrl,
        target
      );

      if (result.success) {
        toast.success(`${targetLabel} image updated successfully!`);
        onImageSelected(imageUrl);
        setIsOpen(false);
      } else {
        toast.error(result.error || "Failed to update image");
      }
    } catch (error) {
      console.error("Error updating image:", error);
      toast.error("Failed to update image");
    } finally {
      setSelecting(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="w-full">
          <ImageIcon className="h-4 w-4 mr-2" />
          Select from S3
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Select Image for {targetLabel}</DialogTitle>
        </DialogHeader>

        <div className="mt-4">
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2">Loading S3 images...</span>
            </div>
          ) : s3Images.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No images found in S3 for this template.</p>
              <p className="text-sm">
                Upload some images first, then you can reuse them here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {s3Images.map((imageUrl, index) => (
                <div key={index} className="relative group">
                  <div className="aspect-square overflow-hidden rounded-lg border-2 border-gray-200 hover:border-blue-500 transition-colors">
                    <Image
                      src={imageUrl}
                      alt={`S3 image ${index + 1}`}
                      width={200}
                      height={200}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button
                    onClick={() => handleImageSelect(imageUrl)}
                    disabled={selecting === imageUrl}
                    className="absolute inset-0 bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    variant="ghost"
                  >
                    {selecting === imageUrl ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      `Use for ${targetLabel}`
                    )}
                  </Button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex justify-end mt-6 pt-4 border-t">
          <Button variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
