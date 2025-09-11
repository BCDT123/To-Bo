import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavItemData } from "@/types/props";
import { ButtonLink } from "@/components/Button";
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
      <Link
        href={href || ""}
        aria-label={label}
        className={`flex flex-col items-center justify-center text-sm ${
          isActive ? "text-gray-700" : "text-gray-400"
        } hover:text-gray-700 active:text-gray-700`}
      >
        {icon}
      </Link>
    );
  }

  // If there is a submenu, render the button and submenu components
  return (
    <div className="relative" ref={drawerRef}>
      <ButtonLink onClick={toggleSubmenu} label={label} isActive={isActive}>
        {icon}
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
