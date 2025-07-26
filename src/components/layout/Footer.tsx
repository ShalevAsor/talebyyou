import Link from "next/link";

import { siteConfig } from "@/config/site";

// Define footer links for better organization
const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="mt-auto py-6 bg-gray-100"
      role="contentinfo"
      aria-label="Site footer"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {currentYear} {siteConfig.name}. All rights reserved.
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <ul className="flex gap-6">
              {footerLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Option: Add additional content like social links or newsletter signup */}
      </div>
    </footer>
  );
};
