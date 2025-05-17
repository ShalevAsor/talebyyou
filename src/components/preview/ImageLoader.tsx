import React, { useState, useEffect } from "react";
import { FiCamera, FiAperture, FiImage, FiLayers } from "react-icons/fi";

interface ImageLoaderProps {
  bookTitle?: string;
}

const ImageLoader: React.FC<ImageLoaderProps> = ({ bookTitle }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

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
    // Progress animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        return prev + 0.5;
      });
    }, 30);

    // Step changing animation
    const stepInterval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % steps.length);
    }, 3000);

    return () => {
      clearInterval(progressInterval);
      clearInterval(stepInterval);
    };
  }, []);

  const CurrentIcon = steps[currentStep].icon;

  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="max-w-md w-full mx-4">
        <div className="text-center">
          {/* Book title */}
          {bookTitle && (
            <h2 className="text-2xl font-bold text-gray-800 mb-12">
              Creating: {bookTitle}
            </h2>
          )}

          {/* Animated icon with glow effect */}
          <div className="relative mb-12">
            <div
              className={`absolute inset-0 bg-gradient-to-r ${steps[currentStep].color} rounded-full blur-3xl opacity-20 animate-pulse`}
            ></div>
            <div
              className={`relative bg-gradient-to-r ${steps[currentStep].color} rounded-full p-8 mx-auto w-32 h-32 flex items-center justify-center shadow-lg`}
            >
              <CurrentIcon className="w-16 h-16 text-white animate-spin-slow" />
            </div>
          </div>

          {/* Current step text */}
          <p className="text-xl text-gray-700 font-medium mb-8">
            {steps[currentStep].text}
          </p>

          {/* Progress bar with gradient */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-6">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${steps[currentStep].color} transition-all duration-300`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>

          {/* Step indicators with gradient dots */}
          <div className="flex justify-center space-x-4">
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
