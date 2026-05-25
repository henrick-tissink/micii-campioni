import { Quote } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { SectionHead } from "@/components/ui/SectionHead";

// =============================================================================
// Types (back-compat — `testimonials` prop optional and ignored)
// =============================================================================

export interface TestimonialsSectionProps {
  testimonials?: unknown;
}

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  initials: string;
  featured?: boolean;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      "Înotul timpuriu crește încrederea în sine și independența copilului, prin mișcări libere executate în apă, lucru care nu este posibil pentru copilul mic cu aceeași ușurință în mediul terestru. Apa devine acum, ca în burtica mamei, un mediu protector și stimulant.",
    author: "Simona Bălănescu",
    role: "Realizator TV",
    initials: "SB",
    featured: true,
  },
  {
    quote:
      "Pentru noi, beneficiile Metodei Sultana pot fi exprimate matematic pe hârtie, în măsura în care metoda a pus bazele psihomotorii ale unor performanțe remarcabile la concursuri naționale de natație.",
    author: "Adela și Dragoș Stan",
    role: "Părinții lui Filip și Leon, multipli campioni naționali",
    initials: "AS",
  },
  {
    quote:
      "Toți ne dorim copii sănătoși și mișcarea încă de la o vârstă fragedă nu poate să facă decât bine. Pentru ambii copii am ales să o am aproape pe GETI. Și-a dezvoltat o echipă serioasă de profesioniști.",
    author: "Sanda Ladoși",
    role: "Cântăreață",
    initials: "SL",
  },
  {
    quote:
      "Diferența dintre un bebeluș care a făcut acvatică cu Geti și unul care nu a făcut se vede de la prima imersiune: e calm, e atent, e prezent. Apa devine prietena lui.",
    author: "Andreea P.",
    role: "Mamă · 2 mici campioni",
    initials: "AP",
  },
];

// =============================================================================
// Component
// =============================================================================

export function TestimonialsSection(_props: TestimonialsSectionProps = {}) {
  const featured = TESTIMONIALS.find((t) => t.featured) ?? TESTIMONIALS[0];
  const rest = TESTIMONIALS.filter((t) => t !== featured);

  return (
    <section className="bg-white py-24 md:py-28 dark:bg-night-900">
      <Container>
        <SectionHead
          no="III"
          eyebrow="TESTIMONIALE"
          title={
            <>
              Vocile părinților, <em>de la 0 la 25 de ani</em>.
            </>
          }
          sub="Familii, jurnaliști, sportivi — comunitatea Micii Campioni înseamnă mii de povești adunate în jurul aceluiași bazin."
        />

        <div className="grid gap-7 lg:grid-cols-[1.4fr_1fr]">
          {/* Featured */}
          <article className="relative overflow-hidden rounded-[28px] bg-cream p-8 md:p-14 dark:bg-night-800">
            <span
              aria-hidden="true"
              className="display pointer-events-none absolute -top-12 right-0 italic leading-none text-amber-credential/10"
              style={{ fontSize: 320 }}
            >
              &ldquo;
            </span>
            <Eyebrow color="amber">FEATURED · PRO TV</Eyebrow>
            <blockquote className="mt-6">
              <p
                className="display m-0 text-sand-900 dark:text-white"
                style={{ fontSize: "clamp(22px, 2.4vw, 30px)", lineHeight: 1.35 }}
              >
                <em>&ldquo;</em>
                {featured.quote}
                <em>&rdquo;</em>
              </p>
            </blockquote>
            <div className="mt-9 flex items-center gap-4 border-t border-lagoon-foundation/10 pt-6 dark:border-white/10">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-lagoon-foundation font-display text-xl font-medium italic text-lagoon-accent">
                {featured.initials}
              </span>
              <div>
                <div className="display text-[19px] text-sand-900 dark:text-white">
                  {featured.author}
                </div>
                <div className="mt-0.5 text-[13px] text-sand-500 dark:text-sand-400">
                  {featured.role}
                </div>
              </div>
            </div>
          </article>

          {/* Stack */}
          <div className="flex flex-col gap-3.5">
            {rest.map((t) => (
              <article
                key={t.author}
                className="relative rounded-[20px] border border-lagoon-foundation/10 bg-white px-7 py-6 dark:border-white/10 dark:bg-night-800"
              >
                <div className="flex items-start justify-between gap-4">
                  <Quote className="mt-1 h-5 w-5 shrink-0 fill-amber-credential text-amber-credential opacity-80" />
                  <p className="m-0 flex-1 text-[14.5px] leading-relaxed text-sand-700 dark:text-sand-300">
                    {t.quote}
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-3 border-t border-lagoon-foundation/[0.06] pt-3.5 dark:border-white/10">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-lagoon-100 font-display text-[13px] font-medium italic text-lagoon-700 dark:bg-night-700 dark:text-lagoon-accent">
                    {t.initials}
                  </span>
                  <div>
                    <div className="text-[13px] font-semibold text-sand-900 dark:text-white">
                      {t.author}
                    </div>
                    <div className="text-[11px] text-sand-500 dark:text-sand-400">{t.role}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
