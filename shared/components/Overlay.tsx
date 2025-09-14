import React from "react";

type OverlayProps = {
  onClick?: () => void;
  className?: string;
};

export default function Overlay({ onClick, className = "" }: OverlayProps) {
  return (
    <div
      className={`fixed inset-0  bg-gray-100/60  z-40 ${className}`}
      onClick={onClick}
    />
  );
}
