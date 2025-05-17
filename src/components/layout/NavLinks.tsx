"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { memo, useState, useEffect } from "react";
import { navigationItems, adminNavigationItem } from "@/data/navData";
import { NavLinksProps } from "@/types/navigation";

/**
 * Renders navigation links that adapt to mobile/desktop layouts
 * Handles user role-based conditional rendering
 */
export const NavLinks: React.FC<NavLinksProps> = memo(
  ({ isMobile = false, className }) => {
    const pathname = usePathname();
    const { user, isLoaded } = useUser();

    // State to hold the links after client-side hydration
    const [navLinks, setNavLinks] = useState(navigationItems);

    // Only update links after hydration is complete
    useEffect(() => {
      if (isLoaded) {
        const isAdmin = user?.publicMetadata.role === "store_admin";
        setNavLinks(
          isAdmin ? [...navigationItems, adminNavigationItem] : navigationItems
        );
      }
    }, [isLoaded, user]);

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
      </nav>
    );
  }
);

NavLinks.displayName = "NavLinks";
