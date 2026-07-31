import { ItemBrowser } from "../_components/item-browser";
import { SECTION_CONFIG } from "../_lib/mock-data";
import type { LibraryItem } from "../_lib/mock-data";

export default async function PracticeLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const config = SECTION_CONFIG.practice;
  const activeCategory = category ?? config.defaultCategory;

  // Fetch mock data from the API route (mock data for "practice" section)
  const res = await fetch(
    `/api/tests/library/practice?category=${activeCategory}`,
    { next: { tags: ["library-practice"] } }
  );
  const data = await res.json();
  const items: LibraryItem[] = data.items;

  return (
    <>
      <ItemBrowser
        basePath="/library/practice"
        categories={config.categories}
        activeCategory={activeCategory}
        items={items}
      />
    </>
  );
}
