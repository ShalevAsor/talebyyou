"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { memo, useState } from "react";
import { navigationItems, adminNavigationItem } from "@/data/navData";
import {
  NavLinksProps,
  NavigationItem,
  DropdownItem,
} from "@/types/navigation";
import { useAdmin } from "@/hooks/useAdmin";

/**
 * Renders navigation links with modern styling and Resources dropdown
 * Handles user role-based conditional rendering
 */
export const NavLinks: React.FC<NavLinksProps> = memo(
  ({ isMobile = false, className, onMobileMenuClose }) => {
    const pathname = usePathname();
    const { data: isAdmin = false } = useAdmin();
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Determine navigation links based on admin status
    const navLinks = isAdmin
      ? [...navigationItems, adminNavigationItem]
      : navigationItems;

    // Get dropdown items for a link
    const getDropdownItems = (link: NavigationItem): DropdownItem[] => {
      return link.dropdownItems || [];
    };

    // Handle dropdown item click (close dropdown and mobile menu)
    const handleDropdownItemClick = () => {
      setDropdownOpen(false);
      if (isMobile && onMobileMenuClose) {
        onMobileMenuClose();
      }
    };

    // Handle regular link click (close mobile menu)
    const handleLinkClick = () => {
      if (isMobile && onMobileMenuClose) {
        onMobileMenuClose();
      }
    };

    if (isMobile) {
      return (
        <nav
          className={cn("flex flex-col space-y-2", className)}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <div key={link.href}>
              {link.isDropdown ? (
                // Mobile dropdown section with sub-items
                <div className="space-y-1">
                  <div className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors">
                    {link.label}
                  </div>
                  <div className="pl-4 space-y-1">
                    {getDropdownItems(link).map((item: DropdownItem) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleDropdownItemClick}
                        className="block text-gray-600 hover:text-indigo-600 hover:bg-gray-50 px-3 py-1 rounded text-sm transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <Link
                  href={link.href}
                  onClick={handleLinkClick}
                  className={cn(
                    "block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 px-3 py-2 rounded-lg text-base font-medium transition-colors",
                    pathname === link.href && "text-indigo-600 bg-indigo-50"
                  )}
                >
                  {link.label}
                </Link>
              )}
            </div>
          ))}
        </nav>
      );
    }

    return (
      <nav
        className={cn("flex items-center space-x-8", className)}
        aria-label="Main Navigation"
      >
        {navLinks.map((link) => (
          <div key={link.href}>
            {link.isDropdown ? (
              // Desktop dropdown
              <div
                className="relative group"
                onMouseEnter={() => setDropdownOpen(true)}
                onMouseLeave={() => setDropdownOpen(false)}
              >
                <button className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors flex items-center space-x-1">
                  <span>{link.label}</span>
                  <svg
                    className="w-4 h-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {/* Dropdown Menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg transition-all duration-200",
                    dropdownOpen ? "opacity-100 visible" : "opacity-0 invisible"
                  )}
                >
                  <div className="py-2">
                    {getDropdownItems(link).map((item: DropdownItem) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={handleDropdownItemClick}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-colors"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Regular navigation links
              <Link
                href={link.href}
                className={cn(
                  "text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors relative group",
                  pathname === link.href && "text-indigo-600"
                )}
                aria-current={pathname === link.href ? "page" : undefined}
              >
                {link.label}
                {/* Animated underline */}
                <span
                  className={cn(
                    "absolute bottom-0 left-0 h-0.5 bg-indigo-600 transition-all duration-300",
                    pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                  )}
                />
              </Link>
            )}
          </div>
        ))}
      </nav>
    );
  }
);

NavLinks.displayName = "NavLinks";
