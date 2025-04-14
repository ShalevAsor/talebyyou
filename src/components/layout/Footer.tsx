import Link from "next/link";

export const Footer: React.FC = () => {
  return (
    <footer className="mt-auto py-6 bg-gray-100">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <p className="text-sm text-gray-600">
              © {new Date().getFullYear()} Custom Books Store. All rights
              reserved.
            </p>
          </div>
          <div className="flex gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Contact
            </Link>
            <Link
              href="/terms"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Privacy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
