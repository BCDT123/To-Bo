"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import type { User } from "firebase/auth";
import NavigationWrapper from "@/components/nav/NavigationWrapper";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (!firebaseUser) {
        router.replace("/login"); //replace evita que el usuario vuelva con "back"
      }
      setUser(firebaseUser); // puede ser null o User
    });

    return () => unsubscribe();
  }, [router]); //Usar router porque se usa router.push() o router.replace() dentro del efecto.

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
    //return <p className="text-center mt-10">Verificando sesión...</p>;
  }

  if (user === null) {
    return null; // ya redirigió
  }

  return (
    <>
      <NavigationWrapper />
      {children}
    </>
  );
}
