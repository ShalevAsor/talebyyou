"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const AdminNavbar = () => {
  const pathname = usePathname();

  const navItems = [
    { name: "Dashboard", href: "/admin" },
    { name: "Pricing", href: "/admin/pricing" },
    { name: "Templates", href: "/admin/templates" },
    { name: "Orders", href: "/admin/orders" },
    { name: "Seed", href: "/admin/seed" },
    { name: "PrintJobs", href: "/admin/print-jobs" },
    { name: "Webhooks", href: "/admin/webhooks" },
  ];

  return (
    <nav className="bg-indigo-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/admin" className="font-bold text-xl">
              TaleByYou Admin
            </Link>
          </div>
          <div className="flex">
            <div className="ml-10 flex items-center space-x-4">
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
          <div className="flex items-center">
            <Link
              href="/"
              className="px-3 py-2 rounded-md text-sm font-medium text-indigo-100 hover:bg-indigo-700"
            >
              View Store
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};
