"use client";

import { useCallback } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { NavLinks } from "./NavLinks";
import { AuthSection } from "./AuthSection";

interface MobileNavbarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

/**
 * Mobile navigation menu with slide-out sheet
 * Contains navigation links and authentication controls
 */
export const MobileNavbar: React.FC<MobileNavbarProps> = ({
  open,
  setOpen,
}) => {
  const handleOpenChange = useCallback(
    (newOpen: boolean) => {
      setOpen(newOpen);
    },
    [setOpen]
  );

  // Handle escape key for better a11y
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
      }
    },
    [setOpen]
  );

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          aria-label="Open main menu"
        >
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="right"
        className="w-[80%] sm:w-[350px] p-2"
        onKeyDown={handleKeyDown}
      >
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Explore our custom book store</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col space-y-8 mt-6">
          <NavLinks isMobile />
          <div className="border-t pt-4">
            <AuthSection isMobile />
          </div>
          <SheetClose asChild>
            <Button variant="outline" className="mt-4">
              Close Menu
            </Button>
          </SheetClose>
        </div>
      </SheetContent>
    </Sheet>
  );
};
