import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name").max(120),
  email: z.string().trim().email("Please enter a valid email"),
  mobile: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/u, "Please enter a valid mobile number"),
  message: z
    .string()
    .trim()
    .min(10, "Please share a little more (10+ characters)")
    .max(2000),
  captchaToken: z.string().optional(),
  website: z.string().max(0).optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
