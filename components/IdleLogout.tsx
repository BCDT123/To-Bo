"use client";
import { useUser } from "@/features/users/userContext"; // Hook personalizado, cliente
import { useIdleTimer } from "react-idle-timer"; // Cliente: detecta actividad del usuario
import { signOut } from "firebase/auth"; // Cliente: cierra sesión desde el navegador
import { auth } from "@/firebaseConfig"; // Cliente: instancia de Firebase
import { useState, useEffect } from "react"; // Cliente: hooks de React
import { useTranslations } from "next-intl"; // Cliente: hook de traducciones
import IdleModal from "./IdleModal";

export default function IdleLogout() {
  const user = useUser(); // hook siempre se llama
  const [showPrompt, setShowPrompt] = useState(false); // hook siempre se llama
  const [countdown, setCountdown] = useState(10); // segundos antes de cerrar sesión
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

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
  }, [showPrompt]);

  // ahora sí podés condicionar el render
  if (!user) return null;

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
