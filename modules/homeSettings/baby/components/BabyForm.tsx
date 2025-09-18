"use client";
import React, { useRef, useState } from "react";
import { babyService } from "@/modules/homeSettings/baby/services/babyService";
import { Baby } from "../types/babyModel";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import SuccessMessage from "@/shared/components/atoms/SuccessMessage";
import FormField, { DynamicFormField } from "@/shared/components/FormField";
import { babySchema, BabyFormData } from "../validation/babySchema";
import { formatDate } from "@/shared/utilities/toDate";

/**
 * Props for BabyForm component.
 *
 * @property {Baby | null} [baby] - The baby object to edit, or null to create a new one.
 * @property {(newBaby: Baby) => Promise<void>} onSubmit - Callback for submitting the form.
 * @property {() => void} onCancel - Callback for cancelling the form.
 */
type BabyFormProps = {
  baby?: Baby | null;
  onSubmit: (newBaby: Baby) => Promise<void>;
  onCancel: () => void;
};

/**
 * Exported BabyForm component.
 *
 * Purpose:
 * - Renders a form to create or edit a baby.
 * - Handles form submission, validation, and feedback messages.
 *
 * Parameters:
 * @param {BabyFormProps} props - Props containing baby data and form handlers.
 *
 * Returns:
 * @returns {JSX.Element} The baby form section with fields and feedback messages.
 */
export default function BabyForm({
  baby,
  onSubmit,
  onCancel,
}: BabyFormProps): JSX.Element {
  const tBaby = useTranslations("baby");
  const tCommon = useTranslations("common");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formRef = useRef<{ reset: () => void }>(null);

  /**
   * Dynamic form fields for baby data.
   */
  const fields: DynamicFormField<BabyFormData>[] = [
    { name: "photoUrl", label: tBaby("photo"), type: "image" },
    { name: "name", label: tBaby("name"), type: "text", required: true },
    {
      name: "gender",
      label: tBaby("gender"),
      type: "select",
      required: true,
      options: [
        { value: "female", label: tBaby("female") },
        { value: "male", label: tBaby("male") },
      ],
    },
    { name: "color", label: tBaby("color"), type: "color", required: true },
    {
      name: "birthDate",
      label: tBaby("birthDate"),
      type: "date",
      required: true,
    },
  ];

  /**
   * Handles form submission for creating or editing a baby.
   *
   * @param {BabyFormData} data - The form data for the baby.
   * @returns {Promise<void>} Submits the data and updates feedback messages.
   */
  const handleSubmit = async (data: BabyFormData) => {
    setError("");
    setSuccess("");

    try {
      const newBaby: Baby = {
        ...data,
        id: baby?.id || `${Date.now()}`,
        birthDate: new Date(data.birthDate),
        createdAt: new Date(),
      };

      await babyService.addBaby(newBaby);
      setSuccess(tCommon("success"));
      onSubmit(newBaby);
      formRef.current?.reset();
    } catch (err: any) {
      setError(err.message || tCommon("error"));
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 h-full">
      <FormField<BabyFormData>
        ref={formRef}
        fields={fields}
        schema={babySchema}
        defaultValues={{
          name: baby?.name || "",
          gender: baby?.gender || "",
          color: baby?.color || "#BEB6D9",
          birthDate: formatDate(baby?.birthDate),
          photoUrl: baby?.photoUrl || "",
        }}
        onSubmit={handleSubmit}
        buttonLabel={baby ? tCommon("edit") : tBaby("register")}
        titleLabel={baby ? tCommon("edit") : tBaby("register")}
      />
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />
    </section>
  );
}
