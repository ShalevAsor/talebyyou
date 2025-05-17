import { NextRequest, NextResponse } from "next/server";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import {
  InitImageType,
  StrengthType,
} from "@leonardo-ai/sdk/sdk/models/shared";
import { STYLE_IMAGE_REFERENCE_ID } from "@/constants/image";

export async function GET(req: NextRequest) {
  try {
    console.log(req);
    // Use the existing Leonardo client
    const leonardo = getLeonardoClient();

    // Define the character image URL - update to a URL that works
    const characterImageUrl =
      "https://edb4-2a00-a041-e191-3200-2cd6-d216-ecc5-aa34.ngrok-free.app/testImage4.png";

    console.log("Using character image:", characterImageUrl);
    console.log(
      "Using pre-generated style reference ID:",
      STYLE_IMAGE_REFERENCE_ID
    );

    // Step 1: Upload character image
    console.log("Getting presigned URL for character image upload...");
    const characterUploadResponse = await leonardo.initImages.uploadInitImage({
      extension: "png",
    });

    if (!characterUploadResponse.object?.uploadInitImage) {
      throw new Error("Failed to get presigned URL for character upload");
    }

    const { uploadInitImage: characterUploadData } =
      characterUploadResponse.object;

    if (
      !characterUploadData.id ||
      !characterUploadData.url ||
      !characterUploadData.fields
    ) {
      throw new Error("Missing required fields in character upload response");
    }

    const characterImageId = await uploadImageToLeonardo(
      characterImageUrl,
      characterUploadData.url,
      characterUploadData.fields,
      "characterImage.png"
    );
    console.log("Character image uploaded with ID:", characterImageId);

    // Step 2: Generate an image with both character and style reference
    console.log("Starting generation with character and style references...");

    const result = await leonardo.image.createGeneration({
      height: 1024,
      width: 768,
      modelId: "2067ae52-33fd-4a82-bb92-c2c55e7d2786", // AlbedoBase XL model
      prompt:
        "Whimsical storybook illustration of a small boy with a bright smile, exploring a magical garden filled with oversized flowers and friendly woodland creatures. ",
      numImages: 3,
      public: false,
      alchemy: true, // Enable Alchemy for better quality
      controlnets: [
        {
          initImageId: characterImageId,
          initImageType: InitImageType.Uploaded,
          preprocessorId: 133, // Character Reference Id
          strengthType: StrengthType.High,
        },
        // {
        //   initImageId: styleReferenceImageId,
        //   initImageType: InitImageType.Generated,
        //   preprocessorId: 67, // Style Reference Id
        //   strengthType: StrengthType.High,
        // },
      ],
    });

    const generationId = result.object?.sdGenerationJob?.generationId;

    return NextResponse.json({
      success: true,
      message: "Image generation with character and style references started",
      generationId: generationId || "unknown",
      result: result,
      cost: result.object?.sdGenerationJob?.apiCreditCost,
    });
  } catch (error) {
    console.error("Error generating image:", error);

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

/**
 * Helper function to upload an image to Leonardo
 */
async function uploadImageToLeonardo(
  imageUrl: string,
  uploadUrl: string,
  fieldsData: Record<string, string> | string,
  filename: string
): Promise<string> {
  // Parse fields if it's a string
  let parsedFields: Record<string, string>;
  if (typeof fieldsData === "string") {
    try {
      parsedFields = JSON.parse(fieldsData);
    } catch (error) {
      console.error("Error parsing fields as JSON:", error);
      throw new Error("Could not parse fields from upload response");
    }
  } else {
    parsedFields = fieldsData as Record<string, string>;
  }

  // Fetch the image data from URL
  console.log("Fetching image from URL:", imageUrl);
  const imageResponse = await fetch(imageUrl);
  if (!imageResponse.ok) {
    throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
  }
  const imageBlob = await imageResponse.blob();

  // Create FormData with ordered fields
  const formData = new FormData();

  // Make sure 'key' is added first
  if (parsedFields.key) {
    formData.append("key", parsedFields.key);
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
    }
  });

  // Add any remaining fields not in our order list
  Object.entries(parsedFields).forEach(([key, value]) => {
    if (key !== "key" && !fieldOrder.includes(key)) {
      formData.append(key, value);
    }
  });

  // Add the file last
  formData.append("file", imageBlob, filename);

  if (typeof uploadUrl !== "string") {
    throw new Error("Invalid upload URL received");
  }

  // Send without headers
  const uploadResult = await fetch(uploadUrl, {
    method: "POST",
    body: formData,
  });

  if (!uploadResult.ok) {
    // Log full response for debugging
    let responseText = "";
    try {
      responseText = await uploadResult.text();
    } catch (e) {
      console.log(e);
      responseText = "Could not get response text";
    }

    console.error("Upload error details:", responseText);
    throw new Error(`Failed to upload image to S3: ${uploadResult.statusText}`);
  }

  // Extract the ID from the fields
  const imageId = parsedFields?.key?.split("/")?.pop()?.split(".")[0];
  return imageId!;
}
