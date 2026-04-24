"use server";

import { contactSchema } from "@/lib/schemas/contact";
import { persistSubmission, renderKvHtml } from "./_persist";
import { verifyCaptcha } from "./_captcha";
import type { FormActionResult } from "./submit-enquiry";

export async function submitContact(
  _prev: FormActionResult | null,
  formData: FormData,
): Promise<FormActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = contactSchema.safeParse(raw);

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

  // TODO: replace with POST to backend API once available.
  await persistSubmission("contact", parsed.data, {
    subject: `Website contact form — ${parsed.data.name}`,
    html: renderKvHtml("Website contact form", {
      Name: parsed.data.name,
      Email: parsed.data.email,
      Mobile: parsed.data.mobile,
      Message: parsed.data.message,
    }),
  });

  return {
    ok: true,
    message: "Thank you — we've received your message and will respond soon.",
  };
}
