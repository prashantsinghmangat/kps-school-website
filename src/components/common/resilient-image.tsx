"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/lib/utils/cn";

interface ResilientImageProps extends Omit<ImageProps, "onError"> {
  /** JSX to render if the image fails to load. Defaults to a subtle
   *  "image unavailable" placeholder matching the muted surface. */
  fallback?: React.ReactNode;
}

/**
 * `next/image` wrapper that gracefully falls back when the source 404s or
 * otherwise errors. Without this, a broken hot-linked legacy image shows a
 * broken-image glyph and spams the console with 404s.
 *
 * Use everywhere we hot-link from the legacy domain. For known-local images
 * in /public/, plain `<Image>` is fine.
 */
export function ResilientImage({
  fallback,
  alt,
  className,
  fill,
  ...rest
}: ResilientImageProps) {
  const [errored, setErrored] = useState(false);

  if (errored) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={cn(
          fill ? "absolute inset-0" : "",
          "flex items-center justify-center bg-[--color-muted] text-xs text-[--color-muted-foreground]",
          className,
        )}
      >
        {fallback ?? "Image unavailable"}
      </div>
    );
  }

  return (
    <Image
      alt={alt}
      fill={fill}
      className={className}
      onError={() => setErrored(true)}
      {...rest}
    />
  );
}
