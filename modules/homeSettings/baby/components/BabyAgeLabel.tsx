import React from "react";
import { useBabyAge } from "@/shared/hooks/useBabyAge";

/**
 * Props for BabyAgeLabel component.
 *
 * @property {Date | string | number | { seconds: number; nanoseconds: number }} [birthDate] - The birth date of the baby. Can be a Date object, string, number, or Firestore Timestamp.
 * @property {string} [className] - Optional CSS class for styling.
 */
type Props = {
  birthDate?: Date | string | number | { seconds: number; nanoseconds: number };
  className?: string;
};

/**
 * Exported BabyAgeLabel component.
 *
 * Purpose:
 * - Displays the baby's age as a label.
 * - Uses the useBabyAge hook to calculate age from birthDate.
 *
 * Parameters:
 * @param {Props} props - Props containing birthDate and optional className.
 *
 * Returns:
 * @returns {JSX.Element} A span element showing the baby's age or a placeholder if not available.
 */
export default function BabyAgeLabel({
  birthDate,
  className = "",
}: Props): JSX.Element {
  const ageText = useBabyAge(birthDate);

  if (!ageText) {
    return <span className={`text-xs text-gray-400 ${className}`}>—</span>;
  }

  return (
    <span
      className={`min-w-0 truncate text-xs text-gray-500 ${className}`}
      aria-label={`Age: ${ageText}`}
    >
      {ageText}
    </span>
  );
}
