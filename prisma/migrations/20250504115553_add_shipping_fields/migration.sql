/*
  Warnings:

  - You are about to drop the column `addressLine1` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `addressLine2` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `country` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `customerName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `postalCode` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `recipientName` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `state` on the `Order` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ShippingLevel" AS ENUM ('MAIL', 'PRIORITY_MAIL', 'GROUND', 'EXPEDITED', 'EXPRESS');

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "addressLine1",
DROP COLUMN "addressLine2",
DROP COLUMN "country",
DROP COLUMN "customerName",
DROP COLUMN "postalCode",
DROP COLUMN "recipientName",
DROP COLUMN "state",
ADD COLUMN     "country_code" TEXT,
ADD COLUMN     "name" TEXT,
ADD COLUMN     "phoneNumber" TEXT,
ADD COLUMN     "postcode" TEXT,
ADD COLUMN     "printingCost" DECIMAL(10,2),
ADD COLUMN     "shippingCost" DECIMAL(10,2),
ADD COLUMN     "shippingLevel" "ShippingLevel",
ADD COLUMN     "state_code" TEXT,
ADD COLUMN     "street1" TEXT,
ADD COLUMN     "street2" TEXT;
