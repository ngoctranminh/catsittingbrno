import type { MetadataRoute } from "next"

import { siteConfig } from "@/config/site"
import { routes, type RouteKey } from "@/lib/i18n"

const PRIORITY: Partial<Record<RouteKey, number>> = { home: 1, services: 0.9, contact: 0.9, pricing: 0.8, process: 0.7 }
// The terms page is a placeholder (noindex) until real terms are published.
const EXCLUDED: RouteKey[] = ["terms"]

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${siteConfig.url}${path === "/" ? "" : path}`

  return (Object.keys(routes) as RouteKey[])
    .filter((key) => !EXCLUDED.includes(key))
    .flatMap((key) =>
      (["cs", "en"] as const).map((locale) => ({
        url: url(routes[key][locale]),
        changeFrequency: "monthly" as const,
        priority: (PRIORITY[key] ?? 0.5) * (locale === "cs" ? 1 : 0.8),
        alternates: { languages: { cs: url(routes[key].cs), en: url(routes[key].en) } },
      })),
    )
}
