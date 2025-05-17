"use server";

import {
  ActionResult,
  createSuccessResult,
  createErrorResult,
} from "@/types/actions";
import { logger } from "@/lib/logger";
import { luluPrintingService } from "@/services/printing/print-service";
import prisma from "@/lib/prisma";
import { WebhookResponse, WebhookTopic } from "@/types/print";
import config from "@/lib/config";

/**
 * Setup or update the Lulu webhook subscription
 * This creates a new webhook if one doesn't exist, or updates the existing one
 */
export async function setupLuluWebhook(): Promise<
  ActionResult<WebhookResponse>
> {
  try {
    logger.info("Setting up Lulu webhook");

    // Check if we already have a webhook ID stored
    const existingConfig = await prisma.configuration.findUnique({
      where: { key: "lulu_webhook_id" },
    });

    let webhookResponse: WebhookResponse;

    if (existingConfig?.value) {
      logger.info(`Found existing webhook with ID: ${existingConfig.value}`);

      try {
        // Try to get the existing webhook to see if it's still valid
        const existingWebhook = await luluPrintingService.getWebhook(
          existingConfig.value
        );

        // Update the webhook if needed (e.g., if the URL has changed)
        const webhookUrl = `${config.CLIENT_URL}/api/webhooks/lulu`;

        if (existingWebhook.url !== webhookUrl || !existingWebhook.is_active) {
          logger.info("Updating existing webhook with new configuration");

          webhookResponse = await luluPrintingService.updateWebhook(
            existingConfig.value,
            {
              url: webhookUrl,
              is_active: true,
              topics: ["PRINT_JOB_STATUS_CHANGED"],
            }
          );
        } else {
          logger.info("Existing webhook is already correctly configured");
          webhookResponse = existingWebhook;
        }
      } catch (error) {
        // If the webhook doesn't exist anymore or there's another error, create a new one
        logger.warn(
          `Could not retrieve existing webhook: ${error}. Creating a new one.`
        );
        webhookResponse = await luluPrintingService.subscribeToWebhooks();
      }
    } else {
      // No existing webhook ID, create a new one
      logger.info("No existing webhook found, creating a new one");
      webhookResponse = await luluPrintingService.subscribeToWebhooks();
    }

    // Store or update the webhook ID in the configuration table
    await prisma.configuration.upsert({
      where: { key: "lulu_webhook_id" },
      update: { value: webhookResponse.id },
      create: {
        key: "lulu_webhook_id",
        value: webhookResponse.id,
        description: "Lulu webhook ID for print job status notifications",
      },
    });

    logger.info(`Lulu webhook setup complete, ID: ${webhookResponse.id}`);
    return createSuccessResult(webhookResponse);
  } catch (error) {
    logger.error("Failed to setup Lulu webhook", error);
    return createErrorResult(
      `Failed to setup webhook: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Get the current status of the Lulu webhook
 */
export async function getLuluWebhookStatus(): Promise<
  ActionResult<WebhookResponse | null>
> {
  try {
    logger.info("Getting Lulu webhook status");

    // Check if we have a webhook ID stored
    const existingConfig = await prisma.configuration.findUnique({
      where: { key: "lulu_webhook_id" },
    });

    if (!existingConfig?.value) {
      logger.info("No webhook ID found in configuration");
      return createSuccessResult(null);
    }

    // Get the webhook status from Lulu
    try {
      const webhook = await luluPrintingService.getWebhook(
        existingConfig.value
      );
      logger.info(`Webhook status retrieved, active: ${webhook.is_active}`);
      return createSuccessResult(webhook);
    } catch (error) {
      // If we get a 404, the webhook doesn't exist anymore
      logger.warn(`Webhook not found or error retrieving it: ${error}`);

      // Clear the stored webhook ID since it's invalid
      await prisma.configuration.delete({
        where: { key: "lulu_webhook_id" },
      });

      return createSuccessResult(null);
    }
  } catch (error) {
    logger.error("Error getting webhook status", error);
    return createErrorResult(
      `Failed to get webhook status: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Test the Lulu webhook by triggering a test notification
 */
export async function testLuluWebhook(
  topic: WebhookTopic = "PRINT_JOB_STATUS_CHANGED"
): Promise<ActionResult<boolean>> {
  try {
    logger.info(`Testing Lulu webhook for topic: ${topic}`);

    // Check if we have a webhook ID stored
    const existingConfig = await prisma.configuration.findUnique({
      where: { key: "lulu_webhook_id" },
    });

    if (!existingConfig?.value) {
      logger.error("No webhook ID found in configuration");
      return createErrorResult(
        "No webhook configured. Please set up a webhook first."
      );
    }

    // Test the webhook
    const success = await luluPrintingService.testWebhook(
      existingConfig.value,
      topic
    );

    logger.info(`Webhook test ${success ? "sent successfully" : "failed"}`);
    return createSuccessResult(success);
  } catch (error) {
    logger.error("Error testing webhook", error);
    return createErrorResult(
      `Failed to test webhook: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Delete the Lulu webhook subscription
 */
export async function deleteLuluWebhook(): Promise<ActionResult<boolean>> {
  try {
    logger.info("Deleting Lulu webhook");

    // Check if we have a webhook ID stored
    const existingConfig = await prisma.configuration.findUnique({
      where: { key: "lulu_webhook_id" },
    });

    if (!existingConfig?.value) {
      logger.info("No webhook ID found in configuration");
      return createSuccessResult(true); // Nothing to delete
    }

    // Delete the webhook from Lulu
    try {
      await luluPrintingService.deleteWebhook(existingConfig.value);
      logger.info(`Webhook ${existingConfig.value} deleted successfully`);
    } catch (error) {
      // If we get an error but it's a 404, consider it already deleted
      logger.warn(`Error deleting webhook: ${error}`);
    }

    // Remove the webhook ID from configuration regardless of the result
    await prisma.configuration.delete({
      where: { key: "lulu_webhook_id" },
    });

    return createSuccessResult(true);
  } catch (error) {
    logger.error("Error deleting webhook", error);
    return createErrorResult(
      `Failed to delete webhook: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Get all Lulu webhook subscriptions
 * This retrieves all webhooks registered with Lulu for your account
 */
export async function getAllLuluWebhooks(): Promise<
  ActionResult<WebhookResponse[]>
> {
  try {
    logger.info("Getting all Lulu webhook subscriptions");

    // Fetch all webhooks from Lulu
    const webhooks = await luluPrintingService.getWebhooks();

    logger.info(`Retrieved ${webhooks.length} Lulu webhook subscriptions`);

    return createSuccessResult(webhooks);
  } catch (error) {
    logger.error("Failed to get all Lulu webhooks", error);
    return createErrorResult(
      `Failed to get webhooks: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}

/**
 * Delete a specific Lulu webhook by ID
 * This allows admins to remove individual webhooks without affecting others
 *
 * @param webhookId The ID of the webhook to delete
 * @returns ActionResult indicating success or failure
 */
export async function deleteLuluWebhookById(
  webhookId: string
): Promise<ActionResult<boolean>> {
  try {
    if (!webhookId || webhookId.trim() === "") {
      return createErrorResult("Webhook ID is required");
    }

    logger.info(`Deleting specific Lulu webhook with ID: ${webhookId}`);

    // Delete the webhook from Lulu
    try {
      await luluPrintingService.deleteWebhook(webhookId);
      logger.info(`Webhook ${webhookId} deleted successfully`);

      // If this happens to be our stored webhook, also remove it from configuration
      const storedWebhookConfig = await prisma.configuration.findUnique({
        where: { key: "lulu_webhook_id" },
      });

      if (storedWebhookConfig?.value === webhookId) {
        logger.info(
          `Deleted webhook was our stored webhook, removing from configuration`
        );
        await prisma.configuration.delete({
          where: { key: "lulu_webhook_id" },
        });
      }

      return createSuccessResult(true);
    } catch (error) {
      // If we get a 404, the webhook doesn't exist
      if (error instanceof Error && error.message.includes("404")) {
        logger.warn(
          `Webhook ${webhookId} not found, may have been previously deleted`
        );
        return createSuccessResult(true); // Consider it a success if already deleted
      }

      // Other errors should be reported
      throw error;
    }
  } catch (error) {
    logger.error(`Error deleting webhook ${webhookId}`, error);
    return createErrorResult(
      `Failed to delete webhook: ${
        error instanceof Error ? error.message : String(error)
      }`
    );
  }
}
