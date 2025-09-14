"use client";
import React, { useEffect, useState } from "react";
import { Baby } from "../types/babyModel";
import { babyService } from "../services/babyService";
import { useTranslations } from "next-intl";
import BabyCard from "./BabyCard";
import Link from "next/link";
import { RiAddBoxFill } from "react-icons/ri";
/**
 * BabyGrid component
 *
 * Purpose:
 * - Loads babies from the service and displays them in a dynamic grid.
 * - Allows selection and deletion of babies from the grid.
 *
 * Returns:
 * @returns {JSX.Element} The baby grid section.
 */
export default function BabyGrid({ onAddBaby }) {
  const tBaby = useTranslations("baby");
  const tCommon = useTranslations("common");
  const [babies, setBabies] = useState<Baby[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState<string | null>(null);

  /**
   * Loads babies from the service when the component mounts.
   */
  useEffect(() => {
    async function fetchBabies() {
      setLoading(true);
      const result = await babyService.getBabies();
      setBabies(result || []);
      setLoading(false);
    }
    fetchBabies();
  }, []);

  /**
   * Handles deletion of selected babies from the grid and service.
   *
   * @param {Baby[]} selected - The selected babies to delete.
   */
  const handleDeleteBabies = async (selected: Baby[]) => {
    for (const baby of selected) {
      await babyService.deleteBaby(baby.id);
    }
    setBabies((prev) =>
      prev.filter((b) => !selected.some((s) => s.id === b.id))
    );
    setMenuOpen(null);
  };

  const handleDeleteBaby = async (baby: Baby) => {
    await babyService.deleteBaby(baby.id);
    setBabies((prev) => prev.filter((b) => b.id !== baby.id));
    setMenuOpen(null);
  };

  const handleEdit = (baby: Baby) => {
    // if (onEdit) onEdit(baby);
    setMenuOpen(null);
  };
  /**
   * Renders the baby grid section.
   */
  return (
    <section className="">
      {loading ? (
        <div className="text-center py-8">
          {tCommon("loading") || "Loading..."}
        </div>
      ) : (
        <div className="w-full">
          <div className="flex flex-row items-center  mb-5 gap-2">
            <h2 className="text-lg font-medium ">{tBaby("babyList")}</h2>
            <div className="relative group flex justify-center ">
              <button
                aria-label="Add baby"
                className="gap-2 text-gray-400 hover:text-gray-700 active:text-gray-700 rounded-full hover:bg-gray-100 p-2"
                onClick={onAddBaby}
                type="button"
              >
                <RiAddBoxFill size={20} />
              </button>
              <span className="absolute left-full top-1/2 -translate-y-1/2 ml-2 px-2 py-1 rounded bg-gray-700 text-white text-xs opacity-0 pointer-events-none transition-opacity group-hover:opacity-100">
                Add baby
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {babies.map((baby) => (
              <BabyCard
                key={baby.id || baby.name}
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
