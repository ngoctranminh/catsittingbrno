import type { Metadata } from "next"

import { siteConfig } from "@/config/site"
import { getDictionary } from "@/content"
import { ogLocale, routes, type Locale, type RouteKey } from "@/lib/i18n"

export const ogImage = { url: "/og.jpg", width: 1200, height: 630 }

/** Title, description, canonical URL, hreflang alternates and Open Graph for a page. */
export function pageMetadata(locale: Locale, key: RouteKey, options: { noIndex?: boolean } = {}): Metadata {
  const meta = getDictionary(locale).meta[key]
  const path = routes[key][locale]
  const otherLocale: Locale = locale === "cs" ? "en" : "cs"
  const title = key === "home" ? { absolute: `${meta.title} | ${siteConfig.name}` } : meta.title

  return {
    title,
    description: meta.description,
    alternates: {
      canonical: path,
      languages: {
        cs: routes[key].cs,
        en: routes[key].en,
        "x-default": routes[key].cs,
      },
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.description,
      locale: ogLocale[locale],
      alternateLocale: [ogLocale[otherLocale]],
      images: [{ ...ogImage, alt: getDictionary(locale).common.slogan }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${meta.title} | ${siteConfig.name}`,
      description: meta.description,
      images: [ogImage.url],
    },
    robots: options.noIndex ? { index: false, follow: true } : undefined,
  }
}
