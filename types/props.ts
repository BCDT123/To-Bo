import { ReactNode } from "react";

export interface NavItemData {
  label: string;
  href?: string;
  icon?: ReactNode;
  isActive?: boolean;
  submenu?: NavItemData[];
  onClick?: () => void;
}
