/**
 * Props for Divider
 * @property {string} text - The text to display in the center of the divider.
 */
type DividerProps = {
  text: string;
};

/**
 * Divider component
 *
 * Purpose:
 * - Renders a horizontal divider with centered text.
 *
 * Parameters:
 * @param {DividerProps} props - Contains the text to display.
 *
 * Returns:
 * @returns {JSX.Element} The divider element with text.
 */
export default function Divider({ text }: DividerProps) {
  return (
    <div className="flex items-center my-4">
      <div className="flex-grow h-px bg-gray-300" />
      <span className="mx-4 text-gray-500 text-sm">{text}</span>
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  );
}

/**
 * DividerLine component
 *
 * Purpose:
 * - Renders a simple horizontal divider line.
 *
 * Parameters:
 * - None
 *
 * Returns:
 * @returns {JSX.Element} The divider line element.
 */
export function DividerLine() {
  return (
    <div className="flex items-center">
      <div className="flex-grow h-px bg-gray-300" />
    </div>
  );
}
