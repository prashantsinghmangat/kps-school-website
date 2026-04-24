import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,

  // Until we rehost images or ship a real CDN, content images are hot-linked
  // from the legacy domain we still own. Allow-list it here so `next/image`
  // will serve them. When images move to S3/R2/Vercel, add the new host and
  // drop the legacy entry once the cutover is complete.
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.krishnapublicschoolmeerut.in",
      },
      {
        protocol: "https",
        hostname: "krishnapublicschoolmeerut.in",
      },
    ],
    formats: ["image/avif", "image/webp"],
  },

  // Security & Core Web Vitals headers. Keep CSP out of Next's static header
  // list for now — we'll build a real CSP when we add analytics/CAPTCHA since
  // those need their own allow-list entries.
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
