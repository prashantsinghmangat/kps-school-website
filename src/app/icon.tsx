import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const size = { width: 64, height: 64 };
export const contentType = "image/png";

/**
 * Favicon — deep-navy tile with red KPS monogram. Uses brand hex values
 * directly (CSS vars aren't accessible in ImageResponse).
 */
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #0a3d62 0%, #174873 100%)",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "inset 0 0 0 1px rgba(245,184,0,0.4)",
        }}
      >
        <div
          style={{
            color: "#ffffff",
            fontSize: 22,
            fontWeight: 900,
            fontFamily: "system-ui, -apple-system, sans-serif",
            letterSpacing: "-0.04em",
            display: "flex",
          }}
        >
          <span style={{ color: "#c8102e" }}>K</span>
          <span>PS</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
