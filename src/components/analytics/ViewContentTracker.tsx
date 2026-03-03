"use client";

import { useEffect } from "react";
import { fbViewContent } from "./FacebookPixel";
import { gtagViewItem } from "./GoogleAds";

interface ViewContentTrackerProps {
  contentName: string;
  contentCategory?: string;
  contentId?: string;
}

/**
 * Client component that fires Facebook ViewContent and Google Ads view_item events on mount.
 * Use this on service/product pages to track what users are viewing.
 */
export function ViewContentTracker({
  contentName,
  contentCategory,
  contentId,
}: ViewContentTrackerProps) {
  useEffect(() => {
    // Facebook Pixel ViewContent event
    fbViewContent({
      content_name: contentName,
      content_category: contentCategory,
      content_ids: contentId ? [contentId] : undefined,
    });

    // Google Ads remarketing event
    gtagViewItem({
      item_id: contentId || contentName.toLowerCase().replace(/\s+/g, "-"),
      item_name: contentName,
      item_category: contentCategory,
    });
  }, [contentName, contentCategory, contentId]);

  // This component renders nothing - it just fires the event
  return null;
}
