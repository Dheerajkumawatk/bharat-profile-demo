import type { Metadata } from "next";
import { MapPin, Users2 } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import { iconMap } from "@/components/icon-map";
import { panchayatInfo, site, wardMembers, works } from "@/data/site";

export const metadata: Metadata = {
  title: `ग्राम पंचायत | ${site.name}`,
};

const infoCards = [
  { label: "कुल जनसंख्या", value: panchayatInfo.population },
  { label: "परिवारों की संख्या", value: panchayatInfo.households },
  { label: "कुल वार्ड", value: panchayatInfo.wards },
  { label: "क्षेत्रफल", value: panchayatInfo.area },
  { label: "साक्षरता दर", value: panchayatInfo.literacyRate },
];

export default function PanchayatPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-saffron-dark">
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            ग्राम पंचायत
          </p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">
            ग्राम पंचायत {site.village}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
            तहसील - देवली, जिला - {site.district}, {site.state}। हमारी पंचायत में {panchayatInfo.villages.length} गांव सम्मिलित हैं और यह पूरे क्षेत्र के समग्र विकास हेतु प्रतिबद्ध है।
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            {infoCards.map((c) => (
              <div key={c.label} className="rounded-2xl bg-cream p-5 text-center">
                <p className="text-xl font-extrabold text-navy sm:text-2xl">{c.value}</p>
                <p className="mt-1 text-xs text-ink/60 sm:text-sm">{c.label}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-2 rounded-2xl bg-navy/5 p-5">
            <MapPin className="h-5 w-5 shrink-0 text-saffron-dark" />
            <span className="text-sm font-medium text-navy">पंचायत क्षेत्र के अंतर्गत गांव:</span>
            {panchayatInfo.villages.map((v) => (
              <span key={v} className="rounded-full bg-white px-3 py-1 text-xs font-medium text-navy/80 ring-1 ring-navy/10">
                {v}
              </span>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="विकास कार्य" title="हमारे प्रमुख कार्य - विस्तृत विवरण" />
          <div className="space-y-4">
            {works.map((w) => {
              const Icon = iconMap[w.icon];
              return (
                <div
                  key={w.title}
                  className="flex flex-col gap-4 rounded-2xl bg-white p-6 ring-1 ring-navy/10 sm:flex-row sm:items-start"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-saffron/10">
                    <Icon className="h-6 w-6 text-saffron-dark" />
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-navy">{w.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink/65">{w.detail}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <SectionHeading eyebrow="पंचायत सदस्य" title="वार्ड पंच सूची" />
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {wardMembers.map((m) => (
              <div key={m.ward} className="flex items-center gap-3 rounded-xl bg-cream p-4">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy/10">
                  <Users2 className="h-5 w-5 text-navy" />
                </span>
                <div>
                  <p className="text-xs font-semibold text-saffron-dark">{m.ward}</p>
                  <p className="text-sm font-medium text-navy">{m.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
