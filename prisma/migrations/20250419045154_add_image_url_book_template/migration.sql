/*
  Warnings:

  - Added the required column `imageUrl` to the `BookTemplate` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BookTemplate" ADD COLUMN     "imageUrl" TEXT NOT NULL;
