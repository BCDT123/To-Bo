import React from "react";
import { ButtonModalClose } from "./Button";
import { IoMdClose } from "react-icons/io";

/**
 * Props for Modal
 * @property {boolean} open - Indicates if the modal is visible.
 * @property {() => void} onClose - Callback to close the modal.
 * @property {React.ReactNode} children - Content to render inside the modal.
 */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

/**
 * Modal component
 *
 * Purpose:
 * - Renders a modal overlay positioned on the left side of the screen.
 * - Displays full screen on mobile and 1/3 width on desktop.
 * - Shows an overlay on the right side that closes the modal when clicked.
 *
 * Parameters:
 * @param {ModalProps} props - Contains open state, onClose callback, and children.
 *
 * Returns:
 * @returns {JSX.Element | null} The modal element if open, otherwise null.
 */
export default function Modal({ open, onClose, children }: ModalProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex">
      {/* Overlay on the right side */}
      <div
        className="flex-1 cursor-pointer bg-black bg-opacity-40 md:bg-transparent"
        onClick={onClose}
      />
      {/* Modal aligned to the left, 1/3 width on md+, full screen on mobile */}
      <div className="w-full h-full bg-white rounded-none md:rounded-r-lg shadow-lg relative flex flex-col max-w-none md:max-w-[33vw]">
        <ButtonModalClose onClick={onClose}>
          <IoMdClose />
        </ButtonModalClose>
        <div className="p-6 overflow-y-auto h-full">{children}</div>
      </div>
    </div>
  );
}
