"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils/cn";

interface RevealProps {
  children: React.ReactNode;
  /** ms delay on the fade-in transition (for staggered children). */
  delay?: number;
  /** Direction the child translates in from. Default "up". */
  from?: "up" | "down" | "left" | "right" | "none";
  /** Root margin bottom for the IntersectionObserver — negative values make
   *  the animation fire slightly before the element hits the viewport. */
  rootMargin?: string;
  /** Threshold for intersection. 0.1 fires when ~10% of the element is in view. */
  threshold?: number;
  /** Tag to render — defaults to <div>. Use "section" etc. to keep semantics. */
  as?: keyof React.JSX.IntrinsicElements;
  className?: string;
}

const translateClass: Record<NonNullable<RevealProps["from"]>, string> = {
  up: "translate-y-4",
  down: "-translate-y-4",
  left: "-translate-x-4",
  right: "translate-x-4",
  none: "",
};

/**
 * Scroll-reveal wrapper. Lightweight — no framer-motion. Uses a single
 * IntersectionObserver per instance, disconnects itself after firing once.
 *
 * Accessibility: relies on the site-wide `prefers-reduced-motion` block in
 * globals.css which forces transition-duration to near-zero. Reduced-motion
 * users still see the element appear, just without the fade.
 */
export function Reveal({
  children,
  delay = 0,
  from = "up",
  rootMargin = "0px 0px -60px 0px",
  threshold = 0.1,
  as: Tag = "div",
  className,
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // If IntersectionObserver isn't available (very old browsers), skip the
    // animation entirely — fail visible, not invisible.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { rootMargin, threshold },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin, threshold]);

  const Component = Tag as React.ElementType;

  return (
    <Component
      ref={ref as React.Ref<HTMLElement>}
      className={cn(
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]",
        visible ? "opacity-100 translate-x-0 translate-y-0" : `opacity-0 ${translateClass[from]}`,
        className,
      )}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Component>
  );
}
