// // src/app/api/webhooks/clerk/route.ts
// import { verifyWebhook } from "@clerk/nextjs/webhooks";
// import {
//   createUser,
//   updateUser,
//   deleteUser,
//   getUserByClerkId,
// } from "@/actions/user-actions";
// import { logger } from "@/lib/logger";
// import { migrateGuestSessionToUser } from "@/actions/guest-actions";

// export async function POST(req: Request) {
//   try {
//     console.log("=== WEBHOOK ENV DEBUG ===");
//     console.log("CLERK_SECRET_KEY:", !!process.env.CLERK_SECRET_KEY);
//     console.log(
//       "CLERK_WEBHOOK_SIGNING_SECRET:",
//       !!process.env.CLERK_WEBHOOK_SIGNING_SECRET
//     );
//     // Verify the webhook using Clerk's helper
//     const evt = await verifyWebhook(req);

//     // Get the event type
//     const eventType = evt.type;
//     const { id } = evt.data;

//     console.log(
//       `Received webhook with ID ${id} and event type of ${eventType}`
//     );

//     // Handle different event types using switch-case
//     switch (eventType) {
//       case "user.created": {
//         if (evt.type === "user.created") {
//           // Type narrowing for TypeScript
//           const {
//             id: clerkId,
//             email_addresses,
//             primary_email_address_id,
//             first_name,
//             last_name,
//           } = evt.data;

//           // Find the primary email address
//           const primaryEmail = email_addresses.find(
//             (email) => email.id === primary_email_address_id
//           );

//           if (!primaryEmail) {
//             console.error("No primary email found for user");
//             return new Response("No primary email found", { status: 400 });
//           }

//           try {
//             // Use the server action to create a new user
//             await createUser(
//               clerkId,
//               primaryEmail.email_address,
//               first_name || undefined,
//               last_name || undefined
//             );

//             return new Response(JSON.stringify({ success: true }), {
//               status: 201,
//               headers: { "Content-Type": "application/json" },
//             });
//           } catch (error) {
//             console.error("Error creating user:", error);
//             // Return a 200 status to prevent Clerk from retrying
//             return new Response(
//               JSON.stringify({ success: false, error: "Database error" }),
//               {
//                 status: 200,
//                 headers: { "Content-Type": "application/json" },
//               }
//             );
//           }
//         }
//         break;
//       }

//       case "user.updated": {
//         if (evt.type === "user.updated") {
//           // Type narrowing for TypeScript
//           const {
//             id: clerkId,
//             email_addresses,
//             primary_email_address_id,
//           } = evt.data;

//           // Find the primary email address
//           const primaryEmail = email_addresses.find(
//             (email) => email.id === primary_email_address_id
//           );

//           if (!primaryEmail) {
//             console.error("No primary email found for user");
//             return new Response("No primary email found", { status: 400 });
//           }

//           try {
//             // Use the server action to update the user
//             await updateUser(clerkId, primaryEmail.email_address);

//             return new Response(JSON.stringify({ success: true }), {
//               status: 200,
//               headers: { "Content-Type": "application/json" },
//             });
//           } catch (error) {
//             console.error("Error updating user:", error);
//             return new Response(
//               JSON.stringify({ success: false, error: "Database error" }),
//               {
//                 status: 200,
//                 headers: { "Content-Type": "application/json" },
//               }
//             );
//           }
//         }
//         break;
//       }

//       case "user.deleted": {
//         if (evt.type === "user.deleted") {
//           // Type narrowing for TypeScript
//           const { id: clerkId } = evt.data;

//           // Make sure clerkId is defined
//           if (!clerkId) {
//             console.error("No Clerk ID found for deleted user");
//             return new Response("Missing Clerk ID", { status: 400 });
//           }

//           try {
//             // Now TypeScript knows clerkId is definitely a string
//             await deleteUser(clerkId);

//             return new Response(JSON.stringify({ success: true }), {
//               status: 200,
//               headers: { "Content-Type": "application/json" },
//             });
//           } catch (error) {
//             console.error("Error deleting user:", error);
//             return new Response(
//               JSON.stringify({ success: false, error: "Database error" }),
//               {
//                 status: 200,
//                 headers: { "Content-Type": "application/json" },
//               }
//             );
//           }
//         }
//         break;
//       }
//       case "session.created": {
//         if (evt.type === "session.created") {
//           // Type narrowing for TypeScript
//           const { id: clerkId } = evt.data;

//           // Make sure clerkId is defined
//           if (!clerkId) {
//             console.error("No Clerk ID found for deleted user");
//             return new Response("Missing Clerk ID", { status: 400 });
//           }
//           // get user from database
//           const user = await getUserByClerkId(clerkId);
//           if (!user) {
//             console.error("User not found in database");
//             return new Response("User not found", { status: 400 });
//           }
//           try {
//             await migrateGuestSessionToUser(user.id);
//             return new Response(JSON.stringify({ success: true }), {
//               status: 200,
//               headers: { "Content-Type": "application/json" },
//             });
//           } catch (migrationError) {
//             logger.error(
//               { error: migrationError, userId: user.id },
//               "Error migrating guest books to user account"
//             );
//             return new Response(
//               JSON.stringify({ success: false, error: "Database error" }),
//               {
//                 status: 200,
//                 headers: { "Content-Type": "application/json" },
//               }
//             );
//           }
//         }
//         break;
//       }

