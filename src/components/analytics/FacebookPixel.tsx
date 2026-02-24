"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useRef, Suspense } from "react";

// =============================================================================
// Types
// =============================================================================

declare global {
  interface Window {
    fbq: (
      action: string,
      event: string,
      params?: Record<string, unknown>
    ) => void;
    _fbq: unknown;
  }
}

// =============================================================================
// Facebook Pixel ID (from environment variable only)
// =============================================================================

const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FB_PIXEL_ID;

// =============================================================================
// Event ID Generator (for deduplication with Conversions API)
// =============================================================================

export const generateEventId = (eventName: string): string => {
  const timestamp = Math.floor(Date.now() / 1000);
  const random = Math.random().toString(36).slice(2, 11);
  return `${eventName}_${timestamp}_${random}`;
};

// =============================================================================
// Helper Functions
// =============================================================================

export const fbPageView = () => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    window.fbq("track", "PageView");
  }
};

export const fbEvent = (
  name: string,
  options: Record<string, unknown> = {},
  eventId?: string
) => {
  if (typeof window !== "undefined" && window.fbq && FB_PIXEL_ID) {
    const params = eventId ? { ...options, eventID: eventId } : options;
    window.fbq("track", name, params);
  }
};

// Common events with deduplication support
export const fbLead = (data?: {
  content_name?: string;
  value?: number;
  eventId?: string;
}) => {
  const { eventId, ...rest } = data || {};
  fbEvent("Lead", rest, eventId);
};

export const fbContact = (eventId?: string) => {
  fbEvent("Contact", {}, eventId);
};

export const fbViewContent = (data: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  eventId?: string;
}) => {
  const { eventId, ...rest } = data;
  fbEvent("ViewContent", rest, eventId);
};

export const fbSchedule = (eventId?: string) => {
  fbEvent("Schedule", {}, eventId);
};

// =============================================================================
// Page View Tracker Component
// =============================================================================

function FacebookPixelPageView() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isInitialMount = useRef(true);

  useEffect(() => {
    // Skip initial mount - the inline script already fires PageView on load
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (pathname) {
      fbPageView();
    }
  }, [pathname, searchParams]);

  return null;
}

// =============================================================================
// Main Component
// =============================================================================

export function FacebookPixel() {
  // Don't render anything if Pixel ID is not configured
  if (!FB_PIXEL_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${FB_PIXEL_ID}');
            fbq('track', 'PageView');
          `,
        }}
      />
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <FacebookPixelPageView />
      </Suspense>
    </>
  );
}
