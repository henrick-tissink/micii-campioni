import Image from "next/image";
import { Container } from "@/components/ui/Container";

const ITEMS = [
  {
    img: "/images/carousel/hero-2.jpg",
    caption: "Bazinul propriu",
    spec: "Apă purificată · 32°C constant · profunzime variabilă",
    alt: "Bazinul Micii Campioni",
  },
  {
    img: "/images/carousel/hero-4.jpg",
    caption: "Vestiare familiale",
    spec: "Spațiu separat părinte–copil · uscătoare · zona privată",
    alt: "Vestiarele familiale",
  },
  {
    img: "/images/carousel/hero-6.jpg",
    caption: "Echipa Sultana",
    spec: "50+ instructori certificați · COR 342215",
    alt: "Echipa de instructori",
  },
];

export function FacilityStrip() {
  return (
    <section className="bg-white pb-24 pt-20 md:pb-28 dark:bg-night-900">
      <Container>
        <div className="grid gap-5 md:grid-cols-3">
          {ITEMS.map((it, i) => (
            <figure key={it.caption} className="relative m-0">
              <div
                className="relative aspect-[4/5] overflow-hidden rounded-2xl"
                style={{ filter: "saturate(0.92) contrast(1.05)" }}
              >
                <Image
                  src={it.img}
                  alt={it.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                  style={{
                    background: "linear-gradient(180deg, transparent 50%, rgba(7,51,47,0.7))",
                  }}
                />
                <figcaption className="absolute inset-x-6 bottom-6 text-white">
                  <div className="mono-eyebrow text-lagoon-accent">
                    {String(i + 1).padStart(2, "0")} / 03
                  </div>
                  <h3 className="display mb-1.5 mt-2.5 text-[28px] text-white">{it.caption}</h3>
                  <p className="m-0 text-[13px] leading-relaxed text-white/80">{it.spec}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
