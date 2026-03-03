"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

// =============================================================================
// Types
// =============================================================================

interface EnhancedConversionData {
  email?: string;
  phone?: string;
  firstName?: string;
  lastName?: string;
  street?: string;
  city?: string;
  region?: string;
  postalCode?: string;
  country?: string;
}

// Use module augmentation to avoid conflicts with other gtag declarations
declare global {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function gtag(...args: any[]): void;
}

// =============================================================================
// Google Ads Configuration
// =============================================================================

const GOOGLE_ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID || "AW-17962168369";
const CONVERSION_LABEL = process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Track a page view
 */
export const gtagPageView = (url?: string) => {
  if (typeof window !== "undefined" && typeof gtag === "function") {
    gtag("config", GOOGLE_ADS_ID, {
      page_path: url || window.location.pathname,
    });
  }
};

/**
 * Track a conversion event
 * @param conversionLabel - The conversion label from Google Ads (e.g., "AbCdEf123")
 * @param value - Optional conversion value
 * @param transactionId - Optional transaction ID for deduplication
 */
export const gtagConversion = (
  conversionLabel?: string,
  value?: number,
  transactionId?: string
) => {
  if (typeof window === "undefined" || typeof gtag !== "function") return;

  const label = conversionLabel || CONVERSION_LABEL;
  if (!label) {
    console.warn("Google Ads: No conversion label provided");
    return;
  }

  const params: Record<string, unknown> = {
    send_to: `${GOOGLE_ADS_ID}/${label}`,
  };

  if (value !== undefined) {
    params.value = value;
    params.currency = "RON";
  }

  if (transactionId) {
    params.transaction_id = transactionId;
  }

  gtag("event", "conversion", params);
};

/**
 * Track a lead conversion (convenience function)
 * Uses the configured CONVERSION_LABEL environment variable
 */
export const gtagLead = (transactionId?: string, value?: number) => {
  gtagConversion(CONVERSION_LABEL, value, transactionId);
};

/**
 * Set enhanced conversion data for improved attribution
 * Call this before firing a conversion event
 */
export const gtagSetUserData = (data: EnhancedConversionData) => {
  if (typeof window === "undefined" || typeof gtag !== "function") return;

  const userData: Record<string, string> = {};

  // Normalize user data according to Google's requirements
  if (data.email) {
    userData.email = data.email.toLowerCase().trim();
  }
  if (data.phone) {
    // Normalize Romanian phone numbers
    let phone = data.phone.replace(/\D/g, "");
    if (phone.startsWith("0")) {
      phone = "40" + phone.slice(1);
    } else if (!phone.startsWith("40")) {
      phone = "40" + phone;
    }
    userData.phone_number = "+" + phone;
  }
  if (data.firstName) {
    userData.first_name = data.firstName.toLowerCase().trim();
  }
  if (data.lastName) {
    userData.last_name = data.lastName.toLowerCase().trim();
  }
  if (data.street) {
    userData.street = data.street.toLowerCase().trim();
  }
  if (data.city) {
    userData.city = data.city.toLowerCase().trim();
  }
  if (data.region) {
    userData.region = data.region.toLowerCase().trim();
  }
  if (data.postalCode) {
    userData.postal_code = data.postalCode.trim();
  }
  if (data.country) {
    userData.country = data.country.toUpperCase().trim();
  }

  gtag("set", "user_data", userData);
};

/**
 * Fire a remarketing event for audience building
 */
export const gtagRemarketing = (
  eventName: string,
  params?: Record<string, unknown>
) => {
  if (typeof window === "undefined" || typeof gtag !== "function") return;

  gtag("event", eventName, {
    send_to: GOOGLE_ADS_ID,
    ...params,
  });
};

/**
 * Track view of a specific content/service (for remarketing audiences)
 */
export const gtagViewItem = (data: {
  item_id: string;
  item_name: string;
  item_category?: string;
}) => {
  gtagRemarketing("view_item", {
    items: [
      {
        id: data.item_id,
        name: data.item_name,
        category: data.item_category,
      },
    ],
  });
};

// =============================================================================
// Page View Tracker Component
// =============================================================================

function GoogleAdsPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip initial mount - the inline script already configures on load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (pathname) {
      gtagPageView(pathname);
    }
  }, [pathname, searchParams]);

  return null;
}

// =============================================================================
// Main Component
// =============================================================================

export function GoogleAds() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_ADS_ID}`}
        strategy="afterInteractive"
      />
      <Script
        id="google-ads-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GOOGLE_ADS_ID}', {
              allow_enhanced_conversions: true
            });
          `,
        }}
      />
      <Suspense fallback={null}>
        <GoogleAdsPageView />
      </Suspense>
    </>
  );
}
