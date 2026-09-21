"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Landmark, Menu, UserRound, X } from "lucide-react";
import { navLinks, site } from "@/data/site";
import type { Sarpanch } from "@prisma/client";

export function Navbar({ sarpanch, slug }: { sarpanch: Sarpanch; slug: string }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white/95 shadow-sm backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2.5 sm:px-6 lg:px-8">
        <Link href={`/${slug}`} className="flex items-center gap-2.5 sm:gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-cream ring-1 ring-navy/10 sm:h-14 sm:w-14">
            <Landmark className="h-7 w-7 text-navy sm:h-8 sm:w-8" />
          </span>
          <span className="leading-tight">
            <span className="block text-[10px] font-bold tracking-wide text-navy/75 sm:text-xs">
              {site.tagline}
            </span>
            <span className="block text-sm font-extrabold text-navy sm:text-lg">{sarpanch.name}</span>
            <span className="hidden text-[11px] font-medium text-ink/55 sm:block">
              ग्राम पंचायत सरपंच
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => {
            const href = link.href === "/" ? `/${slug}` : `/${slug}${link.href}`;
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`rounded px-3 py-2 text-sm font-semibold transition-colors ${
                  active
                    ? "text-saffron"
                    : "text-navy/80 hover:bg-cream hover:text-navy"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <Link
          href={`/${slug}/contact`}
          className="hidden shrink-0 items-center gap-2 rounded-full bg-saffron px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-saffron-dark lg:inline-flex"
        >
          <UserRound className="h-4 w-4" />
          मेरे साथ जुड़ें
        </Link>

        <button
          type="button"
          aria-label="मेनू खोलें"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-navy/15 text-navy lg:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-navy/10 bg-white px-4 pb-4 pt-2 lg:hidden">
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const href = link.href === "/" ? `/${slug}` : `/${slug}${link.href}`;
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setOpen(false)}
                  className={`rounded-lg px-4 py-3 text-base font-medium ${
                    active ? "bg-navy text-white" : "text-navy/80 hover:bg-cream"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
            <Link
              href={`/${slug}/contact`}
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-saffron px-4 py-3 text-base font-semibold text-white"
            >
              <UserRound className="h-4 w-4" />
              मेरे साथ जुड़ें
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
