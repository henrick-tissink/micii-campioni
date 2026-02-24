import { NextResponse, after } from "next/server";
import { Resend } from "resend";
import { trackLead } from "@/lib/facebook/conversions-api";

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
  // UTM and Facebook tracking params
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  fbc?: string;
  fbp?: string;
  pageUrl?: string;
  eventId?: string; // For Facebook event deduplication
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
// Email Template
// =============================================================================

interface EmailFields {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

function buildContactEmailHtml(fields: EmailFields): string {
  const preheader = `Mesaj de la ${fields.name}${fields.service ? ` — ${fields.service}` : ""}`;

  const row = (label: string, content: string) => `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #e7e5e4;">
        <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#78716c;margin-bottom:4px;">${label}</span>
        ${content}
      </td>
    </tr>`;

  const textValue = (v: string) =>
    `<span style="font-size:15px;color:#1c1917;">${v}</span>`;

  const linkValue = (href: string, v: string) =>
    `<a href="${href}" style="font-size:15px;color:#0d9488;text-decoration:none;">${v}</a>`;

  const contactRows = [
    row("Nume", textValue(fields.name)),
    row("Email", linkValue(`mailto:${fields.email}`, fields.email)),
    fields.phone ? row("Telefon", linkValue(`tel:${fields.phone}`, fields.phone)) : "",
    fields.service ? row("Serviciu", textValue(fields.service)) : "",
  ].join("");

  return `<!DOCTYPE html>
<html lang="ro" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <meta name="color-scheme" content="light" />
  <meta name="supported-color-schemes" content="light" />
  <!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
</head>
<body style="margin:0;padding:0;background-color:#f5f0eb;font-family:Arial,Helvetica,sans-serif;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">
  <!-- Preheader (hidden inbox preview text) -->
  <div style="display:none;max-height:0;overflow:hidden;">${preheader}${"&nbsp;&zwnj;".repeat(20)}</div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#f5f0eb;">
    <tr><td style="padding:32px 16px;" align="center">
      <!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0" width="600"><tr><td><![endif]-->
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;background-color:#ffffff;border-radius:8px;overflow:hidden;">
        <!-- Header -->
        <tr>
          <td style="background-color:#0d9488;padding:24px 32px;">
            <h1 style="margin:0;font-size:20px;font-weight:700;color:#ffffff;font-family:Arial,Helvetica,sans-serif;">Mesaj nou de pe site</h1>
          </td>
        </tr>
        <!-- Contact details -->
        <tr>
          <td style="padding:24px 32px 8px;">
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              ${contactRows}
            </table>
          </td>
        </tr>
        <!-- Message body -->
        <tr>
          <td style="padding:24px 32px;">
            <span style="display:block;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;color:#78716c;margin-bottom:8px;">Mesaj</span>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:#f5f0eb;border-radius:6px;padding:16px;font-size:15px;line-height:1.6;color:#292524;">
                  ${fields.message.replace(/\n/g, "<br />")}
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Reply CTA -->
        <tr>
          <td style="padding:0 32px 32px;" align="center">
            <table role="presentation" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="background-color:#0d9488;border-radius:6px;text-align:center;">
                  <a href="mailto:${fields.email}" style="display:inline-block;padding:12px 28px;font-size:14px;font-weight:600;color:#ffffff;text-decoration:none;font-family:Arial,Helvetica,sans-serif;">Răspunde lui ${fields.name}</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
        <!-- Footer -->
        <tr>
          <td style="background-color:#f5f0eb;padding:16px 32px;text-align:center;">
            <span style="font-size:12px;color:#78716c;">Trimis prin formularul de contact &mdash; miciicampioni.ro</span>
          </td>
        </tr>
      </table>
      <!--[if mso]></td></tr></table><![endif]-->
    </td></tr>
  </table>
</body>
</html>`;
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
    const from = process.env.CONTACT_EMAIL_FROM || "noreply@launchinto.space";

    const { data: sendResult, error: sendError } = await resend.emails.send({
      from: `Micii Campioni Website <${from}>`,
      to,
      replyTo: sanitized.email,
      subject: `Mesaj nou de la ${sanitized.name}`,
      html: buildContactEmailHtml(sanitized),
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
      utm_source: body.utm_source,
      utm_campaign: body.utm_campaign,
    });

    // Send server-side Facebook Conversions API event (non-blocking)
    // Using after() ensures the event completes even after response is sent
    const userAgent = request.headers.get("user-agent") || undefined;
    const sourceUrl = body.pageUrl || process.env.NEXT_PUBLIC_SITE_URL || "https://miciicampioni.ro";

    after(
      trackLead({
        email: sanitized.email,
        phone: sanitized.phone,
        name: sanitized.name,
        service: sanitized.service,
        sourceUrl,
        clientIp: ip !== "unknown" ? ip : undefined,
        userAgent,
        fbc: body.fbc,
        fbp: body.fbp,
        eventId: body.eventId, // Same ID as client-side for deduplication
      }).catch((err) => {
        // Log but don't fail the request
        console.error("Facebook CAPI error:", err);
      })
    );

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
