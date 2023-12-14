import { useEffect } from "react";
import Card from "./Card";
import useJobs, { Job } from "./context/JobContext";

export default function CardSection() {
  const { jobs, fetchData } = useJobs();
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="grid md:grid-cols-2 gap-10 pt-10">
      {jobs?.map((job: Job) => (
        <Card item={job} key={job.id} />
      ))}
    </div>
  );
}
