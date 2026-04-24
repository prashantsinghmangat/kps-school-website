import "server-only";

/**
 * Cloudflare Turnstile server-side verification.
 *
 * Enforcement rules:
 *   - If TURNSTILE_SECRET_KEY is not set, we skip verification entirely (dev mode).
 *   - If TURNSTILE_SECRET_KEY is set AND the token is missing, reject.
 *   - If TURNSTILE_SECRET_KEY is set AND the token is present, call Cloudflare's
 *     siteverify. Reject if the verdict is not "success".
 *
 * Endpoint docs: https://developers.cloudflare.com/turnstile/get-started/server-side-validation/
 */

const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

interface VerifyResponse {
  success: boolean;
  "error-codes"?: string[];
  challenge_ts?: string;
  hostname?: string;
  action?: string;
  cdata?: string;
}

export interface CaptchaResult {
  ok: boolean;
  reason?: string;
}

export async function verifyCaptcha(
  token: string | undefined,
  remoteIp?: string,
): Promise<CaptchaResult> {
  const secret = process.env.TURNSTILE_SECRET_KEY;

  // Dev mode — no secret configured means we're not enforcing captcha yet.
  if (!secret) return { ok: true };

  if (!token || token.trim().length === 0) {
    return { ok: false, reason: "captcha-missing" };
  }

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (remoteIp) body.set("remoteip", remoteIp);

    const res = await fetch(VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
      cache: "no-store",
    });
    if (!res.ok) {
      return { ok: false, reason: `captcha-verify-http-${res.status}` };
    }
    const data = (await res.json()) as VerifyResponse;
    if (!data.success) {
      return {
        ok: false,
        reason: `captcha-failed:${(data["error-codes"] ?? []).join(",") || "unknown"}`,
      };
    }
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      reason: `captcha-verify-error:${(err as Error).message}`,
    };
  }
}
