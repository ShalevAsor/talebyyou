"use server";
import { Genre } from "@prisma/client";
import prisma from "@/lib/prisma";
import {
  ActionResult,
  createErrorResult,
  createSuccessResult,
} from "@/types/actions";
import { revalidatePath, unstable_cache } from "next/cache";

export const getGenres = unstable_cache(
  async (): Promise<ActionResult<Genre[]>> => {
    try {
      const genres = await prisma.genre.findMany({
        orderBy: {
          name: "asc",
        },
      });

      return createSuccessResult(genres);
    } catch (error) {
      console.error("Failed to fetch genres:", error);
      return createErrorResult(
        "Failed to load genres. Please try again later."
      );
    }
  },
  ["all-genres"],

  { tags: ["genres"], revalidate: 3600 }
);

/**
 * Analyze genre usage without deleting anything
 */
export async function analyzeGenreUsage(): Promise<
  ActionResult<{
    totalGenres: number;
    usedGenres: number;
    orphanedGenres: Array<{ name: string; id: string }>; // Remove createdAt
    genreUsageDetails: Array<{
      name: string;
      id: string;
      templateCount: number;
      templates: Array<{ title: string; id: string }>;
    }>;
  }>
> {
  try {
    // Get all genres with their template connections
    const allGenres = await prisma.genre.findMany({
      include: {
        templates: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      orderBy: {
        name: "asc",
      },
    });

    // Find orphaned genres (no template connections)
    const orphanedGenres = allGenres
      .filter((genre) => genre.templates.length === 0)
      .map((genre) => ({
        name: genre.name,
        id: genre.id,
        // Remove createdAt since it doesn't exist in Genre model
      }));

    // Create detailed usage report
    const genreUsageDetails = allGenres.map((genre) => ({
      name: genre.name,
      id: genre.id,
      templateCount: genre.templates.length,
      templates: genre.templates.map((template) => ({
        title: template.title,
        id: template.id,
      })),
    }));

    const usedGenres = allGenres.filter(
      (genre) => genre.templates.length > 0
    ).length;

    return createSuccessResult({
      totalGenres: allGenres.length,
      usedGenres,
      orphanedGenres,
      genreUsageDetails,
    });
  } catch (error) {
    console.error("Error analyzing genre usage:", error);
    return createErrorResult("Failed to analyze genre usage");
  }
}

/**
 * Remove orphaned genres that are not connected to any templates
 */
export async function cleanupOrphanedGenres(): Promise<
  ActionResult<{
    removedGenres: string[];
    removedCount: number;
  }>
> {
  try {
    // Find genres with no template connections
    const orphanedGenres = await prisma.genre.findMany({
      where: {
        templates: {
          none: {}, // No connected templates
        },
      },
      select: { id: true, name: true },
    });

    if (orphanedGenres.length === 0) {
      return createSuccessResult(
        {
          removedGenres: [],
          removedCount: 0,
        },
        "No orphaned genres found"
      );
    }

    // Delete orphaned genres in a transaction for safety
    const deleteResult = await prisma.$transaction(async (tx) => {
      return await tx.genre.deleteMany({
        where: {
          id: {
            in: orphanedGenres.map((g) => g.id),
          },
        },
      });
    });

    // Revalidate paths after cleanup
    revalidatePath("/admin/templates");
    revalidatePath("/library");

    return createSuccessResult(
      {
        removedGenres: orphanedGenres.map((g) => g.name),
        removedCount: deleteResult.count,
      },
      `Successfully removed ${deleteResult.count} orphaned genres`
    );
  } catch (error) {
    console.error("Error cleaning up orphaned genres:", error);
    return createErrorResult(
      `Failed to cleanup orphaned genres: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
