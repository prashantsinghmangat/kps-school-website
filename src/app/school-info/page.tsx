import type { Metadata } from "next";
import {
  Building2,
  FileText,
  GraduationCap,
  Users,
  Hammer,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { PageHero } from "@/components/common/page-hero";
import { getSchoolInfo } from "@/lib/api";

export const metadata: Metadata = {
  title: "CBSE Mandatory Public Disclosure",
  description:
    "Mandatory public disclosure for Krishna Public School, Meerut, as per the directions of the Central Board of Secondary Education (CBSE).",
  alternates: { canonical: "/school-info" },
  robots: { index: true, follow: true },
};

const labelMap: Record<string, string> = {
  nameOfSchool: "Name of the School",
  affiliationNumber: "Affiliation Number",
  schoolCode: "School Code",
  completeAddress: "Complete Address",
  principal: "Name of the Principal",
  emailOfPrincipal: "Email of the Principal",
  contactDetails: "Contact Numbers",
  yearOfFirstAffiliation: "Year of First Affiliation",
  yearOfAffiliationRenewal: "Year of Latest Affiliation Renewal",
  societyOrTrust: "Society / Trust Name",
  noObjectionCertificate: "No Objection Certificate (NOC)",
  recognitionCertificate: "Recognition Certificate under RTE Act",
};

export default async function SchoolInfoPage() {
  const info = await getSchoolInfo();

  return (
    <>
      <PageHero
        eyebrow="CBSE Disclosure"
        title="Mandatory Public Disclosure"
        description="Published in compliance with the directions of the Central Board of Secondary Education, New Delhi."
        breadcrumbs={[
          { href: "/", label: "Home" },
          { href: "/school-info", label: "School Info" },
        ]}
      />

      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16 lg:px-8">
        {/* Compliance note as a trust banner */}
        <div className="flex items-start gap-3 rounded-xl border border-[--color-primary]/20 bg-gradient-to-br from-[--color-surface-cool] to-white p-4 shadow-sm md:p-5">
          <ShieldCheck size={22} className="mt-0.5 flex-none text-[--color-primary]" />
          <p className="text-sm text-[--color-foreground]">{info.complianceNote}</p>
        </div>

        <DisclosureSection title="A. General Information" icon={Building2} letter="A">
          <Table
            rows={Object.entries(info.general).map(([k, v]) => ({
              label: labelMap[k] ?? k,
              value: v,
            }))}
          />
        </DisclosureSection>

        <DisclosureSection title="B. Documents and Information" icon={FileText} letter="B">
          <ul className="grid gap-2 sm:grid-cols-2">
            {info.documents.map((d) => (
              <li
                key={d.label}
                className="flex items-center justify-between gap-3 rounded-lg border border-[--color-border] bg-white px-4 py-3 text-sm shadow-sm transition hover:border-[--color-primary]/40 hover:shadow-md"
              >
                <span className="text-[--color-neutral-dark]">{d.label}</span>
                {d.url ? (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 rounded-full bg-[--color-primary] px-2.5 py-1 text-xs font-bold text-[--color-primary-foreground] transition hover:brightness-110"
                  >
                    View <ExternalLink size={11} />
                  </a>
                ) : (
                  <span className="rounded-full bg-[--color-muted] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-[--color-muted-foreground]">
                    TBD
                  </span>
                )}
              </li>
            ))}
          </ul>
        </DisclosureSection>

        <DisclosureSection
          title="C. Results and Academics"
          icon={GraduationCap}
          letter="C"
        >
          <div className="overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead
                  className="text-left text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ background: "linear-gradient(90deg, #0a3d62, #174873)" }}
                >
                  <tr>
                    <th rowSpan={2} className="px-4 py-3 align-bottom">
                      Year
                    </th>
                    <th colSpan={3} className="border-l border-white/15 px-4 py-2 text-center">
                      Class X
                    </th>
                    <th colSpan={3} className="border-l border-white/15 px-4 py-2 text-center">
                      Class XII
                    </th>
                  </tr>
                  <tr className="border-t border-white/15">
                    <th className="border-l border-white/15 px-4 py-2">Appeared</th>
                    <th className="px-4 py-2">Passed</th>
                    <th className="px-4 py-2">Pass %</th>
                    <th className="border-l border-white/15 px-4 py-2">Appeared</th>
                    <th className="px-4 py-2">Passed</th>
                    <th className="px-4 py-2">Pass %</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[--color-border]">
                  {info.results.map((r) => (
                    <tr key={r.year} className="even:bg-[--color-surface-cool]/40">
                      <td className="px-4 py-3 font-semibold text-[--color-primary]">
                        {r.year}
                      </td>
                      <td className="border-l border-[--color-border] px-4 py-3 text-[--color-neutral-dark]">
                        {r.class10.appeared}
                      </td>
                      <td className="px-4 py-3 text-[--color-neutral-dark]">
                        {r.class10.passed}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[--color-foreground]">
                        {r.class10.passPercent}
                      </td>
                      <td className="border-l border-[--color-border] px-4 py-3 text-[--color-neutral-dark]">
                        {r.class12.appeared}
                      </td>
                      <td className="px-4 py-3 text-[--color-neutral-dark]">
                        {r.class12.passed}
                      </td>
                      <td className="px-4 py-3 font-semibold text-[--color-foreground]">
                        {r.class12.passPercent}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </DisclosureSection>

        <DisclosureSection title="D. Staff (Teaching)" icon={Users} letter="D">
          <Table
            rows={[
              { label: "Principal", value: info.staff.principal },
              { label: "Total number of teachers", value: info.staff.totalTeachers },
              { label: "PRT", value: info.staff.prt },
              { label: "TGT", value: info.staff.tgt },
              { label: "PGT", value: info.staff.pgt },
              { label: "Teacher / Section Ratio", value: info.staff.teacherSectionRatio },
              { label: "Special Educator", value: info.staff.specialEducator },
              { label: "Counsellor / Wellness Teacher", value: info.staff.counsellor },
            ]}
          />
        </DisclosureSection>

        <DisclosureSection title="E. School Infrastructure" icon={Hammer} letter="E">
          <Table
            rows={info.infrastructure.map((row) => ({ label: row.item, value: row.value }))}
          />
        </DisclosureSection>

        <p className="mt-10 rounded-lg border border-dashed border-[--color-border] bg-[--color-muted] px-4 py-3 text-xs text-[--color-muted-foreground]">
          Last updated: <span className="font-medium">{info.lastUpdated}</span>
        </p>
      </section>
    </>
  );
}

function DisclosureSection({
  title,
  letter,
  icon: Icon,
  children,
}: {
  title: string;
  letter: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <header className="flex items-center gap-3">
        <span
          className="inline-flex h-11 w-11 items-center justify-center rounded-lg font-[family-name:var(--font-heading)] text-base font-black text-white shadow-sm"
          style={{ background: "linear-gradient(135deg, #0a3d62, #174873)" }}
        >
          {letter}
        </span>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[--color-highlight]">
            <Icon size={12} className="mr-1 inline-block" /> Section
          </p>
          <h2 className="font-[family-name:var(--font-heading)] text-lg font-bold text-[--color-neutral-dark] md:text-xl">
            {title}
          </h2>
        </div>
      </header>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Table({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-[--color-border] bg-white shadow-sm">
      <dl className="divide-y divide-[--color-border]">
        {rows.map((r, i) => (
          <div
            key={r.label}
            className={`grid gap-1 px-5 py-3.5 text-sm md:grid-cols-[280px,1fr] md:gap-6 ${
              i % 2 === 1 ? "bg-[--color-surface-cool]/40" : ""
            }`}
          >
            <dt className="font-semibold text-[--color-neutral-dark]">{r.label}</dt>
            <dd
              className={
                r.value.toLowerCase().startsWith("tbd")
                  ? "text-xs uppercase tracking-wider text-[--color-muted-foreground]"
                  : "text-[--color-foreground]"
              }
            >
              {r.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
