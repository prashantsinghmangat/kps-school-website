import * as LucideIcons from "lucide-react";
import type { LucideProps } from "lucide-react";
import { getWhyChooseUs } from "@/lib/api";

type IconComponent = React.ForwardRefExoticComponent<
  Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
>;

function lookupIcon(name: string): IconComponent {
  const lib = LucideIcons as unknown as Record<string, IconComponent>;
  return lib[name] ?? lib.HelpCircle;
}

export async function WhyChooseUsGrid() {
  const items = await getWhyChooseUs();

  return (
    <section className="mx-auto max-w-7xl px-4 py-14 md:px-6 md:py-20">
      <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
        Why KPS
      </p>
      <h2 className="mt-2 font-[family-name:var(--font-heading)] text-3xl font-bold tracking-tight md:text-4xl">
        Six reasons families choose Krishna Public School
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = lookupIcon(item.icon);
          return (
            <article
              key={item.title}
              className="rounded-lg border border-[--color-border] bg-white p-6 transition-shadow hover:shadow-md"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-md bg-[--color-muted] text-[--color-primary]">
                <Icon size={22} />
              </span>
              <h3 className="mt-4 font-[family-name:var(--font-heading)] text-lg font-semibold">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[--color-muted-foreground]">
                {item.description}
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
