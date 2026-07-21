import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f59e0b",
          color: "#78350f",
          fontSize: 80,
          fontWeight: 800,
          fontFamily: "monospace",
        }}
      >
        {"{ }"}
      </div>
    ),
    { width: 192, height: 192 }
  );
}
