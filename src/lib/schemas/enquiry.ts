import { z } from "zod";

export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/u, "Please enter a valid phone number"),
  address: z.string().trim().max(400).optional().or(z.literal("")),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more (10+ characters)")
    .max(2000),
  /** Cloudflare Turnstile token — verified server-side. Optional until wired. */
  captchaToken: z.string().optional(),
  /** Honeypot: must be empty. */
  website: z.string().max(0).optional(),
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
