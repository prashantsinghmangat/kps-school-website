import { GraduationCap, School, Building2, Trophy } from "lucide-react";

/**
 * Four-tile stats/features band. Verified facts (CBSE affiliation, grade
 * range, streams, campus features) — no invented numbers.
 *
 * When the school office provides verified headcount / board-result numbers,
 * swap the strings below and flip `kind` to "stat". Today we lean on facts
 * that are provably true from the legacy scrape + general CBSE knowledge.
 */

interface StatItem {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  value: string;
  label: string;
  kind: "fact" | "stat";
}

const items: StatItem[] = [
  { icon: School, value: "CBSE", label: "Central Board Affiliation", kind: "fact" },
  { icon: GraduationCap, value: "Nursery–XII", label: "Full School Programme", kind: "fact" },
  { icon: Building2, value: "Science · Commerce", label: "Senior Secondary Streams", kind: "fact" },
  { icon: Trophy, value: "NH-58 Meerut", label: "Campus on the Bypass", kind: "fact" },
];

export function StatsBand() {
  return (
    <section
      aria-label="At a glance"
      className="brand-gradient-band relative overflow-hidden text-white"
    >
      {/* Gold accent rule at top */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-[--color-accent] to-transparent opacity-70"
      />
      {/* Decorative blurred glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-[--color-accent]/20 blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-4 py-10 md:px-6 md:py-12">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <div
                key={it.label}
                className="flex items-start gap-4 rounded-xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm transition hover:bg-white/15"
              >
                <span className="inline-flex h-11 w-11 flex-none items-center justify-center rounded-md bg-[--color-accent] text-[--color-accent-foreground] shadow-md">
                  <Icon size={22} />
                </span>
                <div>
                  <p className="font-[family-name:var(--font-heading)] text-xl font-bold tracking-tight md:text-2xl">
                    {it.value}
                  </p>
                  <p className="mt-0.5 text-xs uppercase tracking-wide opacity-85">{it.label}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
