"use client";

import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { BookTemplateFull } from "@/types/book"; // Adjust import path as needed
import { useEffect } from "react";

// Now this works because we're in a client component
const BookTemplatePreview = dynamic(
  () => import("@/components/templates/BookTemplatePreview"),
  {
    ssr: false, // This works now!
    loading: () => (
      <div className="flex justify-center items-center p-12 min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <span className="ml-2">Loading preview...</span>
      </div>
    ),
  }
);

interface BookTemplatePreviewClientProps {
  bookTemplate: BookTemplateFull;
}

export default function BookTemplatePreviewClient({
  bookTemplate,
}: BookTemplatePreviewClientProps) {
  useEffect(() => {
    if (typeof window !== "undefined" && window.pintrk) {
      window.pintrk("track", "pagevisit", {
        event_id: `template_view_${bookTemplate.slug}`,
        property: bookTemplate.title,
      });
    }
  }, [bookTemplate.slug, bookTemplate.title]);
  return <BookTemplatePreview bookTemplate={bookTemplate} />;
}
