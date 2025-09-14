import * as yup from "yup";

/**
 * userProfileSchema
 *
 * Purpose:
 * - Defines the Yup validation schema for the user profile form.
 *
 * Returns:
 * @returns {yup.ObjectSchema} The validation schema for user profile data.
 */
export const userProfileSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name is too short"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  language: yup.string().required("Language is required"),
  photoUrl: yup.string().notRequired(),
});

/**
 * UserProfileFormData type
 *
 * Purpose:
 * - Infers the TypeScript type from the userProfileSchema for user profile form data.
 *
 * Returns:
 * @returns {UserProfileFormData} The inferred type for user profile form data.
 */
export type UserProfileFormData = yup.InferType<typeof userProfileSchema>;
