/*
  Warnings:

  - You are about to drop the column `ageRange` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `dedication` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `BookTemplate` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the `_BookToGenre` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[title]` on the table `Book` will be added. If there are existing duplicate values, this will fail.
  - Made the column `templateId` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `pageCount` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `published` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BookStatus" AS ENUM ('DRAFT', 'CUSTOMIZING', 'COMPLETED', 'ORDERED');

-- DropForeignKey
ALTER TABLE "Book" DROP CONSTRAINT "Book_templateId_fkey";

-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookToGenre" DROP CONSTRAINT "_BookToGenre_B_fkey";

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "ageRange",
DROP COLUMN "dedication",
DROP COLUMN "description",
DROP COLUMN "pages",
ADD COLUMN     "coverDedication" TEXT,
ADD COLUMN     "pageDedication" TEXT,
ADD COLUMN     "status" "BookStatus" NOT NULL DEFAULT 'DRAFT',
ADD COLUMN     "userId" TEXT,
ALTER COLUMN "templateId" SET NOT NULL;

-- AlterTable
ALTER TABLE "BookTemplate" DROP COLUMN "name",
ADD COLUMN     "pageCount" INTEGER NOT NULL,
ADD COLUMN     "published" BOOLEAN NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- DropTable
DROP TABLE "_BookToGenre";

-- CreateTable
CREATE TABLE "Page" (
    "id" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "imagePrompt" TEXT NOT NULL,
    "imageUrl" TEXT,
    "bookId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Page_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Page_bookId_pageNumber_key" ON "Page"("bookId", "pageNumber");

-- CreateIndex
CREATE UNIQUE INDEX "Book_title_key" ON "Book"("title");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "BookTemplate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Page" ADD CONSTRAINT "Page_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;
