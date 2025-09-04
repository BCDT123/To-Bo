// components/Login.js
import { loginWithPopup } from "@/features/users/auth";

export default function Login() {
  const handleLogin = async () => {
    try {
      const user = await loginWithPopup();
      console.log("Usuario:", user);
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return <button onClick={handleLogin}>Iniciar sesión con Google</button>;
}
