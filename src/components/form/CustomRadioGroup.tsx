import { RadioGroup } from "@headlessui/react";

type RadioOption = {
  value: string;
  label: string;
};

type CustomRadioGroupProps = {
  value: string;
  label: string;
  required: boolean;
  onChange: (value: string) => void;
  options: RadioOption[];
  error?: string;
};

const CustomRadioGroup: React.FC<CustomRadioGroupProps> = ({
  value,
  label,
  required,
  onChange,
  options,
  error,
}) => {
  return (
    <RadioGroup value={value} onChange={onChange}>
      <RadioGroup.Label>
        <label
          htmlFor={label}
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      </RadioGroup.Label>
      <div className="flex gap-4">
        {options.map((option) => (
          <RadioGroup.Option key={option.value} value={option.value}>
            {({ checked }) => (
              <div className="flex gap-1">
                <input
                  type="radio"
                  required={required}
                  checked={checked}
                  onChange={() => onChange(option.value)}
                />
                <label>{option.label}</label>
              </div>
            )}
          </RadioGroup.Option>
        ))}
      </div>
      <p className="text-xs mt-1 text-error">{error}</p>
    </RadioGroup>
  );
};

export default CustomRadioGroup;
