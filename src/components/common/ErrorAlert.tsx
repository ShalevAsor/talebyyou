// "use client";
// import React from "react";
// import { FiXCircle } from "react-icons/fi"; // Feather icon style
// import { IoMdClose } from "react-icons/io"; // Ionicons style

// interface ErrorAlertProps {
//   message: string;
//   onDismiss?: () => void;
//   className?: string;
// }

// export const ErrorAlert: React.FC<ErrorAlertProps> = ({
//   message,
//   onDismiss,
//   className = "",
// }) => {
//   return (
//     <div
//       className={`bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow-sm ${className}`}
//       role="alert"
//     >
//       <div className="flex items-start">
//         <div className="flex-shrink-0">
//           <FiXCircle className="h-5 w-5 text-red-500" />
//         </div>
//         <div className="ml-3">
//           <p className="text-sm text-red-700">{message}</p>
//         </div>
//         {onDismiss && (
//           <div className="ml-auto pl-3">
//             <button
//               type="button"
//               className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
//               onClick={onDismiss}
//               aria-label="Dismiss"
//             >
//               <span className="sr-only">Dismiss</span>
//               <IoMdClose className="h-5 w-5" />
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };
"use client";
import React from "react";
import { FiXCircle, FiRefreshCw } from "react-icons/fi"; // Add refresh icon
import { IoMdClose } from "react-icons/io";

interface ErrorAlertProps {
  message: string;
  subMessage?: string; // 🎯 Optional sub-message
  onDismiss?: () => void;
  onRetry?: () => void; // 🎯 Optional retry function
  className?: string;
  showSupportMessage?: boolean; // 🎯 Optional support message flag
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  subMessage,
  onDismiss,
  onRetry,
  className = "",
  showSupportMessage = false,
}) => {
  return (
    <div
      className={`bg-red-50 border-l-4 border-red-500 p-4 mb-4 rounded shadow-sm ${className}`}
      role="alert"
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <FiXCircle className="h-5 w-5 text-red-500" />
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm text-red-700 font-medium">{message}</p>

          {/* 🎯 Optional sub-message */}
          {subMessage && (
            <p className="text-xs text-red-600 mt-1">{subMessage}</p>
          )}

          {/* 🎯 Optional support message */}
          {showSupportMessage && (
            <p className="text-xs text-red-500 mt-2">
              If this problem continues, please contact our support team.
            </p>
          )}

          {/* 🎯 Optional retry button */}
          {onRetry && (
            <button
              type="button"
              onClick={onRetry}
              className="mt-3 inline-flex items-center px-3 py-1.5 border border-red-300 text-xs font-medium rounded text-red-700 bg-red-100 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors"
            >
              <FiRefreshCw className="h-3 w-3 mr-1" />
              Try Again
            </button>
          )}
        </div>

        {/* Dismiss button */}
        {onDismiss && (
          <div className="ml-auto pl-3">
            <button
              type="button"
              className="inline-flex bg-red-50 rounded-md p-1.5 text-red-500 hover:bg-red-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              onClick={onDismiss}
              aria-label="Dismiss"
            >
              <span className="sr-only">Dismiss</span>
              <IoMdClose className="h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
