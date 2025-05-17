import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FiEdit3 } from "react-icons/fi";

interface CallToActionProps {
  templateId: string;
}

const CallToAction: React.FC<CallToActionProps> = React.memo(
  ({ templateId }) => {
    return (
      <section
        aria-labelledby="cta-heading"
        className="bg-gradient-to-br from-purple-500 via-indigo-500 to-violet-700 rounded-lg shadow overflow-hidden"
      >
        <header className="px-6 py-4 bg-white/10 border-b border-white/10">
          <h3 id="cta-heading" className="text-lg font-semibold text-white">
            Ready to create your book?
          </h3>
        </header>

        <div className="px-6 pt-6 pb-5">
          <p className="text-sm text-white/90 mb-10">
            Customize this template to create a unique story featuring your
            child as the main character.
          </p>

          <Button
            variant="secondary"
            size="lg"
            asChild
            className="w-full flex items-center justify-center bg-white text-indigo-500 hover:bg-purple-50"
            aria-label="Begin customizing this book template"
          >
            <Link
              href={`/library/customize/${templateId}`}
              aria-describedby="cta-description"
            >
              <FiEdit3 className="mr-2 h-4 w-4" aria-hidden="true" />
              <span>Start Customizing Now</span>
            </Link>
          </Button>

          {/* Hidden description for screen readers */}
          <span id="cta-description" className="sr-only">
            {
              "This will take you to the book customization page where you can personalize this template with your child's details"
            }
          </span>
        </div>
      </section>
    );
  }
);

// Display name for debugging
CallToAction.displayName = "CallToAction";

export default CallToAction;
