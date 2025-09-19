import { NavItemData } from "@/shared/types/props";
import Link from "next/link";
import React from "react";
import { ButtonRoundIcon } from "@/shared/components/atoms/Button";
import { IoMdClose } from "react-icons/io";
import Overlay from "../Overlay";

/**
 * Props for Submenu component.
 * @property {NavItemData[]} menu - Array of submenu items.
 * @property {() => void} [onClick] - Optional callback when an item is clicked.
 */
interface NavBarProps {
  menu: NavItemData[];
  onClick?: () => void;
}

/**
 * Renders submenu items.
 *
 * @param {NavItemData[]} menu - Array of submenu items.
 * @param {() => void} [onClick] - Optional callback when an item is clicked.
 * @param {string} className - Additional CSS classes for styling.
 * @returns {JSX.Element[]} Array of submenu link elements.
 */
function renderMenuItems(
  menu: NavItemData[],
  onClick?: () => void,
  className?: string
) {
  const baseLinkStyles =
    "flex flex-row items-center font-medium hover:text-thistle px-4 py-2 rounded transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none";
  return menu.map((item) => (
    <Link
      key={item.label}
      href={item.href || ""}
      aria-label={item.label}
      tabIndex={0}
      className={`${baseLinkStyles} ${className} text-gray-700`}
      onClick={() => {
        if (item.onClick) item.onClick();
        if (onClick) onClick();
      }}
      role="menuitem"
    >
      {item.icon && <span className="mr-2">{item.icon}</span>}
      {item.label}
    </Link>
  ));
}

/**
 * Exported Submenu component.
 *
 * Purpose:
 * - Renders a submenu for navigation items on desktop or mobile screens.
 * - Handles click events for submenu items and closes the submenu after navigation.
 * - Includes a close button and overlay for mobile.
 *
 * Parameters:
 * @param {NavBarProps} props - Contains the menu array and optional onClick handler.
 *
 * Returns:
 * @returns {JSX.Element} The submenu element for desktop or mobile.
 */
export default function Submenu({ menu, onClick }: NavBarProps) {
  return (
    <>
      {/* Overlay for mobile */}
      <Overlay onClick={onClick} />
      {/* Desktop submenu */}
      <div
        className="hidden md:block absolute right-0 top-10 p-2 mt-2 bg-white shadow-lg rounded-md py-2 z-50"
        role="menu"
        aria-label="Submenu"
      >
        {renderMenuItems(menu, onClick, "text-xs")}
      </div>
      {/* Mobile submenu */}
      <div
        className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 text-lg shadow-lg"
        role="menu"
        aria-label="Mobile Submenu"
        aria-modal="true"
      >
        {renderMenuItems(menu, onClick, "text-lg")}
        <ButtonRoundIcon
          onClick={onClick}
          className="text-gray-700 absolute top-4 right-4"
          aria-label="Close submenu"
        >
          <IoMdClose />
        </ButtonRoundIcon>
      </div>
    </>
  );
}
