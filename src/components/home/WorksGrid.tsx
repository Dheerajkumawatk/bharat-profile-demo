import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { works } from "@/data/site";
import { iconMap } from "@/components/icon-map";
import { SectionHeading } from "@/components/SectionHeading";

export function WorksGrid() {
  return (
    <section className="relative overflow-hidden bg-navy">
      <div className="absolute right-16 top-8 text-white/5">
        <span className="text-[10rem] font-black leading-none">गांव</span>
      </div>
      <div className="relative mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="हमारे प्रमुख कार्य"
          title="गांव के विकास के लिए किए गए महत्वपूर्ण कदम"
          dark
          action={
            <Link
              href="/panchayat"
              className="inline-flex items-center gap-2 rounded-full border border-white/50 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              सभी योजनाएं देखें
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {works.map((w) => {
            const Icon = iconMap[w.icon];
            return (
              <div
                key={w.title}
                className="group rounded border border-white/15 bg-white/[0.03] p-6 transition-colors hover:bg-white/10"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-saffron">
                  <Icon className="h-5 w-5 text-white" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-white">{w.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{w.desc}</p>
                <Link
                  href="/panchayat"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-saffron"
                >
                  विस्तार से पढ़ें
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
