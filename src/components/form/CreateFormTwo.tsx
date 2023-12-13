import CustomRadioGroup from "./CustomRadioGroup";
import Input from "./Input";
import { applyType } from "./MultiForm";

type FormTwo = {
  experience: { min: string; max: string };
  salary: { min: string; max: string };
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
          type="text"
          value={experience.min}
          onChange={(e) =>
            updateFields({ experience: { ...experience, min: e.target.value } })
          }
        >
          Experience
        </Input>
        <Input
          labelId="Maximum"
          required
          placeholder="Maximum"
          type="text"
          value={experience.max}
          onChange={(e) =>
            updateFields({ experience: { ...experience, max: e.target.value } })
          }
        />
      </div>
      <div className="flex justify-between items-end gap-6">
        <Input
          labelId="Minimum"
          required
          placeholder="Minimum"
          type="text"
          value={salary.min}
          onChange={(e) =>
            updateFields({ salary: { ...salary, min: e.target.value } })
          }
        >
          Salary
        </Input>
        <Input
          labelId="Maximum"
          required
          placeholder="Maximum"
          type="text"
          value={salary.max}
          onChange={(e) =>
            updateFields({ salary: { ...salary, max: e.target.value } })
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
