// hooks/useShippingOptions.ts
import { useState, useEffect, useCallback } from "react";
import { getShippingOptions } from "@/actions/print-actions";
import { useRef } from "react";
import { ShippingAddressForOptions, ShippingOption } from "@/types/print";

export function useShippingOptions(
  bookId: string,
  quantity: number = 1,
  shippingAddress: ShippingAddressForOptions
) {
  const [data, setData] = useState<ShippingOption[]>([]);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Store previous values to compare
  const prevAddressRef = useRef<string>("");
  const prevQuantityRef = useRef<number>(0);
  const currentAddressString = JSON.stringify(shippingAddress);

  // Function to fetch shipping options
  const fetchShippingOptions = useCallback(async () => {
    if (!bookId || !shippingAddress) {
      setIsPending(false);
      return;
    }

    setIsPending(true);
    setError(null);

    try {
      const result = await getShippingOptions(
        bookId,
        quantity,
        shippingAddress
      );

      if (result.success) {
        if (result.data && result.data.length > 0) {
          setData(result.data);
        } else {
          setError(
            new Error("No shipping options available for this address.")
          );
        }
      } else {
        setError(new Error(result.error || "Failed to load shipping options."));
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error(
              "An unexpected error occurred while loading shipping options."
            )
      );
    } finally {
      setIsPending(false);
    }
  }, [bookId, shippingAddress, quantity]);

  // Expose a refetch function
  const refetch = useCallback(() => {
    // Reset the previous refs to force a refetch
    prevAddressRef.current = "";
    prevQuantityRef.current = 0;
    fetchShippingOptions();
  }, [fetchShippingOptions]);

  useEffect(() => {
    let isMounted = true;

    // Only fetch if address, quantity or bookId has changed
    if (
      prevAddressRef.current === currentAddressString &&
      prevQuantityRef.current === quantity &&
      data.length > 0
    ) {
      return;
    }

    // Update the refs with current values
    prevAddressRef.current = currentAddressString;
    prevQuantityRef.current = quantity;

    const doFetch = async () => {
      if (!isMounted) return;
      await fetchShippingOptions();
    };

    doFetch();

    return () => {
      isMounted = false;
    };
  }, [
    bookId,
    shippingAddress,
    currentAddressString,
    data.length,
    quantity,
    fetchShippingOptions,
  ]);

  return { data, isPending, error, refetch };
}
