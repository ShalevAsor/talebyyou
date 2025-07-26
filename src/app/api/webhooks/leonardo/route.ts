import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

import {
  getImageGenerationByGenerationId,
  processCompletedGeneration,
  processFailedGeneration,
} from "@/actions/image-actions";
import config from "@/lib/config";
import { logger } from "@/lib/logger";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Leonardo.ai IP addresses
const LEONARDO_IPS = [
  "35.173.108.170",
  "34.239.69.60",
  "52.73.75.186",
  "3.229.99.26",
  "44.218.0.197",
  "174.129.230.221",
];

// Define proper types based on Leonardo.ai documentation
interface LeonardoImage {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  url: string;
  generationId: string;
  nobgId: string | null;
  nsfw: boolean;
  likeCount: number;
  trendingScore: number;
  public: boolean;
}

interface LeonardoModel {
  id: string;
  name: string;
  description: string;
}

interface LeonardoApiKey {
  id: string;
  key: string;
  name: string;
  type: string;
  webhookCallbackUrl: string;
}

interface LeonardoGenerationObject {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  status: "PENDING" | "COMPLETE" | "FAILED";
  prompt: string;
  negativePrompt: string;
  imageHeight: number;
  imageWidth: number;
  inferenceSteps: number;
  seed: string;
  public: boolean;
  scheduler: string;
  modelId: string;
  error?: string;
  images: LeonardoImage[];
  model?: LeonardoModel;
  apiKey?: LeonardoApiKey;
}

interface LeonardoWebhookData {
  type: string;
  object: string;
  timestamp: number;
  api_version: string;
  data: {
    object: LeonardoGenerationObject;
  };
}

const isProduction = config.APP.NODE_ENV === "production";

