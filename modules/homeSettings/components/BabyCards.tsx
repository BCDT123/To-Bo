import React, { useState } from "react";
import { Baby } from "../types/babyModel";
import BabyCard from "./BabyCard";

/**
 * Props for BabyCards
 */
export type BabyCardsProps = {
  data: Baby[];
  title?: string;
  onDelete: (selected: Baby[]) => void;
  onEdit?: (item: Baby) => void;
};

/**
 * BabyCards component
 *
 * Purpose:
 * - Renders a dynamic card grid for Baby data.
 * - Each card has a menu for edit/delete actions.
 * - Card fields are built from Baby properties.
 */
export default function BabyCards({
  data,
  title,
  onDelete,
  onEdit,
}: BabyCardsProps) {
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  const handleDelete = (baby: Baby) => {
    onDelete([baby]);
    setMenuOpen(null);
  };

  const handleEdit = (baby: Baby) => {
    if (onEdit) onEdit(baby);
    setMenuOpen(null);
  };

  return (
    <div className="w-full">
      {title && <h2 className="text-lg font-medium mb-4">{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {data.map((baby) => (
          <BabyCard
            key={baby.id || baby.name}
            baby={baby}
            onDelete={handleDelete}
            onEdit={handleEdit}
            menuOpen={menuOpen}
            setMenuOpen={setMenuOpen}
          />
        ))}
      </div>
    </div>
  );
}
