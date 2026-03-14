import { createClient, type ContentfulClientApi } from "contentful";
import type { ContentfulImage, ContentfulMedia } from "@/types/contentful";
import type { Asset } from "contentful";

// =============================================================================
// Client Configuration
// =============================================================================

const spaceId = process.env.CONTENTFUL_SPACE_ID;
const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
const previewToken = process.env.CONTENTFUL_PREVIEW_TOKEN;
const environment = process.env.CONTENTFUL_ENVIRONMENT || "master";

// Validate required environment variables
function validateConfig() {
  if (!spaceId) {
    console.warn("CONTENTFUL_SPACE_ID is not set");
  }
  if (!accessToken) {
    console.warn("CONTENTFUL_ACCESS_TOKEN is not set");
  }
}

validateConfig();

// =============================================================================
// Client Instances
// =============================================================================

// Delivery client (published content)
export const contentfulClient: ContentfulClientApi<undefined> | null =
  spaceId && accessToken
    ? createClient({
        space: spaceId,
        accessToken: accessToken,
        environment,
      })
    : null;

// Preview client (draft content)
export const previewClient: ContentfulClientApi<undefined> | null =
  spaceId && previewToken
    ? createClient({
        space: spaceId,
        accessToken: previewToken,
        environment,
        host: "preview.contentful.com",
      })
    : null;

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get the appropriate client based on preview mode
 */
export function getClient(preview = false): ContentfulClientApi<undefined> | null {
  if (preview && previewClient) {
    return previewClient;
  }
  return contentfulClient;
}

/**
 * Parse a Contentful Asset into our ContentfulImage type
 */
export function parseAsset(asset: Asset | undefined): ContentfulImage | undefined {
  if (!asset?.fields?.file) {
    return undefined;
  }

  const file = asset.fields.file as { url?: string; details?: { image?: { width?: number; height?: number } } } | undefined;
  const fileUrl = typeof file?.url === "string" ? file.url : "";
  const url = fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl;

  return {
    url: url || "",
    width: file?.details?.image?.width || 0,
    height: file?.details?.image?.height || 0,
    title: (asset.fields.title as string) || "",
    description: asset.fields.description as string | undefined,
  };
}

/**
 * Parse multiple Contentful Assets
 */
export function parseAssets(assets: Asset[] | undefined): ContentfulImage[] {
  if (!assets) return [];
  return assets
    .map((asset) => parseAsset(asset))
    .filter((img): img is ContentfulImage => img !== undefined);
}

/**
 * Parse a Contentful Asset into our ContentfulMedia type (includes contentType for video detection)
 */
export function parseMedia(asset: Asset | undefined): ContentfulMedia | undefined {
  if (!asset?.fields?.file) {
    return undefined;
  }

  const file = asset.fields.file as {
    url?: string;
    contentType?: string;
    details?: { image?: { width?: number; height?: number } };
  } | undefined;
  const fileUrl = typeof file?.url === "string" ? file.url : "";
  const url = fileUrl.startsWith("//") ? `https:${fileUrl}` : fileUrl;

  return {
    url: url || "",
    width: file?.details?.image?.width,
    height: file?.details?.image?.height,
    title: (asset.fields.title as string) || "",
    description: asset.fields.description as string | undefined,
    contentType: (file?.contentType as string) || "",
  };
}

/**
 * Check if Contentful is configured
 */
export function isContentfulConfigured(): boolean {
  return !!contentfulClient;
}
