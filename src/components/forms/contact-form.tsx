"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schemas/contact";
import { submitContact } from "@/lib/actions/submit-contact";
import { Label, Input, Textarea, FieldError, FormRow, Honeypot } from "./fields";
import { SubmitButton } from "./submit-button";
import { FormAlert } from "./form-alert";
import { Turnstile } from "./turnstile";

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitContact, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: "", email: "", mobile: "", message: "", website: "" },
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

  const serverField = (name: keyof ContactInput) =>
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
          <Label htmlFor="con-name" required>
            Full name
          </Label>
          <Input
            id="con-name"
            autoComplete="name"
            error={Boolean(errors.name || serverField("name"))}
            aria-invalid={Boolean(errors.name)}
            {...register("name")}
          />
          <FieldError message={errors.name?.message ?? serverField("name")} />
        </FormRow>

        <FormRow>
          <Label htmlFor="con-email" required>
            Email
          </Label>
          <Input
            id="con-email"
            type="email"
            autoComplete="email"
            error={Boolean(errors.email || serverField("email"))}
            aria-invalid={Boolean(errors.email)}
            {...register("email")}
          />
          <FieldError message={errors.email?.message ?? serverField("email")} />
        </FormRow>

        <FormRow className="md:col-span-2">
          <Label htmlFor="con-mobile" required>
            Mobile
          </Label>
          <Input
            id="con-mobile"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            error={Boolean(errors.mobile || serverField("mobile"))}
            aria-invalid={Boolean(errors.mobile)}
            {...register("mobile")}
          />
          <FieldError message={errors.mobile?.message ?? serverField("mobile")} />
        </FormRow>
      </div>

      <FormRow>
        <Label htmlFor="con-message" required>
          Message
        </Label>
        <Textarea
          id="con-message"
          rows={5}
          placeholder="How can we help?"
          error={Boolean(errors.message || serverField("message"))}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        <FieldError message={errors.message?.message ?? serverField("message")} />
      </FormRow>

      <Honeypot {...register("website")} />

      <Turnstile />

      <div className="flex items-center justify-end gap-3">
        <SubmitButton pending={isPending}>Send message</SubmitButton>
      </div>
    </form>
  );
}
