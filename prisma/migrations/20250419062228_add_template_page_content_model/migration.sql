-- CreateTable
CREATE TABLE "TemplatePageContent" (
    "id" TEXT NOT NULL,
    "pageNumber" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "imagePrompt" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TemplatePageContent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TemplatePageContent_templateId_pageNumber_key" ON "TemplatePageContent"("templateId", "pageNumber");

-- AddForeignKey
ALTER TABLE "TemplatePageContent" ADD CONSTRAINT "TemplatePageContent_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "BookTemplate"("id") ON DELETE CASCADE ON UPDATE CASCADE;
