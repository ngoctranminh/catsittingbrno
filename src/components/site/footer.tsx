import { Mail, MapPin, Phone } from "lucide-react"
import Link from "next/link"

import { Logo } from "@/components/site/logo"
import { SocialLinks } from "@/components/site/social-links"
import { phoneHref, siteConfig } from "@/config/site"
import type { Dictionary } from "@/content"
import { href, type Locale, type RouteKey } from "@/lib/i18n"

const FOOTER_NAV = ["home", "services", "pricing", "process", "about", "gallery", "contact"] as const satisfies RouteKey[]

export async function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const { footer, nav, common, contact } = dict
  const { phone, email } = siteConfig.contact
  const year = new Date().getFullYear()

  return (
    <footer className="mt-auto bg-charcoal text-cream">
      <div className="container-page grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr_1fr] md:py-20">
        <div className="space-y-5">
          <Link href={href("home", locale)} aria-label={nav.homeLink} className="inline-block">
            <Logo />
          </Link>
          <p className="max-w-xs text-sm leading-relaxed text-cream/70">{footer.tagline}</p>
          <p className="max-w-xs font-heading text-lg leading-snug text-cream/90">{common.slogan}</p>
        </div>

        <nav aria-label={footer.navTitle}>
          <h2 className="mb-4 font-sans text-xs font-semibold tracking-[0.18em] text-pink uppercase">{footer.navTitle}</h2>
          <ul className="space-y-2.5 text-sm">
            {FOOTER_NAV.map((key) => (
              <li key={key}>
                <Link href={href(key, locale)} className="text-cream/75 transition-colors hover:text-white">
                  {nav[key]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold tracking-[0.18em] text-pink uppercase">{footer.contactTitle}</h2>
          <ul className="space-y-3 text-sm text-cream/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
              {common.serviceArea}
            </li>
            {phone && (
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                <a href={phoneHref(phone)} className="transition-colors hover:text-white">
                  {phone}
                </a>
              </li>
            )}
            {email && (
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 size-4 shrink-0 text-pink" aria-hidden="true" />
                <a href={`mailto:${email}`} className="break-all transition-colors hover:text-white">
                  {email}
                </a>
              </li>
            )}
            {!phone && !email && (
              <li>
                <Link href={href("contact", locale)} className="underline-offset-4 transition-colors hover:text-white hover:underline">
                  {contact.form.title}
                </Link>
              </li>
            )}
          </ul>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h2 className="mb-4 font-sans text-xs font-semibold tracking-[0.18em] text-pink uppercase">{footer.legalTitle}</h2>
          <ul className="space-y-2.5 text-sm">
            <li>
              <Link href={href("privacy", locale)} className="text-cream/75 transition-colors hover:text-white">
                {footer.privacy}
              </Link>
            </li>
            <li>
              <Link href={href("terms", locale)} className="text-cream/75 transition-colors hover:text-white">
                {footer.terms}
              </Link>
            </li>
          </ul>
          {siteConfig.legal.operatorName && (
            <p className="mt-5 text-xs leading-relaxed text-cream/60">
              {siteConfig.legal.operatorName}
              {siteConfig.legal.ico && (
                <>
                  <br />
                  {contact.info.ico}: {siteConfig.legal.ico}
                </>
              )}
            </p>
          )}
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-cream/55 sm:flex-row sm:justify-between">
          <p>
            © {year} {siteConfig.name}. {footer.rights}
          </p>
          <p>{footer.photoCredit}</p>
        </div>
      </div>
    </footer>
  )
}
