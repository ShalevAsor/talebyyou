// // src/components/admin/SeedActions.tsx
// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import AdminActionDialog from "@/components/admin/AdminActionDialog";

// interface SeedActionsProps {
//   onSeed: () => Promise<void>;
//   onRemove: () => Promise<void>;
//   loading: boolean;
// }

// export function SeedActions({ onSeed, onRemove, loading }: SeedActionsProps) {
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//       <Card>
//         <CardHeader>
//           <CardTitle>Template Management</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-muted-foreground mb-4">
//             Create default book templates or remove all existing templates from
//             the database.
//           </p>
//         </CardContent>
//         <CardFooter className="flex flex-col items-start space-y-2">
//           <AdminActionDialog
//             title="Seed Book Templates"
//             description="This will create default book templates in the database. Any existing templates with the same slugs will be updated. This action cannot be undone."
//             actionLabel="Continue"
//             triggerLabel="Seed Default Templates"
//             isLoading={loading}
//             onAction={onSeed}
//           />

//           <AdminActionDialog
//             title="Remove All Templates"
//             description="This will permanently delete ALL book templates from the database. This includes templates that might be in use by customers. This action cannot be undone and may break existing books if they reference deleted templates."
//             actionLabel="Yes, Delete Everything"
//             triggerLabel="Remove All Templates"
//             isLoading={loading}
//             onAction={onRemove}
//             variant="destructive"
//             actionVariant="destructive"
//           />
//         </CardFooter>
//       </Card>

//       {/* You can add more seed action cards here in the future */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Data Backup</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <p className="text-sm text-muted-foreground mb-4">
//             {
//               "It's recommended to backup your data before performing seed operations."
//             }
//           </p>
//         </CardContent>
//         <CardFooter>
//           <Button variant="outline" className="w-full" disabled>
//             Backup Database (Coming Soon)
//           </Button>
//         </CardFooter>
//       </Card>
//     </div>
//   );
// }
// src/components/admin/seed/SeedActions.tsx
"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import AdminActionDialog from "@/components/admin/AdminActionDialog";

interface SeedActionsProps {
  onSeed: () => Promise<void>;
  onSeedBatched: () => Promise<void>;
  onRemove: () => Promise<void>;
  loading: boolean;
  progress: { processed: number; total: number };
}

export function SeedActions({
  onSeed,
  onSeedBatched,
  onRemove,
  loading,
  progress,
}: SeedActionsProps) {
  const progressPercentage =
    progress.total > 0 ? (progress.processed / progress.total) * 100 : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Template Management</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            Create default book templates or remove all existing templates from
            the database.
          </p>

          {/* Progress Bar */}
          {loading && progress.total > 0 && (
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>
                  {progress.processed}/{progress.total}
                </span>
              </div>
              <Progress value={progressPercentage} className="w-full" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <AdminActionDialog
            title="Seed Book Templates (Batched)"
            description="This will create default book templates in the database using batched processing to avoid timeouts. Any existing templates with the same titles will be updated. This action cannot be undone."
            actionLabel="Continue"
            triggerLabel="Seed Default Templates (Recommended)"
            isLoading={loading}
            onAction={onSeedBatched}
          />

          <AdminActionDialog
            title="Seed Book Templates (Legacy)"
            description="This will create all templates at once and may timeout with many templates. Use the batched option above instead. Any existing templates with the same slugs will be updated. This action cannot be undone."
            actionLabel="Continue"
            triggerLabel="Seed All at Once (May Timeout)"
            isLoading={loading}
            onAction={onSeed}
            variant="default"
          />

          <AdminActionDialog
            title="Remove All Templates"
            description="This will permanently delete ALL book templates from the database. This includes templates that might be in use by customers. This action cannot be undone and may break existing books if they reference deleted templates."
            actionLabel="Yes, Delete Everything"
            triggerLabel="Remove All Templates"
            isLoading={loading}
            onAction={onRemove}
            variant="destructive"
            actionVariant="destructive"
          />
        </CardFooter>
      </Card>

      {/* Data Backup Card */}
      <Card>
        <CardHeader>
          <CardTitle>Data Backup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            It's recommended to backup your data before performing seed
            operations.
          </p>

          {/* Template Status */}
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Templates in DB:</span>
              <span className="font-medium">
                {progress.processed > 0
                  ? `${progress.processed}/12`
                  : "Unknown"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Status:</span>
              <span
                className={`font-medium ${
                  loading
                    ? "text-blue-600"
                    : progress.processed === 12
                    ? "text-green-600"
                    : "text-gray-600"
                }`}
              >
                {loading
                  ? "Processing..."
                  : progress.processed === 12
                  ? "Complete"
                  : "Ready"}
              </span>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button variant="outline" className="w-full" disabled>
            Backup Database (Coming Soon)
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
