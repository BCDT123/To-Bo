"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useUser, useSetUser } from "@/modules/userSettings/hooks/userContext";
import { supportedLanguages } from "@/config/locales";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import { InputForm } from "@/shared/components/atoms/Input";
import Button from "@/shared/components/atoms/Button";
import { SelectForm } from "@/shared/components/atoms/Input";
import SuccessMessage from "@/shared/components/atoms/SuccessMessage";
import UserImageEdit from "@/shared/components/atoms/UserImageEdit";
import { updateUserWithImage } from "@/modules/userSettings/services/userProfile";
import { useYupForm } from "@/shared/utilities/formValidation";
import {
  userProfileSchema,
  UserProfileFormData,
} from "../validation/userProfileSchema";

/**
 * UserProfileEdit component
 *
 * Purpose:
 * - Renders the user profile edit form.
 * - Handles user data update, including image upload and language selection.
 * - Displays error and success messages.
 *
 * Returns:
 * @returns {JSX.Element} The user profile edit form section.
 */
export default function UserProfileEdit() {
  const tProfile = useTranslations("profile");
  const user = useUser();
  const setUser = useSetUser();
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Use the generic hook for form and validation
  const form = useYupForm<UserProfileFormData>(userProfileSchema, {
    email: "",
    name: "",
    photoUrl: "",
    language: "en",
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  // Load user data into the form when the user context changes
  useEffect(() => {
    if (user) {
      setValue("email", user.email || "");
      setValue("name", user.name || "");
      setValue("photoUrl", user.photoUrl || "");
      setValue("language", user.language || "en");
    }
  }, [user, setValue]);

  /**
   * Handles image file selection and preview
   * @param {File} file - The selected image file.
   */
  const handleImageChange = (file: File) => {
    setImageFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setValue("photoUrl", reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /**
   * Handles form submission for updating user profile
   * @param {UserProfileFormData} data - The form data.
   */
  const onSubmit = async (data: UserProfileFormData) => {
    setError("");
    setSuccess("");

    if (!user) {
      setError("No user logged in.");
      return;
    }

    try {
      const updatedUser = await updateUserWithImage(user.id, data, imageFile);
      setSuccess(tProfile("success"));
      setUser(updatedUser);
    } catch (err: any) {
      setError(err.message || tProfile("error") || "An error occurred.");
    }
  };

  if (user === undefined)
    return <p>{tProfile("loadingUser") || "Loading user..."}</p>;
  if (user === null) return <p>{tProfile("noUser") || "No user logged in."}</p>;

  const options = Object.entries(supportedLanguages).map(([locale, name]) => (
    <option key={locale} value={locale}>
      {name}
    </option>
  ));

  return (
    <section className="max-w-md mx-auto h-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-5 justify-between h-full"
      >
        <UserImageEdit
          photoUrl={user?.photoUrl}
          name={user?.name}
          onImageChange={handleImageChange}
        />

        <div>
          <h1 className="text-xl font-medium mb-4 text-center">
            {tProfile("editProfile")}
          </h1>
          <InputForm
            type="text"
            {...register("name")}
            placeholder={tProfile("name")}
            required
          />
          <ErrorMessage message={errors.name?.message as string} />

          <InputForm
            type="email"
            {...register("email")}
            placeholder={tProfile("email")}
            required
          />
          <ErrorMessage message={errors.email?.message as string} />

          <SelectForm
            {...register("language")}
            placeholder={tProfile("language")}
            className="focus:outline-none"
          >
            {options}
          </SelectForm>
          <ErrorMessage message={errors.language?.message as string} />
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
