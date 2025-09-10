import React from "react";

interface SuccessMessageProps {
  message: string;
  className?: string;
}

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
