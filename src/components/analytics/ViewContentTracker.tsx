"use client";

import { useEffect } from "react";
import { fbViewContent } from "./FacebookPixel";

interface ViewContentTrackerProps {
  contentName: string;
  contentCategory?: string;
  contentId?: string;
}

/**
 * Client component that fires a Facebook ViewContent event on mount.
 * Use this on service/product pages to track what users are viewing.
 */
export function ViewContentTracker({
  contentName,
  contentCategory,
  contentId,
}: ViewContentTrackerProps) {
  useEffect(() => {
    fbViewContent({
      content_name: contentName,
      content_category: contentCategory,
      content_ids: contentId ? [contentId] : undefined,
    });
  }, [contentName, contentCategory, contentId]);

  // This component renders nothing - it just fires the event
  return null;
}
