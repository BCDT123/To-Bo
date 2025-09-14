"use client";
import React, { createContext, useContext, useState } from "react";

/**
 * ProfileModalContext
 *
 * Purpose:
 * - Provides context for controlling the visibility of the profile modal.
 * - Contains state and setter for showing/hiding the profile modal.
 */
const ProfileModalContext = createContext<{
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
}>({
  showProfile: false,
  setShowProfile: () => {},
});

/**
 * useProfileModal hook
 *
 * Purpose:
 * - Custom hook to access the profile modal context.
 *
 * Returns:
 * @returns {{ showProfile: boolean; setShowProfile: (show: boolean) => void }}
 *   The current modal visibility state and its setter function.
 */
export function useProfileModal() {
  return useContext(ProfileModalContext);
}

/**
 * ProfileModalProvider component
 *
 * Purpose:
 * - Provides the profile modal context to its children.
 *
 * Parameters:
 * @param {React.ReactNode} children - The child components that will consume the context.
 *
 * Returns:
 * @returns {JSX.Element} The context provider wrapping the children.
 */
export function ProfileModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showProfile, setShowProfile] = useState(false);

  return (
    <ProfileModalContext.Provider value={{ showProfile, setShowProfile }}>
      {children}
    </ProfileModalContext.Provider>
  );
}
