import { logout } from "@/features/users/auth";

export default function LogoutButton() {
  return <button onClick={logout}>Cerrar sesión</button>;
}
