// import { NextRequest, NextResponse } from "next/server";
// import { getLeonardoClient } from "@/lib/leonardo-ai";
// import {
//   InitImageType,
//   SdGenerationStyle,
//   StrengthType,
// } from "@leonardo-ai/sdk/sdk/models/shared";

// export async function GET(req: NextRequest) {
//   try {
//     // Use the existing Leonardo client
//     const leonardo = getLeonardoClient();

//     // Define the ngrok image URL
//     const imageUrl =
//       "https://bb7d-2a00-a041-e191-3200-b935-7f77-9ed1-2400.ngrok-free.app/testImage.png";

//     console.log("Using reference image:", imageUrl);

//     // Step 1: First get presigned URL for upload
//     console.log("Getting presigned URL for image upload...");
//     const uploadResponse = await leonardo.initImages.uploadInitImage({
//       extension: "png",
//     });

//     if (!uploadResponse.object?.uploadInitImage) {
//       throw new Error("Failed to get presigned URL for upload");
//     }

//     const { uploadInitImage } = uploadResponse.object;

//     if (
//       !uploadInitImage.id ||
//       !uploadInitImage.url ||
//       !uploadInitImage.fields
//     ) {
//       throw new Error("Missing required fields in upload response");
//     }

//     const { fields, url, id } = uploadInitImage;

//     console.log("Got presigned URL with ID:", id);

//     // Parse fields if it's a string
//     let parsedFields: Record<string, string>;
//     if (typeof fields === "string") {
//       try {
//         parsedFields = JSON.parse(fields);
//       } catch (error) {
//         console.error("Error parsing fields as JSON:", error);
//         throw new Error("Could not parse fields from upload response");
//       }
//     } else {
//       parsedFields = fields as Record<string, string>;
//     }

//     // Log the fields to help with debugging
//     console.log(
//       "S3 upload fields (parsed):",
//       JSON.stringify(parsedFields, null, 2)
//     );

//     // Step 2: Fetch the image data from our URL
//     console.log("Fetching image from URL:", imageUrl);
//     const imageResponse = await fetch(imageUrl);
//     if (!imageResponse.ok) {
//       throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
//     }
//     const imageBlob = await imageResponse.blob();

//     // Step 3: Upload the image to Leonardo's S3
//     console.log("Uploading image to Leonardo S3...");

//     // Create FormData with ordered fields
//     const formData = new FormData();

//     // Make sure 'key' is added first
//     if (parsedFields.key) {
//       formData.append("key", parsedFields.key);
//       console.log("Added key field:", parsedFields.key);
//     }

//     // Add the rest of the fields in a specific order
//     // First add policy, then AWS related fields, then other fields
//     const fieldOrder = [
//       "Content-Type",
//       "bucket",
//       "Policy",
//       "X-Amz-Algorithm",
//       "X-Amz-Credential",
//       "X-Amz-Date",
//       "X-Amz-Security-Token",
//       "X-Amz-Signature",
//     ];

//     // Add fields in the specified order
//     fieldOrder.forEach((fieldName) => {
//       if (parsedFields[fieldName]) {
//         formData.append(fieldName, parsedFields[fieldName]);
//         console.log(`Added field: ${fieldName}`);
//       }
//     });

//     // Add any remaining fields not in our order list
//     Object.entries(parsedFields).forEach(([key, value]) => {
//       if (key !== "key" && !fieldOrder.includes(key)) {
//         formData.append(key, value);
//         console.log(`Added additional field: ${key}`);
//       }
//     });

//     // Add the file last
//     formData.append("file", imageBlob, "testImage.png");
//     console.log("Added file to FormData");

//     if (typeof url !== "string") {
//       throw new Error("Invalid upload URL received");
//     }

//     console.log("Sending upload to:", url);

//     // Send without headers
//     const uploadResult = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     console.log("Upload status:", uploadResult.status, uploadResult.statusText);

//     if (!uploadResult.ok) {
//       // Log full response for debugging
//       let responseText = "";
//       try {
//         responseText = await uploadResult.text();
//       } catch (e) {
//         responseText = "Could not get response text";
//       }

//       console.error("Upload error details:", responseText);
//       throw new Error(
//         `Failed to upload image to S3: ${uploadResult.statusText}`
//       );
//     }

//     console.log("Image successfully uploaded to Leonardo S3");

//     // Step 4: Generate an image with character reference
//     console.log("Starting generation with character reference...");

