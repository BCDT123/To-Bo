"use client";
import React from "react";
import { FaUserCog, FaHome, FaHouseUser } from "react-icons/fa";
import { usePathname } from "next/navigation";
import { NavItemAside } from "@/shared/components/nav/NavItem";
/**
 * SettingsSidebar component
 *
 * Purpose:
 * - Renders a vertical sidebar navigation for settings pages.
 * - Menu: Config Child, Config House, My House.
 *
 * Returns:
 * @returns {JSX.Element} The sidebar navigation element.
 */
export default function SideBarMenu() {
  const pathname = usePathname();

  const navItems = [
    {
      label: "My Houses",
      href: "/user/settings",
      icon: <FaHouseUser size={20} />,
      isActive: pathname.endsWith("/user/settings"),
    },
    {
      label: "Config Baby",
      href: "/user/settings/baby",
      icon: <FaUserCog size={20} />,
      isActive: pathname.endsWith("/user/settings/baby"),
    },
    {
      label: "Config House",
      href: "/settings/config-house",
      icon: <FaHome size={20} />,
      isActive: pathname.endsWith("/config-house"),
    },
  ];

  return (
    <aside className="fixed left-0 top-0 md:top-16 h-screen w-56 bg-white shadow-lg flex flex-col items-center py-8 z-40">
      <nav className="flex flex-col w-full">
        {navItems.map((item) => (
          <NavItemAside key={item.href} {...item} showLabel={true} />
        ))}
      </nav>
    </aside>
  );
}
