"use client";

import React, { memo } from "react";
import { Shield, CreditCard, Truck } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * TrustBadges component displays security and trust indicators to increase user confidence
 * Used in the checkout process to provide reassurance about payment and delivery
 */
export const TrustBadges = memo(function TrustBadges() {
  const badges = [
    {
      id: "secure-payment",
      icon: Shield,
      text: "Secure Payment",
      color: "text-green-600",
    },
    {
      id: "money-back",
      icon: CreditCard,
      text: "Money Back Guarantee",
      color: "text-blue-600",
    },
    {
      id: "fast-delivery",
      icon: Truck,
      text: "Fast Delivery",
      color: "text-purple-600",
    },
  ];

  return (
    <Card className="mt-8">
      <CardContent className="py-6">
        <div
          className="flex flex-wrap justify-center gap-6 md:gap-8 text-sm text-gray-600"
          role="list"
          aria-label="Trust and security guarantees"
        >
          {badges.map((badge) => (
            <div
              key={badge.id}
              className="flex items-center gap-2"
              role="listitem"
            >
              <badge.icon
                className={`h-5 w-5 ${badge.color}`}
                aria-hidden="true"
              />
              <span>{badge.text}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
