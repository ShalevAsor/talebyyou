"use server";

import prisma from "@/lib/prisma";
import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { BookTemplate, Genre, Prisma } from "@/generated/prisma/client";
import { defaultTemplates } from "@/data/default-templates";
import { BookTemplateCreateData, BookTemplateFull } from "@/types/book";
import { revalidatePath, revalidateTag, unstable_cache } from "next/cache";

/**
 * Get book template by id
 * @return promise of full book template
 */

const _getBookTemplateById = async (
  id: string
): Promise<ActionResult<BookTemplateFull>> => {
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
};

export const getBookTemplateById = async (id: string) =>
  unstable_cache(_getBookTemplateById, [`book-template-${id}`], {
    tags: ["book-templates"],
    revalidate: 60 * 5, // 5 minutes
  })(id);

/**
 * Get all book templates
 * @param options - Optional filtering and sorting options
 */
const _getAllBookTemplates = async (options?: {
  limit?: number;
  orderBy?: "newest" | "oldest" | "title";
  filterByGenre?: string[];
  publishedOnly?: boolean;
}): Promise<ActionResult<BookTemplateFull[]>> => {
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
    return createErrorResult("Failed to fetch book templates");
  }
};

export const getAllBookTemplates = async (options?: {
  limit?: number;
  orderBy?: "newest" | "oldest" | "title";
  filterByGenre?: string[];
  publishedOnly?: boolean;
}) => {
  const key = JSON.stringify([
    "book-templates",
    options?.limit ?? "all",
    options?.orderBy ?? "newest",
    options?.filterByGenre?.sort() ?? [],
    options?.publishedOnly ?? true,
  ]);

  return unstable_cache(_getAllBookTemplates, [key], {
    tags: ["book-templates"],
    revalidate: 3600,
  })(options);
};

export async function seedBookTemplates(): Promise<ActionResult<string>> {
  try {
    let created = 0;
    let updated = 0;

    // Process each template
    for (const template of defaultTemplates) {
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

      // Get existing template pages if any
      const existingTemplate = await prisma.bookTemplate.findUnique({
        where: { title: template.title },
      });

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
          coverImage: template.coverImage,
          minAge: template.minAge,
          maxAge: template.maxAge,
          genres: {
            set: [], // Clear existing genre connections
            connect: genres.map((genre) => ({ id: genre.id })),
          },
        },
        create: {
          title: template.title,
          description: template.description,
          pageCount: template.pageCount,
          coverPrompt: template.coverPrompt,
          published: template.published,
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
    }

    // Revalidate tag to clear cache
    revalidateTag("book-templates");

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
    revalidateTag("book-templates");
    return createSuccessResult({ count: result.count });
  } catch (error) {
    console.error("Error removing book templates:", error);
    return createErrorResult("Failed to remove book templates");
  }
}

export async function createBookTemplate(
  data: BookTemplateCreateData
): Promise<ActionResult<string>> {
  try {
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
        description: data.description,
        pageCount: data.pageCount,
        coverPrompt: data.coverPrompt,
        published: data.published,
        coverImage: data.coverImage,
        minAge: data.minAge,
        maxAge: data.maxAge,
        genres: {
          connect: genres.map((genre) => ({ id: genre.id })),
        },
      },
    });

    // Create template pages
    const pagePromises = data.pages.map(async (page) => {
      return await prisma.templatePageContent.create({
        data: {
          pageNumber: page.pageNumber,
          content: page.content,
          imagePrompt: page.imagePrompt,
          imageUrl: page.imageUrl || "/images/style/styleImageCartoon.jpg",
          templateId: template.id,
        },
      });
    });

    await Promise.all(pagePromises);

    // Revalidate tag to clear cache
    revalidateTag("book-templates");

    return createSuccessResult(`Template "${data.title}" created successfully`);
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

    // Delete all template pages first
    await prisma.templatePageContent.deleteMany({
      where: { templateId: id },
    });

    // Now delete the template
    await prisma.bookTemplate.delete({
      where: { id },
    });

    // Revalidate tag to clear cache
    revalidateTag("book-templates");

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

export async function getAllTemplates(): Promise<
  (BookTemplate & { genres: Genre[] })[]
> {
  try {
    const templates = await prisma.bookTemplate.findMany({
      include: {
        genres: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return templates;
  } catch (error) {
    console.error("Error fetching templates:", error);
    throw error;
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
 * @returns ActionResult with the count of templates
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
 * @param templateId The ID of the template to toggle
 */
export async function toggleTemplatePublished(
  templateId: string
): Promise<ActionResult<{ id: string; published: boolean }>> {
  try {
    console.log("[Server] Toggling published status for template:", templateId);

    // Find the current template
    const template = await prisma.bookTemplate.findUnique({
      where: { id: templateId },
      select: { id: true, published: true, title: true },
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
    revalidatePath(`/admin/templates/${templateId}`);
    revalidatePath("/library"); // If templates are displayed in the library

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
