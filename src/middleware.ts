import { NextResponse, type NextRequest } from "next/server";
import {
  staticRedirects,
  infrastructureSlugByInfraId,
  homeworkSlugByDCatId,
  gallerySlugByGalleryCatId,
} from "@/lib/constants/redirects";

/**
 * Legacy `.php` URL handler. Resolves the incoming legacy URL + query-string
 * to a clean Next.js path and issues a 301. Runs before routing so these
 * legacy URLs never fall through to a 404.
 */
export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;
  const target = resolveLegacyPath(pathname, searchParams);

  if (target && target !== pathname) {
    const url = req.nextUrl.clone();
    url.pathname = target;
    // Preserve no query params — the clean URL encodes them in the path.
    url.search = "";
    return NextResponse.redirect(url, 301);
  }

  return NextResponse.next();
}

function resolveLegacyPath(
  pathname: string,
  searchParams: URLSearchParams,
): string | null {
  // 1:1 static redirects.
  const direct = staticRedirects[pathname];
  if (direct) return direct;

  // infrastructure.php?InfraId=N -> /facilities/<slug>
  if (pathname === "/infrastructure.php") {
    const id = searchParams.get("InfraId");
    if (id && infrastructureSlugByInfraId[id]) {
      return `/facilities/${infrastructureSlugByInfraId[id]}`;
    }
    return "/facilities";
  }

  // homeworklist.php?DCatId=N -> /academics/homework/<slug>
  if (pathname === "/homeworklist.php") {
    const id = searchParams.get("DCatId");
    if (id && homeworkSlugByDCatId[id]) {
      return `/academics/homework/${homeworkSlugByDCatId[id]}`;
    }
    return "/academics/homework";
  }

  // gallery.php?GalleryCatId=N -> /gallery/<slug>
  if (pathname === "/gallery.php") {
    const id = searchParams.get("GalleryCatId");
    if (id && gallerySlugByGalleryCatId[id]) {
      return `/gallery/${gallerySlugByGalleryCatId[id]}`;
    }
    return "/gallery";
  }

  return null;
}

/**
 * Only match legacy `.php` URLs. Everything else skips the middleware for
 * free. Excludes API routes, static assets and Next internals.
 */
export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*\\.php$)"],
};
