import { z } from "zod";

export const tcVerifySchema = z.object({
  tcNumber: z.string().trim().min(1, "TC number is required").max(64),
  studentName: z.string().trim().min(2, "Student name is required").max(120),
  dateOfBirth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be in YYYY-MM-DD format"),
  captchaToken: z.string().optional(),
  website: z.string().max(0).optional(),
});

export type TcVerifyInput = z.infer<typeof tcVerifySchema>;
