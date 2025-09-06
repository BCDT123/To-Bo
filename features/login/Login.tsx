"use client";
import React from "react";
import { loginWithPopup } from "@/features/users/auth";
import { useTranslations } from "next-intl";
import Button from "@/components/Button";
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function Login() {
  const tAuth = useTranslations("auth");
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const user = await loginWithPopup();
      console.log("User:", user);
      router.push("/");
    } catch (error) {
      console.error("Error Log in:", error);
    }
  };

  return (
    <Button onClick={handleLogin}>
      <FaGoogle /> {tAuth("loginGoogle")}
    </Button>
  );
  //<button onClick={handleLogin}>Iniciar sesión con Google</button>;
}
