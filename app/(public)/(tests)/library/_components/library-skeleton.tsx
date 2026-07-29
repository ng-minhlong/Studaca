export function LibrarySkeleton() {
  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div className="mb-2 space-y-2">
        <div className="h-7 w-40 animate-pulse rounded-md bg-neutral-200" />
        <div className="h-4 w-80 max-w-full animate-pulse rounded-md bg-neutral-100" />
      </div>

      {/* Category tabs */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-8 w-24 animate-pulse rounded-full bg-neutral-100"
            style={{ animationDelay: `${i * 60}ms` }}
          />
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="h-9 w-full max-w-xs animate-pulse rounded-md bg-neutral-100" />
        <div className="h-9 w-40 animate-pulse rounded-md bg-neutral-100" />
      </div>

      {/* Card grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col rounded-2xl border border-neutral-200 bg-white"
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="flex items-start gap-3 p-5">
              <div className="h-9 w-9 shrink-0 animate-pulse rounded-lg bg-neutral-200" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-20 animate-pulse rounded bg-neutral-100" />
                <div className="h-4 w-full animate-pulse rounded bg-neutral-200" />
                <div className="h-4 w-2/3 animate-pulse rounded bg-neutral-100" />
              </div>
            </div>
            <div className="flex gap-4 px-5 pb-5">
              <div className="h-3 w-16 animate-pulse rounded bg-neutral-100" />
              <div className="h-3 w-20 animate-pulse rounded bg-neutral-100" />
            </div>
            <div className="border-t border-dashed border-neutral-200 px-5 py-4">
              <div className="h-9 w-full animate-pulse rounded-md bg-neutral-100" />
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-center gap-1.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-9 w-9 animate-pulse rounded-md bg-neutral-100" />
        ))}
      </div>

      <p className="text-center text-xs text-neutral-400">
        Đang tải đề thi từ Studaca…
      </p>
    </div>
  );
}
