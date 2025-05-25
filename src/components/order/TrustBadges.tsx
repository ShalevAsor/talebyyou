"use client";

import React, { memo } from "react";
import { Shield, CheckCircle, Clock, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

/**
 * TrustBadges component displays security and trust indicators to increase user confidence
 * Updated to reflect TaleByYou's actual policies and guarantees
 * Used in the checkout process to provide reassurance about payment and delivery
 */
export const TrustBadges = memo(function TrustBadges() {
  const badges = [
    {
      id: "secure-payment",
      icon: Shield,
      text: "Secure PayPal Payment",
      subtext: "Your payment is protected",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      id: "quality-guarantee",
      icon: Award,
      text: "Quality Guarantee",
      subtext: "Defective items replaced free",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "fast-generation",
      icon: Clock,
      text: "Quick Generation",
      subtext: "AI images ready in minutes",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      id: "personalized",
      icon: CheckCircle,
      text: "100% Personalized",
      subtext: "Uniquely created for your child",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
  ];

  return (
    <Card className="mt-8 border-indigo-100">
      <CardContent className="py-6">
        <div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-center"
          role="list"
          aria-label="Trust and security guarantees"
        >
          {badges.map((badge) => (
            <div
              key={badge.id}
              className={`flex flex-col items-center p-4 rounded-lg ${badge.bgColor} transition-transform hover:scale-105`}
              role="listitem"
            >
              <div className={`p-2 rounded-full bg-white shadow-sm mb-2`}>
                <badge.icon
                  className={`h-6 w-6 ${badge.color}`}
                  aria-hidden="true"
                />
              </div>
              <span className="font-semibold text-gray-900 text-sm">
                {badge.text}
              </span>
              <span className="text-xs text-gray-600 mt-1">
                {badge.subtext}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
});
