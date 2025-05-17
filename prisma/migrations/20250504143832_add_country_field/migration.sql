/*
  Warnings:

  - You are about to drop the column `country_code` on the `Order` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "country_code",
ADD COLUMN     "country" TEXT;
