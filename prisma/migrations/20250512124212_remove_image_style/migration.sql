/*
  Warnings:

  - You are about to drop the column `imageStyle` on the `BookTemplate` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "BookTemplate" DROP COLUMN "imageStyle";

-- DropEnum
DROP TYPE "ImageStyle";
