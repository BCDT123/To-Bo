import { NavItemData } from "@/shared/types/props";
import Link from "next/link";
import React from "react";
import { ButtonRoundIcon } from "@/shared/components/atoms/Button";
import { IoMdClose } from "react-icons/io";

/**
 * Props for Submenu and SubmenuMobile
 * @property {NavItemData[]} menu - Array of submenu items.
 * @property {() => void} [onClick] - Optional callback when an item is clicked.
 * @property {boolean} [mobile] - If true, renders mobile styles.
 */
interface NavBarProps {
  menu: NavItemData[];
  onClick?: () => void;
  mobile?: boolean;
}

/**
 * Renders submenu items.
 *
 * @param {NavBarProps} props - Contains the menu array and optional onClick handler.
 * @returns {JSX.Element[]} Array of submenu link elements. block w-full text-sm
 */
function renderMenuItems(
  menu: NavItemData[],
  onClick?: () => void,
  className?: string
) {
  return menu.map((item) => (
    <Link
      key={item.label}
      href={item.href || ""}
      aria-label={item.label}
      className={`${className} text-gray-700 font-medium hover:text-thistle px-4 py-2 rounded  transition-transform duration-300 ease-in-out transform hover:scale-105`}
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
 * Unified Submenu component
 *
 * Purpose:
 * - Renders a submenu for navigation items on desktop or mobile screens.
 * - Handles click events for submenu items and closes the submenu after navigation.
 * - Includes a close button for the submenu on mobile.
 *
 * Parameters:
 * @param {NavBarProps} props - Contains the menu array, optional onClick handler, and mobile flag.
 *
 * Returns:
 * @returns {JSX.Element} The submenu element for desktop or mobile.
 */
export default function Submenu({
  menu,
  onClick,
  mobile = false,
}: NavBarProps) {
  if (mobile) {
    return (
      <div
        className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 text-lg shadow-lg"
        role="menu"
        aria-label="Mobile Submenu"
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
    );
  }

  return (
    <div
      className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full p-2 mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50"
      role="menu"
      aria-label="Submenu"
    >
      {renderMenuItems(menu, onClick, "block w-full text-sm")}
    </div>
  );
}
