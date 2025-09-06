import { NavItemData } from "@/types/props";
import Link from "next/link";
import React from "react";

interface NavBarProps {
  menu: NavItemData[];
  onClick?: () => void;
}

export default function Submenu({ menu, onClick }: NavBarProps) {
  return (
    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 top-full mt-2 bg-white shadow-lg rounded-md py-2 w-48 z-50">
      {menu.map((item) => (
        <Link
          key={item.label}
          href={item.href || ""}
          aria-label={item.label}
          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
          onClick={() => {
            // Espera breve para permitir que el navegador procese el enlace
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

export function SubmenuMobile({ menu, onClick }: NavBarProps) {
  return (
    <div className="md:hidden fixed inset-0 bg-white z-50 flex flex-col items-center justify-center space-y-6 text-lg shadow-lg">
      {menu.map((item) => (
        <Link
          key={item.label}
          href={item.href || ""}
          aria-label={item.label}
          className="text-gray-700 hover:text-blue-600"
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
      <button
        onClick={onClick}
        className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
      >
        ✕
      </button>
    </div>
  );
}
