import type { Metadata } from "next";
import { SchemesList } from "@/components/schemes/SchemesList";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `योजनाएं | ${site.name}`,
};

export default function SchemesPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-saffron-dark">
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            सरकारी योजनाएं
          </p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">
            ग्रामवासियों के लिए योजनाएं
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
            केंद्र व राज्य सरकार की उन योजनाओं की जानकारी जो हमारे गांव के परिवारों के लिए उपलब्ध हैं। अधिक जानकारी व आवेदन हेतु पंचायत कार्यालय से संपर्क करें।
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 sm:py-14 lg:px-8">
          <SchemesList />
        </div>
      </section>
    </>
  );
}
