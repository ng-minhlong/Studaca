import type { ReactNode } from "react";

export default function LibraryLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <main className="px-4 py-8 sm:px-6 lg:px-8 pt-20">{children}</main>
    </div>
  );
}
