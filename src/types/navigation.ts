/**
 * Type definitions related to navigation
 */
export interface NavigationItem {
  href: string;
  label: string;
  description?: string;
}

export interface NavLinksProps {
  isMobile?: boolean;
  className?: string;
}

export interface AuthSectionProps {
  isMobile?: boolean;
  className?: string;
}
