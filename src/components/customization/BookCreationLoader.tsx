// import React, { useState, useEffect } from "react";
// import { stages } from "@/data/bookCreationLoaderData";

// // Simplified stage types
// export type BookCreationStage = "uploading" | "creating" | "generating";

// interface BookCreationLoaderProps {
//   stage: BookCreationStage;
//   bookTitle?: string;
// }

// export interface StageInfo {
//   key: BookCreationStage;
//   title: string;
//   description: string;
//   icon: React.ElementType;
//   color: string;
//   bgColor: string;
//   progressColor: string;
//   ariaLabel: string;
// }

// const BookCreationLoader: React.FC<BookCreationLoaderProps> = ({
//   stage,
//   bookTitle = "your custom book",
// }) => {
//   const [progress, setProgress] = useState(0);
//   const [prevStage, setPrevStage] = useState<BookCreationStage | null>(null);

//   const currentStageIndex = stages.findIndex((s) => s.key === stage);
//   const currentStage = stages[currentStageIndex];

//   // Calculate progress based on stage with smoother animation
//   useEffect(() => {
//     // Skip animation reset if this is initial render with same stage
//     if (prevStage === null) {
//       setPrevStage(stage);
//       // Start progress for first stage
//       const targetProgress = ((currentStageIndex + 1) / stages.length) * 100;
//       animateProgress(0, targetProgress);
//       return;
//     }

//     // If stage has changed
//     if (prevStage !== stage) {
//       // Previous stage progress (completed)
//       const prevStageIndex = stages.findIndex((s) => s.key === prevStage);
//       const prevProgress = ((prevStageIndex + 1) / stages.length) * 100;

//       // Target progress for current stage
//       const targetProgress = ((currentStageIndex + 1) / stages.length) * 100;

//       // Only animate if moving forward (not backward)
//       if (currentStageIndex > prevStageIndex) {
//         // Start animating from previous stage's progress
//         animateProgress(prevProgress, targetProgress);
//       }

//       // Update previous stage
//       setPrevStage(stage);
//     }
//   }, [stage, currentStageIndex, prevStage]);

//   // Function to handle the smooth progress animation
//   const animateProgress = (from: number, to: number) => {
//     // Start from the 'from' value
//     setProgress(from);

//     // Clear any existing intervals to prevent multiple animations
//     const intervalId = setInterval(() => {
//       setProgress((prev) => {
//         if (prev < to) {
//           // Calculate step size (larger when far from target, smaller when close)
//           const step = 0.5 + (to - prev) * 0.05;
//           const newProgress = Math.min(prev + step, to);

//           // If we've reached the target, clear the interval
//           if (newProgress >= to) {
//             clearInterval(intervalId);
//           }

//           return newProgress;
//         }
//         // If we're already at or past the target, clear interval and return current
//         clearInterval(intervalId);
//         return prev;
//       });
//     }, 20);

//     // Clean up interval on component unmount
//     return () => clearInterval(intervalId);
//   };

//   // Fallback for invalid stage
//   if (!currentStage) return null;

//   const CurrentIcon = currentStage.icon;
//   const formattedProgress = Math.round(progress);

//   return (
//     <div
//       className="flex flex-col items-center justify-center min-h-[300px] w-full py-8 px-4"
//       role="status"
//       aria-live="polite"
//       aria-atomic="true"
//       aria-busy="true"
//     >
//       {/* Screen reader announcement */}
//       <div className="sr-only">
//         Creating your book: {currentStage.title}. Stage {currentStageIndex + 1}{" "}
//         of {stages.length}.{formattedProgress}% complete.
//       </div>

//       {/* 3D Book Animation */}
//       <div className="perspective mb-8" aria-hidden="true">
//         <div className="book-container">
//           <div className="book-cover">
//             <div className="book-spine"></div>
//             <div className="book-front">
//               {/* Book cover content */}
//               <div className="flex items-center justify-center h-full w-full">
//                 <CurrentIcon className={`w-10 h-10 ${currentStage.color}`} />
//               </div>
//             </div>
//           </div>
//           <div className="book-page animate-page-turn"></div>
//           <div className="book-page animate-page-turn-2"></div>
//           <div className="book-page animate-page-turn-3"></div>
//         </div>
//       </div>

//       {/* Stage information */}
//       <div className="text-center mb-6">
//         <h2 className={`text-xl font-bold mb-2 ${currentStage.color}`}>
//           {currentStage.title}
//         </h2>
//         <p className="text-gray-600 max-w-md text-sm">
//           {currentStage.description}
//         </p>
//         {bookTitle && (
//           <p className="mt-3 text-sm font-medium">
//             <span className="sr-only">Book title:</span>
//             &ldquo;{bookTitle}&rdquo;
//           </p>
//         )}
//       </div>

//       {/* Progress bar */}
//       <div
//         className="w-full max-w-md mb-6"
//         role="progressbar"
//         aria-valuenow={formattedProgress}
//         aria-valuemin={0}
//         aria-valuemax={100}
//         aria-label={`${formattedProgress}% complete`}
//       >
//         <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//           <div
//             className={`h-full ${currentStage.progressColor} transition-all duration-500 ease-out`}
//             style={{ width: `${progress}%` }}
//           />
//         </div>
//         <div className="flex justify-between mt-1">
//           <span className="text-xs text-gray-500">0%</span>
//           <span className="text-xs font-medium">{formattedProgress}%</span>
//           <span className="text-xs text-gray-500">100%</span>
//         </div>
//       </div>

