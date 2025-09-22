"use client";
import React from "react";
import { Baby } from "../types/babyModel";
import { babyService } from "@/modules/homeSettings/baby/services/babyService";
import { useTranslations } from "next-intl";
import BabyAgeLabel from "./BabyAgeLabel";
import Card from "@/modules/homeSettings/components/Card";
import image from "@/public/images/default-profile.png";
import Grid from "../../components/Grid";

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

  /**
   * BabyGrid component.
   *
   * Renders a grid layout of baby cards, including add, edit, and delete actions.
   *
   * @param {string} title - The grid title.
   * @param {boolean} loading - Loading state for the grid.
   * @param {() => void} onAdd - Callback for adding a new baby.
   * @param {React.ReactNode} children - The baby card elements.
   * @returns {JSX.Element} The grid section with baby cards.
   */
  return (
    <Grid title={tBaby("babyList")} loading={loading} onAdd={onAddBaby}>
      {babies.map((baby) => (
        <Card
          item={baby}
          fields={[
            { key: "name", label: tBaby("name") },
            {
              key: "birthDate",
              label: tBaby("birthDate"),
              render: (v) => <BabyAgeLabel birthDate={v} />,
            },
            // ...other fields
          ]}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onDelete={handleDeleteBaby}
          onEdit={handleEdit}
          getKey={(item) => item.id || item.name}
          imageKey="photoUrl"
          colorKey="color"
          defaultImage={baby.photoUrl ? baby.photoUrl : image.src}
        />
      ))}
    </Grid>
  );
}
