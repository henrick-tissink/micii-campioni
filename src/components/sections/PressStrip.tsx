import { Container } from "@/components/ui/Container";

const PRESS = [
  "Pro TV",
  "Antena 1",
  "Adevărul",
  "Click!",
  "Libertatea",
  "Digi24",
  "Forbes România",
  "Avantaje",
];

/**
 * Masked-edge marquee of press mentions in italic Newsreader.
 */
export function PressStrip() {
  return (
    <section className="overflow-hidden border-b border-lagoon-foundation/[0.06] bg-white py-9 dark:border-white/10 dark:bg-night-900">
      <Container>
        <div className="grid items-center gap-12 sm:grid-cols-[auto_1fr]">
          <div className="mono-eyebrow text-amber-credential">Cu noi în presă</div>
          <div
            className="overflow-hidden"
            style={{
              maskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
              WebkitMaskImage:
                "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            }}
          >
            <div className="marquee-track" aria-hidden="true">
              {[...PRESS, ...PRESS].map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-16 whitespace-nowrap pr-16 text-sand-700 dark:text-sand-300"
                  style={{
                    fontFamily: "var(--font-newsreader), Georgia, serif",
                    fontStyle: "italic",
                    fontSize: 26,
                    letterSpacing: "-0.01em",
                    fontVariationSettings: '"opsz" 28',
                  }}
                >
                  {p}
                  <span className="not-italic text-sand-300 dark:text-sand-600">·</span>
                </div>
              ))}
            </div>
            <span className="sr-only">
              Apariții în presă: {PRESS.join(", ")}.
            </span>
          </div>
        </div>
      </Container>
    </section>
  );
}
