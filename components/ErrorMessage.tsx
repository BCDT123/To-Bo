import React from "react";

/**
 * Props for ErrorMessage
 * @property {string} message - The error message to display.
 * @property {string} [className] - Optional additional CSS classes.
 */
interface ErrorMessageProps {
  message: string;
  className?: string;
}

/**
 * ErrorMessage component
 *
 * Purpose:
 * - Displays an error message in red text.
 *
 * Parameters:
 * @param {ErrorMessageProps} props - Contains the message and optional className.
 *
 * Returns:
 * @returns {JSX.Element | null} The error message element, or null if no message.
 */
export default function ErrorMessage({
  message,
  className = "",
}: ErrorMessageProps) {
  if (!message) return null;
  return (
    <p className={`text-red-500 mt-2 ${className}`} role="alert">
      {message}
    </p>
  );
}
