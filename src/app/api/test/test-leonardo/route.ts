// src/app/api/test/test-leonardo/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getLeonardoClient } from "@/lib/leonardo-ai";

export async function GET(req: NextRequest) {
  try {
    // Use the existing Leonardo client
    const leonardo = getLeonardoClient();

    // Create a simple image generation request
    const result = await leonardo.image.createGeneration({
      prompt: "A cartoon style image",
      modelId: "de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3",
      width: 512,
      height: 512,
      numImages: 1,
      public: false,
    });

    return NextResponse.json({
      success: true,
      message: "Image generation started",
      generationId: result.object?.sdGenerationJob?.generationId,
      result: result,
    });
  } catch (error) {
    console.error("Error generating test image:", error);

    let errorMessage = "Failed to generate image";
    if (error instanceof Error) {
      errorMessage = error.message;
    }

    return NextResponse.json(
      {
        success: false,
        error: errorMessage,
      },
      { status: 500 }
    );
  }
}
