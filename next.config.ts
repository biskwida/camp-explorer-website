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
  },
};

export default withNextIntl(nextConfig);
