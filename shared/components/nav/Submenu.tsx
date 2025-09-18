import { NavItemData } from "@/shared/types/props";
import Link from "next/link";
import React from "react";
import { ButtonModalClose } from "@/shared/components/atoms/Button";
import { IoMdClose } from "react-icons/io";

/**
 * Props for Submenu and SubmenuMobile
 * @property {NavItemData[]} menu - Array of submenu items.
 * @property {() => void} [onClick] - Optional callback when an item is clicked.
 */
interface NavBarProps {
  menu: NavItemData[];
  onClick?: () => void;
}

/**
 * Submenu component
 *
 * Purpose:
 * - Renders a submenu for navigation items on desktop screens.
 * - Handles click events for submenu items and closes the submenu after navigation.
 *
 * Parameters:
 * @param {NavBarProps} props - Contains the menu array and optional onClick handler.
 *
 * Returns:
 * @returns {JSX.Element} The submenu element for desktop.
 */
export default function Submenu({ menu, onClick }: NavBarProps) {
  return (
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
      {menu.map((item) => (
        <Link
          key={item.label}
          href={item.href || ""}
          aria-label={item.label}
          className="block w-full text-left px-4 py-2 font-medium text-sm text-gray-700 hover:bg-thistle/50 hover:text-gray-900"
          onClick={() => {
            // Brief delay to allow the browser to process the link navigation
            if (item.onClick) {
              item.onClick();
            }
            setTimeout(() => {
              if (onClick) onClick();
            }, 100);
          }}
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}

/**
 * SubmenuMobile component
 *
 * Purpose:
 * - Renders a submenu for navigation items on mobile screens.
 * - Handles click events for submenu items and closes the submenu after navigation.
 * - Includes a close button for the submenu.
 *
 * Parameters:
 * @param {NavBarProps} props - Contains the menu array and optional onClick handler.
 *
 * Returns:
 * @returns {JSX.Element} The submenu element for mobile.
 */
export function SubmenuMobile({ menu, onClick }: NavBarProps) {
  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 text-lg shadow-lg">
      {menu.map((item) => (
        <Link
          key={item.label}
          href={item.href || ""}
          aria-label={item.label}
          className="text-gray-700 font-medium hover:text-thistle"
          onClick={() => {
            if (item.onClick) {
              item.onClick();
            }
            setTimeout(() => {
              if (onClick) onClick();
            }, 100);
          }}
        >
          {/* {icon} */}
          {item.label}
        </Link>
      ))}
      <ButtonModalClose onClick={onClick}>
        <IoMdClose />
      </ButtonModalClose>
    </div>
  );
}