export async function POST(req: NextRequest) {
  const startTime = Date.now();

  // Enhanced logging - capture all request details
  const requestDetails = {
    method: req.method,
    url: req.url,
    headers: {
      contentType: req.headers.get("content-type"),
      contentLength: req.headers.get("content-length"),
      authorization: req.headers.get("authorization")
        ? "Bearer [REDACTED]"
        : "none",
      userAgent: req.headers.get("user-agent"),
      xForwardedFor: req.headers.get("x-forwarded-for"),
      xRealIp: req.headers.get("x-real-ip"),
    },
  };

  try {
    // IP Whitelisting (only in production)
    if (isProduction) {
      const forwardedFor = req.headers.get("x-forwarded-for");
      const realIp = req.headers.get("x-real-ip");
      const clientIp = forwardedFor || realIp || "";
      const ipToCheck = clientIp.split(",")[0].trim();

      logger.info(
        { ipToCheck, isProduction },
        "WEBHOOK: Checking IP whitelist"
      );

      if (!LEONARDO_IPS.includes(ipToCheck)) {
        logger.warn(
          { ip: ipToCheck, allowedIps: LEONARDO_IPS },
          "WEBHOOK: Blocked request from unauthorized IP"
        );
        return NextResponse.json(
          { success: false, message: "IP not authorized" },
          { status: 200 }
        );
      }

      logger.info({ ipToCheck }, "WEBHOOK: IP authorized");
    }

    // 1. Check authentication
    const authHeader = req.headers.get("authorization");
    const webhookSecret = config.IMAGE_GENERATION.LEONARDO.WEBHOOK_SECRET;

    logger.info(
      {
        hasAuthHeader: !!authHeader,
        authHeaderType: authHeader?.split(" ")[0] || "none",
        hasWebhookSecret: !!webhookSecret,
      },
      "🔐 WEBHOOK: Checking authentication"
    );

    if (!webhookSecret) {
      logger.error(
        "❌ WEBHOOK: LEONARDO_WEBHOOK_SECRET is not defined in environment variables"
      );
      return NextResponse.json(
        { error: "Server misconfiguration" },
        { status: 500 }
      );
    }

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      logger.warn(
        { authHeader: authHeader || "none" },
        "⚠️ WEBHOOK: Missing or invalid authorization header - treating as health check"
      );
      return NextResponse.json(
        { success: true, message: "Health check received" },
        { status: 200 }
      );
    }

    const providedToken = authHeader.replace("Bearer ", "");
    const tokenMatches = providedToken === webhookSecret;

    logger.info(
      {
        tokenLength: providedToken.length,
        secretLength: webhookSecret.length,
        tokenMatches,
      },
      "🔑 WEBHOOK: Validating token"
    );

    if (!tokenMatches) {
      logger.error("❌ WEBHOOK: Invalid webhook token");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    logger.info("✅ WEBHOOK: Authentication successful");

    // 2. Get request body with detailed logging
    const contentLength = parseInt(req.headers.get("content-length") || "0");

    logger.info({ contentLength }, "📄 WEBHOOK: Reading request body");

    if (contentLength === 0) {
      logger.warn("⚠️ WEBHOOK: Content-Length is 0 - likely health check");
      return NextResponse.json(
        { success: true, message: "Health check acknowledged" },
        { status: 200 }
      );
    }

    let bodyText = "";
    try {
      bodyText = await req.text();

      logger.info(
        {
          bodyLength: bodyText.length,
          isEmpty: !bodyText || bodyText.trim() === "",
          bodyPreview:
            bodyText.substring(0, 200) + (bodyText.length > 200 ? "..." : ""),
        },
        "📝 WEBHOOK: Request body read"
      );

      if (!bodyText || bodyText.trim() === "") {
        logger.error(
          "❌ WEBHOOK: Body is empty despite Content-Length > 0 - this is suspicious!"
        );
        return NextResponse.json(
          { error: "Empty authenticated request body" },
          { status: 400 }
        );
      }
    } catch (textError) {
      logger.error(
        { error: textError, contentLength },
        "💥 WEBHOOK: Failed to read request body"
      );
      return NextResponse.json(
        { error: "Failed to read request body" },
        { status: 400 }
      );
    }

    // 3. Parse JSON with detailed logging
    let webhookData: LeonardoWebhookData;
    try {
      webhookData = JSON.parse(bodyText);

      logger.info(
        {
          type: webhookData?.type,
          object: webhookData?.object,
          timestamp: webhookData?.timestamp,
          hasData: !!webhookData?.data,
          hasGenerationData: !!webhookData?.data?.object,
          generationId: webhookData?.data?.object?.id,
          status: webhookData?.data?.object?.status,
          imageCount: webhookData?.data?.object?.images?.length || 0,
        },
        "📦 WEBHOOK: JSON parsed successfully"
      );
    } catch (jsonError) {
      logger.error(
        {
          error: jsonError,
          bodyLength: bodyText.length,
          bodyPreview:
            bodyText.substring(0, 200) + (bodyText.length > 200 ? "..." : ""),
        },
        "💥 WEBHOOK: Failed to parse JSON"
      );
      return NextResponse.json(
        { error: "Invalid JSON format" },
        { status: 400 }
      );
    }

    // 4. Validate webhook data structure
    if (!webhookData || typeof webhookData !== "object" || !webhookData.type) {
      logger.error(
        { webhookData: webhookData || "null" },
        "❌ WEBHOOK: Invalid webhook data structure"
      );
      return NextResponse.json(
        { error: "Invalid webhook data structure" },
        { status: 400 }
      );
    }

    // 5. Log webhook type and process
    logger.info(
      {
        type: webhookData.type,
        timestamp: webhookData.timestamp,
        apiVersion: webhookData.api_version,
      },
      "🎯 WEBHOOK: Processing webhook type"
    );

    // 6. Process image generation completion
    if (webhookData.type === "image_generation.complete") {
      const generationData = webhookData.data?.object;

      if (!generationData || !generationData.id) {
        logger.error(
          {
            hasData: !!webhookData.data,
            hasObject: !!webhookData.data?.object,
            hasId: !!webhookData.data?.object?.id,
            generationData: generationData || "null",
          },
          "❌ WEBHOOK: Missing required generation data"
        );
        return NextResponse.json(
          { error: "Missing generation data" },
          { status: 400 }
        );
      }

      const generationId = generationData.id;

      logger.info(
        {
          generationId,
          status: generationData.status,
          imageCount: generationData.images?.length || 0,
          prompt: generationData.prompt?.substring(0, 100) + "...",
          hasError: !!generationData.error,
        },
        "🔍 WEBHOOK: Processing generation completion"
      );

      // Check if this generation exists in our system
      const imageGenerationResult = await getImageGenerationByGenerationId(
        generationId
      );

      if (!imageGenerationResult.success) {
        logger.warn(
          {
            generationId,
            error: imageGenerationResult.error,
          },
          "⚠️ WEBHOOK: Generation ID not found in our system"
        );
        return NextResponse.json(
          { success: true, message: "Generation not in our system" },
          { status: 200 }
        );
      }

      const ourGeneration = imageGenerationResult.data;
      logger.info(
        {
          generationId,
          ourGenerationType: ourGeneration.type,
          ourGenerationStatus: ourGeneration.status,
          bookId: ourGeneration.bookId,
          pageId: ourGeneration.pageId,
        },
        "📋 WEBHOOK: Found matching generation in our system"
      );

      // Process based on status
      if (
        generationData.status === "COMPLETE" &&
        generationData.images?.length > 0
      ) {
        const imageUrls = generationData.images.map(
          (img: LeonardoImage) => img.url
        );

        logger.info(
          {
            generationId,
            imageCount: imageUrls.length,
            imageUrls: imageUrls.map((url) => url.substring(0, 50) + "..."),
            type: ourGeneration.type,
          },
          "🎨 WEBHOOK: Processing completed generation with images"
        );

        const result = await processCompletedGeneration(
          generationId,
          imageUrls
        );

        if (!result.success) {
          logger.error(
            {
              error: result.error,
              generationId,
              type: ourGeneration.type,
              bookId: ourGeneration.bookId,
            },
            "💥 WEBHOOK: Failed to process completed generation"
          );
        } else {
          logger.info(
            {
              generationId,
              type: ourGeneration.type,
              bookId: ourGeneration.bookId,
              imageCount: imageUrls.length,
              processingTime: Date.now() - startTime,
            },
            "✅ WEBHOOK: Successfully processed completed generation"
          );
          revalidatePath(`/library/preview/${ourGeneration.bookId}`);
        }
      } else if (generationData.status === "FAILED") {
        logger.warn(
          {
            generationId,
            error: generationData.error,
            type: ourGeneration.type,
            bookId: ourGeneration.bookId,
          },
          "❌ WEBHOOK: Processing failed generation"
        );

        const result = await processFailedGeneration(
          generationId,
          generationData.error || "Unknown error"
        );

        if (!result.success) {
          logger.error(
            {
              error: result.error,
              generationId,
              type: ourGeneration.type,
            },
            "💥 WEBHOOK: Failed to process failed generation"
          );
        } else {
          logger.info(
            { generationId, type: ourGeneration.type },
            "✅ WEBHOOK: Successfully processed failed generation"
          );
        }
      } else {
        logger.info(
          {
            generationId,
            status: generationData.status,
            imageCount: generationData.images?.length || 0,
            type: ourGeneration.type,
          },
          "ℹ️ WEBHOOK: Received webhook with non-actionable status"
        );
      }
    } else {
      logger.info(
        { type: webhookData.type },
        "ℹ️ WEBHOOK: Received non-generation webhook type"
      );
    }

    const totalTime = Date.now() - startTime;
    logger.info(
      { processingTime: totalTime },
      "🏁 WEBHOOK: Request processing completed successfully"
    );

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    const totalTime = Date.now() - startTime;
    logger.error(
      {
        error,
        processingTime: totalTime,
        requestDetails,
      },
      "💥 WEBHOOK: Unexpected error processing request"
    );

    return NextResponse.json(
      { success: false, error: "Internal server error" },
      { status: 200 }
    );
  }
}
