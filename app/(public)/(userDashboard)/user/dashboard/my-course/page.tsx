import Link from "next/link";

export default function MyCoursePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">My courses</h1>
          <p className="text-sm text-muted-foreground">Courses you are enrolled in.</p>
        </div>
        <Link href="/user/dashboard" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
