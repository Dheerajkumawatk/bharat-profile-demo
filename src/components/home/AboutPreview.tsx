import Link from "next/link";
import { ArrowRight, GraduationCap, HeartHandshake, Landmark, Quote } from "lucide-react";
import { Portrait } from "@/components/Portrait";
import type { Sarpanch } from "@prisma/client";

export function AboutPreview({ sarpanch, slug }: { sarpanch: Sarpanch; slug: string }) {
  return (
    <section className="bg-white">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-9 px-4 py-10 sm:px-6 lg:grid-cols-[0.85fr_1.25fr_0.85fr] lg:items-center lg:gap-9 lg:px-8">
        <div className="relative mx-auto w-full max-w-xs">
          <div className="aspect-[4/5] w-full overflow-hidden rounded shadow-lg ring-1 ring-navy/10">
            <Portrait src={sarpanch.image} alt={sarpanch.name} className="h-full w-full" />
          </div>
          <div className="absolute bottom-5 right-0 w-[70%] rounded bg-navy/88 px-4 py-3 text-right shadow-lg backdrop-blur">
            <p className="text-sm font-semibold text-white">&quot;सेवा ही नहीं, समर्पण भी है।&quot;</p>
            <p className="mt-0.5 text-xs text-white/60">— {sarpanch.name}</p>
          </div>
        </div>

        <div className="mt-4 lg:mt-0">
          <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-saffron-dark">
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            मेरे बारे में
          </p>
          <h2 className="text-2xl font-bold text-navy sm:text-3xl">{sarpanch.name}</h2>
          <p className="mt-1 text-sm font-medium text-ink/50">
            वर्तमान सरपंच | ग्राम पंचायत, {sarpanch.village || "गांव"}
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink/70 sm:text-base">
            मैं आपके गांव का बेटा हूं और आपके विश्वास ने मुझे इस पद तक पहुंचाया है। मेरा उद्देश्य है कि गांव के हर वर्ग का विकास हो और प्रत्येक परिवार को मूलभूत सुविधाएं मिलें। मैं हमेशा आपके साथ हूं और आगे भी रहूंगा।
          </p>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-cream">
                <GraduationCap className="h-5 w-5 text-navy" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-navy sm:text-sm">शिक्षा</span>
                <span className="text-[11px] text-ink/55">स्नातक (B.A.)</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-cream">
                <HeartHandshake className="h-5 w-5 text-navy" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-navy sm:text-sm">समाज सेवा</span>
                <span className="text-[11px] text-ink/55">पिछले 8 वर्षों से</span>
              </span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded bg-cream">
                <Landmark className="h-5 w-5 text-navy" />
              </span>
              <span>
                <span className="block text-xs font-semibold text-navy sm:text-sm">ग्राम पंचायत अनुभव</span>
                <span className="text-[11px] text-ink/55">वर्तमान सरपंच</span>
              </span>
            </div>
          </div>

          <Link
            href={`/${slug}/about`}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-light"
          >
            और अधिक जानें
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="relative hidden overflow-hidden rounded bg-cream p-8 shadow-sm ring-1 ring-navy/5 lg:block">
          <Quote className="h-9 w-9 text-saffron/45" />
          <p className="mt-5 text-xl font-bold leading-snug text-navy">
            गांव का विकास सिर्फ योजनाओं से नहीं, बल्कि ईमानदारी और लगन से होता है।
          </p>
          <p className="mt-4 text-sm text-ink/60">— {sarpanch.name}</p>
          <Landmark className="absolute -bottom-5 -right-5 h-28 w-28 text-navy/5" />
        </div>
      </div>
    </section>
  );
}
