import type { NextConfig } from "next"

const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains" },
]

const nextConfig: NextConfig = {
  // No Cache Components: the Cloudflare Workers runtime (OpenNext) does not
  // support them, and requests hang until the Worker is killed (error 1101).
  poweredByHeader: false,
  // Let other devices on the local Wi-Fi load dev assets (HMR, chunks).
  allowedDevOrigins: ["192.168.*.*"],
  experimental: {
    // Two root layouts (cs at "/", en at "/en") need a global 404 page.
    globalNotFound: true,
  },
  images: {
    // WebP only: AVIF is smaller but decodes slowly on many phones, so photos
    // stayed on their placeholder for a moment while scrolling.
    formats: ["image/webp"],
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }]
  },
}

export default nextConfig

import("@opennextjs/cloudflare").then((m) => m.initOpenNextCloudflareForDev())
