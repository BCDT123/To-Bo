import { logout } from "@/features/login/auth";

export default function LogoutButton() {
  return <button onClick={logout}>Cerrar sesión</button>;
}
