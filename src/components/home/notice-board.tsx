import Link from "next/link";
import { Bell } from "lucide-react";
import { getLatestNotices } from "@/lib/api";
import { formatDate } from "@/lib/utils/format-date";

export async function NoticeBoard() {
  const notices = await getLatestNotices(5);

  return (
    <section className="border-y border-[--color-border] bg-white">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:gap-8 md:px-6">
        <div className="flex items-center gap-3">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[--color-primary] text-[--color-primary-foreground]">
            <Bell size={18} />
          </span>
          <div>
            <h2 className="font-[family-name:var(--font-heading)] text-base font-semibold">
              Notice Board
            </h2>
            <Link
              href="/notices"
              className="text-xs text-[--color-primary] hover:underline"
            >
              View all
            </Link>
          </div>
        </div>

        <div className="flex-1">
          {notices.length === 0 ? (
            <p className="text-sm text-[--color-muted-foreground]">
              There are no notices posted at the moment.{" "}
              <Link href="/news" className="text-[--color-primary] hover:underline">
                See recent news & events
              </Link>
              .
            </p>
          ) : (
            <ul className="flex flex-wrap gap-x-8 gap-y-2 text-sm">
              {notices.map((n) => (
                <li key={n.id} className="flex items-baseline gap-2">
                  <span className="text-xs text-[--color-muted-foreground]">
                    {formatDate(n.date)}
                  </span>
                  <Link
                    href={n.url ?? `/notices/${n.slug}`}
                    className="hover:text-[--color-primary]"
                  >
                    {n.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}
