/*
  Warnings:

  - You are about to drop the column `imageUrl` on the `ImageGeneration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "imageUrl";

-- CreateTable
CREATE TABLE "GeneratedImage" (
    "id" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "isSelected" BOOLEAN NOT NULL DEFAULT false,
    "generationId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "GeneratedImage_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GeneratedImage" ADD CONSTRAINT "GeneratedImage_generationId_fkey" FOREIGN KEY ("generationId") REFERENCES "ImageGeneration"("id") ON DELETE CASCADE ON UPDATE CASCADE;
