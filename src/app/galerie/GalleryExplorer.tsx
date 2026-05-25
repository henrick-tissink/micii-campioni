"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { Container } from "@/components/ui/Container";

interface GalleryItem {
  src: string;
  category: string;
  caption: string;
  aspect: string;
}

const GALLERY: GalleryItem[] = [
  { src: "/images/carousel/hero-baby.jpg", category: "bebelusi", caption: "Prima imersiune · 4 luni", aspect: "4/5" },
  { src: "/images/carousel/hero-2.jpg", category: "educatie", caption: "Plutire dorsală asistată", aspect: "4/3" },
  { src: "/images/carousel/hero-3.jpg", category: "initiere", caption: "Inițiere înot · Stil bras", aspect: "3/4" },
  { src: "/images/carousel/hero-4.jpg", category: "educatie", caption: "Joacă acvatică · 2 ani", aspect: "4/5" },
  { src: "/images/carousel/hero-5.jpg", category: "gravide", caption: "Activitate prenatală", aspect: "4/3" },
  { src: "/images/carousel/hero-6.jpg", category: "evenimente", caption: "Aniversare 25 ani", aspect: "3/4" },
  { src: "/images/carousel/hero-baby.jpg", category: "bebelusi", caption: "Metoda Sultana · masaj subacvatic", aspect: "4/3" },
  { src: "/images/carousel/hero-3.jpg", category: "initiere", caption: "Lecție tehnică · 6 ani", aspect: "4/5" },
  { src: "/images/carousel/hero-2.jpg", category: "educatie", caption: "Curaj și prima săritură", aspect: "3/4" },
  { src: "/images/carousel/hero-4.jpg", category: "evenimente", caption: "Petrecere de absolvire", aspect: "4/3" },
  { src: "/images/carousel/hero-5.jpg", category: "gravide", caption: "Relaxare în apă · trimestrul 3", aspect: "4/5" },
  { src: "/images/carousel/hero-6.jpg", category: "evenimente", caption: "Echipa Sultana · Crăciun", aspect: "3/4" },
];

const CATEGORIES = [
  { id: "toate", label: "Toate" },
  { id: "bebelusi", label: "Bebeluși" },
  { id: "educatie", label: "Educație" },
  { id: "initiere", label: "Inițiere înot" },
  { id: "gravide", label: "Gravide" },
  { id: "evenimente", label: "Evenimente" },
];

export function GalleryExplorer() {
  const [cat, setCat] = useState("toate");
  const [lbIdx, setLbIdx] = useState<number | null>(null);

  const filtered = cat === "toate" ? GALLERY : GALLERY.filter((g) => g.category === cat);

  const close = useCallback(() => setLbIdx(null), []);
  const next = useCallback(() => setLbIdx((i) => (i === null ? i : (i + 1) % filtered.length)), [filtered.length]);
  const prev = useCallback(
    () => setLbIdx((i) => (i === null ? i : (i - 1 + filtered.length) % filtered.length)),
    [filtered.length]
  );

  useEffect(() => {
    if (lbIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lbIdx, close, next, prev]);

  const lbItem = lbIdx === null ? null : filtered[lbIdx];

  return (
    <section className="bg-cream py-24 md:py-28 dark:bg-night-800">
      <Container>
        {/* Filter chips */}
        <div className="mb-12 flex flex-wrap items-center gap-2.5">
          <span className="mono-eyebrow mr-3 text-sand-500 dark:text-sand-400">FILTRU</span>
          {CATEGORIES.map((c) => {
            const count =
              c.id === "toate" ? GALLERY.length : GALLERY.filter((g) => g.category === c.id).length;
            const isActive = c.id === cat;
            return (
              <button
                key={c.id}
                type="button"
                onClick={() => setCat(c.id)}
                aria-pressed={isActive}
                className={`inline-flex items-center gap-2 rounded-full border px-[18px] py-2 text-[13px] font-medium transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                  isActive
                    ? "border-transparent bg-lagoon-foundation text-white"
                    : "border-lagoon-foundation/[0.12] bg-white text-sand-800 dark:border-white/10 dark:bg-night-900 dark:text-sand-200"
                }`}
              >
                {c.label}
                <span className={`font-mono text-[10px] tracking-[0.04em] ${isActive ? "text-lagoon-accent" : "text-sand-400"}`}>
                  {String(count).padStart(2, "0")}
                </span>
              </button>
            );
          })}
        </div>

        {/* Masonry columns */}
        <div className="gap-6 [column-count:1] sm:[column-count:2] lg:[column-count:3]">
          {filtered.map((item, i) => (
            <button
              key={`${item.src}-${i}`}
              type="button"
              onClick={() => setLbIdx(i)}
              className="group mb-6 block w-full break-inside-avoid overflow-hidden rounded-[18px] p-0 [break-inside:avoid]"
              aria-label={`Deschide: ${item.caption}`}
            >
              <figure className="relative m-0">
                <div className="relative w-full overflow-hidden rounded-[18px]" style={{ aspectRatio: item.aspect }}>
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-[600ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                    style={{ filter: "saturate(0.95) contrast(1.05)" }}
                  />
                </div>
                <figcaption
                  className="absolute inset-0 flex items-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: "linear-gradient(180deg, transparent 50%, rgba(7,51,47,0.75))" }}
                >
                  <div className="text-left text-white">
                    <div className="mono-eyebrow text-[10px] text-lagoon-accent">{item.category.toUpperCase()}</div>
                    <div className="display mt-1.5 text-[20px] italic text-white">{item.caption}</div>
                  </div>
                </figcaption>
                <span className="absolute right-3.5 top-3.5 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-lagoon-foundation opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <Maximize2 className="h-3.5 w-3.5" />
                </span>
              </figure>
            </button>
          ))}
        </div>
      </Container>

      {/* Lightbox */}
      {lbItem && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lbItem.caption}
          onClick={close}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-6 backdrop-blur-xl md:p-10"
          style={{ background: "rgba(7,51,47,0.96)", animation: "fadeIn 0.3s cubic-bezier(0.22,1,0.36,1)" }}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Închide"
            className="absolute right-6 top-6 z-2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Anterior"
            className="absolute left-6 top-1/2 z-2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Următor"
            className="absolute right-6 top-1/2 z-2 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <figure className="m-0 flex max-h-[85vh] max-w-[90vw] flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <div className="relative" style={{ width: "min(90vw, 1000px)", height: "min(78vh, 1000px)" }}>
              <Image src={lbItem.src} alt={lbItem.caption} fill sizes="90vw" className="rounded-xl object-contain" />
            </div>
            <figcaption className="text-center text-white">
              <div className="mono-eyebrow text-lagoon-accent">{lbItem.category.toUpperCase()}</div>
              <div className="display mt-2 text-[22px] italic">{lbItem.caption}</div>
            </figcaption>
          </figure>
        </div>
      )}
    </section>
  );
}
