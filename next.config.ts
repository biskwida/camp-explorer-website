import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./lib/i18n/request.ts");

const nextConfig: NextConfig = {
  // Allow dev-server requests from cloudflared tunnels (used to share the in-progress site).
  // Without this, Next 16 rejects HMR/asset requests from *.trycloudflare.com domains and
  // the dev server's state gradually corrupts (see commit history for context).
  allowedDevOrigins: ["*.trycloudflare.com"],
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
    // Next 16 requires non-default quality values to be explicitly allowed.
    // 75 is the default; 100 is used for brand wordmarks where retina/zoom
    // softness from lossy JPEG re-encoding would be visible.
    qualities: [75, 100],
  },
};

export default withNextIntl(nextConfig);
