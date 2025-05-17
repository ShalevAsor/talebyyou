/*
  Warnings:

  - You are about to drop the column `content` on the `Page` table. All the data in the column will be lost.
  - Added the required column `type` to the `Page` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "content",
ADD COLUMN     "textContent" TEXT,
ADD COLUMN     "type" TEXT NOT NULL,
ALTER COLUMN "imagePrompt" DROP NOT NULL;
