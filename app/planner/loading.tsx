export default function PlannerLoading() {
  return (
    <div className="space-y-4">
      <div className="h-28 animate-pulse rounded-2xl bg-panel/80" />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
        <div className="h-[32rem] animate-pulse rounded-2xl bg-panel/80 lg:col-span-5" />
        <div className="h-[32rem] animate-pulse rounded-2xl bg-panel/80 lg:col-span-7" />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="h-72 animate-pulse rounded-2xl bg-panel/80" />
        <div className="h-72 animate-pulse rounded-2xl bg-panel/80" />
      </div>
    </div>
  );
}
