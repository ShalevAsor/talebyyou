-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "guestSessionId" TEXT;

-- CreateTable
CREATE TABLE "GuestSession" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "lastActive" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GuestSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GuestSession_sessionId_key" ON "GuestSession"("sessionId");

-- AddForeignKey
ALTER TABLE "Book" ADD CONSTRAINT "Book_guestSessionId_fkey" FOREIGN KEY ("guestSessionId") REFERENCES "GuestSession"("id") ON DELETE SET NULL ON UPDATE CASCADE;
