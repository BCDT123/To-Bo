// Modal consumer component
"use client";
import React from "react";
import Modal from "@/shared/components/atoms/Modal";
import UserProfileEdit from "@/features/users/UserProfileEdit"; // Ajusta el import si es necesario

import {
  ProfileModalProvider,
  useProfileModal,
} from "@/features/users/ProfileModalContext";

export default function ProfileModalConsumer() {
  const { showProfile, setShowProfile } = useProfileModal();
  return (
    <Modal open={showProfile} onClose={() => setShowProfile(false)}>
      <UserProfileEdit />
    </Modal>
  );
}
