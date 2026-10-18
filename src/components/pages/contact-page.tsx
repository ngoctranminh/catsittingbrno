import { JsonLd } from "@/components/json-ld"
import { ContactSection } from "@/components/sections/contact-section"
import { PageHeader } from "@/components/sections/page-header"
import { getDictionary } from "@/content"
import type { Locale } from "@/lib/i18n"
import { localBusinessJsonLd } from "@/lib/structured-data"

export function ContactPage({ locale }: { locale: Locale }) {
  const dict = getDictionary(locale)

  return (
    <>
      <JsonLd data={localBusinessJsonLd(locale)} />
      <PageHeader locale={locale} {...dict.contact.header} />
      <div className="-mt-10 md:-mt-12">
        <ContactSection locale={locale} dict={dict} />
      </div>
    </>
  )
}
