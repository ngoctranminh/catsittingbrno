import { siteConfig } from "@/config/site"
import { getDictionary } from "@/content"
import { routes, type Locale } from "@/lib/i18n"

/**
 * LocalBusiness JSON-LD. Returns `null` until the business has a verified
 * contact channel and full address in `config/site.ts` — we never publish
 * incomplete or invented business data to search engines.
 */
export function localBusinessJsonLd(locale: Locale) {
  const { contact, address, openingHours, social } = siteConfig
  const hasContact = Boolean(contact.phone || contact.email)
  const hasAddress = Boolean(address.street && address.postalCode)
  if (!hasContact || !hasAddress) return null

  const dict = getDictionary(locale)
  const sameAs = [social.instagram, social.facebook].filter(Boolean)

  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#business`,
    name: siteConfig.name,
    description: dict.meta.home.description,
    slogan: dict.common.slogan,
    url: `${siteConfig.url}${routes.home[locale] === "/" ? "" : routes.home[locale]}`,
    image: `${siteConfig.url}/og.jpg`,
    ...(contact.phone && { telephone: contact.phone }),
    ...(contact.email && { email: contact.email }),
    address: {
      "@type": "PostalAddress",
      streetAddress: address.street,
      addressLocality: address.city,
      postalCode: address.postalCode,
      addressCountry: address.country,
    },
    areaServed: siteConfig.serviceArea.map((name) => ({ "@type": "City", name })),
    ...(openingHours && {
      openingHoursSpecification: openingHours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    ...(sameAs.length > 0 && { sameAs }),
  }
}
