import CustomRadioGroup from "./CustomRadioGroup";
import Input from "./Input";
import { type applyType } from "./MultiForm";

type FormTwo = {
  experience: { min: number | null; max: number | null };
  salary: { min: number | null; max: number | null };
  totalemployee: string;
  applytype: applyType;
};

type AccountFormProps = FormTwo & {
  updateFields: (fields: Partial<FormTwo>) => void;
};

export default function CreateFormTwo({
  applytype,
  experience,
  salary,
  totalemployee,
  updateFields,
}: AccountFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end gap-6">
        <Input
          labelId="Minimum"
          required
          placeholder="Minimum"
          type="number"
          value={experience.min !== null ? Number(experience.min) : undefined}
          onChange={(e) =>
            updateFields({
              experience: { ...experience, min: Number(e.target.value) },
            })
          }
        >
          Experience
        </Input>
        <Input
          labelId="Maximum"
          required
          placeholder="Maximum"
          type="number"
          value={experience.max !== null ? Number(experience.max) : undefined}
          onChange={(e) =>
            updateFields({
              experience: { ...experience, max: Number(e.target.value) },
            })
          }
        />
      </div>
      <div className="flex justify-between items-end gap-6">
        <Input
          labelId="Minimum"
          required
          placeholder="Minimum"
          type="number"
          value={salary.min !== null ? Number(salary.min) : undefined}
          onChange={(e) =>
            updateFields({ salary: { ...salary, min: Number(e.target.value) } })
          }
        >
          Salary
        </Input>
        <Input
          labelId="Maximum"
          required
          placeholder="Maximum"
          type="text"
          value={salary.max !== null ? Number(salary.max) : undefined}
          onChange={(e) =>
            updateFields({ salary: { ...salary, max: Number(e.target.value) } })
          }
        />
      </div>
      <Input
        labelId="totalemployee"
        required
        placeholder="ex. 100"
        type="text"
        value={totalemployee}
        onChange={(e) => updateFields({ totalemployee: e.target.value })}
      >
        Total employee
      </Input>
      <CustomRadioGroup
        value={applytype}
        required
        label="Apply type"
        options={[
          { value: "quickapply", label: "Quick apply" },
          { value: "externalapply", label: "External apply" },
        ]}
        onChange={(value) => updateFields({ applytype: value as applyType })}
      />
    </div>
  );
}
