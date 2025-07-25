"use server";

import prisma from "@/lib/prisma";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { Genre, Prisma } from "@prisma/client";
import { defaultTemplates } from "@/data/default-templates";
import { BookTemplateCreateData, BookTemplateFull } from "@/types/book";
import { revalidatePath } from "next/cache";
import { generateSlug } from "@/utils/slugUtils";
import {
  deleteTemplateImagesFromS3,
  getTemplateImagesFromS3,
  uploadTemplateImageToS3,
} from "@/services/aws/s3-service";
import { cleanupTempFile } from "@/utils/fileUtils";
import { TemplateFormData } from "@/schemas/template-schema";

/**
 * Get book template by id
 */
export async function getBookTemplateById(
  id: string
): Promise<ActionResult<BookTemplateFull>> {
  try {
    const template = await prisma.bookTemplate.findUnique({
      where: { id },
      include: {
        genres: true,
        pages: {
          orderBy: {
            pageNumber: "asc",
          },
        },
      },
    });

    if (!template) {
      return createErrorResult(`Book template with ID ${id} not found`);
    }

    return createSuccessResult(template);
  } catch (error) {
    console.error(`Error fetching book template with ID ${id}:`, error);
    return createErrorResult("Failed to fetch book template");
  }
}

/**
 * Get book template by slug
 */
export async function getBookTemplateBySlug(
  slug: string
): Promise<ActionResult<BookTemplateFull>> {
  try {
    const template = await prisma.bookTemplate.findUnique({
      where: { slug },
      include: {
        genres: true,
        pages: {
          orderBy: {
            pageNumber: "asc",
          },
        },
      },
    });

    if (!template) {
      return createErrorResult(`Book template with slug "${slug}" not found`);
    }

    return createSuccessResult(template);
  } catch (error) {
    console.error(`Error fetching book template with slug "${slug}":`, error);
    return createErrorResult("Failed to fetch book template");
  }
}

/**
 * Get all book templates
 * @param options - Optional filtering and sorting options
 */
export async function getAllBookTemplates(options?: {
  limit?: number;
  orderBy?: "newest" | "oldest" | "title";
  filterByGenre?: string[];
  publishedOnly?: boolean;
}): Promise<ActionResult<BookTemplateFull[]>> {
  try {
    const {
      limit,
      orderBy = "newest",
      filterByGenre,
      publishedOnly = true,
    } = options || {};

    const whereClause: Prisma.BookTemplateWhereInput = {};
    let orderByClause: Prisma.BookTemplateOrderByWithRelationInput = {};

    if (publishedOnly) {
      whereClause.published = true;
    }

    if (orderBy === "newest") {
      orderByClause = { createdAt: "desc" };
    } else if (orderBy === "oldest") {
      orderByClause = { createdAt: "asc" };
    } else if (orderBy === "title") {
      orderByClause = { title: "asc" };
    }

    if (filterByGenre?.length) {
      whereClause.genres = {
        some: {
          name: { in: filterByGenre },
        },
      };
    }

    const templates = await prisma.bookTemplate.findMany({
      where: whereClause,
      orderBy: orderByClause,
      include: { genres: true, pages: true },
      ...(limit ? { take: limit } : {}),
    });

    return createSuccessResult(templates);
  } catch (error) {
    console.error("Error fetching book templates:", error);
    throw error;
    return createErrorResult("Failed to fetch book templates");
  }
}

/**
 * Ensure a template slug is unique
 */
