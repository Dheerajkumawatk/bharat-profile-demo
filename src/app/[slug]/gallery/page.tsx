import type { Metadata } from "next";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `गैलरी | ${site.name}`,
};

export default function GalleryPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-saffron-dark">
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            गैलरी
          </p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">
            हमारे गांव की झलक
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
            विकास कार्यों, आयोजनों व गांव की गतिविधियों की तस्वीरें और वीडियो।
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <GalleryGrid />
        </div>
      </section>
    </>
  );
}
