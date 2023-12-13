import { getJobs } from "@/lib/api";
import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from "react";

type Experience = {
  min: number;
  max: number;
};

type Salary = {
  min: number;
  max: number;
};
export type Job = {
  createdAt: string;
  jobtitle: string;
  company: string;
  industry: string;
  location: string;
  remotetype: string;
  totalemployee: number;
  applytype: string;
  experience: Experience;
  salary: Salary;
  id: string;
};

interface JobContextType {
  jobs: Job[] | null;
  setJobs: Dispatch<SetStateAction<Job[] | null>>;
  fetchData: () => Promise<void>;
}

export const JobContext = createContext<JobContextType>({
  jobs: null,
  setJobs: () => {},
  fetchData: () => Promise.resolve(),
});
export const JobProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [jobs, setJobs] = useState<Job[] | null>(null);

  const fetchData = async () => {
    try {
      const jobs = await getJobs();
      setJobs(jobs);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <JobContext.Provider value={{ jobs, setJobs, fetchData }}>
      {children}
    </JobContext.Provider>
  );
};

export default function useJobs(): JobContextType {
  return useContext(JobContext);
}
