"use client";

import { useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { howItWorksSteps } from "@/data/howItWorksSteps";

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(1);

  // Generate structured data for SEO
  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Create a Personalized Children's Book",
    description:
      "Creating a personalized book is a magical journey. Follow these simple steps to bring your child's story to life.",
    step: howItWorksSteps.map((step) => ({
      "@type": "HowToStep",
      position: step.id,
      name: step.title,
      text: step.description,
    })),
  };

  // Improve performance with useCallback for handlers
  const handleStepClick = useCallback((stepId: number) => {
    setActiveStep(stepId);
  }, []);

  const handlePrevious = useCallback(() => {
    setActiveStep((prev) => Math.max(1, prev - 1));
  }, []);

  const handleNext = useCallback(() => {
    setActiveStep((prev) => Math.min(howItWorksSteps.length, prev + 1));
  }, []);

  return (
    <section
      id="how-it-works"
      className="bg-indigo-50 py-8 md:py-16 overflow-hidden rounded-md"
      aria-labelledby="how-it-works-title"
    >
      <div className="container px-4 md:px-6">
        {/* Structured data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
        />

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-600 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
              aria-hidden="true"
            >
              <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
              <path d="m9 12 2 2 4-4" />
            </svg>
          </div>
          <h2
            id="how-it-works-title"
            className="text-3xl md:text-4xl font-bold text-slate-900 mb-4"
          >
            How It Works
          </h2>
          <p className="text-lg text-slate-700 max-w-2xl mx-auto">
            {
              "Creating a personalized book is a magical journey. Follow these simple steps to bring your child's story to life."
            }
          </p>
        </div>

        {/* Interactive Steps Navigation */}
        <div className="relative mb-12">
          <div
            className="hidden md:block absolute top-1/2 left-0 right-0 h-1 bg-indigo-300 -translate-y-1/2 z-0"
            aria-hidden="true"
          ></div>
          <div
            className="flex justify-between relative z-10"
            role="tablist"
            aria-label="Book creation process steps"
          >
            {howItWorksSteps.map((step) => (
              <button
                key={step.id}
                role="tab"
                id={`step-tab-${step.id}`}
                aria-selected={activeStep === step.id}
                aria-controls={`step-content-${step.id}`}
                className="flex flex-col items-center transition-all duration-300 group"
                onClick={() => handleStepClick(step.id)}
                onKeyDown={(e) => {
                  if (e.key === "ArrowRight") {
                    handleNext();
                  } else if (e.key === "ArrowLeft") {
                    handlePrevious();
                  }
                }}
              >
                <div
                  className={`h-16 w-16 rounded-full flex items-center justify-center mb-2 cursor-pointer transition-all duration-300 ${
                    activeStep === step.id
                      ? "bg-indigo-600 text-white scale-110 shadow-lg"
                      : "bg-white text-indigo-600 border-2 border-indigo-300"
                  }`}
                >
                  {step.icon}
                </div>
                <span
                  className={`text-sm font-medium hidden md:block transition-all duration-300 ${
                    activeStep === step.id
                      ? "text-indigo-800"
                      : "text-slate-600"
                  }`}
                >
                  Step {step.id}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Active Step Content */}
        <div
          role="tabpanel"
          id={`step-content-${activeStep}`}
          aria-labelledby={`step-tab-${activeStep}`}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="inline-flex items-center rounded-full bg-indigo-100 px-3 py-1 text-sm text-indigo-600 mb-4">
                Step {activeStep} of {howItWorksSteps.length}
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
                {howItWorksSteps[activeStep - 1].title}
              </h3>
              <p className="text-slate-600 mb-6">
                {howItWorksSteps[activeStep - 1].description}
              </p>

              <div className="flex space-x-4">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={activeStep === 1}
                  className="border-indigo-200 text-indigo-600 hover:bg-indigo-50"
                  aria-label="Go to previous step"
                >
                  Previous
                </Button>
                <Button
                  onClick={handleNext}
                  disabled={activeStep === howItWorksSteps.length}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white"
                  aria-label="Go to next step"
                >
                  Next Step
                </Button>
              </div>
            </div>
            <div className="relative h-64 md:h-auto bg-indigo-50 flex items-center justify-center">
              {/* Illustration area */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                {howItWorksSteps[activeStep - 1].illustration}
              </div>

              {/* Decorative elements */}
              <div
                className="absolute -bottom-4 -right-4 h-24 w-24 bg-indigo-600 rounded-full opacity-10"
                aria-hidden="true"
              ></div>
              <div
                className="absolute top-8 -left-8 h-16 w-16 bg-purple-600 rounded-full opacity-10"
                aria-hidden="true"
              ></div>
            </div>
          </div>
        </div>

        {/* Step indicators for mobile */}
        <div
          className="flex justify-center space-x-2 mt-6 md:hidden"
          role="tablist"
          aria-label="Steps navigation"
        >
          {howItWorksSteps.map((step) => (
            <button
              key={step.id}
              role="tab"
              aria-selected={activeStep === step.id}
              aria-controls={`step-content-${step.id}`}
              className={`h-2 rounded-full transition-all duration-300 ${
                activeStep === step.id
                  ? "w-8 bg-indigo-600"
                  : "w-2 bg-indigo-300"
              }`}
              onClick={() => handleStepClick(step.id)}
              aria-label={`Go to step ${step.id}`}
            ></button>
          ))}
        </div>
      </div>
    </section>
  );
}
