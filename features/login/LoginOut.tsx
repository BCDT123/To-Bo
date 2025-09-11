import { logout } from "@/features/login/auth";

/**
 * LogoutButton component
 *
 * Purpose:
 * - Renders a button that logs out the current user when clicked.
 *
 * Advantages:
 * - Provides a simple and accessible way for users to end their session.
 *
 * @returns {JSX.Element} A button element that triggers the logout function.
 */
export default function LogoutButton() {
  return <button onClick={logout}>Cerrar sesión</button>;
}
