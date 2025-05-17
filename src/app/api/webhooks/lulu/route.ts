import { NextRequest, NextResponse } from "next/server";
import { logger } from "@/lib/logger";
import { PrintJobStatusChangedPayload } from "@/types/print";
import crypto from "crypto";
import config from "@/lib/config";
import { processWebhook } from "@/actions/webhook-actions";

/**
 * Verify the HMAC signature of the webhook
 * @param rawBody The raw body of the request
 * @param signature The signature from the header
 * @returns Whether the signature is valid
 */
function verifyHmacSignature(rawBody: string, signature: string): boolean {
  try {
    // Get the Lulu webhook secret from config
    const webhookSecret =
      process.env.NODE_ENV === "production"
        ? config.LULU.PRODUCTION.CLIENT_SECRET
        : config.LULU.SANDBOX.CLIENT_SECRET;

    if (!webhookSecret) {
      logger.error("Webhook secret not found in configuration");
      return false;
    }

    // Calculate HMAC using the webhook secret
    const calculatedHmac = crypto
      .createHmac("sha256", webhookSecret)
      .update(rawBody, "utf8")
      .digest("hex");

    // Compare with the provided signature
    const isValid = crypto.timingSafeEqual(
      Buffer.from(calculatedHmac, "hex"),
      Buffer.from(signature, "hex")
    );

    logger.debug(`HMAC verification result: ${isValid ? "valid" : "invalid"}`);
    return isValid;
  } catch (error) {
    logger.error("Error verifying HMAC signature:", error);
    return false;
  }
}

/**
 * Webhook handler for Lulu print job status updates
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    logger.info("Received webhook from Lulu");

    // Get the raw body for HMAC verification
    const rawBody = await request.text();
    logger.debug(`Raw webhook body: ${rawBody}`);

    // Get the HMAC signature from the header
    const hmacSignature = request.headers.get("Lulu-HMAC-SHA256");
    logger.debug(`Received HMAC signature: ${hmacSignature}`);

    // Check if signature is present
    if (!hmacSignature) {
      logger.warn("Missing HMAC signature in webhook request");
      return NextResponse.json({ error: "Missing signature" }, { status: 401 });
    }

    // Verify the HMAC signature
    const isSignatureValid = verifyHmacSignature(rawBody, hmacSignature);
    if (!isSignatureValid && process.env.NODE_ENV === "production") {
      logger.warn("Invalid HMAC signature in webhook request");
      return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
    }

    // Skip signature validation in development/testing
    if (!isSignatureValid) {
      logger.warn(
        "Invalid signature, but continuing (non-production environment)"
      );
    }

    // Parse the webhook payload
    let webhookData: PrintJobStatusChangedPayload;
    try {
      webhookData = JSON.parse(rawBody);

      // Log the complete webhook data structure
      logger.info("Webhook data structure:", {
        keys: Object.keys(webhookData),
        fullPayload: webhookData,
      });

      // Additional detailed logging for specific fields
      if (webhookData.topic) {
        logger.info(`Webhook topic: ${webhookData.topic}`);
      }

      if (webhookData.data) {
        logger.info("Webhook data field structure:", {
          dataKeys: Object.keys(webhookData.data),
          // Log specific important fields if they exist
          printJobId: webhookData.data.id,
          status: webhookData.data.status?.name,
          statusMessage: webhookData.data.status?.message,
          externalId: webhookData.data.external_id, // This should be your orderId
        });
      }
    } catch (error) {
      logger.error("Failed to parse webhook JSON:", error);
      return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
    }

    try {
      // Type the webhook data properly
      const typedWebhookData = webhookData as PrintJobStatusChangedPayload;

      // Call the server action to process the webhook
      const processResult = await processWebhook(typedWebhookData);

      logger.info(
        `Webhook processed with result: ${
          processResult.success ? "success" : "error"
        }${
          processResult.success && !processResult.data.processed
            ? " (no matching print job)"
            : ""
        }`
      );

      // Always return a success response to acknowledge receipt
      return NextResponse.json({
        success: true,
        message: processResult.success
          ? processResult.data.processed
            ? "Webhook processed successfully"
            : "Webhook received but not processed"
          : "Webhook received with processing errors",
      });
    } catch (error) {
      logger.error("Error calling processWebhook:", error);
      // Still return success to avoid retries
      return NextResponse.json({
        success: true,
        message: "Webhook received but processing failed",
      });
    }
  } catch (error) {
    // Log any unexpected errors
    logger.error("Error processing webhook:", error);

    // Always return a success response to avoid webhook retries
    // We want to analyze the logs, not have Lulu keep retrying
    return NextResponse.json({
      success: true,
      message: "Webhook received with errors",
    });
  }
}
