import type { NextConfig } from "next";

// Static export → Cloudflare Pages (static output in ./out; matches yaml/pdf/image).
// `next build` prerenders every route to static HTML — no SSR, no CF free-tier
// 1101 CPU errors. Security headers live in public/_headers (next.config
// `headers()` is unsupported under output:export).
const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
