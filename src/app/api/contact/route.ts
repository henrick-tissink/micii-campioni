import { NextResponse } from "next/server";
import { Resend } from "resend";

// =============================================================================
// Types
// =============================================================================

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  website?: string; // honeypot
}

// =============================================================================
// Resend Client (module-level singleton — avoids per-request instantiation)
// =============================================================================

const resend = new Resend(process.env.RESEND_API_KEY);

// =============================================================================
// Rate Limiting (in-memory, per-process)
// =============================================================================

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const RATE_LIMIT_MAX = 5;

const rateLimitMap = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitMap.get(ip) ?? [];

  // Remove entries outside the sliding window
  const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }

  recent.push(now);
  rateLimitMap.set(ip, recent);

  // Inline cleanup: evict entries older than the window to prevent unbounded growth
  if (rateLimitMap.size > 1000) {
    for (const [key, ts] of rateLimitMap) {
      if (ts.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) {
        rateLimitMap.delete(key);
      }
    }
  }

  return false;
}

// =============================================================================
// Service label lookup
// =============================================================================

const SERVICE_LABELS: Record<string, string> = {
  "cursuri-prenatale": "Cursuri Prenatale Lamaze",
  "inot-bebelusi": "Înot Bebeluși (0-3 ani)",
  "inot-copii": "Înot Copii (3-12 ani)",
  "kinetoterapie": "Kinetoterapie Pediatrică",
  "consultatie": "Consultație Generală",
  "altele": "Altele",
};

// =============================================================================
// Helpers
// =============================================================================

/** Strip HTML tags from a string. */
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, "");
}

/** Mask PII for logging — keep first 3 chars, replace the rest. */
function redact(value: string | undefined): string {
  if (!value) return "(empty)";
  if (value.length <= 3) return "***";
  return value.slice(0, 3) + "***";
}

// =============================================================================
// Validation
// =============================================================================

const MAX_NAME = 200;
const MAX_EMAIL = 254;
const MAX_PHONE = 30;
const MAX_MESSAGE = 5000;

function validate(data: ContactFormData): string | null {
  if (!data.name || !data.email || !data.message) {
    return "Toate câmpurile obligatorii trebuie completate.";
  }

  if (data.name.length > MAX_NAME) {
    return `Numele nu poate depăși ${MAX_NAME} de caractere.`;
  }

  if (data.email.length > MAX_EMAIL) {
    return `Emailul nu poate depăși ${MAX_EMAIL} de caractere.`;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return "Adresa de email nu este validă.";
  }

  if (data.phone && data.phone.length > MAX_PHONE) {
    return `Numărul de telefon nu poate depăși ${MAX_PHONE} de caractere.`;
  }

  if (data.message.length > MAX_MESSAGE) {
    return `Mesajul nu poate depăși ${MAX_MESSAGE} de caractere.`;
  }

  return null;
}

// =============================================================================
// POST Handler
// =============================================================================

export async function POST(request: Request) {
  try {
    // --- Rate limiting ---
    const forwarded = request.headers.get("x-forwarded-for");
    const ip = forwarded?.split(",")[0]?.trim() || "unknown";

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Prea multe cereri. Te rugăm să aștepți câteva minute." },
        { status: 429 }
      );
    }

    const body: ContactFormData = await request.json();

    // --- Honeypot check ---
    if (body.website) {
      // Bot detected — return 200 silently
      return NextResponse.json(
        { success: true, message: "Mesajul a fost trimis cu succes!" },
        { status: 200 }
      );
    }

    // --- Validation ---
    const validationError = validate(body);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // --- Sanitize ---
    const sanitized = {
      name: stripHtml(body.name).trim(),
      email: stripHtml(body.email).trim(),
      phone: body.phone ? stripHtml(body.phone).trim() : undefined,
      service: body.service
        ? SERVICE_LABELS[body.service] ?? stripHtml(body.service).trim()
        : undefined,
      message: stripHtml(body.message).trim(),
    };

    // --- Send email via Resend ---
    const to = process.env.CONTACT_EMAIL_TO || "info@miciicampioni.ro";
    const from = process.env.CONTACT_EMAIL_FROM || "website@miciicampioni.ro";

    const { data: sendResult, error: sendError } = await resend.emails.send({
      from: `Micii Campioni Website <${from}>`,
      to,
      replyTo: sanitized.email,
      subject: `Mesaj nou de la ${sanitized.name}`,
      html: `
        <h2>Mesaj nou de pe site</h2>
        <p><strong>Nume:</strong> ${sanitized.name}</p>
        <p><strong>Email:</strong> ${sanitized.email}</p>
        ${sanitized.phone ? `<p><strong>Telefon:</strong> ${sanitized.phone}</p>` : ""}
        ${sanitized.service ? `<p><strong>Serviciu:</strong> ${sanitized.service}</p>` : ""}
        <hr />
        <p>${sanitized.message.replace(/\n/g, "<br />")}</p>
      `,
    });

    if (sendError || !sendResult?.id) {
      console.error("Resend error:", sendError ?? "No email ID returned");
      return NextResponse.json(
        { error: "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou." },
        { status: 500 }
      );
    }

    // Redacted log — no full PII
    console.log("Contact form submission:", {
      name: redact(sanitized.name),
      email: redact(sanitized.email),
      phone: redact(sanitized.phone),
      service: sanitized.service,
      messageLength: sanitized.message.length,
    });

    return NextResponse.json(
      { success: true, message: "Mesajul a fost trimis cu succes!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "A apărut o eroare. Te rugăm să încerci din nou." },
      { status: 500 }
    );
  }
}
