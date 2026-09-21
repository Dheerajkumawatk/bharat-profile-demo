import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Calendar } from "lucide-react";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { newsItems, site } from "@/data/site";

export const metadata: Metadata = {
  title: `समाचार | ${site.name}`,
};

export default function NewsPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-saffron-dark">
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            समाचार
          </p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">
            गांव से जुड़ी सभी अपडेट्स
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
            विकास कार्यों, योजनाओं व आयोजनों की नवीनतम जानकारी यहां पाएं।
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {newsItems.map((n) => (
              <Link
                key={n.slug}
                href={`/news/${n.slug}`}
                className="group overflow-hidden rounded-2xl bg-white ring-1 ring-navy/10 transition-shadow hover:shadow-lg"
              >
                {n.image ? (
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={n.image}
                      alt={n.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <PlaceholderImage icon="landmark" seed={n.slug} className="aspect-[16/10] w-full" />
                )}
                <div className="p-5">
                  <p className="flex items-center gap-1.5 text-xs font-medium text-ink/50">
                    <Calendar className="h-3.5 w-3.5" />
                    {n.date}
                  </p>
                  <h2 className="mt-2 text-base font-bold leading-snug text-navy group-hover:text-saffron-dark">
                    {n.title}
                  </h2>
                  <p className="mt-2 line-clamp-2 text-sm text-ink/60">{n.excerpt}</p>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-saffron-dark">
                    विस्तार से पढ़ें
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
