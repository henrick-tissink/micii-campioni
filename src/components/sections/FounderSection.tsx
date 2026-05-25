import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";

// =============================================================================
// Home-only editorial founder section (hardcoded per design handoff).
// The shared, prop-driven `FounderStrip` is used by inner pages.
// =============================================================================

const STATS = [
  { value: "25", label: "Ani de carieră" },
  { value: "7.900+", label: "Copii formați" },
  { value: "1", label: "Metodologie acreditată" },
];

export function FounderSection() {
  return (
    <section id="despre" className="relative overflow-hidden bg-cream py-24 md:py-28 dark:bg-night-800">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[72px]">
          {/* Portrait */}
          <div className="relative">
            <div
              className="relative aspect-[4/5] overflow-hidden rounded-2xl shadow-cinematic"
              style={{ filter: "saturate(0.95) contrast(1.05)" }}
            >
              <Image
                src="/images/team/georgeta-sultana.jpg"
                alt="Georgeta Sultana, fondatoarea Clubului Micii Campioni"
                fill
                sizes="(max-width: 1024px) 100vw, 35vw"
                className="object-cover object-top"
              />
            </div>
            {/* Decorative numeral */}
            <div
              aria-hidden="true"
              className="display absolute -left-7 -top-10 italic leading-none text-coral-refined opacity-[0.14]"
              style={{ fontSize: 160 }}
            >
              2001
            </div>
            {/* Credential card */}
            <div className="absolute inset-x-6 bottom-6 rounded-2xl bg-white/95 p-[18px] shadow-medium backdrop-blur-md dark:bg-night-900/95">
              <div className="mono-eyebrow text-amber-credential">FONDATOARE · 1996—ASTĂZI</div>
              <div className="display mt-1.5 text-[22px] text-sand-900 dark:text-white">
                Georgeta Sultana
              </div>
              <div className="mt-0.5 text-[13px] text-sand-600 dark:text-sand-400">
                Autor al Metodei Sultana · COR 342215
              </div>
            </div>
          </div>

          {/* Quote */}
          <div>
            <Eyebrow color="coral">CUVÂNTUL FONDATOAREI</Eyebrow>
            <blockquote className="relative m-0 mt-5">
              <span
                aria-hidden="true"
                className="display absolute -left-2.5 -top-9 italic leading-none text-coral-refined opacity-25"
                style={{ fontSize: 120 }}
              >
                &ldquo;
              </span>
              <p
                className="display m-0 text-balance text-sand-900 dark:text-white"
                style={{ fontSize: "clamp(28px, 3.4vw, 48px)", lineHeight: 1.15 }}
              >
                Cred că <em>apa nu se cucerește</em> — se înțelege. Iar fiecare copil învață în
                ritmul lui. <em>Cu răbdare, cu joc, cu respect.</em>
              </p>
            </blockquote>
            <div className="mt-9 grid grid-cols-3 gap-6 border-t border-lagoon-foundation/[0.12] pt-7 dark:border-white/10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <p className="stat-num m-0 text-4xl italic text-lagoon-foundation dark:text-lagoon-accent">
                    {s.value}
                  </p>
                  <p className="mono-eyebrow mt-2 text-sand-500 dark:text-sand-400">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
