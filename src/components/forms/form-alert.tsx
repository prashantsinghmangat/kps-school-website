import { CheckCircle2, AlertTriangle } from "lucide-react";

interface FormAlertProps {
  kind: "success" | "error";
  children: React.ReactNode;
}

export function FormAlert({ kind, children }: FormAlertProps) {
  if (kind === "success") {
    return (
      <div
        role="status"
        className="flex items-start gap-3 rounded-md border border-green-200 bg-green-50 p-4 text-sm text-green-900"
      >
        <CheckCircle2 size={18} className="mt-0.5 flex-none" />
        <p>{children}</p>
      </div>
    );
  }
  return (
    <div
      role="alert"
      className="flex items-start gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-900"
    >
      <AlertTriangle size={18} className="mt-0.5 flex-none" />
      <p>{children}</p>
    </div>
  );
}
