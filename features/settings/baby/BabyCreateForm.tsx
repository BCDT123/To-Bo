"use client";
import React, { useState } from "react";
import { babyService } from "./babyService";
import { Baby } from "./babyModel";
import { InputForm, SelectForm, ColorInput } from "@/components/Input";
import Button from "@/components/Button";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/components/ErrorMessage";
import SuccessMessage from "@/components/SuccessMessage";
/**
 * BabyCreateForm component
 *
 * Purpose:
 * - Renders a form to create/register a new baby.
 * - Handles form state, validation, and submission.
 *
 * Returns:
 * @returns {JSX.Element} The baby registration form.
 */
export default function BabyCreateForm() {
  const tBaby = useTranslations("baby");
  const tHouse = useTranslations("house");
  const [form, setForm] = useState({
    name: "",
    gender: "",
    color: "#BEB6D9",
    birthday: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  /**
   * Handles input changes for the form fields
   */
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    console.log(form);
  };

  /**
   * Handles image file selection and preview
   */
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({
          ...prev,
          photoUrl: reader.result as string,
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  /**
   * Handles form submission to create a new baby
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.name.trim()) {
      setError("Name is required.");
      return;
    }
    if (!form.gender) {
      setError("Gender is required.");
      return;
    }
    if (!form.birthday) {
      setError("Birthday is required.");
      return;
    }

    try {
      const newBaby: Baby = {
        id: `${Date.now()}`,
        name: form.name,
        gender: form.gender,
        color: form.color,
        photoUrl: "",
        birthday: new Date(form.birthday),
        createdAt: new Date(),
      };

      await babyService.addBaby(newBaby);
      setSuccess("Baby registered successfully!");
      setForm({
        name: "",
        gender: "",
        color: "",
        birthday: "",
      });
    } catch (err: any) {
      setError(err.message || "Error registering baby.");
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col p-5 justify-between h-full"
      >
        <div>
          <h1 className="text-xl font-medium mb-4 text-center">
            {tBaby("register")}
          </h1>

          <InputForm
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder={tBaby("name")}
            required
          />

          <SelectForm
            name="gender"
            placeholder={tBaby("gender")}
            value={form.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </SelectForm>

          <ColorInput
            type="color"
            name="color"
            placeholder={tBaby("color")}
            value={form.color}
            onChange={handleChange}
          />
          <InputForm
            type="date"
            name="birthday"
            placeholder={tBaby("birthday")}
            value={form.birthday}
            onChange={handleChange}
            required
          />
          <SelectForm
            type="date"
            name="house"
            placeholder={tHouse("house")}
            //value={form.birthday}
            onChange={handleChange}
            required
          >
            <option value="">Select House</option>
            <option value="female">Gamez</option>
            <option value="male">Toro</option>
          </SelectForm>
        </div>
        <Button type="submit">Register</Button>

        <ErrorMessage message={error} />
        <SuccessMessage message={success} />
      </form>
    </section>
  );
}
