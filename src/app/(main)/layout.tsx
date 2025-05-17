import { Navbar, Footer } from "@/components/layout";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-4">{children}</main>
      <Footer />
    </div>
  );
}
