// // src/app/(admin)/admin/seed/page.tsx
// "use client";

// import { useState } from "react";
// import {
//   seedBookTemplates,
//   removeAllBookTemplates,
// } from "@/actions/template-actions";
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
// import { SeedActions } from "@/components/admin/seed/SeedActions";

// export default function SeedPage() {
//   const [message, setMessage] = useState<{
//     text: string;
//     type: "success" | "error";
//   } | null>(null);
//   const [loading, setLoading] = useState(false);

//   const handleSeed = async () => {
//     setLoading(true);
//     try {
//       const result = await seedBookTemplates();
//       if (result.success) {
//         setMessage({ text: result.data, type: "success" });
//       } else {
//         setMessage({ text: result.error, type: "error" });
//       }
//     } catch (error) {
//       console.error("error seeding book templates from admin dashboard", error);
//       setMessage({
//         type: "error",
//         text: "An error occurred during the operation",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemove = async () => {
//     setLoading(true);
//     try {
//       const result = await removeAllBookTemplates();
//       if (result.success) {
//         setMessage({
//           text: `Successfully removed ${result.data.count} book templates`,
//           type: "success",
//         });
//       } else {
//         setMessage({ text: result.error, type: "error" });
//       }
//     } catch (error) {
//       console.error(
//         "error removing book templates from admin dashboard",
//         error
//       );
//       setMessage({
//         type: "error",
//         text: "An error occurred while removing templates",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-3xl font-bold tracking-tight mb-6">
//         Database Management
//       </h2>

//       <SeedActions
//         onSeed={handleSeed}
//         onRemove={handleRemove}
//         loading={loading}
//       />

//       {message && (
//         <Alert
//           variant={message.type === "success" ? "default" : "destructive"}
//           className="mt-6"
//         >
//           <AlertTitle>
//             {message.type === "success" ? "Success" : "Error"}
//           </AlertTitle>
//           <AlertDescription>{message.text}</AlertDescription>
//         </Alert>
//       )}
//     </div>
//   );
// }
// src/app/(admin)/admin/seed/page.tsx
"use client";

import { useState } from "react";
import {
  seedBookTemplates,
  seedBookTemplatesBatch,
  removeAllBookTemplates,
} from "@/actions/template-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { SeedActions } from "@/components/admin/seed/SeedActions";

export default function SeedPage() {
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ processed: 0, total: 12 });

  const handleSeedBatched = async () => {
    setLoading(true);
    setMessage({ text: "Starting template seeding...", type: "success" });
    setProgress({ processed: 0, total: 12 });

    let startIndex = 0;
    const batchSize = 4; // Process 4 templates at a time

    try {
      while (true) {
        console.log(`Processing batch starting at index ${startIndex}`);

        const result = await seedBookTemplatesBatch(startIndex, batchSize);

        if (result.success) {
          setProgress({
            processed: result.data.processed,
            total: result.data.total,
          });

          setMessage({
            text: `Processed ${result.data.processed}/${result.data.total} templates`,
            type: "success",
          });

          if (!result.data.hasMore) {
            setMessage({
              text: `✅ All templates seeded successfully! (${result.data.total} total)`,
              type: "success",
            });
            break;
          }

          startIndex = result.data.processed;

          // Small delay between batches
          await new Promise((resolve) => setTimeout(resolve, 500));
        } else {
          // result.success is false, so result.error exists
          setMessage({ text: `❌ Error: ${result.error}`, type: "error" });
          break;
        }
      }
    } catch (error: unknown) {
      console.error("error seeding book templates from admin dashboard", error);
      setMessage({
        type: "error",
        text: `❌ Error: ${
          error instanceof Error ? error.message : "Unknown error"
        }`,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSeed = async () => {
    setLoading(true);
    try {
      const result = await seedBookTemplates();
      if (result.success) {
        setMessage({ text: result.data, type: "success" });
      } else {
        setMessage({ text: result.error, type: "error" });
      }
    } catch (error: unknown) {
      console.error("error seeding book templates from admin dashboard", error);
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "An error occurred during the operation",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async () => {
    setLoading(true);
    try {
      const result = await removeAllBookTemplates();
      if (result.success) {
        setMessage({
          text: `Successfully removed ${result.data.count} book templates`,
          type: "success",
        });
        // Reset progress when templates are removed
        setProgress({ processed: 0, total: 12 });
      } else {
        setMessage({ text: result.error, type: "error" });
      }
    } catch (error: unknown) {
      console.error(
        "error removing book templates from admin dashboard",
        error
      );
      setMessage({
        type: "error",
        text:
          error instanceof Error
            ? error.message
            : "An error occurred while removing templates",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Database Management
      </h2>

      <SeedActions
        onSeed={handleSeed}
        onSeedBatched={handleSeedBatched}
        onRemove={handleRemove}
        loading={loading}
        progress={progress}
      />

      {message && (
        <Alert
          variant={message.type === "success" ? "default" : "destructive"}
          className="mt-6"
        >
          <AlertTitle>
            {message.type === "success" ? "Success" : "Error"}
          </AlertTitle>
          <AlertDescription>{message.text}</AlertDescription>
        </Alert>
      )}
    </div>
  );
}
