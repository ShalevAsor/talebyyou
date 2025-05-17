// import { NextRequest, NextResponse } from "next/server";
// import { logger } from "@/lib/logger";
// import {
//   getImageGenerationByGenerationId,
//   processCompletedGeneration,
//   processFailedGeneration,
// } from "@/actions/image-actions";

// export async function POST(req: NextRequest) {
//   try {
//     // 1. Verify authentication (unchanged)
//     const authHeader = req.headers.get("authorization");
//     const webhookSecret = process.env.LEONARDO_WEBHOOK_SECRET;

//     if (!webhookSecret) {
//       logger.error(
//         "LEONARDO_WEBHOOK_SECRET is not defined in environment variables"
//       );
//       return NextResponse.json(
//         { error: "Server misconfiguration" },
//         { status: 500 }
//       );
//     }

//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       logger.error("Missing or invalid authorization header");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const providedToken = authHeader.replace("Bearer ", "");

//     if (providedToken !== webhookSecret) {
//       logger.error("Invalid webhook token");
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     // 2. Parse the webhook data
//     const webhookData = await req.json();

//     // 3. Log for debugging
//     logger.info(
//       { type: webhookData.type },
//       "Received webhook from Leonardo AI"
//     );

//     // 4. Check if it's a generation completion event
//     if (webhookData.type === "image_generation.complete") {
//       const generationData = webhookData.data.object;
//       const generationId = generationData.id;

//       // 5. Verify the generation ID exists in our system
//       const imageGenerationResult = await getImageGenerationByGenerationId(
//         generationId
//       );

//       if (!imageGenerationResult.success) {
//         logger.warn(
//           { generationId },
//           "Received webhook for unknown generation ID"
//         );
//         return NextResponse.json({ success: true }, { status: 200 });
//       }

//       // 6. Process based on status
//       if (
//         generationData.status === "COMPLETE" &&
//         generationData.images?.length > 0
//       ) {
//         // Extract all image URLs
//         const imageUrls = generationData.images.map((img) => img.url);

//         logger.info(
//           {
//             generationId,
//             imageCount: imageUrls.length,
//           },
//           "Processing completed generation"
//         );

//         // Use the server action to process the completed generation
//         const result = await processCompletedGeneration(
//           generationId,
//           imageUrls
//         );

//         if (!result.success) {
//           logger.error(
//             { error: result.error, generationId },
//             "Failed to process completed generation"
//           );
//         }
//       } else if (generationData.status === "FAILED") {
//         logger.warn({ generationId }, "Processing failed generation");

//         // Use the server action to process the failed generation
//         const result = await processFailedGeneration(
//           generationId,
//           generationData.error || "Unknown error"
//         );

//         if (!result.success) {
//           logger.error(
//             { error: result.error, generationId },
//             "Failed to process failed generation"
//           );
//         }
//       }
//     }

//     // 7. Always return a 200 response to acknowledge receipt
//     return NextResponse.json({ success: true }, { status: 200 });
//   } catch (error) {
//     // 8. Log the error but still return 200 to prevent retries
//     logger.error({ error }, "Error processing Leonardo webhook");
//     return NextResponse.json(
//       { success: false, error: "Internal server error" },
//       { status: 200 }
//     );
//   }
// }
import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import {
  getImageGenerationByGenerationId,
  processCompletedGeneration,
  processFailedGeneration,
} from "@/actions/image-actions";

// Leonardo.ai IP addresses
const LEONARDO_IPS = [
  "35.173.108.170",
  "34.239.69.60",
  "52.73.75.186",
  "3.229.99.26",
  "44.218.0.197",
  "174.129.230.221",
];

