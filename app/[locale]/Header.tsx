"use client";
import { useUser } from "@/features/users/userContext";

type HeaderHomeProps = {
  user: string;
};

export default function HeaderHome() {
  const user = useUser();

  return (
    <div>
      <h1>Bienvenido, {user?.displayName}</h1>
    </div>
  );
}
