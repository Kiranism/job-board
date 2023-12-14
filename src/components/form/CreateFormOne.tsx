import { Controller, useFormContext } from "react-hook-form";
import Input from "./Input";

export default function CreateFormOne() {
  const { control, formState } = useFormContext();

  const renderInput = (
    name: string,
    placeholder: string,
    label: string,
    required: boolean
  ) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          return (
            <Input
              placeholder={placeholder}
              label={label}
              type="text"
              error={formState.errors[name]?.message?.toString()}
              required={required}
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />
    );
  };

  return (
    <div className="flex flex-col gap-6">
      {renderInput("jobtitle", "ex. UX UI Designer", "Job title", true)}
      {renderInput("company", "ex. Google", "Company name", true)}
      {renderInput("industry", "ex. Information Technology", "Industry", true)}

      <div className="flex justify-between gap-6">
        {renderInput("location", "ex. Chennai", "Location", false)}
        {renderInput("remotetype", "ex. In-office", "Remote Type", false)}
      </div>
    </div>
  );
}
