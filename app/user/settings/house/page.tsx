"use client";
import React, { useEffect, useState } from "react";
import HouseForm from "@/modules/homeSettings/house/components/HouseForm";
import HouseGrid from "@/modules/homeSettings/house/components/HouseGrid";
import Modal from "@/shared/components/ModalRight";
import Overlay from "@/shared/components/Overlay";
import { House } from "@/modules/homeSettings/house/types/houseModel";
import { houseService } from "@/modules/homeSettings/house/services/houseService";

/**
 * Exported HouseSettingsPage component.
 *
 * Purpose:
 * - Displays the house settings page with a grid of houses.
 * - Handles adding, editing, and displaying houses using modals.
 *
 * Returns:
 * @returns {JSX.Element} The house settings page section.
 */
export default function HouseSettingsPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);

  // Initial load of houses from the service
  useEffect(() => {
    const fetchHouses = async () => {
      const result = await houseService.getHouses();
      setHouses(result || []);
    };
    fetchHouses();
  }, []);

  // Update state when creating or editing a house
  const handleCreateOrEditHouse = async (houseData: House) => {
    setHouses((prev) => {
      const exists = prev.some((h) => h.id === houseData.id);
      return exists
        ? prev.map((h) => (h.id === houseData.id ? houseData : h))
        : [...prev, houseData];
    });
    setShowCreateModal(false);
    setEditingHouse(null);
  };

  const handleEditHouse = (house: House) => {
    setEditingHouse(house);
    setShowCreateModal(true);
  };

  const handleAddHouse = () => {
    setEditingHouse(null);
    setShowCreateModal(true);
  };

  return (
    <div className="relative top-0 md:top-16 h-screen">
      <HouseGrid
        houses={houses}
        setHouses={setHouses}
        onAddHouse={handleAddHouse}
        onEditHouse={handleEditHouse}
      />

      {showCreateModal && <Overlay onClick={() => setShowCreateModal(false)} />}
      {showCreateModal && (
        <Modal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <HouseForm
            house={editingHouse}
            onSubmit={handleCreateOrEditHouse}
            onCancel={() => {
              setShowCreateModal(false);
              setEditingHouse(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
