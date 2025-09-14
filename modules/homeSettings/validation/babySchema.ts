import * as yup from "yup";

/**
 * babySchema
 *
 * Purpose:
 * - Defines the Yup validation schema for the baby registration form.
 *
 * Returns:
 * @returns {yup.ObjectSchema} The validation schema for baby form data.
 */
export const babySchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name is too short"),
  gender: yup.string().required("Gender is required"),
  color: yup.string().required("Color is required"),
  birthDate: yup
    .date()
    .typeError("Birth date is required")
    .required("Birth date is required"),
  photoUrl: yup.string().notRequired(),
});

/**
 * BabyFormData type
 *
 * Purpose:
 * - Infers the TypeScript type from the babySchema for baby form data.
 *
 * Returns:
 * @returns {BabyFormData} The inferred type for baby form data.
 */
export type BabyFormData = yup.InferType<typeof babySchema>;
