import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { NavItemData } from "@/types/props";
import { ButtonLink } from "@/components/Button";
import Submenu, { SubmenuMobile } from "./Submenu";

export default function NavItem({
  href,
  label,
  icon,
  isActive,
  submenu,
}: NavItemData) {
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  // Cierra el submenú si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      // Si el clic fue fuera del drawer y no en un enlace
      if (
        drawerRef.current &&
        !drawerRef.current.contains(target) &&
        !target.closest("a")
      ) {
        setTimeout(() => setOpen(false), 100); // delay para permitir navegación
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSubmenu = () => {
    if (submenu) setOpen((prev) => !prev);
  };

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
