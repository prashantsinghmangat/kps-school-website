"use server";

import { tcVerifySchema } from "@/lib/schemas/tc";
import { persistSubmission, renderKvHtml } from "./_persist";
import { verifyCaptcha } from "./_captcha";
import type { FormActionResult } from "./submit-enquiry";

export interface TcVerifyResult extends FormActionResult {
  valid?: boolean;
  details?: {
    studentName: string;
    dateOfLeaving?: string;
    classAtLeaving?: string;
  };
}

export async function verifyTc(
  _prev: TcVerifyResult | null,
  formData: FormData,
): Promise<TcVerifyResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = tcVerifySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }
  if (parsed.data.website) {
    return { ok: true, message: "Thanks — we'll be in touch soon." };
  }

  const captcha = await verifyCaptcha(parsed.data.captchaToken);
  if (!captcha.ok) {
    return {
      ok: false,
      message:
        "We couldn't verify that you are a person. Please reload the page and try again.",
    };
  }

  // TODO: replace with POST to backend API once available. The backend will
  // actually validate the TC against the school records. For now we log the
  // verification request so the school office can follow up by phone.
  await persistSubmission("tc-verify", parsed.data, {
    subject: `TC verification request — ${parsed.data.tcNumber}`,
    html: renderKvHtml("TC verification request", {
      "TC Number": parsed.data.tcNumber,
      "Student Name": parsed.data.studentName,
      "Date of Birth": parsed.data.dateOfBirth,
    }),
  });

  return {
    ok: true,
    valid: false,
    message:
      "Your verification request has been logged. The school office will confirm the TC status and contact you shortly. Online TC verification will be available once the school records are connected to this website.",
  };
}
