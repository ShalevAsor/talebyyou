"use server";

import { revalidatePath } from "next/cache";

import prisma from "@/lib/prisma";
import {
  ActionResult,
  createErrorResult,
  createSuccessResult,
} from "@/types/actions";

// Configuration keys for maintenance
const MAINTENANCE_KEYS = {
  MODE: "maintenance_mode",
  TITLE: "maintenance_title",
  MESSAGE: "maintenance_message",
  DOWNTIME: "maintenance_estimated_downtime",
} as const;

// Types for our maintenance configuration
type MaintenanceConfig = {
  maintenanceMode: boolean;
  maintenanceTitle: string;
  maintenanceMessage: string;
  estimatedDowntime: string | null;
};

type MaintenanceStatusResult = {
  isMaintenanceMode: boolean;
  config: MaintenanceConfig;
};

export async function getMaintenanceStatus(): Promise<
  ActionResult<MaintenanceStatusResult>
> {
  try {
    // Get all maintenance-related configurations
    const configs = await prisma.configuration.findMany({
      where: {
        key: {
          in: Object.values(MAINTENANCE_KEYS),
        },
      },
    });

    // Convert array to object for easy access
    const configMap = configs.reduce((acc, config) => {
      acc[config.key] = config.value;
      return acc;
    }, {} as Record<string, string>);

    const maintenanceConfig: MaintenanceConfig = {
      maintenanceMode: configMap[MAINTENANCE_KEYS.MODE] === "true",
      maintenanceTitle:
        configMap[MAINTENANCE_KEYS.TITLE] || "We'll be back soon!",
      maintenanceMessage:
        configMap[MAINTENANCE_KEYS.MESSAGE] ||
        "We're performing scheduled maintenance. Please check back in a few minutes.",
      estimatedDowntime: configMap[MAINTENANCE_KEYS.DOWNTIME] || null,
    };

    return createSuccessResult({
      isMaintenanceMode: maintenanceConfig.maintenanceMode,
      config: maintenanceConfig,
    });
  } catch (error) {
    console.error("Failed to get maintenance status:", error);
    return createErrorResult("Failed to get maintenance status");
  }
}

export async function toggleMaintenanceMode(
  enabled: boolean
): Promise<ActionResult<{ enabled: boolean }>> {
  try {
    // Use upsert to update or create the maintenance mode setting
    await prisma.configuration.upsert({
      where: { key: MAINTENANCE_KEYS.MODE },
      update: {
        value: enabled.toString(),
        updatedAt: new Date(),
      },
      create: {
        key: MAINTENANCE_KEYS.MODE,
        value: enabled.toString(),
        description: "Controls whether the site is in maintenance mode",
      },
    });

    revalidatePath("/admin");
    revalidatePath("/maintenance"); // 🎯 Also revalidate maintenance page
    return createSuccessResult({ enabled });
  } catch (error) {
    console.error("Failed to toggle maintenance mode:", error);
    return createErrorResult("Failed to toggle maintenance mode");
  }
}

export async function updateMaintenanceSettings({
  title,
  message,
  estimatedDowntime,
}: {
  title: string;
  message: string;
  estimatedDowntime?: string;
}): Promise<ActionResult<{ updated: boolean }>> {
  try {
    // 🎯 Always include all settings, including downtime (even if empty)
    const updates: Array<{
      key: string;
      value: string;
      description: string;
    }> = [
      {
        key: MAINTENANCE_KEYS.TITLE,
        value: title,
        description: "Title shown on maintenance page",
      },
      {
        key: MAINTENANCE_KEYS.MESSAGE,
        value: message,
        description: "Message shown on maintenance page",
      },
      {
        key: MAINTENANCE_KEYS.DOWNTIME,
        value: estimatedDowntime || "", // 🎯 Store empty string if no downtime
        description: "Estimated downtime for maintenance",
      },
    ];

    // Use Promise.all for efficient parallel updates
    await Promise.all(
      updates.map((update) =>
        prisma.configuration.upsert({
          where: { key: update.key },
          update: {
            value: update.value,
            updatedAt: new Date(),
          },
          create: update,
        })
      )
    );

    revalidatePath("/admin");
    revalidatePath("/maintenance"); // 🎯 Also revalidate maintenance page
    return createSuccessResult({ updated: true });
  } catch (error) {
    console.error("Failed to update maintenance settings:", error);
    return createErrorResult("Failed to update maintenance settings");
  }
}

// Helper function to check maintenance status (for middleware use)
export async function isMaintenanceMode(): Promise<boolean> {
  try {
    const config = await prisma.configuration.findUnique({
      where: { key: "maintenance_mode" },
      select: { value: true },
    });
    return config?.value === "true";
  } catch (error) {
    console.error("Failed to check maintenance status:", error);
    return false; // Safe default - don't block users if DB fails
  }
}
