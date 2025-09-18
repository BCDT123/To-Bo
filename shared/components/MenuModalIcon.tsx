import React from "react";
import Overlay from "./Overlay";

export type MenuIconProps = {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: React.ReactNode;
  icon?: React.ReactNode;
  className?: string;
};

export default function MenuModalIcon({
  open,
  onOpen,
  onClose,
  children,
  icon,
  className = "",
}: MenuIconProps) {
  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="p-2 rounded-full hover:bg-thistle/50"
        onClick={open ? onClose : onOpen}
      >
        {icon}
      </button>
      {open && (
        <>
          <Overlay onClick={onClose} />
          <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg z-50">
            {children}
          </div>
        </>
      )}
    </div>
  );
}
