// Create: src/app/api/test-connection/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";

export async function POST(req: Request) {
  console.log("=== TEST ENDPOINT HIT ===");
  console.log("Request received at:", new Date().toISOString());

  try {
    console.log("Environment variables:");
    console.log("CLERK_SECRET_KEY:", !!process.env.CLERK_SECRET_KEY);
    console.log(
      "CLERK_WEBHOOK_SIGNING_SECRET:",
      !!process.env.CLERK_WEBHOOK_SIGNING_SECRET
    );

    // Try to verify the webhook just like your real webhook does
    console.log("Attempting to verify webhook...");
    const evt = await verifyWebhook(req);
    console.log("Webhook verified successfully!");
    console.log("Event type:", evt.type);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Webhook verification successful",
        eventType: evt.type,
        timestamp: Date.now(),
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Webhook verification failed:", error);
    console.error("Error message:", error);
    console.error("Error type:", error?.constructor?.name);

    return new Response(
      JSON.stringify({
        success: false,
        error: "Webhook verification failed",
        message: error,
        timestamp: Date.now(),
      }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function GET() {
  console.log("=== TEST GET ENDPOINT HIT ===");
  return new Response(
    JSON.stringify({
      message: "Test endpoint is accessible",
      timestamp: Date.now(),
      env: {
        NODE_ENV: process.env.NODE_ENV,
        hasClerkSecret: !!process.env.CLERK_SECRET_KEY,
        hasWebhookSecret: !!process.env.CLERK_WEBHOOK_SIGNING_SECRET,
        clerkSecretLength: process.env.CLERK_SECRET_KEY?.length || 0,
        webhookSecretLength:
          process.env.CLERK_WEBHOOK_SIGNING_SECRET?.length || 0,
      },
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
