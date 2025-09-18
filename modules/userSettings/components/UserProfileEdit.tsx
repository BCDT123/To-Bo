"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { useUser, useSetUser } from "@/modules/userSettings/hooks/userContext";
import { supportedLanguages } from "@/config/locales";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import SuccessMessage from "@/shared/components/atoms/SuccessMessage";
import { updateUserWithImage } from "@/modules/userSettings/services/userProfile";
import {
  userProfileSchema,
  UserProfileFormData,
} from "../validation/userProfileSchema";
import FormField, { DynamicFormField } from "@/shared/components/FormField";

/**
 * UserProfileEdit component
 *
 * Purpose:
 * - Renders the user profile edit form.
 * - Handles user data update, including image upload and language selection.
 * - Displays error and success messages.
 *
 * Parameters:
 * @returns {JSX.Element} The user profile edit form section.
 */
export default function UserProfileEdit() {
  const tProfile = useTranslations("profile");
  const tCommon = useTranslations("common");
  const user = useUser();
  const setUser = useSetUser();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Fields definition for the dynamic form
   */
  const fields: DynamicFormField<UserProfileFormData>[] = [
    {
      name: "photoUrl",
      label: tProfile("photo"),
      type: "image",
    },
    {
      name: "name",
      label: tProfile("name"),
      type: "text",
      required: true,
      placeholder: tProfile("name"),
    },
    {
      name: "email",
      label: tProfile("email"),
      type: "email",
      required: true,
      placeholder: tProfile("email"),
    },
    {
      name: "language",
      label: tProfile("language"),
      type: "select",
      required: true,
      options: Object.entries(supportedLanguages).map(([value, label]) => ({
        value,
        label,
      })),
      placeholder: tProfile("language"),
    },
  ];

  /**
   * Handles form submission for updating user profile
   *
   * @param {UserProfileFormData} data - The form data.
   * @param {File | undefined} imageFile - The selected image file.
   * @returns {Promise<void>} Updates the user profile and sets success or error messages.
   */
  const onSubmit = async (data: UserProfileFormData, imageFile?: File) => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("No user logged in.");
      return;
    }

    // Clean photoUrl if null
    const cleanData = {
      ...data,
      photoUrl: data.photoUrl ?? "",
    };

    try {
      const updatedUser = await updateUserWithImage(
        user.id,
        cleanData,
        imageFile
      );
      setSuccess(tProfile("success"));
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || tProfile("error") || "An error occurred.");
    }
  };

  // Render loading or no user messages
  if (user === undefined)
    return <p>{tProfile("loadingUser") || "Loading user..."}</p>;
  if (user === null) return <p>{tProfile("noUser") || "No user logged in."}</p>;

  /**
   * Renders the user profile edit form section
   */
  return (
    <section className="max-w-lg mx-auto p-6 h-full">
      <FormField
        fields={fields}
        schema={userProfileSchema}
        defaultValues={{
          name: user?.name || "",
          email: user?.email || "",
          photoUrl: user?.photoUrl ?? "",
          language: user?.language || "en",
        }}
        onSubmit={onSubmit}
        buttonLabel={tCommon("save")}
        titleLabel={tProfile("editProfile")}
      />
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />
    </section>
  );
}
