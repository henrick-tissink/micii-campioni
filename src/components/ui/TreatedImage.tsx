import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";
import { cmsImage, cmsBlurUrl, type CropMode } from "@/lib/contentful/image";

export interface TreatedImageProps
  extends Omit<ImageProps, "src" | "placeholder" | "blurDataURL"> {
  /** Contentful image URL (protocol-relative or fully-qualified). */
  src: string;
  /** Cropping strategy for the underlying Contentful image API. */
  crop?: CropMode;
  /** Optional explicit width hint passed to the Contentful API. */
  cmsWidth?: number;
  /** Optional explicit height hint passed to the Contentful API. */
  cmsHeight?: number;
}

/**
 * Drop-in replacement for next/image when rendering CMS imagery.
 * - Applies the `.photo-graded` filter (saturate .92, contrast 1.04) by default
 * - Resolves Contentful protocol-relative URLs and applies sensible API defaults
 * - Generates a blur placeholder via the Contentful Images API
 *
 * Use plain `<Image>` only for static assets, logos, and icons.
 */
export function TreatedImage({
  src,
  crop = "center",
  cmsWidth,
  cmsHeight,
  className,
  alt,
  ...rest
}: TreatedImageProps) {
  const optimizedSrc = cmsImage(src, {
    w: cmsWidth,
    h: cmsHeight,
    crop,
  });
  const blurDataURL = cmsBlurUrl(src);

  return (
    <Image
      src={optimizedSrc}
      alt={alt}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={cn("photo-graded", className)}
      {...rest}
    />
  );
}
