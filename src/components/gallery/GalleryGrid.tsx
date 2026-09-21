"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import { Clapperboard, Images, LayoutGrid } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { galleryItems } from "@/data/site";

const ICON_BY_CATEGORY: Record<string, string> = {
  "विकास कार्य": "road",
  शिक्षा: "school",
  बैठक: "meeting",
  कृषि: "farm",
  स्वास्थ्य: "health",
  पर्यावरण: "tree",
  समारोह: "meeting",
};

const TABS = [
  { key: "all", label: "सभी", icon: LayoutGrid },
  { key: "photo", label: "फोटो", icon: Images },
  { key: "video", label: "वीडियो", icon: Clapperboard },
] as const;

export function GalleryGrid({
  items = galleryItems,
  limit,
}: {
  items?: typeof galleryItems;
  limit?: number;
}) {
  const [tab, setTab] = useState<(typeof TABS)[number]["key"]>("all");

  const filtered = useMemo(() => {
    const list = tab === "all" ? items : items.filter((it) => it.type === tab);
    return typeof limit === "number" ? list.slice(0, limit) : list;
  }, [items, tab, limit]);

  return (
    <div>
      <div className="mb-5 flex flex-wrap justify-center gap-2">
        {TABS.map(({ key, label, icon: Icon }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold shadow-sm transition-colors ${
              tab === key
                ? "bg-navy text-white"
                : "bg-cream text-navy/70 hover:bg-cream-dark"
            }`}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="group overflow-hidden rounded shadow-sm ring-1 ring-navy/10 transition-shadow hover:shadow-lg"
          >
            {"image" in item && item.image ? (
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-cream">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            ) : (
              <PlaceholderImage
                icon={ICON_BY_CATEGORY[item.category] ?? "landmark"}
                seed={String(item.id)}
                video={item.type === "video"}
                className="aspect-[4/3] w-full"
              />
            )}
            <div className="bg-white p-3">
              <p className="truncate text-sm font-semibold text-navy">{item.title}</p>
              <div className="mt-1 flex items-center justify-between">
                <span className="text-xs text-ink/50">{item.category}</span>
                {item.type === "video" && "duration" in item && (
                  <span className="rounded-full bg-cream px-2 py-0.5 text-[11px] font-medium text-navy/70">
                    {item.duration}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-ink/50">इस श्रेणी में कोई सामग्री उपलब्ध नहीं है।</p>
      )}
    </div>
  );
}
