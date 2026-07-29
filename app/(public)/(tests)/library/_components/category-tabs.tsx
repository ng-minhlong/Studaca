import Link from "next/link";
import type { CategoryConfig } from "../_lib/mock-data";
import { cn } from "@/lib/utils";

export function CategoryTabs({
  basePath,
  categories,
  activeCategory,
}: {
  basePath: string;
  categories: CategoryConfig[];
  activeCategory: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {categories.map((category) => {
        const isActive = category.key === activeCategory;
        return (
          <Link
            key={category.key}
            href={`${basePath}?category=${category.key}`}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
              isActive
                ? "border-neutral-900 bg-neutral-900 text-white"
                : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-300 hover:text-neutral-900"
            )}
          >
            {category.label}
          </Link>
        );
      })}
    </div>
  );
}
