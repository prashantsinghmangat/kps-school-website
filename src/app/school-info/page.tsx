import type { Metadata } from "next";
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

      <section className="mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-16">
        <div className="rounded-lg border-l-4 border-[--color-primary] bg-[--color-muted] p-4 text-sm">
          {info.complianceNote}
        </div>

        <DisclosureSection title="A. General Information">
          <Table
            rows={Object.entries(info.general).map(([k, v]) => ({
              label: labelMap[k] ?? k,
              value: v,
            }))}
          />
        </DisclosureSection>

        <DisclosureSection title="B. Documents and Information">
          <ul className="divide-y divide-[--color-border] rounded-lg border border-[--color-border] bg-white">
            {info.documents.map((d) => (
              <li key={d.label} className="flex items-center justify-between gap-4 px-4 py-3 text-sm">
                <span>{d.label}</span>
                {d.url ? (
                  <a
                    href={d.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[--color-primary] hover:underline"
                  >
                    View
                  </a>
                ) : (
                  <span className="text-xs text-[--color-muted-foreground]">TBD</span>
                )}
              </li>
            ))}
          </ul>
        </DisclosureSection>

        <DisclosureSection title="C. Results and Academics">
          <div className="overflow-x-auto rounded-lg border border-[--color-border] bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-[--color-muted] text-left text-xs font-semibold uppercase tracking-wide">
                <tr>
                  <th className="px-4 py-3">Year</th>
                  <th className="px-4 py-3">Class X — Appeared</th>
                  <th className="px-4 py-3">Class X — Passed</th>
                  <th className="px-4 py-3">Class X — Pass %</th>
                  <th className="px-4 py-3">Class XII — Appeared</th>
                  <th className="px-4 py-3">Class XII — Passed</th>
                  <th className="px-4 py-3">Class XII — Pass %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[--color-border]">
                {info.results.map((r) => (
                  <tr key={r.year}>
                    <td className="px-4 py-3 font-medium">{r.year}</td>
                    <td className="px-4 py-3">{r.class10.appeared}</td>
                    <td className="px-4 py-3">{r.class10.passed}</td>
                    <td className="px-4 py-3">{r.class10.passPercent}</td>
                    <td className="px-4 py-3">{r.class12.appeared}</td>
                    <td className="px-4 py-3">{r.class12.passed}</td>
                    <td className="px-4 py-3">{r.class12.passPercent}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DisclosureSection>

        <DisclosureSection title="D. Staff (Teaching)">
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

        <DisclosureSection title="E. School Infrastructure">
          <Table rows={info.infrastructure.map((row) => ({ label: row.item, value: row.value }))} />
        </DisclosureSection>

        <p className="mt-8 text-xs text-[--color-muted-foreground]">
          Last updated: {info.lastUpdated}
        </p>
      </section>
    </>
  );
}

function DisclosureSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-8">
      <h2 className="font-[family-name:var(--font-heading)] text-xl font-semibold">
        {title}
      </h2>
      <div className="mt-4">{children}</div>
    </section>
  );
}

function Table({ rows }: { rows: { label: string; value: string }[] }) {
  return (
    <div className="overflow-hidden rounded-lg border border-[--color-border] bg-white">
      <dl className="divide-y divide-[--color-border]">
        {rows.map((r) => (
          <div
            key={r.label}
            className="grid gap-1 px-4 py-3 text-sm md:grid-cols-[260px,1fr] md:gap-4"
          >
            <dt className="font-medium">{r.label}</dt>
            <dd className="text-[--color-muted-foreground]">{r.value}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
