import { NextRequest, NextResponse } from "next/server";

import { generateEbook } from "@/actions/ebook-actions";

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

    // Generate the ebook
    const result = await generateEbook(bookId);

    if (!result) {
      return NextResponse.json(
        { error: "Failed to generate or store ebook" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
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
