import { ContactInfo } from "@/components/contact/contact-info"
import { InquiryForm } from "@/components/contact/inquiry-form"
import { Reveal } from "@/components/motion/reveal"
import { SectionHeading } from "@/components/sections/section-heading"
import type { Dictionary } from "@/content"
import type { Locale } from "@/lib/i18n"

type ContactSectionProps = {
  locale: Locale
  dict: Dictionary
  /** Home page shows its own heading; the contact page already has an H1. */
  heading?: { eyebrow: string; title: string; lead: string }
}

export function ContactSection({ locale, dict, heading }: ContactSectionProps) {
  return (
    <section id="poptavka" className="scroll-mt-24 py-16 md:py-24">
      <div className="container-page">
        {heading && <SectionHeading eyebrow={heading.eyebrow} title={heading.title} lead={heading.lead} className="mb-12" />}
        <div className="grid items-start gap-8 lg:grid-cols-[1.6fr_1fr] lg:gap-10">
          <Reveal className="rounded-3xl border border-border/70 bg-white p-6 shadow-[0_30px_60px_-45px_rgba(51,51,51,0.5)] sm:p-9">
            <h2 className="mb-6 font-heading text-2xl font-normal text-charcoal">{dict.contact.form.title}</h2>
            <InquiryForm locale={locale} contact={dict.contact} />
          </Reveal>
          <Reveal delay={0.1} className="lg:sticky lg:top-28">
            <ContactInfo contact={dict.contact} serviceArea={dict.common.serviceArea} />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
