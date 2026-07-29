import { ItemBrowser } from "../_components/item-browser";
import { SECTION_CONFIG, simulateFetch } from "../_lib/mock-data";

export default async function TestLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const config = SECTION_CONFIG.test;
  const activeCategory = category ?? config.defaultCategory;

  // Simulated network call — swap for a real API request when ready.
  const items = await simulateFetch("test", activeCategory);

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
