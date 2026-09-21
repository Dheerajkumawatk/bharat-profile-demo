"use client";

import { useMemo, useState } from "react";
import { CheckCircle2 } from "lucide-react";
import { schemes } from "@/data/site";
import { iconMap } from "@/components/icon-map";

const CATEGORIES = ["सभी", ...Array.from(new Set(schemes.map((s) => s.category)))];

export function SchemesList() {
  const [active, setActive] = useState("सभी");

  const filtered = useMemo(
    () => (active === "सभी" ? schemes : schemes.filter((s) => s.category === active)),
    [active]
  );

  return (
    <div>
      <div className="mb-8 flex flex-wrap gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setActive(cat)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              active === cat ? "bg-navy text-white" : "bg-cream text-navy/70 hover:bg-cream-dark"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((s) => {
          const Icon = iconMap[s.icon];
          return (
            <div key={s.title} className="flex flex-col rounded-2xl bg-white p-6 ring-1 ring-navy/10">
              <div className="flex items-start justify-between gap-3">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron/10">
                  <Icon className="h-6 w-6 text-saffron-dark" />
                </span>
                <span className="rounded-full bg-cream px-3 py-1 text-xs font-semibold text-navy/70">
                  {s.category}
                </span>
              </div>
              <h3 className="mt-4 text-base font-bold leading-snug text-navy">{s.title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/65">{s.desc}</p>
              <div className="mt-4 flex items-start gap-2 border-t border-navy/10 pt-4 text-xs text-ink/60">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-saffron-dark" />
                <span>
                  <span className="font-semibold text-navy/80">पात्रता: </span>
                  {s.eligibility}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <p className="py-12 text-center text-sm text-ink/50">इस श्रेणी में कोई योजना उपलब्ध नहीं है।</p>
      )}
    </div>
  );
}
