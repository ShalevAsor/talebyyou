-- CreateEnum
CREATE TYPE "FileValidationStatus" AS ENUM ('NULL', 'VALIDATING', 'VALIDATED', 'NORMALIZING', 'NORMALIZED', 'ERROR');

-- CreateEnum
CREATE TYPE "PrintJobStatus" AS ENUM ('CREATED', 'UNPAID', 'PAYMENT_IN_PROGRESS', 'PRODUCTION_DELAYED', 'PRODUCTION_READY', 'IN_PRODUCTION', 'SHIPPED', 'REJECTED', 'CANCELED');

-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "printJobId" TEXT;

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "printJobId" TEXT;

-- CreateTable
CREATE TABLE "PrintJob" (
    "id" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "luluPrintJobId" INTEGER,
    "podPackageId" TEXT NOT NULL,
    "interiorPdfUrl" TEXT,
    "coverPdfUrl" TEXT,
    "interiorS3Key" TEXT,
    "coverS3Key" TEXT,
    "pageCount" INTEGER NOT NULL,
    "interiorValidationId" INTEGER,
    "coverValidationId" INTEGER,
    "interiorValidationStatus" "FileValidationStatus" NOT NULL DEFAULT 'NULL',
    "coverValidationStatus" "FileValidationStatus" NOT NULL DEFAULT 'NULL',
    "validationErrors" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "status" "PrintJobStatus" NOT NULL DEFAULT 'CREATED',
    "statusMessage" TEXT,
    "trackingNumber" TEXT,
    "trackingUrls" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "shippingCarrier" TEXT,
    "estimatedShipDate" TIMESTAMP(3),
    "estimatedDeliveryDate" TIMESTAMP(3),
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "errorMessage" TEXT,
    "sentByAdminId" TEXT,
    "adminNotes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "sentToPrinterAt" TIMESTAMP(3),
    "paidAt" TIMESTAMP(3),
    "inProductionAt" TIMESTAMP(3),
    "shippedAt" TIMESTAMP(3),

    CONSTRAINT "PrintJob_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PrintJob_orderId_key" ON "PrintJob"("orderId");

-- CreateIndex
CREATE UNIQUE INDEX "PrintJob_bookId_key" ON "PrintJob"("bookId");

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PrintJob" ADD CONSTRAINT "PrintJob_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
