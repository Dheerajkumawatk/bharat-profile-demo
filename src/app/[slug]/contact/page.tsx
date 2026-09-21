import type { Metadata } from "next";
import { Clock, Landmark, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/contact/ContactForm";
import { FacebookIcon, InstagramIcon, WhatsappIcon, YoutubeIcon } from "@/components/SocialIcons";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: `संपर्क | ${site.name}`,
};

export default function ContactPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-cream to-white">
        <div className="mx-auto max-w-7xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8">
          <p className="mb-2 flex items-center justify-center gap-2 text-sm font-semibold text-saffron-dark">
            <span className="inline-block h-4 w-1 rounded-full bg-saffron" />
            संपर्क करें
          </p>
          <h1 className="text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl">
            हमसे जुड़ें, अपनी बात रखें
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base text-ink/65">
            किसी भी सुझाव, शिकायत या जानकारी के लिए हमें संदेश भेजें या सीधे संपर्क करें।
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 py-12 sm:px-6 sm:py-14 lg:grid-cols-[1fr_1.3fr] lg:gap-12 lg:px-8">
          <div className="space-y-6">
            <div className="rounded-2xl bg-navy p-6 text-white sm:p-8">
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
                <Landmark className="h-6 w-6 text-saffron" />
              </span>
              <h2 className="mt-4 text-lg font-bold">{site.name}</h2>
              <p className="mt-1 text-sm text-white/65">{site.role}</p>

              <ul className="mt-6 space-y-4 text-sm">
                <li className="flex items-start gap-3">
                  <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                  <a href={`tel:${site.phone.replace(/\s/g, "")}`} dir="ltr" className="hover:text-saffron">
                    {site.phone}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                  <a href={`mailto:${site.email}`} className="break-all hover:text-saffron">
                    {site.email}
                  </a>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                  <span>{site.address}</span>
                </li>
                <li className="flex items-start gap-3">
                  <Clock className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                  <span>सोमवार - शनिवार, सुबह 10:00 - शाम 5:00</span>
                </li>
              </ul>

              <div className="mt-6 flex gap-3 border-t border-white/10 pt-6">
                {[FacebookIcon, InstagramIcon, YoutubeIcon, WhatsappIcon].map((Icon, i) => (
                  <a
                    key={i}
                    href="#"
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-saffron"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            <div className="overflow-hidden rounded-2xl ring-1 ring-navy/10">
              <div className="relative flex aspect-[4/3] items-center justify-center bg-gradient-to-br from-navy to-navy-light sm:aspect-video">
                <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="map-grid" width="8" height="8" patternUnits="userSpaceOnUse">
                      <path d="M 8 0 L 0 0 0 8" fill="none" stroke="white" strokeWidth="0.4" />
                    </pattern>
                  </defs>
                  <rect width="100" height="100" fill="url(#map-grid)" />
                </svg>
                <div className="relative flex flex-col items-center gap-2 text-center text-white">
                  <MapPin className="h-9 w-9 text-saffron" />
                  <span className="max-w-[220px] text-sm font-medium">
                    ग्राम पंचायत कार्यालय, {site.village}, {site.district}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl bg-cream p-6 sm:p-8">
            <h2 className="text-lg font-bold text-navy">संदेश भेजें</h2>
            <p className="mt-1 text-sm text-ink/60">
              नीचे दिया गया फॉर्म भरें, हम शीघ्र आपसे संपर्क करेंगे।
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
