import React from "react";
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
