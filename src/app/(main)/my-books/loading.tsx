import { BookStoreLoading } from "@/components/common/BookStoreLoading";

export default function MyBooksLoading() {
  return (
    <BookStoreLoading
      message="Loading Your Personal Library..."
      subMessage="Getting your custom books ready for you"
      variant="pagesTurn"
      size="lg"
      icon="book"
      className="min-h-[70vh]"
    />
  );
}
