"use client";
import React, { createContext, useContext, useState } from "react";

const ProfileModalContext = createContext<{
  showProfile: boolean;
  setShowProfile: (show: boolean) => void;
}>({
  showProfile: false,
  setShowProfile: () => {},
});

export function useProfileModal() {
  return useContext(ProfileModalContext);
}

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
