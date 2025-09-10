"use client";
import React, { useState } from "react";
//components
import { loginWithPopup } from "@/features/users/auth";
import Button from "@/components/Button";
import ErrorMessage from "@/components/ErrorMessage";
import { useUser, useSetUser } from "@/features/users/userContext";
//Translations
import { useTranslations } from "next-intl";

//Icons
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

export default function LoginGoogle() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useSetUser(); // <-- Obtén la función aquí

  const handleLogin = async () => {
    setLoading(true);
    setError("");
    try {
      const user = await loginWithPopup();
      setUser(user);
      if (user) {
        router.push("/");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err: any) {
      setError(err.message || "Error logging in with Google.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Button
        onClick={handleLogin}
        disabled={loading}
        aria-label="Login with Google"
      >
        <FaGoogle /> {loading ? tCommon("loading") : tAuth("loginGoogle")}
      </Button>
      <ErrorMessage message={error} />
    </>
  );
}
