// src/app/(admin)/admin/seed/page.tsx
"use client";

import { useState } from "react";

import {
  removeAllBookTemplates,
  seedBookTemplates,
} from "@/actions/template-actions";
import { SeedActions } from "@/components/admin/seed/SeedActions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function SeedPage() {
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSeed = async () => {
    setLoading(true);
    try {
      const result = await seedBookTemplates();
      if (result.success) {
        setMessage({ text: result.data, type: "success" });
      } else {
        setMessage({ text: result.error, type: "error" });
      }
    } catch (error) {
      console.error("error seeding book templates from admin dashboard", error);
      setMessage({
        type: "error",
        text: "An error occurred during the operation",
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
      } else {
        setMessage({ text: result.error, type: "error" });
      }
    } catch (error) {
      console.error(
        "error removing book templates from admin dashboard",
        error
      );
      setMessage({
        type: "error",
        text: "An error occurred while removing templates",
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
        onRemove={handleRemove}
        loading={loading}
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
