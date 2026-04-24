import { cn } from "@/lib/utils/cn";

interface ProseProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
}

/**
 * Prose — renders a plain-text string with paragraph breaks on blank lines.
 * Used anywhere we have long-form copy from the content layer that should
 * flow as readable paragraphs.
 */
export function Prose({ text, className, ...rest }: ProseProps) {
  const paragraphs = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return (
    <div
      className={cn(
        "max-w-3xl space-y-4 text-base leading-relaxed text-[--color-foreground]",
        className,
      )}
      {...rest}
    >
      {paragraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
