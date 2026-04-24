import { z } from "zod";

export const admissionSchema = z.object({
  studentName: z.string().trim().min(2, "Student's full name is required").max(120),
  dateOfBirth: z
    .string()
    .trim()
    .regex(/^\d{4}-\d{2}-\d{2}$/u, "Date must be in YYYY-MM-DD format"),
  gender: z.enum(["male", "female", "other"], {
    errorMap: () => ({ message: "Please select a gender" }),
  }),
  classAppliedFor: z.string().trim().min(1, "Please select the class applied for"),
  previousSchool: z.string().trim().max(200).optional().or(z.literal("")),

  fatherName: z.string().trim().min(2, "Father's name is required").max(120),
  motherName: z.string().trim().min(2, "Mother's name is required").max(120),
  guardianEmail: z.string().trim().email("Please enter a valid email"),
  guardianPhone: z
    .string()
    .trim()
    .regex(/^\+?[0-9\s-]{7,15}$/u, "Please enter a valid phone number"),
  address: z.string().trim().min(5, "Please enter your residence address").max(500),

  notes: z.string().trim().max(2000).optional().or(z.literal("")),
  captchaToken: z.string().optional(),
  website: z.string().max(0).optional(),
});

export type AdmissionInput = z.infer<typeof admissionSchema>;
