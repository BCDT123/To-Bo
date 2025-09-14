"use client";
import React, { useRef, useState } from "react";
import { babyService } from "../services/babyService";
import { Baby } from "../types/babyModel";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import SuccessMessage from "@/shared/components/atoms/SuccessMessage";
import FormField, { DynamicFormField } from "@/shared/components/FormField";
import { babySchema, BabyFormData } from "../validation/babySchema";

/**
 * BabyCreateForm component
 *
 * Purpose:
 * - Renders a form to create/register a new baby using the dynamic FormField component.
 * - Handles form submission and displays error/success messages.
 *
 * Returns:
 * @returns {JSX.Element} The baby registration form.
 */
type BabyCreateFormProps = {
  onSubmit: (newBaby: any) => Promise<void>;
  onCancel: () => void;
};

export default function BabyCreateForm({
  onSubmit,
  onCancel,
}: BabyCreateFormProps) {
  const tBaby = useTranslations("baby");
  const tHouse = useTranslations("house");
  const tCommon = useTranslations("common");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formRef = useRef<{ reset: () => void }>(null);

  /**
   * Fields definition for the dynamic form
   */
  const fields: DynamicFormField<BabyFormData>[] = [
    {
      name: "photoUrl",
      label: tBaby("photo"),
      type: "image",
    },
    {
      name: "name",
      label: tBaby("name"),
      type: "text",
      required: true,
      placeholder: tBaby("name"),
    },
    {
      name: "gender",
      label: tBaby("gender"),
      type: "select",
      required: true,
      options: [
        { value: "female", label: tBaby("female") },
        { value: "male", label: tBaby("male") },
      ],
      placeholder: tBaby("gender"),
    },
    {
      name: "color",
      label: tBaby("color"),
      type: "color",
      required: true,
      placeholder: tBaby("color"),
    },
    {
      name: "birthDate",
      label: tBaby("birthDate"),
      type: "date",
      required: true,
      placeholder: tBaby("birthDate"),
    },
    // If you have houses, add the select field for house here
    // {
    //   name: "house",
    //   label: tHouse("house"),
    //   type: "select",
    //   required: true,
    //   options: [
    //     { value: "gamez", label: "Gamez" },
    //     { value: "toro", label: "Toro" },
    //   ],
    //   placeholder: tHouse("house"),
    // },
  ];

  /**
   * Handles form submission to create a new baby
   *
   * @param {BabyFormData} data - The form data.
   * @param {File | undefined} imageFile - The selected image file.
   * @returns {Promise<void>} Registers the baby and sets success or error messages.
   */
  const handleSubmit = async (data: BabyFormData, imageFile?: File) => {
    setError("");
    setSuccess("");

    try {
      const newBaby: Baby = {
        ...data,
        id: `${Date.now()}`,
        photoUrl: data.photoUrl ?? "",
        birthDate: new Date(data.birthDate),
        createdAt: new Date(),
      };

      await babyService.addBaby(newBaby);
      setSuccess("Baby registered successfully!");
      onSubmit(newBaby);

      // Only reset the form if registration was successful
      if (formRef.current) {
        formRef.current.reset();
      }
    } catch (err: any) {
      setError(err.message || "Error registering baby.");
    }
  };

  /**
   * Renders the baby registration form section
   */
  return (
    <section className="max-w-lg mx-auto p-6 h-full">
      <FormField<BabyFormData>
        ref={formRef}
        fields={fields}
        schema={babySchema}
        defaultValues={{
          name: "",
          gender: "",
          color: "#BEB6D9",
          birthDate: "",
          photoUrl: "",
        }}
        onSubmit={handleSubmit}
        buttonLabel={tBaby("register")}
        titleLabel={tBaby("register")}
      />
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />
    </section>
  );
}
