import { ChangeEvent } from "react";

interface Props {
  label?: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  placeholder: string;
  required?: boolean;
  error?: string;
}

export default function Input({
  label,
  type,
  onChange,
  value,
  error,
  placeholder,

  required = false,
}: Props) {
  return (
    <div className="flex-1">
      <div className="flex justify-between align-center">
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6  text-fontdark"
        >
          {label}
          {label && required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="mt-1">
        <input
          id={label}
          className="block w-full rounded-md border-0 p-2 text-fontdark shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-placeholder focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          name={label}
          type={type}
          placeholder={placeholder ?? ""}
          onChange={onChange}
          value={value}
        />
        <p className="text-xs mt-1 text-error">{error}</p>
      </div>
    </div>
  );
}
