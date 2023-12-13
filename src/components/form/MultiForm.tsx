import CreateFormOne from "@/components/form/CreateFormOne";
import CreateFormTwo from "@/components/form/CreateFormTwo";
import useMultistepForm from "@/hooks/useMultistepForm";
import { createJobs, getJobsWithId, updateJobs } from "@/lib/api";
import { FormEvent, useEffect, useState } from "react";
import useJobs from "../context/JobContext";
import Button from "./Button";
import LoadingFormSkeleton from "./LoadingFormSkeleton";

export type applyType = "quickapply" | "externalapply" | "";

export type FormData = {
  jobtitle: string;
  company: string;
  industry: string;
  location: string;
  remotetype: string;
  experience: { min: number | null; max: number | null };
  salary: { min: number | null; max: number | null };
  totalemployee: string;
  applytype: applyType;
};

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
    experience: { min: null, max: null },
    salary: { min: null, max: null },
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

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }

  const { currentStepIndex, step, isLastStep, next } = useMultistepForm([
    <CreateFormOne {...data} updateFields={updateFields} />,
    <CreateFormTwo {...data} updateFields={updateFields} />,
  ]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();

    if (isLastStep) {
      setIsLoading(true);

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
  }

  const title = isEdit ? "Edit Job" : "Create Job";

  return (
    <div>
      <>
        <form onSubmit={onSubmit}>
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
      </>
    </div>
  );
}
