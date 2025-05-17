/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BookTemplate` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookTemplate" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "BookTemplate_slug_key" ON "BookTemplate"("slug");
