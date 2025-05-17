// app/library/customize/[id]/loading.tsx
import { BookStoreLoading } from "@/components/common/BookStoreLoading";

export default function Loading() {
  return (
    <BookStoreLoading
      message="Opening book template..."
      subMessage="Preparing your customization options"
      variant="minimal"
      size="md"
      className="min-h-[60vh] flex items-center justify-center"
    />
  );
}
