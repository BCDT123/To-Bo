import React from "react";

/**
 * InputWithIcon component
 *
 * Purpose:
 * - Renders an input field with an optional icon.
 * - Applies custom styling and focus effects.
 *
 * Parameters:
 * @param {React.ReactNode} [icon] - Optional icon to display.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Standard input props.
 *
 * Returns:
 * @returns {JSX.Element} The input element with icon.
 */
export default function InputWithIcon({
  icon,
  ...props
}: {
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center border border-thistle rounded-md p-2 focus-within:ring-2 focus-within:ring-thistle">
      {icon && <span className="mr-2 text-thistle">{icon}</span>}
      <input {...props} className="flex-1 outline-none bg-transparent" />
    </div>
  );
}

/**
 * InputForm component
 *
 * Purpose:
 * - Renders a labeled input field with optional icon.
 * - Supports different input types and custom styling.
 *
 * Parameters:
 * @param {React.ReactNode} [icon] - Optional icon to display.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Standard input props.
 *
 * Returns:
 * @returns {JSX.Element} The labeled input element.
 */
export function InputForm({
  icon,
  ...props
}: {
  icon?: React.ReactNode;
} & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex items-center w-full p-3 border-t-1 border-gray-200 hover:bg-gray-100">
      <label htmlFor={props.name} className="min-w-30">
        {props.placeholder}:
      </label>
      {icon && <span className="mr-2 text-thistle">{icon}</span>}

      <input
        {...props}
        className={`min-w-0 truncate outline-none ${
          props.type === "checkbox"
            ? "accent-thistle"
            : "flex-1 text-gray-500 focus:text-gray-700"
        }`}
      />
    </div>
  );
}

/**
 * SelectForm component
 *
 * Purpose:
 * - Renders a labeled select dropdown.
 * - Applies custom styling and supports children as options.
 *
 * Parameters:
 * @param {React.InputHTMLAttributes<HTMLSelectElement>} props - Standard select props.
 * @param {React.ReactNode} children - Option elements to render inside the select.
 *
 * Returns:
 * @returns {JSX.Element} The labeled select element.
 */
export function SelectForm({
  children,
  ...props
}: {} & React.InputHTMLAttributes<HTMLSelectElement>) {
  return (
    <div className="flex items-center w-full p-3 border-t-1 border-gray-200 hover:bg-gray-100">
      <label htmlFor={props.name} className="min-w-30">
        {props.placeholder}:
      </label>
      <select {...props} className="focus:outline-none flex-1 text-gray-500">
        {children}
      </select>
    </div>
  );
}

/**
 * ColorInput component
 *
 * Purpose:
 * - Renders a custom circular color input.
 * - Hides the native color input and displays a styled circle with the selected color.
 *
 * Parameters:
 * @param {React.InputHTMLAttributes<HTMLInputElement>} props - Standard input props.
 * @param {string} [color] - Optional color value to display in the circle.
 *
 * Returns:
 * @returns {JSX.Element} The custom color input element.
 */
export function ColorInput(
  props: React.InputHTMLAttributes<HTMLInputElement> & { color?: string }
) {
  const displayColor = props.color || (props.value as string) || "#BEB6D9"; // Default color

  return (
    <div className="flex items-center w-full p-3 border-t-1 border-gray-200 hover:bg-gray-100">
      <label htmlFor={props.name} className="min-w-30">
        {props.placeholder}:
      </label>
      <div className="relative flex items-center">
        <input
          {...props}
          type="color"
          className="absolute inset-0 w-10 h-10 opacity-0 cursor-pointer"
          style={{ zIndex: 2 }}
        />
        <div
          className="w-10 h-10 rounded-full border-2 border-gray-300"
          style={{
            backgroundColor: displayColor,
            zIndex: 1,
          }}
        />
      </div>
    </div>
  );
}
