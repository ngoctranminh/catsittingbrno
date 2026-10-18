import { Building2, Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react"
import type { ReactNode } from "react"

import { phoneHref, siteConfig } from "@/config/site"
import { SocialLinks } from "@/components/site/social-links"
import type { Dictionary } from "@/content"

export function ContactInfo({ contact, serviceArea }: { contact: Dictionary["contact"]; serviceArea: string }) {
  const { info } = contact
  const { phone, email } = siteConfig.contact
  const { operatorName, ico } = siteConfig.legal
  const pending = <span className="text-muted-foreground italic">{info.pending}</span>

  return (
    <div className="rounded-3xl bg-charcoal p-7 text-cream sm:p-9">
      <h2 className="font-heading text-2xl font-normal">{info.title}</h2>
      <dl className="mt-7 space-y-5 text-sm">
        <InfoRow icon={MapPin} label={info.area}>
          {serviceArea}
        </InfoRow>
        <InfoRow icon={Phone} label={info.phone}>
          {phone ? (
            <a href={phoneHref(phone)} className="hover:text-white hover:underline">
              {phone}
            </a>
          ) : (
            pending
          )}
        </InfoRow>
        <InfoRow icon={Mail} label={info.email}>
          {email ? (
            <a href={`mailto:${email}`} className="break-all hover:text-white hover:underline">
              {email}
            </a>
          ) : (
            pending
          )}
        </InfoRow>
        {siteConfig.openingHours && (
          <InfoRow icon={Clock} label={info.hours}>
            {siteConfig.openingHours.map((hours) => (
              <span key={hours.days.join()} className="block">
                {hours.days.join(", ")}: {hours.opens}–{hours.closes}
              </span>
            ))}
          </InfoRow>
        )}
        {operatorName && (
          <InfoRow icon={Building2} label={info.company}>
            {operatorName}
            {ico && (
              <span className="block text-cream/70">
                {info.ico}: {ico}
              </span>
            )}
          </InfoRow>
        )}
      </dl>
      {(siteConfig.social.instagram || siteConfig.social.facebook) && (
        <div className="mt-8 border-t border-cream/15 pt-6">
          <p className="text-xs tracking-[0.14em] text-cream/60 uppercase">{info.social}</p>
          <SocialLinks className="mt-3" />
        </div>
      )}
      {!phone && !email && <p className="mt-8 border-t border-cream/15 pt-6 text-sm text-cream/75">{info.formHint}</p>}
    </div>
  )
}

function InfoRow({ icon: Icon, label, children }: { icon: LucideIcon; label: string; children: ReactNode }) {
  return (
    <div className="flex gap-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-cream/10">
        <Icon className="size-4 text-pink" aria-hidden="true" />
      </span>
      <div>
        <dt className="text-xs tracking-[0.14em] text-cream/60 uppercase">{label}</dt>
        <dd className="mt-1 text-cream/90 [&_.italic]:text-cream/60">{children}</dd>
      </div>
    </div>
  )
}
