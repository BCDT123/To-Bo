import React, { useState } from "react";
import MenuModalIcon from "@/shared/components/MenuModalIcon";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { Baby } from "../types/babyModel";
import image from "@/public/images/default-profile.png";
import BabyGetAge from "@/modules/homeSettings/components/BabyGetAge";
import { useTranslations } from "next-intl";

export type BabyCardProps = {
  baby: Baby;
  onDelete: (baby: Baby) => void;
  onEdit?: (baby: Baby) => void;
  menuOpen: string | null;
  setMenuOpen: (key: string | null) => void;
};

export default function BabyCard({
  baby,
  onDelete,
  onEdit,
  menuOpen,
  setMenuOpen,
}: BabyCardProps) {
  const t = useTranslations("common");
  const tBaby = useTranslations("baby");
  const key = baby.id || baby.name;

  const handleDelete = () => {
    onDelete(baby);
    setMenuOpen(null);
  };

  const handleEdit = () => {
    if (onEdit) onEdit(baby);
    setMenuOpen(null);
  };

  return (
    <div
      key={key}
      className="relative flex flex-col p-4 shadow-sm shadow-thistle "
    >
      {/* Menu icon */}
      <div className="absolute top-2 right-0">
        <MenuModalIcon
          open={menuOpen === key}
          onOpen={() => setMenuOpen(key)}
          onClose={() => setMenuOpen(null)}
          icon={<MdMoreVert size={22} />}
        >
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left hover:text-gray-700  active:text-gray-700"
            onClick={handleEdit}
          >
            <MdEdit size={18} /> {t("edit")}
          </button>
          <button
            className="flex items-center gap-2 w-full px-4 py-2 text-sm hover:bg-gray-100 text-left hover:text-gray-700  active:text-gray-700"
            onClick={handleDelete}
          >
            <MdDelete size={18} /> {t("delete")}
          </button>
        </MenuModalIcon>
      </div>
      {/* Card content */}
      <div className="flex flex-row gap-2 pr-7">
        {/* Photo */}
        <div
          className="min-w-15 min-h-15 flex items-center justify-center"
          style={{ backgroundColor: String(baby.color) }}
        >
          <img
            src={baby.photoUrl ? baby.photoUrl : image.src}
            alt={baby.name}
            className="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div className="min-w-0 truncate flex-1 gap-2">
          {/* Name */}
          {baby.name && (
            <div className="flex items-center gap-2">
              <p className="min-w-0 truncate text-lg">{baby.name}</p>
            </div>
          )}
          {/* Birthday and Age */}
          {baby.birthDate && (
            <div className="flex items-center gap-2">
              <BabyGetAge birthDate={baby.birthDate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
