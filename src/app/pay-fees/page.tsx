import type { Metadata } from "next";
import { PagePlaceholder } from "@/components/common/page-placeholder";

export const metadata: Metadata = {
  title: "Pay Fees",
  description: "Pay school fees online at Krishna Public School, Meerut.",
  alternates: { canonical: "/pay-fees" },
};

export default function PayFeesPage() {
  return (
    <PagePlaceholder
      eyebrow="Fees"
      title="Pay school fees"
      description="The online fee payment gateway will be linked from this page. Until it is live, please pay at the school office or use the method shared with you by the accounts team."
      breadcrumbs={[
        { href: "/", label: "Home" },
        { href: "/pay-fees", label: "Pay Fees" },
      ]}
    />
  );
}