//       {/* Stage indicators */}
//       <div
//         className="flex justify-between w-full max-w-md"
//         aria-label="Book creation progress steps"
//       >
//         {stages.map((s, index) => {
//           const isCompleted = index < currentStageIndex;
//           const isActive = index === currentStageIndex;
//           const Icon = s.icon;

//           // Get appropriate status for screen readers
//           const stepStatus = isCompleted
//             ? "completed"
//             : isActive
//             ? "in progress"
//             : "pending";

//           return (
//             <div
//               key={s.key}
//               className="flex flex-col items-center"
//               aria-label={`${s.title}: ${stepStatus}`}
//             >
//               <div
//                 className={`
//                   w-9 h-9 rounded-full flex items-center justify-center
//                   transition-all duration-300 border
//                   ${
//                     isCompleted
//                       ? "bg-green-50 border-green-200"
//                       : isActive
//                       ? s.bgColor + " border-" + s.color.replace("text-", "")
//                       : "bg-gray-50 border-gray-200"
//                   }
//                 `}
//               >
//                 <Icon
//                   className={`w-4 h-4 ${
//                     isCompleted
//                       ? "text-green-500"
//                       : isActive
//                       ? s.color
//                       : "text-gray-400"
//                   }`}
//                   aria-hidden="true"
//                 />
//               </div>
//               <span
//                 className={`
//                   text-xs mt-2 font-medium
//                   ${
//                     isCompleted
//                       ? "text-green-600"
//                       : isActive
//                       ? s.color
//                       : "text-gray-400"
//                   }
//                 `}
//               >
//                 {s.key.charAt(0).toUpperCase() + s.key.slice(1)}
//               </span>
//             </div>
//           );
//         })}
//       </div>

//       <p className="text-xs text-gray-500 mt-6 italic">
//         {"We're creating something magical. Please don't close this page."}
//       </p>
//     </div>
//   );
// };

// export default BookCreationLoader;
import React, { useState, useEffect } from "react";
import { stages } from "@/data/bookCreationLoaderData";

// Simplified stage types
export type BookCreationStage = "uploading" | "creating" | "generating";

interface BookCreationLoaderProps {
  stage: BookCreationStage;
  bookTitle?: string;
}

export interface StageInfo {
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
  const [prevStage, setPrevStage] = useState<BookCreationStage | null>(null);

  const currentStageIndex = stages.findIndex((s) => s.key === stage);
  const currentStage = stages[currentStageIndex];

  // Calculate progress based on stage with smoother animation
  useEffect(() => {
    // Skip animation reset if this is initial render with same stage
    if (prevStage === null) {
      setPrevStage(stage);
      // Start progress for first stage
      const targetProgress = ((currentStageIndex + 1) / stages.length) * 100;
      animateProgress(0, targetProgress);
      return;
    }

    // If stage has changed
    if (prevStage !== stage) {
      // Previous stage progress (completed)
      const prevStageIndex = stages.findIndex((s) => s.key === prevStage);
      const prevProgress = ((prevStageIndex + 1) / stages.length) * 100;

      // Target progress for current stage
      const targetProgress = ((currentStageIndex + 1) / stages.length) * 100;

      // Only animate if moving forward (not backward)
      if (currentStageIndex > prevStageIndex) {
        // Start animating from previous stage's progress
        animateProgress(prevProgress, targetProgress);
      }

      // Update previous stage
      setPrevStage(stage);
    }
  }, [stage, currentStageIndex, prevStage]);

  // Function to handle the smooth progress animation
  const animateProgress = (from: number, to: number) => {
    // Start from the 'from' value
    setProgress(from);

    // Clear any existing intervals to prevent multiple animations
    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev < to) {
          // Calculate step size (larger when far from target, smaller when close)
          const step = 0.5 + (to - prev) * 0.05;
          const newProgress = Math.min(prev + step, to);

          // If we've reached the target, clear the interval
          if (newProgress >= to) {
            clearInterval(intervalId);
          }

          return newProgress;
        }
        // If we're already at or past the target, clear interval and return current
        clearInterval(intervalId);
        return prev;
      });
    }, 20);

    // Clean up interval on component unmount
    return () => clearInterval(intervalId);
  };

  // Fallback for invalid stage
  if (!currentStage) return null;

  const CurrentIcon = currentStage.icon;
  const formattedProgress = Math.round(progress);

  // Calculate simple progress label
  const progressLabel = `Step ${currentStageIndex + 1} of ${stages.length}`;

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
        Creating your book: {currentStage.title}. {progressLabel}.
        {formattedProgress}% complete.
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

      {/* Progress bar - SIMPLIFIED to remove extra percentage display */}
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
        {/* Simplified progress text - just show step X of Y */}
        <div className="text-center mt-2">
          <span className="text-sm text-gray-600 font-medium">
            {progressLabel}
          </span>
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
