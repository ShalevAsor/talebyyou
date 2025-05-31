"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { memo } from "react";
import { navigationItems, adminNavigationItem } from "@/data/navData";
import { NavLinksProps } from "@/types/navigation";
import { useAdmin } from "@/hooks/useAdmin";

/**
 * Renders navigation links that adapt to mobile/desktop layouts
 * Handles user role-based conditional rendering
 */
export const NavLinks: React.FC<NavLinksProps> = memo(
  ({ isMobile = false, className }) => {
    const pathname = usePathname();
    const { data: isAdmin = false } = useAdmin();

    // Determine navigation links based on admin status
    const navLinks = isAdmin
      ? [...navigationItems, adminNavigationItem]
      : navigationItems;

    return (
      <nav
        className={cn(
          "flex",
          isMobile ? "flex-col space-y-4" : "space-x-6",
          className
        )}
        aria-label="Main Navigation"
      >
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              "font-medium transition-colors",
              isMobile ? "text-base" : "text-sm",
              pathname === link.href
                ? "text-purple-600 font-semibold"
                : "text-gray-600 hover:text-purple-500"
            )}
            aria-current={pathname === link.href ? "page" : undefined}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href={
            "https://shalev-book-store-bucket.s3.us-east-1.amazonaws.com/ebooks/2025-05-30/Space_Adventure_8596fcf4-39eb-4ed0-915a-b8484fda9da0.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAUYLSMZFOAJTEI77P%2F20250531%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20250531T144748Z&X-Amz-Expires=86400&X-Amz-Signature=d53b88b122224ffe7ae0c17f9fc6b3afd26597627c0db9aa84b966d4d419141d&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject"
          }
        >
          Ebook Example
        </Link>
      </nav>
    );
  }
);

NavLinks.displayName = "NavLinks";
