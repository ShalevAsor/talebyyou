"use client";

import { Menu, X } from "lucide-react";
import { memo, useCallback, useState } from "react";

import { Button } from "@/components/ui/button";
import { generateStructuredData } from "@/config/site";

import { AuthSection } from "./AuthSection";
import { NavLinks } from "./NavLinks";
import { NavLogo } from "./NavLogo";

/**
 * Main navigation bar component
 * Modern responsive design with gradient logo and smooth animations
 */
export const Navbar: React.FC = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetMobileMenu = useCallback((open: boolean) => {
    setMobileMenuOpen(open);
  }, []);

  // Function to close mobile menu - passed to NavLinks
  const closeMobileMenu = useCallback(() => {
    setMobileMenuOpen(false);
  }, []);

  // Create structured data for the site navigation
  const navigationSchema = generateStructuredData("WebSite", {
    "@type": "WebSite",
    hasPart: {
      "@type": "WebPage",
      isPartOf: {
        "@id": "#website",
      },
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: "/",
          },
        ],
      },
    },
  });

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationSchema),
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <NavLogo />

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Desktop Auth Section */}
          <div className="hidden lg:flex items-center space-x-4">
            <AuthSection />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => handleSetMobileMenu(!mobileMenuOpen)}
              className="text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              aria-label="Toggle menu"
            >
              {!mobileMenuOpen ? (
                <Menu className="h-6 w-6" />
              ) : (
                <X className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {/* Navigation Links - Pass closeMobileMenu function */}
            <div className="space-y-2">
              <NavLinks isMobile onMobileMenuClose={closeMobileMenu} />
            </div>

            {/* Mobile Auth Section */}
            <div className="pt-4 border-t border-gray-200">
              <AuthSection isMobile />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
});

Navbar.displayName = "Navbar";
