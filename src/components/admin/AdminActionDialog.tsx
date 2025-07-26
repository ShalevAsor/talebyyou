"use client";

import { Loader2 } from "lucide-react";
import { ReactNode } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface AdminActionDialogProps {
  title: string;
  description: string;
  actionLabel: string;
  triggerLabel: string;
  triggerIcon?: ReactNode;
  isLoading?: boolean;
  onAction: () => Promise<void> | void;
  variant?: "default" | "destructive" | "outline"; // Added outline variant
  actionVariant?: "default" | "destructive";
  size?: "default" | "sm" | "lg" | "icon";
  disabled?: boolean; // Added disabled prop
}

export default function AdminActionDialog({
  title,
  description,
  actionLabel,
  triggerLabel,
  triggerIcon,
  isLoading = false,
  onAction,
  variant = "default",
  actionVariant = "default",
  size,
  disabled = false, // Added disabled with default false
}: AdminActionDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant={variant}
          disabled={isLoading || disabled} // Include disabled prop
          size={size}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              {triggerIcon}
              {triggerLabel &&
                (triggerIcon ? (
                  <span className="ml-2">{triggerLabel}</span>
                ) : (
                  triggerLabel
                ))}
            </>
          )}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onAction}
            className={
              actionVariant === "destructive"
                ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
                : ""
            }
          >
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
