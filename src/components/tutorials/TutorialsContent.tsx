"use client";

import React from "react";

import { tutorialsData } from "@/data/tutorialsData";

import { TutorialCard } from "./TutorialCard";

export const TutorialsContent: React.FC = () => {
  return (
    <div className="bg-indigo-50/50 p-8 rounded-lg shadow-lg">
      <div className="mb-8 text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Learn How to Create Your Perfect Book
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Follow our step-by-step video tutorials to create amazing personalized
          books for your children. From getting started to placing your order,
          we'll guide you through every step.
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto"
        role="region"
        aria-label="Tutorial videos"
      >
        {tutorialsData.map((tutorial) => (
          <TutorialCard key={tutorial.id} tutorial={tutorial} />
        ))}
      </div>

      <div className="mt-8 text-center">
        <p className="text-sm text-gray-500">
          Need more help?{" "}
          <a
            href="/contact"
            className="text-indigo-600 hover:text-indigo-800 underline"
          >
            Contact our support team
          </a>
        </p>
      </div>
    </div>
  );
};
