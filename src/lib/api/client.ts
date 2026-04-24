/**
 * Thin fetch wrapper for the (future) backend API.
 *
 * The backend isn't live yet — every resource module under `src/lib/api/`
 * currently reads from `src/content/` and returns the same shape the real
 * backend will return. When the real API exists, each resource module will
 * switch its internals to use `apiGet` / `apiPost` below.
 *
 * Keep this file tiny. It should be the only place that knows about
 * `NEXT_PUBLIC_API_URL`, request headers, and error mapping.
 */

const API_BASE = process.env.NEXT_PUBLIC_API_URL ?? "";

export class ApiError extends Error {
  constructor(
    public status: number,
    message: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

interface RequestOpts extends RequestInit {
  /** Next.js fetch cache/revalidate knob. */
  revalidate?: number;
  /** Tag used for on-demand revalidation. */
  tags?: string[];
}

export async function apiGet<T>(path: string, opts: RequestOpts = {}): Promise<T> {
  if (!API_BASE) {
    throw new ApiError(500, "NEXT_PUBLIC_API_URL is not configured");
  }
  const { revalidate, tags, ...rest } = opts;
  const res = await fetch(`${API_BASE}${path}`, {
    ...rest,
    next: {
      ...(revalidate !== undefined ? { revalidate } : {}),
      ...(tags ? { tags } : {}),
    },
  });
  if (!res.ok) {
    throw new ApiError(res.status, `GET ${path} -> ${res.status}`);
  }
  return (await res.json()) as T;
}

export async function apiPost<T>(
  path: string,
  body: unknown,
  opts: Omit<RequestOpts, "body"> = {},
): Promise<T> {
  if (!API_BASE) {
    throw new ApiError(500, "NEXT_PUBLIC_API_URL is not configured");
  }
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...(opts.headers ?? {}) },
    body: JSON.stringify(body),
    cache: "no-store",
  });
  if (!res.ok) {
    let details: unknown = undefined;
    try {
      details = await res.json();
    } catch {
      /* ignore */
    }
    throw new ApiError(res.status, `POST ${path} -> ${res.status}`, details);
  }
  return (await res.json()) as T;
}

/**
 * isBackendLive — feature flag for swapping each resource module from the
 * local content layer to real API calls. Flip to `API_BASE.length > 0` once
 * the backend is up and endpoints are verified.
 */
export const isBackendLive = false;
