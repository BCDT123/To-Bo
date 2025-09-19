// Modal consumer component
"use client";
import React from "react";
import Modal from "@/shared/components/ModalRight";
import UserProfileEdit from "@/modules/userSettings/components/UserProfileEdit";
import { useProfileModal } from "@/modules/userSettings/hooks/ProfileModalContext";
import Overlay from "@/shared/components/Overlay";
/**
 * ProfileModalConsumer component
 *
 * Purpose:
 * - Consumes the profile modal context to control the modal visibility.
 * - Renders the UserProfileEdit component inside a modal.
 *
 * Returns:
 * @returns {JSX.Element} The modal with the user profile edit form.
 */
export default function ProfileModalConsumer() {
  const { showProfile, setShowProfile } = useProfileModal();

  return (
    <>
      {showProfile && <Overlay onClick={() => setShowProfile(false)} />}
      <Modal open={showProfile} onClose={() => setShowProfile(false)}>
        <UserProfileEdit />
      </Modal>
    </>
  );
}
