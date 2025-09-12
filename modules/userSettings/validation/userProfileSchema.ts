import * as yup from "yup";

/**
 * Yup schema for user profile form validation
 */
export const userProfileSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(2, "Name is too short"),
  email: yup.string().email("Email is not valid").required("Email is required"),
  language: yup.string().required("Language is required"),
  photoUrl: yup.string().notRequired(),
});

/**
 * Type for user profile form data
 */
export type UserProfileFormData = yup.InferType<typeof userProfileSchema>;
