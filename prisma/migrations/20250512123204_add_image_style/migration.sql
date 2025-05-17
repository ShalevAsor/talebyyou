-- CreateEnum
CREATE TYPE "ImageStyle" AS ENUM ('DEFAULT', 'ADVENTURE', 'PLAYFUL');

-- AlterTable
ALTER TABLE "BookTemplate" ADD COLUMN     "imageStyle" "ImageStyle" NOT NULL DEFAULT 'DEFAULT';
