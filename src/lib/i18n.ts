export const locales = ["cs", "en"] as const
export type Locale = (typeof locales)[number]
export const defaultLocale: Locale = "cs"

/** Czech lives at the root, English under /en — each page has a localized slug. */
export const routes = {
  home: { cs: "/", en: "/en" },
  about: { cs: "/o-nas", en: "/en/about" },
  services: { cs: "/sluzby", en: "/en/services" },
  pricing: { cs: "/cenik", en: "/en/pricing" },
  process: { cs: "/jak-to-funguje", en: "/en/how-it-works" },
  gallery: { cs: "/galerie", en: "/en/gallery" },
  contact: { cs: "/kontakt", en: "/en/contact" },
  privacy: { cs: "/ochrana-osobnich-udaju", en: "/en/privacy" },
  terms: { cs: "/obchodni-podminky", en: "/en/terms" },
} as const satisfies Record<string, Record<Locale, string>>

export type RouteKey = keyof typeof routes

export const href = (key: RouteKey, locale: Locale) => routes[key][locale]

/** Finds the same page in the other language; falls back to that language's home page. */
export function alternatePath(pathname: string, target: Locale): string {
  const normalized = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname
  for (const paths of Object.values(routes)) {
    if (paths.cs === normalized || paths.en === normalized) return paths[target]
  }
  return routes.home[target]
}

export const htmlLang: Record<Locale, string> = { cs: "cs", en: "en" }
export const ogLocale: Record<Locale, string> = { cs: "cs_CZ", en: "en_GB" }
