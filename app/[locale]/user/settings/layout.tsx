import React from "react";
import SettingsSidebar from "@/modules/homeSettings/components/SideBarMenu";

export default function SettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <SettingsSidebar />
      <main className="flex-1 ml-50 p-8">{children}</main>
    </div>
  );
}
