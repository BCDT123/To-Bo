import React from "react";
import MenuModalIcon from "@/shared/components/MenuModalIcon";
import { MdDelete, MdEdit, MdMoreVert } from "react-icons/md";
import { Baby } from "../types/babyModel";
import image from "@/public/images/default-profile.png";
import BabyAgeLabel from "@/modules/homeSettings/baby/components/BabyAgeLabel";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "@/shared/components/atoms/Button";
/**
 * Props for BabyCard component.
 *
 * @property {Baby} baby - The baby object to display.
 * @property {(baby: Baby) => void} onDelete - Callback for deleting the baby.
 * @property {(baby: Baby) => void} [onEdit] - Optional callback for editing the baby.
 * @property {string | null} menuOpen - Key of the currently open menu.
 * @property {(key: string | null) => void} setMenuOpen - Function to set the open menu key.
 */
export type BabyCardProps = {
  baby: Baby;
  onDelete: (baby: Baby) => void;
  onEdit?: (baby: Baby) => void;
  menuOpen: string | null;
  setMenuOpen: (key: string | null) => void;
};

/**
 * Exported BabyCard component.
 *
 * Purpose:
 * - Displays a card with baby information, including name, photo, and age.
 * - Provides menu actions for editing and deleting the baby.
 *
 * Parameters:
 * @param {BabyCardProps} props - Props containing baby data and menu handlers.
 *
 * Returns:
 * @returns {JSX.Element} A card element showing the baby's details and menu actions.
 */
export default function BabyCard({
  baby,
  onDelete,
  onEdit,
  menuOpen,
  setMenuOpen,
}: BabyCardProps): JSX.Element {
  const t = useTranslations("common");
  const tBaby = useTranslations("baby");
  const key = baby.id || baby.name;

  /**
   * Handles the delete action for the baby.
   *
   * @returns {void}
   */
  const handleDelete = () => {
    onDelete(baby);
    setMenuOpen(null);
  };

  /**
   * Handles the edit action for the baby.
   *
   * @returns {void}
   */
  const handleEdit = () => {
    if (onEdit) onEdit(baby);
    setMenuOpen(null);
  };

  return (
    <div
      key={key}
      className="bg-apricot/20 relative flex flex-col p-4 shadow-sm"
      style={{
        backgroundColor: baby.color
          ? `${baby.color.replace("#", "#")}${
              baby.color.length === 7 ? "20" : ""
            }` // HEX + alpha (20 = 12.5%)
          : "rgba(255, 255, 255, 0.5)", // fallback
      }}
    >
      {/* Menu icon */}
      <div className="absolute top-2 right-0">
        <MenuModalIcon
          open={menuOpen === key}
          onOpen={() => setMenuOpen(key)}
          onClose={() => setMenuOpen(null)}
          icon={<MdMoreVert size={22} />}
        >
          <Button
            variant="tertiary"
            onClick={handleEdit}
            className="text-sm "
            align="left"
          >
            <MdEdit size={18} /> {t("edit")}
          </Button>

          <Button
            variant="tertiary"
            onClick={handleDelete}
            className="text-sm"
            align="left"
          >
            <MdDelete size={18} /> {t("delete")}
          </Button>
        </MenuModalIcon>
      </div>
      {/* Card content */}
      <div className="flex flex-row gap-2 pr-7">
        {/* Photo */}
        <div
          className="min-w-15 min-h-15 flex items-center justify-center"
          style={{ backgroundColor: String(baby.color) }}
        >
          <Image
            src={baby.photoUrl ? baby.photoUrl : image.src}
            alt={baby.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
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
              <BabyAgeLabel birthDate={baby.birthDate} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
