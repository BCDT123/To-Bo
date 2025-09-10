import React, { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
  isActive?: boolean;
  label?: string;
  disabled?: boolean;
};

export default function Button({
  children,
  onClick,
  disabled,
  ...props
}: ButtonProps & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`flex flex-row justify-center items-center gap-2 rounded-lg cursor-pointer text-white bg-thistle tracking-widest uppercase px-4 py-3 
      hover:bg-thistle/90 transition-transform duration-300 ease-in-out transform hover:scale-115 ${
        props.className ?? ""
      }`}
    >
      {children}
    </button>
  );
}

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
      className={`flex flex-col items-center justify-center text-sm focus:outline-none ${
        isActive ? "text-gray-700" : "text-gray-400"
      } hover:text-gray-700 active:text-gray-700`}
    >
      {children}
    </button>
  );
}
