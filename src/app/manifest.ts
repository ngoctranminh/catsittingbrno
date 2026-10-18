import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { cs } from "@/content/cs"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: cs.meta.home.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    lang: "cs",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  }
}
