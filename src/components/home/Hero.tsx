import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Landmark } from "lucide-react";
import { Portrait } from "@/components/Portrait";
import type { Sarpanch } from "@prisma/client";

export function Hero({ sarpanch, slug }: { sarpanch: Sarpanch; slug: string }) {
  return (
    <section className="relative overflow-hidden bg-navy">
      <Image
        src="/images/village-hero.png"
        alt="राजस्थान का ग्रामीण दृश्य"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(7,28,48,0.94)_0%,rgba(7,28,48,0.72)_34%,rgba(7,28,48,0.18)_67%,rgba(7,28,48,0.44)_100%)]" />
      <div className="relative mx-auto grid min-h-[380px] max-w-7xl grid-cols-1 items-center gap-6 px-4 py-10 sm:min-h-[430px] sm:px-6 lg:grid-cols-[1fr_380px_260px] lg:px-8">
        <div className="animate-fade-up">
          <div className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-white/90">
            <span>सशक्त पंचायत</span>
            <span className="text-saffron">|</span>
            <span>समृद्ध गांव</span>
            <span className="text-saffron">|</span>
            <span>खुशहाल भविष्य</span>
          </div>

          <h1 className="text-balance text-4xl font-extrabold leading-tight text-white sm:text-6xl lg:text-[4rem]">
            <span className="text-saffron">{sarpanch.name}</span>
            <br />
            हमारा संकल्प
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink/70 sm:text-lg">
            <span className="text-white/90">
              {sarpanch.description || "आपके विश्वास और सहयोग से, हम गांव को नई दिशा, नई पहचान और बेहतर भविष्य देने के लिए संकल्पित हैं।"}
            </span>
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <Link
              href={`/${slug}/about`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-saffron/20 transition-colors hover:bg-saffron-dark"
            >
              मेरे बारे में जानें
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href={`/${slug}/panchayat`}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/55 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
            >
              मेरे कार्य देखें
            </Link>
          </div>
        </div>

        <div className="relative hidden self-end lg:block">
          <div className="relative mx-auto aspect-[4/5] w-[360px] overflow-hidden">
            <Portrait src={sarpanch.image} alt={sarpanch.name} className="h-full w-full" />
          </div>
        </div>

        <div className="hidden justify-self-end rounded bg-cream/90 px-6 py-7 text-center shadow-xl ring-1 ring-white/40 lg:block">
          <Landmark className="mx-auto mb-3 h-8 w-8 text-saffron" />
          <p className="text-3xl font-extrabold leading-tight text-navy">
            मेरा गांव
            <br />
            {sarpanch.village || "ग्राम पंचायत"}
          </p>
          <div className="mx-auto mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-saffron via-white to-emerald-600" />
        </div>
      </div>
    </section>
  );
}
