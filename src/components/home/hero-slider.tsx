"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { SliderSlide } from "@/lib/api";

interface HeroSliderProps {
  slides: SliderSlide[];
  /** Auto-advance interval in ms. Set to 0 to disable. */
  autoplayMs?: number;
}

/**
 * Embla-based hero carousel. Loops, lazy-loads off-screen images, respects
 * prefers-reduced-motion by falling back to static (no autoplay, no cross-fade).
 */
export function HeroSlider({ slides, autoplayMs = 5000 }: HeroSliderProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "start" });
  const [selected, setSelected] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelected(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi || !autoplayMs) return;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    const id = window.setInterval(() => {
      if (!emblaApi) return;
      if (!document.hidden) emblaApi.scrollNext();
    }, autoplayMs);
    return () => window.clearInterval(id);
  }, [emblaApi, autoplayMs]);

  if (slides.length === 0) return null;

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Campus photos"
      className="relative bg-[--color-muted]"
    >
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {slides.map((slide, i) => (
            <div
              key={`${i}-${slide.src}`}
              className="relative min-w-0 flex-[0_0_100%]"
              aria-roledescription="slide"
              aria-label={`${i + 1} of ${slides.length}`}
            >
              <div className="relative aspect-[16/7] w-full">
                <Image
                  src={slide.src}
                  alt={slide.alt}
                  fill
                  priority={i === 0}
                  sizes="100vw"
                  className="object-cover"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {slides.length > 1 ? (
        <>
          <button
            type="button"
            aria-label="Previous slide"
            onClick={scrollPrev}
            disabled={!canScrollPrev && slides.length <= 1}
            className="absolute left-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[--color-foreground] shadow-md transition hover:bg-white disabled:opacity-50"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            aria-label="Next slide"
            onClick={scrollNext}
            disabled={!canScrollNext && slides.length <= 1}
            className="absolute right-3 top-1/2 inline-flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[--color-foreground] shadow-md transition hover:bg-white disabled:opacity-50"
          >
            <ChevronRight size={20} />
          </button>

          <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
            <div className="pointer-events-auto flex gap-2 rounded-full bg-black/30 px-3 py-1.5 backdrop-blur-sm">
              {slides.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to slide ${i + 1}`}
                  aria-current={i === selected ? "true" : "false"}
                  onClick={() => scrollTo(i)}
                  className={
                    "h-1.5 rounded-full transition-all " +
                    (i === selected ? "w-6 bg-white" : "w-1.5 bg-white/60 hover:bg-white/80")
                  }
                />
              ))}
            </div>
          </div>
        </>
      ) : null}
    </section>
  );
}
