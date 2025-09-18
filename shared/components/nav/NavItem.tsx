import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavItemData } from "@/shared/types/props";
import { ButtonProps } from "@/shared/components/atoms/Button";
import Submenu from "./Submenu";

/**
 * Props for UnifiedNavItem component.
 *
 * @property {string} href - The navigation link URL.
 * @property {string} label - The label for the navigation item.
 * @property {React.ReactNode} icon - The icon to display.
 * @property {boolean} isActive - Indicates if the nav item is active.
 * @property {any} [submenu] - Optional submenu data.
 * @property {boolean} [showLabel] - Whether to show the label next to the icon.
 * @property {"primary" | "secondary" | "tertiary"} [variant] - Visual style of the nav item.
 * @property {"left" | "center" | "right"} [align] - Alignment of the nav item content.
 */
export type NavItemProps = NavItemData & {
  variant?: "primary" | "secondary" | "tertiary";
  align?: "left" | "center" | "right";
  showLabel?: boolean;
};

/**
 * Exported UnifiedNavItem component.
 *
 * Purpose:
 * - Renders a navigation item with unified styles similar to UnifiedButton.
 * - Supports submenu, active state, and content alignment.
 *
 * Parameters:
 * @param {NavItemProps} props - Navigation item props.
 *
 * Returns:
 * @returns {JSX.Element} The styled navigation item element.
 */
export default function NavItem({
  href,
  label,
  icon,
  isActive,
  submenu,
  showLabel,
  variant = "tertiary",
  align = "center",
}: NavItemProps): JSX.Element {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Alignment classes for nav item content
  const alignments: Record<NonNullable<ButtonProps["align"]>, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Base styles for nav item
  const baseStyles =
    "flex flex-row items-center gap-2 rounded-full cursor-pointer font-medium tracking-widest uppercase transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none p-2";
  // Base styles for submenu trigger
  const baseStylesSubmenu =
    "flex flex-row items-center gap-2 rounded-full cursor-pointer font-medium tracking-widest uppercase focus:outline-none p-2";
  // Variant styles for nav item
  const variants: Record<string, string> = {
    primary: "hover:bg-thistle hover:text-white",
    secondary:
      "bg-white text-thistle border border-thistle hover:bg-thistle/10 active:bg-thistle/20",
    tertiary: "bg-transparent hover:text-thistle active:text-thistle/80",
  };

  /**
   * Effect: Closes the submenu if a click occurs outside the drawer.
   */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // If the click was outside the drawer and not on a link
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !target.closest("a")
      ) {
        setTimeout(() => setOpen(false), 100); // delay to allow navigation
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /**
   * Toggles the submenu open/close state.
   *
   * @returns {void}
   */
  const toggleSubmenu = () => {
    if (submenu) setOpen((prev) => !prev);
  };

  // Renders a simple navigation link if there is no submenu
  if (!submenu) {
    return (
      <div
        className={`${baseStyles} ${variants[variant]} ${alignments[align]} ${
          isActive ? "text-gray-700" : "text-gray-400"
        }`}
      >
        <Link
          href={href || ""}
          aria-label={label}
          className="flex flex-row items-center gap-2 text-sm"
        >
          {icon}
          {showLabel && <span className="font-medium">{label}</span>}
        </Link>
      </div>
    );
  }

  // Renders the button and submenu components if there is a submenu
  return (
    <div
      className={`relative ${baseStylesSubmenu} ${variants[variant]} ${
        alignments[align]
      } ${isActive ? "text-gray-700" : "text-gray-400"}`}
      ref={drawerRef}
    >
      <button
        onClick={toggleSubmenu}
        aria-label={label}
        className={`flex flex-col items-center justify-center text-sm focus:outline-none`}
      >
        {icon}
        {showLabel && (
          <span className="font-medium cursor-pointer">{label}</span>
        )}
      </button>

      {open && (
        <>
          {/* Desktop submenu */}
          <Submenu menu={submenu} onClick={() => setOpen(false)} />
          {/* Mobile submenu */}
          <Submenu
            mobile={true}
            menu={submenu}
            onClick={() => setOpen(false)}
          />
        </>
      )}
    </div>
  );
}

/**
 * Usage Example:
 * <UnifiedNavItem
 *   href="/dashboard"
 *   label="Dashboard"
 *   icon={<DashboardIcon />}
 *   isActive={true}
 *   variant="primary"
 *   align="center"
 *   showLabel
 * />
 */
