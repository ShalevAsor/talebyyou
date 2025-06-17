import { NextRequest, NextResponse } from "next/server";
import {
  getPageGenerationStatus,
  getCoverGenerationStatus,
} from "@/actions/book-actions";

export async function POST(request: NextRequest) {
  try {
    const { type, pageId, bookId } = await request.json();

    let result;

    if (type === "page") {
      if (!pageId) {
        return NextResponse.json(
          { success: false, error: "Page ID is required" },
          { status: 400 }
        );
      }
      result = await getPageGenerationStatus(pageId);
    } else if (type === "cover") {
      if (!bookId) {
        return NextResponse.json(
          { success: false, error: "Book ID is required" },
          { status: 400 }
        );
      }
      result = await getCoverGenerationStatus(bookId);
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid type" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in generation-status API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
