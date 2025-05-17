"use client";

import React from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

interface LoadingProps {
  message?: string;
  fullScreen?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  message = "Loading...",
  fullScreen = false,
  className = "",
}) => {
  const containerClasses = fullScreen
    ? "fixed inset-0 bg-white bg-opacity-80 flex items-center justify-center z-50"
    : `flex flex-col items-center justify-center py-12 ${className}`;

  return (
    <div className={containerClasses}>
      <div className="flex flex-col items-center">
        <AiOutlineLoading3Quarters className="w-10 h-10 text-blue-500 animate-spin" />
        {message && (
          <p className="mt-4 text-sm text-gray-600 font-medium">{message}</p>
        )}
      </div>
    </div>
  );
};
