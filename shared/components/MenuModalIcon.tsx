import React from "react";
import Overlay from "./Overlay";
import { ButtonRoundIcon } from "./atoms/Button";

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
      <ButtonRoundIcon
        onClick={open ? onClose : onOpen}
        className="absolute top-0 right-0 "
      >
        {icon}
      </ButtonRoundIcon>
      {open && (
        <>
          <Overlay onClick={onClose} />
          <div className="absolute right-0 mt-2 bg-white rounded shadow-lg z-50">
            {children}
          </div>
        </>
      )}
    </div>
  );
}
