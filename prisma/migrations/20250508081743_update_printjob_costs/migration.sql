-- AlterTable
ALTER TABLE "PrintJob" ADD COLUMN     "currency" TEXT NOT NULL DEFAULT 'USD',
ADD COLUMN     "printingCostExclTax" DECIMAL(10,2),
ADD COLUMN     "printingCostInclTax" DECIMAL(10,2),
ADD COLUMN     "shippingCostExclTax" DECIMAL(10,2),
ADD COLUMN     "shippingCostInclTax" DECIMAL(10,2),
ADD COLUMN     "totalCostExclTax" DECIMAL(10,2),
ADD COLUMN     "totalCostInclTax" DECIMAL(10,2),
ADD COLUMN     "totalTax" DECIMAL(10,2);
