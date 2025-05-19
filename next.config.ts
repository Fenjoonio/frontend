import type { NextConfig } from "next";
import withSerwistInit from "@serwist/next";
import { isApp, isDev } from "@/lib/utils/environment";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      {
        hostname: "s3.lexoya.com",
        protocol: "https",
      },
    ],
  },
};

const withSerwist = withSerwistInit({
  swSrc: "src/app/sw.ts",
  swDest: "public/sw.js",
  cacheOnNavigation: true,
  disable: isDev() || isApp(),
  additionalPrecacheEntries: [{ url: "/~offline", revision: crypto.randomUUID() }],
});

export default withSerwist(nextConfig);
