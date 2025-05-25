"use client";

import React from "react";
import Link from "next/link";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

const GlobalError: React.FC<ErrorProps> = ({ error, reset }) => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-4">
            <svg
              className="w-8 h-8 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Application Error
          </h2>
          <p className="text-gray-600 mb-6">
            A critical error occurred in the application.
          </p>

          {error && (
            <div className="w-full mb-6">
              <details className="bg-gray-50 rounded-lg overflow-hidden">
                <summary className="px-4 py-2 cursor-pointer bg-gray-100 text-gray-700 font-medium">
                  Error Details
                </summary>
                <div className="p-4 text-left">
                  <p className="text-red-600 font-mono text-sm whitespace-pre-wrap overflow-x-auto">
                    {error.message || String(error)}
                    {error.digest && (
                      <span className="block mt-1 text-gray-500">
                        Digest: {error.digest}
                      </span>
                    )}
                  </p>
                </div>
              </details>
            </div>
          )}

          <div className="flex gap-4">
            <Link
              href="/"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Go Home
            </Link>

            <button
              onClick={reset}
              className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GlobalError;
