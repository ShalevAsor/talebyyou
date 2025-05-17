// src/components/admin/template/TemplateManagementTools.tsx
"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function TemplateManagementTools() {
  const router = useRouter();

  return (
    <div className="mt-8 pt-4 border-t">
      <h3 className="text-lg font-medium mb-4">Template Management Tools</h3>
      <p className="text-muted-foreground mb-4">
        These actions affect all templates in your database. Use with caution.
      </p>

      <div className="flex flex-wrap gap-2">
        <Button variant="outline" onClick={() => router.push("/admin/seed")}>
          Open Template Seed & Reset Tools
        </Button>
      </div>
    </div>
  );
}
