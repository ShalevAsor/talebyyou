"use client";

import Link from "next/link";

export default function LibraryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      {/* Main content */}
      <div className="w-full max-w-lg bg-gradient-to-r from-indigo-500 to-blue-600 rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col">
          {/* Top pattern */}
          <div className="h-3 bg-yellow-400"></div>

          {/* Content container */}
          <div className="bg-white p-8">
            <div className="flex items-start space-x-4">
              {/* Icon */}
              <div className="flex-shrink-0">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-blue-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {/* Text content */}
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  Library Unavailable
                </h2>
                <p className="text-gray-600 mb-6">
                  {error.message ||
                    "We couldn't load the book library at this time. This is a page-level error."}
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                  <button
                    onClick={reset}
                    className="inline-flex justify-center items-center px-5 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Reload Page
                  </button>
                  <Link
                    href="/"
                    className="inline-flex justify-center items-center px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Back to Home
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Technical details */}
      {error.digest && (
        <div className="mt-4 px-4 py-2 bg-gray-100 rounded-lg text-sm text-gray-500 font-mono">
          Error Reference: {error.digest}
        </div>
      )}
    </div>
  );
}
