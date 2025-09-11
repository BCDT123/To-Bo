"use client";
import React, { useState } from "react";
import HeaderHome from "@/features/home/Header";
import Modal from "@/components/Modal";
import UserProfileEdit from "@/features/users/UserProfileEdit"; // Ajusta el import si es necesario
import {
  ProfileModalProvider,
  useProfileModal,
} from "@/features/users/ProfileModalContext";

export default function Home() {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <section className="md:pt-16">
      <HeaderHome />
      <ProfileModalConsumer />
    </section>
  );
}

// Modal consumer component
function ProfileModalConsumer() {
  const { showProfile, setShowProfile } = useProfileModal();
  return (
    <Modal open={showProfile} onClose={() => setShowProfile(false)}>
      <UserProfileEdit />
    </Modal>
  );
}
