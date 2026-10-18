import { Info } from "lucide-react"

import { CtaBand } from "@/components/sections/cta-band"
import { PageHeader } from "@/components/sections/page-header"
import { ServiceCard } from "@/components/sections/services"
import { getDictionary } from "@/content"
import { href, type Locale } from "@/lib/i18n"
import { images } from "@/lib/images"

export function ServicesPage({ locale }: { locale: Locale }) {
  const { services } = getDictionary(locale)

  return (
    <>
      <PageHeader locale={locale} image={images.sleepy} {...services.header} />
      <section className="pb-8">
        <div className="container-page">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.items.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                locale={locale}
                index={index}
                detailed
                includesLabel={services.includesLabel}
              />
            ))}
          </div>
          <p className="mt-10 flex items-start gap-3 rounded-2xl bg-beige-soft p-5 text-sm leading-relaxed text-charcoal/80">
            <Info className="mt-0.5 size-4 shrink-0 text-sage-deep" aria-hidden="true" />
            {services.note}
          </p>
        </div>
      </section>
      <CtaBand {...services.cta} href={href("contact", locale)} />
    </>
  )
}
