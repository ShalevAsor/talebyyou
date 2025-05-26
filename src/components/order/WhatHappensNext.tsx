import React, { memo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ProductType } from "@prisma/client";
import { CheckCircle } from "lucide-react";

interface WhatHappensNextProps {
  productType: ProductType;
}

/**
 * WhatHappensNext component shows the post-order steps to users
 * Displays a different final step based on physical vs digital product
 */
export const WhatHappensNext = memo(function WhatHappensNext({
  productType,
}: WhatHappensNextProps) {
  const steps = [
    {
      id: 1,
      title: "Complete Payment",
      description: "Process your payment and receive an email confirmation",
    },
    {
      id: 2,
      title: "Generate Remaining Images",
      description: "We'll create all the remaining illustrations for your book",
    },
    {
      id: 3,
      title: "Finish Customization",
      description: "Complete the personalization of your book",
    },
    {
      id: 4,
      title:
        productType === ProductType.EBOOK ? "Save & Download" : "Print & Ship",
      description:
        productType === ProductType.EBOOK
          ? "Get a download link sent to your email"
          : "Receive an email when your book is ready for printing, with tracking info to follow",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>What Happens Next?</CardTitle>
      </CardHeader>
      <CardContent>
        <ol className="space-y-4" aria-label="Order process steps">
          {steps.map((step) => (
            <li
              key={step.id}
              className="flex items-start"
              aria-label={`Step ${step.id}: ${step.title}`}
            >
              <span className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-green-100 text-green-600 font-medium text-sm mr-3">
                <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
              </span>
              <div>
                <div className="font-medium">{step.title}</div>
                <div className="text-sm text-gray-500">{step.description}</div>
              </div>
            </li>
          ))}
        </ol>
      </CardContent>
    </Card>
  );
});
