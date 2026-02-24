import crypto from "crypto";

// =============================================================================
// Facebook Conversions API
// Server-side event tracking for improved accuracy
// =============================================================================

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
const FB_ACCESS_TOKEN = process.env.FB_CONVERSIONS_API_TOKEN;
const FB_API_VERSION = "v18.0";

// =============================================================================
// Types
// =============================================================================

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  city?: string;
  country?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
  fbc?: string; // Facebook click ID from _fbc cookie
  fbp?: string; // Facebook browser ID from _fbp cookie
}

interface CustomData {
  content_name?: string;
  content_category?: string;
  value?: number;
  currency?: string;
  service?: string;
}

interface ServerEvent {
  event_name: string;
  event_time: number;
  event_id: string;
  event_source_url: string;
  action_source: "website";
  user_data: Record<string, string | undefined>;
  custom_data?: CustomData;
}

// =============================================================================
// Helper Functions
// =============================================================================

function hashData(data: string): string {
  return crypto.createHash("sha256").update(data.toLowerCase().trim()).digest("hex");
}

function normalizePhone(phone: string): string {
  // Remove all non-numeric characters and add country code if missing
  const cleaned = phone.replace(/\D/g, "");
  // Romanian numbers: add 40 prefix if starting with 0
  if (cleaned.startsWith("0")) {
    return "40" + cleaned.slice(1);
  }
  return cleaned;
}

function prepareUserData(userData: UserData): Record<string, string | undefined> {
  const prepared: Record<string, string | undefined> = {};

  if (userData.email) {
    prepared.em = hashData(userData.email);
  }
  if (userData.phone) {
    prepared.ph = hashData(normalizePhone(userData.phone));
  }
  if (userData.firstName) {
    prepared.fn = hashData(userData.firstName);
  }
  if (userData.lastName) {
    prepared.ln = hashData(userData.lastName);
  }
  if (userData.city) {
    prepared.ct = hashData(userData.city);
  }
  if (userData.country) {
    prepared.country = hashData(userData.country);
  }
  if (userData.clientIpAddress) {
    prepared.client_ip_address = userData.clientIpAddress;
  }
  if (userData.clientUserAgent) {
    prepared.client_user_agent = userData.clientUserAgent;
  }
  if (userData.fbc) {
    prepared.fbc = userData.fbc;
  }
  if (userData.fbp) {
    prepared.fbp = userData.fbp;
  }

  return prepared;
}

// =============================================================================
// Main Function
// =============================================================================

export async function sendServerEvent({
  eventName,
  eventSourceUrl,
  userData,
  customData,
  eventId,
}: {
  eventName: string;
  eventSourceUrl: string;
  userData: UserData;
  customData?: CustomData;
  eventId?: string; // Pass the same ID used client-side for deduplication
}): Promise<{ success: boolean; error?: string; eventId?: string }> {
  // Skip if no Pixel ID configured
  if (!FB_PIXEL_ID) {
    console.log("[FB CAPI] No Pixel ID configured, skipping server event");
    return { success: false, error: "No Pixel ID configured" };
  }

  // Skip if no access token configured
  if (!FB_ACCESS_TOKEN) {
    console.log("[FB CAPI] No access token configured, skipping server event");
    return { success: false, error: "No access token configured" };
  }

  const eventTime = Math.floor(Date.now() / 1000);
  // Use provided eventId for deduplication, or generate one
  const finalEventId = eventId || `${eventName}_${eventTime}_${Math.random().toString(36).slice(2, 11)}`;

  const event: ServerEvent = {
    event_name: eventName,
    event_time: eventTime,
    event_id: finalEventId,
    event_source_url: eventSourceUrl,
    action_source: "website",
    user_data: prepareUserData(userData),
    custom_data: customData,
  };

  try {
    const response = await fetch(
      `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: [event],
          access_token: FB_ACCESS_TOKEN,
        }),
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error("[FB CAPI] Error:", result);
      return { success: false, error: result.error?.message || "Unknown error" };
    }

    console.log("[FB CAPI] Event sent successfully:", eventName, finalEventId);
    return { success: true, eventId: finalEventId };
  } catch (error) {
    console.error("[FB CAPI] Failed to send event:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}

// =============================================================================
// Convenience Functions
// =============================================================================

export async function trackLead({
  email,
  phone,
  name,
  service,
  sourceUrl,
  clientIp,
  userAgent,
  fbc,
  fbp,
  eventId,
}: {
  email: string;
  phone?: string;
  name?: string;
  service?: string;
  sourceUrl: string;
  clientIp?: string;
  userAgent?: string;
  fbc?: string;
  fbp?: string;
  eventId?: string; // Same ID used client-side for deduplication
}) {
  // Split name into first/last
  const nameParts = name?.split(" ") || [];
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(" ") || undefined;

  return sendServerEvent({
    eventName: "Lead",
    eventSourceUrl: sourceUrl,
    userData: {
      email,
      phone,
      firstName,
      lastName,
      city: "Bucuresti",
      country: "RO",
      clientIpAddress: clientIp,
      clientUserAgent: userAgent,
      fbc,
      fbp,
    },
    customData: {
      content_name: "Contact Form Submission",
      content_category: service || "General Inquiry",
      service,
    },
    eventId,
  });
}
