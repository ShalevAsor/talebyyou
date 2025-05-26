import { NextRequest, NextResponse } from "next/server";
import { uploadTemplateImageToS3 } from "@/services/aws/s3-service";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";

// Configure the API route to handle larger payloads
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "10mb",
    },
  },
};

export async function POST(request: NextRequest) {
  try {
    // Check authentication (if needed)
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get("file") as File;
    const templateId = formData.get("templateId") as string;
    const pageNumber = parseInt(formData.get("pageNumber") as string);

    if (!file || !templateId || isNaN(pageNumber)) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate file size (10MB limit)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { error: "File size exceeds 10MB limit" },
        { status: 400 }
      );
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "Invalid file type. Only images are allowed." },
        { status: 400 }
      );
    }

    // Get the template to get the slug
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { slug: true },
    });

    if (!template || !template.slug) {
      return NextResponse.json(
        { error: "Template not found or has no slug" },
        { status: 404 }
      );
    }

    // Convert file to buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    console.log("File converted to buffer, size:", buffer.length);

    // Determine image name based on page number
    const imageName = pageNumber === 0 ? "cover.jpg" : `page${pageNumber}.jpg`;

    // Upload image to S3
    console.log("Uploading to S3...");
    const imageUrl = await uploadTemplateImageToS3(
      buffer,
      template.slug,
      imageName,
      file.type
    );

    if (!imageUrl) {
      console.error("S3 upload failed");
      return NextResponse.json(
        { error: "Failed to upload image to S3" },
        { status: 500 }
      );
    }

    // Update the image URL in the database
    if (pageNumber === 0) {
      await prisma.bookTemplate.update({
        where: { id: templateId },
        data: { coverImage: imageUrl },
      });
      console.log("Updated cover image in database");
    } else {
      const updateResult = await prisma.templatePageContent.updateMany({
        where: {
          templateId,
          pageNumber,
        },
        data: { imageUrl },
      });

      if (updateResult.count === 0) {
        return NextResponse.json(
          {
            error: `No page found with number ${pageNumber} for this template`,
          },
          { status: 404 }
        );
      }
      console.log("Updated page image in database");
    }

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");
    revalidatePath(`/library/template-preview/${template.slug}`);

    console.log("Image upload completed successfully");

    return NextResponse.json({
      success: true,
      imageUrl,
      message: "Image updated successfully",
    });
  } catch (error) {
    console.error("Error updating template image:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
