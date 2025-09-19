"use client";
import React, { useEffect, useState } from "react";
import BabyForm from "@/modules/homeSettings/baby/components/BabyForm";
import BabyGrid from "@/modules/homeSettings/baby/components/BabyGrid";
import Modal from "@/shared/components/ModalRight";
import Overlay from "@/shared/components/Overlay";
import { Baby } from "@/modules/homeSettings/baby/types/babyModel";
import { babyService } from "@/modules/homeSettings/baby/services/babyService";

export default function BabySettingsPage() {
  const [babies, setBabies] = useState<Baby[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [editingBaby, setEditingBaby] = useState<Baby | null>(null);

  // 🔄 Carga inicial de bebés desde el servicio
  useEffect(() => {
    const fetchBabies = async () => {
      const result = await babyService.getBabies();
      setBabies(result || []);
    };
    fetchBabies();
  }, []);

  // Actualiza el estado al crear o editar
  const handleCreateOrEditBaby = async (babyData: Baby) => {
    setBabies((prev) => {
      const exists = prev.some((b) => b.id === babyData.id);
      return exists
        ? prev.map((b) => (b.id === babyData.id ? babyData : b))
        : [...prev, babyData];
    });
    setShowCreateModal(false);
    setEditingBaby(null);
  };

  const handleEditBaby = (baby: Baby) => {
    setEditingBaby(baby);
    setShowCreateModal(true);
  };

  const handleAddBaby = () => {
    setEditingBaby(null);
    setShowCreateModal(true);
  };

  return (
    <div className="relative top-0 md:top-16 h-screen">
      <BabyGrid
        babies={babies}
        setBabies={setBabies}
        onAddBaby={handleAddBaby}
        onEditBaby={handleEditBaby}
      />

      {showCreateModal && <Overlay onClick={() => setShowCreateModal(false)} />}
      {showCreateModal && (
        <Modal
          open={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          role="dialog"
          aria-modal="true"
        >
          <BabyForm
            baby={editingBaby}
            onSubmit={handleCreateOrEditBaby}
            onCancel={() => {
              setShowCreateModal(false);
              setEditingBaby(null);
            }}
          />
        </Modal>
      )}
    </div>
  );
}
