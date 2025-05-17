-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "ebookExpiresAt" TIMESTAMP(3),
ADD COLUMN     "ebookFileName" TEXT,
ADD COLUMN     "ebookFileType" TEXT,
ADD COLUMN     "ebookS3Key" TEXT,
ADD COLUMN     "orderId" TEXT;
