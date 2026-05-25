import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Button } from "@/components/ui/Button";

// =============================================================================
// Content
// =============================================================================

const PRINCIPLES = [
  {
    n: "01",
    title: "Apa, prelungire firească",
    body: "Bebelușul se naște dintr-un mediu acvatic. Reintroducem apa ca pe un loc cunoscut — nu ca pe un mediu de cucerit.",
  },
  {
    n: "02",
    title: "Stimulare psihomotorie",
    body: "Imersiunile controlate și mișcările libere construiesc un sistem nervos calm și un tonus corporal echilibrat.",
  },
  {
    n: "03",
    title: "Ritmul propriu al copilului",
    body: "Nu există etape forțate. Fiecare mic campion primește un protocol adaptat vârstei și gradului său de adaptare.",
  },
  {
    n: "04",
    title: "Părintele, parte din proces",
    body: "Părintele este partener. Învață, observă și se conectează prin contactul direct cu copilul, în apă.",
  },
  {
    n: "05",
    title: "Acreditare și măsură",
    body: "Singura metodologie românească acreditată — cod COR 342215. Rezultatele sunt urmărite, documentate, replicabile.",
  },
];

const INFO = [
  {
    label: "Bazin propriu",
    body: "Apă purificată, temperatură constantă 32°C, profunzime variabilă.",
  },
  {
    label: "1 instructor / copil",
    body: "Fiecare mic campion are instructorul său certificat. Niciodată în grup.",
  },
  {
    label: "Părinte în apă",
    body: "Pentru sub 1 an, părintele este partener activ în ședință.",
  },
  {
    label: "Protocoale",
    body: "5 protocoale distincte, după vârstă și nivel de adaptare.",
  },
];

// =============================================================================
// Component
// =============================================================================

export function MetodaSection() {
  return (
    <section id="metoda" className="relative bg-cream py-24 md:py-28 dark:bg-night-800">
      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr] lg:gap-[88px]">
          {/* Left: explainer */}
          <div>
            <Eyebrow>Metoda Sultana</Eyebrow>
            <h2
              className="display mt-4 text-balance text-sand-900 dark:text-white"
              style={{ fontSize: "clamp(40px, 5vw, 72px)" }}
            >
              Apa nu se cucerește.
              <br />
              <em className="text-lagoon-foundation dark:text-lagoon-accent">Se înțelege.</em>
            </h2>
            <p className="mt-6 max-w-[520px] text-lg leading-relaxed text-sand-700 dark:text-sand-300">
              Metoda dezvoltată de Georgeta Sultana din 2001 transformă înotul într-un
              instrument de stimulare psihomotorie. Cinci principii, cinci stadii, un
              parcurs adaptat fiecărui copil — de la nou-născut la pre-școlar.
            </p>

            {/* 2×2 info grid */}
            <div className="mt-10 grid grid-cols-1 gap-7 border-t border-lagoon-foundation/[0.12] pt-8 sm:grid-cols-2 dark:border-white/10">
              {INFO.map((it) => (
                <div key={it.label}>
                  <p className="mono-eyebrow text-sand-500 dark:text-sand-400">{it.label}</p>
                  <p className="mt-2 text-base leading-snug text-sand-800 dark:text-sand-200">
                    {it.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10">
              <Button href="/concept" variant="outline" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Descoperă metoda
              </Button>
            </div>
          </div>

          {/* Right: numbered principles */}
          <ol className="m-0 list-none p-0">
            {PRINCIPLES.map((p) => (
              <li
                key={p.n}
                className="grid grid-cols-[76px_1fr] gap-5 border-t border-lagoon-foundation/10 py-6 first:border-t-lagoon-foundation/20 last:border-b last:border-lagoon-foundation/20 dark:border-white/10 dark:first:border-t-white/20 dark:last:border-white/20"
              >
                <div className="display pt-1 text-[36px] italic leading-none text-coral-refined dark:text-coral-400">
                  {p.n}
                </div>
                <div>
                  <h3 className="display text-[22px] tracking-[-0.01em] text-sand-900 dark:text-white">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-[15px] leading-relaxed text-sand-600 dark:text-sand-400">
                    {p.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </Container>
    </section>
  );
}
