import Link from "next/link";

export default function TestHistoryPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Test history</h1>
          <p className="text-sm text-muted-foreground">Your past test attempts and results.</p>
        </div>
        <Link href="/user/dashboard" className="rounded-md bg-slate-900 px-4 py-2 text-sm font-medium text-white">
          Back to dashboard
        </Link>
      </div>
    </div>
  );
}
