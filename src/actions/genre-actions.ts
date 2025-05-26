"use server";
import { Genre } from "@prisma/client";
import prisma from "@/lib/prisma";
import {
  ActionResult,
  createErrorResult,
  createSuccessResult,
} from "@/types/actions";
import { unstable_cache } from "next/cache";

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
