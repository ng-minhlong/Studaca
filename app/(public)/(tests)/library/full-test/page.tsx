import { ItemBrowser } from "../_components/item-browser";
import { SECTION_CONFIG, simulateFetch } from "../_lib/mock-data";

export default async function FullTestLibraryPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const config = SECTION_CONFIG["full-test"];
  const activeCategory = category ?? config.defaultCategory;

  // Simulated network call — swap for a real API request when ready.
  const items = await simulateFetch("full-test", activeCategory);

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
