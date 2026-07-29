import Link from "next/link";
import type { ReactNode } from "react";
import { TopNav } from "./_components/top-nav";

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-neutral-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/library/test" className="flex items-center gap-2.5">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-neutral-900 text-sm font-bold text-white">
              S
            </span>
            <span className="text-lg font-semibold tracking-tight text-neutral-900">
              Studaca
            </span>
            <span className="hidden rounded-full border border-neutral-200 px-2 py-0.5 text-[11px] font-medium text-neutral-500 sm:inline">
              Kho đề thi miễn phí
            </span>
          </Link>

          <TopNav />
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </div>
  );
}
