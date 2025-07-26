import { NextRequest, NextResponse } from "next/server";

import { saveToTempFile } from "@/utils/fileUtils";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Validate file
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: "File must be an image" },
        { status: 400 }
      );
    }

    if (file.size > 10 * 1024 * 1024) {
      // 10MB limit
      return NextResponse.json({ error: "File too large" }, { status: 400 });
    }

    // Convert to buffer and save to temp
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const tempFilePath = saveToTempFile(buffer, file.name);

    return NextResponse.json({
      tempFilePath,
      fileName: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error("Error in temp upload:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
