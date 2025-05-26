// src/app/(admin)/admin/orders/page.tsx
import { Suspense } from "react";
import { Loader2 } from "lucide-react";
import { OrdersContent } from "@/components/admin/orders/OrdersContent";
import { getAllOrders } from "@/actions/order-actions";
import { Card, CardContent } from "@/components/ui/card";
// Force this page to be dynamic (not statically generated)
export const dynamic = "force-dynamic";
// Loading component
function OrdersLoading() {
  return (
    <Card className="w-full">
      <CardContent className="py-8">
        <div className="flex justify-center items-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
          <span>Loading orders...</span>
        </div>
      </CardContent>
    </Card>
  );
}

// Server component to fetch data
async function OrdersWithData() {
  // Server-side data fetching
  const result = await getAllOrders();

  if (!result.success) {
    return (
      <div className="p-6 bg-destructive/10 rounded-md">
        <p className="text-destructive font-medium">Error loading orders</p>
        <p className="text-sm text-destructive/80">{result.error}</p>
      </div>
    );
  }

  return <OrdersContent initialOrders={result.data} />;
}

// Main page component (server component)
export default function OrdersPage() {
  return (
    <div className="p-6 space-y-6">
      <Suspense fallback={<OrdersLoading />}>
        <OrdersWithData />
      </Suspense>
    </div>
  );
}
