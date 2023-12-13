export default function LoadingInputSkeleton() {
  return (
    <div className="flex-1 animate-pulse">
      <div className="flex justify-between align-center">
        <div className="block h-4 bg-gray-200 rounded w-1/4"></div>
      </div>
      <div className="mt-3">
        <div className="block w-full h-10 p-2 bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
