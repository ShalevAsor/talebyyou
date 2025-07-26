import {
  Camera,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  XCircle,
} from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

interface PhotoGuidelinesProps {
  variant?: "compact" | "detailed" | "inline";
  className?: string;
  defaultOpen?: boolean;
}

/**
 * Component that shows photo requirements with visual examples
 */
const PhotoGuidelines: React.FC<PhotoGuidelinesProps> = ({
  variant = "detailed",
  className = "",
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const examples = {
    good: [
      {
        src: "/images/example/before.png",
        alt: "Good example: Clear face with good lighting",
        caption: "Clear face, good lighting",
      },
      {
        src: "/images/example/goodExample2.png",
        alt: "Good example: Single child facing camera",
        caption: "Single child, facing camera",
      },
      {
        src: "/images/example/goodExample3.png",
        alt: "Good example: Single child facing camera, Good lighting",
        caption: "Single child, facing camera, Good lighting",
      },
    ],
    bad: [
      {
        src: "/images/example/badExample2.jpg",
        alt: "Bad example: Multiple people in photo",
        caption: "Multiple people",
      },
      {
        src: "/images/example/badExample3.jpg",
        alt: "Bad example: Blurry or dark photo",
        caption: "Blurry or dark",
      },
      {
        src: "/images/example/badExample.jpg",
        alt: "Bad example: Side profile or looking away",
        caption: "Side profile/looking away",
      },
    ],
  };

  const handleToggle = (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      e.stopPropagation();
      setIsOpen(!isOpen);
    }
  };

  if (variant === "compact") {
    return (
      <div
        className={`bg-blue-50 border border-blue-200 rounded-lg ${className}`}
      >
        {/* Collapsible Header */}
        <div
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="w-full p-4 flex items-center justify-between text-left hover:bg-blue-100 transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300 cursor-pointer"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls="photo-guidelines-content"
        >
          <div className="flex items-center">
            <Camera className="h-5 w-5 text-blue-600 mr-2" />
            <h4 className="font-medium text-blue-900">Photo Examples</h4>
          </div>
          {isOpen ? (
            <ChevronUp className="h-5 w-5 text-blue-600" />
          ) : (
            <ChevronDown className="h-5 w-5 text-blue-600" />
          )}
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div id="photo-guidelines-content" className="px-4 pb-4">
            <div className="grid grid-cols-2 gap-4">
              {/* Good Example */}
              <div className="text-center">
                <div className="relative mb-2">
                  <div className="w-[120px] h-[120px] mx-auto overflow-hidden rounded-lg border-2 border-green-300">
                    <Image
                      src={examples.good[0].src}
                      alt={examples.good[0].alt}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CheckCircle className="absolute -top-2 -right-2 h-6 w-6 text-green-500 bg-white rounded-full" />
                </div>
                <p className="text-xs text-green-700 font-medium">✓ Perfect!</p>
              </div>

              {/* Bad Example */}
              <div className="text-center">
                <div className="relative mb-2">
                  <div className="w-[120px] h-[120px] mx-auto overflow-hidden rounded-lg border-2 border-red-300">
                    <Image
                      src={examples.bad[0].src}
                      alt={examples.bad[0].alt}
                      width={120}
                      height={120}
                      className="w-full h-full object-cover opacity-75"
                    />
                  </div>
                  <XCircle className="absolute -top-2 -right-2 h-6 w-6 text-red-500 bg-white rounded-full" />
                </div>
                <p className="text-xs text-red-700 font-medium">✗ Avoid</p>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <div className={`mb-4 ${className}`}>
        {/* Collapsible Header - matches your form style */}
        <div
          onClick={handleToggle}
          onKeyDown={handleKeyDown}
          className="w-full p-3 bg-indigo-50/50 border border-indigo-500 rounded-lg flex items-center justify-between text-left hover:bg-indigo-100/50 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls="photo-guidelines-inline-content"
        >
          <div className="flex items-center">
            <Camera className="h-4 w-4 text-indigo-500 mr-2" />
            <span className="text-sm font-medium text-indigo-700">
              Photo Examples & Tips
            </span>
          </div>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-indigo-500" />
          ) : (
            <ChevronDown className="h-4 w-4 text-indigo-500" />
          )}
        </div>

        {/* Collapsible Content */}
        {isOpen && (
          <div
            id="photo-guidelines-inline-content"
            className="mt-3 p-4 bg-indigo-50/30 border border-indigo-500 rounded-lg"
          >
            <div className="flex justify-center space-x-8 mb-4">
              {/* Good Example */}
              <div className="text-center">
                <div className="relative mb-2">
                  <div className="w-[90px] h-[90px] overflow-hidden rounded-lg border-2 border-green-400">
                    <Image
                      src={examples.good[0].src}
                      alt={examples.good[0].alt}
                      width={90}
                      height={90}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CheckCircle className="absolute -top-1 -right-1 h-5 w-5 text-green-500 bg-white rounded-full" />
                </div>
                <p className="text-xs text-green-700 font-medium">
                  ✓ Good Photo
                </p>
              </div>

              {/* Bad Example */}
              <div className="text-center">
                <div className="relative mb-2">
                  <div className="w-[90px] h-[90px] overflow-hidden rounded-lg border-2 border-red-400">
                    <Image
                      src={examples.bad[0].src}
                      alt={examples.bad[0].alt}
                      width={90}
                      height={90}
                      className="w-full h-full object-cover opacity-75"
                    />
                  </div>
                  <XCircle className="absolute -top-1 -right-1 h-5 w-5 text-red-500 bg-white rounded-full" />
                </div>
                <p className="text-xs text-red-700 font-medium">✗ Avoid This</p>
              </div>
            </div>

            {/* Quick Tips */}
            <div className="text-center text-sm text-indigo-700">
              <p className="font-medium text-indigo-800 mb-2">Best Results:</p>
              <ul className="text-xs space-y-1 text-left max-w-sm mx-auto text-indigo-600">
                <li>• Clear face with good lighting</li>
                <li>• Single child facing the camera</li>
                <li>• High quality image (min 500x500px)</li>
                <li>• Avoid group photos or blurry images</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Default detailed variant
  return (
    <div
      className={`bg-white rounded-lg shadow-lg border border-gray-200 ${className}`}
    >
      {/* Collapsible Header */}
      <div
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
        className="w-full p-6 flex items-center justify-between text-left bg-indigo-50/50 hover:bg-indigo-50/10 transition-colors rounded-t-lg cursor-pointer focus:outline-none  "
        role="button"
        tabIndex={0}
        aria-expanded={isOpen}
        aria-controls="photo-guidelines-detailed-content"
      >
        <div className="flex items-center">
          <Camera className="h-6 w-6 text-blue-600 mr-3" />
          <div>
            <h3 className="text-xl font-bold text-gray-900">
              Photo Examples for Best Results
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Click to see examples of good vs bad photos
            </p>
          </div>
        </div>
        {isOpen ? (
          <ChevronUp className="h-6 w-6 text-gray-600" />
        ) : (
          <ChevronDown className="h-6 w-6 text-gray-600" />
        )}
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div
          id="photo-guidelines-detailed-content"
          className="px-6 pb-6 bg-indigo-50/50 rounded-md"
        >
          <p className="text-gray-600 mb-6 text-center">
            The quality of your photo directly affects how your child appears in
            the story
          </p>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Good Examples */}
            <div>
              <div className="flex items-center mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                <h4 className="text-lg font-semibold text-green-800">
                  Great Photos ✓
                </h4>
              </div>

              <div className="space-y-4">
                {examples.good.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg border border-green-200"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-[80px] h-[80px] overflow-hidden rounded-lg border-2 border-green-300">
                        <Image
                          src={example.src}
                          alt={example.alt}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CheckCircle className="absolute -top-2 -right-2 h-5 w-5 text-green-500 bg-white rounded-full" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-sm font-medium text-green-800">
                        {example.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bad Examples */}
            <div>
              <div className="flex items-center mb-4">
                <XCircle className="h-6 w-6 text-red-500 mr-3" />
                <h4 className="text-lg font-semibold text-red-800">
                  Avoid These ✗
                </h4>
              </div>

              <div className="space-y-4">
                {examples.bad.map((example, index) => (
                  <div
                    key={index}
                    className="flex items-start space-x-3 p-3 bg-red-50 rounded-lg border border-red-200"
                  >
                    <div className="relative flex-shrink-0">
                      <div className="w-[80px] h-[80px] overflow-hidden rounded-lg border-2 border-red-300">
                        <Image
                          src={example.src}
                          alt={example.alt}
                          width={80}
                          height={80}
                          className="w-full h-full object-cover opacity-75"
                        />
                      </div>
                      <XCircle className="absolute -top-2 -right-2 h-5 w-5 text-red-500 bg-white rounded-full" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-sm font-medium text-red-800">
                        {example.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h5 className="font-semibold text-blue-900 mb-2">Quick Tips:</h5>
            <ul className="text-sm text-blue-800 space-y-1">
              <li>• Use natural light from a window when possible</li>
              <li>• Make sure your child's face fills most of the frame</li>
              <li>• Avoid shadows on the face</li>
              <li>• Higher resolution photos work better (min 500x500px)</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGuidelines;
