"use client";
import React from "react";
import { useUser } from "@/features/users/userContext"; // Custom hook to get the current user (client-side)
import { useIdleTimer } from "react-idle-timer"; // Detects user inactivity (client-side)
import { signOut } from "firebase/auth"; // Signs out the user from Firebase (client-side)
import { auth } from "@/firebaseConfig"; // Firebase instance (client-side)
import { useState, useEffect } from "react"; // React hooks (client-side)
import { useTranslations } from "next-intl"; // Translation hook (client-side)
import IdleModal from "@/features/login/IdleModal";
import { useRouter } from "next/navigation";

/**
 * IdleLogout component
 *
 * Purpose:
 * - Detects user inactivity and automatically logs out the user after a set period.
 * - Shows a modal warning before logging out, allowing the user to stay active.
 *
 * Advantages:
 * - Improves security by preventing unauthorized access due to inactivity.
 * - Enhances user experience by providing a warning and countdown before logout.
 *
 * @returns {JSX.Element | null} The idle modal UI or null if no user is logged in.
 */
export default function IdleLogout() {
  const user = useUser(); // Gets the current user. If no user, nothing is rendered.
  const [showPrompt, setShowPrompt] = useState(false); // Controls whether the modal is shown.
  const [countdown, setCountdown] = useState(10); // Countdown before automatic logout.
  // Translations for modal texts.
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");

  const router = useRouter();

  /**
   * Handles the event when the user becomes idle.
   * Shows the modal prompt if a user is logged in.
   */
  const handleIdle = () => {
    if (user) setShowPrompt(true);
  };

  /**
   * Handles the event when the user chooses to stay active.
   * Hides the modal and resets the idle timer.
   */
  const handleStayActive = () => {
    setShowPrompt(false);
    reset();
  };

  /**
   * Handles the event when the user chooses to log out or the countdown reaches zero.
   * Signs out the user and hides the modal.
   */
  const handleLogout = () => {
    signOut(auth);
    setShowPrompt(false);
  };

  /**
   * Sets up the idle timer configuration.
   * @property {number} timeout - Time in milliseconds before considering the user idle.
   * @property {function} onIdle - Function to call when the user becomes idle.
   * @property {number} debounce - Debounce time for idle detection.
   */
  const { reset } = useIdleTimer({
    timeout: 1000 * 60 * 100, // Time configuration for auto logout
    onIdle: handleIdle,
    debounce: 500,
  });

  /**
   * Effect to handle the countdown before automatic logout.
   * Resets the countdown when the modal is shown and decrements every second.
   * Calls handleLogout when countdown reaches zero.
   */
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (showPrompt) {
      setCountdown(10); // Reset countdown

      timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            handleLogout(); // Automatically log out
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [showPrompt]); // Runs whenever showPrompt changes

  /**
   * Effect to redirect to the main page if no user is logged in.
   */
  useEffect(() => {
    if (!user) {
      router.push("/"); // Redirect to main
    }
  }, [user, router]);

  /**
   * Conditional render: returns null if no user is logged in.
   */
  if (!user) {
    return null;
  }

  /**
   * Renders the IdleModal if the prompt is shown.
   */
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
