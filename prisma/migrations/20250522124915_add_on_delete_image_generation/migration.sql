-- DropForeignKey
ALTER TABLE "ImageGeneration" DROP CONSTRAINT "ImageGeneration_bookId_fkey";

-- AddForeignKey
ALTER TABLE "ImageGeneration" ADD CONSTRAINT "ImageGeneration_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