async function ensureUniqueSlug(
  baseSlug: string,
  id?: string
): Promise<string> {
  let slug = baseSlug;
  let counter = 1;

  while (true) {
    // Check if slug exists (excluding the current template if updating)
    const existing = await prisma.bookTemplate.findFirst({
      where: {
        slug,
        ...(id ? { id: { not: id } } : {}),
      },
    });

    if (!existing) break;

    // Slug exists, try with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}

export async function seedBookTemplates(): Promise<ActionResult<string>> {
  try {
    let created = 0;
    let updated = 0;

    // Process each template
    for (const template of defaultTemplates) {
      console.log(`Processing template: "${template.title}"`);
      // Generate a slug from the title
      const baseSlug = generateSlug(template.title);
      console.log(`Generated baseSlug: "${baseSlug}"`); // ADD THIS

      // First ensure all genres exist
      const genrePromises = template.genres.map(async (genreName) => {
        // Find or create genre
        return await prisma.genre.upsert({
          where: { name: genreName },
          update: { name: genreName }, // Ensure name is correct (usually no-op)
          create: { name: genreName },
        });
      });

      // Wait for all genres to be created/found
      const genres = await Promise.all(genrePromises);

      // Get existing template if any
      const existingTemplate = await prisma.bookTemplate.findUnique({
        where: { title: template.title },
      });

      // Ensure slug is unique
      const slug = await ensureUniqueSlug(baseSlug, existingTemplate?.id);
      console.log(`Final slug: "${slug}"`); // ADD THIS

      // Delete existing template pages if updating
      if (existingTemplate) {
        await prisma.templatePageContent.deleteMany({
          where: { templateId: existingTemplate.id },
        });
      }

      // Upsert the book template
      const bookTemplate = await prisma.bookTemplate.upsert({
        where: {
          title: template.title,
        },
        update: {
          description: template.description,
          pageCount: template.pageCount,
          coverPrompt: template.coverPrompt,
          published: template.published,
          characterGender: template.characterGender,
          coverImage: template.coverImage,
          minAge: template.minAge,
          maxAge: template.maxAge,
          slug, // Add slug to update
          genres: {
            set: [], // Clear existing genre connections
            connect: genres.map((genre) => ({ id: genre.id })),
          },
        },
        create: {
          title: template.title,
          slug, // Add slug to create
          description: template.description,
          pageCount: template.pageCount,
          coverPrompt: template.coverPrompt,
          published: template.published,
          characterGender: template.characterGender,
          coverImage: template.coverImage,
          minAge: template.minAge,
          maxAge: template.maxAge,
          genres: {
            connect: genres.map((genre) => ({ id: genre.id })),
          },
        },
        include: {
          genres: true,
        },
      });

      // Create template pages
      if (template.pages && template.pages.length > 0) {
        const pagePromises = template.pages.map(async (page) => {
          return await prisma.templatePageContent.create({
            data: {
              pageNumber: page.pageNumber,
              content: page.content,
              imagePrompt: page.imagePrompt,
              imageUrl: page.imageUrl,
              pageOutfit: page.pageOutfit || null,
              templateId: bookTemplate.id,
            },
          });
        });

        await Promise.all(pagePromises);
      }

      // Track if we created or updated
      if (existingTemplate) {
        updated++;
      } else {
        created++;
      }
      console.log(`Created/Updated template with slug: "${bookTemplate.slug}"`); // ADD THIS
    }

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");

    return createSuccessResult(
      `Successfully processed templates: ${created} created, ${updated} updated`
    );
  } catch (error) {
    console.error("Error seeding book templates:", error);
    return createErrorResult(
      `Failed to seed book templates: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
/**
 * Removes all book templates from the database
 */
export async function removeAllBookTemplates(): Promise<
  ActionResult<{ count: number }>
> {
  try {
    // Delete all templates
    const result = await prisma.bookTemplate.deleteMany({});

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");

    return createSuccessResult({ count: result.count });
  } catch (error) {
    console.error("Error removing book templates:", error);
    return createErrorResult("Failed to remove book templates");
  }
}

/**
 * Creates a new book template with placeholder images
 * @param data Template creation data
 * @returns ActionResult with the created template ID
 */
export async function createBookTemplate(
  data: BookTemplateCreateData
): Promise<ActionResult<string>> {
  try {
    // Generate slug from title
    const baseSlug = generateSlug(data.title);
    const slug = await ensureUniqueSlug(baseSlug);

    // First ensure all genres exist
    const genrePromises = data.genres.map(async (genreName) => {
      // Find or create genre
      return await prisma.genre.upsert({
        where: { name: genreName },
        update: { name: genreName },
        create: { name: genreName },
      });
    });

    // Wait for all genres to be created/found
    const genres = await Promise.all(genrePromises);

    // Create the book template
    const template = await prisma.bookTemplate.create({
      data: {
        title: data.title,
        slug, // Add slug
        description: data.description,
        pageCount: data.pageCount,
        coverPrompt: data.coverPrompt,
        published: data.published,
        characterGender: data.characterGender,
        coverImage: "/images/placeholders/book-template-placeholder.jpg", // Default placeholder for cover
        minAge: data.minAge,
        maxAge: data.maxAge,
        genres: {
          connect: genres.map((genre) => ({ id: genre.id })),
        },
      },
    });

    // Create template pages with placeholder images
    const pagePromises = data.pages.map(async (page) => {
      return await prisma.templatePageContent.create({
        data: {
          pageNumber: page.pageNumber,
          content: page.content,
          imagePrompt: page.imagePrompt,
          imageUrl: "/images/placeholders/book-template-placeholder.jpg", // Default placeholder
          pageOutfit: page.pageOutfit || null,
          templateId: template.id,
        },
      });
    });

    await Promise.all(pagePromises);

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");

    // Return the template ID for further processing (like image uploads)
    return createSuccessResult(
      template.id,
      `Template "${data.title}" created successfully`
    );
  } catch (error) {
    console.error("Error creating book template:", error);

    return createErrorResult(
      `Failed to create template: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function deleteBookTemplate(
  id: string
): Promise<ActionResult<string>> {
  try {
    // First check if template exists
    const template = await prisma.bookTemplate.findUnique({
      where: { id },
      include: {
        books: {
          select: { id: true },
          take: 1,
        },
      },
    });

    if (!template) {
      return createErrorResult("Template not found");
    }

    // Check if template is in use by any books
    if (template.books.length > 0) {
      return createErrorResult(
        "Cannot delete template because it is used by existing books"
      );
    }

    // Delete template images from S3 if using that approach
    if (template.slug) {
      await deleteTemplateImagesFromS3(template.slug);
    }

    // Delete all template pages first
    await prisma.templatePageContent.deleteMany({
      where: { templateId: id },
    });

    // Now delete the template
    await prisma.bookTemplate.delete({
      where: { id },
    });

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");

    return createSuccessResult("Template deleted successfully");
  } catch (error) {
    console.error("Error deleting book template:", error);
    return createErrorResult(
      `Failed to delete template: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function getAllGenres(): Promise<Genre[]> {
  try {
    const genres = await prisma.genre.findMany({
      orderBy: {
        name: "asc",
      },
    });

    return genres;
  } catch (error) {
    console.error("Error fetching genres:", error);
    throw error;
  }
}

/**
 * Get the total count of templates in the system
 */
export async function getTemplatesCount(): Promise<ActionResult<number>> {
  try {
    const count = await prisma.bookTemplate.count();
    return createSuccessResult(count, "Template count retrieved successfully");
  } catch (error) {
    console.error("Error fetching templates count:", error);
    return createErrorResult("Failed to retrieve template count");
  }
}

/**
 * Toggle the published status of a book template
 */
export async function toggleTemplatePublished(
  templateId: string
): Promise<ActionResult<{ id: string; published: boolean }>> {
  try {
    console.log("[Server] Toggling published status for template:", templateId);

    // Find the current template
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { id: true, published: true, title: true, slug: true },
    });

    // Check if template exists
    if (!template) {
      console.log("template not found for ID:", templateId);
      return createErrorResult("Template not found");
    }

    // Get the current status and toggle it
    const currentPublishedStatus = template.published;

    // Update the template with the toggled status
    const updatedTemplate = await prisma.bookTemplate.update({
      where: { id: templateId },
      data: {
        published: !currentPublishedStatus,
      },
      select: {
        id: true,
        published: true,
      },
    });

    // Log the result
    console.log("[Server] Template published status updated:", {
      id: updatedTemplate.id,
      title: template.title,
      oldStatus: currentPublishedStatus,
      newStatus: updatedTemplate.published,
    });

    // Revalidate relevant paths to update the UI
    revalidatePath("/admin/templates");
    revalidatePath("/library");
    revalidatePath(`/library/template-preview/${template.slug}`);
    revalidatePath("/");

    return createSuccessResult({
      id: updatedTemplate.id,
      published: updatedTemplate.published,
    });
  } catch (error) {
    console.error("[Server] Error toggling template published status:", error);

    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Upload a template image to S3
 */
export async function uploadTemplateImage(
  filePath: string,
  templateId: string,
  imageName: string
): Promise<ActionResult<string>> {
  try {
    // First get the template to get its slug
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { slug: true },
    });

    if (!template || !template.slug) {
      return createErrorResult("Template not found or no slug assigned");
    }

    // Upload to S3
    const imageUrl = await uploadTemplateImageToS3(
      filePath,
      template.slug,
      imageName
    );

    if (!imageUrl) {
      return createErrorResult("Failed to upload image to S3");
    }

    return createSuccessResult(imageUrl);
  } catch (error) {
    console.error("Error uploading template image:", error);
    return createErrorResult("Failed to upload template image");
  }
}

/**
 * Updates a template page image by uploading to S3 and updating the database
 * @param templateId ID of the template
 * @param pageNumber Page number to update (0 for cover image)
 * @param tempFilePath Path to the temporary file on server
 * @returns ActionResult with the updated image URL
 */
export async function updateTemplateImageFromPath(
  templateId: string,
  pageNumber: number,
  tempFilePath: string
): Promise<ActionResult<string>> {
  try {
    // Get the template to get the slug
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { slug: true },
    });

    if (!template || !template.slug) {
      return createErrorResult("Template not found or has no slug");
    }

    // Determine image name based on page number
    const imageName = pageNumber === 0 ? "cover.jpg" : `page${pageNumber}.jpg`;

    // Upload image to S3 using the file path (just like your PDF upload)
    const imageUrl = await uploadTemplateImageToS3(
      tempFilePath, // Pass the file path, not buffer
      template.slug,
      imageName
    );

    if (!imageUrl) {
      return createErrorResult("Failed to upload image to S3");
    }

    // Update the image URL in the database
    if (pageNumber === 0) {
      // Update cover image
      await prisma.bookTemplate.update({
        where: { id: templateId },
        data: { coverImage: imageUrl },
      });
    } else {
      // Update page image
      const updateResult = await prisma.templatePageContent.updateMany({
        where: {
          templateId,
          pageNumber,
        },
        data: { imageUrl },
      });

      if (updateResult.count === 0) {
        return createErrorResult(
          `No page found with number ${pageNumber} for this template`
        );
      }
    }

    // Clean up temp file (just like your PDF cleanup)
    cleanupTempFile(tempFilePath);

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");
    revalidatePath(`/library/template-preview/${template.slug}`);

    return createSuccessResult(imageUrl, "Image updated successfully");
  } catch (error) {
    // Make sure to clean up temp file even on error
    cleanupTempFile(tempFilePath);

    console.error("Error updating template image:", error);
    return createErrorResult(
      `Failed to update image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

export async function updateTemplateImageFromBuffer(
  templateId: string,
  pageNumber: number,
  buffer: Buffer,
  fileName: string,
  mimeType: string
): Promise<ActionResult<string>> {
  try {
    // Get the template to get the slug
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { slug: true },
    });

    if (!template || !template.slug) {
      return createErrorResult("Template not found or has no slug");
    }

    // Determine image name based on page number
    const imageName = pageNumber === 0 ? "cover.jpg" : `page${pageNumber}.jpg`;

    // Upload image to S3 using buffer directly - no temp file needed
    const imageUrl = await uploadTemplateImageToS3(
      buffer, // Pass the buffer directly
      template.slug,
      imageName,
      mimeType
    );

    if (!imageUrl) {
      return createErrorResult("Failed to upload image to S3");
    }

    // Update the image URL in the database
    if (pageNumber === 0) {
      // Update cover image
      await prisma.bookTemplate.update({
        where: { id: templateId },
        data: { coverImage: imageUrl },
      });
    } else {
      // Update page image
      const updateResult = await prisma.templatePageContent.updateMany({
        where: {
          templateId,
          pageNumber,
        },
        data: { imageUrl },
      });

      if (updateResult.count === 0) {
        return createErrorResult(
          `No page found with number ${pageNumber} for this template`
        );
      }
    }

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");
    revalidatePath(`/library/template-preview/${template.slug}`);

    return createSuccessResult(imageUrl, "Image updated successfully");
  } catch (error) {
    console.error("Error updating template image:", error);
    return createErrorResult(
      `Failed to update image: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Updates a template image URL in the database
 * @param templateIdOrSlug - The template ID or slug
 * @param imageUrl - The new image URL to set
 * @param target - Either 'cover' or the page ID
 * @returns ActionResult with success/error information
 */
export async function updateTemplateImageUrl(
  templateIdOrSlug: string,
  imageUrl: string,
  target: "cover" | string // page ID or "cover"
): Promise<ActionResult<{ message: string }>> {
  try {
    console.log("Updating template image:", {
      templateIdOrSlug,
      target,
      imageUrl,
    });

    // First, find the template by ID or slug
    const template = await prisma.bookTemplate.findFirst({
      where: {
        OR: [{ id: templateIdOrSlug }, { slug: templateIdOrSlug }],
      },
    });

    if (!template) {
      console.error("Template not found:", templateIdOrSlug);
      return createErrorResult("Template not found");
    }

    if (target === "cover") {
      // Update cover image
      await prisma.bookTemplate.update({
        where: { id: template.id },
        data: {
          coverImage: imageUrl,
        },
      });

      console.log("Updated template cover image:", {
        templateId: template.id,
        newUrl: imageUrl,
      });

      // Revalidate relevant paths
      revalidatePath("/library");
      revalidatePath("/admin/templates");
      revalidatePath(`/library/template-preview/${template.slug}`);
      revalidatePath("/");

      return createSuccessResult({
        message: "Cover image updated successfully",
      });
    } else {
      // Update page image using page ID
      const pageId = target;

      // Verify the page exists and belongs to this template
      const page = await prisma.templatePageContent.findFirst({
        where: {
          id: pageId,
          templateId: template.id,
        },
      });

      if (!page) {
        console.error("Page not found in template:", {
          templateId: template.id,
          pageId,
        });
        return createErrorResult("Page not found in template");
      }

      // Update the page image
      await prisma.templatePageContent.update({
        where: { id: pageId },
        data: {
          imageUrl: imageUrl,
        },
      });

      console.log("Updated template page image:", {
        templateId: template.id,
        pageId,
        pageNumber: page.pageNumber,
        newUrl: imageUrl,
      });

      // Revalidate relevant paths
      revalidatePath("/library");
      revalidatePath("/admin/templates");
      revalidatePath(`/library/template-preview/${template.slug}`);

      return createSuccessResult({
        message: `Page ${page.pageNumber} image updated successfully`,
      });
    }
  } catch (error) {
    console.error("Error updating template image:", error);
    return createErrorResult(
      error instanceof Error ? error.message : "Unknown error occurred"
    );
  }
}

/**
 * Get all S3 images for a template
 * @param templateSlug - The template slug
 * @returns ActionResult with array of image URLs
 */
export async function getTemplateS3Images(
  templateSlug: string
): Promise<ActionResult<string[]>> {
  try {
    const images = await getTemplateImagesFromS3(templateSlug);
    return createSuccessResult(images);
  } catch (error) {
    console.error("Error fetching S3 images:", error);
    return createErrorResult(
      error instanceof Error ? error.message : "Failed to fetch S3 images"
    );
  }
}

/**
 * Update genres for an existing template
 */
export async function updateTemplateGenres(
  templateId: string,
  genreNames: string[]
): Promise<ActionResult<{ templateId: string; genres: Genre[] }>> {
  try {
    // Check if template exists
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { id: true, title: true, slug: true },
    });

    if (!template) {
      return createErrorResult("Template not found");
    }

    // Find or create all genres
    const genrePromises = genreNames.map(async (genreName) => {
      return await prisma.genre.upsert({
        where: { name: genreName },
        update: { name: genreName },
        create: { name: genreName },
      });
    });

    const genres = await Promise.all(genrePromises);

    // Update template genres (disconnect all, then connect new ones)
    const updatedTemplate = await prisma.bookTemplate.update({
      where: { id: templateId },
      data: {
        genres: {
          set: [], // Clear existing connections
          connect: genres.map((genre) => ({ id: genre.id })),
        },
      },
      include: {
        genres: true,
      },
    });

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");
    revalidatePath(`/library/template-preview/${template.slug}`);

    return createSuccessResult({
      templateId: updatedTemplate.id,
      genres: updatedTemplate.genres,
    });
  } catch (error) {
    console.error("Error updating template genres:", error);
    return createErrorResult(
      `Failed to update genres: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}

/**
 * Updates an existing book template
 * @param templateId - ID of the template to update
 * @param data - Template update data
 * @returns ActionResult with success/error information
 */
export async function updateBookTemplate(
  templateId: string,
  data: TemplateFormData
): Promise<ActionResult<string>> {
  try {
    // First check if template exists
    const existingTemplate = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      include: {
        genres: true,
        pages: {
          orderBy: { pageNumber: "asc" },
        },
      },
    });

    if (!existingTemplate) {
      return createErrorResult("Template not found");
    }

    // Generate new slug if title changed
    let slug = existingTemplate.slug;
    if (data.title !== existingTemplate.title) {
      const baseSlug = generateSlug(data.title);
      slug = await ensureUniqueSlug(baseSlug, templateId);
    }

    // Handle genres - find or create all genres
    const genrePromises = data.genres.map(async (genreName) => {
      return await prisma.genre.upsert({
        where: { name: genreName },
        update: { name: genreName },
        create: { name: genreName },
      });
    });

    const genres = await Promise.all(genrePromises);

    // Update the template in a transaction
    await prisma.$transaction(async (tx) => {
      // Delete existing pages
      await tx.templatePageContent.deleteMany({
        where: { templateId },
      });

      // Update the template
      await tx.bookTemplate.update({
        where: { id: templateId },
        data: {
          title: data.title,
          slug,
          description: data.description,
          pageCount: data.pageCount,
          coverPrompt: data.coverPrompt,
          published: data.published,
          characterGender: data.characterGender,
          minAge: data.minAge,
          maxAge: data.maxAge,
          consistentOutfit: data.consistentOutfit,
          genres: {
            set: [], // Clear existing genre connections
            connect: genres.map((genre) => ({ id: genre.id })),
          },
        },
      });

      // Create new pages
      const pagePromises = data.pages.map(async (page) => {
        return await tx.templatePageContent.create({
          data: {
            pageNumber: page.pageNumber,
            content: page.content,
            imagePrompt: page.imagePrompt,
            imageUrl:
              page.imageUrl ||
              "/images/placeholders/book-template-placeholder.jpg",
            pageOutfit: page.pageOutfit || null,
            templateId,
          },
        });
      });

      await Promise.all(pagePromises);
    });

    // Revalidate paths
    revalidatePath("/library");
    revalidatePath("/admin/templates");
    revalidatePath(`/admin/templates/${slug}/edit`);
    revalidatePath(`/library/template-preview/${slug}`);

    return createSuccessResult(
      templateId,
      `Template "${data.title}" updated successfully`
    );
  } catch (error) {
    console.error("Error updating book template:", error);

    // Handle specific errors
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2002") {
        return createErrorResult("A template with this title already exists");
      }
    }

    return createErrorResult(
      `Failed to update template: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
