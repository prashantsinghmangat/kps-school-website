import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a3d62 0%, #174873 55%, #05253f 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            color: "#ffffff",
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex", fontSize: 64, fontWeight: 900, lineHeight: 1 }}>
            <span style={{ color: "#c8102e" }}>K</span>
            <span>PS</span>
          </div>
          <div
            style={{
              marginTop: 10,
              fontSize: 12,
              letterSpacing: "0.25em",
              color: "#f5b800",
              fontWeight: 600,
            }}
          >
            MEERUT
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
