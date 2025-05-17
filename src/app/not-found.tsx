import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-lg rounded-xl shadow-xl overflow-hidden">
        <div className="flex flex-col">
          {/* Top accent */}
          <div className="h-3 bg-gradient-to-r from-purple-500 to-indigo-600"></div>

          {/* Content container */}
          <div className="bg-white p-8">
            <div className="flex flex-col items-center text-center">
              {/* 404 */}
              <h1 className="text-7xl font-bold text-indigo-600 mb-2">404</h1>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Page Not Found
              </h2>

              {/* Description */}
              <p className="text-gray-600 mb-8 max-w-md">
                The page you're looking for doesn't exist or has been moved.
              </p>

              {/* Book illustration */}
              <div className="mb-8">
                <svg
                  className="w-32 h-32 text-indigo-100"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M21 4H3c-1.1 0-2 .9-2 2v13c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zM3 19V6h8v13H3zm18 0h-8V6h8v13zm-7-9.5h6V11h-6zm0 2.5h6v1.5h-6zm0 2.5h6V16h-6z" />
                </svg>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row sm:space-x-3 space-y-3 sm:space-y-0">
                <Link
                  href="/"
                  className="inline-flex justify-center items-center px-5 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                  Return Home
                </Link>
                <Link
                  href="/library"
                  className="inline-flex justify-center items-center px-5 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z" />
                  </svg>
                  Browse Library
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
