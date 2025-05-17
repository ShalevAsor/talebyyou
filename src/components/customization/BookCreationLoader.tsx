import React, { useState, useEffect } from "react";
import { BookOpen, Upload, Palette } from "lucide-react";

// Simplified stage types
export type BookCreationStage = "uploading" | "creating" | "generating";

interface BookCreationLoaderProps {
  stage: BookCreationStage;
  bookTitle?: string;
}

interface StageInfo {
  key: BookCreationStage;
  title: string;
  description: string;
  icon: React.ElementType;
  color: string;
  bgColor: string;
  progressColor: string;
  ariaLabel: string;
}

const BookCreationLoader: React.FC<BookCreationLoaderProps> = ({
  stage,
  bookTitle = "your custom book",
}) => {
  const [progress, setProgress] = useState(0);

  // Simplified stages with book-related theme
  const stages: StageInfo[] = [
    {
      key: "uploading",
      title: "Preparing Your Character",
      description: "Uploading your character to bring your story to life...",
      icon: Upload,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      progressColor: "bg-amber-500",
      ariaLabel: "Uploading character image",
    },
    {
      key: "creating",
      title: "Writing Your Story",
      description: "Crafting a personalized narrative just for you...",
      icon: BookOpen,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
      progressColor: "bg-indigo-500",
      ariaLabel: "Creating your personalized book",
    },
    {
      key: "generating",
      title: "Illustrating Your Book",
      description: "Creating the perfect visuals for your story...",
      icon: Palette,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      progressColor: "bg-purple-500",
      ariaLabel: "Generating illustrations for your book",
    },
  ];

  const currentStageIndex = stages.findIndex((s) => s.key === stage);
  const currentStage = stages[currentStageIndex];

  // Calculate progress based on stage with smoother animation
  useEffect(() => {
    // Reset progress when stage changes
    setProgress(0);

    const targetProgress = ((currentStageIndex + 1) / stages.length) * 100;

    // Smoothly animate to target progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev < targetProgress) {
          // Use easing for smoother animation
          const step = 0.5 + (targetProgress - prev) * 0.05;
          return Math.min(prev + step, targetProgress);
        }
        return prev;
      });
    }, 20);

    return () => clearInterval(interval);
  }, [currentStageIndex, stages.length]);

  // Fallback for invalid stage
  if (!currentStage) return null;

  const CurrentIcon = currentStage.icon;
  const formattedProgress = Math.round(progress);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-[300px] w-full py-8 px-4"
      role="status"
      aria-live="polite"
      aria-atomic="true"
      aria-busy="true"
    >
      {/* Screen reader announcement */}
      <div className="sr-only">
        Creating your book: {currentStage.title}. Stage {currentStageIndex + 1}{" "}
        of {stages.length}.{formattedProgress}% complete.
      </div>

      {/* 3D Book Animation */}
      <div className="perspective mb-8" aria-hidden="true">
        <div className="book-container">
          <div className="book-cover">
            <div className="book-spine"></div>
            <div className="book-front">
              {/* Book cover content */}
              <div className="flex items-center justify-center h-full w-full">
                <CurrentIcon className={`w-10 h-10 ${currentStage.color}`} />
              </div>
            </div>
          </div>
          <div className="book-page animate-page-turn"></div>
          <div className="book-page animate-page-turn-2"></div>
          <div className="book-page animate-page-turn-3"></div>
        </div>
      </div>

      {/* Stage information */}
      <div className="text-center mb-6">
        <h2 className={`text-xl font-bold mb-2 ${currentStage.color}`}>
          {currentStage.title}
        </h2>
        <p className="text-gray-600 max-w-md text-sm">
          {currentStage.description}
        </p>
        {bookTitle && (
          <p className="mt-3 text-sm font-medium">
            <span className="sr-only">Book title:</span>
            &ldquo;{bookTitle}&rdquo;
          </p>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="w-full max-w-md mb-6"
        role="progressbar"
        aria-valuenow={formattedProgress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${formattedProgress}% complete`}
      >
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className={`h-full ${currentStage.progressColor} transition-all duration-500 ease-out`}
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between mt-1">
          <span className="text-xs text-gray-500">0%</span>
          <span className="text-xs text-gray-500">{formattedProgress}%</span>
          <span className="text-xs text-gray-500">100%</span>
        </div>
      </div>

      {/* Stage indicators */}
      <div
        className="flex justify-between w-full max-w-md"
        aria-label="Book creation progress steps"
      >
        {stages.map((s, index) => {
          const isCompleted = index < currentStageIndex;
          const isActive = index === currentStageIndex;
          const Icon = s.icon;

          // Get appropriate status for screen readers
          const stepStatus = isCompleted
            ? "completed"
            : isActive
            ? "in progress"
            : "pending";

          return (
            <div
              key={s.key}
              className="flex flex-col items-center"
              aria-label={`${s.title}: ${stepStatus}`}
            >
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  transition-all duration-300 border
                  ${
                    isCompleted
                      ? "bg-green-50 border-green-200"
                      : isActive
                      ? s.bgColor + " border-" + s.color.replace("text-", "")
                      : "bg-gray-50 border-gray-200"
                  }
                `}
              >
                <Icon
                  className={`w-4 h-4 ${
                    isCompleted
                      ? "text-green-500"
                      : isActive
                      ? s.color
                      : "text-gray-400"
                  }`}
                  aria-hidden="true"
                />
              </div>
              <span
                className={`
                  text-xs mt-2 font-medium
                  ${
                    isCompleted
                      ? "text-green-600"
                      : isActive
                      ? s.color
                      : "text-gray-400"
                  }
                `}
              >
                {s.key.charAt(0).toUpperCase() + s.key.slice(1)}
              </span>
            </div>
          );
        })}
      </div>

      <p className="text-xs text-gray-500 mt-6 italic">
        {"We're creating something magical. Please don't close this page."}
      </p>
    </div>
  );
};

export default BookCreationLoader;
