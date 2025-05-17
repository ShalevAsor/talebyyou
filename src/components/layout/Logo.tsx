// components/layout/Logo.tsx
import Link from "next/link";
import { FiBookOpen } from "react-icons/fi";

export const Logo: React.FC = () => {
  return (
    <Link href="/" className="flex items-center space-x-2">
      <FiBookOpen className="h-6 w-6 text-purple-600" />
      <span className="text-xl font-bold text-gray-800">Custom Books</span>
    </Link>
  );
};
