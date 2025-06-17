// types/navigation.ts

export interface DropdownItem {
  href: string;
  label: string;
  description: string;
}

export interface NavigationItem {
  href: string;
  label: string;
  description: string;
  isDropdown?: boolean;
  dropdownItems?: DropdownItem[];
}

export interface NavLinksProps {
  isMobile?: boolean;
  className?: string;
  onMobileMenuClose?: () => void;
}

export interface AuthSectionProps {
  isMobile?: boolean;
  className?: string;
}
