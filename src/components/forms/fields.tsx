import { forwardRef } from "react";
import { cn } from "@/lib/utils/cn";

/**
 * Shared form field primitives — plain HTML with consistent Tailwind styling
 * and error-state handling. Forms use these + react-hook-form + Zod.
 */

export const Label = ({
  children,
  htmlFor,
  required,
}: {
  children: React.ReactNode;
  htmlFor: string;
  required?: boolean;
}) => (
  <label htmlFor={htmlFor} className="text-sm font-medium text-[--color-foreground]">
    {children}
    {required ? <span className="ml-0.5 text-[--color-primary]">*</span> : null}
  </label>
);

export const FieldError = ({ message }: { message?: string }) =>
  message ? (
    <p className="text-xs text-red-600" role="alert">
      {message}
    </p>
  ) : null;

const baseInput =
  "w-full rounded-md border border-[--color-border] bg-white px-3 py-2 text-sm placeholder:text-[--color-muted-foreground] focus:border-[--color-primary] focus:outline-none focus:ring-2 focus:ring-[--color-ring]/30 disabled:cursor-not-allowed disabled:bg-[--color-muted]";

export const Input = forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: boolean }
>(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(baseInput, error && "border-red-400 focus:border-red-500", className)}
      {...props}
    />
  );
});

export const Textarea = forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: boolean }
>(function Textarea({ className, error, rows = 4, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      className={cn(baseInput, error && "border-red-400 focus:border-red-500", className)}
      {...props}
    />
  );
});

export const Select = forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: boolean }
>(function Select({ className, error, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(baseInput, "pr-8", error && "border-red-400 focus:border-red-500", className)}
      {...props}
    >
      {children}
    </select>
  );
});

/** Hidden honeypot field — spam bots will fill anything called "website". */
export const Honeypot = forwardRef<
  HTMLInputElement,
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "name" | "type">
>(function Honeypot(props, ref) {
  return (
    <input
      ref={ref}
      type="text"
      name="website"
      tabIndex={-1}
      autoComplete="off"
      aria-hidden="true"
      className="absolute left-[-9999px] h-0 w-0 opacity-0"
      {...props}
    />
  );
});

/**
 * Consistent field wrapper — label + control + error, in a flex column.
 */
export function FormRow({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("flex flex-col gap-1.5", className)}>{children}</div>;
}
