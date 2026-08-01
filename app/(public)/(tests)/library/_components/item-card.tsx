import { Clock, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { CategoryConfig, LibraryItem } from "../_lib/mock-data";
import Link from "next/link";


function formatCount(n: number) {
  if (n >= 1000) return `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k`;
  return `${n}`;
}

export function ItemCard({
  item,
  category,
}: {
  item: LibraryItem;
  category: CategoryConfig;
}) {
  console.log("item: ", item)
  return (
    <div className="group flex flex-col rounded-2xl border border-neutral-200 bg-white transition-all hover:-translate-y-0.5 hover:border-neutral-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-3 p-5">
        <div className="flex items-start gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-neutral-900 text-[11px] font-bold tracking-tight text-white">
            {category.tag}
          </span>
          <div>
            <p className="text-[13px] font-medium text-neutral-500">{category.label}</p>
            <h3 className="mt-0.5 line-clamp-2 text-[15px] font-semibold leading-snug text-neutral-900">
              {item.name}
            </h3>
          </div>
        </div>

        {item.completed && (
          <span
            title="Đã hoàn thành"
            className="flex shrink-0 items-center gap-1 rounded-full border border-neutral-200 bg-neutral-50 px-2 py-1 text-[11px] font-medium text-neutral-700"
          >
            <CheckCircle2 className="h-3.5 w-3.5" />
            Completed
          </span>
        )}
      </div>

      <div className="flex items-center gap-4 px-5 pb-5 text-[13px] text-neutral-500">
        <span className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5" />
          {item.durationMinutes} minutes
        </span>
        <span className="flex items-center gap-1.5">
          <Users className="h-3.5 w-3.5" />
          {formatCount(item.testTakerCount)} lượt làm
        </span>
      </div>
      

      <div className="border-t border-dashed border-neutral-200 px-5 py-4">
        <Link href={`/test/${item.category}/${item.id}`} className="block">
          <Button
            className="w-full"
            variant={item.completed ? "outline" : "default"}
          >
            {item.completed ? "Do again" : "Start Test"}
          </Button>
        </Link>
      </div>
    </div>
  );
}
