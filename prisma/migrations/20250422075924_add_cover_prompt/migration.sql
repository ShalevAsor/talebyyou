/*
  Warnings:

  - Added the required column `coverPrompt` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `coverPrompt` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "coverPrompt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "BookTemplate" ADD COLUMN     "coverPrompt" TEXT NOT NULL;
