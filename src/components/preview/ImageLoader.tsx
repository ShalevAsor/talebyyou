import React, { useEffect, useState } from "react";
import { FiAperture, FiCamera, FiImage, FiLayers } from "react-icons/fi";

interface ImageLoaderProps {
  bookTitle?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ bookTitle }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [dotCount, setDotCount] = useState(0);

  // Define our creative steps
  const steps = [
    {
      icon: FiCamera,
      text: "Capturing your story",
      color: "from-purple-500 to-blue-500",
    },
    {
      icon: FiAperture,
      text: "Creating magical illustrations",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: FiImage,
      text: "Painting your imagination",
      color: "from-cyan-500 to-green-500",
    },
    {
      icon: FiLayers,
      text: "Bringing your book to life",
      color: "from-green-500 to-emerald-500",
    },
  ];

  useEffect(() => {
    // Dot animation - cycle through 1, 2, 3 dots
    const dotInterval = setInterval(() => {
      setDotCount((prev) => (prev + 1) % 4);
    }, 500);

    // Step changing animation - every 3 seconds
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    // Clean up intervals
    return () => {
      clearInterval(dotInterval);
      clearInterval(stepInterval);
    };
  }, [steps.length]);

  // Get current step icon
  const CurrentIcon = steps[currentStep].icon;

  // Generate loading dots
  const loadingDots = ".".repeat(dotCount);

  return (
    <div className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4 bg-white/80 p-8 rounded-2xl shadow-xl border border-gray-100">
        <div className="text-center">
          {/* Book title */}
          {bookTitle && (
            <h2 className="text-2xl font-bold text-gray-800 mb-8">
              Creating: {bookTitle}
            </h2>
          )}

          {/* Animated icon with glow effect */}
          <div className="relative mb-10">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${steps[currentStep].color} rounded-full blur-3xl opacity-20 animate-pulse`}
            ></div>
            <div
              className={`relative bg-gradient-to-r ${steps[currentStep].color} rounded-full p-6 mx-auto w-28 h-28 flex items-center justify-center shadow-lg`}
            >
              <CurrentIcon className="w-12 h-12 text-white animate-spin-slow" />
            </div>
          </div>

          {/* Current step text with animated dots */}
          <div className="h-8">
            {" "}
            {/* Fixed height to prevent layout shift */}
            <p className="text-lg text-gray-700 font-medium inline-flex items-center">
              {steps[currentStep].text}
              <span className="text-2xl text-gray-500 ml-1 w-8 text-left">
                {loadingDots}
              </span>
            </p>
          </div>

          {/* Step indicators with gradient dots */}
          <div className="flex justify-center space-x-4 mt-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentStep
                    ? `bg-gradient-to-r ${step.color} scale-125`
                    : "bg-gray-300"
                }`}
              ></div>
            ))}
          </div>

          {/* Fun message */}
          <p className="text-sm text-gray-500 mt-8">
            ✨ Your magical images are being created! ✨
          </p>
        </div>
      </div>
    </div>
  );
};

export default ImageLoader;
