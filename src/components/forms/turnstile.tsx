"use client";

import { useEffect, useRef } from "react";
import Script from "next/script";

/**
 * Cloudflare Turnstile widget.
 *
 * - Renders nothing if NEXT_PUBLIC_TURNSTILE_SITE_KEY is not set, so forms
 *   continue to work locally without a key.
 * - Uses managed mode with `data-response-field-name="captchaToken"` so the
 *   token lands in our form under the name our Zod schemas expect.
 * - The server action additionally calls verifyCaptcha() on the token (see
 *   src/lib/actions/_captcha.ts) when TURNSTILE_SECRET_KEY is set on the server.
 */
interface TurnstileProps {
  /** Optional theme override — defaults to "auto". */
  theme?: "light" | "dark" | "auto";
  /** Tabindex for the hidden iframe. */
  tabIndex?: number;
}

const SCRIPT_SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js";

export function Turnstile({ theme = "auto", tabIndex = 0 }: TurnstileProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // The Cloudflare script auto-discovers `.cf-turnstile` elements on load,
    // but if the script loads AFTER this component mounts (SPA nav), we ping
    // it to render ourselves. Safe no-op if the script isn't loaded yet.
    const w = window as unknown as {
      turnstile?: { render: (el: HTMLElement, options: unknown) => unknown };
    };
    if (siteKey && w.turnstile && ref.current) {
      try {
        w.turnstile.render(ref.current, {
          sitekey: siteKey,
          theme,
          "response-field-name": "captchaToken",
        });
      } catch {
        /* widget may already be rendered — ignore */
      }
    }
  }, [siteKey, theme]);

  if (!siteKey) return null;

  return (
    <>
      <Script
        src={SCRIPT_SRC}
        strategy="lazyOnload"
        async
        defer
      />
      <div
        ref={ref}
        className="cf-turnstile"
        data-sitekey={siteKey}
        data-theme={theme}
        data-response-field-name="captchaToken"
        data-tabindex={tabIndex}
      />
    </>
  );
}
