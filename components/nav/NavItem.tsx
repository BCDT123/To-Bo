import React from "react";
import { ReactNode } from "react";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label?: string;
  icon?: ReactNode;
  isActive?: boolean;
}

export default function NavItem({ href, label, icon, isActive }: NavItemProps) {
  console.log(isActive);
  return (
    <Link
      href={href}
      aria-label={label}
      className={`
       ${isActive ? "hover:text-gray-700" : " text-gray-400 "}
      flex flex-col items-center justify-center text-sm hover:text-gray-700 active:text-gray-700`}
    >
      {icon}
      {/* {label && <span className="mt-1">{label}</span>} */}
    </Link>
  );
}
