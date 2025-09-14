import React, { forwardRef, useImperativeHandle } from "react";
import { useYupForm } from "@/shared/utilities/formValidation";
import ErrorMessage from "@/shared/components/atoms/ErrorMessage";
import Button from "@/shared/components/atoms/Button";
import {
  InputForm,
  SelectForm,
  ColorInput,
} from "@/shared/components/atoms/Input";
import UserImageEdit from "@/shared/components/atoms/UserImageEdit";
import { Path } from "react-hook-form";

/**
 * Field definition for DynamicForm
 */
export type DynamicFormField<T> = {
  name: Path<T>;
  label: string;
  type: "text" | "email" | "select" | "color" | "date" | "image";
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
  onSubmit: (data: T, imageFile?: File) => void;
  buttonLabel?: string;
  titleLabel?: string;
};

/**
 * DynamicForm component
 *
 * Purpose:
 * - Renders a dynamic form based on field definitions and validation schema.
 * - Uses InputForm, SelectForm, and UserImageEdit for consistent UI.
 *
 * Parameters:
 * @param {DynamicFormProps<T>} props - Form fields, schema, default values, and submit handler.
 *
 * Returns:
 * @returns {JSX.Element} The dynamic form element.
 */
type FormFieldComponent = <T>(
  props: DynamicFormProps<T> & React.RefAttributes<{ reset: () => void }>
) => JSX.Element;

const FormField = forwardRef(function FormField<T>(
  {
    fields,
    schema,
    defaultValues,
    onSubmit,
    buttonLabel = "Submit",
    titleLabel,
  }: DynamicFormProps<T>,
  ref: React.ForwardedRef<{ reset: () => void }>
) {
  const [imageFile, setImageFile] = React.useState<File | undefined>(undefined);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useYupForm<T>(schema, defaultValues);

  // Expose reset method to parent
  useImperativeHandle(ref, () => ({
    reset,
  }));

  // Watch photoUrl for preview
  const imageField = fields.find((f) => f.type === "image");
  const photoUrl = imageField
    ? (watch(imageField.name) as string | undefined)
    : undefined;

  const nameField = fields.find((f) => f.name === "name");
  const name = nameField
    ? (watch(nameField.name) as string | undefined)
    : undefined;

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

  return (
    <form
      onSubmit={handleSubmit((data) => onSubmit(data, imageFile))}
      className="flex flex-col h-full"
    >
      {titleLabel && (
        <h1 className="text-xl font-medium mb-4 text-center">{titleLabel}</h1>
      )}
      <div>
        {fields.map((field) => {
          if (field.type === "image") {
            return (
              <div key={field.name} className="flex flex-col items-center">
                <UserImageEdit
                  photoUrl={photoUrl || ""}
                  name={name || ""}
                  onImageChange={handleImageChange}
                />
                <ErrorMessage message={errors[field.name]?.message as string} />
              </div>
            );
          }
          if (field.type === "color") {
            const colorValue = watch(field.name) as string | undefined;
            return (
              <div key={field.name}>
                <ColorInput
                  {...register(field.name)}
                  name={field.name}
                  placeholder={field.placeholder || field.label}
                  required={field.required}
                  className={field.className}
                  value={colorValue}
                  color={colorValue} // <-- custom prop for the circle
                />
                <ErrorMessage
                  message={
                    errors[field.name as keyof typeof errors]?.message as string
                  }
                />
              </div>
            );
          }

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
                <ErrorMessage
                  message={
                    errors[field.name as keyof typeof errors]?.message as string
                  }
                />
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
              <ErrorMessage
                message={
                  errors[field.name as keyof typeof errors]?.message as string
                }
              />
            </div>
          );
        })}
      </div>
      <div className="flex-1 flex items-end w-full">
        <Button
          type="submit"
          className=" disabled:bg-gray-300"
          disabled={isSubmitting || !isDirty}
        >
          {buttonLabel}
        </Button>
      </div>
    </form>
  );
}) as FormFieldComponent;

export default FormField;
