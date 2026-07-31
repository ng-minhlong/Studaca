import { ItemBrowser } from "../_components/item-browser";
import { SECTION_CONFIG } from "../_lib/mock-data";
import type { LibraryItem } from "../_lib/mock-data";

export default async function TestLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const config = SECTION_CONFIG.test;
  const activeCategory = category ?? config.defaultCategory;

  // Fetch real data from the API route (Prisma-backed for "test" section)
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL}/api/tests/library/test?category=${activeCategory}`,
    { next: { tags: ["library-test"] } }
  );
  const data = await res.json();
  const items: LibraryItem[] = data.items;

  return (
    <>
      <ItemBrowser
        basePath="/library/test"
        categories={config.categories}
        activeCategory={activeCategory}
        items={items}
      />
    </>
  );
}
