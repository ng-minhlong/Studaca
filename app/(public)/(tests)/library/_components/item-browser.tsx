"use client";

import { useMemo, useState } from "react";
import { CategoryTabs } from "./category-tabs";
import { Toolbar, type SortValue } from "./toolbar";
import { ItemCard } from "./item-card";
import { Pagination } from "./pagination";
import type { CategoryConfig, LibraryItem } from "../_lib/mock-data";

const PAGE_SIZE = 12;

export function ItemBrowser({
  basePath,
  categories,
  activeCategory,
  items,
}: {
  basePath: string;
  categories: CategoryConfig[];
  activeCategory: string;
  items: LibraryItem[];
}) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState<SortValue>("latest-desc");
  const [page, setPage] = useState(1);

  const category =
    categories.find((c) => c.key === activeCategory) ?? categories[0];

  const filtered = useMemo(() => {
    const term = search.trim().toLowerCase();
    const list = term
      ? items.filter((item) => item.name.toLowerCase().includes(term))
      : items.slice();

    list.sort((a, b) => {
      switch (sort) {
        case "name-asc":
          return a.name.localeCompare(b.name);
        case "name-desc":
          return b.name.localeCompare(a.name);
        case "takers-desc":
          return b.testTakerCount - a.testTakerCount;
        case "takers-asc":
          return a.testTakerCount - b.testTakerCount;
        case "latest-asc":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "latest-desc":
        default:
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
      }
    });

    return list;
  }, [items, search, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  return (
    <div className="flex flex-col gap-6">
      <CategoryTabs
        basePath={basePath}
        categories={categories}
        activeCategory={activeCategory}
      />

      <Toolbar
        search={search}
        onSearchChange={(value) => {
          setSearch(value);
          setPage(1);
        }}
        sort={sort}
        onSortChange={(value) => {
          setSort(value);
          setPage(1);
        }}
        resultCount={filtered.length}
      />

      {pageItems.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-neutral-200 py-20 text-center">
          <p className="text-sm font-medium text-neutral-900">
            Không tìm thấy đề thi phù hợp
          </p>
          <p className="mt-1 text-sm text-neutral-500">
            Thử một từ khóa khác hoặc chọn danh mục khác.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {pageItems.map((item) => (
            <ItemCard key={item.id} item={item} category={category} />
          ))}
        </div>
      )}

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
