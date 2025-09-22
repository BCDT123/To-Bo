import * as yup from "yup";

/**
 * houseSchema
 *
 * Purpose:
 * - Defines the Yup validation schema for the house registration form.
 * - Only validates the house name.
 *
 * Returns:
 * @returns {yup.ObjectSchema} The validation schema for house form data.
 */
export const houseSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name is too short"),
});

/**
 * HouseFormData type
 *
 * Purpose:
 * - Infers the TypeScript type from the houseSchema for house form data.
 *
 * Returns:
 * @returns {HouseFormData} The inferred type for house form data.
 */
export type HouseFormData = yup.InferType<typeof houseSchema>;
