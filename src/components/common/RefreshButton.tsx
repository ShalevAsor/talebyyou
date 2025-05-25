"use client";

import { RefreshCw } from "lucide-react";

export default function RefreshButton() {
  return (
    <button
      onClick={() => window.location.reload()}
      className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
    >
      <RefreshCw className="w-4 h-4 mr-2" />
      Try Again
    </button>
  );
}