//     // Using Disney/Pixar style with Leonardo's character reference approach
//     const result = await leonardo.image.createGeneration({
//       height: 768,
//       width: 768,
//       modelId: "2067ae52-33fd-4a82-bb92-c2c55e7d2786", // Anime model
//       // Anime model -  e71a1c2f-4f80-4800-934f-2c68979d8cc8
//       // Leonardo Kino XL model ID - aa77f04e-3eec-4034-9c07-d0f619684628
//       // phonex - de7d3faf-762f-48e0-b3b7-9d0ac3a3fcf3
//       prompt:
//         "2D illustration of a 12 years old boy, playing soccer in the backyard, cartoon style, cel animation, cel animation, vibrant pastel colors",
//       //2D illustration of a young boy smiling, sitting under an apple tree, reading a book, on a sunny day, in a peaceful countryside

//       numImages: 1,
//       public: false,
//       alchemy: true, // Enable Alchemy V2 for better quality
//       seed: 1500, // for consistency
//       controlnets: [
//         {
//           initImageId: id,
//           initImageType: InitImageType.Uploaded,
//           preprocessorId: 133, // Character Reference Id
//           strengthType: StrengthType.High,
//         },
//       ],
//     });

//     const generationId = result.object?.sdGenerationJob?.generationId;

//     return NextResponse.json({
//       success: true,
//       message: "Character reference generation started",
//       generationId: generationId || "unknown",
//       result: result,
//     });
//   } catch (error) {
//     console.error("Error generating image with character reference:", error);

//     let errorMessage = "Failed to generate image";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }

/*

---------------------------------------------------------------------

*/

// import { NextRequest, NextResponse } from "next/server";
// import { getLeonardoClient } from "@/lib/leonardo-ai";
// import {
//   InitImageType,
//   StrengthType,
// } from "@leonardo-ai/sdk/sdk/models/shared";
// import { STYLE_IMAGE_REFERENCE_ID } from "@/constants/image";

// export async function GET(req: NextRequest) {
//   try {
//     // Use the existing Leonardo client
//     const leonardo = getLeonardoClient();

//     // Define the image URLs (character image and style reference)
//     const characterImageUrl =
//       "https://bb7d-2a00-a041-e191-3200-b935-7f77-9ed1-2400.ngrok-free.app/testImage.png";
//     const styleReferenceUrl =
//       "https://bb7d-2a00-a041-e191-3200-b935-7f77-9ed1-2400.ngrok-free.app/styleImage3.jpg"; // Your style reference image

//     console.log("Using character image:", characterImageUrl);
//     console.log("Using style reference:", styleReferenceUrl);

//     // Step 1: Upload character image
//     console.log("Getting presigned URL for character image upload...");
//     const characterUploadResponse = await leonardo.initImages.uploadInitImage({
//       extension: "png",
//     });

//     if (!characterUploadResponse.object?.uploadInitImage) {
//       throw new Error("Failed to get presigned URL for character upload");
//     }

//     const { uploadInitImage: characterUploadData } =
//       characterUploadResponse.object;

//     if (
//       !characterUploadData.id ||
//       !characterUploadData.url ||
//       !characterUploadData.fields
//     ) {
//       throw new Error("Missing required fields in character upload response");
//     }

//     const characterImageId = await uploadImageToLeonardo(
//       characterImageUrl,
//       characterUploadData.url,
//       characterUploadData.fields,
//       "characterImage.png"
//     );
//     console.log("Character image uploaded with ID:", characterImageId);

//     // Step 2: Upload style reference image
//     console.log("Getting presigned URL for style reference upload...");
//     const styleUploadResponse = await leonardo.initImages.uploadInitImage({
//       extension: "png",
//     });

//     if (!styleUploadResponse.object?.uploadInitImage) {
//       throw new Error("Failed to get presigned URL for style reference upload");
//     }

//     const { uploadInitImage: styleUploadData } = styleUploadResponse.object;

//     if (
//       !styleUploadData.id ||
//       !styleUploadData.url ||
//       !styleUploadData.fields
//     ) {
//       throw new Error("Missing required fields in style upload response");
//     }

//     const styleImageId = await uploadImageToLeonardo(
//       styleReferenceUrl,
//       styleUploadData.url,
//       styleUploadData.fields,
//       "styleReference.png"
//     );
//     console.log("Style reference image uploaded with ID:", styleImageId);

//     // Step 3: Generate an image with both character and style reference
//     console.log("Starting generation with character and style references...");
//     const styleReferenceImageId = STYLE_IMAGE_REFERENCE_ID;
//     const result = await leonardo.image.createGeneration({
//       height: 768,
//       width: 768,
//       modelId: "2067ae52-33fd-4a82-bb92-c2c55e7d2786", // Leonardo Kino XL model
//       prompt:
//         "2D illustration of a 12 years old girl playing soccer, in a village, cartoon style, cel animation, cel animation, vibrant pastel colors",
//       numImages: 1,
//       public: false,
//       alchemy: true, // Enable Alchemy for better quality
//       controlnets: [
//         {
//           initImageId: characterImageId,
//           initImageType: InitImageType.Uploaded,
//           preprocessorId: 133, // Character Reference Id
//           strengthType: StrengthType.High, // Try Mid for better balance
//         },
//         {
//           initImageId: styleReferenceImageId,
//           initImageType: InitImageType.Generated,
//           preprocessorId: 67, // Style Reference Id
//           strengthType: StrengthType.High,
//         },
//       ],
//     });

