import Link from "next/link";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export const Navbar: React.FC = () => {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md">
      <div className="flex items-center gap-4">
        <Link href="/" className="text-xl font-bold">
          Custom Books Store
        </Link>
      </div>

      <div className="flex items-center gap-4">
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    </nav>
  );
};
