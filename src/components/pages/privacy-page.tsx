import { Info } from "lucide-react"

import { hasLegalIdentity, siteConfig } from "@/config/site"
import { getDictionary } from "@/content"
import type { Locale } from "@/lib/i18n"

/** Update when the policy text changes. */
const LAST_UPDATED = "2026-10-17"

export function PrivacyPage({ locale }: { locale: Locale }) {
  const { privacy, contact } = getDictionary(locale)
  const { legal, address, contact: channels } = siteConfig
  const pending = contact.info.pending
  const fullAddress = address.street && address.postalCode ? `${address.street}, ${address.postalCode} ${address.city}` : null
  const updated = new Intl.DateTimeFormat(locale === "cs" ? "cs-CZ" : "en-GB", { dateStyle: "long" }).format(
    new Date(`${LAST_UPDATED}T12:00:00Z`),
  )

  const controllerRows = [
    [privacy.controller.name, legal.operatorName],
    [privacy.controller.ico, legal.ico],
    [privacy.controller.address, fullAddress],
    [privacy.controller.email, channels.email],
    [privacy.controller.phone, channels.phone],
  ] as const

  return (
    <article className="container-page max-w-3xl py-12 md:py-20">
      <h1 className="font-heading text-4xl font-normal text-charcoal sm:text-5xl">{privacy.title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        {privacy.updated}: <time dateTime={LAST_UPDATED}>{updated}</time>
      </p>

      {!hasLegalIdentity && (
        <p className="mt-8 flex items-start gap-3 rounded-2xl border border-beige bg-beige-soft p-5 text-sm leading-relaxed text-charcoal/85">
          <Info className="mt-0.5 size-4 shrink-0 text-sage-deep" aria-hidden="true" />
          {privacy.draftNotice}
        </p>
      )}

      <div className="mt-10 space-y-10">
        {privacy.sections.map((section) => (
          <section key={section.title}>
            <h2 className="font-heading text-2xl font-normal text-charcoal">{section.title}</h2>
            <div className="mt-3 space-y-3 leading-relaxed text-charcoal/80">
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
            {section.showController && (
              <dl className="mt-5 grid gap-x-6 gap-y-2 rounded-2xl bg-white p-5 text-sm sm:grid-cols-[auto_1fr]">
                {controllerRows.map(([label, value]) => (
                  <div key={label} className="contents">
                    <dt className="font-medium text-charcoal">{label}</dt>
                    <dd className={value ? "text-charcoal/80" : "text-muted-foreground italic"}>{value ?? pending}</dd>
                  </div>
                ))}
              </dl>
            )}
          </section>
        ))}
      </div>
    </article>
  )
}
