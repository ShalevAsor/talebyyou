// import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";

// const isAdminRoute = createRouteMatcher(["/admin(.*)"]);

// // Helper function to check maintenance via API
// async function isMaintenanceMode(): Promise<boolean> {
//   try {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_APP_URL}/api/maintenance`,
//       {
//         method: "GET",
//         cache: "no-store", // Don't cache the result
//       }
//     );

//     if (!response.ok) {
//       return false; // Safe default
//     }

//     const data = await response.json();
//     return data.maintenanceMode;
//   } catch (error) {
//     console.error("Middleware: Failed to check maintenance status:", error);
//     return false; // Safe default - don't block users if check fails
//   }
// }

// export default clerkMiddleware(async (auth, req) => {
//   const { pathname } = req.nextUrl;

//   // Check maintenance mode for non-admin, non-maintenance routes
//   if (
//     !isAdminRoute(req) &&
//     pathname !== "/maintenance" &&
//     !pathname.startsWith("/api/webhooks") &&
//     pathname !== "/api/maintenance"
//   ) {
//     const maintenanceEnabled = await isMaintenanceMode();
//     if (maintenanceEnabled) {
//       return NextResponse.redirect(new URL("/maintenance", req.url));
//     }
//   }

//   // EXISTING: Protect all routes starting with `/admin` (unchanged)
//   if (
//     isAdminRoute(req) &&
//     (await auth()).sessionClaims?.metadata?.role !== "store_admin"
//   ) {
//     const url = new URL("/", req.url);
//     return NextResponse.redirect(url);
//   }
// });

// export const config = {
//   matcher: [
//     "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
//     "/(api|trpc)(.*)",
//   ],
// };
import { clerkMiddleware } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { isMaintenanceMode } from "./utils/maintenanceUtils";

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Check maintenance mode for non-admin, non-maintenance routes
  if (
    !pathname.startsWith("/admin") && // Use simple string check instead
    pathname !== "/maintenance" &&
    !pathname.startsWith("/api/webhooks") &&
    pathname !== "/api/maintenance"
  ) {
    const maintenanceEnabled = await isMaintenanceMode();
    if (maintenanceEnabled) {
      return NextResponse.redirect(new URL("/maintenance", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
