import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { GalleryGrid } from "@/components/gallery/GalleryGrid";

export function GalleryPreview() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-9 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="गैलरी"
          title="हमारे गांव की झलक, कामों की तस्वीरें और वीडियो"
          action={
            <Link
              href="/gallery"
              className="inline-flex items-center gap-2 rounded-full bg-navy px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
            >
              पूरी गैलरी देखें
              <ArrowRight className="h-4 w-4" />
            </Link>
          }
        />
        <GalleryGrid limit={5} />
      </div>
    </section>
  );
}
