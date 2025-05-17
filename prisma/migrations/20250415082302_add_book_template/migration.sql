-- CreateTable
CREATE TABLE "BookTemplate" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "coverImage" TEXT NOT NULL,
    "ageRange" TEXT NOT NULL,
    "pageCount" INTEGER NOT NULL,
    "previewImages" TEXT[],
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "pages" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BookTemplate_pkey" PRIMARY KEY ("id")
);
