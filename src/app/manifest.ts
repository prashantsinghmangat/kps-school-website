import type { MetadataRoute } from "next";
import { SITE_NAME, SITE_SHORT_NAME, SITE_DESCRIPTION } from "@/lib/constants/seo";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: SITE_NAME,
    short_name: SITE_SHORT_NAME,
    description: SITE_DESCRIPTION,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a3d62",
    // Next.js auto-routes app/icon.tsx → /icon and app/apple-icon.tsx →
    // /apple-icon (no extension). Match those paths here.
    icons: [
      { src: "/icon", sizes: "64x64", type: "image/png" },
      { src: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
  };
}
