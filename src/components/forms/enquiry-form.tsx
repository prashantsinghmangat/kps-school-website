"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { enquirySchema, type EnquiryInput } from "@/lib/schemas/enquiry";
import { submitEnquiry } from "@/lib/actions/submit-enquiry";
import { Label, Input, Textarea, FieldError, FormRow, Honeypot } from "./fields";
import { SubmitButton } from "./submit-button";
import { FormAlert } from "./form-alert";
import { Turnstile } from "./turnstile";

export function EnquiryForm() {
  const [state, formAction, isPending] = useActionState(submitEnquiry, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EnquiryInput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      website: "",
    },
  });

  // Reset form + scroll to success banner on successful submission.
  useEffect(() => {
    if (state?.ok) {
      reset();
      formRef.current?.reset();
      successRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state, reset]);

  // After RHF validates, build FormData straight from the form DOM so the
  // Turnstile-injected captchaToken input is captured alongside RHF fields.
  const onValid = () => {
    if (!formRef.current) return;
    formAction(new FormData(formRef.current));
  };

  const serverField = (name: keyof EnquiryInput) =>
    state && !state.ok ? state.fieldErrors?.[name]?.[0] : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="space-y-5 rounded-lg border border-[--color-border] bg-white p-6 md:p-8"
    >
      <div ref={successRef}>
        {state?.ok ? <FormAlert kind="success">{state.message}</FormAlert> : null}
        {state && !state.ok ? <FormAlert kind="error">{state.message}</FormAlert> : null}
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <FormRow>
          <Label htmlFor="enq-name" required>
            Full name
          </Label>
          <Input
            id="enq-name"
            autoComplete="name"
            error={Boolean(errors.name || serverField("name"))}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message ?? serverField("name")} />
        </FormRow>

        <FormRow>
          <Label htmlFor="enq-email" required>
            Email
          </Label>
          <Input
            id="enq-email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email || serverField("email"))}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message ?? serverField("email")} />
        </FormRow>

        <FormRow>
          <Label htmlFor="enq-phone" required>
            Phone
          </Label>
          <Input
            id="enq-phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={Boolean(errors.phone || serverField("phone"))}
            aria-invalid={Boolean(errors.phone)}
            {...register("phone")}
          />
          <FieldError message={errors.phone?.message ?? serverField("phone")} />
        </FormRow>

        <FormRow>
          <Label htmlFor="enq-address">Address (optional)</Label>
          <Input
            id="enq-address"
            autoComplete="street-address"
            error={Boolean(errors.address || serverField("address"))}
            {...register("address")}
          />
          <FieldError message={errors.address?.message ?? serverField("address")} />
        </FormRow>
      </div>

      <FormRow>
        <Label htmlFor="enq-message" required>
          Your message
        </Label>
        <Textarea
          id="enq-message"
          rows={5}
          placeholder="Tell us a little about your enquiry — class interested in, any specific questions, and a good time to reach you."
          error={Boolean(errors.message || serverField("message"))}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FieldError message={errors.message?.message ?? serverField("message")} />
      </FormRow>

      <Honeypot {...register("website")} />

      <Turnstile />

      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-[--color-muted-foreground]">
          We respond to every enquiry within two working days.
        </p>
        <SubmitButton pending={isPending}>Send enquiry</SubmitButton>
      </div>
    </form>
  );
}
