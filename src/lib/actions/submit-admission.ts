"use server";

import { admissionSchema } from "@/lib/schemas/admission";
import { persistSubmission, renderKvHtml } from "./_persist";
import { verifyCaptcha } from "./_captcha";
import type { FormActionResult } from "./submit-enquiry";

export async function submitAdmission(
  _prev: FormActionResult | null,
  formData: FormData,
): Promise<FormActionResult> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = admissionSchema.safeParse(raw);

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
  await persistSubmission("admission", parsed.data, {
    subject: `Admission application — ${parsed.data.studentName} (${parsed.data.classAppliedFor})`,
    html: renderKvHtml("Admission application", {
      "Student Name": parsed.data.studentName,
      "Date of Birth": parsed.data.dateOfBirth,
      Gender: parsed.data.gender,
      "Class Applied For": parsed.data.classAppliedFor,
      "Previous School": parsed.data.previousSchool ?? "",
      "Father's Name": parsed.data.fatherName,
      "Mother's Name": parsed.data.motherName,
      "Guardian Email": parsed.data.guardianEmail,
      "Guardian Phone": parsed.data.guardianPhone,
      Address: parsed.data.address,
      Notes: parsed.data.notes ?? "",
    }),
  });

  return {
    ok: true,
    message:
      "Thank you — your application has been received. The admissions office will be in touch with next steps.",
  };
}
