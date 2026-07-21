export const dynamic = "force-static";

import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "JSON Shuttle - JSON 格式化与校验工具",
    short_name: "JSON Shuttle",
    description: "Format, validate, fix and escape JSON — fast, safe, privacy-first",
    start_url: "/",
    display: "standalone",
    background_color: "#fffbeb",
    theme_color: "#f59e0b",
    orientation: "any",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
