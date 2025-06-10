// src/components/blog/BlogPostContent.tsx
"use client";

import { useState, useEffect } from "react";
import { ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface BlogPostContentProps {
  content: string;
}

export default function BlogPostContent({ content }: BlogPostContentProps) {
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Show scroll to top button when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Enhanced content formatting with proper markdown parsing
  const formatContent = (text: string) => {
    return text
      .split("\n")
      .map((line, index) => {
        const trimmedLine = line.trim();

        // Handle headings
        if (trimmedLine.startsWith("# ")) {
          return (
            <h2
              key={index}
              className="text-3xl font-bold text-gray-900 mt-12 mb-6 first:mt-0"
            >
              {trimmedLine.substring(2).trim()}
            </h2>
          );
        }
        if (trimmedLine.startsWith("## ")) {
          return (
            <h3
              key={index}
              className="text-2xl font-semibold text-gray-900 mt-10 mb-4"
            >
              {trimmedLine.substring(3).trim()}
            </h3>
          );
        }
        if (trimmedLine.startsWith("### ")) {
          return (
            <h4
              key={index}
              className="text-xl font-semibold text-gray-900 mt-8 mb-3"
            >
              {trimmedLine.substring(4).trim()}
            </h4>
          );
        }

        // Handle images - look for ![alt](src) markdown syntax
        const imageMatch = trimmedLine.match(/!\[([^\]]*)\]\(([^)]+)\)/);
        if (imageMatch) {
          const [, alt, src] = imageMatch;
          return (
            <div key={index} className="my-8">
              <Image
                src={src}
                alt={alt}
                width={800}
                height={400}
                className="rounded-lg shadow-lg w-full object-cover"
                loading="lazy"
              />
              {alt && (
                <p className="text-sm text-gray-500 italic mt-2 text-center">
                  {alt}
                </p>
              )}
            </div>
          );
        }

        // Handle checkmarks/cross marks with emojis (Fixed the first letter removal issue)
        if (trimmedLine.startsWith("✨") || trimmedLine.startsWith("❌")) {
          // Extract emoji and text properly
          const emoji = trimmedLine.substring(0, 2); // Get the emoji
          const text = trimmedLine.substring(2).trim(); // Get remaining text and trim

          return (
            <div
              key={index}
              className="text-gray-700 text-lg leading-relaxed mb-3 flex items-start gap-3"
            >
              <span className="mt-1 text-xl flex-shrink-0">{emoji}</span>
              <span className="flex-1">{parseInlineFormatting(text)}</span>
            </div>
          );
        }

        // Handle bullet points
        if (trimmedLine.startsWith("- ")) {
          return (
            <li
              key={index}
              className="text-gray-700 text-lg leading-relaxed mb-2 ml-4"
            >
              {parseInlineFormatting(trimmedLine.substring(2).trim())}
            </li>
          );
        }

        // Handle bold text with colon (like "**Bold text:** description")
        const boldColonMatch = trimmedLine.match(/^\*\*([^*]+?):\*\*\s*(.+)$/);
        if (boldColonMatch) {
          return (
            <p
              key={index}
              className="text-gray-700 text-lg leading-relaxed mb-4"
            >
              <strong className="font-semibold text-gray-900">
                {boldColonMatch[1]}:
              </strong>{" "}
              {parseInlineFormatting(boldColonMatch[2])}
            </p>
          );
        }

        // Handle standalone bold text
        const standaloneBoldMatch = trimmedLine.match(/^\*\*([^*]+)\*\*$/);
        if (standaloneBoldMatch && !trimmedLine.includes(":")) {
          return (
            <p
              key={index}
              className="text-lg font-semibold text-gray-900 mt-6 mb-4"
            >
              {standaloneBoldMatch[1]}
            </p>
          );
        }

        // Handle italic emphasis
        const italicMatch = trimmedLine.match(/^\*([^*]+)\*$/);
        if (italicMatch && !trimmedLine.startsWith("**")) {
          return (
            <p
              key={index}
              className="text-gray-600 italic mt-4 mb-4 text-lg leading-relaxed"
            >
              {italicMatch[1]}
            </p>
          );
        }

        // Handle empty lines
        if (trimmedLine === "") {
          return <div key={index} className="h-4" />;
        }

        // Handle regular paragraphs with inline formatting
        if (trimmedLine.length > 0) {
          return (
            <p
              key={index}
              className="text-gray-700 text-lg leading-relaxed mb-6"
            >
              {parseInlineFormatting(trimmedLine)}
            </p>
          );
        }

        return null;
      })
      .filter(Boolean); // Remove null elements
  };

  // Helper function to parse inline formatting (bold, italic, etc.)
  const parseInlineFormatting = (text: string) => {
    // Handle bold text within paragraphs
    const parts = text.split(/(\*\*[^*]+?\*\*)/g);

    return parts.map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return (
          <strong key={index} className="font-semibold text-gray-900">
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  return (
    <>
      <article className="py-12">
        <div className="prose prose-lg prose-indigo max-w-none">
          <div className="text-gray-700 leading-relaxed">
            {formatContent(content)}
          </div>
        </div>

        {/* Call to Action at the end of article */}
        <div className="mt-12 p-8 bg-gradient-to-br from-indigo-50 to-purple-50 rounded-xl border border-indigo-100">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Create Your Child's Personalized Book?
            </h3>
            <p className="text-gray-600 mb-6 text-lg">
              Browse our collection of beautiful templates and start creating
              magical reading memories today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                asChild
                size="lg"
                className="bg-indigo-600 hover:bg-indigo-700"
              >
                <a href="/library">Browse Templates</a>
              </Button>
              <Button asChild variant="outline" size="lg">
                <a href="/contact">Have Questions?</a>
              </Button>
            </div>
          </div>
        </div>
      </article>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-50 rounded-full p-3 shadow-lg bg-indigo-600 hover:bg-indigo-700"
          size="sm"
          aria-label="Scroll to top"
        >
          <ChevronUp className="h-5 w-5" />
        </Button>
      )}
    </>
  );
}
