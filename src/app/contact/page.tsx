import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { PageHero } from "@/components/layout/PageHero";
import { ContactFormEditorial } from "./ContactFormEditorial";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contactează-ne pentru informații despre cursurile de înot, programări sau orice alte întrebări. Suntem aici să te ajutăm.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contactează Micii Campioni",
    description:
      "Contactează-ne pentru informații despre cursurile de înot, programări sau orice alte întrebări. Suntem aici să te ajutăm.",
  },
};

const TRANSPORT: [string, string][] = [
  ["Metrou", "5 min de la M2 Aviatorilor (ieșirea sud)"],
  ["Autobuz", "STB 282, 301, 335 (stația Piața Charles de Gaulle)"],
  ["Mașină", "Parcare proprie · acces direct din Strabuna"],
  ["Taxi", "Cere Strabuna 26 sau Piața Charles de Gaulle"],
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        variant="dark"
        eyebrow="CONTACT"
        no="VI"
        title={
          <>
            Vino la <em>bazin</em>. Sună-ne. Scrie-ne.
          </>
        }
        sub="O întâlnire la bazin durează 45 minute și nu te obligă la nimic. Vezi spațiul, observi o ședință, primești răspunsuri. Prima vizită este gratuită."
        height={520}
      />

      {/* Form + info */}
      <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
            <ContactFormEditorial />

            <div className="flex flex-col gap-[18px]">
              {/* Direct contact */}
              <div className="rounded-2xl bg-lagoon-foundation p-8 text-white">
                <p className="mono-eyebrow text-amber-credential">CONTACT DIRECT</p>
                <a
                  href="tel:+40722310052"
                  className="mt-[18px] block font-display text-[32px] italic tracking-[-0.012em] text-white no-underline"
                >
                  +40 722 310 052
                </a>
                <a
                  href="mailto:clubulmiciicampioni@yahoo.com"
                  className="mt-2.5 block font-mono text-[15px] tracking-[0.02em] text-white/85 no-underline"
                >
                  clubulmiciicampioni@yahoo.com
                </a>
                <div className="mt-6 border-t border-white/[0.18] pt-[22px]">
                  <p className="mono-eyebrow text-white/70">PROGRAM</p>
                  <div className="mt-3 text-sm leading-7 text-white">
                    Luni — Vineri · 09:00—20:00
                    <br />
                    Sâmbătă · 09:00—14:00
                    <br />
                    Duminică · închis
                  </div>
                </div>
              </div>

              {/* Location */}
              <div className="rounded-2xl border border-lagoon-foundation/[0.06] bg-white p-7 shadow-soft dark:border-white/10 dark:bg-night-900">
                <p className="mono-eyebrow text-coral-refined">LOCAȚIA NOASTRĂ</p>
                <p className="display mt-3 text-[22px] italic leading-snug text-sand-900 dark:text-white">
                  Str. Strabuna nr. 26
                  <br />
                  Sector 1, București
                </p>
                <p className="mt-3 text-[13.5px] leading-relaxed text-sand-600 dark:text-sand-400">
                  Parcare proprie · Acces persoane cu mobilitate redusă · La 5 minute de metroul Aviatorilor
                </p>
                <a
                  href="https://maps.google.com/?q=Str.+Strabuna+26+Bucuresti"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-[18px] inline-flex items-center gap-2 text-[13px] font-semibold text-lagoon-foundation no-underline dark:text-lagoon-accent"
                >
                  Deschide în Maps
                  <ArrowRight className="h-3.5 w-3.5 -rotate-45" />
                </a>
              </div>

              {/* WhatsApp */}
              <div className="rounded-2xl border border-lagoon-foundation/[0.06] bg-white p-7 shadow-soft dark:border-white/10 dark:bg-night-900">
                <p className="mono-eyebrow text-amber-credential">WHATSAPP</p>
                <p className="mt-3 text-sm leading-relaxed text-sand-700 dark:text-sand-300">
                  Pentru întrebări rapide, ne poți scrie pe WhatsApp. Răspundem în maxim 2 ore în
                  programul de lucru.
                </p>
                <a
                  href="https://wa.me/40722310052"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3.5 inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-[18px] py-3 text-[13px] font-semibold text-white no-underline"
                >
                  <svg width="16" height="16" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                    <path d="M16.003 2C8.27 2 2 8.27 2 16c0 2.476.65 4.797 1.786 6.812L2 30l7.395-1.764A13.93 13.93 0 0 0 16.003 30C23.732 30 30 23.732 30 16S23.732 2 16.003 2Z" />
                  </svg>
                  Scrie pe WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Map + transport */}
      <section className="bg-white py-16 md:py-20 dark:bg-night-900">
        <Container>
          <div className="grid gap-7 lg:grid-cols-[2fr_1fr]">
            <div className="relative aspect-[16/9] overflow-hidden rounded-2xl bg-lagoon-foundation">
              <svg viewBox="0 0 800 450" className="block h-full w-full" aria-hidden="true">
                <defs>
                  <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(94,234,219,0.08)" strokeWidth="1" />
                  </pattern>
                </defs>
                <rect width="800" height="450" fill="url(#map-grid)" />
                <path d="M -20 320 Q 200 280 400 310 T 820 290" stroke="rgba(94,234,219,0.2)" strokeWidth="20" fill="none" />
                <path d="M 0 200 L 800 220" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <path d="M 380 0 L 410 450" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
                <path d="M 100 0 L 130 450" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <path d="M 580 0 L 620 450" stroke="rgba(255,255,255,0.08)" strokeWidth="1.5" />
                <g transform="translate(400,220)">
                  <circle r="80" fill="rgba(234,88,12,0.12)" />
                  <circle r="40" fill="rgba(234,88,12,0.20)" />
                  <circle r="14" fill="#ea580c" />
                  <circle r="6" fill="#fff" />
                </g>
                <text x="420" y="190" fill="rgba(255,255,255,0.85)" fontFamily="var(--font-dm-mono), monospace" fontSize="11" letterSpacing="2">
                  MICII CAMPIONI
                </text>
                <text x="420" y="206" fill="rgba(94,234,219,0.8)" fontFamily="var(--font-dm-mono), monospace" fontSize="10" letterSpacing="2">
                  STR. STRABUNA 26
                </text>
              </svg>
              <span className="absolute left-[18px] top-[18px] rounded-full bg-lagoon-foundation/55 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[var(--tracking-mono)] text-white backdrop-blur-md">
                SECTOR 1 · BUCUREȘTI
              </span>
            </div>
            <div className="flex flex-col justify-center gap-[18px] rounded-2xl bg-cream p-7 dark:bg-night-800">
              <Eyebrow color="coral">CUM AJUNGI</Eyebrow>
              {TRANSPORT.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[80px_1fr] items-baseline gap-3.5">
                  <span className="mono-eyebrow text-sand-500 dark:text-sand-400">{k.toUpperCase()}</span>
                  <span className="text-[14.5px] leading-normal text-sand-800 dark:text-sand-200">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
