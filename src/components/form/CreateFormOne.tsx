import Input from "./Input";

type FormOne = {
  jobtitle: string;
  company: string;
  industry: string;
  location: string;
  remotetype: string;
};

type AccountFormProps = FormOne & {
  updateFields: (fields: Partial<FormOne>) => void;
};

export default function CreateFormOne({
  jobtitle,
  company,
  industry,
  location,
  remotetype,
  updateFields,
}: AccountFormProps) {
  return (
    <div className="flex flex-col gap-6">
      <Input
        labelId="email"
        required
        placeholder="ex. UX UI Designer"
        type="text"
        value={jobtitle}
        onChange={(e) => updateFields({ jobtitle: e.target.value })}
      >
        Job title
      </Input>

      <Input
        labelId="companyname"
        required
        placeholder="ex. Google"
        type="text"
        value={company}
        onChange={(e) => updateFields({ company: e.target.value })}
      >
        Company name
      </Input>
      <Input
        labelId="industry"
        required
        placeholder="ex. Information Technology"
        type="text"
        value={industry}
        onChange={(e) => updateFields({ industry: e.target.value })}
      >
        Industry
      </Input>
      <div className="flex justify-between gap-6">
        <Input
          labelId="location"
          required
          placeholder="ex. Chennai"
          type="text"
          value={location}
          onChange={(e) => updateFields({ location: e.target.value })}
        >
          Location
        </Input>
        <Input
          labelId="remotetype"
          required
          placeholder="ex. In-office"
          type="text"
          value={remotetype}
          onChange={(e) => updateFields({ remotetype: e.target.value })}
        >
          Remote Type
        </Input>
      </div>
    </div>
  );
}
