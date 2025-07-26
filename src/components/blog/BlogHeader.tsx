// src/components/blog/BlogHeader.tsx
import { Sparkles } from "lucide-react";

import TaleByYouLogo from "@/components/layout/Logo"; // Adjust path as needed

export default function BlogHeader() {
  return (
    <header className="bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-16 lg:py-20">
        <div className="text-center max-w-4xl mx-auto">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="relative">
              <TaleByYouLogo size={120} showText={true} />
              <Sparkles
                className="h-4 w-4 text-purple-500 absolute -top-1 -right-1"
                aria-hidden="true"
              />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Tips, Ideas & Inspiration
          </h1>

          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Expert advice on reading, unique gift ideas, and parenting insights
            to help you create magical moments with personalized children's
            books.
          </p>

          {/* Stats or badges */}
          <nav
            aria-label="Blog categories overview"
            className="flex flex-wrap justify-center gap-4 text-sm text-gray-500"
          >
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-indigo-400 rounded-full"
                aria-hidden="true"
              ></div>
              <span>Reading Tips</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-purple-400 rounded-full"
                aria-hidden="true"
              ></div>
              <span>Gift Ideas</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-blue-400 rounded-full"
                aria-hidden="true"
              ></div>
              <span>Parenting Insights</span>
            </div>
            <div className="flex items-center gap-2">
              <div
                className="w-2 h-2 bg-green-400 rounded-full"
                aria-hidden="true"
              ></div>
              <span>How-To Guides</span>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
