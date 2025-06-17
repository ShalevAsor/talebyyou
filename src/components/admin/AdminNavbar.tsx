// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";

// export const AdminNavbar = () => {
//   const pathname = usePathname();

//   const navItems = [
//     { name: "Dashboard", href: "/admin" },
//     { name: "Pricing", href: "/admin/pricing" },
//     { name: "Templates", href: "/admin/templates" },
//     { name: "Orders", href: "/admin/orders" },
//     { name: "Seed", href: "/admin/seed" },
//     { name: "PrintJobs", href: "/admin/print-jobs" },
//     { name: "Webhooks", href: "/admin/webhooks" },
//     { name: "Books", href: "/admin/books" },
//   ];

//   return (
//     <nav className="bg-indigo-800 text-white shadow-md">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between h-16">
//           <div className="flex-shrink-0 flex items-center">
//             <Link href="/admin" className="font-bold text-xl">
//               TaleByYou Admin
//             </Link>
//           </div>
//           <div className="flex">
//             <div className="ml-10 flex items-center space-x-4">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.name}
//                   href={item.href}
//                   className={`px-3 py-2 rounded-md text-sm font-medium ${
//                     pathname === item.href
//                       ? "bg-indigo-900 text-white"
//                       : "text-indigo-100 hover:bg-indigo-700"
//                   }`}
//                 >
//                   {item.name}
//                 </Link>
//               ))}
//             </div>
//           </div>
//           <div className="flex items-center">
//             <Link
//               href="/"
//               className="px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700"
//             >
//               View Store
//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export const AdminNavbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Pricing", href: "/admin/pricing" },
    { name: "Templates", href: "/admin/templates" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Seed", href: "/admin/seed" },
    { name: "PrintJobs", href: "/admin/print-jobs" },
    { name: "Webhooks", href: "/admin/webhooks" },
    { name: "Books", href: "/admin/books" },
  ];

  return (
    <nav className="bg-indigo-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/admin" className="font-bold text-xl">
              TaleByYou Admin
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <div className="hidden lg:flex">
            <div className="flex items-center space-x-4">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium ${
                    pathname === item.href
                      ? "bg-indigo-900 text-white"
                      : "text-indigo-100 hover:bg-indigo-700"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Right side - View Store + Mobile Menu Button */}
          <div className="flex items-center space-x-4">
            {/* View Store Link */}
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700"
            >
              View Store
            </Link>

            {/* Mobile Menu Button - Only visible on mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-indigo-100 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                aria-label="Toggle menu"
              >
                {/* Hamburger Icon */}
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "hidden" : "block"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
                {/* Close Icon */}
                <svg
                  className={`h-6 w-6 ${isMobileMenuOpen ? "block" : "hidden"}`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Menu - Dropdown */}
        <div className={`lg:hidden ${isMobileMenuOpen ? "block" : "hidden"}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 border-t border-indigo-700">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  pathname === item.href
                    ? "bg-indigo-900 text-white"
                    : "text-indigo-100 hover:bg-indigo-700"
                }`}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu when link is clicked
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
