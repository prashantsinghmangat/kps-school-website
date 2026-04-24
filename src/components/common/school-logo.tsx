import Image from "next/image";
import { cn } from "@/lib/utils/cn";

/**
 * SchoolLogo — renders the school's real logo from /public/brand/logo.png.
 * Downloaded once from the legacy site (https://www.krishnapublicschoolmeerut.in/images/logo.png)
 * so we don't hot-link; re-fetch with `pnpm scrape` / manual curl when the
 * school provides a higher-resolution replacement.
 *
 * Variants:
 *   - "full"  — full logo (crest + wordmark), the default for the header on ≥sm
 *   - "mark"  — just the crest (the small square on the left of the legacy
 *               logo is a single graphic so this variant uses the full image
 *               scaled down; use `size` to control)
 *   - "title" — wordmark only, used where the graphic would be redundant
 */

interface SchoolLogoProps {
  variant?: "mark" | "full" | "title";
  /** Max height in px. Width auto from aspect ratio. */
  height?: number;
  className?: string;
  /** Sets priority on next/image — use on header for LCP. */
  priority?: boolean;
}

// The real PNG from the legacy site is ~500×130 (wide landscape) — the
// wordmark dominates. For a "mark-only" scenario we use the image anyway but
// clip to the leftmost portion via CSS. Scaled by `height` so it fits the
// container. If the school later supplies a clean mark-only PNG, save it as
// `/public/brand/logo-mark.png` and swap the mark branch below.
const LOGO_SRC = "/brand/logo.png";
const LOGO_WIDTH = 500;
const LOGO_HEIGHT = 130;

export function SchoolLogo({
  variant = "full",
  height = 44,
  priority = false,
  className,
}: SchoolLogoProps) {
  // Width for the full logo retains aspect ratio.
  const fullWidth = Math.round((height * LOGO_WIDTH) / LOGO_HEIGHT);

  if (variant === "mark") {
    // Crop the leftmost ~20% of the wide logo so we show only the crest.
    return (
      <div
        aria-label="Krishna Public School crest"
        role="img"
        className={cn("relative inline-flex flex-none overflow-hidden", className)}
        style={{ width: height, height }}
      >
        <Image
          src={LOGO_SRC}
          alt=""
          width={fullWidth}
          height={height}
          priority={priority}
          className="absolute left-0 top-0 object-left object-contain"
          style={{ width: fullWidth, height }}
        />
      </div>
    );
  }

  if (variant === "title") {
    return (
      <div className={cn("leading-tight", className)}>
        <p className="font-[family-name:var(--font-heading)] text-[15px] font-black uppercase tracking-wide text-[--color-accent] md:text-base">
          Krishna Public School
        </p>
        <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-[--color-muted-foreground] md:text-[11px]">
          Labor Omnia Vincit
        </p>
      </div>
    );
  }

  return (
    <Image
      src={LOGO_SRC}
      alt="Krishna Public School"
      width={fullWidth}
      height={height}
      priority={priority}
      className={cn("h-auto w-auto object-contain", className)}
      style={{ maxHeight: height }}
    />
  );
}
