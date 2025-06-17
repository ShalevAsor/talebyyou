import { NavigationItem } from "@/types/navigation";

/**
 * Navigation data for the application
 * Centralizing navigation links to make them easier to maintain
 */
export const navigationItems: NavigationItem[] = [
  { href: "/", label: "Home", description: "Return to the homepage" },
  {
    href: "/library",
    label: "Library",
    description: "Browse our book templates",
  },
  {
    href: "/my-books",
    label: "My Books",
    description: "View your created books",
  },
  {
    href: "/resources",
    label: "Resources",
    description: "Helpful information and guides",
    isDropdown: true,
    dropdownItems: [
      {
        href: "/tutorials",
        label: "Tutorials",
        description: "Get help creating your book",
      },
      {
        href: "/blog",
        label: "Blog",
        description: "Tips, ideas & inspiration for personalized books",
      },
      {
        href: "/about",
        label: "About Us",
        description: "Check our story",
      },
      {
        href: "/#faq",
        label: "FAQ",
        description: "Frequently asked questions",
      },
    ],
  },
  {
    href: "/contact",
    label: "Contact",
    description: "Contact Us",
  },
];

export const adminNavigationItem: NavigationItem = {
  href: "/admin",
  label: "Admin",
  description: "Access admin controls",
};
