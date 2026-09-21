import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowRight,
  Award,
  GraduationCap,
  HeartHandshake,
  Landmark,
  Quote,
  Target,
} from "lucide-react";
import { Portrait } from "@/components/Portrait";
import { SectionHeading } from "@/components/SectionHeading";
import prisma from "@/lib/prisma";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const sarpanch = await prisma.sarpanch.findUnique({ where: { slug } });
  return {
    title: `मेरे बारे में | ${sarpanch?.name || "Sarpanch"}`,
  };
}

const timeline = [
  { year: "2016", title: "समाज सेवा की शुरुआत", desc: "युवा मंडल के माध्यम से गांव में सामाजिक कार्यों में सक्रिय भागीदारी।" },
  { year: "2018", title: "वार्ड पंच के रूप में कार्य", desc: "वार्ड स्तर पर विकास कार्यों की देखरेख व ग्रामीणों की समस्याओं का समाधान।" },
  { year: "2021", title: "सरपंच के रूप में निर्वाचित", desc: "ग्रामवासियों के भारी समर्थन से ग्राम पंचायत सरपंच पद पर निर्वाचित।" },
  { year: "2021-वर्तमान", title: "गांव के समग्र विकास हेतु कार्यरत", desc: "सड़क, पानी, शिक्षा, स्वास्थ्य व रोजगार के क्षेत्र में निरंतर प्रयासरत।" },
];

const values = [
  { icon: HeartHandshake, title: "ईमानदारी", desc: "हर कार्य में पारदर्शिता और निष्ठा को सर्वोपरि रखना।" },
  { icon: Target, title: "समर्पण", desc: "गांव के हर परिवार तक विकास की पहुंच सुनिश्चित करना।" },
  { icon: Award, title: "जवाबदेही", desc: "जनता के प्रति उत्तरदायी रहकर कार्य करना।" },
];

export default async function AboutPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const sarpanch = await prisma.sarpanch.findUnique({ where: { slug } });

  if (!sarpanch) {
    notFound();
  }

  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-10 px-4 py-14 sm:px-6 sm:py-16 lg:grid-cols-2 lg:gap-12 lg:px-8">
          <div className="order-2 lg:order-1">
            <p className="mb-2 flex items-center gap-2 text-sm font-semibold text-saffron-dark">
              <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
              मेरे बारे में
            </p>
            <h1 className="text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">{sarpanch.name}</h1>
            <p className="mt-2 text-base font-medium text-ink/55">
              वर्तमान सरपंच | ग्राम पंचायत, {sarpanch.village || "गांव"}
            </p>
            <p className="mt-5 text-base leading-relaxed text-ink/70">
              मैं आपके गांव का बेटा हूं और आपके विश्वास ने मुझे इस पद तक पहुंचाया है। बचपन से ही मैंने इस गांव की मिट्टी में पलते-बढ़ते हुए यहां की समस्याओं को नज़दीक से देखा और महसूस किया है। मेरा उद्देश्य है कि गांव के हर वर्ग का विकास हो और प्रत्येक परिवार को मूलभूत सुविधाएं मिलें — चाहे वह शिक्षा हो, स्वास्थ्य हो, पानी हो या रोजगार।
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink/70">
              मैं मानता हूं कि सच्ची सेवा वही है जो बिना भेदभाव के, हर घर, हर व्यक्ति तक पहुंचे। मैं हमेशा आपके साथ हूं और आगे भी रहूंगा।
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                href={`/${slug}/contact`}
                className="inline-flex items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white shadow-md shadow-saffron/20 transition-colors hover:bg-saffron-dark"
              >
                मुझसे संपर्क करें
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href={`/${slug}/panchayat`}
                className="inline-flex items-center gap-2 rounded-full border-2 border-navy/15 bg-white px-6 py-3 text-sm font-semibold text-navy transition-colors hover:border-navy/30"
              >
                मेरे कार्य देखें
              </Link>
            </div>
          </div>

          <div className="order-1 mx-auto w-full max-w-sm lg:order-2 lg:max-w-none">
            <div className="aspect-[4/5] w-full overflow-hidden rounded-[2rem] shadow-xl ring-1 ring-navy/10">
              <Portrait src={sarpanch.image} alt={sarpanch.name} className="h-full w-full" />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="व्यक्तिगत जानकारी" title="शिक्षा व अनुभव" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-cream p-6">
              <GraduationCap className="h-8 w-8 text-saffron" />
              <h3 className="mt-3 text-base font-semibold text-navy">शिक्षा</h3>
              <p className="mt-1 text-sm text-ink/60">स्नातक (B.A.), राजकीय महाविद्यालय</p>
            </div>
            <div className="rounded-2xl bg-cream p-6">
              <HeartHandshake className="h-8 w-8 text-saffron" />
              <h3 className="mt-3 text-base font-semibold text-navy">समाज सेवा</h3>
              <p className="mt-1 text-sm text-ink/60">पिछले 8 वर्षों से गांव व समाज हित में सक्रिय</p>
            </div>
            <div className="rounded-2xl bg-cream p-6">
              <Landmark className="h-8 w-8 text-saffron" />
              <h3 className="mt-3 text-base font-semibold text-navy">ग्राम पंचायत अनुभव</h3>
              <p className="mt-1 text-sm text-ink/60">वर्तमान सरपंच, ग्राम पंचायत {sarpanch.village || "गांव"}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="मेरी यात्रा" title="समाज सेवा से सरपंच पद तक" />
          <div className="relative space-y-8 border-s-2 border-navy/15 ps-6 sm:ps-8">
            {timeline.map((t) => (
              <div key={t.year} className="relative">
                <span className="absolute -start-[2.05rem] flex h-6 w-6 items-center justify-center rounded-full bg-saffron ring-4 ring-cream sm:-start-[2.55rem]" />
                <p className="text-sm font-bold text-saffron-dark">{t.year}</p>
                <h3 className="mt-1 text-lg font-semibold text-navy">{t.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/65">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="मेरे मूल्य" title="वो सिद्धांत जिन पर मैं कार्य करता हूं" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl bg-navy p-6 text-white">
                <v.icon className="h-8 w-8 text-saffron" />
                <h3 className="mt-3 text-base font-semibold">{v.title}</h3>
                <p className="mt-1 text-sm text-white/65">{v.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl bg-cream p-8 text-center sm:p-10">
            <Quote className="mx-auto h-8 w-8 text-saffron/50" />
            <p className="mx-auto mt-3 max-w-2xl text-lg font-semibold leading-snug text-navy sm:text-xl">
              गांव का विकास सिर्फ योजनाओं से नहीं, बल्कि ईमानदारी और लगन से होता है।
            </p>
            <p className="mt-4 text-sm text-ink/60">— {sarpanch.name}</p>
          </div>
        </div>
      </section>
    </>
  );
}
