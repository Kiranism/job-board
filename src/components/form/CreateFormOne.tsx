import { Controller, useFormContext } from "react-hook-form";
import Input from "./Input";

type FormOne = {
  jobtitle: string;
  company: string;
  industry: string;
  location: string;
  remotetype: string;
};

export default function CreateFormOne() {
  const { control, formState } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <Controller
        name="jobtitle"
        control={control}
        render={({ field }) => {
          return (
            <Input
              placeholder="ex. UX UI Designer"
              label="Job title"
              type="text"
              error={formState.errors.jobtitle?.message?.toString()}
              required
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />

      <Controller
        name="company"
        control={control}
        render={({ field }) => {
          return (
            <Input
              placeholder="ex. Google"
              label="Company name"
              type="text"
              error={formState.errors.company?.message?.toString()}
              required
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />

      <Controller
        name="industry"
        control={control}
        render={({ field }) => {
          return (
            <Input
              placeholder="ex. Information Technology"
              label="Industry"
              type="text"
              error={formState.errors.industry?.message?.toString()}
              required
              value={field.value}
              onChange={(e) => field.onChange(e.target.value)}
            />
          );
        }}
      />

      <div className="flex justify-between gap-6">
        <Controller
          name="location"
          control={control}
          render={({ field }) => {
            return (
              <Input
                placeholder="ex. Chennai"
                label="Location"
                type="text"
                error={formState.errors.location?.message?.toString()}
                required
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
          }}
        />

        <Controller
          name="remotetype"
          control={control}
          render={({ field }) => {
            return (
              <Input
                placeholder="ex. In-office"
                label="Remote Type"
                type="text"
                error={formState.errors.company?.message?.toString()}
                required
                value={field.value}
                onChange={(e) => field.onChange(e.target.value)}
              />
            );
          }}
        />
      </div>
    </div>
  );
}
