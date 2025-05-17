import React from "react";
import { Button } from "@/components/ui/button";
import { FiArrowLeft, FiEdit3 } from "react-icons/fi";
import Link from "next/link";

interface TemplateHeroProps {
  title: string;
  description?: string;
  templateId: string;
}

const TemplateHero: React.FC<TemplateHeroProps> = ({
  title,
  description,
  templateId,
}) => {
  return (
    <div className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            {description && (
              <p className="text-gray-600 text-sm">{description}</p>
            )}
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="outline" size="sm" asChild>
              <Link href="/library" className="flex items-center">
                <FiArrowLeft className="mr-2 h-4 w-4" />
                Back to Library
              </Link>
            </Button>

            <Button variant="default" size="sm" asChild>
              <Link
                href={`/library/customize/${templateId}`}
                className="flex items-center"
              >
                <FiEdit3 className="mr-2 h-4 w-4" />
                Customize Book
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TemplateHero;
