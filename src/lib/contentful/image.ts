/**
 * Helpers for constructing Contentful Images API URLs with sensible defaults.
 * Used by <TreatedImage> and any direct CMS image rendering.
 */

export type CropMode = "face" | "top" | "center";

export interface CmsImageOpts {
  /** Width in pixels for the rendered image */
  w?: number;
  /** Height in pixels for the rendered image */
  h?: number;
  /** Cropping strategy; "face" requires a portrait subject */
  crop?: CropMode;
  /** Output format; default "webp" */
  format?: "webp" | "avif" | "jpg";
  /** JPEG/WebP quality; default 85 */
  quality?: number;
}

const DEFAULT_FORMAT: NonNullable<CmsImageOpts["format"]> = "webp";
const DEFAULT_QUALITY = 85;
const BLUR_WIDTH = 10;
const BLUR_QUALITY = 10;

function ensureProtocol(url: string): string {
  if (url.startsWith("//")) return `https:${url}`;
  return url;
}

/**
 * Construct a fully-qualified Contentful image URL with the given transform options.
 */
export function cmsImage(url: string, opts: CmsImageOpts = {}): string {
  const base = ensureProtocol(url);
  const params = new URLSearchParams();

  if (opts.w != null) params.set("w", String(opts.w));
  if (opts.h != null) params.set("h", String(opts.h));

  if (opts.crop === "face") {
    params.set("fit", "fill");
    params.set("f", "face");
  } else if (opts.crop === "top") {
    params.set("f", "top");
  }
  // "center" is the Contentful default focus; no parameter needed

  params.set("fm", opts.format ?? DEFAULT_FORMAT);
  params.set("q", String(opts.quality ?? DEFAULT_QUALITY));

  const query = params.toString();
  const separator = base.includes("?") ? "&" : "?";
  return `${base}${separator}${query}`;
}

/**
 * Returns a tiny blur placeholder URL for use with next/image's placeholder="blur".
 * Returns a 10×10 square (tiny enough that aspect-ratio differences are invisible
 * after CSS scaling and blurring).
 */
export function cmsBlurUrl(url: string): string {
  return cmsImage(url, { w: BLUR_WIDTH, h: BLUR_WIDTH, quality: BLUR_QUALITY });
}

/**
 * Codified `sizes` attributes for next/image, by layout context.
 */
export const SIZES = {
  hero: "100vw",
  serviceCard: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
  about: "(min-width: 1024px) 60vw, 100vw",
  testimonialAvatar: "64px",
  founderPortrait: "(min-width: 1024px) 40vw, 100vw",
  galleryItem: "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw",
} as const;
