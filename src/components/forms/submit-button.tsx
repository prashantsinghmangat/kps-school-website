import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface SubmitButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  pending?: boolean;
  pendingText?: string;
}

export function SubmitButton({
  pending = false,
  pendingText = "Submitting…",
  children,
  className,
  disabled,
  ...rest
}: SubmitButtonProps) {
  return (
    <button
      type="submit"
      disabled={pending || disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-md bg-[--color-primary] px-5 py-2.5 text-sm font-semibold text-[--color-primary-foreground] transition-colors hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...rest}
    >
      {pending ? <Loader2 size={16} className="animate-spin" /> : null}
      {pending ? pendingText : children}
    </button>
  );
}
