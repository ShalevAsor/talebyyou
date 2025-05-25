"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Settings } from "lucide-react";

export default function AdminLink() {
  const { user, isLoaded } = useUser();

  // Don't show anything while loading or if not admin
  if (!isLoaded || user?.publicMetadata.role !== "store_admin") {
    return null;
  }

  return (
    <Link
      href="/admin"
      className="inline-flex items-center text-xs text-indigo-600 hover:text-indigo-800 transition-colors mt-2"
    >
      <Settings className="w-3 h-3 mr-1" />
      Admin Dashboard
    </Link>
  );
}
