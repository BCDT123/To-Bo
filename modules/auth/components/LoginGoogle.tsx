"use client";
import React, { useState } from "react";
//components
import { loginWithPopup } from "@/modules/auth/services/auth";
import Button from "@/shared/components/atoms/Button";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import { useUser, useSetUser } from "@/modules/userSettings/hooks/userContext";
//Translations
import { useTranslations } from "next-intl";

//Icons
import { FaGoogle } from "react-icons/fa";
import { useRouter } from "next/navigation";

/**
 * LoginGoogle component
 *
 * Purpose:
 * - Renders a button for users to log in with Google authentication.
 * - Handles authentication logic and updates user context.
 *
 * Advantages:
 * - Provides a quick and accessible way for users to log in with Google.
 * - Displays error messages and loading state for better UX.
 *
 * @returns {JSX.Element} The Google login button and error message UI.
 */
export default function LoginGoogle() {
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const setUser = useSetUser(); // Function to update user context

  /**
   * Handles the Google login process when the user clicks the button.
   *
   * @returns {Promise<void>} No return value. Updates user context and error state.
   */
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
        variant="primary"
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
