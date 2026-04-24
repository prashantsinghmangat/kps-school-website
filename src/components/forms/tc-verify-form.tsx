"use client";

import { useActionState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { tcVerifySchema, type TcVerifyInput } from "@/lib/schemas/tc";
import { verifyTc } from "@/lib/actions/verify-tc";
import { Label, Input, FieldError, FormRow, Honeypot } from "./fields";
import { SubmitButton } from "./submit-button";
import { FormAlert } from "./form-alert";
import { Turnstile } from "./turnstile";

export function TcVerifyForm() {
  const [state, formAction, isPending] = useActionState(verifyTc, null);
  const formRef = useRef<HTMLFormElement | null>(null);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TcVerifyInput>({
    resolver: zodResolver(tcVerifySchema),
    defaultValues: {
      tcNumber: "",
      studentName: "",
      dateOfBirth: "",
      website: "",
    },
  });

  useEffect(() => {
    if (state?.ok) {
      reset();
      formRef.current?.reset();
      bannerRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [state, reset]);

  const onValid = () => {
    if (!formRef.current) return;
    formAction(new FormData(formRef.current));
  };

  const serverField = (name: keyof TcVerifyInput) =>
    state && !state.ok ? state.fieldErrors?.[name]?.[0] : undefined;

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit(onValid)}
      noValidate
      className="space-y-5 rounded-lg border border-[--color-border] bg-white p-6 md:p-8"
    >
      <div ref={bannerRef}>
        {state?.ok ? <FormAlert kind="success">{state.message}</FormAlert> : null}
        {state && !state.ok ? <FormAlert kind="error">{state.message}</FormAlert> : null}
      </div>

      <FormRow>
        <Label htmlFor="tc-number" required>
          TC Number
        </Label>
        <Input
          id="tc-number"
          placeholder="e.g. KPS/2024/0412"
          error={Boolean(errors.tcNumber || serverField("tcNumber"))}
          aria-invalid={Boolean(errors.tcNumber)}
          {...register("tcNumber")}
        />
        <FieldError message={errors.tcNumber?.message ?? serverField("tcNumber")} />
      </FormRow>

      <FormRow>
        <Label htmlFor="tc-student" required>
          Student&apos;s full name (as on TC)
        </Label>
        <Input
          id="tc-student"
          error={Boolean(errors.studentName || serverField("studentName"))}
          aria-invalid={Boolean(errors.studentName)}
          {...register("studentName")}
        />
        <FieldError
          message={errors.studentName?.message ?? serverField("studentName")}
        />
      </FormRow>

      <FormRow>
        <Label htmlFor="tc-dob" required>
          Date of birth
        </Label>
        <Input
          id="tc-dob"
          type="date"
          error={Boolean(errors.dateOfBirth || serverField("dateOfBirth"))}
          aria-invalid={Boolean(errors.dateOfBirth)}
          {...register("dateOfBirth")}
        />
        <FieldError
          message={errors.dateOfBirth?.message ?? serverField("dateOfBirth")}
        />
      </FormRow>

      <Honeypot {...register("website")} />

      <Turnstile />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-xs text-[--color-muted-foreground]">
          Automatic verification against school records is pending backend integration.
          Your request will be logged and the school office will respond.
        </p>
        <SubmitButton pending={isPending}>Verify TC</SubmitButton>
      </div>
    </form>
  );
}
