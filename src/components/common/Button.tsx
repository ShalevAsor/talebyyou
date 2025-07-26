// components/ui/Button.tsx
import { VariantProps, cva } from "class-variance-authority";
import Link from "next/link";
import React from "react";

import { cn } from "@/lib/utils";

// Define button variants using class-variance-authority
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "bg-indigo-600 text-white hover:bg-indigo-700 focus-visible:ring-indigo-500",
        secondary:
          "bg-white border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus-visible:ring-indigo-500",
        outline:
          "bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-500",
        ghost:
          "bg-transparent hover:bg-gray-100 text-gray-700 focus-visible:ring-gray-500",
        danger:
          "bg-red-600 text-white hover:bg-red-700 focus-visible:ring-red-500",
        success:
          "bg-green-600 text-white hover:bg-green-700 focus-visible:ring-green-500",
      },
      size: {
        sm: "h-8 px-3 py-1",
        md: "h-10 px-4 py-2",
        lg: "h-12 px-6 py-3",
      },
      fullWidth: {
        true: "w-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      fullWidth: false,
    },
  }
);

// Type for button props, combining HTML button attributes with our variants
export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  href?: string;
  asLink?: boolean;
  className?: string;
}

// The Button component
const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, fullWidth, asLink, href, children, ...props },
    ref
  ) => {
    // If it's a link (Next.js Link)
    if (href && asLink) {
      return (
        <Link
          href={href}
          className={cn(
            buttonVariants({
              variant,
              size,
              fullWidth,
              className,
            })
          )}
        >
          {children}
        </Link>
      );
    }

    // Regular button
    return (
      <button
        className={cn(
          buttonVariants({
            variant,
            size,
            fullWidth,
            className,
          })
        )}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export { Button, buttonVariants };
