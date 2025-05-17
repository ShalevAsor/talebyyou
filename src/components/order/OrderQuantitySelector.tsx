// components/order/QuantitySelector.tsx
import React from "react";
import { Button } from "../ui/button";

interface OrderQuantitySelectorProps {
  quantity: number;
  onChange: (quantity: number) => void;
  min?: number;
  max?: number;
}

export function OrderQuantitySelector({
  quantity,
  onChange,
  min = 1,
  max = 10,
}: OrderQuantitySelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.max(min, quantity - 1))}
        disabled={quantity <= min}
      >
        -
      </Button>

      <span className="w-8 text-center">{quantity}</span>

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange(Math.min(max, quantity + 1))}
        disabled={quantity >= max}
      >
        +
      </Button>
    </div>
  );
}
