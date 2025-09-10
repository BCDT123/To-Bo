import React from "react";
import NavItem from "./NavItem";
import Image from "next/image";
// Icons
import { AiFillHome } from "react-icons/ai";
import { BiNews } from "react-icons/bi";
import { RiAddBoxLine } from "react-icons/ri";
import { FiUser } from "react-icons/fi";
import { FaRegBell } from "react-icons/fa";
import letterImg from "@/public/favicon/letter.png";

import { NavItemData } from "@/types/props";
import { logout } from "@/features/login/auth";
import { useTranslations } from "next-intl";

interface NavBarProps {
  pathname: string;
}

export default function NavigationBar({ pathname }: NavBarProps) {
  const tNavbar = useTranslations("navbar");
  //generando data de menu
  const navItems: NavItemData[] = [
    {
      label: tNavbar("home"),
      href: "/",
      isActive: /^\/[a-z]{2}$/.test(pathname),
      icon: <AiFillHome className="h-5 w-5" />,
    },
    {
      href: "/feed",
      label: tNavbar("feed"),
      icon: <BiNews className="h-5 w-5" />,
      isActive: pathname.endsWith("/feed"),
    },
    {
      href: "/add",
      label: tNavbar("add"),
      icon: <RiAddBoxLine className="h-5 w-5" />,
      isActive: pathname.endsWith("/add"),
    },
    {
      href: "/alert",
      label: tNavbar("alert"),
      icon: <FaRegBell className="h-5 w-5" />,
      isActive: pathname.endsWith("/alert"),
    },
    {
      label: tNavbar("user"),
      href: "/user",
      icon: <FiUser className="h-5 w-5" />,
      submenu: [
        { label: tNavbar("profile"), href: "/user/profile" },
        { label: tNavbar("settings"), href: "/user/settings" },
        { label: tNavbar("logout"), onClick: logout },
      ],
    },
  ];

  return (
    <nav
      role="navigation"
      className="fixed w-full bg-white shadow-sm z-50 flex items-center justify-between px-4 py-2
                 bottom-0 h-12
                 md:top-0 md:bottom-auto md:h-16"
    >
      {/* Logo visible solo en pantallas md+ */}
      <div className="hidden md:block">
        <Image
          alt="Logo"
          priority={false}
          src={letterImg}
          width={300}
          className="h-8 w-auto"
        />
      </div>

      {/* Íconos de navegación */}
      <div className="flex justify-around w-full md:w-auto md:gap-6">
        {navItems.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>
    </nav>
  );
}
