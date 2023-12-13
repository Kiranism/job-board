import { ChangeEvent } from "react";

interface Props {
  labelId: string;
  type: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string | number | undefined;
  placeholder: string;
  children?: React.ReactNode;
  required?: boolean;
}

export default function Input({
  labelId,
  type,
  onChange,
  value,
  children,

  placeholder,

  required = false,
}: Props) {
  return (
    <div className="flex-1">
      <div className="flex justify-between align-center">
        <label
          htmlFor={labelId}
          className="block text-sm font-medium leading-6  text-fontdark"
        >
          {children}
          {children && required && <span className="text-red-500">*</span>}
        </label>
      </div>
      <div className="mt-1">
        <input
          id={labelId}
          className="block w-full rounded-md border-0 p-2 text-fontdark shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-placeholder focus:ring-1 focus:ring-inset focus:ring-black sm:text-sm sm:leading-6"
          name={labelId}
          type={type}
          placeholder={placeholder ?? ""}
          onChange={onChange}
          value={value}
          required={required}
        />
      </div>
    </div>
  );
}
