"use client";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import { memo, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AuthSectionProps } from "@/types/navigation";

/**
 * Authentication section that adapts to mobile/desktop layouts
 * Shows sign in/up buttons for unauthenticated users and user menu for authenticated users
 */
export const AuthSection: React.FC<AuthSectionProps> = memo(
  ({ isMobile = false, className }) => {
    // Added for hydration mismatch prevention
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
      setIsClient(true);
    }, []);

    return (
      <div
        className={cn(
          "flex items-center",
          isMobile ? "flex-col space-y-2" : "flex-row space-x-2",
          className
        )}
        aria-label="Authentication"
      >
        {isClient ? (
          <>
            <SignedOut>
              <SignInButton>
                <Button
                  variant="outline"
                  size={isMobile ? "default" : "sm"}
                  className={isMobile ? "w-full" : "w-auto"}
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button
                  variant="default"
                  size={isMobile ? "default" : "sm"}
                  className={isMobile ? "w-full" : "w-auto"}
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    userButtonAvatarBox: isMobile ? "h-10 w-10" : "h-8 w-8",
                  },
                }}
              />
            </SignedIn>
          </>
        ) : (
          // Placeholder with same structure during server-side rendering
          <div className={isMobile ? "h-10" : "h-8 w-8"} />
        )}
      </div>
    );
  }
);

AuthSection.displayName = "AuthSection";
