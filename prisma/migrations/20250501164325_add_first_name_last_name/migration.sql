/*
  Warnings:

  - The values [PREVIEW_READY] on the enum `BookStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PROCESSING] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "BookStatus_new" AS ENUM ('CUSTOMIZING', 'ORDERED', 'READY_FOR_PRINTING', 'COMPLETED');
ALTER TABLE "Book" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Book" ALTER COLUMN "status" TYPE "BookStatus_new" USING ("status"::text::"BookStatus_new");
ALTER TYPE "BookStatus" RENAME TO "BookStatus_old";
ALTER TYPE "BookStatus_new" RENAME TO "BookStatus";
DROP TYPE "BookStatus_old";
ALTER TABLE "Book" ALTER COLUMN "status" SET DEFAULT 'CUSTOMIZING';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('PENDING', 'PAID', 'PRINTING', 'SHIPPED', 'FULFILLED', 'CANCELLED', 'REFUNDED');
ALTER TABLE "Order" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Order" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
ALTER TABLE "Order" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastName" TEXT;
