import { FormData } from "@/components/form/MultiForm";
import axios from "axios";

export async function getJobs() {
  const res = await axios.get(
    "https://65759a1eb2fbb8f6509d43ae.mockapi.io/api/createjob"
  );
  return res.data;
}

export async function getJobsWithId(id: string) {
  const res = await axios.get(
    "https://65759a1eb2fbb8f6509d43ae.mockapi.io/api/createjob/" + id
  );

  return res.data;
}

export async function createJobs(data: FormData) {
  const res = await axios.post(
    "https://65759a1eb2fbb8f6509d43ae.mockapi.io/api/createjob",
    data
  );
  return res.data;
}

export async function updateJobs(data: FormData, id: string) {
  const res = await axios.put(
    "https://65759a1eb2fbb8f6509d43ae.mockapi.io/api/createjob/" + id,
    data
  );
  return res.data;
}

export async function deleteJob(id: string) {
  const res = await axios.delete(
    "https://65759a1eb2fbb8f6509d43ae.mockapi.io/api/createjob/" + id
  );
  return res.data;
}
