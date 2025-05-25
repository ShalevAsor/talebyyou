-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_bookId_fkey";

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
