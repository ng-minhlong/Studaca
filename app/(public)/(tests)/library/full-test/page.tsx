import { ItemBrowser } from "../_components/item-browser";
import { SECTION_CONFIG } from "../_lib/mock-data";
import type { LibraryItem } from "../_lib/mock-data";

export default async function FullTestLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const config = SECTION_CONFIG["full-test"];
  const activeCategory = category ?? config.defaultCategory;

  // Fetch mock data from the API route (mock data for "full-test" section)
  const res = await fetch(
    `/api/tests/library/full-test?category=${activeCategory}`,
    { next: { tags: ["library-full-test"] } }
  );
  const data = await res.json();
  const items: LibraryItem[] = data.items;

  return (
    <>
      <ItemBrowser
        basePath="/library/full-test"
        categories={config.categories}
        activeCategory={activeCategory}
        items={items}
      />
    </>
  );
}
