import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavItemData } from "@/shared/types/props";
import { ButtonLink } from "@/shared/components/atoms/Button";
import Submenu, { SubmenuMobile } from "./Submenu";

/**
 * NavItem component
 *
 * Purpose:
 * - Renders a navigation item, which can be a simple link or a menu with a submenu.
 * - Handles submenu open/close logic and click outside detection.
 *
 * Parameters:
 * @param {NavItemData} props - The navigation item data including href, label, icon, isActive, and optional submenu.
 * @param {boolean} [showLabel] - Whether to show the label next to the icon.
 *
 * Returns:
 * @returns {JSX.Element} The navigation item element.
 */
export default function NavItem({
  href,
  label,
  icon,
  isActive,
  submenu,
  showLabel,
}: NavItemData) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Closes the submenu if a click occurs outside the drawer
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
   * Toggles the submenu open/close state
   */
  const toggleSubmenu = () => {
    if (submenu) setOpen((prev) => !prev);
  };

  // If there is no submenu, render a simple navigation link
  if (!submenu) {
    return (
      <div
        className={`p-2  hover:bg-thistle/50 rounded-full  ${
          isActive ? "text-gray-700" : "text-gray-400"
        } hover:text-gray-700  active:text-gray-700  `}
      >
        <Link
          href={href || ""}
          aria-label={label}
          className={`flex flex-row items-center justify-center gap-2 text-sm `}
        >
          {icon}
          {showLabel && <span className="font-medium">{label}</span>}
        </Link>
      </div>
    );
  }

  // If there is a submenu, render the button and submenu components
  return (
    <div
      className={`relative p-2 hover:bg-thistle/50 rounded-full ${
        isActive ? "text-gray-700" : "text-gray-400"
      } hover:text-gray-700  active:text-gray-700  `}
      ref={drawerRef}
    >
      <ButtonLink onClick={toggleSubmenu} label={label} isActive={isActive}>
        {icon}
        {showLabel && <span className="font-medium">{label}</span>}
      </ButtonLink>

      {open && (
        <>
          <Submenu menu={submenu} onClick={() => setOpen(false)} />
          <SubmenuMobile menu={submenu} onClick={() => setOpen(false)} />
        </>
      )}
    </div>
  );
}

/**
 * NavItemAside component
 *
 * Purpose:
 * - Renders a navigation item for vertical sidebars, aligned to the left.
 *
 * Parameters:
 * @param {NavItemData} props - The navigation item data including href, label, icon, isActive.
 * @param {boolean} [showLabel] - Whether to show the label next to the icon.
 *
 * Returns:
 * @returns {JSX.Element} The sidebar navigation item element.
 */
export function NavItemAside({
  href,
  label,
  icon,
  isActive,
  showLabel,
}: NavItemData) {
  return (
    <Link
      href={href || ""}
      aria-label={label}
      className={`flex flex-row w-full text-left px-4 py-2 text-md gap-2
     ${
       isActive ? "text-gray-700" : "text-gray-400"
     } hover:text-gray-700  hover:bg-thistle/50 active:text-gray-700`}
    >
      {icon}
      {showLabel && <span className="font-medium text-sm">{label}</span>}
    </Link>
  );
}
