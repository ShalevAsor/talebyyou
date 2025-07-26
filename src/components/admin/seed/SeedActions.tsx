// src/components/admin/SeedActions.tsx
"use client";

import AdminActionDialog from "@/components/admin/AdminActionDialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface SeedActionsProps {
  onSeed: () => Promise<void>;
  onRemove: () => Promise<void>;
  loading: boolean;
}

export function SeedActions({ onSeed, onRemove, loading }: SeedActionsProps) {
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
        </CardContent>
        <CardFooter className="flex flex-col items-start space-y-2">
          <AdminActionDialog
            title="Seed Book Templates"
            description="This will create default book templates in the database. Any existing templates with the same slugs will be updated. This action cannot be undone."
            actionLabel="Continue"
            triggerLabel="Seed Default Templates"
            isLoading={loading}
            onAction={onSeed}
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

      {/* You can add more seed action cards here in the future */}
      <Card>
        <CardHeader>
          <CardTitle>Data Backup</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground mb-4">
            {
              "It's recommended to backup your data before performing seed operations."
            }
          </p>
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
