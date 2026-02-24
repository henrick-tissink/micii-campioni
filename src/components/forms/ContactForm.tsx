"use client";

import { useState, useEffect, type FormEvent } from "react";
import { Button } from "@/components/ui/Button";
import { Input, Textarea, Select } from "@/components/ui/Input";
import { fbLead, generateEventId } from "@/components/analytics/FacebookPixel";

// =============================================================================
// Types
// =============================================================================

interface FormState {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

type FormStatus = "idle" | "submitting" | "success" | "error";

interface UTMParams {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbc?: string; // Facebook click ID
  fbp?: string; // Facebook browser ID
}

// =============================================================================
// Service Options
// =============================================================================

const serviceOptions = [
  { value: "cursuri-prenatale", label: "Cursuri Prenatale Lamaze" },
  { value: "inot-bebelusi", label: "Înot Bebeluși (0-3 ani)" },
  { value: "inot-copii", label: "Înot Copii (3-12 ani)" },
  { value: "kinetoterapie", label: "Kinetoterapie Pediatrică" },
  { value: "consultatie", label: "Consultație Generală" },
  { value: "altele", label: "Altele" },
];

// =============================================================================
// Component
// =============================================================================

export function ContactForm() {
  const [formData, setFormData] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    service: "",
    message: "",
  });
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [utmParams, setUtmParams] = useState<UTMParams>({});

  // Capture UTM parameters and Facebook cookies on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const searchParams = new URLSearchParams(window.location.search);
    const params: UTMParams = {};

    // Capture UTM parameters
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach((key) => {
      const value = searchParams.get(key);
      if (value) {
        params[key as keyof UTMParams] = value;
      }
    });

    // Capture Facebook cookies for Conversions API
    const cookies = document.cookie.split(";").reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split("=");
      acc[key] = value;
      return acc;
    }, {} as Record<string, string>);

    if (cookies._fbc) params.fbc = cookies._fbc;
    if (cookies._fbp) params.fbp = cookies._fbp;

    setUtmParams(params);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      // Read honeypot value from the actual DOM input
      const form = e.target as HTMLFormElement;
      const honeypot = (form.elements.namedItem("website") as HTMLInputElement)?.value || "";

      // Generate event ID for deduplication between client and server
      const eventId = generateEventId("Lead");

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          website: honeypot,
          ...utmParams,
          pageUrl: window.location.href,
          eventId, // Pass to server for CAPI deduplication
        }),
      });

      if (!response.ok) {
        const body = await response.json().catch(() => null);
        throw new Error(
          body?.error || "A apărut o eroare. Te rugăm să încerci din nou."
        );
      }

      setStatus("success");

      // Fire Facebook Lead event (client-side) with same eventId for deduplication
      fbLead({
        content_name: formData.service || "Contact Form",
        eventId,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        service: "",
        message: "",
      });
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "A apărut o eroare. Te rugăm să încerci din nou."
      );
    }
  };

  if (status === "success") {
    return (
      <div role="status" className="rounded-xl bg-emerald-50 p-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
          <svg
            className="h-8 w-8 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="font-heading text-xl font-semibold text-emerald-900">
          Mesaj trimis cu succes!
        </h3>
        <p className="mt-2 text-emerald-700">
          Îți mulțumim pentru mesaj. Te vom contacta în cel mai scurt timp
          posibil.
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => setStatus("idle")}
        >
          Trimite alt mesaj
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Nume complet *"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Numele tău"
        />
        <Input
          label="Email *"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="email@exemplu.ro"
        />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Input
          label="Telefon"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          placeholder="07XX XXX XXX"
        />
        <Select
          label="Serviciu de interes"
          name="service"
          value={formData.service}
          onChange={handleChange}
          options={serviceOptions}
          placeholder="Selectează un serviciu"
        />
      </div>

      {/* Honeypot field — hidden from real users */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{ display: "none" }}
      />

      <Textarea
        label="Mesaj *"
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
        placeholder="Scrie-ne mesajul tău aici..."
        rows={5}
      />

      {status === "error" && (
        <div className="rounded-lg bg-red-50 p-4 text-red-700">
          {errorMessage}
        </div>
      )}

      <Button type="submit" isLoading={status === "submitting"} size="lg">
        {status === "submitting" ? "Se trimite..." : "Trimite Mesajul"}
      </Button>

      <p className="text-sm text-sand-500">
        * Câmpuri obligatorii. Datele tale sunt protejate conform{" "}
        <a
          href="/politica-confidentialitate"
          className="text-lagoon-600 underline hover:text-lagoon-700"
        >
          Politicii de Confidențialitate
        </a>
        .
      </p>
    </form>
  );
}
