import { stats } from "@/data/site";
import { iconMap } from "@/components/icon-map";

export function StatsBar() {
  return (
    <section className="relative z-10 bg-white">
      <div className="mx-auto -mt-8 grid max-w-6xl grid-cols-2 rounded bg-white px-4 py-5 shadow-xl ring-1 ring-navy/10 sm:px-6 lg:grid-cols-4 lg:px-8">
        {stats.map((s) => {
          const Icon = iconMap[s.icon];
          return (
            <div
              key={s.label}
              className="flex items-center gap-3 border-navy/10 py-3 odd:border-r sm:gap-4 lg:border-r lg:px-6 lg:last:border-r-0"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center text-navy sm:h-14 sm:w-14">
                <Icon className="h-8 w-8 sm:h-9 sm:w-9" />
              </span>
              <div>
                <p className="text-xl font-extrabold text-navy sm:text-2xl">{s.value}</p>
                <p className="text-xs font-medium leading-tight text-ink/60 sm:text-sm">{s.label}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
