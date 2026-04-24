import Link from "next/link";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[60vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center md:px-6">
      <p className="text-sm font-semibold uppercase tracking-wide text-[--color-primary]">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold md:text-4xl">Page not found</h1>
      <p className="mt-3 max-w-md text-[--color-muted-foreground]">
        The page you are looking for does not exist, has moved, or the link is
        broken. Please try one of the links below.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-md bg-[--color-primary] px-4 py-2 text-sm font-semibold text-[--color-primary-foreground] hover:opacity-90"
        >
          Go home
        </Link>
        <Link
          href="/admissions"
          className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
        >
          Admissions
        </Link>
        <Link
          href="/contact"
          className="rounded-md border border-[--color-border] bg-white px-4 py-2 text-sm font-semibold hover:bg-[--color-muted]"
        >
          Contact
        </Link>
      </div>
    </section>
  );
}
