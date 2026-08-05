import Link from "next/link";

export default function AdminPracticePage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Practice tests</h1>
          <p className="text-sm text-muted-foreground">Manage practice test entries.</p>
        </div>
        <Link href="/admin/tests/test" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Open manager
        </Link>
      </div>
    </div>
  );
}
