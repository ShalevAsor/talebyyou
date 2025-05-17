/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `BookTemplate` table. All the data in the column will be lost.
  - Added the required column `coverImage` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imageUrl` to the `TemplatePageContent` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
ALTER TYPE "PageType" ADD VALUE 'GENERAL';

-- AlterTable
ALTER TABLE "BookTemplate" DROP COLUMN "imageUrl",
ADD COLUMN     "coverImage" TEXT NOT NULL,
ADD COLUMN     "maxAge" INTEGER NOT NULL DEFAULT 8,
ADD COLUMN     "minAge" INTEGER NOT NULL DEFAULT 3;

-- AlterTable
ALTER TABLE "TemplatePageContent" ADD COLUMN     "imageUrl" TEXT NOT NULL;
