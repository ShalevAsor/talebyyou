import { NextRequest, NextResponse } from "next/server";
import { selectPageImage, selectCoverImage } from "@/actions/book-actions";

export async function POST(request: NextRequest) {
  try {
    const { action, pageId, bookId, imageUrl } = await request.json();

    if (!imageUrl) {
      return NextResponse.json(
        { success: false, error: "Image URL is required" },
        { status: 400 }
      );
    }

    let result;

    if (action === "selectPageImage") {
      if (!pageId) {
        return NextResponse.json(
          { success: false, error: "Page ID is required" },
          { status: 400 }
        );
      }
      result = await selectPageImage(pageId, imageUrl);
    } else if (action === "selectCoverImage") {
      if (!bookId) {
        return NextResponse.json(
          { success: false, error: "Book ID is required" },
          { status: 400 }
        );
      }
      result = await selectCoverImage(bookId, imageUrl);
    } else {
      return NextResponse.json(
        { success: false, error: "Invalid action" },
        { status: 400 }
      );
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error("Error in select-image API:", error);
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 500 }
    );
  }
}
