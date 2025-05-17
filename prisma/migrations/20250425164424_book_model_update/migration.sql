/*
  Warnings:

  - The values [DRAFT] on the enum `BookStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `pageNumber` on the `ImageGeneration` table. All the data in the column will be lost.
  - The `status` column on the `ImageGeneration` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `type` column on the `Page` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `GeneratedImage` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `ImageGeneration` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "PageType" AS ENUM ('TEXT', 'IMAGE', 'DEDICATION');

-- CreateEnum
CREATE TYPE "GenerationStatus" AS ENUM ('PENDING', 'COMPLETE', 'FAILED');

-- CreateEnum
CREATE TYPE "ImageType" AS ENUM ('COVER', 'PAGE');

-- AlterEnum
BEGIN;
CREATE TYPE "BookStatus_new" AS ENUM ('CUSTOMIZING', 'PREVIEW_READY', 'ORDERED', 'COMPLETED');
ALTER TABLE "Book" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Book" ALTER COLUMN "status" TYPE "BookStatus_new" USING ("status"::text::"BookStatus_new");
ALTER TYPE "BookStatus" RENAME TO "BookStatus_old";
ALTER TYPE "BookStatus_new" RENAME TO "BookStatus";
DROP TYPE "BookStatus_old";
ALTER TABLE "Book" ALTER COLUMN "status" SET DEFAULT 'CUSTOMIZING';
COMMIT;

-- DropForeignKey
ALTER TABLE "GeneratedImage" DROP CONSTRAINT "GeneratedImage_generationId_fkey";

-- AlterTable
ALTER TABLE "Book" ALTER COLUMN "status" SET DEFAULT 'CUSTOMIZING';

-- AlterTable
ALTER TABLE "ImageGeneration" DROP COLUMN "pageNumber",
ADD COLUMN     "imageUrls" TEXT[],
DROP COLUMN "type",
ADD COLUMN     "type" "ImageType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "GenerationStatus" NOT NULL DEFAULT 'PENDING';

-- AlterTable
ALTER TABLE "Page" DROP COLUMN "type",
ADD COLUMN     "type" "PageType" NOT NULL DEFAULT 'TEXT';

-- DropTable
DROP TABLE "GeneratedImage";
