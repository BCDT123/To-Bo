import React from "react";
import { useYupForm } from "@/shared/utilities/formValidation";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import Button from "@/shared/components/atoms/Button";
import { InputForm, SelectForm } from "@/shared/components/atoms/Input";
import { Path } from "react-hook-form";

/**
 * Field definition for DynamicForm
 */
export type DynamicFormField<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "email" | "select" | "color" | "date";
  options?: { value: string; label: string }[]; // For select
  required?: boolean;
  placeholder?: string;
  className?: string;
};

/**
 * Props for DynamicForm
 */
export type DynamicFormProps<T> = {
  fields: DynamicFormField<T>[];
  schema: any;
  defaultValues: T;
  onSubmit: (data: T) => void;
  buttonLabel?: string;
};

/**
 * DynamicForm component
 *
 * Purpose:
 * - Renders a dynamic form based on field definitions and validation schema.
 * - Uses InputForm and SelectForm for consistent UI.
 *
 * Parameters:
 * @param {DynamicFormProps<T>} props - Form fields, schema, default values, and submit handler.
 *
 * Returns:
 * @returns {JSX.Element} The dynamic form element.
 */
export default function DynamicForm<T>({
  fields,
  schema,
  defaultValues,
  onSubmit,
  buttonLabel = "Submit",
}: DynamicFormProps<T>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useYupForm<T>(schema, defaultValues);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      {fields.map((field) => {
        if (field.type === "select" && field.options) {
          return (
            <div key={field.name}>
              <SelectForm
                {...register(field.name)}
                name={field.name}
                placeholder={field.placeholder || field.label}
                required={field.required}
                className={field.className}
              >
                {field.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </SelectForm>
              <ErrorMessage message={errors[field.name]?.message as string} />
            </div>
          );
        }
        return (
          <div key={field.name}>
            <InputForm
              {...register(field.name)}
              type={field.type}
              name={field.name}
              placeholder={field.placeholder || field.label}
              required={field.required}
              className={field.className}
            />
            <ErrorMessage message={errors[field.name]?.message as string} />
          </div>
        );
      })}
      <Button type="submit">{buttonLabel}</Button>
    </form>
  );
}
