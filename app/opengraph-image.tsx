import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "JSON Shuttle - Format, validate, fix and escape JSON";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fffbeb 0%, #fcd34d 50%, #f59e0b 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 140, marginBottom: 24, fontFamily: "monospace", fontWeight: 700, color: "#78350f" }}>{"{ }"}</div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#78350f",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          JSON Shuttle
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#92400e",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Format · Validate · Fix · Escape JSON
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "#92400e",
            opacity: 0.7,
          }}
        >
          json.shuttlelab.org
        </div>
      </div>
    ),
    { ...size }
  );
}
