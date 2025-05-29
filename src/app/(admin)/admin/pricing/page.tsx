// src/app/(admin)/admin/pricing/page.tsx
import { Suspense } from "react";
import { getPricingStatus } from "@/actions/pricing-actions";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import { BasePriceSettings } from "@/components/admin/pricing/BasePriceSettings";
import { DiscountManagement } from "@/components/admin/pricing/DiscountManagement";

// Component skeleton for loading states
function PricingCardSkeleton() {
  return (
    <div className="p-6 bg-white rounded-lg shadow-sm border">
      <div className="animate-pulse">
        <div className="flex items-center mb-6">
          <div className="w-5 h-5 bg-gray-200 rounded mr-2"></div>
          <div className="h-6 bg-gray-200 rounded w-48"></div>
        </div>
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-32"></div>
          <div className="h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
    </div>
  );
}

// This component handles data fetching
async function PricingContent() {
  // Server-side data fetching
  const pricingResult = await getPricingStatus();

  // Handle errors
  if (!pricingResult.success) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {pricingResult.error || "Failed to load pricing data"}
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <BasePriceSettings initialPricing={pricingResult.data.pricing} />
      <DiscountManagement
        initialDiscount={pricingResult.data.discount}
        isDiscountActive={pricingResult.data.isDiscountActive}
      />
    </div>
  );
}

export default async function PricingPage() {
  return (
    <div className="p-6">
      <h2 className="text-3xl font-bold tracking-tight mb-6">
        Pricing Management
      </h2>

      <Suspense
        fallback={
          <div className="grid gap-6 md:grid-cols-2">
            <PricingCardSkeleton />
            <PricingCardSkeleton />
          </div>
        }
      >
        <PricingContent />
      </Suspense>
    </div>
  );
}
