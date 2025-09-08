import React, { useState } from "react";

//components
import InputWithIcon from "@/components/Input";
import Button from "@/components/Button";
import { signInWithEmail } from "@/features/users/auth";
import ErrorMessage from "@/components/ErrorMessage";

//translations
import { useTranslations } from "next-intl";

//icons
import { MdEmail } from "react-icons/md";
import { RiLockPasswordFill } from "react-icons/ri";

export default function LoginMail() {
  const tCommon = useTranslations("common");
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
      await signInWithEmail(email, password);
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
