import CreateFormOne from "@/components/form/CreateFormOne";
import CreateFormTwo from "@/components/form/CreateFormTwo";
import useMultistepForm from "@/hooks/useMultistepForm";
import { createJobs, getJobsWithId, updateJobs } from "@/lib/api";
import { FormEvent, useEffect, useState } from "react";
import useJobs from "../context/JobContext";
import Button from "./Button";
import LoadingFormSkeleton from "./LoadingFormSkeleton";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
// export type applyType = "quickapply" | "externalapply" | "";

// export type FormData = {
//   jobtitle: string;
//   company: string;
//   industry: string;
//   location: string;
//   remotetype: string;
//   experience: { min: number | null; max: number | null };
//   salary: { min: number | null; max: number | null };
//   totalemployee: string;
//   applytype: applyType;
// };

const applyTypeSchema = z.union([
  z.literal("quickapply"),
  z.literal("externalapply"),
  z.literal(""),
]);

export type applyType = z.infer<typeof applyTypeSchema>;

const rangeSchema = z.object({
  min: z.number().refine((value) => value !== null || value >= 0, {
    message: "Minimum value must be a non-negative number",
  }),
  max: z
    .number()
    .nullable()
    .refine((value) => value === null || value >= 0, {
      message: "Maximum value must be a non-negative number",
    }),
});

const formDataSchema = z.object({
  jobtitle: z.string().min(1, { message: "Job title is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  location: z.string().min(1, { message: "Location is required" }),
  remotetype: z.string().min(1, { message: "Remote type is required" }),
  experience: z.object({
    min: z.string().min(1, { message: "Remote type is required" }),
    max: z.string(),
  }),
  salary: rangeSchema,
  totalemployee: z.string(),
  applytype: applyTypeSchema,
});

export type FormData = z.infer<typeof formDataSchema>;

export default function MutliForm({
  id,
  isEdit,
  closeModal,
}: {
  id: string | undefined;
  isEdit?: boolean;
  closeModal: () => void;
}) {
  const INITIAL_DATA: FormData = {
    jobtitle: "",
    company: "",
    industry: "",
    location: "",
    remotetype: "",
    experience: { min: "", max: "" },
    salary: { min: 0, max: null },
    totalemployee: "",
    applytype: "",
  };

  const [data, setData] = useState(INITIAL_DATA);
  const { fetchData: refetch } = useJobs();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsFetching(true);
        const jobs = await getJobsWithId(id as string);
        setData(jobs);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsFetching(false);
      }
    };

    id && fetchData();
  }, [id]);

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: INITIAL_DATA,
    mode: "onChange",
  });

  const steps = [
    {
      id: "step1",
      name: "Job creation 1",
      fields: ["jobtitle", "company", "industry", "location", "remotetype"],
    },
    {
      id: "step2",
      name: "Job creation 2",
      fields: [
        "experience.min",
        "experience.max",
        "salary.min",
        "salary.max",
        "totalemployee",
        "applytype",
      ],
    },
  ];

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, isLastStep, next } = useMultistepForm([
    <CreateFormOne />,
    <CreateFormTwo />,
  ]);

  console.log("error", form.formState.errors);
  type FieldName = keyof FormData;
  const onSubmit: SubmitHandler<FormData> = async () => {
    console.log("isLastsete", isLastStep);
    next();
    if (isLastStep) {
      setIsLoading(true);
      const fields = steps[currentStepIndex - 0].fields;
      console.log("fields?", fields);
      const output = await form.trigger(fields as FieldName[], {
        shouldFocus: true,
      });

      // if (!output) return;
      try {
        if (isEdit && id) {
          const updateRes = await updateJobs(data, id);
          console.log("updated data=>", updateRes);
        } else {
          const createRes = await createJobs(data);
          console.log("data=>", createRes);
        }
      } catch (error) {
        console.log("error", error);
      } finally {
        setIsLoading(false);
      }

      closeModal();
      refetch();
    } else {
      next();
    }
  };

  const title = isEdit ? "Edit Job" : "Create Job";

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex justify-between font-normal text-xl py-3 mb-2">
            <h1>{title}</h1>
            {`Step ${currentStepIndex + 1}`}
          </div>
          {isFetching ? <LoadingFormSkeleton /> : step}
          <div className="mt-24 flex justify-end">
            <Button type="submit" isLoading={isLoading}>
              {isLastStep ? "Finish" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
