"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
// Context and services
import { useUser, useSetUser } from "@/features/users/userContext";
import { userService } from "@/features/users/userService";
import { supportedLanguages } from "@/config/locales";
// Components
import ErrorMessage from "@/components/ErrorMessage";
import { InputForm } from "@/components/Input";
import Button from "@/components/Button";
import { SelectForm } from "@/components/Input";
import SuccessMessage from "@/components/SuccessMessage";
import UserImageEdit from "@/components/UserImageEdit";
import { updateUserWithImage } from "@/features/users/userProfile";

/**
 * UserProfileEdit component
 *
 * Purpose:
 * - Renders the user profile edit form.
 * - Handles user data update, including image upload and language selection.
 * - Displays error and success messages.
 *
 * Parameters:
 * - None
 *
 * Returns:
 * @returns {JSX.Element} The user profile edit form section.
 */
export default function UserProfileEdit() {
  const tProfile = useTranslations("profile");
  const user = useUser();
  const setUser = useSetUser();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [form, setForm] = useState({
    email: "",
    name: "",
    photoUrl: "",
    language: "en",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Loads user data into the form when the user context changes
  useEffect(() => {
    if (user) {
      setForm({
        email: user.email || "",
        name: user.name || "",
        photoUrl: user.photoUrl || "",
        language: user.language || "en",
      });
    }
  }, [user]);

  /**
   * Handles changes in form inputs
   * @param {React.ChangeEvent<HTMLInputElement | HTMLSelectElement>} e - The input change event.
   */
  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  /**
   * Handles image file selection and preview
   * @param {File} file - The selected image file.
   */
  const handleImageChange = (file: File) => {
    setImageFile(file);
    // Optional local preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        photoUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  /**
   * Handles form submission for updating user profile
   * @param {React.FormEvent} e - The form submit event.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("No user logged in.");
      return;
    }

    // Validations
    if (!form.name.trim()) {
      setError(tProfile("nameRequired") || "Name is required.");
      return;
    }
    if (!form.email.includes("@")) {
      setError(tProfile("invalidEmail") || "Email is not valid.");
      return;
    }
    if (form.name.length < 2) {
      setError(tProfile("nameTooShort") || "Name is too short.");
      return;
    }

    try {
      const updatedUser = await updateUserWithImage(user.id, form, imageFile);
      setSuccess(tProfile("success"));
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || tProfile("error") || "An error occurred.");
    }
  };

  // Loading and error states for user context
  if (user === undefined)
    return <p>{tProfile("loadingUser") || "Loading user..."}</p>;
  if (user === null) return <p>{tProfile("noUser") || "No user logged in."}</p>;

  // Language options for the select input
  const options = Object.entries(supportedLanguages).map(([locale, name]) => (
    <option key={locale} value={locale}>
      {name}
    </option>
  ));

  return (
    <section className="max-w-md mx-auto h-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 justify-between h-full"
      >
        <UserImageEdit
          photoUrl={form.photoUrl}
          name={form.name}
          onImageChange={handleImageChange}
        />

        <div>
          <h1 className="text-xl font-medium mb-4 text-center">
            {tProfile("editProfile")}
          </h1>
          <InputForm
            type="text"
            name="name"
            value={form.name}
            onChange={handleFormChange}
            placeholder={tProfile("name")}
            required
          />

          <InputForm
            type="email"
            name="email"
            value={form.email}
            onChange={handleFormChange}
            placeholder={tProfile("email")}
            required
          />

          <SelectForm
            name="language"
            value={form.language?.split("-")[0]}
            onChange={handleFormChange}
            placeholder={tProfile("language")}
            className="focus:outline-none"
          >
            {options}
          </SelectForm>
        </div>
        <Button type="submit" className="mt-4">
          {tProfile("update")}
        </Button>

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
      </form>
    </section>
  );
}
