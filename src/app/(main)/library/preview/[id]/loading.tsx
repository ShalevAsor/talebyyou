// src/app/(main)/library/loading.tsx
import { BookStoreLoading } from "@/components/common/BookStoreLoading";

export default function PreviewLoading() {
  return (
    <BookStoreLoading
      message="Preparing your book"
      subMessage="This might take a few seconds"
      size="lg"
      icon="library"
      className="min-h-[70vh]"
    />
  );
}
