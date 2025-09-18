import React, { ReactNode } from "react";

/**
 * Props for Button components
 * @property {ReactNode} children - Content to render inside the button.
 * @property {() => void} [onClick] - Optional click handler.
 * @property {boolean} [isActive] - Indicates if the button is active (for ButtonLink).
 * @property {string} [label] - Optional aria-label for accessibility.
 * @property {boolean} [disabled] - Indicates if the button is disabled.
 */
type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
  disabled?: boolean;
};

/**
 * Button component
 *
 * Purpose:
 * - Renders a styled button for general actions.
 *
 * Parameters:
 * @param {ButtonProps & React.InputHTMLAttributes<HTMLInputElement>} props - Button props and standard input attributes.
 *
 * Returns:
 * @returns {JSX.Element} The styled button element.
 */
export default function Button({
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-row w-full justify-center items-center gap-2 rounded-lg cursor-pointer text-white font-medium bg-thistle tracking-widest uppercase px-4 py-3 
      hover:bg-thistle/90 transition-transform duration-300 ease-in-out transform hover:scale-105 ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

/**
 * ButtonLink component
 *
 * Purpose:
 * - Renders a button styled as a navigation link.
 *
 * Parameters:
 * @param {ButtonProps} props - Button props including children, onClick, isActive, and label.
 *
 * Returns:
 * @returns {JSX.Element} The navigation link button element.
 */
export function ButtonLink({
  children,
  onClick,
  isActive,
  label,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className={`flex flex-col items-center justify-center text-sm focus:outline-none`}
      //    ${
      //   isActive ? "text-gray-700" : "text-gray-300"
      // } hover:text-gray-700 active:text-gray-700`}
    >
      {children}
    </button>
  );
}

/**
 * ButtonModalClose component
 *
 * Purpose:
 * - Renders a button for closing modals, positioned in the top-right corner.
 *
 * Parameters:
 * @param {ButtonProps & React.InputHTMLAttributes<HTMLInputElement>} props - Button props and standard input attributes.
 *
 * Returns:
 * @returns {JSX.Element} The modal close button element.
 */
export function ButtonModalClose({
  children,
  onClick,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
    >
      {children}
    </button>
  );
}

/**
 * Button component
 *
 * Purpose:
 * - Renders a styled button for general actions.
 *
 * Parameters:
 * @param {ButtonProps & React.InputHTMLAttributes<HTMLInputElement>} props - Button props and standard input attributes.
 *
 * Returns:
 * @returns {JSX.Element} The styled button element.
 */
export function ButtonSmall({
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-row justify-center items-center gap-2 rounded-lg cursor-pointer text-white bg-thistle tracking-widest uppercase p-2 
      hover:bg-thistle/90 transition-transform duration-300 ease-in-out transform hover:scale-105 ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}
