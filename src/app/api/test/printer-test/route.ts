import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { prepareBookForPrinting } from "@/actions/print-actions";

export async function GET(req: NextRequest) {
  try {
    // Get book ID from query parameters
    const { searchParams } = new URL(req.url);
    const bookId = searchParams.get("bookId");

    if (!bookId) {
      return NextResponse.json(
        { error: "Book ID is required" },
        { status: 400 }
      );
    }

    const book = await prisma.book.findUnique({
      where: { id: bookId },
      include: { pages: true, character: true },
    });

    if (!book) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 });
    }

    // Generate the ebook
    const result = await prepareBookForPrinting(book);

    return NextResponse.json({
      success: result.success,
      message: "PDF file generated successfully",
    });
  } catch (error) {
    console.error("Error in ebook test API:", error);
    return NextResponse.json(
      {
        error: "Failed to generate ebook",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
