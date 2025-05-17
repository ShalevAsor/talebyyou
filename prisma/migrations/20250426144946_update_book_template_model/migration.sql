/*
  Warnings:

  - You are about to drop the column `imageUrls` on the `ImageGeneration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverImageOptions" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "imageUrls";

-- AlterTable
ALTER TABLE "Page" ADD COLUMN     "imageOptions" TEXT[] DEFAULT ARRAY[]::TEXT[];
