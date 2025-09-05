import React from "react";
type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function Button({ children, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className="flex flex-row justify-center items-center gap-2 rounded-lg cursor-pointer text-white bg-thistle tracking-widest uppercase px-4 py-3 
      hover:bg-thistle/90 transition-transform duration-300 ease-in-out transform hover:scale-115"
    >
      {children}
    </button>
  );
}
