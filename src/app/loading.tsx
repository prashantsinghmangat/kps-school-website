/**
 * Root loading fallback — shown while a Server Component segment suspends.
 * For client-side navigations we rely on the NextTopLoader gold progress bar
 * in the root layout. This skeleton is the fallback that fills the page
 * while any server-rendered segment is still resolving.
 */
export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 md:py-16 lg:px-8">
      {/* Hero skeleton */}
      <div
        aria-hidden
        className="animate-pulse rounded-xl bg-gradient-to-r from-[--color-muted] via-[--color-surface-cool] to-[--color-muted]"
        style={{ height: "38vh", minHeight: 240, maxHeight: 380 }}
      />

      <div className="mt-10 grid gap-6 md:grid-cols-3">
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-20 rounded bg-[--color-muted]" />
          <div className="h-6 w-3/4 rounded bg-[--color-muted]" />
          <div className="h-4 w-full rounded bg-[--color-muted]" />
          <div className="h-4 w-5/6 rounded bg-[--color-muted]" />
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-20 rounded bg-[--color-muted]" />
          <div className="h-6 w-3/4 rounded bg-[--color-muted]" />
          <div className="h-4 w-full rounded bg-[--color-muted]" />
          <div className="h-4 w-5/6 rounded bg-[--color-muted]" />
        </div>
        <div className="animate-pulse space-y-3">
          <div className="h-3 w-20 rounded bg-[--color-muted]" />
          <div className="h-6 w-3/4 rounded bg-[--color-muted]" />
          <div className="h-4 w-full rounded bg-[--color-muted]" />
          <div className="h-4 w-5/6 rounded bg-[--color-muted]" />
        </div>
      </div>

      <span className="sr-only" role="status">Loading…</span>
    </div>
  );
}
