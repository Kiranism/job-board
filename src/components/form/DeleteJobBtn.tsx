import { deleteJob } from "@/lib/api";
import { Loader2, TrashIcon } from "lucide-react";
import useJobs from "../context/JobContext";
import Button from "./Button";
import { useCallback, useState } from "react";

export default function DeleteJobBtn({ id }: { id: string }) {
  const { fetchData: refetch } = useJobs();
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await deleteJob(id);
      console.log("res", res);
      refetch();
    } catch (error) {
      console.error("Error deleting job:", error);
    } finally {
      setIsLoading(false);
    }
  }, [id, refetch]);

  return (
    <Button
      type="button"
      onClick={handleDelete}
      isLoading={isLoading}
      className="rounded-md bg-black p-1 text-sm font-medium text-white hover:bg-black/30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/75"
    >
      {isLoading ? (
        <Loader2 className="h-4 animate-spin w-4" />
      ) : (
        <TrashIcon className="w-4 h-4" />
      )}
    </Button>
  );
}
