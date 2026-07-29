"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/library/test", label: "Đề thi" },
  { href: "/library/practice", label: "Luyện tập" },
  { href: "/library/full-test", label: "Thi thử toàn phần" },
];

export function TopNav() {
  const pathname = usePathname();

  return (
    <nav className="flex items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 p-1">
      {NAV_ITEMS.map((item) => {
        const isActive = pathname?.startsWith(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors sm:px-4",
              isActive
                ? "bg-neutral-900 text-white shadow-sm"
                : "text-neutral-600 hover:bg-white hover:text-neutral-900 hover:shadow-sm"
            )}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
