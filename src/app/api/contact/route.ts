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
  return false;
}

// Periodically clean up stale entries to prevent memory leaks
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of rateLimitMap) {
    const recent = timestamps.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
    if (recent.length === 0) {
      rateLimitMap.delete(ip);
    } else {
      rateLimitMap.set(ip, recent);
    }
  }
}, RATE_LIMIT_WINDOW_MS);

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

    const data: ContactFormData = await request.json();

    // --- Honeypot check ---
    if (data.website) {
      // Bot detected — return 200 silently
      return NextResponse.json(
        { success: true, message: "Mesajul a fost trimis cu succes!" },
        { status: 200 }
      );
    }

    // --- Validation ---
    const validationError = validate(data);
    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      );
    }

    // --- Sanitize ---
    const sanitized = {
      name: stripHtml(data.name).trim(),
      email: stripHtml(data.email).trim(),
      phone: data.phone ? stripHtml(data.phone).trim() : undefined,
      service: data.service ? stripHtml(data.service).trim() : undefined,
      message: stripHtml(data.message).trim(),
    };

    // --- Send email via Resend ---
    const resend = new Resend(process.env.RESEND_API_KEY);

    const to = process.env.CONTACT_EMAIL_TO || "info@miciicampioni.ro";
    const from = process.env.CONTACT_EMAIL_FROM || "website@miciicampioni.ro";

    const { error: sendError } = await resend.emails.send({
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

    if (sendError) {
      console.error("Resend error:", sendError);
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
