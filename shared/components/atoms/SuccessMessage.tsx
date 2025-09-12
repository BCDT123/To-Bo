import React from "react";

/**
 * Props for SuccessMessage
 * @property {string} message - The success message to display.
 * @property {string} [className] - Optional additional CSS classes.
 */
interface SuccessMessageProps {
  message: string;
  className?: string;
}

/**
 * SuccessMessage component
 *
 * Purpose:
 * - Displays a success message in green text.
 *
 * Parameters:
 * @param {SuccessMessageProps} props - Contains the message and optional className.
 *
 * Returns:
 * @returns {JSX.Element | null} The success message element, or null if no message.
 */
export default function SuccessMessage({
  message,
  className = "",
}: SuccessMessageProps) {
  if (!message) return null;
  return (
    <p className={`text-green-600 ${className}`} role="success">
      {message}
    </p>
  );
}
