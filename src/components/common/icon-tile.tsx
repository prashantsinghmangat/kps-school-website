import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils/cn";

type IconTileSize = "sm" | "md" | "lg" | "xl";

const SIZE_MAP: Record<IconTileSize, { box: string; icon: number; rounded: string }> = {
  sm: { box: "h-9 w-9", icon: 16, rounded: "rounded-md" },
  md: { box: "h-11 w-11", icon: 20, rounded: "rounded-lg" },
  lg: { box: "h-12 w-12", icon: 22, rounded: "rounded-lg" },
  xl: { box: "h-14 w-14", icon: 26, rounded: "rounded-xl" },
};

type IconTileTone = "primary" | "secondary" | "accent" | "highlight" | "gradient";

const TONE_BG: Record<IconTileTone, string> = {
  primary: "#0a3d62",
  secondary: "#174873",
  accent: "#c8102e",
  highlight: "#f5b800",
  gradient: "linear-gradient(135deg, #0a3d62 0%, #174873 100%)",
};

const TONE_FG: Record<IconTileTone, string> = {
  primary: "#ffffff",
  secondary: "#ffffff",
  accent: "#ffffff",
  highlight: "#0f172a",
  gradient: "#ffffff",
};

interface IconTileProps {
  /** Lucide icon component to render. */
  icon: LucideIcon;
  /** Size preset. Default `lg` (h-12 w-12). */
  size?: IconTileSize;
  /** Background style. Use `gradient` for the brand navy-to-teal gradient,
   *  or a solid tone. Default `gradient`. */
  tone?: IconTileTone;
  /** Extra Tailwind classes (margin, ring, etc.) */
  className?: string;
}

/**
 * Reusable icon-in-coloured-tile pattern. Uses inline `style` for the
 * background — Tailwind v4 + CSS variables in `bg-gradient-to-br` /
 * `from-[--var]` arbitrary values can fail to resolve under dev HMR,
 * leaving the tile painted as transparent/white. Inline style guarantees
 * paint.
 *
 * Use this everywhere instead of:
 *   <span className="... bg-gradient-to-br from-[--color-primary] to-[--color-secondary] ...">
 */
export function IconTile({ icon: Icon, size = "lg", tone = "gradient", className }: IconTileProps) {
  const { box, icon: iconSize, rounded } = SIZE_MAP[size];
  const isGradient = tone === "gradient";
  return (
    <span
      className={cn(
        "inline-flex flex-none items-center justify-center shadow-sm",
        box,
        rounded,
        className,
      )}
      style={{
        [isGradient ? "background" : "backgroundColor"]: TONE_BG[tone],
        color: TONE_FG[tone],
      }}
    >
      <Icon size={iconSize} strokeWidth={2} />
    </span>
  );
}
