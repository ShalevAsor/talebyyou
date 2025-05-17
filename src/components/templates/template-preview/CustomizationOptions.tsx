import React from "react";
import { FiCheck } from "react-icons/fi";

const customizationOptions = [
  "Add your child's name to the story",
  "Upload a photo to match character appearance",
  "Edit story text to add personal touches",
  "Customize character features and accessories",
  "Add a personal dedication message",
];

const CustomizationOptions: React.FC = React.memo(() => {
  return (
    <section
      aria-labelledby="customization-options-heading"
      className="bg-white rounded-lg shadow overflow-hidden"
    >
      <header className="px-6 py-4 bg-gray-50 border-b border-gray-100">
        <h3
          id="customization-options-heading"
          className="text-lg font-semibold text-gray-900"
        >
          Customization Options
        </h3>
      </header>

      <div className="px-6 py-4">
        <ul className="space-y-3" aria-label="Available customization features">
          {customizationOptions.map((option, index) => (
            <li key={index} className="flex items-center">
              <span className="flex-shrink-0" aria-hidden="true">
                <span className="w-5 h-5 rounded-full bg-green-50 flex items-center justify-center">
                  <FiCheck className="w-3 h-3 text-green-600" />
                </span>
              </span>
              <span className="ml-3 text-sm text-gray-600">{option}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
});

// Display name for debugging
CustomizationOptions.displayName = "CustomizationOptions";

export default CustomizationOptions;
