import { Controller, useFormContext } from "react-hook-form";
import CustomRadioGroup from "./CustomRadioGroup";
import Input from "./Input";
import { FormData } from "./MultiForm";

export default function CreateFormTwo() {
  const { control, formState } = useFormContext<FormData>();
  console.log("error", formState.errors);
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between gap-6">
        <Controller
          name="experience.min"
          control={control}
          render={({ field }) => (
            <Input
              placeholder="Minimum"
              label="Experience"
              type="number"
              error={formState.errors?.experience?.min?.message?.toString()}
              required
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          )}
        />

        <Controller
          name="experience.max"
          control={control}
          render={({ field }) => {
            return (
              <Input
                placeholder="Maximum"
                type="number"
                label=""
                error={formState.errors.experience?.max?.message?.toString()}
                required
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
          }}
        />
      </div>
      <div className="flex justify-between  gap-6">
        <Controller
          name="salary.min"
          control={control}
          render={({ field }) => {
            return (
              <Input
                placeholder="Minimum"
                label="Salary"
                type="number"
                error={formState.errors.salary?.min?.message?.toString()}
                required
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
          }}
        />
        <Controller
          name="salary.max"
          control={control}
          render={({ field }) => {
            return (
              <Input
                placeholder="Maximum"
                type="number"
                label=""
                error={formState.errors.salary?.max?.message?.toString()}
                required
                value={field.value!}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
          }}
        />
      </div>

      <Controller
        name="totalemployee"
        control={control}
        render={({ field }) => {
          return (
            <Input
              placeholder="ex. 100"
              label="Total employee"
              type="text"
              error={formState.errors.totalemployee?.message?.toString()}
              required
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />

      <Controller
        name="applytype"
        control={control}
        render={({ field }) => {
          return (
            <CustomRadioGroup
              value={field.value}
              error={formState.errors.applytype?.message?.toString()}
              required
              label="Apply type"
              options={[
                { value: "quickapply", label: "Quick apply" },
                { value: "externalapply", label: "External apply" },
              ]}
              onChange={field.onChange}
            />
          );
        }}
      />
    </div>
  );
}
