import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";

const nextConfig: NextConfig = {};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  disable: process.env.NODE_ENV !== "production",
  additionalPrecacheEntries: [{ url: "/~offline", revision: crypto.randomUUID() }],
});

export default withSerwist(nextConfig);
