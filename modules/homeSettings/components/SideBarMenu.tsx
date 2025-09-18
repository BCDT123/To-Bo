"use client";
import React from "react";
import { FaUserCog, FaHome, FaHouseUser } from "react-icons/fa";
import { BsFillHouseGearFill } from "react-icons/bs";
import { usePathname } from "next/navigation";
import { NavItemAside } from "@/shared/components/nav/NavItem";
import { useTranslations } from "use-intl";
import NavItem from "@/shared/components/nav/NavItem";
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
  const t = useTranslations("sidebar");
  const navItems = [
    {
      label: t("myHouses"),
      href: "/user/settings",
      icon: <FaHouseUser size={20} />,
      isActive: pathname.endsWith("/user/settings"),
    },
    {
      label: t("configBaby"),
      href: "/user/settings/baby",
      icon: <FaUserCog size={20} />,
      isActive: pathname.endsWith("/user/settings/baby"),
    },
    {
      label: t("configHouse"),
      href: "/user/settings/house",
      icon: <BsFillHouseGearFill size={20} />,
      isActive: pathname.endsWith("/user/settings/house"),
    },
  ];

  return (
    <aside
      aria-label="Settings sidebar"
      className="fixed left-0 top-0 md:top-16 h-screen w-50 bg-white shadow-lg flex flex-col items-center py-8 z-30"
    >
      <nav role="navigation" className="flex flex-col w-full">
        {navItems.map((item) => {
          // return <NavItemAside key={item.href} {...item} showLabel />;

          return (
            <NavItem
              key={item.href}
              variant="tertiary"
              align="left"
              {...item}
              showLabel
            />
          );
        })}
      </nav>
    </aside>
  );
}
