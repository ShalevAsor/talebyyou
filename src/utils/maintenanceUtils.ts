export async function isMaintenanceMode(): Promise<boolean> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_APP_URL}/api/maintenance`,
      {
        method: "GET",
        cache: "no-store", // Don't cache the result
      }
    );

    if (!response.ok) {
      return false; // Safe default
    }

    const data = await response.json();
    return data.maintenanceMode;
  } catch (error) {
    console.error("Middleware: Failed to check maintenance status:", error);
    return false; // Safe default - don't block users if check fails
  }
}
