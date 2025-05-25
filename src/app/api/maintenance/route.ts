import { NextResponse } from "next/server";
import { isMaintenanceMode } from "@/actions/maintenance-actions";

export async function GET() {
  try {
    const maintenanceEnabled = await isMaintenanceMode();
    return NextResponse.json({ maintenanceMode: maintenanceEnabled });
  } catch (error) {
    console.error("API: Failed to check maintenance status:", error);
    return NextResponse.json({ maintenanceMode: false }); // Safe default
  }
}
