// src/app/(main)/my-books/order/[id]/loading.tsx
import { BookStoreLoading } from "@/components/common/BookStoreLoading";

export default function OrderLoading() {
  return (
    <BookStoreLoading
      message="Preparing Your Order"
      subMessage="We're getting everything ready for you to order your custom book"
      variant="bookFlip"
      size="lg"
      icon="bookOpen"
      className="min-h-[70vh]"
    />
  );
}
