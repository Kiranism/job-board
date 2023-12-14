import { FormData } from "@/components/form/MultiForm";
import axios from "axios";

const BASE_URL = "https://65759a1eb2fbb8f6509d43ae.mockapi.io/api/createjob";

export async function getJobs() {
  const res = await axios.get(`${BASE_URL}`);
  return res.data;
}

export async function getJobsWithId(id: string) {
  const res = await axios.get(`${BASE_URL}/` + id);

  return res.data;
}

export async function createJobs(data: FormData) {
  const res = await axios.post(`${BASE_URL}`, data);
  return res.data;
}

export async function updateJobs(data: FormData, id: string) {
  const res = await axios.put(`${BASE_URL}/` + id, data);
  return res.data;
}

export async function deleteJob(id: string) {
  const res = await axios.delete(`${BASE_URL}/` + id);
  return res.data;
}
