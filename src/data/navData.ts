/**
 * Navigation data for the application
 * Centralizing navigation links to make them easier to maintain
 */
export const navigationItems = [
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
    href: "/contact",
    label: "Contact",
    description: "Contact Us",
  },
  {
    href: "/tutorials",
    label: "Tutorials",
    description: "Get help creating your book",
  },
];

export const adminNavigationItem = {
  href: "/admin",
  label: "Admin",
  description: "Access admin controls",
};
