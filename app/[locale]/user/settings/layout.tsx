import React from "react";
import SettingsSidebar from "@/features/settings/SideBarMenu";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SettingsSidebar />
      <main className="flex-1 ml-56 p-8">{children}</main>
    </div>
  );
}
