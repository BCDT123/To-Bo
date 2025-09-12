import { useForm, DefaultValues } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

/**
 * useYupForm hook
 *
 * Purpose:
 * - Provides a generic hook to setup React Hook Form with Yup validation.
 *
 * Parameters:
 * @param schema - Yup validation schema.
 * @param defaultValues - Default values for the form.
 *
 * Returns:
 * @returns The React Hook Form methods and state.
 */
export function useYupForm<T extends yup.AnyObject>(
  schema: yup.ObjectSchema<any>,
  defaultValues: DefaultValues<T>
) {
  return useForm<T>({
    resolver: yupResolver(schema),
    defaultValues,
  });
}
