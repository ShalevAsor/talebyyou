import { NextRequest, NextResponse } from "next/server";

import {
  regenerateCoverImage,
  regeneratePageImage,
} from "@/actions/book-actions";

export async function POST(request: NextRequest) {
  try {
    const { action, pageId, bookId, newPrompt } = await request.json();

    let result;

    if (action === "regeneratePageImage") {
      if (!pageId) {
        return NextResponse.json(
          { success: false, error: "Page ID is required" },
          { status: 400 }
        );
      }
      result = await regeneratePageImage(pageId, newPrompt);
    } else if (action === "regenerateCoverImage") {
      if (!bookId) {
        return NextResponse.json(
          { success: false, error: "Book ID is required" },
          { status: 400 }
        );
      }
      result = await regenerateCoverImage(bookId, newPrompt);
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in regenerate-image API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
