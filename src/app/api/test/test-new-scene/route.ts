// src/app/api/test/test-new-scene/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import {
  InitImageType,
  StrengthType,
} from "@leonardo-ai/sdk/sdk/models/shared";

export async function GET(req: NextRequest) {
  try {
    // Use the existing Leonardo client
    const leonardo = getLeonardoClient();

    // Define the ngrok image URL
    const imageUrl =
      "https://bb7d-2a00-a041-e191-3200-b935-7f77-9ed1-2400.ngrok-free.app/testImage2.png";

    console.log("Using reference image:", imageUrl);

    // Step 1: First get presigned URL for upload
    console.log("Getting presigned URL for image upload...");
    const uploadResponse = await leonardo.initImages.uploadInitImage({
      extension: "png",
    });

    if (!uploadResponse.object?.uploadInitImage) {
      throw new Error("Failed to get presigned URL for upload");
    }

    const { uploadInitImage } = uploadResponse.object;

    if (
      !uploadInitImage.id ||
      !uploadInitImage.url ||
      !uploadInitImage.fields
    ) {
      throw new Error("Missing required fields in upload response");
    }

    const { fields, url, id } = uploadInitImage;

    console.log("Got presigned URL with ID:", id);

    // Parse fields if it's a string
    let parsedFields: Record<string, string>;
    if (typeof fields === "string") {
      try {
        parsedFields = JSON.parse(fields);
      } catch (error) {
        console.error("Error parsing fields as JSON:", error);
        throw new Error("Could not parse fields from upload response");
      }
    } else {
      parsedFields = fields as Record<string, string>;
    }

    // Log the fields to help with debugging
    console.log(
      "S3 upload fields (parsed):",
      JSON.stringify(parsedFields, null, 2)
    );

    // Step 2: Fetch the image data from our URL
    console.log("Fetching image from URL:", imageUrl);
    const imageResponse = await fetch(imageUrl);
    if (!imageResponse.ok) {
      throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
    }
    const imageBlob = await imageResponse.blob();

    // Step 3: Upload the image to Leonardo's S3
    console.log("Uploading image to Leonardo S3...");

    // Create FormData with ordered fields
    const formData = new FormData();

    // Make sure 'key' is added first
    if (parsedFields.key) {
      formData.append("key", parsedFields.key);
      console.log("Added key field:", parsedFields.key);
    }

    // Add the rest of the fields in a specific order
    const fieldOrder = [
      "Content-Type",
      "bucket",
      "Policy",
      "X-Amz-Algorithm",
      "X-Amz-Credential",
      "X-Amz-Date",
      "X-Amz-Security-Token",
      "X-Amz-Signature",
    ];

    // Add fields in the specified order
    fieldOrder.forEach((fieldName) => {
      if (parsedFields[fieldName]) {
        formData.append(fieldName, parsedFields[fieldName]);
        console.log(`Added field: ${fieldName}`);
      }
    });

    // Add any remaining fields not in our order list
    Object.entries(parsedFields).forEach(([key, value]) => {
      if (key !== "key" && !fieldOrder.includes(key)) {
        formData.append(key, value);
        console.log(`Added additional field: ${key}`);
      }
    });

    // Add the file last
    formData.append("file", imageBlob, "testImage.png");
    console.log("Added file to FormData");

    if (typeof url !== "string") {
      throw new Error("Invalid upload URL received");
    }

    console.log("Sending upload to:", url);

    // Send without headers
    const uploadResult = await fetch(url, {
      method: "POST",
      body: formData,
    });

    console.log("Upload status:", uploadResult.status, uploadResult.statusText);

    if (!uploadResult.ok) {
      // Log full response for debugging
      let responseText = "";
      try {
        responseText = await uploadResult.text();
      } catch (e) {
        responseText = "Could not get response text";
      }

      console.error("Upload error details:", responseText);
      throw new Error(
        `Failed to upload image to S3: ${uploadResult.statusText}`
      );
    }

    console.log("Image successfully uploaded to Leonardo S3");

    // Step 4: Generate an image with character reference - new scene
    console.log("Starting generation with character reference - new scene...");

    // Using a new scene prompt but same character reference
    const result = await leonardo.image.createGeneration({
      height: 768,
      width: 768,
      modelId: "aa77f04e-3eec-4034-9c07-d0f619684628", // Leonardo Kino XL model
      prompt:
        "2D illustration of a child sitting under an apple tree reading a book, Disney Pixar style, 3D rendered, vibrant colors, highly detailed, polished look, sunlight filtering through leaves, peaceful scene",
      numImages: 1,
      public: false,
      alchemy: true, // Enable Alchemy V2 for better quality
      controlnets: [
        {
          initImageId: id,
          initImageType: InitImageType.Uploaded,
          preprocessorId: 133, // Character Reference Id
          strengthType: StrengthType.Mid,
        },
      ],
    });

    const generationId = result.object?.sdGenerationJob?.generationId;

    return NextResponse.json({
      success: true,
      message: "Character reference generation started - new scene",
      generationId: generationId || "unknown",
      result: result,
    });
  } catch (error) {
    console.error("Error generating image with character reference:", error);

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
