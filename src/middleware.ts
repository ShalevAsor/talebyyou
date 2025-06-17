// import { clerkMiddleware } from "@clerk/nextjs/server";
// import { NextResponse } from "next/server";
// import { isMaintenanceMode } from "./utils/maintenanceUtils";

// export default clerkMiddleware(async (auth, req) => {
//   const { pathname } = req.nextUrl;

//   // Check maintenance mode for non-admin, non-maintenance routes
//   if (
//     !pathname.startsWith("/admin") && // Use simple string check instead
//     pathname !== "/maintenance" &&
//     !pathname.startsWith("/api/webhooks") &&
//     pathname !== "/api/maintenance"
//   ) {
//     const maintenanceEnabled = await isMaintenanceMode();
//     if (maintenanceEnabled) {
//       return NextResponse.redirect(new URL("/maintenance", req.url));
//     }
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
import appConfig from "@/lib/config";

export default clerkMiddleware(async (auth, req) => {
  const { pathname } = req.nextUrl;

  // Check maintenance mode for non-admin, non-maintenance routes
  if (
    !pathname.startsWith("/admin") &&
    pathname !== "/maintenance" &&
    !pathname.startsWith("/api/webhooks") &&
    pathname !== "/api/maintenance"
  ) {
    // Simple, fast maintenance check using environment variable
    const isMaintenanceMode = appConfig.APP.MAINTENANCE_MODE;

    if (isMaintenanceMode) {
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
