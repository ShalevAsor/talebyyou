/*
  Warnings:

  - The primary key for the `BookTemplate` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `ageRange` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `coverImage` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `pageCount` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `pages` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `previewImages` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `slug` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `BookTemplate` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `BookTemplate` table. All the data in the column will be lost.
  - Added the required column `name` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "BookTemplate_slug_key";

-- AlterTable
ALTER TABLE "BookTemplate" DROP CONSTRAINT "BookTemplate_pkey",
DROP COLUMN "ageRange",
DROP COLUMN "coverImage",
DROP COLUMN "pageCount",
DROP COLUMN "pages",
DROP COLUMN "previewImages",
DROP COLUMN "slug",
DROP COLUMN "tags",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "BookTemplate_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "BookTemplate_id_seq";

-- CreateTable
CREATE TABLE "Genre" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "ageRange" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pages" JSONB NOT NULL,
    "templateId" TEXT,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BookToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BookTemplateToGenre" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,

    CONSTRAINT "_BookTemplateToGenre_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Genre_name_key" ON "Genre"("name");

-- CreateIndex
CREATE INDEX "_BookToGenre_B_index" ON "_BookToGenre"("B");

-- CreateIndex
CREATE INDEX "_BookTemplateToGenre_B_index" ON "_BookTemplateToGenre"("B");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "BookTemplate"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToGenre" ADD CONSTRAINT "_BookToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "Book"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookToGenre" ADD CONSTRAINT "_BookToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookTemplateToGenre" ADD CONSTRAINT "_BookTemplateToGenre_A_fkey" FOREIGN KEY ("A") REFERENCES "BookTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookTemplateToGenre" ADD CONSTRAINT "_BookTemplateToGenre_B_fkey" FOREIGN KEY ("B") REFERENCES "Genre"("id") ON DELETE CASCADE ON UPDATE CASCADE;
