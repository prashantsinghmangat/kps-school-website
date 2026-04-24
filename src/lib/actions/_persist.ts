import "server-only";
import fs from "node:fs/promises";
import os from "node:os";
import path from "node:path";

/**
 * Shared submission persistence used by every form server action.
 *
 * Strategy:
 *   - If RESEND_API_KEY is set, email the submission to the recipient.
 *   - Also log to the server console (always) and write a JSON file under
 *     os.tmpdir()/kps-submissions/ so local runs still capture data even
 *     when Resend isn't configured.
 *
 * TODO: replace with POST to backend API (`apiPost("/enquiry", input)`) once
 * the backend is available. Keep the fallback behaviour in dev.
 */

export interface SubmissionResult {
  ok: true;
  via: "resend" | "fallback";
  submissionId: string;
}

const RECIPIENT = process.env.FORM_RECIPIENT_EMAIL ?? "krishna.pub.sch@gmail.com";
const SENDER = process.env.FORM_SENDER_EMAIL ?? "no-reply@krishnapublicschoolmeerut.in";

function newId(): string {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

async function writeTmpFile(
  kind: string,
  submissionId: string,
  payload: unknown,
): Promise<string> {
  const dir = path.join(os.tmpdir(), "kps-submissions");
  await fs.mkdir(dir, { recursive: true });
  const file = path.join(dir, `${kind}-${submissionId}.json`);
  await fs.writeFile(
    file,
    JSON.stringify({ kind, submissionId, receivedAt: new Date().toISOString(), payload }, null, 2),
    "utf8",
  );
  return file;
}

export async function persistSubmission(
  kind: "enquiry" | "contact" | "admission" | "tc-verify",
  payload: Record<string, unknown>,
  opts: { subject: string; html: string },
): Promise<SubmissionResult> {
  const submissionId = newId();

  // Always: structured log (picked up by Vercel / PM2 log aggregators).
  console.info(
    "[form-submission]",
    JSON.stringify({ kind, submissionId, receivedAt: new Date().toISOString() }),
  );

  // Always: tmp file (helpful for local dev and as a last-resort receipt).
  try {
    const file = await writeTmpFile(kind, submissionId, payload);
    console.info("[form-submission] wrote tmp file", file);
  } catch (err) {
    console.warn("[form-submission] tmp write failed:", (err as Error).message);
  }

  // Conditional: Resend email.
  const resendKey = process.env.RESEND_API_KEY;
  if (resendKey) {
    try {
      const { Resend } = await import("resend");
      const resend = new Resend(resendKey);
      await resend.emails.send({
        from: SENDER,
        to: RECIPIENT,
        subject: opts.subject,
        html: opts.html,
      });
      return { ok: true, via: "resend", submissionId };
    } catch (err) {
      console.error("[form-submission] resend failed:", (err as Error).message);
      // Fall through — we still have the tmp receipt and the log.
    }
  }

  return { ok: true, via: "fallback", submissionId };
}

export function renderKvHtml(title: string, record: Record<string, unknown>): string {
  const esc = (s: string) =>
    s.replace(/[&<>"']/g, (ch) =>
      ch === "&"
        ? "&amp;"
        : ch === "<"
          ? "&lt;"
          : ch === ">"
            ? "&gt;"
            : ch === '"'
              ? "&quot;"
              : "&#39;",
    );
  const rows = Object.entries(record)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:4px 10px;font-weight:600">${esc(k)}</td><td style="padding:4px 10px">${esc(
          String(v ?? ""),
        )}</td></tr>`,
    )
    .join("");
  return `<div style="font-family:system-ui,sans-serif"><h2>${esc(title)}</h2><table style="border-collapse:collapse">${rows}</table></div>`;
}
