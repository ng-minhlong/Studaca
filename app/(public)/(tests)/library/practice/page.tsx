import { ItemBrowser } from "../_components/item-browser";
import { SECTION_CONFIG, simulateFetch } from "../_lib/mock-data";

export default async function PracticeLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const config = SECTION_CONFIG.practice;
  const activeCategory = category ?? config.defaultCategory;

  // Simulated network call — swap for a real API request when ready.
  const items = await simulateFetch("practice", activeCategory);

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
