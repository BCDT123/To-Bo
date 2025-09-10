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
        className={`outline-none  ${
          props.type === "checkbox"
            ? "accent-thistle"
            : "flex-1 text-gray-500 focus:text-gray-700"
        }`}
      />
    </div>
  );
}
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
