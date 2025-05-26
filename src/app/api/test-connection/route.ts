// Create: src/app/api/test-connection/route.ts
export async function POST(req: Request) {
  console.log("=== TEST ENDPOINT HIT ===");
  console.log("Request received at:", new Date().toISOString());
  console.log("Request headers:", Object.fromEntries(req.headers.entries()));

  const body = await req.text();
  console.log("Request body:", body);

  return new Response(
    JSON.stringify({
      success: true,
      message: "Test endpoint working",
      timestamp: Date.now(),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

export async function GET() {
  console.log("=== TEST GET ENDPOINT HIT ===");
  return new Response(
    JSON.stringify({
      message: "Test endpoint is accessible",
      timestamp: Date.now(),
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}
