import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Landmark, Mail, MapPin, Phone } from "lucide-react";
import { navLinks, site } from "@/data/site";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/SocialIcons";
import type { Sarpanch } from "@prisma/client";

export function Footer({ sarpanch, slug }: { sarpanch: Sarpanch; slug: string }) {
  return (
    <footer>
      <div className="relative overflow-hidden bg-navy">
        <Image
          src="/images/village-hero.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-navy/80" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 items-center gap-6 px-4 py-7 text-white sm:px-6 lg:grid-cols-[1fr_1.25fr_0.85fr] lg:px-8">
          <div className="flex items-center gap-4">
            <MapPin className="h-11 w-11 shrink-0 text-saffron" />
            <div>
              <h3 className="text-xl font-bold">हमसे संपर्क करें</h3>
              <p className="mt-1 text-sm text-white/70">किसी भी सुझाव, शिकायत या जानकारी के लिए संपर्क करें</p>
            </div>
          </div>
          <ul className="grid gap-2 text-sm text-white/85 sm:grid-cols-3">
            <li className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-white" />
              <span dir="ltr">{sarpanch.phone || site.phone}</span>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-white" />
              <span className="break-all">{site.email}</span>
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-white" />
              <span>ग्राम पंचायत {sarpanch.village || site.village}</span>
            </li>
          </ul>
          <div className="flex items-center justify-between gap-4 lg:justify-end">
            <p className="hidden text-right text-xl font-bold leading-tight sm:block">
              जनता का साथ
              <br />
              विकास की राह
            </p>
            <Link
              href={`/${slug}/contact`}
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-saffron px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-saffron-dark"
            >
              मेरे साथ जुड़ें
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      <div className="relative overflow-hidden bg-navy-dark text-white/80">
        <Image
          src="/images/footer-bg.png"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-100"
        />
        <div className="absolute inset-0 bg-black/25" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-black/50" />
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-7 sm:grid-cols-2 sm:px-6 lg:grid-cols-[1.2fr_1fr_1fr_1fr] lg:px-8">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10">
                <Landmark className="h-5 w-5 text-saffron" />
              </span>
              <span className="text-base font-bold text-white">{sarpanch.name}</span>
            </div>
            <p className="mt-3 text-sm leading-relaxed">
              ग्राम पंचायत सरपंच {sarpanch.village || site.village}। सशक्त पंचायत, समृद्ध गांव, खुशहाल भविष्य के संकल्प के साथ आपकी सेवा में।
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">त्वरित लिंक</h4>
            <ul className="mt-3 space-y-2 text-sm">
              {navLinks.map((link) => {
                const href = link.href === "/" ? `/${slug}` : `/${slug}${link.href}`;
                return (
                  <li key={href}>
                    <Link href={href} className="transition-colors hover:text-saffron">
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">संपर्क जानकारी</h4>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span dir="ltr">{sarpanch.phone || site.phone}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span className="break-all">{site.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-saffron" />
                <span>ग्राम पंचायत {sarpanch.village || site.village}</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white">हमें फॉलो करें</h4>
            <div className="mt-3 flex gap-3">
              {[
                { icon: FacebookIcon, href: site.social.facebook },
                { icon: InstagramIcon, href: site.social.instagram },
                { icon: YoutubeIcon, href: site.social.youtube },
              ].map(({ icon: Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-colors hover:bg-saffron"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="relative border-t border-white/10 px-4 py-5 text-center text-xs text-white/60 sm:px-6">
          © 2026, सर्वाधिकार सुरक्षित — {sarpanch.name}
        </div>
      </div>
    </footer>
  );
}
