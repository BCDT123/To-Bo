"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { auth } from "@/firebaseConfig";
import type { User } from "firebase/auth";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const publicRoutes = ["/login", "/register", "/onboarding", "/error"];

export default function SessionGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null | undefined>(undefined);

  const isPublicRoute = publicRoutes.some((route) => pathname.endsWith(route));

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      setUser(firebaseUser);
      if (!firebaseUser && !isPublicRoute) {
        router.replace("/login");
      }
    });

    return () => unsubscribe();
  }, [router, isPublicRoute]);

  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        {/* <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500" /> */}

        <div className="flex justify-center items-center w-screen">
          <AiOutlineLoading3Quarters
            size={50}
            className="animate-spin text-thistle "
          />
        </div>
      </div>
    );
  }

  // Si es ruta pública, renderiza aunque no haya usuario
  if (isPublicRoute) {
    return <>{children}</>;
  }

  // Si hay usuario, renderiza contenido protegido
  if (user) {
    return <>{children}</>;
  }

  // Si no hay usuario y no es ruta pública, ya redirigió
  return null;
}
