import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { createBookFromTemplate } from "@/services/book/book-creation-service";
import { CharacterData } from "@/schemas/character-schema";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params;

    // Get template with pages
    const template = await prisma.bookTemplate.findUnique({
      where: { slug },
      include: {
        pages: {
          orderBy: { pageNumber: "asc" },
        },
        genres: true,
      },
    });

    if (!template) {
      return NextResponse.json(
        { error: "Template not found" },
        { status: 404 }
      );
    }

    // Test character data
    const testCharacter: CharacterData = {
      name: "emma",
      age: 6,
      gender: "girl" as const,
      eyeColor: "blue",
      hairColor: "blonde",
      hairStyle: "curly",
      skinTone: "light",
      wearingGlasses: false,
    };

    // Create book from template
    const bookData = createBookFromTemplate(
      template,
      testCharacter,
      "test-user"
    );

    // Extract only text pages for testing
    const textPages = bookData.pages
      .filter((page) => page.type === "TEXT" && page.textContent)
      .map((page) => ({
        pageNumber: page.pageNumber,
        textContent: page.textContent,
      }));

    return NextResponse.json({
      templateTitle: template.title,
      characterName: testCharacter.name,
      textPages,
    });
  } catch (error) {
    console.error("Test API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
