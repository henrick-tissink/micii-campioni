"use client";

import { useState, useEffect, type FormEvent } from "react";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { fbLead, generateEventId } from "@/components/analytics/FacebookPixel";
import { gtagLead, gtagSetUserData } from "@/components/analytics/GoogleAds";

interface FormData {
  name: string;
  phone: string;
  email: string;
  child: string;
  program: string;
  message: string;
}

const PROGRAMS = [
  { value: "metoda", label: "Metoda Sultana · 0–6 luni" },
  { value: "educatie", label: "Educație acvatică · 4–12 luni" },
  { value: "joaca", label: "Joacă acvatică · 1–4 ani" },
  { value: "initiere", label: "Inițiere înot · 4 ani +" },
  { value: "gravide", label: "Activitate acvatică gravide" },
  { value: "parinti", label: "Școala Părinților" },
  { value: "altul", label: "Încă nu m-am hotărât" },
];

const PHONE_RE = /^[\d\s+\-]{8,}$/;
const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

const inputClass =
  "rounded-xl border bg-white px-4 py-3.5 font-body text-[15px] text-sand-900 outline-none transition-colors focus:border-lagoon-foundation dark:bg-night-800 dark:text-white";

export function ContactFormEditorial() {
  const [data, setData] = useState<FormData>({
    name: "", phone: "", email: "", child: "", program: "metoda", message: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [tracking, setTracking] = useState<Record<string, string>>({});

  // Capture UTM params + Facebook cookies on mount (ad attribution / CAPI).
  useEffect(() => {
    if (typeof window === "undefined") return;
    const sp = new URLSearchParams(window.location.search);
    const params: Record<string, string> = {};
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((k) => {
      const v = sp.get(k);
      if (v) params[k] = v;
    });
    const cookies = document.cookie.split(";").reduce((acc, c) => {
      const [k, v] = c.trim().split("=");
      if (k) acc[k] = v;
      return acc;
    }, {} as Record<string, string>);
    if (cookies._fbc) params.fbc = cookies._fbc;
    if (cookies._fbp) params.fbp = cookies._fbp;
    setTracking(params);
  }, []);

  const update = (k: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setData((d) => ({ ...d, [k]: e.target.value }));
  const blur = (k: string) => () => setTouched((t) => ({ ...t, [k]: true }));

  const nameErr = touched.name && data.name.trim().length < 2 ? "Te rugăm să introduci numele." : "";
  const phoneErr = touched.phone && !PHONE_RE.test(data.phone) ? "Număr de telefon invalid." : "";
  const emailErr = touched.email && !EMAIL_RE.test(data.email) ? "Adresă de email invalidă." : "";
  const valid = data.name.trim().length >= 2 && PHONE_RE.test(data.phone) && EMAIL_RE.test(data.email);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!valid) {
      setTouched({ name: true, phone: true, email: true });
      return;
    }
    setBusy(true);
    setError("");
    try {
      const form = e.target as HTMLFormElement;
      const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";
      const eventId = generateEventId("Lead");
      const programLabel = PROGRAMS.find((p) => p.value === data.program)?.label || data.program;
      const message = [
        data.message,
        data.child ? `Vârsta copilului: ${data.child}` : "",
        `Program de interes: ${programLabel}`,
      ]
        .filter(Boolean)
        .join("\n");

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          service: data.program,
          message,
          website: honeypot,
          ...tracking,
          pageUrl: window.location.href,
          eventId,
        }),
      });
      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.error || "A apărut o eroare. Te rugăm să încerci din nou.");
      }

      fbLead({ content_name: programLabel, eventId });
      const parts = data.name.trim().split(/\s+/);
      gtagSetUserData({
        email: data.email,
        phone: data.phone || undefined,
        firstName: parts[0] || "",
        lastName: parts.slice(1).join(" ") || "",
        city: "Bucuresti",
        country: "RO",
      });
      gtagLead(eventId);

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "A apărut o eroare. Te rugăm să încerci din nou.");
    } finally {
      setBusy(false);
    }
  };

  if (submitted) {
    return (
      <div role="status" className="rounded-2xl border border-lagoon-foundation/[0.08] bg-cream p-12 text-center dark:border-white/10 dark:bg-night-800">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-lagoon-foundation text-lagoon-accent">
          <Check className="h-7 w-7" strokeWidth={2.2} />
        </div>
        <h3 className="display mt-6 text-sand-900 dark:text-white" style={{ fontSize: "clamp(32px, 3.6vw, 44px)" }}>
          Mulțumim, <em>{data.name.split(" ")[0]}</em>.
        </h3>
        <p className="mx-auto mt-4 max-w-[520px] text-[17px] leading-relaxed text-sand-700 dark:text-sand-300">
          Am primit cererea ta. Te contactăm telefonic în maximum 24 ore lucrătoare pentru a programa vizita.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            variant="ghost"
            onClick={() => {
              setSubmitted(false);
              setData({ name: "", phone: "", email: "", child: "", program: "metoda", message: "" });
              setTouched({});
            }}
          >
            Trimite altă cerere
          </Button>
          <Button href="/servicii" rightIcon={<ArrowRight className="h-4 w-4" />}>
            Vezi cursurile
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-lagoon-foundation/[0.08] bg-white p-10 shadow-soft dark:border-white/10 dark:bg-night-900"
    >
      <Eyebrow color="coral">PROGRAMEAZĂ O VIZITĂ</Eyebrow>

      {/* Honeypot */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={`mono-eyebrow text-[10px] ${nameErr ? "text-error" : "text-sand-500 dark:text-sand-400"}`}>
            Nume complet <span className="text-coral-refined">*</span>
          </span>
          <input
            value={data.name}
            onChange={update("name")}
            onBlur={blur("name")}
            placeholder="Numele tău"
            className={`${inputClass} ${nameErr ? "border-error" : "border-lagoon-foundation/[0.16]"}`}
          />
          {nameErr && <span className="text-xs text-error">{nameErr}</span>}
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={`mono-eyebrow text-[10px] ${phoneErr ? "text-error" : "text-sand-500 dark:text-sand-400"}`}>
            Telefon <span className="text-coral-refined">*</span>
          </span>
          <input
            value={data.phone}
            onChange={update("phone")}
            onBlur={blur("phone")}
            placeholder="+40 ..."
            inputMode="tel"
            className={`${inputClass} ${phoneErr ? "border-error" : "border-lagoon-foundation/[0.16]"}`}
          />
          {phoneErr && <span className="text-xs text-error">{phoneErr}</span>}
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={`mono-eyebrow text-[10px] ${emailErr ? "text-error" : "text-sand-500 dark:text-sand-400"}`}>
          Email <span className="text-coral-refined">*</span>
        </span>
        <input
          type="email"
          value={data.email}
          onChange={update("email")}
          onBlur={blur("email")}
          placeholder="email@exemplu.ro"
          className={`${inputClass} ${emailErr ? "border-error" : "border-lagoon-foundation/[0.16]"}`}
        />
        {emailErr && <span className="text-xs text-error">{emailErr}</span>}
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="mono-eyebrow text-[10px] text-sand-500 dark:text-sand-400">Vârsta copilului (luni / ani)</span>
        <input value={data.child} onChange={update("child")} placeholder="ex. 8 luni" className={`${inputClass} border-lagoon-foundation/[0.16]`} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="mono-eyebrow text-[10px] text-sand-500 dark:text-sand-400">Program de interes</span>
        <select value={data.program} onChange={update("program")} className={`${inputClass} border-lagoon-foundation/[0.16] appearance-none`}>
          {PROGRAMS.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="mono-eyebrow text-[10px] text-sand-500 dark:text-sand-400">Mesaj (opțional)</span>
        <textarea
          value={data.message}
          onChange={update("message")}
          rows={4}
          placeholder="Spune-ne câteva detalii despre copil — ne ajută să pregătim întâlnirea."
          className={`${inputClass} min-h-[90px] resize-y border-lagoon-foundation/[0.16]`}
        />
      </label>

      {error && <p className="text-sm text-error">{error}</p>}

      <div className="mt-1 flex flex-wrap items-center gap-3.5">
        <Button type="submit" isLoading={busy} rightIcon={<ArrowRight className="h-4 w-4" />}>
          Trimite cererea
        </Button>
        <span className="font-mono text-[13px] tracking-[0.04em] text-sand-500 dark:text-sand-400">
          RĂSPUNDEM ÎN 24h LUCRĂTOARE
        </span>
      </div>
    </form>
  );
}
