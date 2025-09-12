import React, { useState } from "react";

//components
import InputWithIcon from "@/shared/components/atoms/Input";
import Button from "@/shared/components/atoms/Button";
import { signInWithEmail } from "@/features/login/auth";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import { useUser, useSetUser } from "@/features/users/userContext";

//translations
import { useTranslations } from "next-intl";

//icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

/**
 * LoginMail component
 *
 * Purpose:
 * - Renders a login form for users to sign in with email and password.
 * - Handles validation and authentication logic.
 *
 * Advantages:
 * - Provides a simple and accessible way for users to log in.
 * - Displays error messages and loading state for better UX.
 *
 * @returns {JSX.Element} The login form UI.
 */
export default function LoginMail() {
  const tCommon = useTranslations("common");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const setUser = useSetUser(); // Function to update user context

  /**
   * Handles the login process when the user clicks the continue button.
   *
   * @returns {Promise<void>} No return value. Updates user context and error state.
   */
  const handleContinue = async () => {
    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const updatedUser = await signInWithEmail(email, password);
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <InputWithIcon
        icon={<MdEmail />}
        type="email"
        value={email}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setEmail(e.target.value)
        }
        placeholder="example@email.com"
        aria-label="Email"
      />
      <InputWithIcon
        icon={<RiLockPasswordFill />}
        type="password"
        value={password}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setPassword(e.target.value)
        }
        placeholder="********"
        aria-label="Password"
      />
      <Button onClick={handleContinue} disabled={loading}>
        {loading ? tCommon("loading") : tCommon("continue")}
      </Button>
      <ErrorMessage message={error} />
    </>
  );
}
