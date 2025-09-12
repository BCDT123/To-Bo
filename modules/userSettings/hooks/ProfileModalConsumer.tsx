// Modal consumer component
"use client";
import React from "react";
import Modal from "@/shared/components/atoms/Modal";
import UserProfileEdit from "@/modules/userSettings/components/UserProfileEdit";
import { useProfileModal } from "@/modules/userSettings/hooks/ProfileModalContext";

export default function ProfileModalConsumer() {
  const { showProfile, setShowProfile } = useProfileModal();
  return (
    <Modal open={showProfile} onClose={() => setShowProfile(false)}>
      <UserProfileEdit />
    </Modal>
  );
}
