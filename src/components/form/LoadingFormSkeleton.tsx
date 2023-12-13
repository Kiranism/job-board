import LoadingInputSkeleton from "./LoadingInputSkeleton";

export default function LoadingFormSkeleton() {
  return (
    <div className="flex flex-col gap-6">
      <LoadingInputSkeleton />
      <LoadingInputSkeleton />
      <LoadingInputSkeleton />

      <div className="flex justify-between gap-6">
        <LoadingInputSkeleton />
        <LoadingInputSkeleton />
      </div>
    </div>
  );
}
