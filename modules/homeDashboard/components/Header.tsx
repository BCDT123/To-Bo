"use client";
import { useUser } from "@/modules/userSettings/hooks/userContext";

type HeaderHomeProps = {
  user: string;
};

export default function HeaderHome() {
  const user = useUser();

  return (
    <div>
      <h1>Bienvenido, {user?.email}</h1>
    </div>
  );
}
