"use client";
import React from "react";
import { House } from "../types/houseModel";
import { houseService } from "@/modules/homeSettings/house/services/houseService";
import { useTranslations } from "next-intl";
import Card from "@/modules/homeSettings/components/Card";
import Grid from "../../components/Grid";
import { MdHome } from "react-icons/md";
/**
 * Props for HouseGrid component.
 *
 * @property {House[]} houses - Array of house objects to display.
 * @property {React.Dispatch<React.SetStateAction<House[]>>} setHouses - State setter for the houses array.
 * @property {() => void} onAddHouse - Callback for adding a new house.
 * @property {(house: House) => void} onEditHouse - Callback for editing a house.
 */
type Props = {
  houses: House[];
  setHouses: React.Dispatch<React.SetStateAction<House[]>>;
  onAddHouse: () => void;
  onEditHouse: (house: House) => void;
};

/**
 * Exported HouseGrid component.
 *
 * Purpose:
 * - Displays a grid of HouseCard components.
 * - Handles adding, editing, and deleting houses.
 *
 * Parameters:
 * @param {Props} props - Props containing houses array, state setter, and action callbacks.
 *
 * Returns:
 * @returns {JSX.Element} Section element with grid of house cards and add button.
 */
export default function HouseGrid({
  houses,
  setHouses,
  onAddHouse,
  onEditHouse,
}: Props): JSX.Element {
  const tHouse = useTranslations("house");
  const [menuOpen, setMenuOpen] = React.useState<string | null>(null);
  const [loading, setLoading] = React.useState(false);

  /**
   * Handles deletion of a house.
   *
   * @param {House} house - The house object to delete.
   * @returns {Promise<void>} Removes the house from state after deletion.
   */
  const handleDeleteHouse = async (house: House): Promise<void> => {
    setLoading(true);
    await houseService.deleteHouse(house.id);
    setHouses((prev) => prev.filter((h) => h.id !== house.id));
    setMenuOpen(null);
    setLoading(false);
  };

  /**
   * Handles edit action for a house.
   *
   * @param {House} house - The house object to edit.
   * @returns {void}
   */
  const handleEdit = (house: House): void => {
    onEditHouse(house);
    setMenuOpen(null);
  };

  /**
   * HouseGrid component.
   *
   * Renders a grid layout of house cards, including add, edit, and delete actions.
   *
   * @param {string} title - The grid title.
   * @param {boolean} loading - Loading state for the grid.
   * @param {() => void} onAdd - Callback for adding a new house.
   * @param {React.ReactNode} children - The house card elements.
   * @returns {JSX.Element} The grid section with house cards.
   */
  return (
    <Grid title={tHouse("houseList")} loading={loading} onAdd={onAddHouse}>
      {houses.map((house) => (
        <Card
          item={house}
          fields={[
            { key: "name", label: tHouse("name") },
            // ...other fields
          ]}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          onDelete={handleDeleteHouse}
          onEdit={handleEdit}
          getKey={(item) => item.id || item.name}
          iconImage={<MdHome size={30} className="text-gray-700" />}
        />
      ))}
    </Grid>
  );
}