// Allow all IPs in development for easier testing
const isProduction = process.env.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  try {
    // IP Whitelisting (only in production)
    if (isProduction) {
      // Get the IP address from headers
      const forwardedFor = req.headers.get("x-forwarded-for");
      const realIp = req.headers.get("x-real-ip");
      const clientIp = forwardedFor || realIp || "";
      const ipToCheck = clientIp.split(",")[0].trim();

      // Check if IP is in the whitelist
      if (!LEONARDO_IPS.includes(ipToCheck)) {
        logger.warn(
          { ip: ipToCheck },
          "Blocked Leonardo webhook request from unauthorized IP"
        );
        // Still return 200 to avoid retries, but don't process the request
        return NextResponse.json(
          { success: false, message: "IP not authorized" },
          { status: 200 }
        );
      }
    }

    // 1. Verify authentication
    const authHeader = req.headers.get("authorization");
    const webhookSecret = process.env.LEONARDO_WEBHOOK_SECRET;

    if (!webhookSecret) {
      logger.error(
        "LEONARDO_WEBHOOK_SECRET is not defined in environment variables"
      );
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn(
        "Missing or invalid authorization header - possible health check"
      );
      // Return 200 for health checks without auth
      return NextResponse.json(
        { success: true, message: "Health check received" },
        { status: 200 }
      );
    }

    const providedToken = authHeader.replace("Bearer ", "");

    if (providedToken !== webhookSecret) {
      logger.error("Invalid webhook token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 2. Check for empty body (health checks)
    const contentLength = parseInt(req.headers.get("content-length") || "0");

    if (contentLength === 0) {
      logger.info("Empty request body detected, likely a health check");
      return NextResponse.json(
        { success: true, message: "Health check acknowledged" },
        { status: 200 }
      );
    }

    // 3. Safely get the request body
    let bodyText = "";
    try {
      // Clone the request to avoid consuming the stream
      const clonedReq = req.clone();
      bodyText = await clonedReq.text();

      if (!bodyText || bodyText.trim() === "") {
        logger.info("Empty request body text, treating as health check");
        return NextResponse.json(
          { success: true, message: "Health check acknowledged" },
          { status: 200 }
        );
      }
    } catch (textError) {
      logger.warn({ error: textError }, "Failed to read request body text");
      return NextResponse.json(
        { success: true, message: "Request acknowledged" },
        { status: 200 }
      );
    }

    // 4. Parse the JSON
    let webhookData;
    try {
      webhookData = JSON.parse(bodyText);
    } catch (jsonError) {
      logger.warn(
        {
          error: jsonError,
          bodyPreview:
            bodyText.substring(0, 100) + (bodyText.length > 100 ? "..." : ""),
        },
        "Failed to parse request body as JSON"
      );
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 5. Check if the webhook data structure matches what we expect
    if (!webhookData || typeof webhookData !== "object" || !webhookData.type) {
      logger.warn(
        {
          bodyPreview:
            bodyText.substring(0, 100) + (bodyText.length > 100 ? "..." : ""),
        },
        "Webhook data is not in expected format"
      );
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // 6. Log the webhook type
    logger.info(
      { type: webhookData.type, timestamp: webhookData.timestamp },
      "Received webhook from Leonardo AI"
    );

    // 7. Process image generation completion
    if (webhookData.type === "image_generation.complete") {
      // The data structure matches the Leonardo docs example
      const generationData = webhookData.data?.object;

      if (!generationData || !generationData.id) {
        logger.warn("Webhook data missing required generation fields", {
          webhookData,
        });
        return NextResponse.json({ success: true }, { status: 200 });
      }

      const generationId = generationData.id;

      // Check if this generation exists in our system
      const imageGenerationResult = await getImageGenerationByGenerationId(
        generationId
      );

      if (!imageGenerationResult.success) {
        logger.warn(
          { generationId },
          "Received webhook for unknown generation ID"
        );
        return NextResponse.json({ success: true }, { status: 200 });
      }

      // Process based on status
      if (
        generationData.status === "COMPLETE" &&
        generationData.images?.length > 0
      ) {
        // Extract all image URLs
        const imageUrls = generationData.images.map((img) => img.url);

        logger.info(
          {
            generationId,
            imageCount: imageUrls.length,
          },
          "Processing completed generation"
        );

        // Process the completed generation
        const result = await processCompletedGeneration(
          generationId,
          imageUrls
        );

        if (!result.success) {
          logger.error(
            { error: result.error, generationId },
            "Failed to process completed generation"
          );
        } else {
          logger.info(
            { generationId },
            "Successfully processed completed generation"
          );
        }
      } else if (generationData.status === "FAILED") {
        logger.warn({ generationId }, "Processing failed generation");

        // Process the failed generation
        const result = await processFailedGeneration(
          generationId,
          generationData.error || "Unknown error"
        );

        if (!result.success) {
          logger.error(
            { error: result.error, generationId },
            "Failed to process failed generation"
          );
        } else {
          logger.info(
            { generationId },
            "Successfully processed failed generation"
          );
        }
      } else {
        logger.info(
          { generationId, status: generationData.status },
          "Received webhook with non-actionable status"
        );
      }
    }

    // 8. Always return a 200 response
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // 9. Log the error but still return 200 to prevent retries
    logger.error({ error }, "Error processing Leonardo webhook");
    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 200 }
    );
  }
}