//       default:
//         // For other event types, just acknowledge receipt
//         return new Response(JSON.stringify({ success: true }), {
//           status: 200,
//           headers: { "Content-Type": "application/json" },
//         });
//     }

//     // Default response if no case was matched or processed
//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { "Content-Type": "application/json" },
//     });
//   } catch (err) {
//     console.error("Error verifying webhook:", err);
//     return new Response("Error verifying webhook", { status: 400 });
//   }
// }
// src/app/api/webhooks/clerk/route.ts
import { verifyWebhook } from "@clerk/nextjs/webhooks";
import {
  createUser,
  updateUser,
  deleteUser,
  getUserByClerkId,
} from "@/actions/user-actions";
import { logger } from "@/lib/logger";
import { migrateGuestSessionToUser } from "@/actions/guest-actions";

export async function POST(req: Request) {
  console.log(
    "=== ORIGINAL WEBHOOK CALLED AT:",
    new Date().toISOString(),
    "==="
  );

  try {
    console.log("=== WEBHOOK ENV DEBUG ===");
    console.log("CLERK_SECRET_KEY:", !!process.env.CLERK_SECRET_KEY);
    console.log(
      "CLERK_WEBHOOK_SIGNING_SECRET:",
      !!process.env.CLERK_WEBHOOK_SIGNING_SECRET
    );
    // Verify the webhook using Clerk's helper
    const evt = await verifyWebhook(req);

    // Get the event type
    const eventType = evt.type;
    const { id } = evt.data;

    console.log(
      `Received webhook with ID ${id} and event type of ${eventType}`
    );

    // Handle different event types using switch-case
    switch (eventType) {
      case "user.created": {
        if (evt.type === "user.created") {
          // Type narrowing for TypeScript
          const {
            id: clerkId,
            email_addresses,
            primary_email_address_id,
            first_name,
            last_name,
          } = evt.data;

          // Find the primary email address
          const primaryEmail = email_addresses.find(
            (email) => email.id === primary_email_address_id
          );

          if (!primaryEmail) {
            console.error("No primary email found for user");
            return new Response("No primary email found", { status: 400 });
          }

          try {
            // Use the server action to create a new user
            await createUser(
              clerkId,
              primaryEmail.email_address,
              first_name || undefined,
              last_name || undefined
            );

            return new Response(JSON.stringify({ success: true }), {
              status: 201,
              headers: { "Content-Type": "application/json" },
            });
          } catch (error) {
            console.error("Error creating user:", error);
            // Return a 200 status to prevent Clerk from retrying
            return new Response(
              JSON.stringify({ success: false, error: "Database error" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }
        break;
      }

      case "user.updated": {
        if (evt.type === "user.updated") {
          // Type narrowing for TypeScript
          const {
            id: clerkId,
            email_addresses,
            primary_email_address_id,
          } = evt.data;

          // Find the primary email address
          const primaryEmail = email_addresses.find(
            (email) => email.id === primary_email_address_id
          );

          if (!primaryEmail) {
            console.error("No primary email found for user");
            return new Response("No primary email found", { status: 400 });
          }

          try {
            // Use the server action to update the user
            await updateUser(clerkId, primaryEmail.email_address);

            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch (error) {
            console.error("Error updating user:", error);
            return new Response(
              JSON.stringify({ success: false, error: "Database error" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }
        break;
      }

      case "user.deleted": {
        if (evt.type === "user.deleted") {
          // Type narrowing for TypeScript
          const { id: clerkId } = evt.data;

          // Make sure clerkId is defined
          if (!clerkId) {
            console.error("No Clerk ID found for deleted user");
            return new Response("Missing Clerk ID", { status: 400 });
          }

          try {
            // Now TypeScript knows clerkId is definitely a string
            await deleteUser(clerkId);

            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch (error) {
            console.error("Error deleting user:", error);
            return new Response(
              JSON.stringify({ success: false, error: "Database error" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }
        break;
      }
      case "session.created": {
        if (evt.type === "session.created") {
          // Type narrowing for TypeScript
          const { id: clerkId } = evt.data;

          // Make sure clerkId is defined
          if (!clerkId) {
            console.error("No Clerk ID found for deleted user");
            return new Response("Missing Clerk ID", { status: 400 });
          }
          // get user from database
          const user = await getUserByClerkId(clerkId);
          if (!user) {
            console.error("User not found in database");
            return new Response("User not found", { status: 400 });
          }
          try {
            await migrateGuestSessionToUser(user.id);
            return new Response(JSON.stringify({ success: true }), {
              status: 200,
              headers: { "Content-Type": "application/json" },
            });
          } catch (migrationError) {
            logger.error(
              { error: migrationError, userId: user.id },
              "Error migrating guest books to user account"
            );
            return new Response(
              JSON.stringify({ success: false, error: "Database error" }),
              {
                status: 200,
                headers: { "Content-Type": "application/json" },
              }
            );
          }
        }
        break;
      }

      default:
        // For other event types, just acknowledge receipt
        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        });
    }

    // Default response if no case was matched or processed
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Error verifying webhook:", err);
    return new Response("Error verifying webhook", { status: 400 });
  }
}
