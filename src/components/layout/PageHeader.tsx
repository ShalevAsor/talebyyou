// src/components/layout/PageHeader.tsx
import Link from "next/link";
import React from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface ActionButton {
  label: string;
  href?: string;
  onClick?: () => void;
  variant?:
    | "default"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | "destructive";
  size?: "default" | "sm" | "lg";
  icon?: React.ReactNode;
  ariaLabel?: string; // Added for better accessibility
}

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ActionButton[];
  className?: string;
  badge?: string;
  id?: string; // Added for custom ID targeting
}

/**
 * Reusable page header component with title, description, actions, and optional badge
 */
const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  actions,
  className,
  badge,
  id = "page-title", // Default ID for the heading
}) => {
  return (
    <header className={cn("mb-6", className)} aria-labelledby={id}>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            {/* Decorative element - hidden from screen readers */}
            <div
              className="h-10 w-1.5 bg-primary rounded-full hidden md:block"
              aria-hidden="true"
            />

            <div>
              <div className="flex items-center gap-3">
                <h1
                  id={id}
                  className="text-2xl md:text-3xl font-bold tracking-tight"
                >
                  {title}
                </h1>
                {badge && (
                  <Badge
                    variant="outline"
                    className="text-xs font-medium"
                    aria-label={`${badge}`}
                  >
                    {badge}
                  </Badge>
                )}
              </div>

              {description && (
                <p className="text-muted-foreground mt-1 md:mt-2 max-w-3xl">
                  {description}
                </p>
              )}
            </div>
          </div>
        </div>

        {actions && actions.length > 0 && (
          <div
            className="flex flex-wrap items-center gap-3"
            role="toolbar"
            aria-label="Page actions"
          >
            {actions.map((action, index) =>
              action.href ? (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  size={action.size || "default"}
                  asChild
                >
                  <Link
                    href={action.href}
                    aria-label={action.ariaLabel || action.label}
                  >
                    {action.icon && (
                      <span className="mr-2" aria-hidden="true">
                        {action.icon}
                      </span>
                    )}
                    {action.label}
                  </Link>
                </Button>
              ) : (
                <Button
                  key={index}
                  variant={action.variant || "default"}
                  size={action.size || "default"}
                  onClick={action.onClick}
                  aria-label={action.ariaLabel || action.label}
                >
                  {action.icon && (
                    <span className="mr-2" aria-hidden="true">
                      {action.icon}
                    </span>
                  )}
                  {action.label}
                </Button>
              )
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default PageHeader;
