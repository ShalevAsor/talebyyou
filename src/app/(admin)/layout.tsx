// import { AdminNavbar } from "@/components/admin";
// import { Footer } from "@/components/layout";

// /**
//  * Admin layout
//  */
// export default function AdminLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className="flex flex-col min-h-screen">
//       <AdminNavbar />
//       <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
//       <Footer />
//     </div>
//   );
// }
// src/app/(admin)/layout.tsx
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isUserAdmin } from "@/actions/admin-actions";
import { AdminNavbar } from "@/components/admin";
import { Footer } from "@/components/layout";

/**
 * Admin layout with protection
 */
export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Check authentication and admin status
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const userIsAdmin = await isUserAdmin(userId);

  if (!userIsAdmin) {
    redirect("/");
  }

  return (
    <div className="flex flex-col min-h-screen">
      <AdminNavbar />
      <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
      <Footer />
    </div>
  );
}
