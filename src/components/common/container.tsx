import { cn } from "@/lib/utils/cn";

type ContainerSize = "prose" | "narrow" | "default" | "wide" | "full";

const SIZE_CLASS: Record<ContainerSize, string> = {
  prose: "max-w-3xl",
  narrow: "max-w-4xl",
  default: "max-w-6xl",
  wide: "max-w-7xl",
  full: "",
};

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: ContainerSize;
  /** Override the default vertical padding.
   *  - `none`: no vertical padding
   *  - `tight`: py-8 md:py-10
   *  - `default`: py-12 md:py-16 (most sections)
   *  - `loose`: py-14 md:py-20 lg:py-24 (hero-ish bands)
   */
  vPad?: "none" | "tight" | "default" | "loose";
}

const VPAD_CLASS = {
  none: "",
  tight: "py-8 md:py-10",
  default: "py-12 md:py-16",
  loose: "py-14 md:py-20 lg:py-24",
} as const;

/**
 * Container — consistent horizontal gutters and width across the site.
 *
 * Use this around section content. Provides:
 *   - mx-auto + size-specific max-width
 *   - px-4 sm:px-6 lg:px-8 — three-step gutter scale that breathes on
 *     wide desktops without crowding mobile
 *   - optional vertical padding via `vPad`
 *
 * For full-bleed sections (gradient bands, dark surfaces), wrap a Container
 * inside the section element so the section takes 100% width but the inner
 * content stays bounded.
 */
export function Container({
  size = "default",
  vPad = "none",
  className,
  ...rest
}: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto px-4 sm:px-6 lg:px-8",
        SIZE_CLASS[size],
        VPAD_CLASS[vPad],
        className,
      )}
      {...rest}
    />
  );
}
