/**
 * Central business configuration.
 *
 * Every value set to `null` is intentionally unknown: the site hides it or shows
 * "will be added" instead of inventing data. Fill these in before launch —
 * contact details, structured data (LocalBusiness) and legal pages pick them up
 * automatically.
 */

export type OpeningHours = {
  /** Schema.org day names, e.g. ["Monday", "Tuesday"]. */
  days: string[]
  opens: string // "08:00"
  closes: string // "20:00"
}

export type SiteConfig = {
  name: string
  /** Path to a logo in /public (e.g. "/logo.svg"). `null` renders the built-in wordmark. */
  logo: string | null
  url: string
  contact: {
    phone: string | null
    email: string | null
  }
  address: {
    street: string | null
    city: string
    postalCode: string | null
    country: string
  }
  /** Shown as text; also used as `areaServed` in structured data. */
  serviceArea: string[]
  legal: {
    /** Registered name of the business or sole trader (podnikatel). */
    operatorName: string | null
    ico: string | null
    dic: string | null
    /** e.g. "Zapsán v živnostenském rejstříku …" */
    registration: string | null
  }
  openingHours: OpeningHours[] | null
  social: {
    instagram: string | null
    facebook: string | null
  }
}

export const siteConfig: SiteConfig = {
  name: "Catsitting Brno",
  logo: "/images/logo.jpg",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  contact: {
    phone: "+420 776 807 555",
    email: null,
  },
  address: {
    street: null,
    city: "Brno",
    postalCode: null,
    country: "CZ",
  },
  serviceArea: ["Brno"],
  legal: {
    operatorName: "Ha Šarmanová",
    ico: null,
    dic: null,
    registration: null,
  },
  openingHours: null,
  social: {
    instagram: "https://www.instagram.com/Catsitting_Brno",
    facebook: "https://www.facebook.com/CatsittingBrno",
  },
}

/** True once the operator's identity is filled in (needed for legal pages). */
export const hasLegalIdentity = Boolean(siteConfig.legal.operatorName && siteConfig.legal.ico)

/** Strips spaces etc. so a phone number can be used in a `tel:` link. */
export const phoneHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`
