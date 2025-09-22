"use client";
import React, { useRef, useState } from "react";
import { houseService } from "@/modules/homeSettings/house/services/houseService";
import { House } from "../types/houseModel";
import { useTranslations } from "next-intl";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import SuccessMessage from "@/shared/components/atoms/SuccessMessage";
import FormField, { DynamicFormField } from "@/shared/components/FormField";
import { houseSchema, HouseFormData } from "../validation/houseSchema";

/**
 * Props for HouseForm component.
 *
 * @property {House | null} [house] - The house object to edit, or null to create a new one.
 * @property {(newHouse: House) => Promise<void>} onSubmit - Callback for submitting the form.
 * @property {() => void} onCancel - Callback for cancelling the form.
 */
type HouseFormProps = {
  house?: House | null;
  onSubmit: (newHouse: House) => Promise<void>;
  onCancel: () => void;
};

/**
 * Exported HouseForm component.
 *
 * Purpose:
 * - Renders a form to create or edit a house.
 * - Handles form submission, validation, and feedback messages.
 *
 * Parameters:
 * @param {HouseFormProps} props - Props containing house data and form handlers.
 *
 * Returns:
 * @returns {JSX.Element} The house form section with fields and feedback messages.
 */
export default function HouseForm({
  house,
  onSubmit,
  onCancel,
}: HouseFormProps): JSX.Element {
  const tHouse = useTranslations("house");
  const tCommon = useTranslations("common");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const formRef = useRef<{ reset: () => void }>(null);

  /**
   * Dynamic form fields for house data.
   */
  const fields: DynamicFormField<HouseFormData>[] = [
    { name: "name", label: tHouse("name"), type: "text", required: true },
  ];

  /**
   * Handles form submission for creating or editing a house.
   *
   * @param {HouseFormData} data - The form data for the house.
   * @returns {Promise<void>} Submits the data and updates feedback messages.
   */
  const handleSubmit = async (data: HouseFormData) => {
    setError("");
    setSuccess("");

    try {
      const newHouse: House = {
        ...data,
        id: house?.id || `${Date.now()}`,
        createdAt: house?.createdAt || new Date(),
        updatedAt: new Date(),
      };

      await houseService.addHouse(newHouse);
      setSuccess(tCommon("success"));
      onSubmit(newHouse);
      formRef.current?.reset();
    } catch (err: any) {
      setError(err.message || tCommon("error"));
    }
  };

  return (
    <section className="max-w-lg mx-auto p-6 h-full">
      <FormField<HouseFormData>
        ref={formRef}
        fields={fields}
        schema={houseSchema}
        defaultValues={{
          name: house?.name || "",
        }}
        onSubmit={handleSubmit}
        buttonLabel={house ? tCommon("edit") : tHouse("register")}
        titleLabel={house ? tCommon("edit") : tHouse("register")}
      />
      <ErrorMessage message={error} />
      <SuccessMessage message={success} />
    </section>
  );
}
