"use client";

import { useState, useCallback, memo } from "react";
import { Logo } from "./Logo";
import { NavLinks } from "./NavLinks";
import { AuthSection } from "./AuthSection";
import { MobileNavbar } from "./MobileNavbar";
import { generateStructuredData } from "@/config/site";

/**
 * Main navigation bar component
 * Responsive design with desktop and mobile layouts
 */
export const Navbar: React.FC = memo(() => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetMobileMenu = useCallback((open: boolean) => {
    setMobileMenuOpen(open);
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
    <header
      className="w-full border-b bg-white sticky top-0 z-50"
      role="banner"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationSchema),
        }}
      />
      <div className=" px-4 mx-auto">
        <div className="flex h-16 items-center justify-between">
          {/* Left: Logo */}
          <Logo />

          {/* Center: Navigation Links (desktop only) */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2">
            <NavLinks />
          </div>

          {/* Right: Auth Section (desktop only) */}
          <div className="hidden md:block">
            <AuthSection />
          </div>

          {/* Mobile Menu */}
          <MobileNavbar open={mobileMenuOpen} setOpen={handleSetMobileMenu} />
        </div>
      </div>
    </header>
  );
});

Navbar.displayName = "Navbar";