//     const generationId = result.object?.sdGenerationJob?.generationId;

//     return NextResponse.json({
//       success: true,
//       message: "Image generation with character and style references started",
//       generationId: generationId || "unknown",
//       result: result,
//     });
//   } catch (error) {
//     console.error("Error generating image:", error);

//     let errorMessage = "Failed to generate image";
//     if (error instanceof Error) {
//       errorMessage = error.message;
//     }

//     return NextResponse.json(
//       {
//         success: false,
//         error: errorMessage,
//       },
//       { status: 500 }
//     );
//   }
// }

// /**
//  * Helper function to upload an image to Leonardo
//  */
// async function uploadImageToLeonardo(
//   imageUrl: string,
//   uploadUrl: string,
//   fieldsData: Record<string, string> | string,
//   filename: string
// ): Promise<string> {
//   // Parse fields if it's a string
//   let parsedFields: Record<string, string>;
//   if (typeof fieldsData === "string") {
//     try {
//       parsedFields = JSON.parse(fieldsData);
//     } catch (error) {
//       console.error("Error parsing fields as JSON:", error);
//       throw new Error("Could not parse fields from upload response");
//     }
//   } else {
//     parsedFields = fieldsData as Record<string, string>;
//   }

//   // Fetch the image data from URL
//   console.log("Fetching image from URL:", imageUrl);
//   const imageResponse = await fetch(imageUrl);
//   if (!imageResponse.ok) {
//     throw new Error(`Failed to fetch image: ${imageResponse.statusText}`);
//   }
//   const imageBlob = await imageResponse.blob();

//   // Create FormData with ordered fields
//   const formData = new FormData();

//   // Make sure 'key' is added first
//   if (parsedFields.key) {
//     formData.append("key", parsedFields.key);
//   }

//   // Add the rest of the fields in a specific order
//   const fieldOrder = [
//     "Content-Type",
//     "bucket",
//     "Policy",
//     "X-Amz-Algorithm",
//     "X-Amz-Credential",
//     "X-Amz-Date",
//     "X-Amz-Security-Token",
//     "X-Amz-Signature",
//   ];

//   // Add fields in the specified order
//   fieldOrder.forEach((fieldName) => {
//     if (parsedFields[fieldName]) {
//       formData.append(fieldName, parsedFields[fieldName]);
//     }
//   });

//   // Add any remaining fields not in our order list
//   Object.entries(parsedFields).forEach(([key, value]) => {
//     if (key !== "key" && !fieldOrder.includes(key)) {
//       formData.append(key, value);
//     }
//   });

//   // Add the file last
//   formData.append("file", imageBlob, filename);

//   if (typeof uploadUrl !== "string") {
//     throw new Error("Invalid upload URL received");
//   }

//   // Send without headers
//   const uploadResult = await fetch(uploadUrl, {
//     method: "POST",
//     body: formData,
//   });

//   if (!uploadResult.ok) {
//     // Log full response for debugging
//     let responseText = "";
//     try {
//       responseText = await uploadResult.text();
//     } catch (e) {
//       responseText = "Could not get response text";
//     }

//     console.error("Upload error details:", responseText);
//     throw new Error(`Failed to upload image to S3: ${uploadResult.statusText}`);
//   }

//   // Extract the ID from the fields
//   const imageId = parsedFields.key.split("/").pop().split(".")[0];
//   return imageId;
// }

/*

---------------------------------------------------------------------

*/

import { NextRequest, NextResponse } from "next/server";
import { getLeonardoClient } from "@/lib/leonardo-ai";
import {
  InitImageType,
  SdGenerationStyle,
  StrengthType,
} from "@leonardo-ai/sdk/sdk/models/shared";
import { STYLE_IMAGE_REFERENCE_ID } from "@/constants/image";

export async function GET(req: NextRequest) {
  try {
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
    const styleReferenceImageId = STYLE_IMAGE_REFERENCE_ID;

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
      responseText = "Could not get response text";
    }

    console.error("Upload error details:", responseText);
    throw new Error(`Failed to upload image to S3: ${uploadResult.statusText}`);
  }

  // Extract the ID from the fields
  const imageId = parsedFields.key.split("/").pop().split(".")[0];
  return imageId;
}
