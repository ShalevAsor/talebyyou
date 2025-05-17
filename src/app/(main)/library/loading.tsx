// src/app/(main)/library/loading.tsx
import { BookStoreLoading } from "@/components/common/BookStoreLoading";

export default function LibraryLoading() {
  return (
    <BookStoreLoading
      message="Exploring the Library..."
      subMessage="Discovering our collection of customizable books"
      variant="pagesTurn"
      size="lg"
      icon="library"
      className="min-h-[70vh]"
    />
  );
}
