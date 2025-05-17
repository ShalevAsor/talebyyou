"use client";
import React from "react";
import { FiXCircle } from "react-icons/fi"; // Feather icon style
import { IoMdClose } from "react-icons/io"; // Ionicons style

interface ErrorAlertProps {
  message: string;
  onDismiss?: () => void;
  className?: string;
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({
  message,
  onDismiss,
  className = "",
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
        <div className="ml-3">
          <p className="text-sm text-red-700">{message}</p>
        </div>
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
