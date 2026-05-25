"use client";

import { useState } from "react";
import { Plus, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

// =============================================================================
// Content
// =============================================================================

const FAQS = [
  {
    q: "De la ce vârstă putem începe?",
    a: "Acceptăm bebeluși de la 2 zile de la naștere, sub supravegherea medicului. Pentru cei mai mici, primele ședințe sunt scurte (15–20 min) și se concentrează pe adaptare și tehnici de masaj subacvatic.",
  },
  {
    q: "Trebuie să știe părintele să înoate?",
    a: "Nu. Adâncimea este variabilă, instructorul este în apă cu voi, iar pentru bebeluși părintele rămâne în zona accesibilă. Conducerea ședinței este 100% a instructorului certificat.",
  },
  {
    q: "Cum este apa din bazin?",
    a: "Apă purificată cu stație proprie, temperatură constantă de 32°C, profunzime variabilă. Parametrii sunt măsurați continuu. Bazinul este dedicat exclusiv bebelușilor și copiilor mici — nu este un bazin public.",
  },
  {
    q: "Cât durează un curs și cât costă?",
    a: "Ședințele durează între 40 și 60 minute, în funcție de vârstă. Programul este flexibil, săptămânal sau bisăptămânal. Pentru tarife actualizate, vă rugăm să ne contactați direct — fiecare program se construiește pe nevoile copilului.",
  },
  {
    q: "Ce este COR 342215?",
    a: 'COR 342215 este codul ocupațional românesc pentru "Instructor educație acvatică timpurie" — atestat exclusiv pentru Metoda Sultana. Suntem singurul club din România cu această acreditare.',
  },
];

// =============================================================================
// Component
// =============================================================================

export function FaqSection() {
  const [open, setOpen] = useState(0);
  const baseId = "home-faq";

  return (
    <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-[88px]">
          {/* Sticky intro */}
          <div className="lg:sticky lg:top-[120px]">
            <Eyebrow>ÎNTREBĂRI</Eyebrow>
            <h2
              className="display mt-3.5 text-balance text-sand-900 dark:text-white"
              style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
            >
              Ce ne întreabă <em>cel mai des părinții</em>.
            </h2>
            <p className="mt-4 max-w-[380px] text-base leading-relaxed text-sand-600 dark:text-sand-400">
              Răspunsuri scurte. Pentru detalii și o evaluare individuală, vă așteptăm la o
              vizită gratuită la bazin.
            </p>
            <div className="mt-7">
              <Button href="/contact" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Programează vizită
              </Button>
            </div>
          </div>

          {/* Accordion */}
          <div>
            {FAQS.map((f, i) => {
              const isOpen = i === open;
              const panelId = `${baseId}-panel-${i}`;
              const btnId = `${baseId}-btn-${i}`;
              return (
                <div
                  key={f.q}
                  className="border-b border-lagoon-foundation/20 first:border-t first:border-lagoon-foundation/20 dark:border-white/15 dark:first:border-white/15"
                >
                  <h3 className="m-0">
                    <button
                      id={btnId}
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      onClick={() => setOpen(isOpen ? -1 : i)}
                      className="grid w-full grid-cols-[40px_1fr_auto] items-center gap-4 py-6 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lagoon-foundation/40"
                    >
                      <span className="display text-[18px] italic text-coral-refined dark:text-coral-400">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className="display tracking-[-0.005em] text-sand-900 dark:text-white"
                        style={{ fontSize: "clamp(18px, 1.6vw, 22px)" }}
                      >
                        {f.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-lagoon-foundation/20 transition-all duration-300 dark:border-white/20"
                        style={{
                          background: isOpen ? "var(--color-lagoon-foundation)" : "transparent",
                          color: isOpen ? "#fff" : "var(--color-sand-700)",
                          transform: isOpen ? "rotate(45deg)" : undefined,
                        }}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </button>
                  </h3>
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={btnId}
                    className="overflow-hidden transition-[max-height] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                    style={{ maxHeight: isOpen ? 280 : 0 }}
                  >
                    <p className="mb-6 max-w-[600px] pl-14 text-base leading-relaxed text-sand-700 dark:text-sand-300">
                      {f.a}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
