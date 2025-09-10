"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
//context and services
import { useUser, useSetUser } from "@/features/users/userContext";
import { userService } from "@/features/users/userService";
import { supportedLanguages } from "@/config/locales";
//components
import ErrorMessage from "@/components/ErrorMessage";
import { InputForm } from "@/components/Input";
import Button from "@/components/Button";
import { SelectForm } from "@/components/Input";
import SuccessMessage from "@/components/SuccessMessage";
import UserImageEdit from "@/components/UserImageEdit";
import { updateUserWithImage } from "@/features/users/userProfile";

export default function UserProfileEdit() {
  const tProfile = useTranslations("profile");
  const user = useUser();
  const setUser = useSetUser(); // <-- Obtén la función aquí
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);

  const [form, setForm] = useState({
    email: "",
    name: "",
    photoUrl: "",
    language: "en",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (file: File) => {
    setImageFile(file);
    // Vista previa local opcional
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        photoUrl: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("No user logged in.");
      return;
    }

    // Validaciones
    if (!form.name.trim()) {
      setError(tProfile("nameRequired") || "El nombre es obligatorio.");
      return;
    }
    if (!form.email.includes("@")) {
      setError(tProfile("invalidEmail") || "El email no es válido.");
      return;
    }
    if (form.name.length < 2) {
      setError(tProfile("nameTooShort") || "El nombre es muy corto.");
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

  if (user === undefined)
    return <p>{tProfile("loadingUser") || "Cargando usuario..."}</p>;
  if (user === null)
    return <p>{tProfile("noUser") || "No hay usuario logueado."}</p>;

  const options = Object.entries(supportedLanguages).map(([locale, name]) => (
    <option key={locale} value={locale}>
      {name}
    </option>
  ));

  return (
    <section className=" max-w-md mx-auto mt-16 h-screen">
      <form onSubmit={handleSubmit} className="flex flex-col p-5">
        <UserImageEdit
          photoUrl={form.photoUrl}
          name={form.name}
          onImageChange={handleImageChange}
        />
        <h1 className="text-xl font-bold mb-4 text-center">
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

        <Button type="submit" className="mt-4">
          {tProfile("update")}
        </Button>

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
      </form>
    </section>
  );
}
