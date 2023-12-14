import CreateFormOne from "@/components/form/CreateFormOne";
import CreateFormTwo from "@/components/form/CreateFormTwo";
import useMultistepForm from "@/hooks/useMultistepForm";
import { createJobs, getJobsWithId, updateJobs } from "@/lib/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import useJobs from "../context/JobContext";
import Button from "./Button";
import LoadingFormSkeleton from "./LoadingFormSkeleton";

const formDataSchema = z.object({
  jobtitle: z.string().min(1, { message: "Job title is required" }),
  company: z.string().min(1, { message: "Company is required" }),
  industry: z.string().min(1, { message: "Industry is required" }),
  location: z.string().optional(),
  remotetype: z.string().optional(),
  experience: z.object({
    min: z.coerce
      .number({
        required_error: "Minimum experience is required",
        invalid_type_error: "Minimum experience must be a number",
      })
      .min(0, { message: "Minimum experience is required" }),
    max: z.coerce
      .number({
        required_error: "Maximum experience is required",
        invalid_type_error: "Maximum experience must be a number",
      })
      .min(1, { message: "Maximum experience is required" }),
  }),
  salary: z.object({
    min: z.coerce.number({
      required_error: "Minimum salary is required",
      invalid_type_error: "Minimum salary must be a number",
    }),
    max: z.coerce.number({
      required_error: "Maximum salary is required",
      invalid_type_error: "Maximum salary must be a number",
    }),
  }),
  totalemployee: z
    .string()
    .min(1, { message: "Total employee count is required" }),
  applytype: z
    .string()
    .refine((value) => value === "quickapply" || value === "externalapply", {
      message: "Invalid value, expected 'quickapply' or 'externalapply'.",
    }),
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
  const { fetchData: refetch } = useJobs();
  const [isLoading, setIsLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(false);

  const fetchData = async () => {
    try {
      setIsFetching(true);
      const jobs = await getJobsWithId(id as string);
      return jobs;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsFetching(false);
    }
  };

  const form = useForm<FormData>({
    resolver: zodResolver(formDataSchema),
    defaultValues: async () => id && fetchData(),
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

  const { currentStepIndex, step, isLastStep, next } = useMultistepForm([
    <CreateFormOne />,
    <CreateFormTwo />,
  ]);

  type FieldName = keyof FormData;

  console.log("form", form.formState.errors);

  const processForm: SubmitHandler<FormData> = async (data) => {
    try {
      const res =
        isEdit && id ? await updateJobs(data, id) : await createJobs(data);
      console.log(isEdit ? "updated data=>" : "data=>", res);
    } catch (error) {
      console.log("error", error);
    } finally {
      setIsLoading(false);
    }
    closeModal();
    refetch();
  };

  const onNext = async () => {
    const { fields } = steps[currentStepIndex];
    const output = await form.trigger(fields as FieldName[], {
      shouldFocus: true,
    });
    if (!output) return;
    isLastStep ? await form.handleSubmit(processForm)() : next();
  };

  const title = isEdit ? "Edit Job" : "Create Job";

  return (
    <div>
      <FormProvider {...form}>
        <form onSubmit={form.handleSubmit(processForm)}>
          <div className="flex justify-between font-normal text-xl py-3 mb-2">
            <h1>{title}</h1>
            {`Step ${currentStepIndex + 1}`}
          </div>
          {isFetching ? <LoadingFormSkeleton /> : step}
          <div className="mt-24 flex justify-end">
            <Button
              type="button"
              isLoading={isLoading}
              disabled={isLoading}
              onClick={() => onNext()}
            >
              {isLastStep ? "Save" : "Next"}
            </Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}
