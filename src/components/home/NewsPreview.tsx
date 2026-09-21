import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { newsItems } from "@/data/site";

export function NewsPreview() {
  return (
    <section className="bg-cream">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="नवीनतम समाचार"
          title="गांव से जुड़ी सभी महत्वपूर्ण अपडेट्स"
          action={
            <Link
              href="/news"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              सभी समाचार देखें
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {newsItems.slice(0, 3).map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="group grid grid-cols-[96px_1fr] overflow-hidden rounded bg-white p-3 shadow-sm ring-1 ring-navy/10 transition-shadow hover:shadow-lg sm:grid-cols-[112px_1fr]"
            >
              {n.image ? (
                <div className="relative h-full min-h-24 w-full overflow-hidden rounded">
                  <Image
                    src={n.image}
                    alt={n.title}
                    fill
                    sizes="(max-width: 640px) 96px, 112px"
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
              ) : (
                <PlaceholderImage icon="landmark" seed={n.slug} className="h-full min-h-24 w-full rounded" />
              )}
              <div className="px-4 py-1">
                <p className="flex items-center gap-1.5 text-[11px] font-medium text-ink/50">
                  <Calendar className="h-3.5 w-3.5" />
                  {n.date}
                </p>
                <h3 className="mt-1 text-sm font-bold leading-snug text-navy group-hover:text-saffron-dark sm:text-base">
                  {n.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-ink/60 sm:text-sm">{n.excerpt}</p>
                <span className="mt-2 inline-flex items-center gap-1.5 text-xs font-semibold text-navy">
                  विस्तार से पढ़ें
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
