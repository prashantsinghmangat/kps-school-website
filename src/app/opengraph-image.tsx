import { ImageResponse } from "next/og";
import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants/seo";

export const runtime = "nodejs";

export const alt = SITE_NAME;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 80px",
          background:
            "linear-gradient(135deg, #0a3d62 0%, #174873 45%, #05253f 100%)",
          color: "white",
          fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, sans-serif",
        }}
      >
        {/* Gold accent bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 10,
            background: "linear-gradient(90deg, #FFDE59 0%, #F5B800 100%)",
          }}
        />

        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* Emblem */}
          <div
            style={{
              width: 112,
              height: 112,
              borderRadius: 56,
              background: "#0B2447",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
            }}
          >
            <div
              style={{
                width: 92,
                height: 92,
                borderRadius: 46,
                background: "linear-gradient(180deg, #FFDE59 0%, #F5B800 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#C8102E",
                fontSize: 36,
                fontWeight: 900,
                letterSpacing: "-0.03em",
              }}
            >
              KPS
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            <div
              style={{
                fontSize: 20,
                fontWeight: 600,
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                opacity: 0.85,
                color: "#F5B800",
              }}
            >
              CBSE · Meerut
            </div>
            <div
              style={{
                fontSize: 28,
                fontWeight: 700,
                opacity: 0.95,
              }}
            >
              Since the day this school began
            </div>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              fontSize: 82,
              fontWeight: 900,
              letterSpacing: "-0.035em",
              lineHeight: 1.02,
              maxWidth: 980,
            }}
          >
            {SITE_NAME}
          </div>
          <div
            style={{
              fontSize: 30,
              opacity: 0.9,
              maxWidth: 940,
              lineHeight: 1.25,
            }}
          >
            {SITE_TAGLINE}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            paddingTop: 16,
            borderTop: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <span
            style={{
              color: "#F5B800",
              fontStyle: "italic",
              letterSpacing: "0.04em",
            }}
          >
            Labor Omnia Vincit
          </span>
          <span style={{ opacity: 0.85 }}>krishnapublicschoolmeerut.in</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
