import React, { ReactNode } from "react";

/**
 * Props for UnifiedButton component.
 *
 * @property {ReactNode} children - Content to render inside the button.
 * @property {"primary" | "secondary" | "tertiary"} variant - Visual style of the button.
 * @property {"left" | "center" | "right"} align - Alignment of the button content.
 * @property {() => void} [onClick] - Optional click handler.
 * @property {string} [className] - Optional CSS class for styling.
 * @property {boolean} [disabled] - Indicates if the button is disabled.
 * @property {string} [type] - Button type, defaults to "button".
 * @property {string} [ariaLabel] - Accessibility label.
 */
export type ButtonProps = {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  align?: "left" | "center" | "right";
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  ariaLabel?: string;
};

/**
 * Exported UnifiedButton component.
 *
 * Purpose:
 * - Renders a scalable button with unified styles for primary, secondary, and tertiary variants.
 * - Supports content alignment: left, center, or right.
 *
 * Parameters:
 * @param {ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>} props - Button props and standard button attributes.
 *
 * Returns:
 * @returns {JSX.Element} The styled button element.
 */
export default function Button({
  children,
  variant = "primary",
  align = "center",
  onClick,
  className = "",
  disabled = false,
  type = "button",
  ariaLabel,
  ...props
}: ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement>): React.ReactElement {
  // Alignment classes
  const alignments: Record<NonNullable<ButtonProps["align"]>, string> = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  // Unified style definitions for each variant
  const baseStyles =
    "flex flex-row items-center gap-2 rounded-lg cursor-pointer font-medium tracking-widest uppercase  transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none p-3 disabled:bg-gray-300";

  const variants: Record<string, string> = {
    primary: "bg-thistle text-white hover:bg-thistle/90 active:bg-thistle/80",
    secondary:
      "bg-white text-thistle border border-thistle hover:bg-thistle/10 active:bg-thistle/20",
    tertiary:
      "bg-transparent text-gray-700 hover:text-thistle active:text-thistle/80",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`${baseStyles} ${alignments[align]} ${
        variants[variant]
      } ${className} ${disabled ? "opacity-50 cursor-not-allowed" : ""}`}
      {...props}
    >
      {children}
    </button>
  );
}

/**
 * Usage Example:
 * <Button variant="primary" align="center">Primary</Button>
 * <Button variant="secondary" align="left">Secondary</Button>
 * <Button variant="tertiary" align="right">Tertiary</Button>
 */

export function ButtonRoundIcon({
  children,
  className = "",
  onClick,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`text-2xl hover:bg-thistle hover:rounded-full p-2 hover:text-white disabled:bg-gray-300 cursor-pointer   transition-transform duration-300 ease-in-out transform hover:scale-105  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// absolute top-4 right-4
// absolute top-2
