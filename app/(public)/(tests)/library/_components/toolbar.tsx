"use client";

import { Search, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

export type SortValue =
  | "latest-desc"
  | "latest-asc"
  | "name-asc"
  | "name-desc"
  | "takers-desc"
  | "takers-asc";

const SORT_OPTIONS: { value: SortValue; label: string }[] = [
  { value: "latest-desc", label: "Mới nhất" },
  { value: "latest-asc", label: "Cũ nhất" },
  { value: "name-asc", label: "Tên A → Z" },
  { value: "name-desc", label: "Tên Z → A" },
  { value: "takers-desc", label: "Lượt làm nhiều nhất" },
  { value: "takers-asc", label: "Lượt làm ít nhất" },
];

export function Toolbar({
  search,
  onSearchChange,
  sort,
  onSortChange,
  resultCount,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  sort: SortValue;
  onSortChange: (value: SortValue) => void;
  resultCount: number;
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-neutral-400" />
        <Input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm theo tên đề thi..."
          className="pl-9"
        />
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-sm text-neutral-500 sm:inline">
          {resultCount} kết quả
        </span>
        <div className="relative">
          <ArrowUpDown className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value as SortValue)}
            className="h-9 appearance-none rounded-md border border-neutral-200 bg-white py-1 pl-8 pr-8 text-sm font-medium text-neutral-700 outline-none transition-colors hover:border-neutral-300 focus:border-neutral-400"
          >
            {SORT_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
