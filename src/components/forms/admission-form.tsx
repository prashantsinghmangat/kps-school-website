"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { admissionSchema, type AdmissionInput } from "@/lib/schemas/admission";
import { submitAdmission } from "@/lib/actions/submit-admission";
import { classes } from "@/lib/constants/classes";
import {
  Label,
  Input,
  Textarea,
  Select,
  FieldError,
  FormRow,
  Honeypot,
} from "./fields";
import { SubmitButton } from "./submit-button";
import { FormAlert } from "./form-alert";
import { Turnstile } from "./turnstile";

export function AdmissionForm() {
  const [state, formAction, isPending] = useActionState(submitAdmission, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdmissionInput>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      studentName: "",
      dateOfBirth: "",
      gender: "male",
      classAppliedFor: "",
      previousSchool: "",
      fatherName: "",
      motherName: "",
      guardianEmail: "",
      guardianPhone: "",
      address: "",
      notes: "",
      website: "",
    },
  });

  useEffect(() => {
    if (state?.ok) {
      reset();
      formRef.current?.reset();
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state, reset]);

  const onValid = () => {
    if (!formRef.current) return;
    formAction(new FormData(formRef.current));
  };

  const serverField = (name: keyof AdmissionInput) =>
    state && !state.ok ? state.fieldErrors?.[name]?.[0] : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="space-y-6 rounded-lg border border-[--color-border] bg-white p-6 md:p-8"
    >
      <div ref={successRef}>
        {state?.ok ? <FormAlert kind="success">{state.message}</FormAlert> : null}
        {state && !state.ok ? <FormAlert kind="error">{state.message}</FormAlert> : null}
      </div>

      <fieldset className="space-y-5">
        <legend className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          Student details
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <FormRow>
            <Label htmlFor="adm-studentName" required>
              Student&apos;s full name
            </Label>
            <Input
              id="adm-studentName"
              error={Boolean(errors.studentName || serverField("studentName"))}
              aria-invalid={Boolean(errors.studentName)}
              {...register("studentName")}
            />
            <FieldError
              message={errors.studentName?.message ?? serverField("studentName")}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="adm-dob" required>
              Date of birth
            </Label>
            <Input
              id="adm-dob"
              type="date"
              error={Boolean(errors.dateOfBirth || serverField("dateOfBirth"))}
              aria-invalid={Boolean(errors.dateOfBirth)}
              {...register("dateOfBirth")}
            />
            <FieldError
              message={errors.dateOfBirth?.message ?? serverField("dateOfBirth")}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="adm-gender" required>
              Gender
            </Label>
            <Select
              id="adm-gender"
              error={Boolean(errors.gender || serverField("gender"))}
              aria-invalid={Boolean(errors.gender)}
              {...register("gender")}
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </Select>
            <FieldError message={errors.gender?.message ?? serverField("gender")} />
          </FormRow>

          <FormRow>
            <Label htmlFor="adm-class" required>
              Class applying for
            </Label>
            <Select
              id="adm-class"
              error={Boolean(errors.classAppliedFor || serverField("classAppliedFor"))}
              aria-invalid={Boolean(errors.classAppliedFor)}
              {...register("classAppliedFor")}
            >
              <option value="">Select a class…</option>
              {classes.map((c) => (
                <option key={c.slug} value={c.name}>
                  {c.name}
                </option>
              ))}
            </Select>
            <FieldError
              message={errors.classAppliedFor?.message ?? serverField("classAppliedFor")}
            />
          </FormRow>

          <FormRow className="md:col-span-2">
            <Label htmlFor="adm-previous">Previous school (if any)</Label>
            <Input
              id="adm-previous"
              error={Boolean(errors.previousSchool || serverField("previousSchool"))}
              {...register("previousSchool")}
            />
            <FieldError
              message={errors.previousSchool?.message ?? serverField("previousSchool")}
            />
          </FormRow>
        </div>
      </fieldset>

      <fieldset className="space-y-5">
        <legend className="font-[family-name:var(--font-heading)] text-lg font-semibold">
          Guardian details
        </legend>

        <div className="grid gap-5 md:grid-cols-2">
          <FormRow>
            <Label htmlFor="adm-father" required>
              Father&apos;s name
            </Label>
            <Input
              id="adm-father"
              error={Boolean(errors.fatherName || serverField("fatherName"))}
              aria-invalid={Boolean(errors.fatherName)}
              {...register("fatherName")}
            />
            <FieldError
              message={errors.fatherName?.message ?? serverField("fatherName")}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="adm-mother" required>
              Mother&apos;s name
            </Label>
            <Input
              id="adm-mother"
              error={Boolean(errors.motherName || serverField("motherName"))}
              aria-invalid={Boolean(errors.motherName)}
              {...register("motherName")}
            />
            <FieldError
              message={errors.motherName?.message ?? serverField("motherName")}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="adm-email" required>
              Guardian email
            </Label>
            <Input
              id="adm-email"
              type="email"
              autoComplete="email"
              error={Boolean(errors.guardianEmail || serverField("guardianEmail"))}
              aria-invalid={Boolean(errors.guardianEmail)}
              {...register("guardianEmail")}
            />
            <FieldError
              message={errors.guardianEmail?.message ?? serverField("guardianEmail")}
            />
          </FormRow>

          <FormRow>
            <Label htmlFor="adm-phone" required>
              Guardian phone
            </Label>
            <Input
              id="adm-phone"
              type="tel"
              inputMode="tel"
              autoComplete="tel"
              error={Boolean(errors.guardianPhone || serverField("guardianPhone"))}
              aria-invalid={Boolean(errors.guardianPhone)}
              {...register("guardianPhone")}
            />
            <FieldError
              message={errors.guardianPhone?.message ?? serverField("guardianPhone")}
            />
          </FormRow>

          <FormRow className="md:col-span-2">
            <Label htmlFor="adm-address" required>
              Residence address
            </Label>
            <Textarea
              id="adm-address"
              rows={3}
              autoComplete="street-address"
              error={Boolean(errors.address || serverField("address"))}
              aria-invalid={Boolean(errors.address)}
              {...register("address")}
            />
            <FieldError message={errors.address?.message ?? serverField("address")} />
          </FormRow>
        </div>
      </fieldset>

      <FormRow>
        <Label htmlFor="adm-notes">Notes for the admissions office (optional)</Label>
        <Textarea
          id="adm-notes"
          rows={4}
          placeholder="Anything you'd like us to know — special circumstances, scheduling preferences, or specific questions."
          {...register("notes")}
        />
        <FieldError message={errors.notes?.message ?? serverField("notes")} />
      </FormRow>

      <Honeypot {...register("website")} />

      <Turnstile />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[--color-muted-foreground]">
          Please review your details before submitting. The admissions office will
          contact you within two working days.
        </p>
        <SubmitButton pending={isPending}>Submit application</SubmitButton>
      </div>
    </form>
  );
}
