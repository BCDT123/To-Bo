"use client";
import { useUser } from "@/features/users/userContext"; // Hook personalizado, cliente
import { useIdleTimer } from "react-idle-timer"; // Cliente: detecta actividad del usuario
import { signOut } from "firebase/auth"; // Cliente: cierra sesión desde el navegador
import { auth } from "@/firebaseConfig"; // Cliente: instancia de Firebase
import { useState, useEffect } from "react"; // Cliente: hooks de React
import { useTranslations } from "next-intl"; // Cliente: hook de traducciones
import IdleModal from "@/features/login/IdleModal";
import { useRouter } from "next/navigation";

//detectar inactividad del usuario y cerrar su sesión automáticamente tras un tiempo.

export default function IdleLogout() {
  const user = useUser(); // Obtiene el usuario actual. Si no hay usuario, no se renderiza nada.
  const [showPrompt, setShowPrompt] = useState(false); // controla si se muestra el modal.
  const [countdown, setCountdown] = useState(10); // cuenta regresiva antes de cerrar sesión.
  // Traducciones para textos del modal.
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

  const router = useRouter();

  // Funciones de control

  const handleIdle = () => {
    if (user) setShowPrompt(true);
  };

  const handleStayActive = () => {
    setShowPrompt(false);
    reset();
  };

  const handleLogout = () => {
    signOut(auth);
    setShowPrompt(false);
  };

  const { reset } = useIdleTimer({
    timeout: 1000 * 60 * 1,
    onIdle: handleIdle,
    debounce: 500,
  });

  // Efecto para cuenta regresiva

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showPrompt) {
      setCountdown(10); // reiniciar cuenta regresiva

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleLogout(); // cerrar sesión automáticamente
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showPrompt]); // se ejecuta cada que showPrompt Cambia

  // condicionar el render
  if (!user) {
    router.push("/"); //redireccionamos a main
    return null;
  }

  return (
    <>
      {showPrompt && (
        <IdleModal
          countdown={countdown}
          onStayActive={handleStayActive}
          onLogout={handleLogout}
          tAuth={tAuth}
          tCommon={tCommon}
        />
      )}
    </>
  );
}
