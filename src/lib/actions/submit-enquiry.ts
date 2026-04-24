"use server";

import { enquirySchema } from "@/lib/schemas/enquiry";
import { persistSubmission, renderKvHtml } from "./_persist";
import { verifyCaptcha } from "./_captcha";

export interface FormActionResult {
  ok: boolean;
  message: string;
  fieldErrors?: Record<string, string[] | undefined>;
}

export async function submitEnquiry(
  _prev: FormActionResult | null,
  formData: FormData,
): Promise<FormActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = enquirySchema.safeParse(raw);

  if (!parsed.success) {
    return {
      ok: false,
      message: "Please correct the highlighted fields and try again.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  // Silent honeypot — pretend success.
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

  // TODO: replace with POST to backend API once available:
  // await apiPost("/enquiry", parsed.data);

  await persistSubmission("enquiry", parsed.data, {
    subject: `New enquiry from ${parsed.data.name}`,
    html: renderKvHtml("New website enquiry", {
      Name: parsed.data.name,
      Email: parsed.data.email,
      Phone: parsed.data.phone,
      Address: parsed.data.address ?? "",
      Message: parsed.data.message,
    }),
  });

  return {
    ok: true,
    message: "Thank you — your enquiry has been received. We'll be in touch shortly.",
  };
}
