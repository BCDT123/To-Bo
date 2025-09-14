"use client";
import React, { useState } from "react";
import BabyCreateForm from "@/modules/homeSettings/components/BabyCreateForm";
import BabyGrid from "@/modules/homeSettings/components/BabyGrid";
import Modal from "@/shared/components/atoms/Modal";
import Overlay from "@/shared/components/Overlay";
export default function BabySettingsPage() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Puedes pasar este handler a BabyGrid si quieres actualizar la lista desde aquí
  const handleCreateBaby = async (newBaby) => {
    // lógica para agregar el bebé y actualizar el grid si lo necesitas
    setShowCreateModal(false);
  };

  return (
    <div className="relative top-0 md:top-16 h-screen">
      <BabyGrid onAddBaby={() => setShowCreateModal(true)} />
      {showCreateModal && <Overlay onClick={() => setShowCreateModal(false)} />}
      {showCreateModal && (
        <Modal open={showCreateModal} onClose={() => setShowCreateModal(false)}>
          <BabyCreateForm
            onSubmit={handleCreateBaby}
            onCancel={() => setShowCreateModal(false)}
          />
        </Modal>
      )}
    </div>
  );
}
