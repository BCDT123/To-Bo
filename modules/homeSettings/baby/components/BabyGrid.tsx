"use client";
import React from "react";
import { Baby } from "../types/babyModel";
import { babyService } from "@/modules/homeSettings/baby/services/babyService";
import { useTranslations } from "next-intl";
import BabyCard from "./BabyCard";
import { RiAddBoxFill } from "react-icons/ri";
import LoadingSpin from "@/shared/components/atoms/LoadingSpin";
import Button, { ButtonRoundIcon } from "@/shared/components/atoms/Button";
/**
 * Props for BabyGrid component.
 *
 * @property {Baby[]} babies - Array of baby objects to display.
 * @property {React.Dispatch<React.SetStateAction<Baby[]>>} setBabies - State setter for the babies array.
 * @property {() => void} onAddBaby - Callback for adding a new baby.
 * @property {(baby: Baby) => void} onEditBaby - Callback for editing a baby.
 */
type Props = {
  babies: Baby[];
  setBabies: React.Dispatch<React.SetStateAction<Baby[]>>;
  onAddBaby: () => void;
  onEditBaby: (baby: Baby) => void;
};

/**
 * Exported BabyGrid component.
 *
 * Purpose:
 * - Displays a grid of BabyCard components.
 * - Handles adding, editing, and deleting babies.
 *
 * Parameters:
 * @param {Props} props - Props containing babies array, state setter, and action callbacks.
 *
 * Returns:
 * @returns {JSX.Element} Section element with grid of baby cards and add button.
 */
export default function BabyGrid({
  babies,
  setBabies,
  onAddBaby,
  onEditBaby,
}: Props): JSX.Element {
  const tBaby = useTranslations("baby");
  const [menuOpen, setMenuOpen] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  /**
   * Handles deletion of a baby.
   *
   * @param {Baby} baby - The baby object to delete.
   * @returns {Promise<void>} Removes the baby from state after deletion.
   */
  const handleDeleteBaby = async (baby: Baby): Promise<void> => {
    setLoading(true);
    await babyService.deleteBaby(baby.id);
    setBabies((prev) => prev.filter((b) => b.id !== baby.id));
    setMenuOpen(null);
    setLoading(false);
  };

  /**
   * Handles edit action for a baby.
   *
   * @param {Baby} baby - The baby object to edit.
   * @returns {void}
   */
  const handleEdit = (baby: Baby): void => {
    onEditBaby(baby);
    setMenuOpen(null);
  };

  return (
    <section>
      {loading ? (
        <LoadingSpin />
      ) : (
        <div className="w-full">
          <div className="flex items-center mb-5 gap-2">
            <h2 className="text-lg font-medium">{tBaby("babyList")}</h2>
            <ButtonRoundIcon
              aria-label="Add baby"
              onClick={onAddBaby}
              type="button"
            >
              <RiAddBoxFill size={20} />
            </ButtonRoundIcon>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {babies.map((baby) => (
              <BabyCard
                key={baby.id}
                baby={baby}
                onDelete={handleDeleteBaby}
                onEdit={handleEdit}
                menuOpen={menuOpen}
                setMenuOpen={setMenuOpen}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
